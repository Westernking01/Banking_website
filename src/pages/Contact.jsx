import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-container min-h-screen relative">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm transition-colors duration-300">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
          <div className="text-2xl font-black text-[#00236f] tracking-tight font-headline">
            Vault Fintech
          </div>
          <div className="hidden md:flex items-center gap-8 font-headline font-semibold text-sm">
            <Link className="text-slate-600 hover:text-[#006c49] transition-colors" to="/features">Features</Link>
            <Link className="text-slate-600 hover:text-[#006c49] transition-colors" to="/about">About</Link>
            <Link className="text-slate-600 hover:text-[#006c49] transition-colors" to="/blog">Blog</Link>
            <Link className="text-[#00236f] border-b-2 border-[#006c49] pb-1" to="/contact">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link className="px-5 py-2 text-sm font-bold text-[#00236f] hover:opacity-80 transition-all" to="/login">Login</Link>
            <Link className="px-6 py-2.5 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-95 duration-200" to="/signup">
              Open Account
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <header className="mb-20 text-center md:text-left max-w-3xl">
          <h1 className="text-primary font-headline text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            How can we <span className="text-secondary italic">support</span> your journey?
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Experience high-touch financial advisory and technical support. Our concierge team is available 24/7 to ensure your vault remains secure and your assets fluid.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 shadow-sm border border-outline-variant/10">
              <h2 className="text-2xl font-headline font-bold text-primary mb-8">Send a Secure Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-label text-xs font-semibold text-on-surface-variant ml-1">Full Name</label>
                    <input className="w-full bg-surface-container-highest/30 border-0 rounded-xl px-5 py-4 focus:ring-2 focus:ring-surface-tint/50 outline-none transition-all placeholder:text-outline/50" placeholder="Alexander Vault" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label text-xs font-semibold text-on-surface-variant ml-1">Email Address</label>
                    <input className="w-full bg-surface-container-highest/30 border-0 rounded-xl px-5 py-4 focus:ring-2 focus:ring-surface-tint/50 outline-none transition-all placeholder:text-outline/50" placeholder="alex@vault.com" type="email" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label text-xs font-semibold text-on-surface-variant ml-1">Subject</label>
                  <input className="w-full bg-surface-container-highest/30 border-0 rounded-xl px-5 py-4 focus:ring-2 focus:ring-surface-tint/50 outline-none transition-all placeholder:text-outline/50" placeholder="Inquiry regarding Premium Assets" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label text-xs font-semibold text-on-surface-variant ml-1">Message</label>
                  <textarea className="w-full bg-surface-container-highest/30 border-0 rounded-xl px-5 py-4 focus:ring-2 focus:ring-surface-tint/50 outline-none transition-all placeholder:text-outline/50 resize-none" placeholder="How can our architectural team assist you today?" rows="5"></textarea>
                </div>
                <button className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all" type="submit">
                  Send Message
                </button>
              </form>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-container-low p-8 rounded-[2rem] flex flex-col items-start gap-4">
                <div className="p-3 bg-secondary-container rounded-2xl text-on-secondary-container">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-primary">Email Support</h3>
                  <p className="text-sm text-on-surface-variant mt-1">support@vaultfintech.com</p>
                </div>
              </div>
              <div className="bg-surface-container-low p-8 rounded-[2rem] flex flex-col items-start gap-4">
                <div className="p-3 bg-primary-fixed rounded-2xl text-on-primary-fixed">
                  <span className="material-symbols-outlined">phone</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-primary">Priority Line</h3>
                  <p className="text-sm text-on-surface-variant mt-1">+1 (800) 555-VAULT</p>
                </div>
              </div>
              <div className="bg-surface-container-low p-8 rounded-[2rem] flex flex-col items-start gap-4">
                <div className="p-3 bg-tertiary-fixed rounded-2xl text-on-tertiary-fixed">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-primary">Live Concierge</h3>
                  <p className="text-sm text-on-surface-variant mt-1">Available 24/7 in-app</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <section className="bg-surface-container rounded-[2rem] overflow-hidden">
              <div className="h-48 w-full bg-slate-200">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFad0mMB80lnYIdldtxJ1M7M0UqUDnyDnTTogv7zbo2uAW1NhUVhHbN94JPrtuHvxNlltDP6UAdCGZs5o0SgVWxKzXkyK0C9wM4afXWVKhV_WCLr3bY6m2TkwjlkJMamZItLpGR0vBfETrdQ740xmO4cxFSXLBtVo4IeAoQLSE0SQc-07CeMvu7qahh-c99un8kp7ruH5dmtrj4vwBjCnqcJkHB0CXrD62LZcex-tPzJhnYisEhB4OwmWjBOOCNCOgWqMPHPcdsg" alt="Map" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-2 text-secondary">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span className="font-label text-xs font-bold uppercase tracking-widest">Global Headquarters</span>
                </div>
                <h3 className="font-headline font-bold text-xl text-primary mb-2">Canary Wharf, London</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  25 Churchill Place<br/>
                  London E14 5RB, UK
                </p>
              </div>
            </section>

            <section className="bg-surface-container-low rounded-[2rem] p-8">
              <h2 className="text-xl font-headline font-bold text-primary mb-6">Common Inquiries</h2>
              <div className="space-y-4">
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-center py-3 border-b border-outline-variant/20">
                    <span className="font-headline font-semibold text-sm text-on-surface group-hover:text-secondary transition-colors">How do I reset my vault access?</span>
                    <span className="material-symbols-outlined text-outline group-hover:text-secondary">add</span>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-center py-3 border-b border-outline-variant/20">
                    <span className="font-headline font-semibold text-sm text-on-surface group-hover:text-secondary transition-colors">Are international transfers instant?</span>
                    <span className="material-symbols-outlined text-outline group-hover:text-secondary">add</span>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-center py-3 border-b border-outline-variant/20">
                    <span className="font-headline font-semibold text-sm text-on-surface group-hover:text-secondary transition-colors">What is the Premium membership?</span>
                    <span className="material-symbols-outlined text-outline group-hover:text-secondary">add</span>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-center py-3">
                    <span className="font-headline font-semibold text-sm text-on-surface group-hover:text-secondary transition-colors">Can I manage multiple entities?</span>
                    <span className="material-symbols-outlined text-outline group-hover:text-secondary">add</span>
                  </div>
                </div>
              </div>
              <button className="mt-6 text-secondary font-headline font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                View Help Center <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </section>

            <div className="bg-primary text-white p-8 rounded-[2rem] relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
              </div>
              <h3 className="font-headline font-bold text-lg mb-2 relative z-10">Concierge Hours</h3>
              <p className="text-blue-100 text-sm relative z-10 mb-4">Dedicated support for premium members around the clock.</p>
              <div className="flex items-center gap-2 font-headline font-bold text-xl relative z-10">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                Always Open
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-[#f7f9fb] border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6 py-12">
          <div className="md:col-span-1">
            <div className="text-lg font-black text-[#00236f] mb-4">Vault Fintech</div>
            <p className="font-body text-xs text-slate-500 leading-relaxed">
              Engineering the future of private banking through architectural UI and deep financial security.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-bold text-sm text-[#00236f] mb-4">Products</h4>
            <ul className="space-y-2 font-body text-xs text-slate-500">
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline" to="#">Digital Vault</Link></li>
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline" to="#">Asset Management</Link></li>
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline" to="#">Enterprise API</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-bold text-sm text-[#00236f] mb-4">Company</h4>
            <ul className="space-y-2 font-body text-xs text-slate-500">
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline" to="/about">About Us</Link></li>
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline" to="#">Newsroom</Link></li>
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline" to="#">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-bold text-sm text-[#00236f] mb-4">Legal</h4>
            <div className="flex flex-col gap-2 font-body text-xs text-slate-500">
              <Link className="hover:text-[#00236f]" to="#">Privacy Policy</Link>
              <Link className="hover:text-[#00236f]" to="#">Terms of Service</Link>
              <Link className="hover:text-[#00236f]" to="#">Security</Link>
              <Link className="hover:text-[#00236f]" to="#">Sitemap</Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200/50 text-slate-500">
          <p className="font-body text-xs text-center">
            © 2024 Vault Editorial Fintech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
