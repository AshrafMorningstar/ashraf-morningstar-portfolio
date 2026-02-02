/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 * These are personal recreations of existing projects, developed by Ashraf Morningstar for learning and skill development.
 * Original project concepts remain the intellectual property of their respective creators.
 */

'use client';

import { Hero3D } from '@/components/3d/Hero3D';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const TechIcon = ({ name }: { name: string }) => {
    const icons: { [key: string]: React.ReactNode } = {
        "Python": <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M11.997 0C9.663 0 9.202.01 8.28.423c-.922.413-1.554.786-2.1 1.332-.547.547-.92 1.178-1.332 2.1-.413.922-.424 1.383-.424 3.717v1.544h7.52v1.054H4.424V14.71c0 2.333.012 2.793.424 3.717.413.922.785 1.553 1.332 2.1s1.178.92 2.1 1.332c.922.413 1.383.424 3.717.424.3.001.603 0 .906 0 1.25-.01 2.505-.03 3.717-.424.922-.413 1.554-.786 2.1-1.332.547-.547.921-1.178 1.332-2.1.413-.922.424-1.383.424-3.717V13.16h-7.52v-1.054h11.948v-2.071c0-2.333-.01-2.793-.423-3.717-.413-.922-.786-1.554-1.332-2.1-.547-.547-1.178-.92-2.1-1.332-.922-.413-1.383-.424-3.717-.424V0zM8.51 2.362a.755.755 0 1 1 0 1.509.755.755 0 0 1 0-1.509zm6.98 17.766a.755.755 0 1 1 0 1.509.755.755 0 0 1 0-1.509z" /></svg>,
        "Rust": <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M23.834 8.101a13.929 13.929 0 0 1 .166 4.399 14.113 14.113 0 0 1-1.45 4.711 12.903 12.903 0 0 1-3.194 4.083 12.441 12.441 0 0 1-4.11 2.337 12.81 12.81 0 0 1-4.506.34 12.89 12.89 0 0 1-4.412-1.353 12.588 12.588 0 0 1-3.673-3.125 12.974 12.974 0 0 1-2.288-4.388 13.685 13.685 0 0 1-.301-4.457A13.842 13.842 0 0 1 1.487 3.96a14.11 14.11 0 0 1 4.711-1.45 12.903 12.903 0 0 1 4.083-3.194 12.441 12.441 0 0 1 2.337 4.11 12.81 12.81 0 0 1 .34 4.506 12.89 12.89 0 0 1-1.353 4.412 12.588 12.588 0 0 1-3.125 3.673 12.974 12.974 0 0 1-4.388 2.288 13.685 13.685 0 0 1-4.457.301A13.842 13.842 0 0 1-.035 15.9l.462-.843c1.3.17 2.58.07 3.82-.28.84-1.2 1.48-2.52 1.91-3.92.51-1.63.76-3.32.76-5.01V5.01c0-1.69-.25-3.38-.76-5.01-.43-1.4-.1.07-1.91-3.92-1.24-.35-2.52-.45-3.82-.28l-.462.843z" /></svg>,
        "C++": <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M22 6.5C19.5 4 16.5 2.5 13 2.5v19c3.5 0 6.5-1.5 9-4m-18-9h3v1h-3v3h-1v-3h-3v-1h3v-3h1v3m10 0h3v1h-3v3h-1v-3h-3v-1h3v-3h1v3" /></svg>,
        "Node.js": <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 0l-12 7.05v13l12 7.05 12-7.05v-13l-12-7.05zm8.15 18.25l-8.15 4.79-8.15-4.79v-9.52l8.15-4.79 8.15 4.79v9.52z" /></svg>,
        "Three.js": <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" /></svg>,
        "Next.js": <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2l-1 0c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8c1.6 0 3.1.5 4.4 1.3l-9.1 9.7v.1h.1l3.5-.1 6.5-7c.4.6.6 1.3.6 2 0 4.4-3.6 8-8 8zm4.4-12l-.4.4-4.5 4.8-.4-.4l-2.6-2.8-.5.5 3.1 3.3.4.4.4-.4 5-5.3-.5-.5z" /></svg>,
        "OpenAI": <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-4.71-3.13 5.733 5.733 0 0 0-3.996 1.01 6.054 6.054 0 0 0-4.274-1.801 6.022 6.022 0 0 0-5.081 2.761 6.038 6.038 0 0 0-1.397 5.174 6.042 6.042 0 0 0-1.813 4.298 6.035 6.035 0 0 0 3.116 5.215 5.976 5.976 0 0 0 .511 4.887 6.058 6.058 0 0 0 4.713 3.141 5.715 5.715 0 0 0 3.998-1.01 6.058 6.058 0 0 0 4.27 1.805 6.026 6.026 0 0 0 5.085-2.765 6.035 6.035 0 0 0 1.393-5.161 6.055 6.055 0 0 0 1.813-4.312 6.05 6.05 0 0 0-3.111-5.186zm-17.76 3.655a1.814 1.814 0 0 1 .458-1.46l4.288-4.954a.171.171 0 0 1 .253 0l2.584 2.584a.171.171 0 0 1 0 .241l-2.029 2.029a1.814 1.814 0 0 1-2.553 0L5.3 10.32c-.512.512-.782 1.201-.778 1.918s.28 1.408.796 1.924c.516.516 1.205.792 1.922.796c.717.004 1.406-.264 1.922-.776l1.011-1.011a.171.171 0 0 1 .241 0l.436.436a.171.171 0 0 1 0 .242l-1.011 1.011a3.868 3.868 0 1 1-5.461-5.461l1.1a.171.171 0 0 1 .242 0l.436.436a.171.171 0 0 1 0 .242l-1.1 1.1a1.814 1.814 0 0 0 0 2.553z" /></svg>
    };
    return icons[name] || <span className="text-[10px] font-mono opacity-50">{name.charAt(0)}</span>;
};

const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0a0e1a]/95 backdrop-blur-2xl" onClick={onClose}>
            <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="max-w-5xl w-full bg-[#151a2a] rounded-[2rem] overflow-hidden border border-[rgba(0,255,136,0.2)] shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex flex-col md:flex-row max-h-[90vh]">
                    <div className="md:w-1/2 bg-[#0a0e1a] relative flex items-center justify-center p-12 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent"></div>
                        <span style={{ color: project.color }} className="text-9xl font-mono font-bold opacity-10 blur-[2px]">{'{}'}</span>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 opacity-5">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[var(--color-primary)] rounded-full"></div>
                        </motion.div>
                    </div>
                    <div className="md:w-1/2 p-8 md:p-16 overflow-y-auto space-y-8">
                        <div>
                            <span className="text-[var(--color-primary)] font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block">{project.tag}</span>
                            <h2 className="text-4xl md:text-5xl font-bold">{project.title}</h2>
                        </div>
                        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed italic">"{project.desc}"</p>
                        <div className="space-y-4">
                            <h4 className="text-xs font-mono uppercase text-white/40 tracking-[0.2em]">Technology Stack</h4>
                            <div className="flex flex-wrap gap-3">
                                {project.tech.map((t: string) => (
                                    <div key={t} className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs hover:border-[var(--color-primary)]/50 transition-colors">
                                        <TechIcon name={t} />
                                        <span>{t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 pt-8">
                            <Button variant="primary" className="flex-1 py-4 text-sm font-bold tracking-widest shadow-[0_0_30px_rgba(0,255,136,0.3)]">VIEW LIVE DEMO</Button>
                            <Button variant="secondary" className="flex-1 py-4 text-sm font-bold tracking-widest">SOURCE CODE</Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ProjectSkeleton = () => (
    <div className="glass-panel h-[450px] animate-pulse overflow-hidden rounded-[2rem] border-white/5">
        <div className="h-56 bg-white/5"></div>
        <div className="p-8 space-y-6">
            <div className="h-4 w-24 bg-white/5 rounded"></div>
            <div className="h-10 w-3/4 bg-white/10 rounded"></div>
            <div className="space-y-2">
                <div className="h-4 w-full bg-white/5 rounded"></div>
                <div className="h-4 w-5/6 bg-white/5 rounded"></div>
            </div>
        </div>
    </div>
);

const projectsData = [
    {
        title: "Super Bot V2 Elite",
        tag: "Technical Art",
        desc: "Autonomous GitHub management system with AI-driven core logic and self-healing repositories.",
        tech: ["Python", "OpenAI", "Next.js", "Node.js"],
        color: "var(--color-primary)",
        category: 'Technical Art'
    },
    {
        title: "Neural Architect",
        tag: "Technical Art",
        desc: "Visualizing complex network topologies in real-time using custom shader pipelines and SVG paths.",
        tech: ["Three.js", "Next.js", "Rust"],
        color: "var(--color-secondary)",
        category: 'Technical Art'
    },
    {
        title: "Zero-Trust Mesh",
        tag: "Technical Art",
        desc: "Military-grade service mesh for microservices with mTLS and biometric verification gates.",
        tech: ["C++", "Node.js", "Rust"],
        color: "#ffaa00",
        category: 'Technical Art'
    },
    {
        title: "Neon City Scape",
        tag: "Animation",
        desc: "Procedural city generation with real-time lighting and volumetric fog effects.",
        tech: ["Three.js", "Next.js"],
        color: "#00ffff",
        category: 'Animation'
    },
    {
        title: "Cyber Mech 01",
        tag: "Modeling",
        desc: "High-fidelity mechanical unit model optimized for real-time engines.",
        tech: ["Three.js"],
        color: "#ffcc00",
        category: 'Modeling'
    }
];

export default function Projects() {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const categories = ['All', 'Animation', 'Technical Art', 'Modeling'];

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    const filteredProjects = filter === 'All' ? projectsData : projectsData.filter(p => p.category === filter);

    const handleFilterChange = (cat: string) => {
        setLoading(true);
        setFilter(cat);
        setTimeout(() => setLoading(false), 600);
    };

    return (
        <div className="relative min-h-screen pt-24 pb-32 overflow-hidden">
            <Hero3D />

            <div className="container relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
                    <h1 className="font-heading text-5xl md:text-8xl font-bold mb-8 tracking-tighter">
                        <span className="text-gradient italic">Featured</span> Operations
                    </h1>
                    <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto font-light">Mission-critical systems and experimental visual protocols deployed in the field.</p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleFilterChange(cat)}
                            className={`px-10 py-4 rounded-full text-xs font-mono uppercase tracking-[0.3em] transition-all duration-700 border ${filter === cat
                                ? 'bg-[var(--color-primary)] text-black border-transparent shadow-[0_0_30px_rgba(0,255,136,0.5)] scale-105'
                                : 'bg-white/5 text-white/50 border-white/10 hover:border-[var(--color-primary)]/50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <AnimatePresence mode='popLayout'>
                        {loading ? (
                            Array(4).fill(0).map((_, i) => <ProjectSkeleton key={i} />)
                        ) : (
                            filteredProjects.map((project) => (
                                <motion.div
                                    key={project.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        duration: 0.6
                                    }}
                                    onClick={() => setSelectedProject(project)}
                                    className="cursor-pointer"
                                >
                                    <GlassCard className="group relative h-full flex flex-col p-0 overflow-hidden border-white/5 hover:border-[var(--color-primary)]/50 transition-all duration-1000 rounded-[2.5rem]">
                                        <div className="relative h-72 w-full bg-[#0a0e1a] overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/80 z-10 group-hover:bg-black/40 transition-all duration-1000"></div>
                                            <div className="absolute inset-0 flex items-center justify-center group-hover:scale-125 transition-transform duration-1000 ease-out">
                                                <span style={{ color: project.color }} className="text-8xl font-mono font-bold opacity-10 group-hover:opacity-100 transition-all duration-1000 pointer-events-none blur-[1px] group-hover:blur-0">
                                                    {'</>'}
                                                </span>
                                            </div>
                                            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                                                <div className="w-20 h-20 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-[0_0_50px_rgba(0,255,136,0.6)]">
                                                    <svg className="w-10 h-10 text-black fill-current translate-x-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-10 flex flex-col flex-grow relative">
                                            <motion.div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-4">
                                                <div className="flex justify-between items-start mb-6">
                                                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[var(--color-primary)]">{project.tag}</span>
                                                    <span className="text-[10px] font-mono text-white/20">OPERATIONAL // 2026</span>
                                                </div>
                                                <h3 className="font-heading text-3xl font-bold mb-6 group-hover:text-[var(--color-primary)] transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="text-lg text-[var(--color-text-secondary)] mb-10 leading-relaxed line-clamp-2 italic font-light">
                                                    "{project.desc}"
                                                </p>
                                                <div className="flex flex-wrap gap-5 mt-auto">
                                                    {project.tech.map((t) => (
                                                        <div key={t} title={t} className="text-[var(--color-primary)] opacity-40 group-hover:opacity-100 transition-opacity">
                                                            <TechIcon name={t} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-40 text-center space-y-12">
                    <p className="text-xs font-mono text-[var(--color-text-muted)] animate-pulse uppercase tracking-[0.5em]">End of encrypted transmission</p>
                    <Link href="/contact">
                        <Button variant="outline" className="px-16 py-6 text-sm font-bold tracking-[0.3em] hover:bg-[var(--color-primary)] hover:text-black transition-all">REQUEST ACCESS TO VAULT →</Button>
                    </Link>
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
            </AnimatePresence>
        </div>
    );
}
