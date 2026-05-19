import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md bg-[var(--color-surface-container-lowest)] rounded-xl shadow-[0_45px_70px_-15px_rgba(25,28,30,0.06)] flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-[var(--color-surface-container-low)]">
          <h2 className="text-2xl font-headline font-bold text-[var(--color-on-surface)]">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-2 bg-[var(--color-surface-container-low)] rounded-full hover:bg-[var(--color-surface-container)] transition-colors"
          >
            <X size={20} className="text-[var(--color-on-surface-variant)]" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
