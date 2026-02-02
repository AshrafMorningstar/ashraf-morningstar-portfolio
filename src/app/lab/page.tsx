/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 */

'use client';

import { Hero3D } from '@/components/3d/Hero3D';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const NeuralScanner = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
            animate={{
                top: ['0%', '100%', '0%'],
                opacity: [0, 1, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent z-10"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.1)_0%,transparent_70%)] animate-pulse" />
    </div>
);

export default function Lab() {
    const [activeTab, setActiveTab] = useState<'login' | 'api' | 'admin'>('login');
    const [loginStep, setLoginStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [apiLogs, setApiLogs] = useState<{ method: string, path: string, status: number, time: string }[]>([]);
    const [projectDesc, setProjectDesc] = useState("A revolutionary blockchain-based AI agent for secure multi-chain operations.");
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [particleStyle, setParticleStyle] = useState({});

    const handleAiEnhance = () => {
        setIsEnhancing(true);
        setTimeout(() => {
            setProjectDesc("Military-grade autonomous neural network architected for high-frequency cross-chain tactical orchestration and zero-trust protocol enforcement with quantum-safe metadata encapsulation.");
            setIsEnhancing(false);
        }, 4000);
    };

    const runApiSim = () => {
        const methods = ['GET', 'POST', 'WSS', 'AUTH'];
        const paths = ['/v1/neural/synapse', '/v1/security/vault', '/v1/biometric/scan', '/v1/uplink/status'];
        const newLog = {
            method: methods[Math.floor(Math.random() * methods.length)],
            path: paths[Math.floor(Math.random() * paths.length)],
            status: 101,
            time: new Date().toLocaleTimeString()
        };
        setApiLogs(prev => [newLog, ...prev.slice(0, 5)]);
    };

    return (
        <div className="relative min-h-screen pt-24 pb-32 overflow-hidden bg-[#0a0e1a]">
            <Hero3D />

            <div className="container relative z-10 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-[10px] font-mono text-[var(--color-primary)] uppercase tracking-[0.5em] mb-4 block">Experimental Environment</span>
                    <h1 className="font-heading text-5xl md:text-8xl font-bold mb-6 tracking-tighter">
                        Strategic <span className="text-gradient italic">Lab</span>
                    </h1>
                    <p className="text-xl text-[var(--color-text-secondary)] font-light max-w-2xl mx-auto">Interactive modules demonstrating advanced architectural concepts and secure protocols.</p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6 mb-16">
                    {[
                        { id: 'login', label: 'AUTH_GATEWAY' },
                        { id: 'api', label: 'NEURAL_MONITOR' },
                        { id: 'admin', label: 'ADMIN_COMMAND' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-10 py-4 rounded-full font-mono text-[10px] tracking-[0.3em] uppercase transition-all duration-700 border ${activeTab === tab.id
                                    ? 'bg-[var(--color-primary)] text-black border-transparent shadow-[0_0_30px_rgba(0,255,136,0.4)] scale-105'
                                    : 'bg-white/5 text-white/40 border-white/10 hover:border-[var(--color-primary)]/50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="min-h-[600px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {activeTab === 'login' && (
                            <motion.div key="login" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-lg">
                                <GlassCard className="p-10 md:p-14 border-white/10 rounded-[3rem] text-center space-y-10 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />

                                    <div className="space-y-4">
                                        <h3 className="font-mono text-[var(--color-primary)] text-xs tracking-[0.4em] uppercase">Security Level 9 // Access Protocol</h3>
                                        <p className="text-[var(--color-text-secondary)] text-sm font-light">Verify biometric hash to proceed with system initialization.</p>
                                    </div>

                                    <div className="relative py-10">
                                        <div className="w-24 h-24 mx-auto border border-white/10 rounded-3xl flex items-center justify-center text-[var(--color-primary)] transition-all group relative overflow-hidden">
                                            <AnimatePresence>
                                                {loading && <NeuralScanner />}
                                            </AnimatePresence>
                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`w-12 h-12 ${loginStep === 2 ? 'text-[var(--color-primary)]' : 'opacity-40'}`}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 0010 11V5a2 2 0 00-2-2H5a2 2 0 00-2 2v7c0 4.107 1.745 7.807 4.542 10.458l.19.18m10.151-10.151l.054-.09A13.916 13.916 0 0014 11V5a2 2 0 00-2-2h-3m3 8a4 4 0 10-8 0 4 4 0 008 0z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {loginStep === 1 ? (
                                            <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                                <Button className="w-full py-5 rounded-2xl tracking-[0.3em] font-bold text-xs" onClick={() => { setLoading(true); setTimeout(() => { setLoginStep(2); setLoading(false); }, 2500); }}>
                                                    {loading ? 'ANALYZING_DNA...' : 'INITIALIZE_SCAN'}
                                                </Button>
                                            </motion.div>
                                        ) : (
                                            <motion.div key="s2" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6">
                                                <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 p-4 rounded-xl text-[var(--color-primary)] font-mono text-xs">
                                                    SUCCESS // ACCESS_GRANTED // ASHRAF_01
                                                </div>
                                                <Button variant="outline" onClick={() => setLoginStep(1)} className="text-[10px] tracking-widest border-white/5 opacity-50 hover:opacity-100 transition-opacity">TERMINATE_SESSION</Button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </GlassCard>
                            </motion.div>
                        )}

                        {activeTab === 'api' && (
                            <motion.div key="api" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="w-full">
                                <GlassCard className="p-10 md:p-14 border-white/10 rounded-[3rem]">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
                                        <div className="space-y-4">
                                            <h3 className="font-heading text-4xl font-bold italic text-gradient">Neural Monitor</h3>
                                            <p className="text-[var(--color-text-secondary)] font-light">Real-time trace of synaptic transmissions across the global network.</p>
                                        </div>
                                        <Button variant="secondary" onClick={runApiSim} className="py-4 px-10 rounded-2xl font-mono text-[10px] tracking-[0.3em] uppercase">Burst_Payload</Button>
                                    </div>

                                    <div className="bg-[#0a0e1a]/80 shadow-inner rounded-3xl p-8 font-mono text-[11px] min-h-[400px] border border-white/5 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-primary)]/5 to-transparent opacity-10 pointer-events-none" />

                                        <div className="relative z-10 space-y-5">
                                            <AnimatePresence initial={false}>
                                                {apiLogs.length === 0 && (
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-[300px] text-white/20 uppercase tracking-[0.5em]">
                                                        <div className="w-12 h-12 border-2 border-white/10 border-t-[var(--color-primary)] rounded-full animate-spin mb-6" />
                                                        Monitoring Frequencies...
                                                    </motion.div>
                                                )}
                                                {apiLogs.map((log, i) => (
                                                    <motion.div
                                                        key={i + log.time}
                                                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                                        className="flex flex-col md:flex-row justify-between gap-4 bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-[var(--color-primary)]/30 transition-all duration-500 hover:shadow-[0_0_20px_rgba(0,255,136,0.1)]"
                                                    >
                                                        <div className="flex items-center gap-10">
                                                            <span className={`px-4 py-1.5 rounded-lg text-black font-extrabold tracking-widest ${log.method === 'GET' ? 'bg-[var(--color-primary)]' : log.method === 'AUTH' ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-secondary)]'}`}>{log.method}</span>
                                                            <span className="text-white font-medium text-sm tracking-tight">{log.path}</span>
                                                        </div>
                                                        <div className="flex items-center gap-8">
                                                            <span className="text-[var(--color-primary)] font-bold">HTTP_101_SWITCHING</span>
                                                            <span className="text-white/20">{log.time}</span>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                                        {[{ label: 'LATENCY', v: '0.8ms' }, { label: 'SECURITY', v: 'AES_256' }, { label: 'UPTIME', v: '99.999%' }, { label: 'ENCRYPTION', v: 'ACTIVE' }].map((s, i) => (
                                            <div key={i} className="text-center p-6 rounded-3xl bg-white/5 border border-white/10 group hover:border-[var(--color-primary)]/50 transition-all">
                                                <div className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-widest mb-3">{s.label}</div>
                                                <div className="text-[var(--color-primary)] font-mono font-bold text-lg tracking-widest">{s.v}</div>
                                            </div>
                                        ))}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        )}

                        {activeTab === 'admin' && (
                            <motion.div key="admin" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-3xl">
                                <GlassCard className="p-10 md:p-14 border-white/10 rounded-[4rem] relative overflow-hidden group">
                                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--color-accent)] opacity-5 blur-[100px] pointer-events-none" />

                                    <div className="flex items-center gap-6 mb-12">
                                        <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] shadow-[0_0_30px_rgba(255,0,102,0.1)]">
                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-heading text-3xl font-bold uppercase tracking-tighter">Strategic Command</h3>
                                            <p className="text-[10px] font-mono text-[var(--color-accent)] tracking-[0.5em]">Neural Override Layer // v7.0.0</p>
                                        </div>
                                    </div>

                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-[0.4em] ml-2">Neural_Sanitizer_Input</label>
                                            <div className="relative">
                                                <textarea
                                                    value={projectDesc}
                                                    onChange={(e) => setProjectDesc(e.target.value)}
                                                    className="w-full bg-[#0a0e1a]/80 border border-white/5 rounded-[2rem] p-8 text-white font-mono text-sm min-h-[180px] focus:outline-none focus:border-[var(--color-accent)] transition-all shadow-inner leading-relaxed group-hover:border-white/10"
                                                    placeholder="Input tactical metadata..."
                                                />
                                                <AnimatePresence>
                                                    {isEnhancing && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-xl rounded-[2rem] flex flex-col items-center justify-center gap-6 p-10 text-center">
                                                            <NeuralScanner />
                                                            <div className="w-24 h-24 relative">
                                                                <div className="absolute inset-0 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                                                                <div className="absolute inset-2 border-2 border-[var(--color-primary)] border-b-transparent rounded-full animate-[spin_1s_linear_infinite_reverse]" />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <span className="text-sm font-mono text-[var(--color-accent)] uppercase tracking-[0.4em] block animate-pulse">Neural_Override_Active</span>
                                                                <span className="text-[10px] text-white/40 font-mono italic">"Re-architecting metadata descriptors..."</span>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <Button
                                                variant="accent"
                                                className="w-full py-6 text-xs font-bold uppercase tracking-[0.4em] rounded-2xl shadow-[0_10px_40px_rgba(255,0,102,0.2)]"
                                                onClick={handleAiEnhance}
                                                disabled={isEnhancing}
                                            >
                                                {isEnhancing ? 'OPTIMIZING_LOGIC...' : 'EXECUTE_NEURAL_ENHANCE'}
                                            </Button>

                                            <div className="p-6 bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/20 rounded-2xl text-[10px] text-[var(--color-accent)] font-mono leading-relaxed italic text-center">
                                                ⚠ WARNING: SYSTEM OVERRIDE WILL RESTRUCTURE ALL INPUT METADATA ACCORDING TO MILITARY-GRADE PROTOCOLS.
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
