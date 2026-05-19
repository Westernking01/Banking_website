import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-surface text-on-surface selection:bg-secondary-fixed selection:text-on-secondary-fixed min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm dark:shadow-none border-none transition-colors duration-300">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
          <div className="text-2xl font-black text-[#00236f] dark:text-white tracking-tight">Vault Fintech</div>
          <div className="hidden md:flex items-center gap-8 font-headline font-semibold text-sm">
            <Link className="text-slate-600 dark:text-slate-400 hover:text-[#006c49] transition-colors" to="/features">Features</Link>
            <Link className="text-slate-600 dark:text-slate-400 hover:text-[#006c49] transition-colors" to="/about">About</Link>
            <Link className="text-slate-600 dark:text-slate-400 hover:text-[#006c49] transition-colors" to="/blog">Blog</Link>
            <Link className="text-slate-600 dark:text-slate-400 hover:text-[#006c49] transition-colors" to="/contact">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link className="font-headline font-semibold text-sm text-slate-600 dark:text-slate-400 hover:text-[#006c49] px-4 py-2 transition-all active:scale-95" to="/login">Login</Link>
            <Link className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20" to="/signup">Open Account</Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-surface py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-secondary-container text-on-secondary-container rounded-full">Evolution of Banking</span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-primary leading-[1.1] mb-8 tracking-tight font-headline">Modern Banking for the Bold</h1>
              <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-lg leading-relaxed font-body">Experience a curated digital gallery for your finances. Architectural depth, institutional security, and effortless velocity in every transaction.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-primary/20">Open Account</button>
                <button className="bg-surface-container-high text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-container-highest transition-colors active:scale-95">View Features</button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary-fixed opacity-20 blur-[120px] rounded-full"></div>
              <div className="relative bg-surface-container-lowest rounded-[32px] p-4 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <img alt="Banking Dashboard Preview" className="rounded-[24px] w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj__vpyyLEHwahGxJxIfhiJf-hAJU-Krn0zlcJuTbQuCONR92yh2KwyZs0dPOWfI426tckyUZCMf0h8r52J9PlXov_t_BqtUx-6-3yqO4pVBPD23dwspPsBvnkuMYbXOVPkL_R0EhyIzCMxxjG4LY0Oq09HcMr7ScKbP78rw9JbgMUrOWIljJpEh2U9fQ56kfVLO6JTnRL-8kha8FtdcMYe-ruUid_HrdDQuOzxSJH1ADgPK2xNOr6rMYk-41lN9ja8-_Dfxtg7A" />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="text-center md:text-left">
                <p className="text-primary font-bold text-2xl">Trusted by 10M+</p>
                <p className="text-on-surface-variant font-medium">Active users worldwide</p>
              </div>
              <div className="flex flex-wrap justify-center gap-12 grayscale opacity-60">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-3xl">verified_user</span>
                  <span className="font-bold">PCI DSS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-3xl">security</span>
                  <span className="font-bold">FDIC INSURED</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-3xl">gavel</span>
                  <span className="font-bold">FINCEN</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Bento Grid */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-extrabold text-primary mb-4 tracking-tight font-headline">Institutional Power, Personal Touch</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">Our features are designed as architectural layers—robust at the core, elegant on the surface.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <div className="group bg-surface-container-low p-8 rounded-[24px] hover:bg-surface-container-lowest transition-all duration-300 relative overflow-hidden">
                <div className="w-1 bg-secondary absolute left-0 top-12 bottom-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="bg-primary-container/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'wght' 400, 'FILL' 1" }}>shield</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4 font-headline">Secure Banking</h3>
                <p className="text-on-surface-variant leading-relaxed">Multi-layered biometric encryption and real-time fraud monitoring built into every single tap.</p>
              </div>
              {/* Feature Card 2 */}
              <div className="group bg-surface-container-low p-8 rounded-[24px] hover:bg-surface-container-lowest transition-all duration-300 relative overflow-hidden">
                <div className="w-1 bg-secondary absolute left-0 top-12 bottom-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="bg-secondary-container/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'wght' 400, 'FILL' 1" }}>bolt</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4 font-headline">Fast Transfers</h3>
                <p className="text-on-surface-variant leading-relaxed">Move assets globally in seconds with our high-velocity clearing engine. No borders, no delays.</p>
              </div>
              {/* Feature Card 3 */}
              <div className="group bg-surface-container-low p-8 rounded-[24px] hover:bg-surface-container-lowest transition-all duration-300 relative overflow-hidden">
                <div className="w-1 bg-secondary absolute left-0 top-12 bottom-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="bg-tertiary-fixed/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'wght' 400, 'FILL' 1" }}>analytics</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4 font-headline">24/7 Analytics</h3>
                <p className="text-on-surface-variant leading-relaxed">Editorial-style reporting that turns complex data into clear, actionable insights for your wealth.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div className="max-w-xl">
                <h2 className="text-4xl font-extrabold text-primary mb-4 tracking-tight font-headline">The Member Experience</h2>
                <p className="text-on-surface-variant">Hear from the pioneers who are redefining their relationship with capital through Vault.</p>
              </div>
              <div className="hidden md:flex gap-4">
                <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined">arrow_back</span></button>
                <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined">arrow_forward</span></button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-shadow duration-500">
                <div className="flex gap-1 mb-6 text-secondary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="text-lg italic text-on-surface mb-8 leading-relaxed">"The UI feels like a premium gallery. It’s the first banking app that doesn't feel like a chore to use. Every transaction is effortless."</p>
                <div className="flex items-center gap-4">
                  <img alt="Alexander Vault" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9GZj0dpLlYr1quNY2nMR81H1Sr0aUqbaIrghKLrd249_lw0xtpbs8__6N1GzqTF28vtaGPL3BTWv9p5uZvDdJ-eeKiBKi41Q1O7so_8RwzDiV2F0Xctq0lmB6GBJImHIu8B124GquJes1AjSpfdLkcvLLz7ezntrxisb_Zew5cSlf1LAy407Ihn3ZHTQUcuCzhyA_KXxT4YWiQvgZqWCLqb0dyqdApgu_ppUEi6qq_1EGRSkWynKX5j-3dJF3NgUcWbze9YPi-A" />
                  <div>
                    <p className="font-bold text-primary">Julian Thorne</p>
                    <p className="text-xs text-on-surface-variant font-medium">Founder at Lumos Capital</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-shadow duration-500">
                <div className="flex gap-1 mb-6 text-secondary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="text-lg italic text-on-surface mb-8 leading-relaxed">"Security was my main concern. Vault's approach to biometric protection and transparency gave me the peace of mind I needed."</p>
                <div className="flex items-center gap-4">
                  <img alt="Sarah Chen" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHMUIRZXs-m7JSNwkmnAD6WoLiwogeJGT-AEdC-XqrUVHfXBYgT7g_vVyZThbdBu2kI0Z92QuUJMOoFqrRPH6trd8z5xSd-BT_83Ce_EF62VQ5c2OdBOHqm5cVhsOnhMxM4o8DyEKoOpqoTqJLQtbvmMIhtiqj6nOVAMGF1xfdED5fADVechiqRCsXMq-RAHnP42lotKeIw9fsQAJDSYI219oZLIZ-XOXFDR6MW16m1436jV0OSVFN8Cpe9nHxwl_luR7B7jo76w" />
                  <div>
                    <p className="font-bold text-primary">Sarah Chen</p>
                    <p className="text-xs text-on-surface-variant font-medium">Chief of Operations</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 3 */}
              <div className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-shadow duration-500">
                <div className="flex gap-1 mb-6 text-secondary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="text-lg italic text-on-surface mb-8 leading-relaxed">"Vault has completely transformed how I manage international payroll. It’s fast, reliable, and honestly, beautiful to look at."</p>
                <div className="flex items-center gap-4">
                  <img alt="Marcus Reed" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZsUvvHVg3chXnbWW8Rxc2jNxxnl3wkIWF8JMtf1u4OyqZ621fCmmTON1eSAN0UD7AOV39aiyDKn-4_WFygE5a9N82EhSR31VMNpMuKMAZDCcAMpRgRuZpNunTu1d0gjjVwK8_6L9D8Xn-kdqjiOPPg50W4uut3lWwIXjJSW_xm96YhFhJ7Q6-Bjb3FOjbOVHyS9iyTO2g6aF23-xquWlAqNTbP_wma10mA_9Vt51roll4l6wZtJnMFPCRGrlbXRCTA16G0m4etQ" />
                  <div>
                    <p className="font-bold text-primary">Marcus Reed</p>
                    <p className="text-xs text-on-surface-variant font-medium">Digital Architect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-r from-primary to-primary-container rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight font-headline">Ready to enter the Vault?</h2>
                <p className="text-primary-fixed text-lg mb-12">Join over 10 million users who are experiencing the future of finance today. No lines, no limits.</p>
                <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform active:scale-95 shadow-2xl">Open Your Account Now</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f7f9fb] dark:bg-slate-950 w-full py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
          <div className="col-span-1 md:col-span-1">
            <div className="text-lg font-black text-[#00236f] dark:text-white mb-6">Vault Fintech</div>
            <p className="font-body text-xs text-slate-500 leading-loose">
              The next generation of asset management and digital banking. Redefining how the bold interact with their capital through architectural design and institutional strength.
            </p>
            <div className="flex gap-4 mt-6">
              <Link className="text-slate-400 hover:text-primary transition-colors" to="#"><span className="material-symbols-outlined">public</span></Link>
              <Link className="text-slate-400 hover:text-primary transition-colors" to="#"><span className="material-symbols-outlined">share</span></Link>
              <Link className="text-slate-400 hover:text-primary transition-colors" to="#"><span className="material-symbols-outlined">groups</span></Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[#00236f] dark:text-white text-sm mb-6 uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4 font-body text-xs text-slate-500">
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="/features">Features</Link></li>
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Security</Link></li>
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Business Accounts</Link></li>
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Premium Members</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#00236f] dark:text-white text-sm mb-6 uppercase tracking-widest">Company</h4>
            <ul className="space-y-4 font-body text-xs text-slate-500">
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="/about">About Us</Link></li>
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="/blog">Blog</Link></li>
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Careers</Link></li>
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#00236f] dark:text-white text-sm mb-6 uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4 font-body text-xs text-slate-500">
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Privacy Policy</Link></li>
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Terms of Service</Link></li>
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Security</Link></li>
              <li><Link className="hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Sitemap</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-12 border-t border-slate-200 dark:border-slate-800">
          <p className="font-body text-xs text-slate-500 text-center">© 2024 Vault Editorial Fintech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
