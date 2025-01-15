"use client"

import { ActionButton } from "@/components/action-button";
import BackgroundStars from "@/assets/stars.png";
import BackgroundGrid from "@/assets/grid-lines.png";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";
import { Send, Sparkle } from "lucide-react";

const useRelativeMousePosition = (to: RefObject<HTMLElement>) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const updateMousePosition = (event: MouseEvent) => {
        if (!to.current) return;
        const { top, left } = to.current.getBoundingClientRect();
        mouseX.set(event.x - left);
        mouseY.set(event.y - top);
    }

    useEffect(() => {
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    })
    return [mouseX, mouseY];
}

export function CallToAction() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const borderedDivRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: [`start end`, 'end start'] })
    const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300])

    const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);
    const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, #7678ed, transparent)`

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setEmail("");

        // Reset success message after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <section className="py-20 md:py-24 bg-gradient-to-b from-white to-gray-50" ref={sectionRef}>
            <div className="container max-w-6xl mx-auto px-4">
                <motion.div
                    animate={{backgroundPositionX: BackgroundStars.width}}
                    transition={{duration: 120, repeat: Infinity, ease: 'linear'}}
                    className="p-1 rounded-2xl bg-gradient-to-b from-black/5 to-transparent"
                >
                    <div className="border border-black/10 py-20 sm:py-24 px-4 sm:px-6 rounded-xl overflow-hidden relative group bg-white"
                        style={{}}
                    >
                        {/* Background Effects */}
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute -top-40 right-0 w-96 h-96 bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
                            <div className="absolute top-40 left-0 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
                            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
                        </div>

                        <div 
                            className="absolute inset-0 bg-[#7678ed]/5 bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700"
                        />
                        <motion.div
                            className="absolute inset-0 bg-[#7678ed]/5 bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"
                            style={{maskImage: maskImage}} 
                            ref={borderedDivRef}
                        />
                        <div className="relative">
                            {/* Badge */}
                            <div className="flex justify-center mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7678ed]/10 border border-[#7678ed]/20">
                                    <Sparkle className="size-4 text-[#7678ed]" />
                                    <span className="text-sm font-medium text-[#7678ed]">Limited Early Access</span>
                                </div>
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight text-center font-bold max-w-3xl mx-auto text-black">
                                Join the Future of{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7678ed] via-[#3B82F6] to-[#06B6D4]">
                                    AI Agent Communication
                                </span>
                            </h2>
                            <p className="text-center text-lg text-gray-600 tracking-tight px-4 mt-6 max-w-2xl mx-auto">
                                Be the first to integrate your AI agents with P3AI&apos;s decentralized protocol. Whether you&apos;re building with LangChain, CrewAI, or custom solutions, transform your isolated agents into collaborative powerhouses.
                            </p>
                            <div className="flex flex-col items-center gap-4 mt-8">
                                <form 
                                    onSubmit={handleSubmit} 
                                    className="flex flex-col sm:flex-row w-full max-w-md gap-2 px-4"
                                >
                                    <div className="relative flex-1">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                            className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg text-black placeholder:text-gray-400 focus:outline-none focus:border-[#7678ed] focus:ring-2 focus:ring-[#7678ed]/20 transition-all"
                                        />
                                        {isSubmitted && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="absolute -bottom-6 left-0 text-sm text-green-600 flex items-center gap-1"
                                            >
                                                <Sparkle className="size-3" />
                                                Successfully joined the waitlist!
                                            </motion.div>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-3 bg-gradient-to-r from-[#7678ed] to-[#3B82F6] hover:opacity-90 disabled:opacity-50 rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap text-white font-medium"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Get Early Access
                                                <Send className="size-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                                <div className="space-y-2 text-center">
                                    <p className="text-sm text-gray-600">
                                        Join our developer waitlist for SDK access and updates.
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        No cost, no commitment. Help shape the future of AI collaboration.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default CallToAction;