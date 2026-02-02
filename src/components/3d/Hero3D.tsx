/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 */

'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, MeshDistortMaterial, PerspectiveCamera, Environment, Stars, MeshWobbleMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

const HolographicRing = ({ radius, color, speed, offset }: { radius: number, color: string, speed: number, offset: number }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z = state.clock.elapsedTime * speed + offset;
            ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.005, 16, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
    );
};

const FuturisticRocket = () => {
    const groupRef = useRef<THREE.Group>(null);
    const engineLightRef = useRef<THREE.PointLight>(null);
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight));
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.4;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;

            const { x, y } = state.mouse;
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.5, 0.1);
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -x * 0.3, 0.1);

            groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, scroll * 4, 0.1);
        }
        if (engineLightRef.current) {
            engineLightRef.current.intensity = 10 + Math.sin(state.clock.elapsedTime * 20) * 5;
        }
    });

    return (
        <group>
            <Float speed={4} rotationIntensity={0.6} floatIntensity={0.8}>
                <group ref={groupRef}>
                    {/* Elongated Main Body */}
                    <mesh position={[0, 0, 0]}>
                        <cylinderGeometry args={[0.15, 0.35, 1.8, 32]} />
                        <MeshDistortMaterial
                            color="#00ff88"
                            emissive="#00ff88"
                            emissiveIntensity={0.8}
                            metalness={1}
                            roughness={0}
                            distort={0.1}
                            speed={2}
                        />
                    </mesh>

                    {/* Cockpit / Top Section */}
                    <mesh position={[0, 1.1, 0]}>
                        <coneGeometry args={[0.15, 0.5, 32]} />
                        <meshStandardMaterial color="#0066ff" emissive="#0066ff" emissiveIntensity={2} metalness={1} />
                    </mesh>

                    {/* Dual Fins Architecture */}
                    {[0, 90, 180, 270].map((rot, i) => (
                        <group key={i} rotation={[0, THREE.MathUtils.degToRad(rot), 0]}>
                            <mesh position={[0.4, -0.6, 0]} rotation={[0, 0, -0.1]}>
                                <boxGeometry args={[0.5, 0.6, 0.01]} />
                                <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
                            </mesh>
                        </group>
                    ))}

                    {/* Intense Engine Flame */}
                    <mesh position={[0, -1.2, 0]} rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[0.4, 1.2, 4]} />
                        <MeshWobbleMaterial
                            color="#00ff88"
                            emissive="#00ff88"
                            emissiveIntensity={20}
                            transparent
                            opacity={0.6}
                            factor={0.5}
                            speed={5}
                        />
                        <pointLight ref={engineLightRef} color="#00ff88" intensity={15} distance={5} />
                    </mesh>

                    {/* Holographic Infrastructure */}
                    <HolographicRing radius={0.8} color="#00ff88" speed={0.5} offset={0} />
                    <HolographicRing radius={1.1} color="#0066ff" speed={-0.3} offset={Math.PI / 4} />
                    <HolographicRing radius={1.4} color="#00ff88" speed={0.2} offset={Math.PI / 2} />
                </group>
            </Float>

            {/* Cinematic Lighting */}
            <pointLight position={[10, 10, -10]} intensity={20} color="#00ff88" />
            <pointLight position={[-10, -10, -10]} intensity={15} color="#0066ff" />
            <spotLight position={[0, 10, 0]} intensity={10} angle={0.5} penumbra={1} color="#ffffff" />
        </group>
    );
};

const ParticleField = (props: any) => {
    const ref = useRef<any>(null);
    const sphere = useMemo(() => random.inSphere(new Float32Array(6000), { radius: 2.5 }), []);
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 30;
            ref.current.rotation.y -= delta / 35;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} {...props}>
                <PointMaterial
                    transparent
                    color="#00ff88"
                    size={0.0025}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.5}
                />
            </Points>
        </group>
    );
};

export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 bg-[#0a0e1a]">
            <Canvas
                dpr={[1, 2]}
                performance={{ min: 0.5 }}
                gl={{ antialias: true, stencil: false, depth: true, powerPreference: "high-performance" }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                <ambientLight intensity={0.15} />
                <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1.5} />
                <FuturisticRocket />
                <ParticleField />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
export { Hero3D };
