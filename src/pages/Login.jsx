import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Login failed. Please check your credentials.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl shadow-primary/5 bg-surface-container-lowest">
          {/* Left Side: Visual/Editorial Anchor */}
          <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-[#00236f] to-[#1e3a8a] relative overflow-hidden">
            {/* Decorative Abstract Texture */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAvKEZowy7XU7ujUcTnsMI9X9EvUYXoFSdBNpqQmAN1_uLtMML_Dpc98yqC-PsoJoFNrhpvg9wbBhnWB07sUV3oMKgKdYoJzZ-UwYKTE4vzuMlMMrRurIh_ciKrhFjTnoAguPnmja_iRiNISlnSdpTP_gQ7Ssw2nXnjUMw4ORAHb2mB-cdWFgVsDn_IqRwP77W61XrxGJIdNjGQi0poeGw1ROJSeAdKjRLZWTH99nmgga4a-NlJ27CPLd4dIcJSWkBSQ1STHEPVA')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-white">
                <span className="material-symbols-outlined text-3xl">shield</span>
                <span className="font-headline font-black text-2xl tracking-tight">Vault</span>
              </div>
            </div>
            <div className="relative z-10 space-y-6">
              <h1 className="font-headline text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Secure your <br />
                <span className="text-secondary-fixed">financial future</span>.
              </h1>
              <p className="text-primary-fixed text-lg max-w-sm font-medium leading-relaxed">
                Join over 2 million premium members managing their wealth through the architectural vault of fintech.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAJByx29f3Ns1IHD9j-vAfAw-o0-wFcAbLOAMf0UmGZfq_WtQFy4OuyP-Tq-dLvASm3H1lHcuCBLqRCB8Bs5SdOlFGYjHQXCb2liOERY2V1yafGGPNtO1HEB--qUfxWNJ6sKeV2ZgNQLlCPjrfl1SKLVGtB3RR7O_RbJhs7cQtPKXhgQ5zFG7eFPML6ZSjOD805uG2-CxdxPn_wI3IAXXM79SKfFt3znPuEY8tQ5oVyOzHTs6koSwGTd9f-uuL8pLlQV-KasM43cg',
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBZYUA3VqOKXs_ApumxZkZhC5oX2aOjnCCDBcQ_tIOPy3q0fkn26R-QdEAznFKu7aH9_fUhKqo9-MfPTufBmkm4V80QKeZSWjeSvlC9cZ4sJXXUn9SBkiRsQ2gA40mqKBrHezt5w3iutgmeMZWlp2-smbc4d9aZWwdri-TJoqTeBtlZP7n61y77DV8KE8cFZXd_tr41Un-q1_sGBoi567HlgE8eVig2_1HXw0FA3PuRDjwA0QOA6mvcspuJEZGikqt_q5BFpHhYpA',
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDqr0ynwufAY9H2MoQtZHNTTmp-996jjaS3liFbOZigM8k58sLM2Sdv_RlVC3AXNTmJhYHHjsUKKDPFe6uGfrcv6BzqmWG_AYY1p0v_Hi4UYJ90Lo4_Pjdr6l7tDImPjcbpcdFLGkyseHbKtaaK0L008D3SE3rfaoKEHzkFmlN4DoxfH69bO3LVDT5TuhNWnoHC4vT6G8zMK0gfeOIpNw4SFalCrZlQ7j4bC-jF37GfPC9xYksHUn8oV61aocpeBnXGh6QsdPx_dw',
                ].map((src, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-primary bg-surface-container bg-cover bg-center"
                    style={{ backgroundImage: `url('${src}')` }}
                  />
                ))}
              </div>
              <span className="text-primary-fixed text-sm font-semibold tracking-wide">Trusted by world-class leaders</span>
            </div>
          </div>

          {/* Right Side: Authentication Form */}
          <div className="flex flex-col justify-center p-8 md:p-16 bg-surface-container-lowest">
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center gap-2 mb-12">
              <span className="material-symbols-outlined text-primary text-3xl">shield</span>
              <span className="font-headline font-black text-2xl text-primary tracking-tight">Vault</span>
            </div>

            <div className="mb-10">
              <h2 className="font-headline text-3xl font-bold text-on-surface mb-2">Welcome Back</h2>
              <p className="text-on-surface-variant font-medium">Please enter your details to access your vault.</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 flex items-center gap-3 bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm font-medium">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin} noValidate>
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface-variant ml-1 uppercase tracking-wider" htmlFor="email">
                  Email Address
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                    mail
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-on-surface placeholder:text-outline-variant outline-none"
                    id="email"
                    name="email"
                    placeholder="alex@vault.com"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider" htmlFor="password">
                    Password
                  </label>
                  <Link className="text-xs font-bold text-primary hover:text-secondary transition-colors" to="/forgot-password">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                    lock
                  </span>
                  <input
                    className="w-full pl-12 pr-12 py-4 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-on-surface placeholder:text-outline-variant outline-none"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      className="peer appearance-none w-5 h-5 rounded border-2 border-outline-variant checked:bg-secondary checked:border-secondary focus:ring-0 transition-all cursor-pointer"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="material-symbols-outlined absolute text-white text-base opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      check
                    </span>
                  </div>
                  <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">
                    Keep me signed in for 30 days
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                className="w-full py-4 bg-gradient-to-br from-[#00236f] to-[#1e3a8a] text-white rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                    Signing In...
                  </>
                ) : (
                  <>
                    <span>Log In</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-10 pt-10 border-t border-surface-container text-center">
              <p className="text-on-surface-variant font-medium">
                Don't have an account?
                <Link className="text-primary font-bold hover:text-secondary transition-colors ml-1" to="/signup">
                  Create an account
                </Link>
              </p>
            </div>

            {/* Biometric options */}
            <div className="mt-8 flex justify-center gap-6 text-outline-variant">
              <span className="material-symbols-outlined text-2xl hover:text-on-surface transition-colors cursor-pointer" title="Fingerprint">
                fingerprint
              </span>
              <span className="material-symbols-outlined text-2xl hover:text-on-surface transition-colors cursor-pointer" title="Face ID">
                face
              </span>
              <span className="material-symbols-outlined text-2xl hover:text-on-surface transition-colors cursor-pointer" title="QR Login">
                qr_code_scanner
              </span>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 border-t border-slate-200 bg-[#f7f9fb] mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
          <div className="col-span-1 md:col-span-1">
            <span className="text-lg font-black text-[#00236f]">Vault</span>
            <p className="mt-4 text-xs text-slate-500">© 2024 Vault Editorial Fintech. All rights reserved.</p>
          </div>
          <div className="md:col-span-3 flex flex-wrap gap-8 justify-end items-center">
            {['Privacy Policy', 'Terms of Service', 'Security', 'Sitemap'].map((label) => (
              <Link key={label} className="text-xs text-slate-500 hover:text-[#00236f] underline-offset-4 hover:underline decoration-[#006c49]" to="#">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
