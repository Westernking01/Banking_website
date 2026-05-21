import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { Landmark, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-[var(--color-surface-container-lowest)]/80 backdrop-blur-2xl border-b border-[var(--color-surface-container-low)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] flex items-center justify-center">
            <Landmark className="text-white" size={20} />
          </div>
          <span className="font-headline font-bold text-lg sm:text-xl tracking-tight text-[var(--color-primary)]">VAULT</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-[var(--color-primary)] font-bold'
                  : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary">Sign up</Button>
          </Link>
        </div>

        {/* Mobile: Auth buttons (compact) + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link to="/login">
            <button className="text-sm font-semibold text-[var(--color-primary)] px-3 py-1.5">
              Log in
            </button>
          </Link>
          <Link to="/signup">
            <button className="text-sm font-semibold text-white bg-[var(--color-primary)] px-3 py-1.5 rounded-lg">
              Sign up
            </button>
          </Link>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-1 p-2 rounded-xl hover:bg-[var(--color-surface-container-low)] transition-colors text-[var(--color-on-surface)]"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--color-surface-container-low)] bg-[var(--color-surface-container-lowest)]/95 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-sm font-medium border-b border-[var(--color-surface-container-low)] transition-colors ${
                  isActive(link.path)
                    ? 'text-[var(--color-primary)] font-bold'
                    : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
