"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {animate, motion, useMotionTemplate, useMotionValue, ValueAnimationTransition} from "framer-motion";
import {ComponentPropsWithoutRef, useEffect, useRef, useState} from "react";

const tabs = [
    {
        icon: "/assets/lottie/vroom.lottie",
        title: "Agent Identity Layer",
        description: "Decentralized identifiers (DIDs) and verifiable credentials built on PKI infrastructure enable agents to establish trusted identities on the network.",
        isNew: false,
        backgroundPositionX: 0,
        backgroundPositionY: 0,
        backgroundSizeX: 150,
        image: "/diagrams/identity-layer.png",
        color: "#3B82F6"
    },
    {
        icon: "/assets/lottie/click.lottie",
        title: "P2P Communication Layer",
        description: "Peer-to-peer network enables agent discovery, authentication, and secure messaging through standardized protocols.",
        isNew: false,
        backgroundPositionX: 98,
        backgroundPositionY: 100,
        backgroundSizeX: 135,
        image: "/diagrams/p2p-layer.png",
        color: "#7678ed"
    },
    {
        icon: "/assets/lottie/stars.lottie",
        title: "Blockchain Registry Layer",
        description: "Immutable ledger for credential verification, payment processing, and maintaining the chain of trust between agents.",
        isNew: true,
        backgroundPositionX: 100,
        backgroundPositionY: 27,
        backgroundSizeX: 177,
        image: "/diagrams/blockchain-layer.png",
        color: "#06B6D4"
    }
];

interface FeatureTabProps extends ComponentPropsWithoutRef<"div"> {
    icon: string;
    title: string;
    description: string;
    isNew: boolean;
    selected: boolean;
    color: string;
    backgroundPositionX: number;
    backgroundPositionY: number;
    backgroundSizeX: number;
}

const FeatureTab = ({ 
    icon, 
    title,
    description, 
    isNew, 
    selected, 
    color,
    onClick,
    backgroundPositionX,
    backgroundPositionY,
    backgroundSizeX 
}: FeatureTabProps) => {
    const tabRef = useRef<HTMLDivElement>(null);
    const [dotLottie, setDotLottie] = useState<any>(null);

    const xPercentage = useMotionValue(0);
    const yPercentage = useMotionValue(0);

    const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black, transparent)`;

    useEffect(() => {
        if (!tabRef.current || !selected) return;

        xPercentage.set(0);
        yPercentage.set(0);
        const {height, width} = tabRef.current?.getBoundingClientRect();
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
            className={`relative flex flex-col p-6 gap-3 rounded-xl cursor-pointer transition-all duration-300 ${
                selected ? 'bg-[#1A1A1A]' : 'bg-[#141414] hover:bg-[#1A1A1A]'
            }`}
            style={{
                boxShadow: selected ? `0 0 0 1px ${color}30` : 'none'
            }}
            ref={tabRef}
            onClick={onClick}
        >
            {selected && (
                <motion.div
                    className="absolute inset-0 -m-px rounded-xl"
                    style={{ 
                        background: `linear-gradient(45deg, ${color}20, transparent)`,
                        borderRadius: '12px',
                        maskImage
                    }}
                />
            )}

            <div className="flex items-center gap-2.5 relative z-10">
                <div 
                    className={`size-12 rounded-lg inline-flex items-center justify-center transition-colors duration-300 bg-[#232323]`}
                    style={{ 
                        boxShadow: selected ? `0 0 0 1px ${color}30` : 'none',
                    }}
                >
                    <DotLottieReact
                        src={icon}
                        autoplay={false}
                        loop={false}
                        className="size-5"
                        dotLottieRefCallback={dotLottieRefCallback}
                    />
                </div>
                <div className="font-medium text-white/90 flex-1">{title}</div>
                {isNew && (
                    <div 
                        className="text-xs rounded-full px-2 py-0.5 font-medium"
                        style={{ 
                            backgroundColor: `${color}20`,
                            color: color
                        }}
                    >
                        New
                    </div>
                )}
            </div>
            <p className="text-sm text-white/60 relative z-10">{description}</p>
        </div>
    );
};

export function ArchitectureDiagrams() {
    const [selectedTab, setSelectedTab] = useState(0);

    const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX);
    const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY);
    const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX);

    const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`;
    const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`;

    const handleSelectTab = (index: number) => {
        setSelectedTab(index);

        const animateOptions: ValueAnimationTransition = {
            duration: 2,
            ease: "easeInOut",
        };
        animate(
            backgroundSizeX,
            [backgroundSizeX.get(), 100, tabs[index].backgroundSizeX],
            animateOptions
        );
        animate(
            backgroundPositionX,
            [backgroundPositionX.get(), tabs[index].backgroundPositionX],
            animateOptions
        );
        animate(
            backgroundPositionY,
            [backgroundPositionY.get(), tabs[index].backgroundPositionY],
            animateOptions
        );
    };

    return (
        <section id="technical" className="py-24 bg-[#111111] relative overflow-hidden">
            {/* Gradient Background Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(118,120,237,0.05),rgba(59,130,246,0.05),rgba(6,182,212,0.05))] opacity-50" />
            
            <div className="container max-w-6xl mx-auto px-4 relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Technical Architecture
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        A layered approach to secure, decentralized AI agent communication and collaboration.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-3">
                    {tabs.map((tab, index) => (
                        <FeatureTab
                            {...tab}
                            key={tab.title}
                            onClick={() => handleSelectTab(index)}
                            selected={selectedTab === index}
                            color={tab.color}
                        />
                    ))}
                </div>

                <motion.div className="bg-[#141414] rounded-xl p-2.5 mt-3">
                    <div
                        className="aspect-video bg-cover rounded-lg"
                        style={{
                            backgroundPosition: backgroundPosition.get(),
                            backgroundSize: backgroundSize.get(),
                            backgroundImage: `url(${tabs[selectedTab].image})`,
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
}

export default ArchitectureDiagrams;