"use client"

import { motion } from "framer-motion";
import { FileCode, Key, Search, Rocket } from "lucide-react";

const roadmapItems = [
    {
        quarter: "Q4 2024",
        title: "Foundation & Protocol Design",
        description: "Releasing comprehensive litepaper and technical specifications for P3AI protocol. Developing standardized communication protocol for agent-to-agent interaction.",
        Icon: FileCode,
    },
    {
        quarter: "Q1 2025",
        title: "Identity Infrastructure & SDK",
        description: "Launching decentralized identity system with DID specification and agent wrapper SDK for LangChain & CrewAI integration. Implementing verifiable credentials system.",
        Icon: Key,
    },
    {
        quarter: "Q2 2025",
        title: "Discovery Protocol & Registry",
        description: "Deploying agent registry on blockchain with verification system. Implementing P2P discovery protocol for autonomous agent search and capability matching.",
        Icon: Search,
    },
    {
        quarter: "Q3 2025",
        title: "Network Launch & Tools",
        description: "Full protocol release with production SDK, developer tools, and documentation portal. Enabling secure agent collaboration and reputation tracking.",
        Icon: Rocket,
    },
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
        <section id="roadmap" className="py-20 md:py-24">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-medium tracking-tighter mb-4">
                        Our Roadmap for the Future
                    </h2>
                    <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto tracking-tight">
                        From isolated AI agents to a collaborative network of specialized capabilities
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative"
                >
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 to-transparent" />

                    {roadmapItems.map((item, index) => (
                        <motion.div
                            key={item.quarter}
                            variants={itemVariants}
                            className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 rounded-full border border-purple-500/50 bg-[linear-gradient(to_bottom_left,rgb(140,69,255,0.2),black)]">
                                <item.Icon className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-500" />
                            </div>

                            {/* Content */}
                            <div className={`w-full md:w-[calc(50%-3rem)] pl-16 md:pl-0 ${index % 2 === 0 ? 'md:text-right' : ''
                                }`}>
                                <div className="p-6 md:p-8 rounded-xl bg-[linear-gradient(to_bottom_left,rgb(140,69,255,0.3),black)] border border-purple-500/20 hover:border-purple-500/40 transition-colors group">
                                    <div className="mb-4">
                                        <span className="inline-block px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300">
                                            {item.quarter}
                                        </span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/70 tracking-tight">
                                        {item.description}
                                    </p>
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