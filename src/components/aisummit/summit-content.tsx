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
        delay: 0.1,
    },
    {
        emoji: "⚡",
        title: "Zynd AI",
        subtitle: "Economy For AI Agents",
        href: "https://zynd.ai",
        isZynd: true,
        delay: 0.2,
    },
    {
        emoji: "💰",
        title: "Zynd AIcakthon",
        subtitle: "₹6,00,000 Prize Pool",
        href: "https://whereuelevate.com/drills/zynd-aickathon",
        delay: 0.3,
    },
    {
        emoji: "📝",
        title: "Zynd Blog",
        subtitle: "What is Zynd?",
        href: "/blogs/what-is-zynd",
        delay: 0.4,
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

            {/* Hero Section */}
            <section className="relative pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-20">
                <div className="container max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                        {/* Left — Branding */}
                        <motion.div
                            className="w-full lg:w-1/2 text-center lg:text-left"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Summit badge */}
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00AAFF]/10 border border-[#00AAFF]/20 mb-6"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <CalendarDays className="size-4 text-[#00AAFF]" />
                                <span className="text-sm font-medium text-[#00AAFF]">India AI Impact Summit 2025</span>
                            </motion.div>

                            <motion.h1
                                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.15 }}
                            >
                                <span
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00AAFF] to-white"
                                    style={{ fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace" }}
                                >
                                    ZYND AI
                                </span>
                            </motion.h1>

                            <motion.p
                                className="text-lg sm:text-xl text-white/60 mb-2 tracking-wide"
                                style={{ fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace" }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.25 }}
                            >
                                Economy For AI Agents
                            </motion.p>

                            <motion.div
                                className="flex items-center justify-center lg:justify-start gap-2 text-white/40 text-sm mb-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.35 }}
                            >
                                <MapPin className="size-4" />
                                <span>Feb 16–20, 2025 &bull; New Delhi, India</span>
                            </motion.div>

                            {/* Social links */}
                            <motion.div
                                className="flex items-center justify-center lg:justify-start gap-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            >
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={social.label}
                                        className={`size-12 rounded-2xl flex items-center justify-center ${social.bg} ${social.border} transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl`}
                                    >
                                        <social.icon className={`size-5 ${social.iconColor}`} />
                                    </a>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right — Hero visual card */}
                        <motion.div
                            className="w-full lg:w-1/2"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div
                                className="relative rounded-3xl overflow-hidden"
                                style={{
                                    boxShadow: "0 0 0 2px #00AAFF, 0 8px 40px rgba(0, 170, 255, 0.2)",
                                }}
                            >
                                <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-gradient-to-br from-[#1a2a3a] via-[#2a3a4a] to-[#1a2535]">
                                    {/* Grid overlay */}
                                    <div className="absolute inset-0 opacity-40">
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                backgroundImage: `
                                                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
                                                    linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                                                `,
                                                backgroundSize: "20px 40px",
                                            }}
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1520]/80 via-transparent to-[#2a3a4a]/30" />
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#00AAFF]/10 rounded-full blur-3xl" />
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0066AA]/10 rounded-full blur-2xl" />

                                    <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full justify-between">
                                        <div>
                                            <p className="text-[#00AAFF] text-xs sm:text-sm font-medium tracking-widest uppercase mb-2">AI Agent Infrastructure</p>
                                            <h2
                                                className="text-3xl sm:text-4xl font-bold text-white tracking-wider"
                                                style={{ fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace" }}
                                            >
                                                ZYND AI
                                            </h2>
                                            <p className="text-white/50 text-sm sm:text-base mt-2 max-w-xs">
                                                The trust and payment layer for AI agents.
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-4">
                                            <div className="size-2 rounded-full bg-green-400 animate-pulse" />
                                            <span className="text-white/40 text-xs tracking-wide">Live at AI Impact Summit</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="container max-w-5xl mx-auto px-4 sm:px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Links Section */}
            <section className="py-16 sm:py-20">
                <div className="container max-w-3xl mx-auto px-4 sm:px-6">
                    <motion.h2
                        className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Explore
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {linkCards.map((card) => {
                            const isExternal = card.href.startsWith("http");
                            return (
                                <motion.div
                                    key={card.title}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: card.delay }}
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
            <div className="container max-w-5xl mx-auto px-4 sm:px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <motion.footer
                className="py-8 sm:py-10 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-sm text-white/30 tracking-wide">
                    Zynd AI
                </p>
            </motion.footer>
        </div>
    );
}
