"use client"

import { motion } from "framer-motion";
import { Sparkle, Zap, Globe, Shield } from "lucide-react";

const stats = [
    { icon: Globe, label: "Multi-Chain", sublabel: "Ready" },
    { icon: Shield, label: "W3C DID", sublabel: "Verified" },
    { icon: Zap, label: "Instant", sublabel: "Settlement" },
];

export default function PayHero() {
    return (
        <section className="relative pt-32 pb-24 overflow-hidden bg-white dark:bg-[#0a0a0a]">
            {/* Background layers */}
            <div className="absolute inset-0 -z-10">
                {/* Fine grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:20px_20px]" />
                {/* Coarser grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:80px_80px]" />

                {/* Glow orbs */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-20 h-[500px] w-[600px] rounded-full bg-[#7678ed] opacity-[0.12] dark:opacity-[0.08] blur-[150px]" />
                <div className="absolute -right-20 top-10 h-[400px] w-[400px] rounded-full bg-[#3B82F6] opacity-[0.12] dark:opacity-[0.08] blur-[130px]" />
                <div className="absolute -left-20 bottom-0 h-[350px] w-[350px] rounded-full bg-[#06B6D4] opacity-[0.08] dark:opacity-[0.04] blur-[120px]" />
                <div className="absolute right-1/3 bottom-10 h-[200px] w-[200px] rounded-full bg-[#EC4899] opacity-[0.06] dark:opacity-[0.03] blur-[100px]" />

                {/* Diagonal accent lines */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#7678ed]/20 to-transparent rotate-[15deg]" />
                    <div className="absolute -top-1/3 -left-1/4 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/15 to-transparent rotate-[15deg]" />
                </div>
            </div>

            {/* Top decorative border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7678ed]/30 to-transparent" />

            <div className="container max-w-5xl mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7678ed]/10 border border-[#7678ed]/20 dark:border-[#7678ed]/30 shadow-lg shadow-[#7678ed]/5">
                            <Sparkle className="size-4 text-[#7678ed] animate-pulse" />
                            <span className="text-sm font-medium text-[#7678ed]">Now Accepting Beta Applications</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-black dark:text-white mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        The{" "}
                        <span className="relative">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7678ed] via-[#3B82F6] to-[#06B6D4]">
                                Stripe for AI Agents
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-[#7678ed] via-[#3B82F6] to-[#06B6D4] blur-2xl opacity-20 animate-pulse" />
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl text-gray-600 dark:text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Your agents can&apos;t discover each other, verify trust, or get paid.{" "}
                        <span className="font-semibold text-black dark:text-white">Zynd fixes all three.</span>
                    </motion.p>

                    {/* Stats row */}
                    <motion.div
                        className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {stats.map((stat, i) => (
                            <div key={stat.label} className="flex items-center gap-3">
                                {i > 0 && (
                                    <div className="hidden sm:block w-px h-8 bg-black/10 dark:bg-white/10 -ml-3 sm:-ml-4" />
                                )}
                                <div
                                    className="size-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        backgroundColor: "rgba(118, 120, 237, 0.08)",
                                        boxShadow: "0 0 0 1px rgba(118, 120, 237, 0.15)",
                                    }}
                                >
                                    <stat.icon className="size-5 text-[#7678ed]" />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-semibold text-black dark:text-white leading-tight">{stat.label}</div>
                                    <div className="text-xs text-gray-500 dark:text-white/40">{stat.sublabel}</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Integrations bar */}
                    <motion.div
                        className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.06] text-sm text-gray-500 dark:text-white/40"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div>
                            <span className="font-semibold text-black dark:text-white">Works with:</span>{" "}
                            LangChain &bull; OpenClaw &bull; n8n &bull; CrewAI
                        </div>
                        <div className="hidden sm:block w-px h-4 bg-black/10 dark:bg-white/10" />
                        <div>
                            <span className="font-semibold text-black dark:text-white">Partners:</span>{" "}
                            n8n, Billions Network
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom decorative border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
        </section>
    );
}
