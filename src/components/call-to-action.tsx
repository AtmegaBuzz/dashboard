"use client"

import { ActionButton } from "@/components/action-button";
import BackgroundStars from "@/assets/stars.png";
import BackgroundGrid from "@/assets/grid-lines.png";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

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
    const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`

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
        <section className="py-20 md:py-24" ref={sectionRef}>
            <div className="container">
                <motion.div
                    animate={{backgroundPositionX: BackgroundStars.width,}}
                    transition={{duration: 120, repeat: Infinity, ease: 'linear'}}
                    className="border border-muted py-20 sm:py-24 px-4 sm:px-6 rounded-xl overflow-hidden relative group"
                    style={{backgroundImage: `url(${BackgroundStars.src})`, backgroundPositionY}}
                >
                    <div 
                        className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700" 
                        style={{backgroundImage: `url(${BackgroundGrid.src})`}}
                    />
                    <motion.div
                        className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"
                        style={{backgroundImage: `url(${BackgroundGrid.src})`, maskImage: maskImage}} 
                        ref={borderedDivRef}
                    />
                    <div className="relative">
                        <h2 className="text-xl sm:text-2xl md:text-3xl tracking-tighter text-center font-medium max-w-3xl mx-auto">
                            Join the Future of Universal AI Agent Communication
                        </h2>
                        <p className="text-center text-base sm:text-sm md:text-md text-white/70 tracking-tight px-4 mt-5 max-w-2xl mx-auto">
                            Be the first to integrate your AI agents with P3AI's decentralized protocol. Whether you're building with LangChain, CrewAI, or custom solutions, transform your isolated agents into collaborative powerhouses.
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
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                    {isSubmitted && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute -bottom-6 left-0 text-sm text-green-400"
                                        >
                                            Successfully joined the waitlist!
                                        </motion.div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
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
                                <p className="text-sm text-white/50">
                                    Join our developer waitlist for SDK access and updates.
                                </p>
                                <p className="text-xs text-white/30">
                                    No cost, no commitment. Help shape the future of AI collaboration.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default CallToAction;