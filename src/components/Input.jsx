import React from 'react';

export default function Input({ label, error, className = '', id, ...props }) {
  const inputId = id || Math.random().toString(36).substring(7);
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label htmlFor={inputId} className="text-sm font-body text-[var(--color-on-surface-variant)] font-medium">{label}</label>}
      <input 
        id={inputId}
        className={`px-4 py-3 bg-[var(--color-surface-container-highest)] text-[var(--color-on-surface)] rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] placeholder-[var(--color-on-surface-variant)] border border-transparent focus:border-transparent ${error ? 'border-red-500 ring-1 ring-red-500' : ''}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
}
