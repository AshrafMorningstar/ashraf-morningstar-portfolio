/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 */

'use client';

import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Hero3D = dynamic(() => import('@/components/3d/Hero3D').then(mod => mod.Hero3D), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0a0e1a]" />
});

const HackerText = ({ text, className }: { text: string, className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(prev =>
        text.split("")
          .map((letter, index) => {
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
}

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth springs for parallax
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const heroY = useTransform(springScroll, [0, 0.2], [0, -150]);
  const heroOpacity = useTransform(springScroll, [0, 0.1], [1, 0]);
  const aboutY = useTransform(springScroll, [0.1, 0.4], [100, 0]);
  const bgShift = useTransform(springScroll, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0a0e1a] text-white selection:bg-[var(--color-primary)] selection:text-black scroll-smooth">
      <Hero3D />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden z-10 px-6">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="flex flex-col items-center text-center max-w-5xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[var(--color-primary)] uppercase tracking-[0.4em] inline-block animate-pulse">
              Status: System Architect // Operational
            </span>
          </motion.div>

          <h1 className="font-heading text-6xl md:text-9xl font-extrabold mb-8 leading-tight tracking-tighter">
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="block"
            >
              ASHRAF
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="block text-gradient italic"
            >
              MORNINGSTAR
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Architecting <span className="text-white font-medium">limitless</span> digital experiences through <span className="text-[var(--color-primary)] font-mono">Cybernetic UI</span> and <span className="text-[var(--color-secondary)] font-mono">Military-Grade</span> systems.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link href="/projects">
              <Button className="px-10 py-4 text-sm uppercase tracking-widest font-mono shadow-[0_0_30px_rgba(0,255,136,0.3)] hover:scale-105 transition-transform">Explore Operations</Button>
            </Link>
            <Link href="#about">
              <Button variant="outline" className="px-10 py-4 text-sm uppercase tracking-widest font-mono hover:bg-white/5">The Architect</Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">Descent</span>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--color-primary)] to-transparent" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-40 border-t border-white/5 bg-[#0a0e1a]/90 backdrop-blur-3xl overflow-hidden">
        <motion.div style={{ y: bgShift }} className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] blur-[120px]" />
        </motion.div>

        <div className="container px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              style={{ y: aboutY }}
              className="relative"
            >
              <GlassCard className="aspect-[4/5] flex items-center justify-center p-0 border-white/5 overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]" hoverZoom={false}>
                <div className="absolute inset-0 bg-[#0c111d] flex items-center justify-center">
                  <span className="text-[14rem] font-heading font-black opacity-5 select-none transition-all duration-1000 group-hover:opacity-20 group-hover:scale-125 group-hover:rotate-6">AM</span>
                  <div className="absolute inset-8 border border-white/5 rounded-3xl flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="text-[10px] font-mono text-white/20 tracking-[1.5em] uppercase -rotate-90">Secure_Profile.bin</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-12 left-12">
                  <motion.h4 className="text-3xl font-bold mb-2">Ashraf Morningstar</motion.h4>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-ping" />
                    <p className="text-[var(--color-primary)] font-mono text-xs uppercase tracking-[0.3em]">Chief Architect</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <h2 className="font-heading text-5xl md:text-7xl font-bold">
                  The <span className="text-gradient">Architect's</span> Vision
                </h2>
                <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed italic border-l-2 border-[var(--color-primary)] pl-6">
                  "I engineer digital ecosystems where technical purity meets cinematic immersion. Security isn't a feature; it's the foundation."
                </p>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  With a focus on <span className="text-white font-medium">Zero-Trust Architecture</span> and <span className="text-white font-medium">High-Frequency Interactivity</span>, I build for the web of 2026. My operations prioritize code efficiency, military-grade security, and 60FPS fluid aesthetics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-[var(--color-primary)] uppercase tracking-widest flex items-center gap-3">
                    <span className="w-6 h-px bg-current" />
                    Intelligence
                  </h4>
                  <ul className="space-y-4 text-sm text-[var(--color-text-secondary)] font-light">
                    <li className="flex items-center gap-3 hover:text-white transition-colors">
                      <div className="w-1 h-1 bg-[var(--color-primary)] shadow-[0_0_5px_var(--color-primary)]" />
                      Advanced Problem Resolution
                    </li>
                    <li className="flex items-center gap-3 hover:text-white transition-colors">
                      <div className="w-1 h-1 bg-[var(--color-primary)] shadow-[0_0_5px_var(--color-primary)]" />
                      Strategic System Scaling
                    </li>
                    <li className="flex items-center gap-3 hover:text-white transition-colors">
                      <div className="w-1 h-1 bg-[var(--color-primary)] shadow-[0_0_5px_var(--color-primary)]" />
                      Autonomous Logic Design
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-[var(--color-secondary)] uppercase tracking-widest flex items-center gap-3">
                    <span className="w-6 h-px bg-current" />
                    Operations
                  </h4>
                  <ul className="space-y-4 text-sm text-[var(--color-text-secondary)] font-light">
                    <li className="flex items-center gap-3 hover:text-white transition-colors">
                      <div className="w-1 h-1 bg-[var(--color-secondary)] shadow-[0_0_5px_var(--color-secondary)]" />
                      Next-Gen UI Development
                    </li>
                    <li className="flex items-center gap-3 hover:text-white transition-colors">
                      <div className="w-1 h-1 bg-[var(--color-secondary)] shadow-[0_0_5px_var(--color-secondary)]" />
                      Cloud Infrastructure Ops
                    </li>
                    <li className="flex items-center gap-3 hover:text-white transition-colors">
                      <div className="w-1 h-1 bg-[var(--color-secondary)] shadow-[0_0_5px_var(--color-secondary)]" />
                      Full-Stack Viral Engineering
                    </li>
                  </ul>
                </div>
              </div>

              <Link href="/contact">
                <Button className="group">
                  Request Intelligence Dossier
                  <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-40 relative z-10 overflow-hidden">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Logic Performance", stat: "60 FPS", color: "var(--color-primary)", desc: "Optimized hydration & render cycles." },
              { label: "Security Schema", stat: "Grade S", color: "var(--color-secondary)", desc: "Zero-Trust compliant protocols." },
              { label: "Global Reach", stat: "99.9%", color: "var(--color-accent)", desc: "Edge-distributed network uptime." }
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="border-white/5 py-16 px-8 text-center group hover:bg-white/[0.02] transition-colors relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px]" style={{ backgroundColor: s.color }} />
                  <h3 className="text-7xl font-black mb-4 group-hover:scale-110 transition-transform duration-700" style={{ color: s.color }}>{s.stat}</h3>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.5em] mb-4">{s.label}</p>
                  <p className="text-xs text-[var(--color-text-muted)] italic">{s.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
