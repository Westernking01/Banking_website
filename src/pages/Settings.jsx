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
    <div className="p-2 max-w-6xl mx-auto w-full">
      {/* Editorial Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-primary font-headline tracking-tight mb-2">Account Settings</h1>
        <p className="text-on-surface-variant max-w-xl">
          Manage your personal information, security preferences, and global notification settings for your Vault account.
        </p>
      </div>

      {/* Bento Grid Settings Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Nav Tabs */}
        <div className="col-span-12 md:col-span-3">
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 md:sticky md:top-28 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left whitespace-nowrap min-w-max md:min-w-0 ${
                  activeTab === tab.id
                    ? 'text-primary font-bold bg-surface-container-low'
                    : 'text-on-surface-variant hover:bg-white'
                }`}
              >
                <span className="material-symbols-outlined">{tab.icon}</span>
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Forms Section */}
        <div className="col-span-12 md:col-span-9 space-y-8">
          {/* Personal Info Section */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-l-4 border-secondary">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-bold font-headline text-primary">Personal Information</h2>
              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="bg-primary text-white w-full sm:w-auto px-6 py-3 sm:py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity uppercase tracking-wider disabled:opacity-50"
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
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSaveProfile}>
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
              <div className="col-span-2 flex flex-col gap-2">
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

          {/* Security Section */}
          <div className="bg-surface-container-low p-8 rounded-2xl">
            <h2 className="text-xl font-bold font-headline text-primary mb-6">Security &amp; Protection</h2>
            <div className="space-y-6">
              {/* 2FA Toggle */}
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary-container rounded-full text-on-secondary-container">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Two-Factor Authentication</p>
                    <p className="text-xs text-on-surface-variant">Add an extra layer of security to your account.</p>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer" onClick={() => setTwoFA(!twoFA)}>
                  <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${twoFA ? 'bg-secondary' : 'bg-surface-container-highest'}`}>
                    <span className={`absolute top-[2px] w-5 h-5 bg-white border border-gray-300 rounded-full transition-all duration-300 ${twoFA ? 'left-[22px]' : 'left-[2px]'}`} />
                  </div>
                </div>
              </div>
              {/* Password Change */}
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#dce1ff] rounded-full text-primary">
                    <span className="material-symbols-outlined">lock_reset</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Account Password</p>
                    <p className="text-xs text-on-surface-variant">Last updated 3 months ago.</p>
                  </div>
                </div>
                <button className="text-primary text-xs font-bold hover:underline decoration-secondary underline-offset-4">
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-surface-container p-8 rounded-2xl">
            <h2 className="text-xl font-bold font-headline text-primary mb-6">Notification Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'email', label: 'Email Alerts', sub: 'Weekly summary and reports' },
                { key: 'push', label: 'Push Notifications', sub: 'Real-time transaction alerts' },
                { key: 'marketing', label: 'Marketing Emails', sub: 'New feature updates and news' },
                { key: 'sms', label: 'SMS Security Alerts', sub: 'Critical account changes' },
              ].map(({ key, label, sub }) => (
                <label key={key} className="flex items-center gap-4 p-4 bg-white/40 rounded-xl cursor-pointer hover:bg-white/60 transition-colors">
                  <input
                    className="w-5 h-5 rounded border-none bg-surface-container-highest text-secondary focus:ring-secondary accent-secondary"
                    type="checkbox"
                    checked={notifications[key]}
                    onChange={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{label}</span>
                    <span className="text-[10px] text-on-surface-variant">{sub}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Decorative Branding Banner */}
          <div className="relative h-48 w-full rounded-2xl overflow-hidden group">
            <img
              alt="Vault Premium"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-wEnBQAu7PDY0ZMJq0VnsnzdWaOxWGilTorLF-6awrnhZAH7XU4DKHt3G8nIboHJZR4RR_QlNm1nq0YHMiajr5Lq3_EksdgT3YfMPeSo6cafDFQG3s2b61VFofq4xJQOkXgChBGHZqXgZIO24wh1gm4D1XFcKHV0mR3fXmhzAD3T2wSJ0ej9jBT_x5U1iVNRb8GHHou0Ha2K-Rrsu8StZTQTbNOqTiS8Tq2LQdFRabe5S32mHz8c_w-xEss2V1oGk7zGVNwH_yQ"
            />
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm flex flex-col justify-center px-10">
              <h3 className="text-white text-2xl font-black font-headline mb-2">Vault Premium</h3>
              <p className="text-white/80 text-sm max-w-sm mb-4">
                Your current membership grants you unlimited transaction history and priority editorial insights.
              </p>
              <button className="bg-secondary text-white w-fit px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-secondary/20">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
