/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 * These are personal recreations of existing projects, developed by Ashraf Morningstar for learning and skill development.
 * Original project concepts remain the intellectual property of their respective creators.
 */

'use client';

import { Hero3D } from '@/components/3d/Hero3D';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

export default function About() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <div className="relative min-h-screen pt-20 pb-20 overflow-hidden">
            <Hero3D />

            <motion.div
                className="container relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
                        <span className="text-gradient">Defining Excellence</span>
                    </h1>
                    <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                        I don't just write code; I engineer digital fortresses and high-velocity systems that redefine what's possible on the web.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={itemVariants}>
                        <GlassCard className="h-full">
                            <h2 className="font-heading text-2xl font-bold mb-4 text-[var(--color-primary)]">The Mission</h2>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                                In an era of digital vulnerability, my mission is to build web systems that are not only performant and beautiful but unbreakable. I combine military-grade security protocols with bleeding-edge aesthetic design.
                            </p>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                My approach is holistic: every line of code is written with security, scalability, and SEO in mind. Whether it's a complex fintech platform or a viral portfolio, the standard remains the same—perfection.
                            </p>
                        </GlassCard>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <GlassCard className="h-full">
                            <h2 className="font-heading text-2xl font-bold mb-4 text-[var(--color-secondary)]">Focus Areas</h2>
                            <ul className="space-y-4">
                                {[
                                    { title: "Zero-Trust Architecture", desc: "Security is not an afterthought; it's the foundation." },
                                    { title: "Distributed Systems", desc: "Building scalable infrastructure that handles millions of requests." },
                                    { title: "AI Agent Integration", desc: "Leveraging LLMs to create autonomous intelligent systems." },
                                    { title: "Viral UX Design", desc: "Creating interfaces that are impossible to ignore." }
                                ].map((item, index) => (
                                    <li key={index} className="flex gap-4 items-start">
                                        <span className="text-[var(--color-primary)] mt-1">➜</span>
                                        <div>
                                            <strong className="text-white block">{item.title}</strong>
                                            <span className="text-sm text-[var(--color-text-secondary)]">{item.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </GlassCard>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
