"use client"

import { motion } from "framer-motion";
import { FileCode, Key, Search, Rocket, LucideIcon } from "lucide-react";

interface RoadmapItem {
    quarter: string;
    title: string;
    description: string;
    Icon: LucideIcon;
    color: string;
    status: "completed" | "inProgress" | "upcoming";
}

const roadmapItems: RoadmapItem[] = [
    {
        quarter: "Q4 2024",
        title: "Foundation & Protocol Design",
        description: "Releasing comprehensive litepaper and technical specifications for Zynd Protocol. Developing standardized communication protocol for agent-to-agent interaction.",
        Icon: FileCode,
        color: "#3B82F6", // Tech Blue
        status: "completed"
    },
    {
        quarter: "Q1 2025",
        title: "SDK & Integration Tools Launch",
        description: "Released Python SDK for LangChain/CrewAI integration and N8N custom nodes for workflow automation. Launched developer dashboard with DID credential management.",
        Icon: Key,
        color: "#7678ed", // Brand Purple
        status: "completed"
    },
    {
        quarter: "Q2 2025",
        title: "Discovery Protocol & Registry",
        description: "Enhanced agent registry with ML-powered semantic search. Expanding x402 payment network and cross-chain support for micropayments.",
        Icon: Search,
        color: "#06B6D4", // AI Teal
        status: "inProgress"
    },
    {
        quarter: "Q3 2025",
        title: "Network Launch & Tools",
        description: "Full protocol release with production SDK, developer tools, and documentation portal. Enabling secure agent collaboration and reputation tracking.",
        Icon: Rocket,
        color: "#EC4899", // Innovation Pink
        status: "upcoming"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
};

export function Roadmap() {
    return (
        <section id="roadmap" className="py-24 bg-[#111111] relative overflow-hidden">
            {/* Gradient Background Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(118,120,237,0.05),rgba(59,130,246,0.05),rgba(6,182,212,0.05))] opacity-50" />

            <div className="container max-w-6xl mx-auto px-4 relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Development Roadmap
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        From isolated AI agents to a collaborative network of specialized capabilities
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative max-w-4xl mx-auto"
                >
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#7678ed] via-[#3B82F6] to-[#06B6D4] opacity-20" />
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#7678ed] via-[#3B82F6] to-[#06B6D4] blur-sm opacity-50" />

                    {roadmapItems.map((item, index) => (
                        <motion.div
                            key={item.quarter}
                            variants={itemVariants}
                            className="relative"
                        >
                            <div className="relative flex gap-8 pb-12 group">
                                {/* Icon */}
                                <div
                                     className="relative size-16 shrink-0 rounded-2xl flex items-center justify-center bg-[#141414] border border-white/5 transition-all duration-300 group-hover:scale-110 group-hover:border-white/10 group-hover:shadow-[0_0_20px_-5px_currentColor]"
                                    style={{
                                        color: item.color,
                                        boxShadow: `0 0 0 1px ${item.color}20`
                                    }}
                                >
                                    <item.Icon
                                        className="size-7 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_currentColor]"
                                    />
                                    {/* Status indicator */}
                                    <div
                                         className={`absolute -right-1 -top-1 size-4 rounded-full border-4 border-[#111111] transition-all duration-300 ${item.status === 'completed' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' :
                                                 item.status === 'inProgress' ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-pulse' :
                                                     'bg-gray-600'
                                             }`}
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div
                                        className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                                        style={{
                                            backgroundColor: `${item.color}15`,
                                            color: item.color
                                        }}
                                    >
                                        {item.quarter}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-white/90">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/60">
                                        {item.description}
                                    </p>

                                    {/* Decorative line for hover effect */}
                                    <div
                                        className="absolute -inset-x-4 -inset-y-2 rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100"
                                        style={{
                                            background: `linear-gradient(45deg, ${item.color}10, transparent)`
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Roadmap;