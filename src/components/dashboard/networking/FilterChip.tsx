import React from 'react';
import { motion } from 'motion/react';

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export const FilterChip = React.memo(({ label, active, onClick }: FilterChipProps) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 15 }}
    className={`h-10 px-6 glass-pill font-display font-black text-[10px] uppercase tracking-widest-plus shrink-0 transition-all border flex items-center justify-center ${
      active
        ? 'bg-gradient-brand text-white border-white/20 shadow-glow shadow-primary/20 scale-105'
        : 'text-text-muted hover:text-primary'
    }`}
  >
    {label}
  </motion.button>
));

FilterChip.displayName = 'FilterChip';
