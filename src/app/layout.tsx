import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zynd Protocol",
  description: "The Inter-Agent Search Protocol for AI Agents.",
  openGraph: {
    title: "Zynd Protocol",
    description: "The Inter-Agent Search Protocol for AI Agents",
    images: ["https://www.p3ai.network/spectronlabs.png"],
    url: "https://www.p3ai.network/",
    type: "website",
  },
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
