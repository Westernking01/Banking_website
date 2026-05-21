import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile } from '../api/userService';

const tabs = [
  { id: 'personal', label: 'Personal Info', icon: 'person' },
  { id: 'security', label: 'Security', icon: 'security' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications' },
  { id: 'billing', label: 'Billing', icon: 'payments' },
];

export default function Settings() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [twoFA, setTwoFA] = useState(true);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    country: 'United States',
    address: '721 Editorial Plaza, Suite 400, New York, NY 10012',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    sms: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await updateUserProfile({ name: formData.name, email: formData.email, phone: formData.phone });
      if (res.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully.' });
        updateUser({ ...user, name: formData.name, email: formData.email, phone: formData.phone });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">

      {/* Header */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary font-headline tracking-tight mb-2">Account Settings</h1>
        <p className="text-on-surface-variant max-w-xl text-sm md:text-base">
          Manage your personal information, security preferences, and global notification settings for your Vault account.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">

        {/* ── Tab Nav ── */}
        <div className="col-span-12 md:col-span-3">
          {/* Mobile: horizontal scrollable tabs */}
          {/* Desktop: vertical sticky tabs */}
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 md:sticky md:top-28 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left whitespace-nowrap min-w-max md:min-w-0 md:w-full ${
                  activeTab === tab.id
                    ? 'text-primary font-bold bg-surface-container-low shadow-sm'
                    : 'text-on-surface-variant hover:bg-white'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${activeTab === tab.id ? 'text-primary' : 'text-slate-400'}`}>
                  {tab.icon}
                </span>
                <span className="text-sm">{tab.label}</span>
                {/* Active indicator arrow — desktop only */}
                {activeTab === tab.id && (
                  <span className="material-symbols-outlined text-primary ml-auto hidden md:block text-[18px]">chevron_right</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab Content ── */}
        <div className="col-span-12 md:col-span-9">

          {/* ── PERSONAL INFO TAB ── */}
          {activeTab === 'personal' && (
            <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border-l-4 border-secondary">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold font-headline text-primary">Personal Information</h2>
                  <p className="text-xs text-on-surface-variant mt-1">Update your name, email, and contact details.</p>
                </div>
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="bg-primary text-white w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity uppercase tracking-wider disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              {message.text && (
                <div className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-secondary-container text-on-secondary-container' : 'bg-error-container text-on-error-container'}`}>
                  <span className="material-symbols-outlined text-base">{message.type === 'success' ? 'check_circle' : 'error'}</span>
                  {message.text}
                </div>
              )}

              <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSaveProfile}>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant ml-1 uppercase">Full Name</label>
                  <input
                    name="name"
                    className="bg-surface-container-highest border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#b6c4ff] transition-all outline-none"
                    type="text"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant ml-1 uppercase">Email Address</label>
                  <input
                    name="email"
                    className="bg-surface-container-highest border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#b6c4ff] transition-all outline-none"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant ml-1 uppercase">Phone Number</label>
                  <input
                    name="phone"
                    className="bg-surface-container-highest border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#b6c4ff] transition-all outline-none"
                    type="tel"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant ml-1 uppercase">Country</label>
                  <select
                    name="country"
                    className="bg-surface-container-highest border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#b6c4ff] transition-all outline-none"
                    value={formData.country}
                    onChange={handleFormChange}
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>Nigeria</option>
                    <option>Canada</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant ml-1 uppercase">Home Address</label>
                  <textarea
                    name="address"
                    className="bg-surface-container-highest border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#b6c4ff] transition-all outline-none resize-none"
                    rows={3}
                    value={formData.address}
                    onChange={handleFormChange}
                  />
                </div>
              </form>
            </div>
          )}

          {/* ── SECURITY TAB ── */}
          {activeTab === 'security' && (
            <div className="bg-surface-container-low p-5 md:p-8 rounded-2xl">
              <div className="mb-6">
                <h2 className="text-xl font-bold font-headline text-primary">Security & Protection</h2>
                <p className="text-xs text-on-surface-variant mt-1">Manage your authentication and password settings.</p>
              </div>
              <div className="space-y-4">

                {/* 2FA Toggle */}
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary-container rounded-full text-on-secondary-container shrink-0">
                      <span className="material-symbols-outlined">verified_user</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Two-Factor Authentication</p>
                      <p className="text-xs text-on-surface-variant">Add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer ml-4 shrink-0" onClick={() => setTwoFA(!twoFA)}>
                    <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${twoFA ? 'bg-secondary' : 'bg-surface-container-highest'}`}>
                      <span className={`absolute top-[2px] w-5 h-5 bg-white border border-gray-300 rounded-full transition-all duration-300 ${twoFA ? 'left-[22px]' : 'left-[2px]'}`} />
                    </div>
                  </div>
                </div>

                {/* Password Change */}
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#dce1ff] rounded-full text-primary shrink-0">
                      <span className="material-symbols-outlined">lock_reset</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Account Password</p>
                      <p className="text-xs text-on-surface-variant">Last updated 3 months ago.</p>
                    </div>
                  </div>
                  <button className="text-primary text-xs font-bold hover:underline decoration-secondary underline-offset-4 shrink-0 ml-4">
                    Change
                  </button>
                </div>

                {/* Active Sessions */}
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-50 rounded-full text-red-500 shrink-0">
                      <span className="material-symbols-outlined">devices</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Active Sessions</p>
                      <p className="text-xs text-on-surface-variant">2 devices currently logged in.</p>
                    </div>
                  </div>
                  <button className="text-red-500 text-xs font-bold hover:underline underline-offset-4 shrink-0 ml-4">
                    Sign Out All
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── NOTIFICATIONS TAB ── */}
          {activeTab === 'notifications' && (
            <div className="bg-surface-container p-5 md:p-8 rounded-2xl">
              <div className="mb-6">
                <h2 className="text-xl font-bold font-headline text-primary">Notification Preferences</h2>
                <p className="text-xs text-on-surface-variant mt-1">Choose how and when you want to be notified.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'email', label: 'Email Alerts', sub: 'Weekly summary and reports', icon: 'mail' },
                  { key: 'push', label: 'Push Notifications', sub: 'Real-time transaction alerts', icon: 'notifications_active' },
                  { key: 'marketing', label: 'Marketing Emails', sub: 'New feature updates and news', icon: 'campaign' },
                  { key: 'sms', label: 'SMS Security Alerts', sub: 'Critical account changes', icon: 'sms' },
                ].map(({ key, label, sub, icon }) => (
                  <label
                    key={key}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl cursor-pointer hover:shadow-sm transition-all"
                  >
                    <div className="p-2 bg-surface-container-low rounded-lg shrink-0">
                      <span className="material-symbols-outlined text-primary text-[20px]">{icon}</span>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-sm font-bold">{label}</span>
                      <span className="text-[10px] text-on-surface-variant">{sub}</span>
                    </div>
                    <input
                      className="w-5 h-5 rounded border-none bg-surface-container-highest text-secondary focus:ring-secondary accent-secondary shrink-0"
                      type="checkbox"
                      checked={notifications[key]}
                      onChange={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* ── BILLING TAB ── */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              {/* Current Plan */}
              <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border-l-4 border-secondary">
                <h2 className="text-xl font-bold font-headline text-primary mb-6">Billing & Subscription</h2>
                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-6">
                  <img
                    alt="Vault Premium"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-wEnBQAu7PDY0ZMJq0VnsnzdWaOxWGilTorLF-6awrnhZAH7XU4DKHt3G8nIboHJZR4RR_QlNm1nq0YHMiajr5Lq3_EksdgT3YfMPeSo6cafDFQG3s2b61VFofq4xJQOkXgChBGHZqXgZIO24wh1gm4D1XFcKHV0mR3fXmhzAD3T2wSJ0ej9jBT_x5U1iVNRb8GHHou0Ha2K-Rrsu8StZTQTbNOqTiS8Tq2LQdFRabe5S32mHz8c_w-xEss2V1oGk7zGVNwH_yQ"
                  />
                  <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm flex flex-col justify-center px-6 md:px-10">
                    <h3 className="text-white text-2xl font-black font-headline mb-1">Vault Premium</h3>
                    <p className="text-white/80 text-sm max-w-sm mb-4">
                      Unlimited transaction history and priority editorial insights.
                    </p>
                    <button className="bg-secondary text-white w-fit px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-secondary/20">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Billing Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-surface-container-low rounded-xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Plan</p>
                    <p className="text-sm font-bold text-primary">Premium</p>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Next Billing</p>
                    <p className="text-sm font-bold text-primary">Jun 1, 2026</p>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Amount</p>
                    <p className="text-sm font-bold text-primary">$19.99 / mo</p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-surface-container-low p-5 md:p-8 rounded-2xl">
                <h3 className="text-base font-bold font-headline text-primary mb-4">Payment Method</h3>
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-100 rounded-xl shrink-0">
                      <span className="material-symbols-outlined text-slate-600">credit_card</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Visa ending in 8842</p>
                      <p className="text-xs text-on-surface-variant">Expires 09/27</p>
                    </div>
                  </div>
                  <button className="text-primary text-xs font-bold hover:underline underline-offset-4 shrink-0 ml-4">
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
