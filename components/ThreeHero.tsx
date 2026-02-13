import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeHero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xFDFBF7, 0.002); // Matches cream bg

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.z = 5;

    // Optimized Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false, // Disabled antialias for performance boost
      powerPreference: "high-performance",
      precision: "mediump" // Lower precision for speed
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Cap pixel ratio to 1 to ensure high FPS on high-DPI screens (Retina, etc.)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1)); 
    mountRef.current.appendChild(renderer.domElement);

    // Objects
    // Main Abstract Shape - Low Poly Torus
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 50, 8); // Reduced segments
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x1A1A1A, 
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Particles - Reduced count for "super light" feel
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200; // Reduced from 350 for speed
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: 0x8a0303, // Crimson accent
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX / window.innerWidth - 0.5;
      targetY = event.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop
    let frameId: number;
    const animate = () => {
      // Lerp for smoother, less jittery movement
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotate Main Object
      torusKnot.rotation.x += 0.002;
      torusKnot.rotation.y += 0.004;

      // Interaction
      torusKnot.rotation.x += mouseY * 0.1;
      torusKnot.rotation.y += mouseX * 0.1;

      particlesMesh.rotation.y = -mouseX * 0.2;
      particlesMesh.rotation.x = -mouseY * 0.2;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none will-change-transform" />;
};

export default ThreeHero;