"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ProductImage from "@/assets/product-image.png";
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
        image: "/diagrams/identity-layer.png"
    },
    {
        icon: "/assets/lottie/click.lottie",
        title: "P2P Communication Layer",
        description: "Peer-to-peer network enables agent discovery, authentication, and secure messaging through standardized protocols.",
        isNew: false,
        backgroundPositionX: 98,
        backgroundPositionY: 100,
        backgroundSizeX: 135,
        image: "/diagrams/p2p-layer.png"
    },
    {
        icon: "/assets/lottie/stars.lottie",
        title: "Blockchain Registry Layer",
        description: "Immutable ledger for credential verification, payment processing, and maintaining the chain of trust between agents.",
        isNew: true,
        backgroundPositionX: 100,
        backgroundPositionY: 27,
        backgroundSizeX: 177,
        image: "/diagrams/blockchain-layer.png"
    }
];

interface FeatureTabProps extends ComponentPropsWithoutRef<"div"> {
    icon: string;
    title: string;
    description: string;
    isNew: boolean;
    selected: boolean;
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
    onClick,
    backgroundPositionX,
    backgroundPositionY,
    backgroundSizeX 
}: FeatureTabProps) => {
    // [Previous FeatureTab implementation remains the same]
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
    }, [selected]);

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
            className="border border-muted flex flex-col p-4 gap-3 rounded-xl relative cursor-pointer hover:bg-muted/30"
            ref={tabRef}
            onClick={onClick}
        >
            {selected && (
                <motion.div
                    style={{maskImage}}
                    className="absolute inset-0 -m-px border border-[#A369FF] rounded-xl"
                />
            )}

            <div className="flex items-center gap-2.5">
                <div className="size-12 border border-muted rounded-lg inline-flex items-center justify-center">
                    <DotLottieReact
                        src={icon}
                        autoplay={false}
                        loop={false}
                        className="size-5"
                        dotLottieRefCallback={dotLottieRefCallback}
                    />
                </div>
                <div className="font-medium flex-1">{title}</div>
                {isNew && (
                    <div className="text-xs rounded-full text-white px-2 py-0.5 bg-[#8c44ff] font-semibold">
                        New
                    </div>
                )}
            </div>
            <p className="text-sm text-white/70">{description}</p>
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
        <section id='technical' className="py-20 md:py-24">
            <div className="container">
                <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
                    Technical Architecture
                </h2>
                <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-5">
                    A layered approach to secure, decentralized AI agent communication and collaboration.
                </p>

                <div className="mt-10 grid lg:grid-cols-3 gap-3">
                    {tabs.map((tab, index) => (
                        <FeatureTab
                            {...tab}
                            key={tab.title}
                            onClick={() => handleSelectTab(index)}
                            selected={selectedTab === index}
                        />
                    ))}
                </div>
                <motion.div className="border border-muted rounded-xl p-2.5 mt-3">
                    <div
                        className="aspect-video bg-cover border border-muted rounded-lg"
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