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
    primary: "bg-gradient-brand text-white shadow-xl shadow-primary/20 border border-white/10 hover:shadow-glow transition-all",
    gradient: "bg-gradient-warm text-white shadow-xl shadow-accent/20",
    icon: "bg-white border border-border-subtle text-text-primary hover:border-primary/40 shadow-sm",
    outline: "border-2 border-border-subtle text-text-primary hover:border-primary/30 bg-white/50",
    text: "text-primary hover:text-primary/70 font-display font-black"
  };

  const sizes = {
    sm: "px-6 py-3.5 rounded-xl text-[10px]",
    md: "px-8 py-4 text-2xs rounded-3xl",
    lg: "px-10 py-5 text-2xs rounded-3xl",
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
