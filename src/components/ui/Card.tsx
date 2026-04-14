import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  padding?: string;
  rounded?: string;
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
  const baseClasses = `bg-surface-softest ${padding} ${rounded} shadow-ambient transition-all`;
  const hoverClasses = hoverable 
    ? 'group cursor-pointer border border-transparent hover:border-border-muted' 
    : 'border border-border-subtle';
  
  return (
    <motion.div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
      {children}
    </motion.div>
  );
};
