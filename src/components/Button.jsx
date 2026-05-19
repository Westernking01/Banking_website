import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = "px-6 py-3 rounded-xl font-headline font-bold transition-all duration-300 transform active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] text-white shadow-sm hover:shadow-md",
    secondary: "bg-[var(--color-secondary-container)] text-[#002113] shadow-sm hover:shadow-md",
    tertiary: "bg-transparent text-[var(--color-primary)] border border-[var(--color-surface-container-highest)] hover:bg-[var(--color-surface-container-low)]",
    ghost: "bg-transparent text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)]",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
