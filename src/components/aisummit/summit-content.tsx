"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Linkedin, Twitter, ExternalLink, CalendarDays, MapPin } from "lucide-react";

const socialLinks = [
    {
        icon: Mail,
        label: "Email",
        href: "mailto:chandan@zynd.ai",
        bg: "bg-white",
        iconColor: "text-red-500",
        border: "border border-gray-200",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/zynd/",
        bg: "bg-[#0A66C2]",
        iconColor: "text-white",
        border: "",
    },
    {
        icon: Twitter,
        label: "X (Twitter)",
        href: "https://x.com/zyndai",
        bg: "bg-[#0f0f0f]",
        iconColor: "text-white",
        border: "",
    },
];

const linkCards = [
    {
        emoji: "💥",
        title: "AI Impact Summit Mixer",
        subtitle: "18th Feb, 2025",
        href: "https://luma.com/5c70x6y7",
        delay: 0.05,
    },
    {
        emoji: "⚡",
        title: "Zynd AI",
        subtitle: "Get paid for your AI agents",
        href: "https://zynd.ai/pay",
        isZynd: true,
        delay: 0.1,
    },
    {
        emoji: "💰",
        title: "Zynd AIcakthon",
        subtitle: "₹6,00,000 Prize Pool",
        href: "https://whereuelevate.com/drills/zynd-aickathon",
        delay: 0.15,
    },
    {
        emoji: "📝",
        title: "Zynd Blog",
        subtitle: "What is Zynd?",
        href: "/blogs/what-is-zynd",
        delay: 0.2,
    },
];

export default function SummitContent() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111827] to-[#0a0a0a] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00AAFF] opacity-[0.06] blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[#7678ed] opacity-[0.05] blur-[120px] rounded-full" />
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#00AAFF] opacity-[0.03] blur-[100px] rounded-full" />
            </div>

            {/* Compact Header — Branding + Summit Info */}
            <section className="relative pt-8 sm:pt-12 pb-6 sm:pb-8">
                <div className="container max-w-3xl mx-auto px-4 sm:px-6">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <motion.h1
                            className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.05 }}
                        >
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00AAFF] to-white"
                                style={{ fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace" }}
                            >
                                ZYND AI
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-sm sm:text-base text-white/50 mb-3 tracking-wide"
                            style={{ fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            Economy For AI Agents
                        </motion.p>

                        {/* Summit badge + location inline */}
                        <motion.div
                            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-white/40 text-xs sm:text-sm mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                        >
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00AAFF]/10 border border-[#00AAFF]/20 text-[#00AAFF] font-medium">
                                <CalendarDays className="size-3.5" />
                                AI Impact Summit 2025
                            </span>
                            <span className="inline-flex items-center gap-1">
                                <MapPin className="size-3.5" />
                                Feb 16–20 &bull; New Delhi
                            </span>
                        </motion.div>

                        {/* Social links */}
                        <motion.div
                            className="flex items-center justify-center gap-3"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={social.label}
                                    className={`size-10 rounded-xl flex items-center justify-center ${social.bg} ${social.border} transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl`}
                                >
                                    <social.icon className={`size-4 ${social.iconColor}`} />
                                </a>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Divider */}
            <div className="container max-w-3xl mx-auto px-4 sm:px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Explore Section — immediately visible */}
            <section className="py-8 sm:py-12">
                <div className="container max-w-3xl mx-auto px-4 sm:px-6">
                    <motion.h2
                        className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-white"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.25 }}
                    >
                        Explore
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {linkCards.map((card) => {
                            const isExternal = card.href.startsWith("http");
                            return (
                                <motion.div
                                    key={card.title}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, delay: 0.25 + card.delay }}
                                >
                                    <Link
                                        href={card.href}
                                        target={isExternal ? "_blank" : undefined}
                                        rel={isExternal ? "noopener noreferrer" : undefined}
                                        className="flex items-center gap-4 bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-4 sm:p-5 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 group"
                                    >
                                        <div className="size-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 text-2xl group-hover:scale-105 transition-transform">
                                            {card.isZynd ? (
                                                <span className="text-[#7678ed] font-bold text-xl" style={{ fontFamily: "'SF Mono', monospace" }}>
                                                    Z
                                                </span>
                                            ) : (
                                                card.emoji
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-white text-[15px] leading-tight truncate">
                                                {card.title}
                                            </h3>
                                            {card.subtitle && (
                                                <p className="text-white/40 text-[13px] mt-0.5 leading-tight truncate">
                                                    {card.subtitle}
                                                </p>
                                            )}
                                        </div>

                                        <ExternalLink className="size-4 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <div className="container max-w-3xl mx-auto px-4 sm:px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <motion.footer
                className="py-8 sm:py-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <p className="text-sm text-white/30 tracking-wide">
                    Zynd AI
                </p>
            </motion.footer>
        </div>
    );
}
