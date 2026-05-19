import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { Landmark } from 'lucide-react';

export default function Navbar() {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[var(--color-surface-container-lowest)]/80 backdrop-blur-2xl border-b border-[var(--color-surface-container-low)]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] flex items-center justify-center">
            <Landmark className="text-white" size={24} />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-[var(--color-primary)]">VAULT</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.name} to={link.path} className="text-sm font-medium text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary">Sign up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
