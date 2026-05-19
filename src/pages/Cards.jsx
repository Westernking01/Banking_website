import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCards, createCard, freezeCard } from '../api/cardService';
import { getTransactions } from '../api/transactionService';

export default function Cards() {
  const { user } = useAuth();
  const [activeCard, setActiveCard] = useState(null);
  const [onlinePayments, setOnlinePayments] = useState(true);
  const [international, setInternational] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCards();
        if (data.success && data.data.length > 0) {
          setActiveCard(data.data[0]);
        } else {
          // Auto create a card for the user if they have none
          const newCard = await createCard();
          if (newCard.success) {
            setActiveCard(newCard.data);
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
    if (!activeCard) return;
    try {
      const response = await freezeCard(activeCard._id);
      if (response.success) {
        setActiveCard(response.data);
      }
    } catch (err) {
      console.error('Failed to toggle freeze status:', err);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-on-surface-variant">Loading your cards...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="font-headline text-4xl font-extrabold text-primary tracking-tight">Card Management</h1>
        <p className="text-on-surface-variant mt-2">Control your virtual assets and spending limits in real-time.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Virtual Card Visual & Primary Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* High Fidelity Virtual Card */}
          <div className="relative w-full aspect-[1.586/1] rounded-[24px] overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1e3a8a] to-[#00164e]" />
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_nrGgNiHC2lpu5iCdQW8IYMSzvjEo-0FWW3F0c-13thS96wViqVO0o93IS0ZBXP9BboLrUs_u5Cnqwiv3tHyyoqlaSPVX_TYuLOCuo8rFvylQJnJtZtO_4a4UCJdLVoaCN1kA2oJxOrLysZABxvS8smzNkX_lN-PHc753F1Zs8pDw3N8tCyKG33YmNV84vNrAr1aq4WgPeHjV288e90ejY8wXMrJESRmZOkn4fgCUDz1Yp7OmCO3Xfin-kQdjVUeiitK05F3BSg')", backgroundSize: 'cover' }}
            />
            <div className="relative h-full p-8 flex flex-col justify-between text-white">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">Premium Virtual</span>
                  <span className="font-headline text-xl font-bold italic tracking-tighter">VAULT</span>
                </div>
                <span className="material-symbols-outlined text-4xl">contactless</span>
              </div>
              <div className="space-y-1">
                <div className="flex gap-4 items-center">
                  {activeCard?.cardNumber ? activeCard.cardNumber.split(' ').map((g, i) => (
                    <span key={i} className="text-2xl font-headline tracking-[0.15em] font-medium">{g}</span>
                  )) : ['••••', '••••', '••••', '••••'].map((g, i) => (
                    <span key={i} className="text-2xl font-headline tracking-[0.15em] font-medium">{g}</span>
                  ))}
                </div>
                <div className="flex gap-8 pt-4">
                  <div>
                    <p className="text-[8px] uppercase tracking-widest opacity-60">Expiry Date</p>
                    <p className="text-sm font-medium tracking-widest">{activeCard?.expiryMonth || '12'} / {activeCard?.expiryYear || '28'}</p>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-widest opacity-60">CVV</p>
                    <p className="text-sm font-medium tracking-widest">•••</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-lg font-headline font-semibold tracking-wide">{user?.name?.toUpperCase() || 'VAULT MEMBER'}</p>
                <div className="w-12 h-8 rounded-md bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-[#eb001b] -mr-2 opacity-90" />
                  <div className="w-6 h-6 rounded-full bg-[#f79e1b] opacity-90" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-5 rounded-2xl">
              <p className="text-xs text-on-surface-variant font-medium">Active Since</p>
              <p className="text-xl font-headline font-bold text-primary mt-1">{activeCard ? new Date(activeCard.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'N/A'}</p>
            </div>
            <div className="bg-surface-container-low p-5 rounded-2xl">
              <p className="text-xs text-on-surface-variant font-medium">Card Status</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-2 h-2 rounded-full ${activeCard?.isFrozen ? 'bg-error' : 'bg-secondary'}`} />
                <p className={`text-xl font-headline font-bold ${activeCard?.isFrozen ? 'text-error' : 'text-secondary'}`}>
                  {activeCard?.isFrozen ? 'Frozen' : 'Active'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls & Limits */}
        <div className="lg:col-span-7 space-y-8">
          {/* Security Controls */}
          <section className="bg-white p-8 rounded-3xl shadow-sm">
            <h3 className="font-headline text-lg font-bold text-primary mb-6">Security Controls</h3>
            <div className="space-y-6">
              {/* Freeze Card Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ffdad6]/30 flex items-center justify-center text-[#ba1a1a]">
                    <span className="material-symbols-outlined">ac_unit</span>
                  </div>
                  <div>
                    <p className="font-bold text-primary">Freeze Card</p>
                    <p className="text-xs text-on-surface-variant">Instantly block all new transactions</p>
                  </div>
                </div>
                <button
                  onClick={handleToggleFreeze}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${activeCard?.isFrozen ? 'bg-secondary' : 'bg-[#c5c5d3]'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${activeCard?.isFrozen ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
              {/* Online Payments Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary">
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#dce1ff]/30 flex items-center justify-center text-primary">
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
          <section className="bg-white p-8 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline text-lg font-bold text-primary">Monthly Spending Limit</h3>
              <span className="text-primary font-headline font-extrabold text-2xl">$12,500</span>
            </div>
            <div className="space-y-8">
              <div className="relative h-2 w-full bg-surface-container rounded-full">
                <div className="absolute left-0 top-0 h-full bg-primary rounded-full w-[65%]" />
                <div className="absolute left-[65%] top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-primary rounded-full shadow-lg cursor-pointer" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-[#757682] tracking-wider">Current Spending</label>
                  <div className="bg-surface-container p-4 rounded-xl">
                    <span className="font-headline font-bold text-primary">$8,240.50</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-[#757682] tracking-wider">Remaining</label>
                  <div className="bg-surface-container-high p-4 rounded-xl">
                    <span className="font-headline font-bold text-secondary">$4,259.50</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold py-4 rounded-xl shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.99]">
                Update Card Limits
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Recent Card Activity */}
      <section className="mt-12">
        <div className="flex justify-between items-end mb-6 px-2">
          <div>
            <h3 className="font-headline text-2xl font-bold text-primary">Recent Card Activity</h3>
            <p className="text-on-surface-variant text-sm">Latest transactions specifically for this virtual card.</p>
          </div>
          <button className="text-secondary font-bold text-sm hover:underline underline-offset-4">View All</button>
        </div>
        <div className="bg-surface-container-low rounded-3xl overflow-hidden p-2">
          <div className="space-y-1">
            {recentActivity.length > 0 ? recentActivity.map((tx, i) => (
              <div key={tx._id} className={`flex items-center justify-between p-4 rounded-2xl hover:bg-white transition-colors group ${i === 0 ? 'bg-white' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
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
