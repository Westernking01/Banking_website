import React from 'react';

export default function Card({ children, className = '', noPadding = false, ...props }) {
  return (
    <div 
      className={`bg-[var(--color-surface-container-lowest)] rounded-xl shadow-[0_20px_40px_-15px_rgba(25,28,30,0.05)] border border-[var(--color-surface-container-low)] backdrop-blur-2xl ${noPadding ? '' : 'p-6'} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}
