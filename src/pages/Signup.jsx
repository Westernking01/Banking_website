import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: 'Weak', color: 'bg-error' },
    { label: 'Fair', color: 'bg-tertiary' },
    { label: 'Good', color: 'bg-secondary' },
    { label: 'Strong', color: 'bg-secondary' },
  ];
  return { score, ...levels[Math.max(0, score - 1)] };
};

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const strength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      let message = 'Registration failed. Please try again.';
      if (err.response?.data?.errors && err.response.data.errors.length > 0) {
        message = err.response.data.errors[0].msg;
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex items-center justify-center selection:bg-secondary-container">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 p-4 md:p-8 items-center gap-12">
        {/* Left: Marketing copy */}
        <section className="hidden md:flex flex-col justify-center space-y-8 pr-12">
          <div className="space-y-4">
            <h1 className="font-headline text-5xl font-extrabold tracking-tight text-primary leading-tight">
              The Architectural <br />
              <span className="text-secondary">Vault</span> for your wealth.
            </h1>
            <p className="text-on-surface-variant text-lg max-w-md">
              Join an elite community of high-net-worth individuals managing assets through curated digital galleries.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {[
              { icon: 'verified_user', title: 'Military-Grade Security', desc: 'Multi-layer encryption with hardware security modules.' },
              { icon: 'insights', title: 'Curated Insights', desc: 'Real-time market analysis tailored to your specific portfolio.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white shadow-sm text-secondary flex-shrink-0">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-primary">{title}</h3>
                  <p className="text-on-surface-variant text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right: Form */}
        <section className="w-full">
          <div className="bg-white/80 backdrop-blur-[24px] border border-outline-variant/20 p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-primary/5">
            <div className="mb-10 text-center md:text-left">
              <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl">
                  <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                    account_balance
                  </span>
                </div>
                <span className="font-headline font-black text-2xl tracking-tighter text-primary">Vault</span>
              </div>
              <h2 className="font-headline text-3xl font-bold text-primary">Create Account</h2>
              <p className="text-on-surface-variant mt-2">Start your journey with premium editorial banking.</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 flex items-center gap-3 bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm font-medium">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSignup} noValidate>
              {/* Full Name */}
              <div className="space-y-2">
                <label className="font-label text-xs font-semibold text-primary uppercase tracking-widest ml-1" htmlFor="name">
                  Full Name
                </label>
                <input
                  className="w-full bg-surface-container-highest/30 border border-transparent focus:border-surface-tint focus:ring-0 rounded-xl px-4 py-4 text-on-surface placeholder:text-on-surface-variant/50 transition-all outline-none"
                  id="name"
                  name="name"
                  placeholder="Alexander Vault"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  disabled={isLoading}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="font-label text-xs font-semibold text-primary uppercase tracking-widest ml-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full bg-surface-container-highest/30 border border-transparent focus:border-surface-tint focus:ring-0 rounded-xl px-4 py-4 text-on-surface placeholder:text-on-surface-variant/50 transition-all outline-none"
                  id="email"
                  name="email"
                  placeholder="alexander@vault.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="font-label text-xs font-semibold text-primary uppercase tracking-widest ml-1" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full bg-surface-container-highest/30 border border-transparent focus:border-surface-tint focus:ring-0 rounded-xl px-4 py-4 text-on-surface placeholder:text-on-surface-variant/50 transition-all outline-none"
                  id="password"
                  name="password"
                  placeholder="••••••••••••"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  disabled={isLoading}
                />

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3 px-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-tighter ${strength.score >= 3 ? 'text-secondary' : 'text-error'}`}>
                        Strength: {strength.label}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-full flex-1 rounded-full transition-all ${i <= strength.score ? strength.color : 'bg-surface-container-high'}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  className="w-full bg-gradient-to-br from-secondary to-[#005236] text-white font-headline font-bold py-4 rounded-xl shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-on-surface-variant">
                Already have an account?
                <Link className="text-primary font-bold hover:text-secondary transition-colors ml-1" to="/login">
                  Log In
                </Link>
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-outline-variant/10 flex items-center justify-between text-[10px] text-on-surface-variant/60 uppercase tracking-[0.2em] font-medium">
              <span>Secure Access</span>
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">lock</span> AES-256
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">security</span> SSL
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 w-full py-6 px-8 flex justify-between items-center z-10 pointer-events-none">
        <p className="text-[10px] text-on-surface-variant/40 font-medium tracking-widest uppercase">
          Vault Editorial Fintech © 2024
        </p>
        <div className="flex gap-6 pointer-events-auto">
          {['Privacy', 'Terms'].map((label) => (
            <Link key={label} className="text-[10px] text-on-surface-variant/40 hover:text-primary transition-colors font-medium tracking-widest uppercase" to="#">
              {label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
