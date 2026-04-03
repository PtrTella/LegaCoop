import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'gradient' | 'icon' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) => {
  const baseClasses = "font-display font-black uppercase tracking-widest transition-all text-center flex items-center justify-center gap-3";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-secondary shadow-2xl shadow-primary/40",
    gradient: "bg-gradient-to-br from-secondary to-primary-container text-white shadow-ambient",
    icon: "bg-gradient-to-br from-secondary to-primary text-white shadow-lg hover:shadow-secondary/30 disabled:opacity-30",
    outline: "border-2 border-primary/10 text-primary hover:border-primary/30",
    text: "text-secondary hover:text-primary"
  };

  const sizes = {
    sm: "px-6 py-3.5 rounded-xl text-[10px]",
    md: "px-8 py-4 text-xs rounded-3xl",
    lg: "px-10 py-5 text-xs rounded-3xl",
    icon: "p-4 rounded-xl shrink-0"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </motion.button>
  );
};
