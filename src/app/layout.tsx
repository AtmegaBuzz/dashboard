'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { http, createConfig, injected, WagmiProvider } from 'wagmi'
import { polygonAmoy } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "@/components/ui/toaster"


if (typeof window === 'undefined') {
  global.localStorage = {
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null
  } as any;
}

const wagmiConfig = createConfig({
  chains: [polygonAmoy],
  connectors: [
    injected(),
    metaMask({
      dappMetadata: {
        name: "P3 Ai Network",
        url: "https://p3ai.network",
        iconUrl: "https://wagmi.io/favicon.ico",
      },
    })],
  transports: {
    [polygonAmoy.id]: http(),
  },
})

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>P3 AI Network</title>
        <meta name="description" content="The Inter-Agent Search Protocol for AI Agents." />

        <meta property="og:title" content="P3 AI Network" />
        <meta property="og:description" content="The Inter-Agent Search Protocol for AI Agents" />
        <meta property="og:image" content="https://www.p3ai.network/spectronlabs.png" />
        <meta property="og:url" content="https://www.p3ai.network/" />
        <meta property="og:type" content="website" />

      </head>
      <body className={clsx(inter.className, "antialiased")}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
        < Toaster />
      </body>
    </html>
  );
}
