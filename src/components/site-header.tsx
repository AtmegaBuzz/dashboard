"use client"

import Link from "next/link";
import SiteLogo from "@/assets/logo.svg"
import { CodeXml, Feather, MenuIcon, Newspaper, Wallet2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react";
import { ActionButton } from "@/components/action-button";

export default function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        setIsOpen(false); // Close mobile menu if open
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Height of fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    const navLinks = [
        { label: "About", sectionId: "about" },
        { label: "Architecture", sectionId: "technical" },
        { label: "Features", sectionId: "features" },
        { label: "Roadmap", sectionId: "roadmap" },
        { label: "Litepaper", sectionId: "litepaper" }
    ];

    const mobileNavLinks = [
        { label: "Features", sectionId: "features", Icon: Feather },
        { label: "Developers", sectionId: "technical", Icon: CodeXml },
        { label: "Roadmap", sectionId: "roadmap", Icon: Newspaper },
        { label: "Litepaper", sectionId: "litepaper" }
    ];

    return (
        <>
            <header className={"py-4 border-b max-md:backdrop-blur md:border-none sticky top-0 z-10 bg-[#0B0611]/80"}>
                <div className={"container max-md:px-4"}>
                    <div className={"flex items-center justify-between md:border md:p-2.5 md:rounded-xl max-w-2xl mx-auto md:backdrop-blur"}>
                        <Link href={"/"}>
                            <div className={"border size-10 rounded-lg inline-flex items-center justify-center"}>
                                <SiteLogo className={"size-8 h-auto"} />
                            </div>
                        </Link>
                        <section className={"max-md:hidden"}>
                            <nav className={"flex gap-8 items-center text-sm"}>
                                {navLinks.map((link) => {

                                    let actionFunction = () => scrollToSection(link.sectionId)

                                    if (link.sectionId === "litepaper") {
                                        actionFunction = () => window.open('/docs/litepaper.pdf', '_blank');
                                    }

                                    return (
                                        <button
                                            key={link.sectionId}
                                            onClick={actionFunction}
                                            className={"text-white/70 hover:text-white transition cursor-pointer"}
                                        >
                                            {link.label}
                                        </button>
                                    )
                                })}
                            </nav>
                        </section>
                        <section className={"flex max-md:gap-4 items-center"}>
                            <Link href={"/auth"}>
                                <ActionButton onClick={() => { }} label={"Get Started"} />
                            </Link>

                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger>
                                    <MenuIcon className={"size-9 md:hidden hover:text-white/70 transition"} />
                                </SheetTrigger>
                                <SheetContent side={"top"} className={"p-8"}>
                                    <div className={"inline-flex items-center center gap-3"}>
                                        <div className={"border size-8 rounded-lg inline-flex items-center justify-center"}>
                                            <SiteLogo className={"size-6 h-auto"} />
                                        </div>
                                        <p className={"font-bold"}>P3AI Protocol</p>
                                    </div>
                                    <div className={"mt-8 mb-4"}>
                                        <nav className={"grid gap-4 items-center text-lg"}>
                                            {mobileNavLinks.map((link) => {

                                                let actionFunction = () => scrollToSection(link.sectionId)

                                                if (link.sectionId === "litepaper") {
                                                    actionFunction = () => window.open('/docs/litepaper.pdf', '_blank');
                                                }

                                                return (
                                                    <button
                                                        key={link.sectionId}
                                                        onClick={actionFunction}
                                                        className={"flex items-center gap-3 text-white/70 hover:text-white transition w-full text-left"}
                                                    >
                                                        {link.label}
                                                    </button>
                                                )
                                            })}
                                        </nav>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </section>
                    </div>
                </div>
            </header>
        </>
    )
}