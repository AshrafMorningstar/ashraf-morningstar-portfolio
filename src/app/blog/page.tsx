/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 * These are personal recreations of existing projects, developed by Ashraf Morningstar for learning and skill development.
 * Original project concepts remain the intellectual property of their respective creators.
 */

'use client';

import { Hero3D } from '@/components/3d/Hero3D';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Blog() {
    const posts = [
        {
            title: "How I Secured a Fintech App Against State-Level Actors",
            excerpt: "A deep dive into zero-trust architecture and the defense mechanisms used in modern banking.",
            date: "Feb 1, 2026",
            tag: "Security",
            readTime: "12 min"
        },
        {
            title: "Building 'Super Bot': The Future of Autonomous Coding",
            excerpt: "Lessons learned from creating an AI agent that manages GitHub repositories completely autonomously.",
            date: "Jan 15, 2026",
            tag: "AI",
            readTime: "8 min"
        },
        {
            title: "The Psychology of 'Wow': Engineering Viral Web Experiences",
            excerpt: "Deconstructing the visual and performance elements that make a website unforgettable.",
            date: "Jan 2, 2026",
            tag: "UX Design",
            readTime: "10 min"
        }
    ];

    return (
        <div className="relative min-h-screen pt-20 pb-20 overflow-hidden">
            <Hero3D />

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
                        <span className="text-gradient">Insights & Analysis</span>
                    </h1>
                    <p className="text-[var(--color-text-secondary)]">
                        Technical papers and research on the cutting edge of web engineering.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {posts.map((post, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <GlassCard className="hover:border-[var(--color-primary)]/50 transition-all duration-300 group cursor-pointer">
                                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-mono text-[var(--color-primary)]">{post.tag}</span>
                                            <span className="text-xs text-[var(--color-text-muted)]">{post.date}</span>
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs text-[var(--color-text-muted)]">{post.readTime} read</span>
                                        <div className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-black transition-all">
                                            →
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
