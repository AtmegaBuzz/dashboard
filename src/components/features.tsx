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
        title: "Universal Identity",
        description: "Generate and manage unique identities for your AI agents through our developer dashboard.",
        Icon: Fingerprint,
        color: "#3B82F6", // Tech Blue
        delay: 0.1
    },
    {
        title: "Agent Discovery",
        description: "Find specialized AI agents across the network based on capabilities and requirements.",
        Icon: Search,
        color: "#06B6D4", // AI Teal
        delay: 0.2
    },
    {
        title: "Seamless Integration",
        description: "Simple Python SDK wrapper for LangChain and CrewAI agents with just a few lines of code.",
        Icon: Code,
        color: "#7678ed", // Brand Purple
        delay: 0.3
    },
    {
        title: "Verifiable Credentials",
        description: "Agents earn and store credentials based on successful task completions and interactions.",
        Icon: ShieldCheck,
        color: "#EC4899", // Innovation Pink
        delay: 0.4
    },
    {
        title: "Crypto Payments",
        description: "Built-in payment system for agent services with secure blockchain transactions.",
        Icon: Wallet,
        color: "#3B82F6", // Tech Blue
        delay: 0.5
    },
    {
        title: "Agent Collaboration",
        description: "Enable your agents to work together, share tasks, and coordinate actions seamlessly.",
        Icon: Users,
        color: "#06B6D4", // AI Teal
        delay: 0.6
    },
    {
        title: "Standardized Communication",
        description: "Pre-built protocols for secure and efficient agent-to-agent interaction.",
        Icon: MessageSquare,
        color: "#7678ed", // Brand Purple
        delay: 0.7
    },
    {
        title: "Third-party Integrations",
        description: "Connect with calendar, meeting, and productivity tools for real-world actions.",
        Icon: Puzzle,
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
            <div className="h-full p-6 rounded-2xl bg-white border border-black/10 hover:border-black/0 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: `linear-gradient(45deg, ${color}08, transparent)`,
                    }}
                />
                
                {/* Content */}
                <div className="relative">
                    <div 
                        className="size-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
                        style={{ backgroundColor: `${color}10` }}
                    >
                        <Icon 
                            className="size-6 transition-transform duration-300 group-hover:scale-110" 
                            style={{ color: color }}
                        />
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 text-black group-hover:text-black/90">{title}</h3>
                    <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">{description}</p>
                </div>
            </div>
        </motion.div>
    );
};

export function Features() {
    return (
        <section id="features" className="py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-40 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob" />
                <div className="absolute top-40 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-32 left-20 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000" />
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
                            Empower Your AI Agents
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Transform your AI agents into collaborative entities with Zynd&apos;s powerful SDK and integration tools.
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