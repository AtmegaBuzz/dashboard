"use client"

import { motion } from "framer-motion";
import { Cpu, Network, Zap } from "lucide-react";

const roadmapItems = [
    {
        quarter: "Q3 2024",
        title: "Advanced ML matchmaking for optimal AI agent pairing",
        description: "Implementing sophisticated machine learning algorithms to ensure the most efficient and effective AI agent collaborations.",
        Icon: Cpu,
    },
    {
        quarter: "Q4 2024",
        title: "Integration with major AI standards and frameworks",
        description: "Expanding compatibility across leading AI platforms to create a truly unified ecosystem.",
        Icon: Network,
    },
    {
        quarter: "Q1 2025",
        title: "Edge computing support for low-latency AI interactions",
        description: "Bringing AI agent interactions closer to the source for faster, more efficient processing.",
        Icon: Zap,
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
        <section className="py-20 md:py-24">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-medium tracking-tighter mb-4">
                        Our Roadmap for the Future
                    </h2>
                    <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto tracking-tight">
                        Charting our course towards revolutionary AI communication
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
                            className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start mb-16 ${
                                index % 2 === 0 ? 'md:flex-row-reverse' : ''
                            }`}
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 rounded-full border border-purple-500/50 bg-[linear-gradient(to_bottom_left,rgb(140,69,255,0.2),black)]">
                                <item.Icon className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-500" />
                            </div>

                            {/* Content */}
                            <div className={`w-full md:w-[calc(50%-3rem)] pl-16 md:pl-0 ${
                                index % 2 === 0 ? 'md:text-right' : ''
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