import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {clsx} from "clsx";
import { ParticleConnectkit } from "@/components/connectKit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Startup Landing Page  • Spectron Labs",
  description: "Generated by create next app",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, "antialiased")}>
        <ParticleConnectkit>
          {children}
        </ParticleConnectkit>
      </body>
    </html>
  );
}
