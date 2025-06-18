"use client"

import X from "@/assets/social-x.svg"
import Instagram from "@/assets/social-instagram.svg"
import Youtube from "@/assets/social-youtube.svg"
import SiteLogo from "@/assets/logo.svg"
import Link from "next/link"
import { Send, ChevronRight } from "lucide-react"
import { collectMail } from "@/apis/registry/utils"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function SiteFooter() {

    const [email, setEmail] = useState("");
    const { toast } = useToast();

    const onSubmit = async () => {

        if (email.length === 0 || email.trim() === "") {
            return;
        }

        collectMail({
            email,
            purpose: "NEWS_LETTER"
        })

        toast({
            title: "Success",
            description: "🎉 Thanks for subscribing! You're on the list.",
        })
        

    }

    return (
        <footer className="bg-[#111111] border-t border-white/10">
            {/* Main Footer Content */}
            <div className="container max-w-6xl mx-auto py-12 md:py-16 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 group">
                            <div className="border border-white/10 size-10 rounded-lg inline-flex items-center justify-center bg-[#141414] group-hover:border-[#7678ed] transition-colors">
                                <SiteLogo className="size-7 h-auto" />
                            </div>
                            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7678ed] to-[#3B82F6]">P3 AI</span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                            Empowering the future of autonomous AI communication.
                        </p>
                        <ul className="flex gap-4 text-white/40">
                            <li className="hover:text-[#7678ed] transition-colors cursor-pointer">
                                <X className="size-5" />
                            </li>
                            <li className="hover:text-[#3B82F6] transition-colors cursor-pointer">
                                <Instagram className="size-5" />
                            </li>
                            <li className="hover:text-[#06B6D4] transition-colors cursor-pointer">
                                <Youtube className="size-5" />
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-white/90">Quick Links</h3>
                        <ul className="space-y-3 text-white/60">
                            <li>
                                <Link href="/about" className="hover:text-[#7678ed] transition-colors inline-flex items-center gap-1 group">
                                    <ChevronRight className="size-3 text-white/40 group-hover:text-[#7678ed]" />
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/features" className="hover:text-[#7678ed] transition-colors inline-flex items-center gap-1 group">
                                    <ChevronRight className="size-3 text-white/40 group-hover:text-[#7678ed]" />
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/roadmap" className="hover:text-[#7678ed] transition-colors inline-flex items-center gap-1 group">
                                    <ChevronRight className="size-3 text-white/40 group-hover:text-[#7678ed]" />
                                    Roadmap
                                </Link>
                            </li>
                            <li>
                                <Link href="/documentation" className="hover:text-[#7678ed] transition-colors inline-flex items-center gap-1 group">
                                    <ChevronRight className="size-3 text-white/40 group-hover:text-[#7678ed]" />
                                    Documentation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-white/90">Contact</h3>
                        <ul className="space-y-3 text-white/60">
                            <li>
                                <a href="mailto:info@p3ai.com" className="hover:text-[#7678ed] transition-colors inline-flex items-center gap-1 group">
                                    <ChevronRight className="size-3 text-white/40 group-hover:text-[#7678ed]" />
                                    info@p3ai.com
                                </a>
                            </li>
                            <li>
                                <Link href="/support" className="hover:text-[#7678ed] transition-colors inline-flex items-center gap-1 group">
                                    <ChevronRight className="size-3 text-white/40 group-hover:text-[#7678ed]" />
                                    Support
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="hover:text-[#7678ed] transition-colors inline-flex items-center gap-1 group">
                                    <ChevronRight className="size-3 text-white/40 group-hover:text-[#7678ed]" />
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-white/90">Stay Updated</h3>
                        <p className="text-white/60 text-sm">
                            Subscribe to our newsletter for the latest updates.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 px-4 py-2 bg-[#141414] border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#7678ed] focus:ring-2 focus:ring-[#7678ed]/20 transition-all"
                            />
                            <button
                                className="p-2 bg-gradient-to-r from-[#7678ed] to-[#3B82F6] hover:opacity-90 rounded-lg transition-all flex items-center justify-center text-white"
                                onClick={onSubmit}
                            >
                                <Send className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 bg-[#0D0D0D]">
                <div className="container max-w-6xl mx-auto py-6 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-white/60">
                        © 2024 P3 AI. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-white/60">
                        <Link href="/privacy" className="hover:text-[#7678ed] transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-[#7678ed] transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}