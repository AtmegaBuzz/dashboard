"use client"

import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from '@/assets/logo2.png'; // Import the image from assets
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { useAtom } from "jotai";
import { accessTokenAtom } from "@/store/global.store";
import { login } from "@/apis/registry/auth";
import { LoginDto } from "@/apis/registry/types";
import { useRouter } from "next/navigation";


export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { address, isConnected } = useAccount()
    const { connect } = useConnect()
    const { signMessage, data } = useSignMessage()

    const [, setAccessToken] = useAtom(accessTokenAtom)

    const router = useRouter();


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


    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, address, router])

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
        { label: "Litepaper", href: "/litepaper", color: "#7678ed" },
        { label: "Registry", href: "/registry", color: "#10B981" },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-black/5 shadow-sm' : 'bg-white'
            }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="size-8 border border-black/10 rounded-lg flex items-center justify-center bg-white group-hover:border-[#7678ed] transition-colors">
                            <Image src={logo} className="w-full h-full scale-150 p-1" alt="Zynd Protocol Logo" />
                        </div>
                        <div className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#7678ed] to-[#3B82F6]">
                            Zynd Protocol
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            if (link.label === "Litepaper") {
                                return (
                                    <Link target="blank" key={link.href} href={"/docs/litepaper.pdf"} className="text-gray-600 hover:text-black relative group text-sm font-medium">
                                        {link.label}
                                        <div
                                            className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                                            style={{ backgroundColor: link.color }}
                                        />
                                    </Link>
                                )
                            }

                            if (link.href) {
                                return (
                                    <Link key={link.href} href={link.href} className="text-gray-600 hover:text-black relative group text-sm font-medium">
                                        {link.label}
                                        <div
                                            className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                                            style={{ backgroundColor: link.color }}
                                        />
                                    </Link>
                                );
                            }

                            return (
                                <button
                                    key={link.sectionId}
                                    onClick={() => scrollToSection(link.sectionId!)}
                                    className="text-gray-600 hover:text-black relative group text-sm font-medium"
                                >
                                    {link.label}
                                    <div
                                        className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                                        style={{ backgroundColor: link.color }}
                                    />
                                </button>
                            );
                        })}
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={connectWallet}
                            className="hidden md:inline-flex h-9 px-4 items-center justify-center rounded-lg bg-[#7678ed] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            Get Started
                        </button>

                        {/* Mobile Menu Button */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger className="md:hidden">
                                <Menu className="size-6 text-gray-600 hover:text-black transition-colors" />
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full max-w-xs p-6 bg-white/80 backdrop-blur-xl border-l border-black/5">
                                <div className="flex flex-col gap-6">
                                    {/* Mobile Navigation Links */}
                                    <nav className="flex flex-col gap-4">
                                        {navLinks.map((link) => {
                                            if (link.label === "Litepaper") {
                                                return (
                                                    <Link
                                                        key={link.href}
                                                        href="/docs/litepaper.pdf"
                                                        target="blank"
                                                        onClick={() => setIsOpen(false)}
                                                        className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-sm font-medium text-left group"
                                                    >
                                                        <div
                                                            className="w-1 h-1 rounded-full transition-all duration-300 group-hover:w-2"
                                                            style={{ backgroundColor: link.color }}
                                                        />
                                                        {link.label}
                                                    </Link>
                                                );
                                            }

                                            if (link.href) {
                                                return (
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-sm font-medium text-left group"
                                                    >
                                                        <div
                                                            className="w-1 h-1 rounded-full transition-all duration-300 group-hover:w-2"
                                                            style={{ backgroundColor: link.color }}
                                                        />
                                                        {link.label}
                                                    </Link>
                                                );
                                            }

                                            return (
                                                <button
                                                    key={link.sectionId}
                                                    onClick={() => {
                                                        setIsOpen(false);
                                                        scrollToSection(link.sectionId!);
                                                    }}
                                                    className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-sm font-medium text-left group"
                                                >
                                                    <div
                                                        className="w-1 h-1 rounded-full transition-all duration-300 group-hover:w-2"
                                                        style={{ backgroundColor: link.color }}
                                                    />
                                                    {link.label}
                                                </button>
                                            );
                                        })}
                                    </nav>

                                    {/* Mobile Action Buttons */}
                                    <div className="grid gap-3">
                                        <button
                                            className="h-10 flex items-center justify-center rounded-lg border border-black/10 text-gray-600 text-sm font-medium hover:text-black hover:border-black/20 transition-colors"
                                            onClick={connectWallet}
                                        >
                                            Connect Wallet
                                        </button>
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