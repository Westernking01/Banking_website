import React from 'react';
import { Link } from 'react-router-dom';

export default function Blog() {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen relative">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm border-none transition-colors duration-300">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
          <div className="text-2xl font-black text-primary tracking-tight">Vault Fintech</div>
          <div className="hidden md:flex items-center gap-8 font-headline font-semibold text-sm">
            <Link className="text-slate-600 hover:text-secondary transition-colors" to="/features">Features</Link>
            <Link className="text-slate-600 hover:text-secondary transition-colors" to="/about">About</Link>
            <Link className="text-primary border-b-2 border-secondary pb-1" to="/blog">Blog</Link>
            <Link className="text-slate-600 hover:text-secondary transition-colors" to="/contact">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link className="text-primary font-headline font-semibold text-sm px-4 py-2" to="/login">Login</Link>
            <Link className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-lg font-headline font-bold text-sm hover:opacity-90 transition-all active:scale-95" to="/signup">Open Account</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <h1 className="font-headline font-extrabold text-5xl md:text-6xl text-primary tracking-tighter mb-4">Editorial</h1>
          <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
            Insights from the intersection of architectural finance, security, and the future of digital wealth.
          </p>
        </header>
        <section className="mb-20">
          <div className="relative group cursor-pointer overflow-hidden rounded-2xl bg-surface-container-low flex flex-col md:flex-row items-stretch">
            <div className="md:w-3/5 h-64 md:h-[500px] overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPyVmdJ2SmEONrcEaZUFdBLvR97wcdIxFrW5qbXpdbYSBbwKvCX6z47GQrG_qufk4YWfurm0LKpc3kl4MtY4fNqCVBF5HKtWfEjQqu0Z5exjE0FltKB2jJbXYlut9oDCY2AW2oSoyDnwFeGUQFM58eo2HBXZWJZRY2ioPmVnZ8OGpRIh3FhR4EDdl2sRuAgzPFku057umIwZFEEwzNhK5d9oqFwDdkvzFdWmP94wn7PW_UpbOR3KyjkCSp9aS1BeHCRF4MrrKJIQ" alt="Architecture" />
            </div>
            <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold tracking-wider">ECONOMY</span>
                <span className="text-on-surface-variant text-xs">May 24, 2024</span>
              </div>
              <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-primary mb-6 leading-tight">The Architectural Vault: How Design Systems Protect Capital</h2>
              <p className="text-on-surface-variant mb-8 line-clamp-3 md:line-clamp-none">Exploring the nexus of structural integrity and digital asset protection. Why the way we visualize data dictates the security of the transaction itself.</p>
              <div>
                <button className="flex items-center gap-2 text-primary font-headline font-bold group-hover:gap-4 transition-all">
                  Read More 
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
            <div className="absolute left-0 top-0 h-full w-1 bg-secondary"></div>
          </div>
        </section>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-3/4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
              <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <button className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap">All Stories</button>
                <button className="bg-surface-container text-on-surface-variant px-5 py-2 rounded-full text-sm font-medium hover:bg-surface-container-high transition-colors whitespace-nowrap">Economy</button>
                <button className="bg-surface-container text-on-surface-variant px-5 py-2 rounded-full text-sm font-medium hover:bg-surface-container-high transition-colors whitespace-nowrap">Security</button>
                <button className="bg-surface-container text-on-surface-variant px-5 py-2 rounded-full text-sm font-medium hover:bg-surface-container-high transition-colors whitespace-nowrap">Product Updates</button>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                <input className="bg-surface-container-highest/50 border-none rounded-full pl-12 pr-6 py-2.5 text-sm w-full md:w-64 focus:ring-2 focus:ring-primary/20 transition-all text-on-surface" placeholder="Search articles..." type="text" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <article className="group cursor-pointer">
                <div className="rounded-xl overflow-hidden mb-5 bg-surface-container-low aspect-[16/10]">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxW7eFGPNwDS4qNdH-xgJnHTVW2DiIaoILvmo-IZ8d_n4vp4_7U33bZT-PKe44N8TL9yWmrjB4uUhnVfuQd_Ydklo04-J0vbe51ttKMGaC-RwcIXActYQr2bNqot0ESHWBPx9jrW2P69kWj4YYDjTB7OOaN6uVxK-S-UJsMA_MIAQrARZ7V7fm5n8FAYtAgSB8W0KqsC7T0h3ze2yjGCjqaNzgEwB7O5OhruehEhhXpvKHNkU7iiR-VaNiwYHG-TmbzpMwF3vwqQ" alt="Stairs" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-secondary font-bold text-[10px] tracking-widest">SECURITY</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="text-on-surface-variant text-[11px] font-medium">8 MIN READ</span>
                </div>
                <h3 className="font-headline font-bold text-xl text-primary mb-3 leading-snug group-hover:text-secondary transition-colors">Quantum Encryption: The New Standard for Institutional Assets</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">As computational power evolves, the walls of the digital vault must thicken. Here is how we stay ahead of the curve.</p>
                <span className="text-primary font-headline font-bold text-xs flex items-center gap-1">READ STORY <span className="material-symbols-outlined text-sm">chevron_right</span></span>
              </article>
              
              <article className="group cursor-pointer">
                <div className="rounded-xl overflow-hidden mb-5 bg-surface-container-low aspect-[16/10]">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_Fmg97zbBoTHbsNvFs3cUB8Xksr83dsyFxNpvKh0LqODryUjbrFoIQbeEOoexli8gQ7-mP3D8DkPSNGySGy-S_EF6Xh12dDAlC60mlsGXIG9h7sTaSIfSQBeDlPgYjuS-cp2RnLcVearbzwLFUk7rW5LxeQj1sFq0HjfEP3HSfkpjSvyC1xAj7DAsjUffUIohMluc5epYQKZPoZ7UznVZlQ8yNNgreFOQl5TwMBSMDayTEhKODjpEBRNBK2uyUxBlSoHhVJXH6g" alt="Cards" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-secondary font-bold text-[10px] tracking-widest">PRODUCT UPDATES</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="text-on-surface-variant text-[11px] font-medium">4 MIN READ</span>
                </div>
                <h3 className="font-headline font-bold text-xl text-primary mb-3 leading-snug group-hover:text-secondary transition-colors">Introducing Vault Black: Redefining the Premium Banking Experience</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">A first look at our most exclusive membership tier designed for global architectural investment.</p>
                <span className="text-primary font-headline font-bold text-xs flex items-center gap-1">READ STORY <span className="material-symbols-outlined text-sm">chevron_right</span></span>
              </article>
              
              <article className="group cursor-pointer">
                <div className="rounded-xl overflow-hidden mb-5 bg-surface-container-low aspect-[16/10]">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1rAQ4iaz0bwHoNaNEVtSXn1iGT60q3SyNUS4jDvB02E3fBakLogjzz7dNMsjwZCvDbJGxIC0HoBUL-hzbc6DyT0aFPt9aXSlffVR4JnJenqwfYOtYHT6lxsPQnBQT_SHA0J5ie1S_Yrk7zCiipRpS75j6jiyWE09EUk4sv36t09da74lBZL7cn6A9I8NJh-Cx6DlPLXyLhqEWk9WkswZf0L6fIKBlkuDuo-BI9NGqyXAae2vMw6JR1Lq6BC1lwVofv-Iey1Ympw" alt="Data Streams" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-secondary font-bold text-[10px] tracking-widest">ECONOMY</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="text-on-surface-variant text-[11px] font-medium">12 MIN READ</span>
                </div>
                <h3 className="font-headline font-bold text-xl text-primary mb-3 leading-snug group-hover:text-secondary transition-colors">Decentralized Liquidity in the Modern Market Landscape</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">How liquidity pools are reshaping the traditional understanding of capital movement across borders.</p>
                <span className="text-primary font-headline font-bold text-xs flex items-center gap-1">READ STORY <span className="material-symbols-outlined text-sm">chevron_right</span></span>
              </article>
              
              <article className="group cursor-pointer">
                <div className="rounded-xl overflow-hidden mb-5 bg-surface-container-low aspect-[16/10]">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHmI7E-jcXaRsdpj37Mh01azo6IGxuFrtfqR6Qk1gvETxTU-ceet6jU7-CSLBtwq8ouBXIFO4WzZZr0TO0ASYU0HUKykHs4oCckL0DGw0jVevt2YPg6bBIImTB2OGRs1X4jBRm3zX6nrKENuS-ugiSNTXjwX_TQMudD92VnK0gKX-pNhjsyTj5PEUDa9R27Cl2ffdg4tSiBsg54FqFrsFA5zSERsLDph06UgR5_rtyRMTySreGtkPxVhXjJtTNiTZ9R7aOnGzvAQ" alt="Data" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-secondary font-bold text-[10px] tracking-widest">SECURITY</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="text-on-surface-variant text-[11px] font-medium">6 MIN READ</span>
                </div>
                <h3 className="font-headline font-bold text-xl text-primary mb-3 leading-snug group-hover:text-secondary transition-colors">The Psychology of Trust: Building Secure Interfaces</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">Why visual clarity is the first line of defense in user security and transaction verification.</p>
                <span className="text-primary font-headline font-bold text-xs flex items-center gap-1">READ STORY <span className="material-symbols-outlined text-sm">chevron_right</span></span>
              </article>
            </div>
            
            <div className="mt-16 flex justify-center">
              <button className="bg-surface-container text-primary font-headline font-bold px-8 py-3 rounded-xl hover:bg-surface-container-high transition-colors flex items-center gap-2">
                Load More Articles
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            </div>
          </div>
          
          <aside className="lg:w-1/4">
            <div className="sticky top-32 space-y-12">
              <div className="bg-primary p-8 rounded-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-white font-headline font-bold text-xl mb-4">Newsletter</h4>
                  <p className="text-primary-fixed text-sm mb-6 leading-relaxed">Weekly editorial insights on fintech and security delivered to your inbox.</p>
                  <input className="w-full bg-white/10 border-white/20 rounded-lg py-2 px-4 text-white text-sm placeholder:text-white/40 focus:ring-white focus:outline-none mb-4" placeholder="email@vault.com" type="email" />
                  <button className="w-full bg-secondary-container text-on-secondary-container font-headline font-bold py-2.5 rounded-lg text-sm hover:opacity-90 transition-all">Subscribe Now</button>
                </div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-secondary opacity-20 rounded-full blur-2xl"></div>
              </div>
              
              <div>
                <h4 className="font-headline font-bold text-sm tracking-widest text-primary mb-6">POPULAR TOPICS</h4>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between group cursor-pointer">
                    <span className="text-on-surface-variant text-sm font-medium group-hover:text-primary transition-colors">Risk Management</span>
                    <span className="text-outline-variant text-xs">24</span>
                  </li>
                  <li className="flex items-center justify-between group cursor-pointer">
                    <span className="text-on-surface-variant text-sm font-medium group-hover:text-primary transition-colors">API Architecture</span>
                    <span className="text-outline-variant text-xs">18</span>
                  </li>
                  <li className="flex items-center justify-between group cursor-pointer">
                    <span className="text-on-surface-variant text-sm font-medium group-hover:text-primary transition-colors">Market Trends</span>
                    <span className="text-outline-variant text-xs">42</span>
                  </li>
                  <li className="flex items-center justify-between group cursor-pointer">
                    <span className="text-on-surface-variant text-sm font-medium group-hover:text-primary transition-colors">Cryptographic Keys</span>
                    <span className="text-outline-variant text-xs">12</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-surface-container-low p-6 rounded-2xl border-l-4 border-secondary">
                <span className="material-symbols-outlined text-secondary mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <p className="text-on-surface italic text-sm leading-relaxed">"Vault's editorial pieces are the only banking insights I actually look forward to reading every week."</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest"></div>
                  <span className="text-xs font-bold text-primary">Marcus H., Portfolio Architect</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="w-full py-12 border-t border-slate-200 bg-[#f7f9fb] text-slate-500">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
          <div className="space-y-4">
            <div className="text-lg font-black text-primary tracking-tight">Vault Fintech</div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">The editorial arm of Vault, exploring the intersection of design, security, and capital.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-sm text-primary">Company</h4>
            <div className="flex flex-col gap-2">
              <Link className="text-slate-500 hover:text-primary underline-offset-4 hover:underline decoration-secondary text-xs" to="#">About Us</Link>
              <Link className="text-slate-500 hover:text-primary underline-offset-4 hover:underline decoration-secondary text-xs" to="#">Careers</Link>
              <Link className="text-slate-500 hover:text-primary underline-offset-4 hover:underline decoration-secondary text-xs" to="#">Press Kit</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-sm text-primary">Resources</h4>
            <div className="flex flex-col gap-2">
              <Link className="text-slate-500 hover:text-primary underline-offset-4 hover:underline decoration-secondary text-xs" to="#">Help Center</Link>
              <Link className="text-slate-500 hover:text-primary underline-offset-4 hover:underline decoration-secondary text-xs" to="#">API Documentation</Link>
              <Link className="text-slate-500 hover:text-primary underline-offset-4 hover:underline decoration-secondary text-xs" to="#">Security Standards</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-sm text-primary">Legal</h4>
            <div className="flex flex-col gap-2">
              <Link className="text-slate-500 hover:text-primary underline-offset-4 hover:underline decoration-secondary text-xs" to="#">Privacy Policy</Link>
              <Link className="text-slate-500 hover:text-primary underline-offset-4 hover:underline decoration-secondary text-xs" to="#">Terms of Service</Link>
              <Link className="text-slate-500 hover:text-primary underline-offset-4 hover:underline decoration-secondary text-xs" to="#">Cookie Policy</Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-slate-400">© 2024 Vault Editorial Fintech. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer text-xl">public</span>
            <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer text-xl">share</span>
            <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer text-xl">rss_feed</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
