"use client"

import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ArrowRight, Github, Star, Shield, FileText, Settings, Bot } from 'lucide-react';

import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { useEffect, useState } from "react";
import { LoginDto } from "@/apis/registry/types";
import { login } from "@/apis/registry/auth";
import { useAtom } from "jotai";
import { accessTokenAtom } from "@/store/global.store";
import { useRouter } from "next/navigation";
import { getRegistryInfo, RegistryInfoResponse } from "@/apis/registry/users";

const features = [
    {
        icon: Settings,
        label: "Python SDK & N8N Ready",
        color: "#7678ed" // Brand Purple
    },
    {
        icon: Shield,
        label: "Decentralized & Secure",
        color: "#3B82F6" // Tech Blue
    },
    {
        icon: FileText,
        label: "Open Protocol Standards",
        color: "#06B6D4" // AI Teal
    }
];

export const HeroSection = () => {

    const { connect } = useConnect()
    const { signMessage, data } = useSignMessage()
    const { address, isConnected } = useAccount()
    const [, setAccessToken] = useAtom(accessTokenAtom)
    const router = useRouter();
    const [registryInfo, setRegistryInfo] = useState<RegistryInfoResponse | null>(null);

    useEffect(() => {
        const fetchRegistryInfo = async () => {
            try {
                const data = await getRegistryInfo();
                setRegistryInfo(data);
            } catch (error) {
                console.error('Error fetching registry info:', error);
            }
        };
        fetchRegistryInfo();
    }, []);


    const connectWallet = async () => {
        try {

            connect({ connector: metaMask() });
            signMessage({ message: "This is Zynd Protocol." })

            console.log("Signature: ", data);
            console.log(address);

        } catch (error) {
            console.error('Error connecting to wallet:', error)
        }
    }

    const handleClick = () => {
        window.open('https://pypi.org/project/p3ai-agent/', '_blank', 'noopener,noreferrer');
    };

    useEffect(() => {
        (async () => {
            const loginData: LoginDto = {
                wallet_address: address!,
                signature: data!,
                message: "This is Zynd Protocol."
            }

            const resp = await login(loginData);

            setAccessToken(resp.access_token);

            router.push("dashboard")
        })();
    }, [data, address, router, setAccessToken])

    return (
        <div className="relative pt-24 overflow-hidden bg-white">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#7678ed] opacity-20 blur-[100px]" />
                <div className="absolute right-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-[#3B82F6] opacity-20 blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 pb-24">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        {/* Github Stats */}
                        <motion.a
                            href="https://github.com/orgs/zyndai/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 bg-white/50 backdrop-blur-sm border border-black/5 hover:border-black/10 rounded-full py-1.5 pl-2 pr-4 transition-all cursor-pointer hover:shadow-lg hover:shadow-[#7678ed]/10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex gap-1.5 items-center bg-black/5 rounded-full py-1 px-2">
                                <Github size={14} className="text-black" />
                                <span className="text-xs font-medium text-black">zyndai</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                                <Star size={14} className="fill-[#7678ed] text-[#7678ed]" />
                                <span className="font-medium text-black">Open Source SDK</span>
                            </div>
                        </motion.a>

                        {/* Main Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-4 tracking-tight">
                                Inter-Agent{' '}
                                <span className="relative whitespace-nowrap">
                                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#7678ed] via-[#3B82F6] to-[#06B6D4] animate-gradient-x">
                                        Search Protocol
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#7678ed] via-[#3B82F6] to-[#06B6D4] blur-xl opacity-30 animate-pulse" />
                                </span>{' '}
                                for AI Agents
                            </h1>
                            <div className="text-lg text-gray-600 max-w-xl leading-relaxed">
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
                            <button onClick={handleClick} className="inline-flex items-center justify-center h-12 px-6 bg-black/5 hover:bg-black/10 rounded-lg font-medium text-black transition-colors">
                                View Documentation
                            </button>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-black/5"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {/* Agents Count */}
                            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/5 transition-colors duration-300">
                                <div
                                    className="size-10 rounded-lg flex items-center justify-center shadow-sm"
                                    style={{ backgroundColor: "#10B98115" }}
                                >
                                    <Bot
                                        size={20}
                                        className="transition-transform group-hover:scale-110"
                                        style={{ color: "#10B981" }}
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-700 leading-tight">
                                        {registryInfo?.registered_agents ?? '-'} Agents Registered
                                    </div>
                                </div>
                            </div>
                            {features.map((feature) => (
                                <div
                                    key={feature.label}
                                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/5 transition-colors duration-300"
                                >
                                    <div
                                        className="size-10 rounded-lg flex items-center justify-center shadow-sm"
                                        style={{ backgroundColor: `${feature.color}15` }}
                                    >
                                        <feature.icon
                                            size={20}
                                            className="transition-transform group-hover:scale-110"
                                            style={{ color: feature.color }}
                                        />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-700 leading-tight">{feature.label}</div>
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