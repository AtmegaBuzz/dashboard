"use client"

import { motion } from "framer-motion";
import {
    Sparkle,
    Send,
    CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitWaitlist, type WaitlistRole } from "@/apis/registry/utils";

const roles: { value: "" | WaitlistRole; label: string }[] = [
    { value: "", label: "Select one" },
    { value: "BUILDER", label: "Builder (Developer/Engineer)" },
    { value: "FOUNDER", label: "Founder in AI/Agent space" },
    { value: "INVESTOR", label: "Investor" },
    { value: "RESEARCHER", label: "Researcher" },
    { value: "STUDENT", label: "Student" },
    { value: "OTHER", label: "Other" },
];

export default function WaitlistForm() {
    const [email, setEmail] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [role, setRole] = useState<"" | WaitlistRole>("");
    const [building, setBuilding] = useState("");
    const [attendingSummit, setAttendingSummit] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !role) return;

        setIsSubmitting(true);

        try {
            await submitWaitlist({
                email,
                role,
                linkedinProfile: linkedin || undefined,
                building: building || undefined,
                attendingAiSummit: attendingSummit,
            });

            toast({
                title: "Welcome aboard!",
                description: "Thanks for joining the beta. Check your email for next steps.",
            });

            setIsSubmitted(true);
            setEmail("");
            setLinkedin("");
            setRole("");
            setBuilding("");

            setTimeout(() => setIsSubmitted(false), 4000);
        } catch {
            toast({
                title: "Something went wrong",
                description: "Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="p-px rounded-2xl bg-gradient-to-b from-black/5 dark:from-white/[0.12] to-transparent dark:to-white/[0.03]">
                <div className="bg-white dark:bg-[#111111] border border-black/10 dark:border-white/[0.08] rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#7678ed]/5 [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)]" />

                    <div className="relative">
                        <div className="flex justify-center mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7678ed]/10 border border-[#7678ed]/20 dark:border-[#7678ed]/30">
                                <Sparkle className="size-4 text-[#7678ed]" />
                                <span className="text-sm font-medium text-[#7678ed]">Limited Spots</span>
                            </div>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-black dark:text-white">
                            Join the Beta
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="wl-email" className="block text-sm font-medium text-gray-700 dark:text-white/60 mb-1.5">
                                    Email <span className="text-red-500 dark:text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="wl-email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 bg-white dark:bg-white/[0.05] border border-black/10 dark:border-white/[0.1] rounded-lg text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/25 focus:outline-none focus:border-[#7678ed] focus:ring-2 focus:ring-[#7678ed]/20 transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="wl-linkedin" className="block text-sm font-medium text-gray-700 dark:text-white/60 mb-1.5">
                                    LinkedIn Profile URL <span className="text-gray-400 dark:text-white/30">(optional)</span>
                                </label>
                                <input
                                    type="url"
                                    id="wl-linkedin"
                                    value={linkedin}
                                    onChange={(e) => setLinkedin(e.target.value)}
                                    placeholder="https://linkedin.com/in/yourname"
                                    className="w-full px-4 py-3 bg-white dark:bg-white/[0.05] border border-black/10 dark:border-white/[0.1] rounded-lg text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/25 focus:outline-none focus:border-[#7678ed] focus:ring-2 focus:ring-[#7678ed]/20 transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="wl-role" className="block text-sm font-medium text-gray-700 dark:text-white/60 mb-1.5">
                                    I am a... <span className="text-red-500 dark:text-red-400">*</span>
                                </label>
                                <select
                                    id="wl-role"
                                    required
                                    value={role}
                                    onChange={(e) => setRole(e.target.value as "" | WaitlistRole)}
                                    className="w-full px-4 py-3 bg-white dark:bg-white/[0.05] border border-black/10 dark:border-white/[0.1] rounded-lg text-black dark:text-white focus:outline-none focus:border-[#7678ed] focus:ring-2 focus:ring-[#7678ed]/20 transition-all appearance-none"
                                >
                                    {roles.map((r) => (
                                        <option key={r.value} value={r.value} className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white">
                                            {r.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="wl-building" className="block text-sm font-medium text-gray-700 dark:text-white/60 mb-1.5">
                                    What are you building? <span className="text-gray-400 dark:text-white/30">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    id="wl-building"
                                    value={building}
                                    onChange={(e) => setBuilding(e.target.value)}
                                    placeholder="e.g., Lead generation agent"
                                    className="w-full px-4 py-3 bg-white dark:bg-white/[0.05] border border-black/10 dark:border-white/[0.1] rounded-lg text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/25 focus:outline-none focus:border-[#7678ed] focus:ring-2 focus:ring-[#7678ed]/20 transition-all"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="wl-summit"
                                    checked={attendingSummit}
                                    onChange={(e) => setAttendingSummit(e.target.checked)}
                                    className="size-4 rounded border-black/20 dark:border-white/20 bg-white dark:bg-white/5 text-[#7678ed] focus:ring-[#7678ed]/20"
                                />
                                <label htmlFor="wl-summit" className="text-sm text-gray-700 dark:text-white/60">
                                    I&apos;m attending India AI Summit (Feb 16-20)
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 bg-gradient-to-r from-[#7678ed] to-[#3B82F6] hover:opacity-90 disabled:opacity-50 rounded-lg transition-all flex items-center justify-center gap-2 text-white font-medium shadow-lg shadow-[#7678ed]/20"
                            >
                                {isSubmitting ? (
                                    <div className="size-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Join Waitlist
                                        <Send className="size-4" />
                                    </>
                                )}
                            </button>

                            {isSubmitted && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-green-600 dark:text-green-400 text-center flex items-center justify-center gap-1 font-medium"
                                >
                                    <CheckCircle2 className="size-4" />
                                    Successfully joined the waitlist!
                                </motion.p>
                            )}

                            <p className="text-xs text-gray-400 dark:text-white/30 text-center">
                                We hate spam. Expect 1-2 emails max.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
