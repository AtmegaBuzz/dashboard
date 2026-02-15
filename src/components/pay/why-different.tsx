"use client"

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const competitors = [
    { name: "Google AP2", description: "Payment protocol only (no discovery)", good: false },
    { name: "Fetch.ai", description: "Must build on their platform", good: false },
    { name: "Skyfire", description: "Payment wallets (you still wire APIs manually)", good: false },
    { name: "Zynd", description: "Discovery + Trust + Payment in one SDK", good: true },
    { name: "Works with your existing agents", description: "", good: true },
];

export default function WhyDifferent() {
    return (
        <section className="py-20 bg-[#111111] relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#7678ed] opacity-[0.04] blur-[120px] rounded-full" />
            </div>

            {/* Top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container max-w-4xl mx-auto px-4">
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#7678ed] via-[#3B82F6] to-[#06B6D4]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Why Zynd Is Different
                </motion.h2>

                <div className="max-w-xl mx-auto space-y-4">
                    {competitors.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                            className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 ${
                                item.good
                                    ? "bg-[#7678ed]/10 border-[#7678ed]/25 hover:border-[#7678ed]/40"
                                    : "bg-white/[0.03] border-white/[0.08] hover:border-white/[0.15]"
                            }`}
                        >
                            {item.good ? (
                                <CheckCircle2 className="size-5 text-[#7678ed] mt-0.5 flex-shrink-0" />
                            ) : (
                                <XCircle className="size-5 text-white/30 mt-0.5 flex-shrink-0" />
                            )}
                            <div>
                                <span className={`font-semibold ${item.good ? "text-white" : "text-white/70"}`}>
                                    {item.name}
                                </span>
                                {item.description && (
                                    <span className="text-white/40"> — {item.description}</span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
    );
}
