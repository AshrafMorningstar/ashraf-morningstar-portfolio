/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 * These are personal recreations of existing projects, developed by Ashraf Morningstar for learning and skill development.
 * Original project concepts remain the intellectual property of their respective creators.
 */

import { motion } from 'framer-motion';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverZoom?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverZoom = true }) => {
    return (
        <motion.div
            whileHover={hoverZoom ? {
                scale: 1.02,
                translateY: -5,
                boxShadow: "0 0 30px rgba(0,255,136,0.4)",
                borderColor: "rgba(0,255,136,0.6)"
            } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`glass-panel rounded-2xl p-8 transition-colors duration-300 will-change-transform ${className}`}
        >
            {children}
        </motion.div>
    );
};
