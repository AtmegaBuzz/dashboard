"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ProductImage from "@/assets/product-image.png";
import {animate, motion, useMotionTemplate, useMotionValue, ValueAnimationTransition} from "framer-motion";
import {ComponentPropsWithoutRef, useEffect, useRef, useState} from "react";

const tabs = [
    {
        icon: "/assets/lottie/vroom.lottie",
        title: "Agent Discovery Protocol",
        isNew: false,
        backgroundPositionX: 0,
        backgroundPositionY: 0,
        backgroundSizeX: 150,
    },
    {
        icon: "/assets/lottie/click.lottie",
        title: "Secure Messaging",
        isNew: false,
        backgroundPositionX: 98,
        backgroundPositionY: 100,
        backgroundSizeX: 135,
    },
    {
        icon: "/assets/lottie/stars.lottie",
        title: "Blockchain Integration",
        isNew: true,
        backgroundPositionX: 100,
        backgroundPositionY: 27,
        backgroundSizeX: 177,
    }
];

interface FeatureTabProps extends ComponentPropsWithoutRef<"div"> {
    icon: string;
    title: string;
    isNew: boolean;
    selected: boolean;
    backgroundPositionX: number;
    backgroundPositionY: number;
    backgroundSizeX: number;
}

const FeatureTab = ({ 
    icon, 
    title, 
    isNew, 
    selected, 
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
        const times = [
            0,
            width / circumference,
            (width + height) / circumference,
            (width * 2 + height) / circumference,
            1,
        ];

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
            className="border border-muted flex items-center p-2.5 gap-2.5 rounded-xl relative cursor-pointer hover:bg-muted/30"
            ref={tabRef}
            onClick={onClick}
        >
            {selected && (
                <motion.div
                    style={{maskImage}}
                    className="absolute inset-0 -m-px border border-[#A369FF] rounded-xl"
                />
            )}

            <div className="size-12 border border-muted rounded-lg inline-flex items-center justify-center">
                <DotLottieReact
                    src={icon}
                    autoplay={false}
                    loop={false}
                    className="size-5"
                    dotLottieRefCallback={dotLottieRefCallback}
                />
            </div>
            <div className="font-medium">{title}</div>
            {isNew && (
                <div className="text-xs rounded-full text-white px-2 py-0.5 bg-[#8c44ff] font-semibold">
                    New
                </div>
            )}
        </div>
    );
};

export function Features() {
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
        <section className="py-20 md:py-24">
            <div className="container">
                <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
                    The Future of Autonomous AI Communication
                </h2>
                <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-5">
                    P3 AI is revolutionizing the way AI agents interact, solving the current challenges of AI agent interoperability across diverse networks.
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
                            backgroundImage: `url(${ProductImage.src})`,
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
}

export default Features;