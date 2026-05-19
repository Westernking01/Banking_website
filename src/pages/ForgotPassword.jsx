import React from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-gradient-to-br from-[#00236f] to-[#1e3a8a] relative overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 max-w-xl">
          <div className="mb-12">
            <span className="text-4xl font-black text-white tracking-tighter font-headline">Vault</span>
          </div>
          <h2 className="text-5xl font-extrabold text-white font-headline leading-tight mb-6">
            Secure your assets with architectural precision.
          </h2>
          <p className="text-xl text-primary-fixed leading-relaxed opacity-90 mb-12">
            Our multi-layer verification ensures your financial data remains inaccessible to anyone but you. Recovering your account is simple, secure, and swift.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
              <span className="material-symbols-outlined text-secondary-container mb-4">shield_lock</span>
              <h4 className="text-white font-bold mb-2">Encrypted Vault</h4>
              <p className="text-sm text-primary-fixed opacity-80">Military-grade protection for every transaction.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
              <span className="material-symbols-outlined text-secondary-container mb-4">verified_user</span>
              <h4 className="text-white font-bold mb-2">Global Trust</h4>
              <p className="text-sm text-primary-fixed opacity-80">Serving premium members across 45 countries.</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary opacity-20 blur-[120px] rounded-full -mr-48 -mb-48"></div>
      </div>
      
      <div className="flex-1 flex flex-col bg-surface-container-lowest md:rounded-l-[40px] z-20 shadow-2xl md:-ml-10">
        <div className="flex justify-between items-center p-8 md:px-12">
          <div className="md:hidden">
            <span className="text-2xl font-black text-primary tracking-tighter font-headline">Vault</span>
          </div>
          <div></div>
          <Link className="text-sm font-semibold text-primary hover:text-secondary transition-colors font-label" to="#">
            Need help?
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center px-8 pb-12">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-surface-container-high mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">lock_reset</span>
              </div>
              <h1 className="text-3xl font-extrabold text-on-surface font-headline mb-3 tracking-tight">Recover Your Password</h1>
              <p className="text-on-surface-variant leading-relaxed">
                Don't worry, it happens to the best of us. Enter the email associated with your account and we'll send you a secure reset link.
              </p>
            </div>
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-label ml-1" htmlFor="email">
                  Email address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">mail</span>
                  </div>
                  <input className="block w-full pl-12 pr-4 py-4 bg-surface-container-highest border-0 rounded-xl text-on-surface focus:ring-2 focus:ring-surface-tint/20 transition-all font-body placeholder:text-outline-variant" id="email" name="email" placeholder="alexander@vault.com" required type="email" />
                </div>
              </div>
              <button className="w-full bg-gradient-to-br from-[#00236f] to-[#1e3a8a] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group" type="submit">
                <span>Send Reset Link</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <div className="pt-4 flex flex-col items-center gap-6">
                <Link className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-all group" to="/login">
                  <span className="material-symbols-outlined text-lg">keyboard_backspace</span>
                  <span>Back to Login</span>
                </Link>
                <div className="w-full flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-surface-container"></div>
                  <span className="text-[10px] font-bold text-outline-variant uppercase tracking-[0.2em]">Security Protocol v2.4</span>
                  <div className="h-[1px] flex-1 bg-surface-container"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <footer className="p-8 md:px-12 mt-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-on-surface-variant font-label">
              © 2024 Vault Editorial Fintech.
            </p>
            <div className="flex gap-6">
              <Link className="text-xs text-outline hover:text-primary transition-colors" to="#">Privacy</Link>
              <Link className="text-xs text-outline hover:text-primary transition-colors" to="#">Terms</Link>
              <Link className="text-xs text-outline hover:text-primary transition-colors" to="#">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
      
      <div className="fixed top-0 right-0 p-12 pointer-events-none hidden lg:block">
        <div className="w-64 h-64 bg-surface-container-high rounded-full blur-[100px] opacity-40"></div>
      </div>
    </div>
  );
}
