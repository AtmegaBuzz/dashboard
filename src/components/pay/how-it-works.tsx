"use client"

import { motion } from "framer-motion";
import { Search, ShieldCheck, Wallet } from "lucide-react";

const howItWorks = [
    {
        step: "1",
        title: "Discovery",
        description: "Agents find services automatically — no manual API hunting",
        Icon: Search,
        color: "#7678ed",
    },
    {
        step: "2",
        title: "Trust",
        description: "W3C DIDs verify identity — no fraud, no spoofing",
        Icon: ShieldCheck,
        color: "#3B82F6",
    },
    {
        step: "3",
        title: "Payment",
        description: "USDC auto-pays — instant settlement, zero invoicing",
        Icon: Wallet,
        color: "#06B6D4",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-[#0a0a0a] dark:to-[#111111] relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-40 left-0 w-72 h-72 bg-blue-100 dark:bg-[#7678ed] rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-50 dark:opacity-5 animate-blob" />
                <div className="absolute top-20 right-0 w-72 h-72 bg-purple-100 dark:bg-[#3B82F6] rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-50 dark:opacity-5 animate-blob animation-delay-2000" />
            </div>

            <div className="container max-w-4xl mx-auto px-4">
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#7678ed] via-[#3B82F6] to-[#06B6D4]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    How It Works
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {howItWorks.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="h-full p-6 rounded-2xl bg-white/50 dark:bg-white/[0.03] backdrop-blur-sm border border-black/5 dark:border-white/[0.08] hover:border-black/10 dark:hover:border-white/[0.15] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(118,120,237,0.08)] relative overflow-hidden group-hover:-translate-y-1">
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(circle at top right, ${item.color}15, transparent 70%)`,
                                    }}
                                />
                                <div className="relative">
                                    <div
                                        className="size-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                                        style={{
                                            backgroundColor: `${item.color}10`,
                                            boxShadow: `0 0 0 1px ${item.color}20`,
                                        }}
                                    >
                                        <item.Icon className="size-6" style={{ color: item.color }} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 text-black dark:text-white">{item.step}. {item.title}</h3>
                                    <p className="text-gray-600 dark:text-white/50 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
