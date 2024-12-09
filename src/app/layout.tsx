'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { http, createConfig } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const config = createConfig({
  chains: [arbitrumSepolia],
  connectors: [metaMask({
    dappMetadata: {
      name: "P3 Ai Network",
      url: "https://p3ai.network",
      iconUrl: "https://wagmi.io/favicon.ico",
    },
  })],
  transports: {
    [arbitrumSepolia.id]: http(),
  },
})

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient()


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, "antialiased")}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
