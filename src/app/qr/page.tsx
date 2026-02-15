import type { Metadata } from "next";
import SummitContent from "@/components/aisummit/summit-content";

export const metadata: Metadata = {
    title: "Zynd AI - AI Impact Summit",
    description:
        "Zynd AI at India AI Impact Summit. The trust and payment layer for AI agents.",
    openGraph: {
        title: "Zynd AI - AI Impact Summit",
        description:
            "Zynd AI at India AI Impact Summit.",
        type: "website",
    },
};

export default function AISummitPage() {
    return <SummitContent />;
}
