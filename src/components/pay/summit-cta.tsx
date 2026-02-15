"use client"

import { motion } from "framer-motion";
import { Coffee, CalendarDays } from "lucide-react";

export default function SummitCTA() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-[#0a0a0a] dark:to-[#111111]">
            <div className="container max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="p-px rounded-2xl bg-gradient-to-b from-black/5 dark:from-white/[0.12] to-transparent dark:to-white/[0.03]">
                        <div className="bg-white dark:bg-[#111111] border border-black/10 dark:border-white/[0.08] rounded-2xl p-10 text-center relative overflow-hidden">
                            <div
                                className="absolute inset-0 opacity-50"
                                style={{
                                    background: "radial-gradient(circle at center, rgba(118,120,237,0.06), transparent 70%)",
                                }}
                            />
                            <div className="relative">
                                <div className="flex justify-center mb-4">
                                    <Coffee className="size-8 text-[#7678ed]" />
                                </div>
                                <h3 className="text-xl font-bold text-black dark:text-white mb-3">At the summit?</h3>
                                <p className="text-gray-600 dark:text-white/50 mb-2">
                                    Spotted us roaming around in Zynd t-shirts?
                                </p>
                                <p className="text-gray-600 dark:text-white/50 mb-6">
                                    Come say hi! We&apos;re friendly. Promise.
                                </p>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7678ed]/10 border border-[#7678ed]/20 dark:border-[#7678ed]/30">
                                    <CalendarDays className="size-4 text-[#7678ed]" />
                                    <span className="text-sm font-semibold text-[#7678ed]">
                                        Feb 16-20 | India AI Impact Summit
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
