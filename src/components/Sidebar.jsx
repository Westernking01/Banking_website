import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useAuth();
  
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside className={`h-screen w-64 fixed left-0 top-0 bg-[#f2f4f6] flex flex-col p-4 gap-2 z-50 border-r border-slate-200 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} md:translate-x-0`}>
        <div className="px-4 py-6 flex justify-between items-center">
          <span className="text-xl font-bold text-[#00236f] font-headline">Vault Fintech</span>
          <button 
            className="md:hidden text-slate-400 hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
        <NavLink to="/dashboard" className={({isActive}) => isActive ? "bg-white text-[#00236f] rounded-lg shadow-sm font-bold flex items-center gap-3 px-4 py-3 font-['Manrope'] text-sm hover:pl-2 transition-all active:scale-98" : "text-slate-500 hover:bg-slate-200/50 flex items-center gap-3 px-4 py-3 font-['Manrope'] text-sm transition-all hover:pl-2 active:scale-98"}>
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </NavLink>
        <NavLink to="/transactions" className={({isActive}) => isActive ? "bg-white text-[#00236f] rounded-lg shadow-sm font-bold flex items-center gap-3 px-4 py-3 font-['Manrope'] text-sm hover:pl-2 transition-all active:scale-98" : "text-slate-500 hover:bg-slate-200/50 flex items-center gap-3 px-4 py-3 font-['Manrope'] text-sm transition-all hover:pl-2 active:scale-98"}>
          <span className="material-symbols-outlined">receipt_long</span>
          Transactions
        </NavLink>
        <NavLink to="/cards" className={({isActive}) => isActive ? "bg-white text-[#00236f] rounded-lg shadow-sm font-bold flex items-center gap-3 px-4 py-3 font-['Manrope'] text-sm hover:pl-2 transition-all active:scale-98" : "text-slate-500 hover:bg-slate-200/50 flex items-center gap-3 px-4 py-3 font-['Manrope'] text-sm transition-all hover:pl-2 active:scale-98"}>
          <span className="material-symbols-outlined">credit_card</span>
          Cards
        </NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? "bg-white text-[#00236f] rounded-lg shadow-sm font-bold flex items-center gap-3 px-4 py-3 font-['Manrope'] text-sm hover:pl-2 transition-all active:scale-98" : "text-slate-500 hover:bg-slate-200/50 flex items-center gap-3 px-4 py-3 font-['Manrope'] text-sm transition-all hover:pl-2 active:scale-98"}>
          <span className="material-symbols-outlined">settings</span>
          Settings
        </NavLink>
      </div>
      <div className="mt-auto pt-4 space-y-4">
        <div className="bg-primary/5 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium mb-2">PRO PLAN</p>
          <p className="text-sm font-bold text-primary mb-3">Upgrade to Premium</p>
          <button className="w-full py-2 px-4 bg-primary text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">Upgrade Plan</button>
        </div>
        <div className="flex items-center gap-3 px-4 py-4 border-t border-slate-200/50 text-left">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
            <img alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaRlOauecQSuP6TZphPJaNYql3HpS3Ki1J6UMvRK-gQ6-Fm1zsCsDpewqYPvDB_yM0qHnvnUN1K4cN2_kp11ep4662F37qB2ReS7AjQJNjgawVmGOB6v2RmUAnsLxbmvbABUKamUWDlxi7mViX_ur9feCbsxzHc-JIkImR9YT0Yk6YREtRcLgvTci4VZ8BYdOSvLSZFm0i6MzaHvxa3nibErDTETA3dGTyxSsASUHQ2eOBAGw7TIdHUK0tCxGLuncUK7cEe2mXHA" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#00236f] truncate">{user?.name || 'Vault Member'}</p>
            <p className="text-[10px] text-slate-500">Premium Member</p>
          </div>
          <button className="text-slate-400 hover:text-error transition-colors">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
