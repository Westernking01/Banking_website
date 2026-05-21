import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full h-16 sm:h-20 bg-white/80 backdrop-blur-lg z-40 border-b border-slate-200/50">

      {/* ── Normal Bar ── */}
      <div className={`h-full flex justify-between items-center px-3 sm:px-4 md:px-8 gap-2 ${searchOpen ? 'hidden' : 'flex'}`}>

        {/* Left: Hamburger + Search */}
        <div className="flex items-center gap-2 flex-1 min-w-0">

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-all flex items-center justify-center shrink-0"
            onClick={onMenuClick}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          {/* Search bar — hidden on mobile, visible from md up */}
          <div className="relative group flex-1 max-w-md hidden md:flex items-center">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input
              className="w-full pl-11 pr-4 py-2.5 bg-surface-container-highest border-none rounded-full text-sm focus:ring-2 focus:ring-surface-tint outline-none transition-all placeholder:text-slate-400"
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>

        {/* Right: Search icon (mobile), Notifications, User */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">

          {/* Search icon — mobile only, opens full search bar */}
          <button
            className="md:hidden p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-all"
            onClick={() => setSearchOpen(true)}
          >
            <span className="material-symbols-outlined">search</span>
          </button>

          {/* Notifications */}
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-all">
            <span className="material-symbols-outlined">notifications</span>
          </button>

          <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

          {/* User */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
            {/* Name + role — hidden on small mobile, visible from sm up */}
            <div className="text-right hidden sm:block">
              <span className="text-sm font-bold text-primary font-headline block leading-tight">{user?.name || 'Vault Member'}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Premium Account</span>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-transparent group-hover:border-primary transition-all overflow-hidden bg-slate-200 shrink-0">
              <img
                alt="User Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDszT7zljeLioKvR2Bkv_dRGhCxKKUggkQp0NzRbLNFNdjnPjeAFoQuBw9M5Dh9P7LSjPevSAJsDt0MF-Vl5Ea4mQO0rGbK4bViNkcuJ7f_N08kijx8Hpufs41WyLRQ5GhIWbKMwi8zCivp4OigzPZEgGYKYsGOnYTX7L_IDsjHLWoin4jkSh9PsQOiezLbbvCqNL65kXCfmBMoVByXENgqhEvqBh6_ODKoipZA3pwR2XRWsbCD1vs0DgAkuNcJbqeE9CwXVLpcWw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Expanded Search Bar ── */}
      {searchOpen && (
        <div className="h-full flex items-center px-3 gap-2 md:hidden">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              autoFocus
              className="w-full pl-11 pr-4 py-2.5 bg-surface-container-highest border-none rounded-full text-sm focus:ring-2 focus:ring-surface-tint outline-none placeholder:text-slate-400"
              placeholder="Search..."
              type="text"
            />
          </div>
          {/* Cancel button */}
          <button
            onClick={() => setSearchOpen(false)}
            className="text-sm font-bold text-primary px-2 shrink-0"
          >
            Cancel
          </button>
        </div>
      )}
    </header>
  );
}
