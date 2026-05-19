import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Show nothing while auth state is being loaded from localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-4xl text-[#00236f] animate-spin">progress_activity</span>
          <p className="text-slate-500 text-sm font-medium">Loading your vault...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-[#f7f9fb] min-h-screen text-on-surface font-body overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="md:ml-64 min-h-screen flex flex-col transition-all duration-300">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="flex-1 w-full pb-32 pt-4 md:pt-8 px-4 md:px-0">
          <Outlet />
        </div>
        {/* Footer */}
        <footer className="w-full py-12 border-t border-slate-200 bg-[#f7f9fb] mt-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
            <div className="col-span-1 md:col-span-1">
              <p className="text-lg font-black text-[#00236f] font-headline">Vault Fintech</p>
              <p className="mt-4 text-xs text-slate-500 font-body leading-relaxed">
                The premier choice for modern editorial banking. Secure, architectural, and effortlessly professional.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Product</p>
              <a className="text-slate-500 hover:text-[#00236f] text-xs transition-colors underline-offset-4 hover:underline decoration-[#006c49]" href="#">Features</a>
              <a className="text-slate-500 hover:text-[#00236f] text-xs transition-colors underline-offset-4 hover:underline decoration-[#006c49]" href="#">Security</a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Company</p>
              <a className="text-slate-500 hover:text-[#00236f] text-xs transition-colors underline-offset-4 hover:underline decoration-[#006c49]" href="#">About</a>
              <a className="text-slate-500 hover:text-[#00236f] text-xs transition-colors underline-offset-4 hover:underline decoration-[#006c49]" href="#">Blog</a>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <a className="text-slate-500 hover:text-[#006c49] font-bold text-xs" href="#">Privacy Policy</a>
                <a className="text-slate-500 hover:text-[#006c49] font-bold text-xs" href="#">Terms</a>
              </div>
              <p className="text-xs text-slate-400 font-body">© 2024 Vault Editorial Fintech. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
