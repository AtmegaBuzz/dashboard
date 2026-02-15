import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import BlogList from "@/components/blogs/blog-list";

export const metadata: Metadata = {
    title: "Blog - Zynd Protocol",
    description:
        "Read the latest from Zynd Protocol — the trust and payment layer for AI agents.",
    openGraph: {
        title: "Blog - Zynd Protocol",
        description:
            "Read the latest from Zynd Protocol.",
        type: "website",
    },
};

export default function BlogsPage() {
    return (
        <>
            <SiteHeader />
            <BlogList />
            <SiteFooter />
        </>
    );
}
