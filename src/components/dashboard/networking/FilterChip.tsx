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
    className={`h-11 px-6 rounded-full font-display font-black text-[10px] uppercase tracking-widest-plus shrink-0 transition-all border flex items-center justify-center ${
      active
        ? 'bg-gradient-brand text-white border-white/10 shadow-lg shadow-primary/10'
        : 'bg-white text-text-muted hover:text-text-primary border-border-subtle hover:border-primary-deep/30 shadow-sm'
    }`}
  >
    {label}
  </motion.button>
));

FilterChip.displayName = 'FilterChip';
