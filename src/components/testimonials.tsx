"use client"

import { motion } from "framer-motion";
import { 
    Network, 
    FileCode2,
    ShieldCheck,
    Blocks,
    GitCompare,
    LucideIcon
} from "lucide-react";

interface Feature {
    title: string;
    description: string;
    Icon: LucideIcon;
}

interface FeatureCardProps {
    feature: Feature;
}

const features: Feature[] = [
    {
        title: "Decentralized Architecture",
        description: "Enabling robust and scalable AI agent interactions.",
        Icon: Network
    },
    {
        title: "Standardized Protocols",
        description: "Ensuring seamless communication across diverse AI networks.",
        Icon: FileCode2
    },
    {
        title: "Secure Identity Management",
        description: "Protecting AI agents with robust authentication mechanisms.",
        Icon: ShieldCheck
    },
    {
        title: "Blockchain-Based Registry",
        description: "Maintaining a transparent and immutable record of AI interactions.",
        Icon: Blocks
    },
    {
        title: "Cross-Network Compatibility",
        description: "Bridging AI ecosystems for unprecedented collaboration.",
        Icon: GitCompare
    }
];

const FeatureCard = ({ feature }: FeatureCardProps) => {
    return (
        <motion.div
            className="relative group border border-muted p-6 md:p-10 rounded-xl bg-[linear-gradient(to_bottom_left,rgb(140,69,255,0.3),black)] max-w-xs md:max-w-md flex-none"
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
            <div className="relative bg-black/50 rounded-lg p-6 md:p-8 backdrop-blur-sm border border-white/10 transition-colors duration-300 group-hover:border-purple-500/50">
                <div className="relative mb-6">
                    <div className="relative inline-block p-3 transition-all duration-300 after:content-[''] after:absolute after:inset-0 after:bg-[rgb(140,69,244)] after:mix-blend-soft-light after:rounded-lg before:content-[''] before:absolute before:inset-0 before:border before:border-white/30 before:z-10 before:rounded-lg group-hover:after:bg-purple-500">
                        <feature.Icon className="size-8 relative z-20 text-white transition-transform duration-500 group-hover:rotate-12" />
                    </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-2 bg-clip-text transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-400">
                    {feature.title}
                </h3>
                
                <p className="text-white/70 text-lg tracking-tight transition-colors duration-300 group-hover:text-white/90">
                    {feature.description}
                </p>

                {/* Animated corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent rounded-tl-lg transition-colors duration-300 group-hover:border-purple-500/50" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent rounded-tr-lg transition-colors duration-300 group-hover:border-purple-500/50" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-transparent rounded-bl-lg transition-colors duration-300 group-hover:border-purple-500/50" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-transparent rounded-tr-lg transition-colors duration-300 group-hover:border-purple-500/50" />
            </div>
        </motion.div>
    );
};

export function Testimonials() {
    return (
        <section className="py-20 md:py-24">
            <div className="container">
                <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
                    Key Features
                </h2>
                <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-5">
                    Explore the core capabilities driving the future of autonomous AI communication.
                </p>
                <div className="flex overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                    <motion.div
                        initial={{ translateX: '-50%' }}
                        animate={{ translateX: '0' }}
                        transition={{
                            repeat: Infinity,
                            duration: 50,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                        className="flex flex-none gap-5"
                    >
                        {[...features, ...features].map((feature, index) => (
                            <FeatureCard key={index} feature={feature} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;