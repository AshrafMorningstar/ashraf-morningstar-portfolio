/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const Particle = ({ delay }: { delay: number }) => (
    <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
            x: [0, (Math.random() - 0.5) * 50]
        }}
        transition={{
            duration: 2,
            delay,
            repeat: Infinity,
            ease: "easeOut"
        }}
        className="absolute w-1 h-1 bg-[var(--color-primary)] rounded-full blur-[1px]"
    />
);

export const SplashScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 800);
                    return 100;
                }
                const step = prev < 30 ? 1 : prev < 70 ? 2 : prev < 90 ? 1 : 0.5;
                return Math.min(prev + step, 100);
            });
        }, 30);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 1.05 }}
                    transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="fixed inset-0 z-[100] bg-[#030712] flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Perspective Grid Background */}
                    <div className="absolute inset-0 perspective-[1000px]">
                        <motion.div
                            initial={{ rotateX: 60, y: 0 }}
                            animate={{ y: [0, 40, 0] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.05)_1px,transparent_1px)] bg-[length:50px_50px] [transform-origin:center_top]"
                        />
                    </div>

                    {/* Radial Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/10 blur-[150px] rounded-full animate-pulse" />

                    {/* Content Container */}
                    <div className="relative z-20 flex flex-col items-center">
                        {/* Logo Ring */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative mb-16"
                        >
                            <div className="w-32 h-32 border border-white/5 rounded-3xl flex items-center justify-center bg-white/[0.02] backdrop-blur-xl relative group">
                                {/* Rotating Accents */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute -inset-4 border border-dashed border-[var(--color-primary)]/20 rounded-full"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className="absolute -inset-8 border border-dotted border-[var(--color-secondary)]/10 rounded-full"
                                />

                                <span className="font-heading text-4xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(0,255,136,0.5)]">
                                    ASH<span className="text-[var(--color-primary)]">RAF</span>
                                </span>

                                {/* Particles rising from logo */}
                                {[...Array(6)].map((_, i) => (
                                    <Particle key={i} delay={i * 0.4} />
                                ))}
                            </div>
                        </motion.div>

                        {/* Progress Label */}
                        <div className="space-y-6 text-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col items-center gap-1"
                            >
                                <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-white/40 mb-2">System Core Initialization</span>
                                <div className="flex items-center gap-4">
                                    <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-[var(--color-primary)] via-white to-[var(--color-secondary)]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ ease: "linear" }}
                                        />
                                    </div>
                                    <span className="font-mono text-xs text-[var(--color-primary)] font-bold w-12 tabular-nums">
                                        {Math.floor(progress)}%
                                    </span>
                                </div>
                            </motion.div>

                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={progress < 40 ? 'a' : progress < 80 ? 'b' : 'c'}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-[8px] font-mono uppercase tracking-[0.4em] text-[var(--color-primary)]/60"
                                >
                                    {progress < 40 ? 'Synchronizing Neural Link...' :
                                        progress < 80 ? 'Injecting Architectural Assets...' :
                                            'Handshake Establishment Finalized.'}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Bottom Status Grid */}
                    <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-6 pointer-events-none opacity-30">
                        <div className="space-y-1">
                            <p className="text-[7px] font-mono text-white/50 uppercase tracking-widest">Protocol Version</p>
                            <p className="text-[9px] font-mono text-white">AM_OS_2.6.0-STABLE</p>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-[7px] font-mono text-white/50 uppercase tracking-widest">Security Status</p>
                            <p className="text-[9px] font-mono text-[var(--color-primary)]">ENCRYPTED // PRIME</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
