"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { Network, Cpu, Workflow, Brain, Shield, Database, Boxes } from 'lucide-react';
import { MouseParallax } from 'react-just-parallax';

export const HeroSection = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const nodesRef = useRef([]);
    const parallaxRef = useRef(null);

    // Define nodes with their positions, sizes, and icons
    const nodes = [
        { x: '20%', y: '30%', size: 16, delay: 0, icon: Network },
        { x: '60%', y: '25%', size: 20, delay: 0.2, icon: Brain },
        { x: '85%', y: '45%', size: 14, delay: 0.4, icon: Shield },
        { x: '30%', y: '60%', size: 18, delay: 0.6, icon: Database },
        { x: '70%', y: '70%', size: 16, delay: 0.8, icon: Workflow },
        { x: '45%', y: '40%', size: 22, delay: 1, icon: Cpu },
        { x: '15%', y: '75%', size: 14, delay: 1.2, icon: Boxes }
    ];

    return (
        <motion.section
            ref={containerRef}
            className="h-[492px] md:h-[800px] flex items-center overflow-hidden relative bg-black"
        >
            
            {/* Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(140,69,255,0.5)_15%,rgb(14,0,36,0.5)_78%,transparent)]" />

            {/* Network visualization */}
            <div className="absolute inset-0 overflow-hidden">

                <MouseParallax strength={0.07} parallaxContainerRef={parallaxRef}>

                    {/* Nodes */}
                    {nodes.map((node, index) => {
                        const IconComponent = node.icon;
                        return (
                            <motion.div
                                key={index}
                                className="absolute cursor-pointer"
                                style={{
                                    left: node.x,
                                    top: node.y,
                                    width: node.size * 2,
                                    height: node.size * 2,
                                    x: `-${node.size}px`,
                                    y: `-${node.size}px`
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.7, 1, 0.7]
                                }}
                                whileHover={{ scale: 1.2 }}
                                transition={{
                                    duration: 4,
                                    delay: node.delay,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="relative w-full h-full group">
                                    {/* Glow effect */}
                                    <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-md 
                              group-hover:bg-purple-500/40 transition-all duration-300" />
                                    {/* Node circle with icon */}
                                    <div className="relative w-full h-full bg-purple-500/30 rounded-full 
                              border border-purple-300/30 flex items-center justify-center
                              group-hover:bg-purple-500/50 transition-all duration-300">
                                        <IconComponent className="text-purple-100 w-1/2 h-1/2" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </MouseParallax>
            </div>

            {/* Content */}
            <div className="container relative mt-16 z-10">
                <h1 className="text-6xl md:text-[120px] font-semibold tracking-tighter text-center">
                    <span className="bg-gradient-to-br from-white via-white to-purple-500/50 bg-clip-text text-transparent">
                        P3AI.Network
                    </span>
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/70 mt-5 text-center">
                    Connecting Autonomous AI Agents Through a Universal Identity Framework
                </p>
                <div className="flex justify-center mt-8">
                    <motion.button
                        className="px-8 py-3 rounded-full bg-purple-500 text-white font-medium 
                     hover:bg-purple-600 transition-colors duration-200 shadow-lg shadow-purple-500/25"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Join the Network
                    </motion.button>
                </div>
            </div>

        </motion.section>
    );
};
