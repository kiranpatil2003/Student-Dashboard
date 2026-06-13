'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BentoGridProps {
  children: React.ReactNode;
}

export default function BentoGrid({ children }: BentoGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24 md:pb-8 w-full max-w-7xl mx-auto"
    >
      {children}
    </motion.main>
  );
}

// Staggered Item Wrapper Component for individual Bento cards
export function BentoCard({
  children,
  className = '',
  colSpan = 'col-span-1',
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: string;
}) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 18,
      },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        scale: 1.015,
        borderColor: 'rgba(99, 102, 241, 0.45)',
        boxShadow: '0 0 25px rgba(99, 102, 241, 0.15)',
      }}
      transition={{
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
      }}
      style={{
        backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.03) 0%, transparent 55%)'
      }}
      className={`bg-card border border-border rounded-xl p-6 flex flex-col justify-between overflow-hidden relative ${colSpan} ${className}`}
    >
      {children}
    </motion.article>
  );
}
