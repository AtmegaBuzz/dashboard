"use client"

import { motion } from "framer-motion";
import { Users, Code, Zap, Trophy } from "lucide-react";

const benefits = [
    { title: "Private community", description: "Connect with builders, get early updates", Icon: Users },
    { title: "Beta API access", description: "Be among the first to build on Zynd", Icon: Code },
    { title: "Exclusive events", description: "Hackathons, founder dinners, demo days", Icon: Zap },
    { title: "Founding member status", description: "Priority support + special perks", Icon: Trophy },
];

export default function Benefits() {
    return (
        <section className="py-20 bg-[#111111] relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#06B6D4] opacity-[0.04] blur-[120px] rounded-full" />
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
                    What You Get
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {benefits.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="h-full p-5 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(118,120,237,0.08)] group-hover:-translate-y-1">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="size-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{
                                            backgroundColor: "rgba(118, 120, 237, 0.08)",
                                            boxShadow: "0 0 0 1px rgba(118, 120, 237, 0.15)",
                                        }}
                                    >
                                        <item.Icon className="size-5 text-[#7678ed]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                                        <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
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
