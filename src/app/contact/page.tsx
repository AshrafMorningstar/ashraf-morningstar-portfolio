/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 */

'use client';

import { Hero3D } from '@/components/3d/Hero3D';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const SocialIcon = ({ icon, href, label, detail }: { icon: React.ReactNode, href: string, label: string, detail: string }) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ rotateX: 0, rotateY: 0 }}
            whileHover={{
                scale: 1.1,
                rotateX: -10,
                rotateY: 10,
                z: 50
            }}
            style={{ perspective: 1000 }}
            className="group relative flex flex-col items-center gap-2 transition-all duration-300"
        >
            <div className="w-16 h-16 rounded-2xl bg-[#151a2a] border border-white/10 flex items-center justify-center text-3xl text-[var(--color-primary)] shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:border-[var(--color-primary)] group-hover:shadow-[0_20px_40px_rgba(0,255,136,0.2)] transition-all duration-500 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {icon}
            </div>

            <div className="absolute top-full mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none translate-y-4 group-hover:translate-y-0 z-50">
                <div className="bg-[#151a2a] border border-[var(--color-primary)]/30 rounded-xl p-3 text-center shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                    <p className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.3em] mb-1">{label}</p>
                    <p className="text-[9px] text-[var(--color-primary)] font-mono opacity-80">{detail}</p>
                </div>
            </div>
        </motion.a>
    );
};

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    const validate = () => {
        let newErrors = { name: '', email: '', message: '' };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Access sequence identity missing.';
            isValid = false;
        }
        if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            newErrors.email = 'Transmission frequency mismatch.';
            isValid = false;
        }
        if (formData.message.length < 15) {
            newErrors.message = 'Incomplete data payload detected (<15 chars).';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        }, 2500);
    };

    return (
        <div className="relative min-h-screen pt-24 pb-32 overflow-hidden bg-[#0a0e1a]">
            {/* Background Parallax Layer */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none opacity-20"
            >
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--color-primary)] blur-[150px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--color-secondary)] blur-[150px] rounded-full" />
            </motion.div>

            <Hero3D />

            <div className="container relative z-10 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Column: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 lg:sticky lg:top-32 space-y-12"
                    >
                        <div className="space-y-6">
                            <span className="text-[10px] font-mono text-[var(--color-primary)] uppercase tracking-[0.5em] block">Communication Console</span>
                            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight">
                                Establish <br />
                                <span className="text-gradient italic">Connection</span>
                            </h1>
                            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed font-light italic">
                                "Ready to Architect the Future of Secure Web Systems. Deploy your request to my neural queue."
                            </p>
                        </div>

                        <div className="space-y-8 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[var(--color-primary)]">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <p className="text-[8px] font-mono text-white/30 uppercase tracking-widest mb-1">Direct Terminal</p>
                                    <p className="text-sm font-bold">contact@ashrafmorningstar.in</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[var(--color-secondary)]">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-[8px] font-mono text-white/30 uppercase tracking-widest mb-1">Bunker Coordinates</p>
                                    <p className="text-sm font-bold">Global // Remote Operations</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-8 pt-10">
                            <SocialIcon
                                label="GitHub"
                                detail="Classified Repo Access"
                                href="https://github.com/AshrafMorningstar"
                                icon={<svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>}
                            />
                            <SocialIcon
                                label="LinkedIn"
                                detail="Strategic Intelligence"
                                href="https://linkedin.com/in/ashrafmorningstar"
                                icon={<svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>}
                            />
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="lg:col-span-8"
                    >
                        <GlassCard className="p-10 md:p-16 border-white/5 relative overflow-hidden group bg-[#111624]/80 rounded-[3rem]">
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-mono text-[var(--color-primary)] uppercase tracking-[0.4em] ml-1">Identity_Hash</label>
                                        <input
                                            type="text"
                                            className={`w-full bg-[#0a0e1a]/80 border ${errors.name ? 'border-red-500/50' : 'border-white/5'} rounded-2xl p-5 text-white focus:outline-none focus:border-[var(--color-primary)] focus:bg-black/90 transition-all font-mono text-sm shadow-inner group-hover:border-white/10`}
                                            placeholder="USER_NAME / ORGANIZATION"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        <AnimatePresence>
                                            {errors.name && (
                                                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-500 font-mono pl-4">⚠ FAULT: {errors.name}</motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-mono text-[var(--color-primary)] uppercase tracking-[0.4em] ml-1">Comms_Route</label>
                                        <input
                                            type="email"
                                            className={`w-full bg-[#0a0e1a]/80 border ${errors.email ? 'border-red-500/50' : 'border-white/5'} rounded-2xl p-5 text-white focus:outline-none focus:border-[var(--color-primary)] focus:bg-black/90 transition-all font-mono text-sm shadow-inner group-hover:border-white/10`}
                                            placeholder="ENCRYPTED_EMAIL"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                        <AnimatePresence>
                                            {errors.email && (
                                                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-500 font-mono pl-4">⚠ FAULT: {errors.email}</motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-mono text-[var(--color-primary)] uppercase tracking-[0.4em] ml-1">Data_Burst_Payload</label>
                                    <textarea
                                        className={`w-full bg-[#0a0e1a]/80 border ${errors.message ? 'border-red-500/50' : 'border-white/5'} rounded-2xl p-6 text-white focus:outline-none focus:border-[var(--color-primary)] focus:bg-black/90 transition-all font-mono text-sm min-h-[250px] resize-none shadow-inner group-hover:border-white/10`}
                                        placeholder="INPUT MISSION PARAMETERS..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                    <AnimatePresence>
                                        {errors.message && (
                                            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-500 font-mono pl-4">⚠ FAULT: {errors.message}</motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="pt-6">
                                    <Button
                                        type="submit"
                                        disabled={status !== 'idle'}
                                        variant={status === 'success' ? 'primary' : 'primary'}
                                        className={`w-full py-6 text-sm font-bold tracking-[0.4em] uppercase rounded-2xl transition-all duration-500 ${status === 'success' ? 'bg-green-500 border-green-400' : ''}`}
                                    >
                                        {status === 'idle' && 'INITIALIZE_HANDSHAKE'}
                                        {status === 'sending' && 'ENCRYPTING_PAYLOAD...'}
                                        {status === 'success' && 'TRANSMISSION_COMPLETE // 200 OK'}
                                    </Button>

                                    <p className="text-[8px] font-mono text-white/20 text-center mt-6 uppercase tracking-[0.2em] animate-pulse">
                                        End-to-End Encryption Enabled // Neural Link Active
                                    </p>
                                </div>
                            </form>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
