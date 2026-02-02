/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 */

'use client';

import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] bg-[#0a0e1a] flex flex-col items-center justify-center">
            <div className="relative">
                {/* 3D-like loading rings */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-full border-2 border-transparent border-t-[var(--color-primary)] border-b-[var(--color-secondary)]"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full border-2 border-transparent border-l-[var(--color-accent)] border-r-white/20"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-8 font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--color-primary)]"
            >
                Synchronizing Neural Link...
            </motion.div>
        </div>
    );
}
