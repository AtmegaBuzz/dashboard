'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { clsx } from "clsx";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useAtom } from "jotai";
import { contractAtom, web3Atom } from "@/store/global.store";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <div className={clsx(inter.className, "antialiased")}>
            <DashboardLayout loading={false}>
                {children}
            </DashboardLayout>
        </div>
    );
}
