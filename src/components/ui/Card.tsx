import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  padding?: 'p-6' | 'p-8' | 'p-10' | 'p-0';
  rounded?: 'rounded-2xl' | 'rounded-3xl' | 'rounded-4xl' | 'rounded-5xl';
  hoverable?: boolean;
}

export const Card = ({ 
  children, 
  className = '', 
  padding = 'p-8', 
  rounded = 'rounded-4xl', 
  hoverable = false, 
  ...props 
}: CardProps) => {
  const baseClasses = `bg-surface-container-lowest ${padding} ${rounded} shadow-ambient transition-all`;
  const hoverClasses = hoverable 
    ? 'group cursor-pointer border border-transparent hover:border-border-muted' 
    : 'border border-border-subtle';
  
  return (
    <motion.div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
      {children}
    </motion.div>
  );
};
