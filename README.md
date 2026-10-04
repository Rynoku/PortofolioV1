# Fakhri Portfolio

A modern, interactive, and responsive personal portfolio website built to showcase projects, skills, and experience.

## 🌐 Live Demo

Check out the live website here: **[https://rynoku.github.io/PortofolioV1/](https://rynoku.github.io/PortofolioV1/)**

## 🚀 Features

- **Modern UI/UX**: Sleek design with premium aesthetics, carefully curated typography, and smooth micro-interactions.
- **Interactive Animations**: Powered by Framer Motion for scroll reveals, hover effects, and fluid modal transitions.
- **Project Showcase**: Detailed project cards with technology stack tags, features lists, and links to source code / live demos. (Includes support for private repositories).
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing (includes a responsive infinite-scroll slider for mobile).

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 💻 Getting Started

First, clone the repository and install the dependencies:

```bash
# Clone the repository
git clone https://github.com/Rynoku/PortofolioV1.git

# Navigate to the project directory
cd portofoliov1

# Install dependencies
npm install
# or yarn install / pnpm install
```

Then, run the development server:

```bash
npm run dev
# or yarn dev / pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deploying to GitHub Pages

The `Deploy to GitHub Pages` workflow builds the site as a static export and publishes it at
**[https://rynoku.github.io/PortofolioV1/](https://rynoku.github.io/PortofolioV1/)** whenever changes are pushed to `main`.
In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

GitHub Pages only hosts static files. The AI chat and email API routes need a server and are not available on this deployment.

To enable the AI chat on GitHub Pages, deploy this project to Vercel as its API backend and set the `NVIDIA_APIKEY` environment variable there. In GitHub repository settings, add the Actions variable `NEXT_PUBLIC_CHAT_API_URL` with the Vercel endpoint (for example, `https://your-project.vercel.app/api/chat`), then rerun the Pages workflow. The chat API allows requests from `https://rynoku.github.io`; set `PORTFOLIO_ORIGIN` on Vercel only if the Pages origin changes.

## 📁 Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable React components (animations, UI elements, etc.).
- `public/`: Static assets such as images and icons.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).