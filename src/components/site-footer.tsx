"use client"

import X from "@/assets/social-x.svg"
import Instagram from "@/assets/social-instagram.svg"
import Youtube from "@/assets/social-youtube.svg"
import SiteLogo from "@/assets/logo.svg"
import Link from "next/link"
import { Send } from "lucide-react"

export default function SiteFooter() {
    return (
        <footer className="border-t border-white/10">
            {/* Main Footer Content */}
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="border border-white/20 size-10 rounded-lg inline-flex items-center justify-center">
                                <SiteLogo className="size-7 h-auto" />
                            </div>
                            <span className="font-medium text-lg">P3 AI</span>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                            Empowering the future of autonomous AI communication.
                        </p>
                        <ul className="flex gap-4 text-white/40">
                            <li className="hover:text-white transition-colors cursor-pointer">
                                <X className="size-5" />
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer">
                                <Instagram className="size-5" />
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer">
                                <Youtube className="size-5" />
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-lg">Quick Links</h3>
                        <ul className="space-y-3 text-white/70">
                            <li>
                                <Link href="/about" className="hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/features" className="hover:text-white transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/roadmap" className="hover:text-white transition-colors">
                                    Roadmap
                                </Link>
                            </li>
                            <li>
                                <Link href="/documentation" className="hover:text-white transition-colors">
                                    Documentation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-lg">Contact</h3>
                        <ul className="space-y-3 text-white/70">
                            <li>
                                <a href="mailto:info@p3ai.com" className="hover:text-white transition-colors">
                                    info@p3ai.com
                                </a>
                            </li>
                            <li>
                                <Link href="/support" className="hover:text-white transition-colors">
                                    Support
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="hover:text-white transition-colors">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-lg">Stay Updated</h3>
                        <p className="text-white/70 text-sm">
                            Subscribe to our newsletter for the latest updates.
                        </p>
                        <div className="flex gap-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                            <button 
                                className="p-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <Send className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-white/70">
                        © 2024 P3 AI. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-white/70">
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}