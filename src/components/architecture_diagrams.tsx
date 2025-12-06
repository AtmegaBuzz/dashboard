"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { animate, motion, useMotionTemplate, useMotionValue, ValueAnimationTransition } from "framer-motion";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

const tabs = [
    {
        icon: "/assets/lottie/vroom.lottie",
        title: "Identity Layer",
        description: "DID-based identities and verifiable credentials. Secure agent registration and authentication.",
        isNew: false,
        image: "/assets/architecture/identity-layer.png",
        color: "#EC4899" // Pink
    },
    {
        icon: "/assets/lottie/click.lottie",
        title: "Communication Layer",
        description: "Encrypted MQTT messaging for secure, real-time agent-to-agent communication.",
        isNew: false,
        image: "/assets/architecture/communication-layer.png",
        color: "#7678ed" // Purple
    },
    {
        icon: "/assets/lottie/stars.lottie",
        title: "Search & Discovery",
        description: "Semantic matching engine to find the right agents for complex collaborative tasks.",
        isNew: true,
        image: "/assets/architecture/search-discovery-layer.png",
        color: "#3B82F6" // Blue
    },
    {
        icon: "/assets/lottie/vroom.lottie", // Reusing vroom or could use another if available
        title: "Payments Layer",
        description: "x402 micropayments and on-chain settlement for trustless API monetization.",
        isNew: true,
        image: "/assets/architecture/payment-layer.png",
        color: "#06B6D4" // Teal
    }
];

interface FeatureTabProps extends ComponentPropsWithoutRef<"div"> {
    icon: string;
    title: string;
    description: string;
    isNew: boolean;
    selected: boolean;
    color: string;
}

const FeatureTab = ({
    icon,
    title,
    description,
    isNew,
    selected,
    color,
    onClick
}: FeatureTabProps) => {
    const tabRef = useRef<HTMLDivElement>(null);
    const [dotLottie, setDotLottie] = useState<any>(null);

    const xPercentage = useMotionValue(0);
    const yPercentage = useMotionValue(0);

    const maskImage = useMotionTemplate`radial-gradient(120px 120px at ${xPercentage}% ${yPercentage}%, black, transparent)`;

    useEffect(() => {
        if (!tabRef.current || !selected) return;

        xPercentage.set(0);
        yPercentage.set(0);
        const { height, width } = tabRef.current?.getBoundingClientRect();
        const circumference = height * 2 + width * 2;
        const times = [0, width / circumference, (width + height) / circumference, (width * 2 + height) / circumference, 1];

        const options: ValueAnimationTransition = {
            times,
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
        };

        animate(xPercentage, [0, 100, 100, 0, 0], options);
        animate(yPercentage, [0, 0, 100, 100, 0], options);
    }, [selected, xPercentage, yPercentage]);

    const handleTabHover = () => {
        if (dotLottie) {
            dotLottie.stop();
            dotLottie.play();
        }
    };

    const dotLottieRefCallback = (ref: any) => {
        setDotLottie(ref);
    };

    return (
        <div
            onMouseEnter={handleTabHover}
            className={`relative flex flex-col p-6 gap-3 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden group ${selected ? 'bg-[#1A1A1A]' : 'bg-[#141414] hover:bg-[#1A1A1A]'
                }`}
            ref={tabRef}
            onClick={onClick}
        >
            {/* Active Border Gradient */}
            {selected && (
                <motion.div
                    className="absolute inset-0 -m-px rounded-2xl z-0"
                    style={{
                        background: `linear-gradient(45deg, ${color}, transparent, ${color})`,
                        maskImage,
                        opacity: 1
                    }}
                />
            )}

            {/* Hover Gradient */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at top right, ${color}10, transparent 70%)`
                }}
            />

            <div className="flex items-center gap-3 relative z-10">
                <div
                    className={`size-12 rounded-xl inline-flex items-center justify-center transition-all duration-300 bg-[#232323] group-hover:scale-110`}
                    style={{
                        boxShadow: selected ? `0 0 0 1px ${color}40, 0 0 10px ${color}20` : 'none',
                    }}
                >
                    <DotLottieReact
                        src={icon}
                        autoplay={false}
                        loop={false}
                        className="size-6"
                        dotLottieRefCallback={dotLottieRefCallback}
                    />
                </div>
                <div className="font-bold text-white/90 flex-1 text-lg tracking-tight">{title}</div>
                {isNew && (
                    <div
                        className="text-[10px] uppercase tracking-wider rounded-full px-2 py-0.5 font-bold shadow-[0_0_10px_currentColor]"
                        style={{
                            backgroundColor: `${color}20`,
                            color: color,
                            borderColor: `${color}40`,
                            borderWidth: '1px'
                        }}
                    >
                        New
                    </div>
                )}
            </div>
            <p className="text-sm text-white/60 relative z-10 leading-relaxed group-hover:text-white/80 transition-colors duration-300">{description}</p>
        </div>
    );
};

export function ArchitectureDiagrams() {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <section id="technical" className="py-24 bg-[#111111] relative overflow-hidden">
            {/* Gradient Background Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(118,120,237,0.05),rgba(59,130,246,0.05),rgba(6,182,212,0.05))] opacity-50" />

            <div className="container max-w-7xl mx-auto px-4 relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Technical Architecture
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        A layered approach to secure, decentralized communication powered by our SDK and integration tools.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {tabs.map((tab, index) => (
                        <FeatureTab
                            {...tab}
                            key={tab.title}
                            onClick={() => setSelectedTab(index)}
                            selected={selectedTab === index}
                            color={tab.color}
                        />
                    ))}
                </div>

                <motion.div
                    className="bg-white rounded-2xl p-8 mt-8 border border-white/10 relative overflow-hidden min-h-[400px] flex items-center justify-center shadow-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {/* Background Glow (Subtle on white) */}
                    <div
                        className="absolute inset-0 opacity-10 transition-colors duration-500"
                        style={{
                            background: `radial-gradient(circle at center, ${tabs[selectedTab].color}, transparent 70%)`
                        }}
                    />

                    <motion.div
                        key={selectedTab}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="relative z-10 w-full max-w-4xl"
                    >
                        <img
                            src={tabs[selectedTab].image}
                            alt={tabs[selectedTab].title}
                            className="w-full h-auto object-contain max-h-[500px]"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default ArchitectureDiagrams;