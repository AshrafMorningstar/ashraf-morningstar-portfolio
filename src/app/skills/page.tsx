/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 * These are personal recreations of existing projects, developed by Ashraf Morningstar for learning and skill development.
 * Original project concepts remain the intellectual property of their respective creators.
 */

'use client';

import { Hero3D } from '@/components/3d/Hero3D';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

const Skill3DLogo = ({ type, color }: { type: number, color: string }) => {
    const meshRef = useRef<any>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef}>
                {type === 0 && <icosahedronGeometry args={[1, 1]} />}
                {type === 1 && <torusGeometry args={[0.8, 0.2, 16, 32]} />}
                {type === 2 && <octahedronGeometry args={[1, 0]} />}
                <MeshDistortMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    distort={0.3}
                    speed={2}
                />
            </mesh>
        </Float>
    );
};

const SkillCard = ({ skill, index }: { skill: any, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="group relative"
        >
            <GlassCard className="h-full flex flex-col p-8 border-white/5 hover:border-[var(--color-primary)]/30 transition-all duration-500 rounded-[2rem]">
                <div className="h-32 w-full mb-6 relative flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                        <Canvas camera={{ position: [0, 0, 3] }}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <Skill3DLogo type={index % 3} color={skill.color} />
                        </Canvas>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold group-hover:text-[var(--color-primary)] transition-colors">{skill.name}</h3>
                        <span className="text-[var(--color-primary)] font-mono text-sm">{skill.level}%</span>
                    </div>

                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2 italic">
                        {skill.description}
                    </p>

                    <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                            className="absolute h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] shadow-[0_0_10px_var(--color-primary)]"
                        />
                    </div>
                </div>

                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    <div className="bg-[var(--color-primary)] text-black px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap shadow-xl">
                        {skill.category.toUpperCase()} // MASTERED
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    );
};

export default function Skills() {
    const skills = [
        { name: "Frontend Architecture", level: 98, color: "#00ff88", category: "Frameworks", description: "Elite level Next.js and React orchestration with advanced design patterns." },
        { name: "Backend Security", level: 95, color: "#0066ff", category: "Core", description: "Zero-trust systems and high-frequency data pipelines using Node and Go." },
        { name: "3D Visualization", level: 92, color: "#ff0066", category: "Graphics", description: "Immersive WebGL experiences using Three.js and custom GLSL shaders." },
        { name: "AI Automation", level: 90, color: "#7000ff", category: "Automation", description: "Autonomous agents and neural network integration for workflow optimization." },
        { name: "Digital Forensics", level: 85, color: "#ffa500", category: "Security", description: "Deep system auditing and cryptographic validation of data streams." },
        { name: "Cloud Synergy", level: 88, color: "#00d4ff", category: "DevOps", description: "Containerized deployment clusters with adaptive resource scaling." }
    ];

    return (
        <div className="relative min-h-screen pt-24 pb-32 overflow-hidden">
            <Hero3D />

            <div className="container relative z-10">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-24">
                    <h1 className="font-heading text-6xl md:text-9xl font-bold mb-8">
                        Technical <span className="text-gradient">Arsenal</span>
                    </h1>
                    <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto font-light">Advanced protocols and mastered technologies powering the digital frontier.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {skills.map((skill, i) => (
                        <SkillCard key={skill.name} skill={skill} index={i} />
                    ))}
                </div>

                <div className="mt-40 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Systems Deployed", val: "50+" },
                        { label: "Security Audits", val: "100%" },
                        { label: "Uptime Protocol", val: "99.9%" },
                        { label: "Neural Load", val: "Elite" }
                    ].map((stat, i) => (
                        <motion.div key={i} whileHover={{ y: -5 }} className="glass-panel p-8 text-center border-white/5 rounded-3xl">
                            <h4 className="text-3xl font-bold text-white mb-2">{stat.val}</h4>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-primary)]">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
