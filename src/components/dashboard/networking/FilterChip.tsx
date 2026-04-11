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
    className={`h-11 px-6 rounded-full font-display font-black text-2xs uppercase tracking-widest-plus shrink-0 transition-colors border flex items-center justify-center ${
      active
        ? 'bg-secondary text-white border-secondary'
        : 'bg-white/60 text-primary/40 hover:text-primary hover:bg-white border-white/40 shadow-sm'
    }`}
  >
    {label}
  </motion.button>
));

FilterChip.displayName = 'FilterChip';
