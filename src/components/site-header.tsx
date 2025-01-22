"use client"

import Link from "next/link";
import SiteLogo from "@/assets/logo-new.jpeg"
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from '@/assets/logo-new3.png'; // Import the image from assets


export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        setIsOpen(false);
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    const navLinks = [
        { label: "Technical", sectionId: "technical", color: "#3B82F6" },
        { label: "Features", sectionId: "features", color: "#06B6D4" },
        { label: "Roadmap", sectionId: "roadmap", color: "#EC4899" },
        { label: "Litepaper", href: "/litepaper", color: "#7678ed" }
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-black/5 shadow-sm' : 'bg-white'
            }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="size-8 border border-black/10 rounded-lg flex items-center justify-center bg-white group-hover:border-[#7678ed] transition-colors">
                            <Image src={logo} className="w-full h-full scale-150" alt="P3 AI Network Logo"/>
                        </div>
                        <div className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#7678ed] to-[#3B82F6]">
                            AI Network
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const content = (
                                <button
                                    key={link.sectionId || link.href}
                                    onClick={link.sectionId ? () => scrollToSection(link.sectionId) : undefined}
                                    className="text-gray-600 hover:text-black relative group text-sm font-medium"
                                >
                                    {link.label}
                                    <div
                                        className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                                        style={{ backgroundColor: link.color }}
                                    />
                                </button>
                            );

                            if (link.label === "Litepaper") {
                                return (
                                    <Link target="blank" key={link.href} href={"/docs/litepaper.pdf"}>
                                        {content}
                                    </Link>
                                )
                            }

                            return link.href ? (
                                <Link key={link.href} href={link.href}>
                                    {content}
                                </Link>
                            ) : (
                                content
                            );
                        })}
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="hidden md:inline-flex text-sm font-medium text-gray-600 hover:text-black transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="hidden md:inline-flex h-9 px-4 items-center justify-center rounded-lg bg-[#7678ed] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            Get Started
                        </Link>

                        {/* Mobile Menu Button */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger className="md:hidden">
                                <Menu className="size-6 text-gray-600 hover:text-black transition-colors" />
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full max-w-xs p-6 bg-white/80 backdrop-blur-xl border-l border-black/5">
                                <div className="flex flex-col gap-6">
                                    {/* Mobile Navigation Links */}
                                    <nav className="flex flex-col gap-4">
                                        {navLinks.map((link) => (
                                            <button
                                                key={link.sectionId || link.href}
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    if (link.sectionId) {
                                                        scrollToSection(link.sectionId);
                                                    }
                                                }}
                                                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-sm font-medium text-left group"
                                            >
                                                <div
                                                    className="w-1 h-1 rounded-full transition-all duration-300 group-hover:w-2"
                                                    style={{ backgroundColor: link.color }}
                                                />
                                                {link.label}
                                            </button>
                                        ))}
                                    </nav>

                                    {/* Mobile Action Buttons */}
                                    <div className="grid gap-3">
                                        <Link
                                            href="/login"
                                            className="h-10 flex items-center justify-center rounded-lg border border-black/10 text-gray-600 text-sm font-medium hover:text-black hover:border-black/20 transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="h-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-[#7678ed] to-[#3B82F6] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}