import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PayHero from "@/components/pay/hero";
import HowItWorks from "@/components/pay/how-it-works";
import WhyDifferent from "@/components/pay/why-different";
import WaitlistForm from "@/components/waitlist-form";
import Benefits from "@/components/pay/benefits";
import SummitCTA from "@/components/pay/summit-cta";

export const metadata: Metadata = {
    title: "Zynd Protocol - The Stripe for AI Agents",
    description:
        "Discovery + Trust + Payment infrastructure for AI agents. Works with LangChain, OpenClaw, n8n, CrewAI.",
    openGraph: {
        title: "Zynd Protocol - The Stripe for AI Agents",
        description:
            "Your agents can't discover each other, verify trust, or get paid. Zynd fixes all three.",
        type: "website",
    },
};

export default function PayPage() {
    return (
        <>
            <SiteHeader />
            <PayHero />
            <HowItWorks />
            <WhyDifferent />

            {/* Waitlist Form Section */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-[#111111] dark:to-[#0a0a0a] relative overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute -top-40 right-0 w-96 h-96 bg-teal-50 dark:bg-[#06B6D4] rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-50 dark:opacity-5" />
                    <div className="absolute top-40 left-0 w-96 h-96 bg-blue-50 dark:bg-[#3B82F6] rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-50 dark:opacity-5" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-50 dark:bg-[#7678ed] rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-50 dark:opacity-5" />
                </div>
                <div className="container max-w-lg mx-auto px-4">
                    <WaitlistForm />
                </div>
            </section>

            <Benefits />
            <SummitCTA />
            <SiteFooter />
        </>
    );
}
