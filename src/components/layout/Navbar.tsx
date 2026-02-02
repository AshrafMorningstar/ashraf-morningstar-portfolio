/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Identity', href: '/#hero' },
    { name: 'Arsenal', href: '/skills' },
    { name: 'Operations', href: '/projects' },
    { name: 'Architecture', href: '/architecture' },
    { name: 'Comms', href: '/contact' },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#') && pathname === '/') {
            e.preventDefault();
            const id = href.replace('/#', '');
            const element = document.getElementById(id);
            if (element) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            setMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${scrolled
                    ? 'py-4 bg-[rgba(10,14,26,0.85)] backdrop-blur-xl border-white/10 shadow-2xl'
                    : 'py-6 bg-transparent border-transparent'
                }`}
        >
            <div className="container flex items-center justify-between px-6">
                <Link href="/" className="group flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-black font-bold text-xl group-hover:rotate-12 transition-all shadow-[0_0_20px_rgba(0,255,136,0.4)]">
                        AM
                    </div>
                    <span className="font-heading font-bold text-xl tracking-tighter group-hover:text-[var(--color-primary)] transition-colors">
                        Ashraf<span className="text-white/30 group-hover:text-white/50 transition-colors ml-1">Morningstar</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-300 relative py-2 ${(pathname === link.href || (pathname === '/' && link.href === '/#hero'))
                                        ? 'text-[var(--color-primary)]'
                                        : 'text-white/40 hover:text-white'
                                    }`}
                            >
                                {link.name}
                                {(pathname === link.href || (pathname === '/' && link.href === '/#hero')) && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] shadow-[0_0_15px_var(--color-primary)]"
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                        <motion.path
                            animate={mobileMenuOpen ? { d: "M6 18L18 6M6 6l12 12" } : { d: "M4 6h16M4 12h16M4 18h16" }}
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-[#0a0e1a] z-[110] flex flex-col items-center justify-center gap-12"
                    >
                        <button
                            className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={(e) => {
                                    handleLinkClick(e, link.href);
                                    setMobileMenuOpen(false);
                                }}
                                className={`text-5xl font-heading font-bold transition-all ${pathname === link.href ? 'text-[var(--color-primary)] scale-110' : 'text-white/20 hover:text-white hover:scale-105'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
