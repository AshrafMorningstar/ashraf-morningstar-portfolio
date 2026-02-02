/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 * These are personal recreations of existing projects, developed by Ashraf Morningstar for learning and skill development.
 * Original project concepts remain the intellectual property of their respective creators.
 */

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-12">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="font-heading text-xl font-bold text-white mb-4">About</h3>
                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                            Elite web developer specializing in ultra-secure, high-performance applications with enterprise-level engineering standards.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-heading text-xl font-bold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                            <li><Link href="/about" className="hover:text-[var(--color-primary)]">About Me</Link></li>
                            <li><Link href="/skills" className="hover:text-[var(--color-primary)]">Skills & Tech</Link></li>
                            <li><Link href="/projects" className="hover:text-[var(--color-primary)]">Projects</Link></li>
                            <li><Link href="/lab" className="hover:text-[var(--color-primary)]">The Lab</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-heading text-xl font-bold text-white mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                            <li><Link href="/blog" className="hover:text-[var(--color-primary)]">Blog</Link></li>
                            <li><Link href="/sitemap.xml" className="hover:text-[var(--color-primary)]">Sitemap</Link></li>
                            <li><Link href="/contact" className="hover:text-[var(--color-primary)]">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-heading text-xl font-bold text-white mb-4">Newsletter</h3>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="bg-[rgba(255,255,255,0.05)] border border-[var(--color-border)] rounded-md px-4 py-2 text-sm text-white w-full focus:outline-none focus:border-[var(--color-primary)]"
                            />
                            <button className="bg-[var(--color-primary)] text-[#0a0e1a] px-3 rounded-md hover:opacity-90 transition-opacity">
                                →
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[var(--color-text-muted)]">
                    <p>© 2026 Ashraf Morningstar. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0 font-mono">
                        <span>Uptime: 99.99%</span>
                        <span>Security: A+</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
