"use client"

import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ArrowRight, Github, Star, Bot, Sparkle, Zap } from 'lucide-react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { useEffect } from "react";
import { LoginDto } from "@/apis/registry/types";
import { login } from "@/apis/registry/auth";
import { useAtom } from "jotai";
import { accessTokenAtom } from "@/store/global.store";
import { useRouter } from "next/navigation";

const features = [
    {
        icon: Bot,
        label: "10k+ Active Agents",
        color: "#3B82F6" // Tech Blue
    },
    {
        icon: Sparkle,
        label: "1M+ Daily Interactions",
        color: "#06B6D4" // AI Teal
    },
    {
        icon: Zap,
        label: "99.9% Uptime",
        color: "#EC4899" // Innovation Pink
    }
];

export const HeroSection = () => {

    const { connect } = useConnect()
    const { signMessage, data } = useSignMessage()
    const { address, isConnected } = useAccount()
    const [, setAccessToken] = useAtom(accessTokenAtom)
    const router = useRouter();


    const connectWallet = async () => {
        try {

            connect({ connector: metaMask() });
            signMessage({ message: "This is P3AI." })

            console.log("Signature: ", data);
            console.log(address);

        } catch (error) {
            console.error('Error connecting to wallet:', error)
        }
    }

    useEffect(() => {
        (async () => {
            const loginData: LoginDto = {
                wallet_address: address!,
                signature: data!,
                message: "This is P3AI."
            }

            const resp = await login(loginData);

            setAccessToken(resp.access_token);

            router.push("dashboard")
        })();
    }, [data])

    return (
        <div className="relative pt-24 overflow-hidden bg-white">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute -top-40 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
                <div className="absolute -top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
                <div className="absolute top-40 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
            </div>

            <div className="container mx-auto px-4 pb-24">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        {/* Github Stats */}
                        <motion.a
                            href="https://github.com/P3-AI-Network/agent-framework"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 bg-white hover:bg-black/5 border border-black/10 rounded-full py-1.5 pl-2 pr-4 transition-colors cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex gap-1.5 items-center bg-black/5 rounded-full py-1 px-2">
                                <Github size={14} className="text-black" />
                                <span className="text-xs font-medium text-black">p3ai/sdk</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                                <Star size={14} className="fill-[#7678ed] text-[#7678ed]" />
                                <span className="font-medium text-black">In Development</span>
                            </div>
                        </motion.a>

                        {/* Main Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-4">
                                Inter-Agent{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7678ed] via-[#3B82F6] to-[#06B6D4]">
                                    Search Protocol{' '}
                                </span>
                                for AI Agents
                            </h1>
                            <div className="text-lg text-gray-600 max-w-xl">
                                Enable your AI agents to discover and collaborate with other agents autonomously. Built on decentralized infrastructure for secure, scalable agent interactions.
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <button onClick={connectWallet} className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-gradient-to-r from-[#7678ed] to-[#3B82F6] text-white rounded-lg font-medium hover:opacity-90 transition-opacity group">
                                Get Started
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                            </button>
                            <button className="inline-flex items-center justify-center h-12 px-6 bg-black/5 hover:bg-black/10 rounded-lg font-medium text-black transition-colors">
                                View Documentation
                            </button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-black/10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {features.map((feature, index) => (
                                <div
                                    key={feature.label}
                                    className="flex items-center gap-3"
                                >
                                    <div
                                        className="size-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: `${feature.color}10` }}
                                    >
                                        <feature.icon
                                            size={20}
                                            className="transition-transform group-hover:scale-110"
                                            style={{ color: feature.color }}
                                        />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-600">{feature.label}</div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Animation */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            className="relative w-full aspect-square"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#7678ed]/10 to-transparent rounded-3xl" />
                            <DotLottieReact
                                src="/assets/lottie/ainetwork.lottie"
                                autoplay
                                loop
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;