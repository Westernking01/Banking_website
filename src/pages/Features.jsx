import React from 'react';
import { Link } from 'react-router-dom';

export default function Features() {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm transition-colors duration-300 border-none">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
          <div className="text-2xl font-black text-[#00236f] tracking-tight font-headline">Vault Fintech</div>
          <div className="hidden md:flex items-center gap-8 font-headline font-semibold text-sm">
            <Link className="text-[#00236f] border-b-2 border-[#006c49] pb-1 hover:text-[#006c49] transition-colors" to="/features">Features</Link>
            <Link className="text-slate-600 hover:text-[#006c49] transition-colors" to="/about">About</Link>
            <Link className="text-slate-600 hover:text-[#006c49] transition-colors" to="/blog">Blog</Link>
            <Link className="text-slate-600 hover:text-[#006c49] transition-colors" to="/contact">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link className="text-slate-600 font-headline font-semibold text-sm hover:text-[#00236f]" to="/login">Login</Link>
            <Link className="bg-gradient-to-br from-[#00236f] to-[#1e3a8a] text-white px-6 py-2.5 rounded-xl font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20" to="/signup">Open Account</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section (Editorial Style) */}
      <header className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-widest mb-6">Capabilities</span>
            <h1 className="font-headline font-extrabold text-5xl md:text-7xl text-primary leading-[1.1] tracking-tight">
              Engineered for the <span className="text-secondary">Next Era</span> of Capital.
            </h1>
          </div>
          <div className="lg:col-span-4 pb-2">
            <p className="text-on-surface-variant text-lg leading-relaxed mb-6 border-l-4 border-secondary pl-6">
              We've dismantled traditional banking to rebuild it with architectural precision. Experience security, speed, and intelligence in one vault.
            </p>
          </div>
        </div>
      </header>

      {/* Features Bento Grid */}
      <main className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Secure Banking */}
          <div className="group relative bg-surface-container-lowest p-8 rounded-[2rem] overflow-hidden transition-all duration-500 hover:translate-y-[-4px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="mb-8">
              <span className="material-symbols-outlined text-5xl text-primary p-4 bg-surface-container-low rounded-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
            </div>
            <h3 className="font-headline font-extrabold text-2xl text-primary mb-4">Secure Banking</h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                End-to-end encryption
              </li>
              <li className="flex items-center gap-2 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                Biometric 2FA
              </li>
            </ul>
            <button className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
              Learn More <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
          {/* 2. Fast Transfers */}
          <div className="group relative bg-surface-container-low p-8 rounded-[2rem] overflow-hidden transition-all duration-500 hover:translate-y-[-4px]">
            <div className="mb-8">
              <span className="material-symbols-outlined text-5xl text-secondary p-4 bg-secondary-container rounded-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <h3 className="font-headline font-extrabold text-2xl text-primary mb-4">Fast Transfers</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
              Instant cross-border payments with zero hidden fees. Move capital across 50+ countries in seconds.
            </p>
            <div className="mt-auto">
              <img alt="Financial Data" className="w-full h-32 object-cover rounded-xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUbsNIoSbiX3YB_5qTrJ7t_y36yYXvtEb0UrCwqk_ua34R7QhY4PmB6btRDZGBfzRmpVzbDiC1xUgPlKUZWblwfduLXMbHRo_0NbnZ7Dmb88xsRjLUu2hPtsVeuoHQgTK7fo2e7Fs0GT0I7ZQqD5ai2kk9qDn5m9Emo5_E5X3hJLR6Bpy49dqKEk98kePo7DDpLE3I2F07dZBW5c1Ot1VABbQjFPjX88OZ8GyWbbhGLgEAgSAHJu-ZCWqSW3orglcwhgHy1MJxIQ" />
              <button className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                Get Started <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
          {/* 3. Analytics */}
          <div className="group relative bg-primary p-8 rounded-[2rem] overflow-hidden transition-all duration-500 hover:translate-y-[-4px] text-white">
            <div className="mb-8">
              <span className="material-symbols-outlined text-5xl text-secondary-container p-4 bg-white/10 backdrop-blur rounded-2xl">query_stats</span>
            </div>
            <h3 className="font-headline font-extrabold text-2xl mb-4">Analytics</h3>
            <p className="text-primary-fixed text-sm leading-relaxed mb-8">
              AI-powered spending insights and automated budget tracking that learns from your habits.
            </p>
            <div className="p-4 bg-white/5 rounded-xl mb-8 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs opacity-60">Monthly Budget</span>
                <span className="text-xs font-bold">$4,200.00</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-secondary-container w-[72%]"></div>
              </div>
            </div>
            <button className="flex items-center gap-2 text-secondary-container font-bold text-sm group-hover:gap-3 transition-all">
              Explore Insights <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
          {/* 4. Card Management */}
          <div className="group relative bg-surface-container-lowest p-8 rounded-[2rem] overflow-hidden transition-all duration-500 hover:translate-y-[-4px] border-l-4 border-secondary">
            <div className="mb-8">
              <span className="material-symbols-outlined text-5xl text-primary p-4 bg-surface-container-low rounded-2xl">credit_card_heart</span>
            </div>
            <h3 className="font-headline font-extrabold text-2xl text-primary mb-4">Card Management</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
              Issue virtual cards instantly and maintain total control with one-tap freezing and limits.
            </p>
            <div className="flex -space-x-4 mb-8">
              <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                <img alt="Card" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB39KIKRvl4xmfojKxc9qScuVCeBRCiTnA4Xptc3eqiMB4gwrttqDlX0qbNLevYuWn__bXeLT0WZr9OLf--YvEgUvREbWL142JafAjN1wvIPxI-hNES1nrT0IUUaufML9bOm9pMvT-cQK5UNz6fpRoGvkKsigSfUbEL5pYOMceskGfOKHvcI2g1HNqm6Ro7nLUkhdbZZKSJhgjM0dcWZ1xYj9OMiziAQTllCF_17M9MO29-m4XLxfiH3gq65i4GxEN_x9fJeZN7zQ" />
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-300 overflow-hidden">
                <img alt="Card" src="https://lh3.googleusercontent.com/aida-public/AB6AXuByO_AF0Re1bH5Gu5VLxPwg8n5LkCpq-L7-Jav4-OUolPTX727kPMp_EuFVfID3rwWDH4NT_2dNobKpqYuF1NjITLFTd5Q0nsuq2peptnIeHkJWNHMbdgsOM399GqaoVziE3d1VSqRe1RdU2Bh9Z79XYdjUp-wXwl21zlbP8DZEKdp7npdRLeGNZqpWgX3uF8NVSCw33xdgic9j8e027F3Pb1ouWXljyxOcalpaPsXxkxc8ucP84W_yhawOtMr0Mc3sZA3FFZr7RA" />
              </div>
            </div>
            <button className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
              Learn More <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom CTA Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-gradient-to-br from-[#00236f] to-[#1e3a8a] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
          <h2 className="font-headline font-extrabold text-4xl md:text-5xl text-white mb-8 max-w-2xl mx-auto">Ready to build your digital fortress?</h2>
          <p className="text-primary-fixed text-lg mb-12 max-w-xl mx-auto opacity-80">Join 500k+ users who trust Vault Fintech for their professional and personal capital management.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-secondary-container text-on-secondary-container px-10 py-4 rounded-xl font-headline font-extrabold text-lg shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all">Get Started Now</button>
            <button className="bg-white/10 backdrop-blur text-white border border-white/20 px-10 py-4 rounded-xl font-headline font-extrabold text-lg hover:bg-white/20 transition-all">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f7f9fb] border-t border-slate-200 py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="text-xl font-black text-[#00236f] mb-6">Vault Fintech</div>
              <p className="font-body text-xs text-slate-500 leading-relaxed max-w-xs">
                Redefining the architecture of modern finance through transparency, security, and editorial design.
              </p>
            </div>
            <div>
              <h4 className="text-[#00236f] font-bold text-sm mb-6 uppercase tracking-widest">Platform</h4>
              <ul className="space-y-4">
                <li><Link className="text-slate-500 hover:text-[#00236f] text-xs transition-colors underline-offset-4 hover:underline decoration-[#006c49]" to="#">Features</Link></li>
                <li><Link className="text-slate-500 hover:text-[#00236f] text-xs transition-colors underline-offset-4 hover:underline decoration-[#006c49]" to="#">Security</Link></li>
                <li><Link className="text-slate-500 hover:text-[#00236f] text-xs transition-colors underline-offset-4 hover:underline decoration-[#006c49]" to="#">Cards</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#00236f] font-bold text-sm mb-6 uppercase tracking-widest">Company</h4>
              <ul className="space-y-4">
                <li><Link className="text-slate-500 hover:text-[#00236f] text-xs transition-colors underline-offset-4 hover:underline decoration-[#006c49]" to="#">About Us</Link></li>
                <li><Link className="text-slate-500 hover:text-[#00236f] text-xs transition-colors underline-offset-4 hover:underline decoration-[#006c49]" to="#">Careers</Link></li>
                <li><Link className="text-slate-500 hover:text-[#00236f] text-xs transition-colors underline-offset-4 hover:underline decoration-[#006c49]" to="#">Press</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#00236f] font-bold text-sm mb-6 uppercase tracking-widest">Legal</h4>
              <ul className="space-y-4">
                <li><Link className="text-slate-500 hover:text-[#00236f] text-xs transition-colors underline-offset-4 hover:underline decoration-[#006c49]" to="#">Privacy Policy</Link></li>
                <li><Link className="text-slate-500 hover:text-[#00236f] text-xs transition-colors underline-offset-4 hover:underline decoration-[#006c49]" to="#">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-body text-xs text-slate-500">
              © 2024 Vault Editorial Fintech. All rights reserved.
            </div>
            <div className="flex gap-6">
              <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-colors">public</span>
              <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-colors">language</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
