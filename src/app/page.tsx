import SiteHeader from "@/components/site-header";
import {LogoTicker} from "@/components/logo-ticker";
import SiteFooter from "@/components/site-footer";
import {CallToAction} from "@/components/call-to-action";
import { ArchitectureDiagrams } from "@/components/architecture_diagrams";
import { Features } from "@/components/features";
import {GithubIndicator} from "@/components/github-indicator";
import Roadmap from "@/components/roadmap";
import { HeroSection } from "@/components/hero-section";
import { HackathonPopup } from "@/components/hackathon-popup";

export default function Home() {
    return (
        <>
            <HackathonPopup />
            <SiteHeader />
            <HeroSection />
            {/* <LogoTicker /> */}
            <ArchitectureDiagrams />
            <Features />
            <Roadmap/>
            <CallToAction />
            <GithubIndicator />
            <SiteFooter />
        </>
    );
}
