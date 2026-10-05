import { NextRequest, NextResponse } from "next/server"
import OpenAI from 'openai'

export const runtime = "nodejs"

interface HistoryEntry {
  role: "system" | "user" | "assistant"
  content: string
}

const configuredPortfolioOrigin = process.env.PORTFOLIO_ORIGIN || "https://rynoku.github.io"
const portfolioOrigin = new URL(configuredPortfolioOrigin).origin

function isAllowedOrigin(origin: string | null): origin is string {
  return origin === portfolioOrigin || (process.env.NODE_ENV === "development" && origin === "http://localhost:3000")
}

function getCorsHeaders(origin: string | null): Headers {
  const headers = new Headers({ Vary: "Origin" })

  if (isAllowedOrigin(origin)) {
    headers.set("Access-Control-Allow-Origin", origin)
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  }

  return headers
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin")
  if (!isAllowedOrigin(origin)) {
    return new Response(null, { status: 403, headers: getCorsHeaders(origin) })
  }

  return new Response(null, { status: 204, headers: getCorsHeaders(origin) })
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin")
  const corsHeaders = getCorsHeaders(origin)

  if (origin && !corsHeaders.has("Access-Control-Allow-Origin")) {
    return NextResponse.json(
      { success: false, message: "Origin is not allowed" },
      { status: 403, headers: corsHeaders },
    )
  }

  try {
    const { text, history = [] }: { text: string; history: HistoryEntry[] } = await req.json()

    if (!text) {
      return NextResponse.json(
        { success: false, message: "Pesan tidak boleh kosong" },
        { status: 400, headers: corsHeaders },
      )
    }

    const apiKey = process.env.NVIDIA_APIKEY
    if (!apiKey) {
      const fallbackText = [
        "Halo! Saya adalah AI Rynoku.",
        "Saat ini koneksi ke model AI sedang tidak tersedia, tapi Anda tetap bisa menanyakan hal-hal umum seputar profil, pengalaman, atau project Fakhri.",
        "",
        "Contoh pertanyaan yang bisa saya jawab:",
        "- Siapa Fakhri?",
        "- Apa skill yang dimiliki?",
        "- Apa project utama Fakhri?",
        "- Bagaimana cara menghubungi Fakhri?",
        "",
        "Untuk kontak langsung, bisa melalui email: fakhriibadilkirom@gmail.com atau WhatsApp: +62 819-4991-6718."
      ].join("\n")

      return new Response(fallbackText, {
        headers: new Headers({
          ...Object.fromEntries(corsHeaders),
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
        }),
      })
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    })

    // Menggabungkan history dengan pesan terbaru dari user
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      ...history,
      { role: "user", content: text }
    ]

    const completion = await openai.chat.completions.create({
      model: "nvidia/nemotron-3.5-lightning-30b-a3b",
      messages,
      temperature: 1,
      top_p: 0.7,
      max_tokens: 4096,
      stream: true
    })

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices?.[0]?.delta?.content || '';
            
            if (content) {
              controller.enqueue(new TextEncoder().encode(content));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(readable, {
      headers: new Headers({
        ...Object.fromEntries(corsHeaders),
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      }),
    });

  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json(
      { success: false, message: "Gagal terhubung ke server AI." },
      { status: 500, headers: corsHeaders },
    )
  }
}