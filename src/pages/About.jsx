import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm transition-colors duration-300">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
          <div className="text-2xl font-black text-[#00236f] tracking-tight font-headline">Vault Fintech</div>
          <div className="hidden md:flex items-center gap-8 font-headline font-semibold text-sm">
            <Link className="text-slate-600 hover:text-[#006c49] transition-colors" to="/features">Features</Link>
            <Link className="text-[#00236f] border-b-2 border-[#006c49] pb-1" to="/about">About</Link>
            <Link className="text-slate-600 hover:text-[#006c49] transition-colors" to="/blog">Blog</Link>
            <Link className="text-slate-600 hover:text-[#006c49] transition-colors" to="/contact">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link className="font-headline font-semibold text-sm text-[#00236f] hover:opacity-80" to="/login">Login</Link>
            <Link className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-xl font-headline font-bold text-sm hover:scale-95 duration-200 shadow-sm" to="/signup">Open Account</Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[716px] flex items-center overflow-hidden bg-surface">
          <div className="absolute inset-0 z-0">
            <img alt="Modern office interior" className="w-full h-full object-cover opacity-20 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWNMRjq_JcOJMXx2goi9Wl85EnqkDldaZj8mbPjKuLlUze-VIfFhejR5u_5WJAapCrC1njQJeTB9OH6tDps7ZFwp90-3xbaBMX8hP9D4YRQpwg5o4lYPZyqRTBqFNcUHOnMo07gnmzGHYXWqyEbXJ_INBzOh-gSvEyMJb8EX2RqJrVldJqNPGk55l3-6q0l2RezMc1ry3xQtiurgUyO387SixNQEPz5R3k7KabmKixp3At4HlQJTfTtYKWQEkMAbKE4_rQrDtvmA" />
            <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
            <div className="max-w-3xl">
              <span className="text-secondary font-headline font-bold tracking-widest text-xs uppercase mb-4 block">OUR PHILOSOPHY</span>
              <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-primary leading-tight mb-6">
                The Architectural <br/><span className="text-secondary">Vault</span> of Modern Finance.
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed font-light">
                We don't just process transactions; we curate financial experiences. Founded on the principle of structural integrity and absolute transparency.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision: Bento Grid Pattern */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Mission Card */}
              <div className="md:col-span-7 bg-surface-container-low rounded-[2rem] p-12 relative overflow-hidden group">
                <div className="relative z-10">
                  <h2 className="text-3xl font-headline font-bold text-primary mb-6">Our Mission</h2>
                  <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                    To redefine banking through the lens of high-end curation. We eliminate the noise of legacy systems to provide a gallery-like financial interface that empowers clarity.
                  </p>
                  <div className="inline-flex items-center text-secondary font-bold gap-2">
                    <span>Read our manifesto</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>
              </div>
              
              {/* Vision Image Card */}
              <div className="md:col-span-5 bg-surface-container-highest rounded-[2rem] overflow-hidden min-h-[400px] relative">
                <img alt="Building facade" className="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARGCEVKhQ_lUjsxR79KiapeSee6yuo3-MvYgkkbJKAMSta0fWmsGYy3SeV3-RMohfDk_GzZDuJsHEsm5do-AXns_fAg4j048D2WkKW_BDe25QaOB9t0MMD8k5zflQGY9e-q1ofL5Roqm_QbM3W8fvWVdx6xa5yJkpIMPlaSrLHjqlRb0KJXxIBzLm2DbjnW0V_RO2YjMNXObhaUmCxeJfUppHmHYLPJL5qknMANFOLVEKor0yLJS46bZTchTjPdjgl8WVrUlQzqw" />
                <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-md p-6 rounded-2xl">
                  <h3 className="font-headline font-bold text-primary">Global Reach</h3>
                  <p className="text-xs text-on-surface-variant">Operating in 42 countries with local-first compliance.</p>
                </div>
              </div>
              
              {/* Vision Card */}
              <div className="md:col-span-5 bg-primary rounded-[2rem] p-12 text-white relative overflow-hidden">
                <h2 className="text-3xl font-headline font-bold mb-6">The Vision</h2>
                <p className="opacity-80 text-lg leading-relaxed">
                  To become the world's most trusted digital vault, where security meets effortless elegance.
                </p>
                <div className="mt-12 h-1 w-24 bg-secondary"></div>
              </div>
              
              {/* Metric Bento */}
              <div className="md:col-span-7 grid grid-cols-2 gap-8">
                <div className="bg-secondary-container/30 rounded-[2rem] p-8 flex flex-col justify-center border-l-4 border-secondary">
                  <span className="text-4xl font-headline font-black text-secondary">1.2M+</span>
                  <span className="text-sm font-bold text-on-secondary-container mt-2">Active Curators</span>
                </div>
                <div className="bg-surface-container rounded-[2rem] p-8 flex flex-col justify-center">
                  <span className="text-4xl font-headline font-black text-primary">$40B+</span>
                  <span className="text-sm font-bold text-on-surface-variant mt-2">Assets Vaulted</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-headline font-extrabold text-primary mb-4">Our Evolution</h2>
              <div className="w-16 h-1 bg-secondary mx-auto"></div>
            </div>
            <div className="relative space-y-24 before:content-[''] before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:bg-outline-variant/30 before:hidden md:before:block">
              {/* Milestone 1 */}
              <div className="relative flex flex-col md:flex-row items-center gap-12 group">
                <div className="md:w-1/2 text-right hidden md:block">
                  <span className="text-5xl font-headline font-black text-outline-variant/20">2018</span>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-surface hidden md:block z-10"></div>
                <div className="md:w-1/2 bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="md:hidden text-2xl font-headline font-black text-outline-variant/40 mb-2 block">2018</span>
                  <h3 className="text-xl font-headline font-bold text-primary mb-2">The Blueprint</h3>
                  <p className="text-on-surface-variant">Founded in a small architectural studio, the idea was to treat financial data with the same respect as a structural floorplan.</p>
                </div>
              </div>
              
              {/* Milestone 2 */}
              <div className="relative flex flex-col md:flex-row-reverse items-center gap-12 group">
                <div className="md:w-1/2 text-left hidden md:block">
                  <span className="text-5xl font-headline font-black text-outline-variant/20">2021</span>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-surface hidden md:block z-10"></div>
                <div className="md:w-1/2 bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="md:hidden text-2xl font-headline font-black text-outline-variant/40 mb-2 block">2021</span>
                  <h3 className="text-xl font-headline font-bold text-primary mb-2">Series B Launch</h3>
                  <p className="text-on-surface-variant">Vault expanded into 12 new markets, introducing the first "Gallery View" for corporate transactions.</p>
                </div>
              </div>
              
              {/* Milestone 3 */}
              <div className="relative flex flex-col md:flex-row items-center gap-12 group">
                <div className="md:w-1/2 text-right hidden md:block">
                  <span className="text-5xl font-headline font-black text-outline-variant/20">2024</span>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-surface hidden md:block z-10"></div>
                <div className="md:w-1/2 bg-primary p-8 rounded-2xl shadow-lg">
                  <span className="md:hidden text-2xl font-headline font-black text-white/20 mb-2 block">2024</span>
                  <h3 className="text-xl font-headline font-bold text-white mb-2">AI-Driven Integrity</h3>
                  <p className="text-white/80">Integration of predictive architectural modeling to ensure user portfolio stability in volatile markets.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-4xl font-headline font-extrabold text-primary mb-4">The Architects</h2>
              <p className="text-on-surface-variant max-w-xl">Led by a diverse team of designers, engineers, and financial strategists.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* CEO */}
              <div className="group">
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-surface-container-high relative">
                  <img alt="CEO Portrait" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWqU0HMpsv1_RGZ8yark31-UFMemIPhBYXwVvyIyQTIf_HrEatrmhwoioT7y6VrPWpy5hPOUQoTc6Xof4pOOGfBIuRLHIFGHwsa0t3TNLc5pBKQX8n6pIMKwib56GU3bw9q-0FjsnojRP6CVBoYX5fc-8YEsykpM3tTt2g5pk9c7tcbgIEWnU2JpTTulHjCXkqKvEDm9gPguCN_-H66BmQEcgcAdDWxOgYhdf-lA9Jq7a2ESNpYaTgc1Fp__iPqJxS9F_onoQ6KQ" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-headline font-bold text-primary">Alexander Vault</h3>
                <p className="text-secondary font-bold text-sm tracking-wide">CEO & Founder</p>
              </div>
              {/* CTO */}
              <div className="group">
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-surface-container-high relative">
                  <img alt="CTO Portrait" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp1rML5WP1D9QYygQNOBzIAcTZ-ivJVHMy6PvsBZcs7D-Af_QaYkhvHwjxvYV_dmW_BRFvnr34-Z2H68HIdHNJI6A-XztXY3lFTddIwWqim6-fekWECl6eyVnEGiEj7fpFvtnvQ-Dh28CqhTifD-mcdDkmB0U-FniAlG4TUsixEy-EZhlydDFu9a3-v3wvMp7Gz76SrYCqkmVYPk7hgsQApBaP74vqVKgVs2k-jTzLbAHzhCcQMF0LkSYObcZ7ii678ZiP24I4bA" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-headline font-bold text-primary">Sarah Chen</h3>
                <p className="text-secondary font-bold text-sm tracking-wide">Chief Technology Officer</p>
              </div>
              {/* Lead Designer */}
              <div className="group">
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-surface-container-high relative">
                  <img alt="Lead Designer Portrait" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDIPkbuTDAnfSJK-SEsH6vwEs5Jrdh2XWQCHt4RdSKYOrci5ucI-1aq7favqX8c-qrbuzXctj6QMYwRk2LTj2p-PBl_E4HyVB5dBd7siF2LvIK1nG-yocuRher_XoPS_EJJjcN_wSr3K_9jKUM1o0lji7Af7v4sNwFBQ2HgBVhthSyBDeJtGcs8JBIcH1l6iGhhrjuMgW8XJjekIk7DADOimLvC11otUrAu3Ns85L9AfFSneaWKM6UAX2JNe0R_Ojt6eAzhO2niA" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-headline font-bold text-primary">Marcus Thorne</h3>
                <p className="text-secondary font-bold text-sm tracking-wide">Lead Experience Designer</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto bg-primary-container rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-white text-3xl md:text-5xl font-headline font-extrabold mb-8">Ready to enter the Vault?</h2>
              <p className="text-primary-fixed text-lg mb-12 max-w-2xl mx-auto opacity-80">Experience financial management designed with the precision of a master architect.</p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <button className="bg-secondary text-white px-10 py-4 rounded-xl font-headline font-bold text-lg hover:scale-105 transition-transform">Get Started Now</button>
                <button className="text-white border-2 border-white/20 px-10 py-4 rounded-xl font-headline font-bold text-lg hover:bg-white/10 transition-colors">Contact Relations</button>
              </div>
            </div>
            {/* Abstract Texture */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-fixed rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-fixed rounded-full blur-[100px]"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f7f9fb] w-full py-12 border-t border-slate-200 font-body text-xs text-slate-500">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
          <div className="col-span-1">
            <div className="text-lg font-black text-[#00236f] mb-4">Vault Fintech</div>
            <p className="mb-6 leading-relaxed">The premier choice for editorial banking experiences and architectural financial management.</p>
          </div>
          <div>
            <h4 className="text-on-surface font-bold mb-4 uppercase tracking-widest text-[10px]">Product</h4>
            <ul className="space-y-3">
              <li><Link className="text-slate-500 hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Personal</Link></li>
              <li><Link className="text-slate-500 hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Business</Link></li>
              <li><Link className="text-slate-500 hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Premium</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-on-surface font-bold mb-4 uppercase tracking-widest text-[10px]">Company</h4>
            <ul className="space-y-3">
              <li><Link className="text-[#006c49] font-bold" to="#">About Us</Link></li>
              <li><Link className="text-slate-500 hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Careers</Link></li>
              <li><Link className="text-slate-500 hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Press</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-on-surface font-bold mb-4 uppercase tracking-widest text-[10px]">Support</h4>
            <ul className="space-y-3">
              <li><Link className="text-slate-500 hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Help Center</Link></li>
              <li><Link className="text-slate-500 hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Privacy Policy</Link></li>
              <li><Link className="text-slate-500 hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
          <p>© 2024 Vault Editorial Fintech. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-colors">public</span>
            <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-colors">share</span>
            <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-colors">rss_feed</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
