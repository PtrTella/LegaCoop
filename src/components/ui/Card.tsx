import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  padding?: 'p-6' | 'p-8' | 'p-10' | 'p-0';
  rounded?: 'rounded-2xl' | 'rounded-[28px]' | 'rounded-[32px]' | 'rounded-[40px]';
  hoverable?: boolean;
}

export const Card = ({ 
  children, 
  className = '', 
  padding = 'p-8', 
  rounded = 'rounded-[32px]', 
  hoverable = false, 
  ...props 
}: CardProps) => {
  const baseClasses = `bg-surface-container-lowest ${padding} ${rounded} shadow-ambient transition-all`;
  const hoverClasses = hoverable ? 'group cursor-pointer border border-transparent hover:border-primary/10' : 'border border-primary/5';
  
  return (
    <motion.div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
      {children}
    </motion.div>
  );
};
