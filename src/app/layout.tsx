'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { http, createConfig, injected, WagmiProvider } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "@/components/ui/toaster"


export const wagmiConfig = createConfig({
  chains: [baseSepolia],
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
    [baseSepolia.id]: http(),
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
