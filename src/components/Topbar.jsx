import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth();
  
  return (
    <header className="sticky top-0 w-full h-20 bg-white/80 backdrop-blur-lg z-40 flex justify-between items-center px-4 md:px-8 border-b border-slate-200/50">
      <div className="flex-1 max-w-md flex items-center">
        <button 
          className="md:hidden p-2 mr-3 hover:bg-slate-100 rounded-full text-slate-400 transition-all flex items-center justify-center"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="relative group flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input className="w-full pl-11 pr-4 py-2.5 bg-surface-container-highest border-none rounded-full text-sm flex-1 focus:ring-2 focus:ring-surface-tint outline-none transition-all placeholder:text-slate-400" placeholder="Search..." type="text" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2.5 hover:bg-slate-100 rounded-full text-slate-400 transition-all">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <span className="text-sm font-bold text-primary font-headline block">{user?.name || 'Vault Member'}</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Premium Account</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-primary transition-all overflow-hidden bg-slate-200">
            <img alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDszT7zljeLioKvR2Bkv_dRGhCxKKUggkQp0NzRbLNFNdjnPjeAFoQuBw9M5Dh9P7LSjPevSAJsDt0MF-Vl5Ea4mQO0rGbK4bViNkcuJ7f_N08kijx8Hpufs41WyLRQ5GhIWbKMwi8zCivp4OigzPZEgGYKYsGOnYTX7L_IDsjHLWoin4jkSh9PsQOiezLbbvCqNL65kXCfmBMoVByXENgqhEvqBh6_ODKoipZA3pwR2XRWsbCD1vs0DgAkuNcJbqeE9CwXVLpcWw" />
          </div>
        </div>
      </div>
    </header>
  );
}
