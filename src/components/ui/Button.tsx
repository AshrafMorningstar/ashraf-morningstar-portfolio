/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 * These are personal recreations of existing projects, developed by Ashraf Morningstar for learning and skill development.
 * Original project concepts remain the intellectual property of their respective creators.
 */

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'accent';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all duration-300 relative overflow-hidden group";

    const variants = {
        primary: "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-[#0a0e1a] hover:shadow-[0_4px_16px_rgba(0,255,136,0.4)] hover:-translate-y-0.5",
        secondary: "bg-transparent text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[rgba(0,255,136,0.1)]",
        outline: "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-white hover:border-white",
        accent: "bg-gradient-to-br from-[var(--color-accent)] to-[#8000ff] text-white hover:shadow-[0_4px_16px_rgba(255,0,102,0.4)]"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            <span className="relative z-10">{children}</span>
        </button>
    );
};
