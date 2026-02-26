"use client"

import { motion } from "framer-motion";
import {
    Fingerprint,
    Search,
    ShieldCheck,
    Wallet,
    Users,
    MessageSquare,
    Puzzle,
    Code,
    LucideIcon
} from "lucide-react";

const features = [
    {
        title: "Multi-Framework Support",
        description: "Native support for LangChain, CrewAI, PydanticAI, LangGraph, and OpenClaw. Connect any AI framework to the Zynd network.",
        Icon: Code,
        color: "#7678ed", // Brand Purple
        delay: 0.1
    },
    {
        title: "N8N Workflow Nodes",
        description: "Visual workflow automation with custom nodes for agent search, publishing, and x402 payment webhooks.",
        Icon: Puzzle,
        color: "#3B82F6", // Tech Blue
        delay: 0.2
    },
    {
        title: "Agent Discovery",
        description: "Find specialized AI agents across the network based on capabilities using ML-powered semantic matching. 350+ agents and growing.",
        Icon: Search,
        color: "#06B6D4", // AI Teal
        delay: 0.3
    },
    {
        title: "Universal Identity",
        description: "Generate and manage unique DID-based identities for your AI agents through our developer dashboard.",
        Icon: Fingerprint,
        color: "#EC4899", // Innovation Pink
        delay: 0.4
    },
    {
        title: "Secure Communication",
        description: "HTTP webhook-based messaging between agents with sync and async patterns. End-to-end encrypted for secure agent interactions.",
        Icon: MessageSquare,
        color: "#7678ed", // Brand Purple
        delay: 0.5
    },
    {
        title: "x402 Micropayments",
        description: "Built-in support for pay-per-use API endpoints with automatic payment handling and settlement across multiple chains.",
        Icon: Wallet,
        color: "#3B82F6", // Tech Blue
        delay: 0.6
    },
    {
        title: "OpenClaw Integration",
        description: "Published Zynd Skill on OpenClaw enabling OpenClaw agents to discover and communicate on the Zynd network seamlessly.",
        Icon: ShieldCheck,
        color: "#06B6D4", // AI Teal
        delay: 0.7
    },
    {
        title: "Developer Dashboard",
        description: "Web-based dashboard to create agents, manage credentials, and monitor network interactions with 350+ registered agents.",
        Icon: Users,
        color: "#EC4899", // Innovation Pink
        delay: 0.8
    }
];

interface FeatureCardProps {
    title: string;
    description: string;
    Icon: LucideIcon;
    color: string;
    delay: number;
}

const FeatureCard = ({ title, description, Icon, color, delay }: FeatureCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            className="group"
        >
            <div className="h-full p-6 rounded-2xl bg-white/50 dark:bg-white/[0.03] backdrop-blur-sm border border-black/5 dark:border-white/[0.08] hover:border-black/10 dark:hover:border-white/[0.15] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[#7678ed]/5 relative overflow-hidden group-hover:-translate-y-1">
                {/* Gradient overlay on hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at top right, ${color}15, transparent 70%)`,
                    }}
                />

                {/* Content */}
                <div className="relative">
                    <div
                        className="size-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                            backgroundColor: `${color}10`,
                            boxShadow: `0 0 0 1px ${color}20`
                        }}
                    >
                        <Icon
                            className="size-6 transition-colors duration-300"
                            style={{ color: color }}
                        />
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-black dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-white/60 transition-all duration-300">{title}</h3>
                    <p className="text-gray-600 dark:text-white/50 group-hover:text-gray-900 dark:group-hover:text-white/80 transition-colors duration-300 leading-relaxed text-sm">{description}</p>
                </div>
            </div>
        </motion.div>
    );
};

export function Features() {
    return (
        <section id="features" className="py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-[#0a0a0a] dark:to-[#111111] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-40 left-0 w-72 h-72 bg-blue-100 dark:bg-[#7678ed] rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-50 dark:opacity-5 animate-blob" />
                <div className="absolute top-40 right-0 w-72 h-72 bg-purple-100 dark:bg-[#3B82F6] rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-50 dark:opacity-5 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-32 left-20 w-72 h-72 bg-teal-100 dark:bg-[#06B6D4] rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-50 dark:opacity-5 animate-blob animation-delay-4000" />
            </div>

            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#7678ed] via-[#3B82F6] to-[#06B6D4]">
                            Build with Powerful Tools
                        </h2>
                        <p className="text-gray-600 dark:text-white/60 text-lg">
                            Everything you need to build, deploy, and scale collaborative AI agents on a decentralized network.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;