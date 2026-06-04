import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCards, createCard, freezeCard, updateSpendingLimit } from '../api/cardService';
import { getTransactions } from '../api/transactionService';
import Interactive3DCard from '../components/Interactive3DCard';

// ── Inline Toast component ──────────────────────────────────────────────────
function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [onDismiss]);

  const colours = type === 'success'
    ? 'bg-secondary text-white'
    : 'bg-error text-white';

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl ${colours} animate-slide-up`}>
      <span className="material-symbols-outlined text-xl">
        {type === 'success' ? 'check_circle' : 'error'}
      </span>
      <span className="font-bold text-sm">{message}</span>
      <button onClick={onDismiss} className="ml-2 opacity-70 hover:opacity-100">
        <span className="material-symbols-outlined text-base">close</span>
      </button>
    </div>
  );
}

export default function Cards() {
  const { user } = useAuth();
  const [activeCard, setActiveCard] = useState(null);
  const [onlinePayments, setOnlinePayments] = useState(true);
  const [international, setInternational] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [spendingLimit, setSpendingLimit] = useState(12500);
  const [isUpdatingLimit, setIsUpdatingLimit] = useState(false);
  const [isFreezingCard, setIsFreezingCard] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCards();
        if (data.success && data.data.length > 0) {
          setActiveCard(data.data[0]);
          setSpendingLimit(data.data[0].spendingLimit || 12500);
        } else {
          // Auto create a card for the user if they have none
          const newCard = await createCard();
          if (newCard.success) {
            setActiveCard(newCard.data);
            setSpendingLimit(newCard.data.spendingLimit || 12500);
          }
        }
      } catch (err) {
        console.error('Failed to fetch/create cards:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchActivity = async () => {
      try {
        const txData = await getTransactions({ limit: 3 });
        if (txData.success) {
          setRecentActivity(txData.data);
        }
      } catch (err) {
        console.error('Failed to fetch activity:', err);
      }
    };

    fetchCards();
    fetchActivity();
  }, []);

  const handleToggleFreeze = async () => {
    if (!activeCard || isFreezingCard) return;
    setIsFreezingCard(true);
    try {
      const response = await freezeCard(activeCard._id);
      if (response.success) {
        setActiveCard(response.data);
        const newStatus = response.data.isFrozen;
        setToast({ 
          message: newStatus ? 'Card frozen successfully. All transactions blocked.' : 'Card unfrozen. Transactions enabled.', 
          type: 'success' 
        });
      }
    } catch (err) {
      console.error('Failed to toggle freeze status:', err);
      setToast({ message: 'Failed to update card status', type: 'error' });
    } finally {
      setIsFreezingCard(false);
    }
  };

  const handleUpdateSpendingLimit = async () => {
    if (!activeCard) return;
    setIsUpdatingLimit(true);
    try {
      const response = await updateSpendingLimit(activeCard._id, spendingLimit);
      if (response.success) {
        setActiveCard(response.data);
        setToast({ message: 'Spending limit updated successfully!', type: 'success' });
      }
    } catch (err) {
      console.error('Failed to update spending limit:', err);
      setToast({ message: 'Failed to update spending limit', type: 'error' });
    } finally {
      setIsUpdatingLimit(false);
    }
  };

  const currentSpending = activeCard?.currentSpending || 8240.50;
  const remaining = Math.max(0, spendingLimit - currentSpending);
  const spendingPercentage = Math.min(100, (currentSpending / spendingLimit) * 100);

  if (isLoading) {
    return <div className="p-8 text-center text-on-surface-variant">Loading your cards...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
      <header className="mb-10 animate-fade-in">
        <h1 className="font-headline text-4xl font-extrabold text-primary tracking-tight gradient-text">Card Management</h1>
        <p className="text-on-surface-variant mt-2">Control your virtual assets and spending limits in real-time.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Virtual Card Visual & Primary Info */}
        <div className="lg:col-span-5 space-y-6 animate-slide-up">
          {/* High Fidelity 3D Interactive Virtual Card */}
          <Interactive3DCard card={activeCard} user={user} />

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-5 rounded-2xl hover-lift">
              <p className="text-xs text-on-surface-variant font-medium">Active Since</p>
              <p className="text-xl font-headline font-bold text-primary mt-1 number-transition">{activeCard ? new Date(activeCard.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'N/A'}</p>
            </div>
            <div className="glass-card p-5 rounded-2xl hover-lift">
              <p className="text-xs text-on-surface-variant font-medium">Card Status</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-2 h-2 rounded-full status-pulse ${activeCard?.isFrozen ? 'bg-error' : 'bg-secondary'}`} />
                <p className={`text-xl font-headline font-bold number-transition ${activeCard?.isFrozen ? 'text-error' : 'text-secondary'}`}>
                  {activeCard?.isFrozen ? 'Frozen' : 'Active'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls & Limits */}
        <div className="lg:col-span-7 space-y-8">
          {/* Security Controls */}
          <section className="glass-card p-8 rounded-3xl animate-slide-in-right stagger-1 hover-lift">
            <h3 className="font-headline text-lg font-bold text-primary mb-6">Security Controls</h3>
            <div className="space-y-6">
              {/* Freeze Card Toggle */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${activeCard?.isFrozen ? 'bg-error/20 text-error' : 'bg-[#ffdad6]/30 text-[#ba1a1a]'}`}>
                    <span className="material-symbols-outlined">{activeCard?.isFrozen ? 'severe_cold' : 'ac_unit'}</span>
                  </div>
                  <div>
                    <p className="font-bold text-primary">Freeze Card</p>
                    <p className="text-xs text-on-surface-variant">
                      {activeCard?.isFrozen ? 'Card is currently frozen' : 'Instantly block all new transactions'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleToggleFreeze}
                  disabled={isFreezingCard}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 disabled:opacity-50 ${activeCard?.isFrozen ? 'bg-error' : 'bg-[#c5c5d3]'}`}
                >
                  {isFreezingCard ? (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </span>
                  ) : (
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${activeCard?.isFrozen ? 'right-1' : 'left-1'}`} />
                  )}
                </button>
              </div>
              {/* Online Payments Toggle */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary transition-all duration-300 group-hover:scale-110">
                    <span className="material-symbols-outlined">language</span>
                  </div>
                  <div>
                    <p className="font-bold text-primary">Online Payments</p>
                    <p className="text-xs text-on-surface-variant">Allow web and mobile app purchases</p>
                  </div>
                </div>
                <button
                  onClick={() => setOnlinePayments(!onlinePayments)}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${onlinePayments ? 'bg-secondary' : 'bg-[#c5c5d3]'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${onlinePayments ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
              {/* International Use Toggle */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#dce1ff]/30 flex items-center justify-center text-primary transition-all duration-300 group-hover:scale-110">
                    <span className="material-symbols-outlined">public</span>
                  </div>
                  <div>
                    <p className="font-bold text-primary">International Use</p>
                    <p className="text-xs text-on-surface-variant">Enable transactions outside your home country</p>
                  </div>
                </div>
                <button
                  onClick={() => setInternational(!international)}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${international ? 'bg-secondary' : 'bg-[#c5c5d3]'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${international ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </section>

          {/* Spending Limits */}
          <section className="glass-card p-8 rounded-3xl animate-slide-in-right stagger-2 hover-lift">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline text-lg font-bold text-primary">Monthly Spending Limit</h3>
              <span className="text-primary font-headline font-extrabold text-2xl number-transition">${spendingLimit.toLocaleString()}</span>
            </div>
            <div className="space-y-8">
              <div className="relative">
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={spendingLimit}
                  onChange={(e) => setSpendingLimit(Number(e.target.value))}
                  className="w-full h-2 bg-surface-container rounded-full appearance-none cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-on-surface-variant mt-2">
                  <span>$1,000</span>
                  <span>$50,000</span>
                </div>
              </div>
              <div className="relative h-3 w-full bg-surface-container rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 animate-progress" 
                  style={{ width: `${spendingPercentage}%` }}
                />
                <div className="absolute inset-0 animate-shimmer opacity-30 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-[#757682] tracking-wider">Current Spending</label>
                  <div className="bg-surface-container p-4 rounded-xl hover-scale">
                    <span className="font-headline font-bold text-primary number-transition">${currentSpending.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-[#757682] tracking-wider">Remaining</label>
                  <div className="bg-surface-container-high p-4 rounded-xl hover-scale">
                    <span className={`font-headline font-bold number-transition ${remaining > 0 ? 'text-secondary' : 'text-error'}`}>
                      ${remaining.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleUpdateSpendingLimit}
                disabled={isUpdatingLimit || spendingLimit === activeCard?.spendingLimit}
                className="w-full bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold py-4 rounded-xl shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed btn-shine animate-gradient"
              >
                {isUpdatingLimit ? 'Updating...' : 'Update Card Limits'}
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Recent Card Activity */}
      <section className="mt-12 animate-slide-up stagger-3">
        <div className="flex justify-between items-end mb-6 px-2">
          <div>
            <h3 className="font-headline text-2xl font-bold text-primary">Recent Card Activity</h3>
            <p className="text-on-surface-variant text-sm">Latest transactions specifically for this virtual card.</p>
          </div>
          <button className="text-secondary font-bold text-sm hover:underline underline-offset-4 transition-all hover:text-secondary/80">View All</button>
        </div>
        <div className="glass-card rounded-3xl overflow-hidden p-2">
          <div className="space-y-1">
            {recentActivity.length > 0 ? recentActivity.map((tx, i) => (
              <div key={tx._id} className={`flex items-center justify-between p-4 rounded-2xl hover:bg-white/80 transition-all duration-200 group cursor-pointer hover-scale ${i === 0 ? 'bg-white/60' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-110">
                    <span className={`material-symbols-outlined text-2xl ${tx.type === 'credit' ? 'text-secondary' : 'text-primary'}`}>
                      {tx.type === 'credit' ? 'account_balance_wallet' : 'payment'}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-primary">{tx.description || tx.counterparty || 'Transaction'}</p>
                    <p className="text-xs text-on-surface-variant uppercase">{tx.category || 'Other'} • {new Date(tx.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-headline font-bold ${tx.type === 'credit' ? 'text-secondary' : 'text-primary'}`}>
                    {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </p>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-[10px] font-bold text-on-secondary-fixed-variant uppercase">Completed</span>
                </div>
              </div>
            )) : (
              <div className="p-8 text-center text-on-surface-variant text-sm">
                No recent activity for this card.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
