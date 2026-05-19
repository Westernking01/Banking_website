import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { transferFunds } from '../api/transferService';

export default function Transfer() {
  const { user, updateUser } = useAuth();
  const balance = user?.balance || 0;

  const [formData, setFormData] = useState({ recipientIdentifier: '', amount: '', description: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [recipientPreview, setRecipientPreview] = useState('');

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === 'recipientIdentifier') {
      setRecipientPreview(e.target.value);
    }
  };

  const handleTransferClick = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!formData.recipientIdentifier || !formData.amount) {
      setError('Please fill in recipient and amount.');
      return;
    }
    if (parseFloat(formData.amount) <= 0) {
      setError('Amount must be greater than 0.');
      return;
    }
    if (parseFloat(formData.amount) > balance) {
      setError('Insufficient funds.');
      return;
    }
    setIsModalOpen(true);
  };

  const confirmTransfer = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      const response = await transferFunds(formData);
      if (response.success) {
        setSuccess(response.message);
        setIsModalOpen(false);
        updateUser({ ...user, balance: response.data.newBalance });
        setFormData({ recipientIdentifier: '', amount: '', description: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Transfer failed.');
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumbs & Header */}
      <div className="mb-10">
        <p className="text-label-md text-on-surface-variant font-medium mb-1">MOVEMENTS</p>
        <h1 className="text-4xl font-black font-headline text-primary tracking-tight">Transfer Funds</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Form Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
            {error && (
              <div className="mb-6 flex items-center gap-3 bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm font-medium">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 flex items-center gap-3 bg-secondary-container text-on-secondary-container px-4 py-3 rounded-xl text-sm font-medium">
                <span className="material-symbols-outlined text-base">check_circle</span>
                {success}
              </div>
            )}
            <form className="space-y-8" onSubmit={handleTransferClick}>
              {/* Recipient Input */}
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-3 font-label">RECIPIENT EMAIL OR ACCOUNT</label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-highest border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-surface-tint/20 transition-all font-body text-primary font-semibold"
                    type="text"
                    name="recipientIdentifier"
                    placeholder="Enter email or account number"
                    value={formData.recipientIdentifier}
                    onChange={handleInputChange}
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="material-symbols-outlined text-primary">person</span>
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-3 font-label">AMOUNT TO TRANSFER</label>
                <div className="relative flex items-center">
                  <span className="absolute left-6 text-2xl font-bold text-primary font-headline">$</span>
                  <input
                    className="w-full bg-surface-container-highest border-none rounded-2xl pl-12 pr-6 py-6 text-4xl font-bold font-headline text-primary focus:ring-2 focus:ring-surface-tint/20 transition-all placeholder:text-surface-container-highest/50"
                    placeholder="0.00"
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="flex justify-between mt-3 px-1">
                  <span className="text-xs text-on-surface-variant font-medium">Available Balance: ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <button className="text-xs text-secondary font-bold hover:underline" type="button" onClick={() => setFormData({ ...formData, amount: balance })}>Send Max</button>
                </div>
              </div>

              {/* Quick Select Recipients */}
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-4 font-label">QUICK SEND</label>
                <div className="flex gap-4">
                  <button className="flex flex-col items-center gap-2 group" type="button">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <span className="material-symbols-outlined">add</span>
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant">NEW</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 group" type="button">
                    <img alt="Michael Chen" className="w-14 h-14 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-secondary transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIuUsxZ6ePOleUIYJM_d6k_INr4wYoqsI-WKnnZclp5bO7y2HV-fFQy7f2t-hqTwFeRGAoyllhlBupx7LApsATFgqDCH9MQNZp2ke57nh9icdIoPxEBXCQAldoiNHJOYJN7Vot2ZQRQML2bMe2Kh_fe8ZT1uy622OypjA4zxQdez3x-dDrX0-mImBkhbhhvpFRern4uapgT5kz4RqwixXzMGVnohUW-FtpzLfycm1tg3icPdrQlWcOeP0ciVt-nKLs6b-Mk8AfiA" />
                    <span className="text-[10px] font-bold text-on-surface-variant">MICHAEL</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 group" type="button">
                    <img alt="Sarah Jenkins" className="w-14 h-14 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-secondary transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCONyEJ94UwaVjFB162hXFgfzoG_efWgsYhjwyi8qTx_cH5kKeStcBbXLbwc2f05iBflO23PDy3qkAgYLjuKwl28WgXHZ0fwg3ylaswTBw3mfM0XRIKTliSWuDdSXDU4p_79c_iz7UMvkw-GZk0-4-NoLrPfqpFBbtxS-C50HVHNhml7LYSpk_Q867bh6hVHuoM_M0t8HNenofvHVZV6kwrsOvtAub1T05L-iqEt6vKEnEtK59zTvO3jd6jOEeFgyhkzpMi4B998Q" />
                    <span className="text-[10px] font-bold text-on-surface-variant">SARAH</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 group" type="button">
                    <img alt="Editorial Studio" className="w-14 h-14 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-secondary transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsUEFPR0Th6FOem7ufcx5ou_aRosBai7KqRslRVBdZ0-wUS-IzsNOSQ3rXX-VIJMLQg2zNgCEPcm4ZHM5RSsxjfmMcNK3RY-Ivgw-2ucehV1wDBq-WkUWYfl4RUS-wJOZRv749xaYLajRphYqQYHVwkjlsVKgP0YTFK1Ga0yv-C_EE7ccXQTkRCnKXnGacVPX6L8rATuM4gQQV3mXQUVp4WXiF5FcuJOu8erkgv-5gVICNO2r-VeQrG9upwOoKnI_hMoyoMH6DJg" />
                    <span className="text-[10px] font-bold text-on-surface-variant">STUDIO</span>
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-3 font-label">NOTES (OPTIONAL)</label>
                <textarea
                  className="w-full bg-surface-container-highest border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-surface-tint/20 transition-all font-body text-primary"
                  placeholder="What's this for?"
                  rows="2"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              {/* CTA */}
              <button className="w-full py-5 bg-gradient-to-r from-secondary to-[#008f61] text-white rounded-2xl font-bold font-headline text-lg shadow-lg shadow-secondary/20 hover:scale-[1.01] active:scale-[0.98] transition-all" type="submit">
                Transfer Funds
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Confirmation / Info Bento */}
        <div className="lg:col-span-4 space-y-6">
          {/* Secure Badge Card */}
          <div className="bg-primary rounded-3xl p-6 text-white overflow-hidden relative">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl mb-4">verified_user</span>
              <h3 className="text-xl font-bold font-headline mb-2">Vault Secure™</h3>
              <p className="text-white/70 text-sm leading-relaxed">Your transfer is protected by 256-bit encryption and multi-factor authorization.</p>
            </div>
            {/* Abstract Texture */}
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* Transaction Summary (Preview of Confirmation) */}
          <div className="bg-surface-container-low rounded-3xl p-6">
            <h3 className="text-sm font-bold text-primary mb-6 font-label">TRANSACTION SUMMARY</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant text-sm">Fee</span>
                <span className="font-bold text-secondary">Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant text-sm">Estimated Arrival</span>
                <span className="font-bold text-primary">Instant</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant text-sm">Transfer Method</span>
                <span className="font-bold text-primary">Vault Direct</span>
              </div>
              <div className="pt-4 border-t border-outline-variant/30 mt-4">
                <div className="flex justify-between items-end">
                  <span className="text-on-surface-variant font-bold text-xs">TOTAL TO DEBIT</span>
                  <span className="text-2xl font-black font-headline text-primary">${formData.amount ? parseFloat(formData.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Help Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container">help</span>
              </div>
              <span className="font-bold text-primary">Need Help?</span>
            </div>
            <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">Issues with your transfer? Our premium support team is available 24/7 for {user?.name?.split(' ')[0] || 'you'}.</p>
            <button className="text-xs font-bold text-secondary hover:underline">Contact Concierge</button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent backdrop-blur-sm px-6">
          <div className="absolute inset-0 bg-primary/20" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden relative z-10 animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="p-8 pb-0 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black font-headline text-primary mb-1">Confirm Transfer</h2>
                <p className="text-sm text-on-surface-variant">Review your transaction details</p>
              </div>
              <button 
                className="p-2 hover:bg-surface-container rounded-full transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            {/* Modal Content */}
            <div className="p-8">
              <div className="bg-surface-container-low rounded-2xl p-6 mb-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-white">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface-variant">RECIPIENT</p>
                      <p className="font-bold text-primary">{recipientPreview}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-on-surface-variant">ACCOUNT / EMAIL</p>
                    <p className="font-bold text-primary">{recipientPreview.length > 20 ? `${recipientPreview.substring(0, 20)}...` : recipientPreview}</p>
                  </div>
                </div>
                <div className="text-center py-4 border-y border-outline-variant/20">
                  <p className="text-xs font-bold text-on-surface-variant mb-1">TRANSFER AMOUNT</p>
                  <p className="text-5xl font-black font-headline text-primary">${parseFloat(formData.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">info</span>
                  <p className="text-xs text-on-surface-variant italic">Note: "{formData.description || 'N/A'}"</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  className="flex-1 py-4 bg-surface-container rounded-xl font-bold text-primary hover:bg-surface-container-high transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="flex-[2] py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  onClick={confirmTransfer}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                  ) : (
                    <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
                  )}
                  {isSubmitting ? 'Processing...' : 'Confirm & Pay'}
                </button>
              </div>
            </div>
            {/* Security Footer */}
            <div className="bg-surface-container py-4 px-8 text-center">
              <p className="text-[10px] text-on-surface-variant font-medium tracking-wider">SECURED BY VAULT MULTI-FACTOR AUTHENTICATION</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
