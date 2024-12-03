'use client'

import React from 'react';
import { Network, Brain, Shield, Sparkles } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const HeroSection = () => {
    return (
        <div id='about' className="relative bg-gradient-to-b from-[#0B0611] via-[#0B0611] to-[#0B0611] overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem] animate-[grid_20s_linear_infinite]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-8">
                    {/* Content - Left Section */}
                    <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
                            <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
                            <span className="text-blue-400 text-sm font-medium">Shaping the Future of AI</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            Connecting AI Agents Through a{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Universal Identity Network
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-300">
                            In a world where AI agents operate in isolation, P3AI is building the synaptic infrastructure
                            that enables seamless collaboration between specialized and general AI systems.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity">
                                Start Building
                            </button>
                            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-lg text-white font-semibold hover:bg-white/20 transition-colors">
                                View Documentation
                            </button>
                        </div>

                    </div>

                    {/* Lottie Animation - Right Section */}
                    <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
                        <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[600px] flex items-center justify-center">
                            <DotLottieReact
                                src={"/assets/lottie/ainetwork.lottie"}
                                autoplay={true}
                                loop={true}
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};