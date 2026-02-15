"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const blogs = [
    {
        slug: "what-is-zynd",
        title: "What is Zynd? The Trust & Payment Layer for AI Agents",
        description:
            "Zynd Network is the infrastructure layer that lets AI agents discover, trust, and pay each other — turning isolated agents into an economic network.",
        date: "Feb 15, 2025",
        readTime: "5 min read",
        tags: ["Infrastructure", "AI Agents", "Protocol"],
    },
];

export default function BlogList() {
    return (
        <section className="pt-32 pb-20 bg-white dark:bg-[#0a0a0a] min-h-screen">
            <div className="container max-w-4xl mx-auto px-4">
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-4">
                        Blog
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-white/60 max-w-2xl">
                        Insights, updates, and deep dives from the Zynd Protocol team.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={`/blogs/${blog.slug}`}>
                                <article className="group p-6 sm:p-8 rounded-2xl border border-black/5 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] hover:border-[#7678ed]/30 dark:hover:border-[#7678ed]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#7678ed]/5">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {blog.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#7678ed]/10 text-[#7678ed]"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-2 group-hover:text-[#7678ed] transition-colors leading-tight">
                                                {blog.title}
                                            </h2>
                                            <p className="text-gray-600 dark:text-white/50 leading-relaxed mb-4">
                                                {blog.description}
                                            </p>

                                            <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-white/30">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="size-3.5" />
                                                    <span>{blog.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="size-3.5" />
                                                    <span>{blog.readTime}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 text-[#7678ed] font-medium text-sm shrink-0 group-hover:gap-2 transition-all">
                                            Read more
                                            <ArrowRight className="size-4" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
