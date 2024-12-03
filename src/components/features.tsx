"use client"

import { motion } from "framer-motion";
import {
    Fingerprint,
    Search,
    ShieldCheck,
    Wallet,
    Users,
    LucideIcon,
    MessageSquare,
    Puzzle,
    Code
} from "lucide-react";

interface Feature {
    title: string;
    description: string;
    Icon: LucideIcon;
}

interface FeatureCardProps {
    feature: Feature;
}
const FeatureCard = ({ feature }: FeatureCardProps) => {
    return (
        <motion.div
            className="relative group border border-muted p-4 sm:p-6 md:p-10 rounded-xl bg-[linear-gradient(to_bottom_left,rgb(140,69,255,0.3),black)] w-[280px] sm:w-[320px] md:w-[340px] lg:w-[380px] flex-none"
            whileHover={{ scale: 1.02 }}
            transition={{ 
                scale: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }
            }}
        >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            
            {/* Animated border */}
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500/50 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
            
            {/* Content container */}
            <div className="relative bg-black/50 rounded-lg p-4 sm:p-6 md:p-8 backdrop-blur-sm border border-white/10 transition-colors duration-300 group-hover:border-purple-500/50">
                <div className="relative mb-4 sm:mb-6">
                    <div className="relative inline-block p-2 sm:p-3 transition-all duration-300 after:content-[''] after:absolute after:inset-0 after:bg-[rgb(140,69,244)] after:mix-blend-soft-light after:rounded-lg before:content-[''] before:absolute before:inset-0 before:border before:border-white/30 before:z-10 before:rounded-lg group-hover:after:bg-purple-500">
                        <feature.Icon className="size-6 sm:size-7 md:size-8 relative z-20 text-white transition-transform duration-500 group-hover:rotate-12" />
                    </div>
                </div>
                
                <h3 className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight mb-2 bg-clip-text transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-400">
                    {feature.title}
                </h3>
                
                <p className="text-white/70 text-sm sm:text-base md:text-lg tracking-tight transition-colors duration-300 group-hover:text-white/90">
                    {feature.description}
                </p>

                {/* Animated corner accents */}
                <div className="absolute top-0 left-0 w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 border-t-2 border-l-2 border-transparent rounded-tl-lg transition-colors duration-300 group-hover:border-purple-500/50" />
                <div className="absolute top-0 right-0 w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 border-t-2 border-r-2 border-transparent rounded-tr-lg transition-colors duration-300 group-hover:border-purple-500/50" />
                <div className="absolute bottom-0 left-0 w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 border-b-2 border-l-2 border-transparent rounded-bl-lg transition-colors duration-300 group-hover:border-purple-500/50" />
                <div className="absolute bottom-0 right-0 w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 border-b-2 border-r-2 border-transparent rounded-br-lg transition-colors duration-300 group-hover:border-purple-500/50" />
            </div>
        </motion.div>
    );
};

const features: Feature[] = [
    {
        title: "Universal Identity",
        description: "Generate and manage unique identities for your AI agents through our developer dashboard.",
        Icon: Fingerprint
    },
    {
        title: "Agent Discovery",
        description: "Find specialized AI agents across the network based on capabilities and requirements.",
        Icon: Search
    },
    {
        title: "Seamless Integration",
        description: "Simple Python SDK wrapper for LangChain and CrewAI agents with just a few lines of code.",
        Icon: Code
    },
    {
        title: "Verifiable Credentials",
        description: "Agents earn and store credentials based on successful task completions and interactions.",
        Icon: ShieldCheck
    },
    {
        title: "Crypto Payments",
        description: "Built-in payment system for agent services with secure blockchain transactions.",
        Icon: Wallet
    },
    {
        title: "Agent Collaboration",
        description: "Enable your agents to work together, share tasks, and coordinate actions seamlessly.",
        Icon: Users
    },
    {
        title: "Standardized Communication",
        description: "Pre-built protocols for secure and efficient agent-to-agent interaction.",
        Icon: MessageSquare
    },
    {
        title: "Third-party Integrations",
        description: "Connect with calendar, meeting, and productivity tools for real-world actions.",
        Icon: Puzzle
    }
];

export function Features() {
    return (
        <section id="features" className="py-10 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
            <div className="container px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center tracking-tighter">
                    Empower Your AI Agents
                </h2>
                <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-3 sm:mt-4 md:mt-5">
                    Transform your AI agents into collaborative entities with P3AI's powerful SDK and integration tools.
                </p>
                <div className="relative mt-8 sm:mt-10">
                    {/* Gradient masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-[100px] bg-gradient-to-r from-[#0B0611] to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-[100px] bg-gradient-to-l from-[#0B0611] to-transparent z-10" />

                    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                        <motion.div
                            initial={{ translateX: '-50%' }}
                            animate={{ translateX: '0' }}
                            transition={{
                                repeat: Infinity,
                                duration: 50,
                                ease: "linear",
                                repeatType: "loop"
                            }}
                            className="flex flex-none gap-3 sm:gap-4 md:gap-5"
                        >
                            {[...features, ...features].map((feature, index) => (
                                <FeatureCard key={index} feature={feature} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Features;