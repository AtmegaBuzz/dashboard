"use client";

import { http, createConfig, injected, WagmiProvider } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

if (typeof window === "undefined") {
  global.localStorage = {
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null,
  } as any;
}

const wagmiConfig = createConfig({
  chains: [polygonAmoy],
  connectors: [
    injected(),
    metaMask({
      dappMetadata: {
        name: "Zynd Protocol",
        url: "https://p3ai.network",
        iconUrl: "https://wagmi.io/favicon.ico",
      },
    }),
  ],
  transports: {
    [polygonAmoy.id]: http(),
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
