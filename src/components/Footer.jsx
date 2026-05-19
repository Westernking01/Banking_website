import React from 'react';
import { Landmark } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-surface-container-lowest)] border-t border-[var(--color-surface-container-low)] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Landmark className="text-[var(--color-primary)]" size={24} />
            <span className="font-headline font-bold text-xl tracking-tight text-[var(--color-primary)]">VAULT</span>
          </div>
          <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
            Redefining wealth management through architectural digital experiences. Your assets, secured beautifully.
          </p>
        </div>
        
        <div>
          <h4 className="font-headline font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-[var(--color-on-surface-variant)]">
            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Press</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-headline font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-[var(--color-on-surface-variant)]">
            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Security</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-[var(--color-on-surface-variant)]">
            <li>support@vault.example.com</li>
            <li>1-800-VAULT-ME</li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-[var(--color-surface-container-low)] text-center text-xs text-[var(--color-on-surface-variant)]">
        &copy; {new Date().getFullYear()} Vault Banking Technologies. All rights reserved.
      </div>
    </footer>
  );
}
