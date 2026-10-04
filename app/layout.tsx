import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "../styles/globals.css"
import PageLoader from "@/components/PageLoader"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://fakhrii.my.id"),
  title: {
    default: "Fakhri | Portfolio",
    template: "%s | Fakhri Portfolio",
  },
  description: "Personal portfolio of Fakhri. Software Developer specializing in Next.js, Node.js, and modern web development.",
  keywords: ["Fakhri", "Portfolio", "Software Developer", "Web Development", "Backend", "Frontend", "Next.js", "React", "Node.js"],
  authors: [{ name: "Fakhri" }],
  creator: "Fakhri",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "Fakhri | Portfolio",
    description: "Personal portfolio of Fakhri. Software Developer specializing in Next.js, Node.js, and modern web development.",
    siteName: "Fakhri Portfolio",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Fakhri Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fakhri | Portfolio",
    description: "Personal portfolio of Fakhri. Software Developer specializing in Next.js, Node.js, and modern web development.",
    images: ["/images/profile.jpg"],
    creator: "@Rynoku",
  },
  icons: {
    icon: "/images/cat-scuba.gif",
    shortcut: "/images/cat-scuba.gif",
    apple: "/images/cat-scuba.gif",
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "ZbLhiilDbtLDyIx5eH6Jeoe1jPkXNKId-LhXG1HhLWA",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <PageLoader />
        {children}
      </body>
    </html>
  )
}