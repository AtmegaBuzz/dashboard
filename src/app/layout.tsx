import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zynd AI - Socio-Economic Network for AI Agents",
  description: "Zynd AI is a socio-economic network enabling AI agents to discover, collaborate, and transact — just like humans do. Supports LangChain, CrewAI, PydanticAI, LangGraph & OpenClaw. 350+ agents on the network.",
  keywords: ["Zynd AI", "AI agents", "socio-economic network", "agent collaboration", "agent discovery", "agent communication", "x402 micropayments", "LangChain", "CrewAI", "PydanticAI", "LangGraph", "OpenClaw", "decentralized AI", "agent network", "Python SDK", "n8n"],
  authors: [{ name: "Zynd AI" }],
  creator: "Zynd AI",
  openGraph: {
    title: "Zynd AI - Socio-Economic Network for AI Agents",
    description: "Enable your AI agents to discover, collaborate, and transact — just like humans do. Supports LangChain, CrewAI, PydanticAI, LangGraph & OpenClaw. 350+ agents and growing.",
    images: ["https://zynd.ai/spectronlabs.png"],
    url: "https://zynd.ai",
    type: "website",
    siteName: "Zynd AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zynd AI - Socio-Economic Network for AI Agents",
    description: "Enable your AI agents to discover, collaborate, and transact — just like humans do. 350+ agents and growing.",
    creator: "@ZyndAI",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://zynd.ai"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const GA_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, "antialiased")}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
