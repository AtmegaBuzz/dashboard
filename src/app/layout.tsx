import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const GA_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Zynd Protocol</title>
        <meta
          name="description"
          content="The Inter-Agent Search Protocol for AI Agents."
        />
        <meta property="og:title" content="Zynd Protocol" />
        <meta
          property="og:description"
          content="The Inter-Agent Search Protocol for AI Agents"
        />
        <meta
          property="og:image"
          content="https://www.p3ai.network/spectronlabs.png"
        />
        <meta property="og:url" content="https://www.p3ai.network/" />
        <meta property="og:type" content="website" />
      </head>
      <body className={clsx(inter.className, "antialiased")}>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
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
