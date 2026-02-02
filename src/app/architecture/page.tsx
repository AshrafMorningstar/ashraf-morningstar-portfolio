/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 */

'use client';

import { Hero3D } from '@/components/3d/Hero3D';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

const SystemNode = ({ title, status, x, y }: { title: string, status: string, x: string, y: string }) => (
    <motion.div
        className="absolute"
        style={{ left: x, top: y }}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
    >
        <div className="relative group">
            {/* Pulse Effect */}
            <div className="absolute inset-0 bg-[var(--color-primary)] rounded-full blur-xl opacity-20 animate-pulse group-hover:opacity-40 transition-opacity" />

            <div className="relative w-4 h-4 rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_rgba(0,255,136,1)] flex items-center justify-center cursor-pointer">
                <div className="absolute -inset-4 border border-[var(--color-primary)]/20 rounded-full animate-ping" />
            </div>

            {/* Label */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded p-2 text-center">
                    <p className="text-[10px] font-bold text-white uppercase">{title}</p>
                    <p className="text-[8px] text-[var(--color-primary)] font-mono">{status}</p>
                </div>
            </div>
        </div>
    </motion.div>
);

export default function Architecture() {
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
                        <span className="text-gradient">System Blueprint</span>
                    </h1>
                    <p className="text-[var(--color-text-secondary)]">Zero-Trust Infrastructure & Scalable Logic Architecture.</p>
                </motion.div>

                <div className="relative aspect-video max-w-5xl mx-auto mb-20">
                    <GlassCard className="w-full h-full flex items-center justify-center p-0 overflow-hidden border-white/5" hoverZoom={false}>
                        {/* Animated Grid Background */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <pattern id="architecture-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" />
                                </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#architecture-grid)" />
                        </svg>

                        {/* Interactive Nodes Overlay */}
                        <div className="relative w-full h-full">
                            <SystemNode title="Global Edge" status="Operational" x="15%" y="50%" />
                            <SystemNode title="WAF Defense" status="Active" x="35%" y="30%" />
                            <SystemNode title="Logic Engine" status="Optimized" x="35%" y="70%" />
                            <SystemNode title="Auth Service" status="Secure" x="55%" y="50%" />
                            <SystemNode title="Encrypted DB" status="Locked" x="80%" y="50%" />

                            {/* Connecting Lines (Simplified for now) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600">
                                <motion.path
                                    d="M 150 300 L 350 180"
                                    stroke="var(--color-primary)"
                                    strokeWidth="1"
                                    fill="none"
                                    opacity="0.2"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 2 }}
                                />
                                <motion.path
                                    d="M 150 300 L 350 420"
                                    stroke="var(--color-primary)"
                                    strokeWidth="1"
                                    fill="none"
                                    opacity="0.2"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 2 }}
                                />
                                <motion.path
                                    d="M 350 180 L 550 300"
                                    stroke="var(--color-secondary)"
                                    strokeWidth="1"
                                    fill="none"
                                    opacity="0.2"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 0.5 }}
                                />
                                <motion.path
                                    d="M 350 420 L 550 300"
                                    stroke="var(--color-secondary)"
                                    strokeWidth="1"
                                    fill="none"
                                    opacity="0.2"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 0.5 }}
                                />
                                <motion.path
                                    d="M 550 300 L 800 300"
                                    stroke="var(--color-accent)"
                                    strokeWidth="2"
                                    fill="none"
                                    opacity="0.3"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 1 }}
                                />
                            </svg>
                        </div>
                    </GlassCard>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: "Next.js 14 Engine", val: "Sub-100ms Hydration" },
                        { title: "Security Layer", val: "Strict CSP & SRI" },
                        { title: "Cloud Backbone", val: "Vercel Edge Global" },
                        { title: "Database", val: "PostgreSQL Isolation" }
                    ].map((item, i) => (
                        <GlassCard key={i} className="text-center border-white/5">
                            <h4 className="text-[10px] font-mono text-[var(--color-primary)] uppercase tracking-widest mb-2">{item.title}</h4>
                            <p className="font-bold">{item.val}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
