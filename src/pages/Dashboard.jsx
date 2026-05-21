import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTransactions, getDashboardStats } from '../api/transactionService';
import { payBill } from '../api/transferService';

const upcomingBills = [
  { icon: 'cloud', bg: 'bg-red-50', color: 'text-red-600', name: 'Adobe Creative Cloud', due: 'Due in 2 days', amount: '$54.99' },
  { icon: 'home', bg: 'bg-blue-50', color: 'text-blue-600', name: 'Mortgage Payment', due: 'Due in 5 days', amount: '$2,450.00' },
  { icon: 'bolt', bg: 'bg-green-50', color: 'text-green-600', name: 'Utility Bill', due: 'Due in 12 days', amount: '$182.40' },
];

export default function Dashboard() {
  const { user, updateUser } = useAuth();
  const balance = user?.balance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00';
  const [recentTxs, setRecentTxs] = useState([]);
  const [bills, setBills] = useState(upcomingBills);
  const [stats, setStats] = useState({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    incomeGrowth: 0,
    spendingAnalytics: null,
  });
  const [timeframe, setTimeframe] = useState('daily');
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [isPayBillModalOpen, setIsPayBillModalOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [txData, statsData] = await Promise.all([
          getTransactions({ limit: 4 }),
          getDashboardStats(),
        ]);
        if (txData.success) setRecentTxs(txData.data);
        if (statsData.success) setStats(statsData.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchDashboardData();
  }, []);

  const getTxStyles = (tx) => {
    if (tx.type === 'credit') {
      return {
        icon: 'account_balance_wallet',
        iconColor: 'text-secondary',
        categoryBg: 'bg-secondary-container',
        categoryColor: 'text-on-secondary-container',
        amountColor: 'text-secondary',
        amountPrefix: '+',
      };
    }
    return {
      icon: 'payment',
      iconColor: 'text-primary',
      categoryBg: 'bg-surface-container',
      categoryColor: 'text-on-surface-variant',
      amountColor: 'text-error',
      amountPrefix: '-',
    };
  };

  const handlePayBill = async (bill) => {
    setIsPaying(true);
    try {
      const amount = parseFloat(bill.amount.replace(/[^0-9.-]+/g, ''));
      const res = await payBill(amount, bill.name);
      if (res.success) {
        updateUser({ ...user, balance: res.data.newBalance });
        const [txData, statsData] = await Promise.all([
          getTransactions({ limit: 4 }),
          getDashboardStats(),
        ]);
        if (txData.success) setRecentTxs(txData.data);
        if (statsData.success) setStats(statsData.data);
        setIsPayBillModalOpen(false);
        setBills((prev) => prev.filter((b) => b.name !== bill.name));
      }
    } catch (err) {
      console.error('Failed to pay bill', err);
      alert('Failed to pay bill: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsPaying(false);
    }
  };

  const activeChart = stats.spendingAnalytics ? stats.spendingAnalytics[timeframe] : null;
  const isEmptyChart = !activeChart || activeChart.every((bar) => bar.label === '$0');

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 lg:space-y-8 max-w-[1600px] mx-auto">

      {/* ── Top Row ── */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">

        {/* Balance Card */}
        <div className="col-span-12 lg:col-span-8 relative overflow-hidden rounded-3xl bg-primary shadow-2xl p-5 sm:p-8 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary rounded-full -ml-10 -mb-10 blur-3xl opacity-20" />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
              <div>
                <p className="text-blue-200 text-[10px] sm:text-sm font-medium mb-1 tracking-wide">TOTAL BALANCE</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-headline tracking-tight">${balance}</h1>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${stats.incomeGrowth >= 0 ? 'bg-secondary-fixed' : 'bg-error'}`} />
                <span className="text-xs font-bold">{stats.incomeGrowth >= 0 ? '+' : ''}{stats.incomeGrowth}% this month</span>
              </div>
            </div>
            <div className="mt-6 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-0">
              <div className="flex gap-6 sm:gap-8">
                <div>
                  <p className="text-blue-200 text-[10px] mb-1 font-bold">MONTHLY INCOME</p>
                  <p className="text-sm sm:text-lg font-bold font-headline">
                    ${stats.monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-blue-200 text-[10px] mb-1 font-bold">MONTHLY EXPENSES</p>
                  <p className="text-sm sm:text-lg font-bold font-headline">
                    ${stats.monthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-primary bg-slate-400 overflow-hidden">
                  <img alt="Contact 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNk_yI5iYN_30ofaDHg4irmoT5PgATCLGNNo0MM8e_t61lPlarC_fLZB8eOVpAb7q0upTCiQRes9DjTB-cq2glmUY7MPovb6afJkk0966mTLhETag41-EOEerrRn7LAPTYfDufmRmORakE1tAe-UvUrTW2lqnqLsjHcuq7ITNs36W8OZKXxYTZMYEeHWIMDbf1Qon-OTY5YTst3ExSQJlekcBrF3w2z7tRrPFWIJe3Y6DuJfL87kiIeI-3w0V_BzJgOgfdUfLR-Q" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-primary bg-slate-500 overflow-hidden">
                  <img alt="Contact 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhPJep0Ve60pCzGGXeaRgwgCXPmMq5agjOhgowq1a1LBwHP3eWpt8Nv0UBohRtGgLIKlCQJzu-se9ozPRPZphXsrDHpKwoXkaLR3Sa1Ua6Bnb8Tusn9Zi1gTxICTPyrwoArX0gIdB-Z8k5teEW2ZFDb71qy6iteQkurLXBMDdqVThGBoeznchWjvwRkgJDnShx_JNgQlm6ON6E4Ny97_ZjjmIgyPGsf198tO4FgLsyBNYr26qZl-u7qSKajCvgKaychBpZ6Q3Rfw" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-primary bg-slate-300 flex items-center justify-center text-[10px] font-bold text-primary">+12</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-span-12 lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-3 md:gap-4">
          <Link to="/transfer" className="group relative flex flex-col lg:flex-row items-center justify-center lg:justify-between p-4 lg:p-6 bg-secondary-container rounded-2xl hover:bg-secondary-fixed transition-colors gap-2 lg:gap-0">
            <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-secondary font-bold">send</span>
              </div>
              <span className="font-bold text-on-secondary-container font-headline text-xs lg:text-base text-center lg:text-left">Send Money</span>
            </div>
            <span className="material-symbols-outlined text-on-secondary-container hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
          </Link>
          <button onClick={() => setIsReceiveModalOpen(true)} className="group relative flex flex-col lg:flex-row items-center justify-center lg:justify-between p-4 lg:p-6 bg-white rounded-2xl border border-transparent hover:border-secondary transition-all gap-2 lg:gap-0">
            <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary font-bold">call_received</span>
              </div>
              <span className="font-bold text-primary font-headline text-xs lg:text-base text-center lg:text-left">Receive</span>
            </div>
            <span className="material-symbols-outlined text-primary hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
          </button>
          <button onClick={() => setIsPayBillModalOpen(true)} className="group relative flex flex-col lg:flex-row items-center justify-center lg:justify-between p-4 lg:p-6 bg-white rounded-2xl border border-transparent hover:border-secondary transition-all gap-2 lg:gap-0">
            <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary font-bold">payments</span>
              </div>
              <span className="font-bold text-primary font-headline text-xs lg:text-base text-center lg:text-left">Pay Bills</span>
            </div>
            <span className="material-symbols-outlined text-primary hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">

        {/* Left Column */}
        <div className="col-span-12 xl:col-span-7 space-y-4 md:space-y-6">

          {/* ── Spending Analytics Chart ── */}
          <div className="bg-white rounded-3xl p-4 md:p-6 lg:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <h2 className="text-lg md:text-xl font-bold font-headline text-primary">Spending Analytics</h2>
              <div className="flex bg-surface-container-low p-1 rounded-lg w-full sm:w-auto">
                {['hourly', 'daily', 'monthly'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`flex-1 sm:flex-none px-3 md:px-4 py-1 text-xs font-bold rounded-md transition-colors capitalize ${
                      timeframe === tf ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-primary'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Empty state */}
            {isEmptyChart ? (
              <div className="h-40 sm:h-52 md:h-64 flex flex-col items-center justify-center gap-3 text-slate-300">
                <span className="material-symbols-outlined text-5xl">bar_chart</span>
                <p className="text-sm font-medium text-slate-400">No spending data for this period</p>
              </div>
            ) : (
              /* Chart bars */
              <div className="flex items-end justify-between h-40 sm:h-52 md:h-64 gap-1 md:gap-2 pt-8">
                {activeChart.map(({ day, height, active, label }, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 md:gap-2 flex-1">
                    <div
                      className={`w-full rounded-t-lg relative group cursor-pointer transition-colors ${
                        active
                          ? 'bg-primary shadow-lg shadow-primary/20'
                          : 'bg-slate-100 hover:bg-primary/30'
                      }`}
                      style={{ height }}
                    >
                      {/* Active bar label — always visible */}
                      {active && label && label !== '$0' && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] md:text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap z-10">
                          {label}
                        </div>
                      )}
                      {/* Inactive bar label — visible on hover */}
                      {!active && label && label !== '$0' && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[9px] md:text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {label}
                        </div>
                      )}
                    </div>
                    <span className={`text-[8px] sm:text-[10px] font-bold ${active ? 'text-primary' : 'text-slate-400'}`}>
                      {day}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-3xl p-4 md:p-6 lg:p-8 shadow-sm">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold font-headline text-primary">Recent Transactions</h2>
              <Link to="/transactions" className="text-sm font-bold text-secondary hover:underline underline-offset-4">View All</Link>
            </div>

            {/* Mobile card layout */}
            <div className="space-y-3 md:hidden">
              {recentTxs.length > 0 ? recentTxs.map((tx) => {
                const styles = getTxStyles(tx);
                return (
                  <div key={tx._id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <span className={`material-symbols-outlined text-sm ${styles.iconColor}`}>{styles.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary leading-tight">{tx.description || tx.counterparty || 'Transaction'}</p>
                        <p className="text-xs text-slate-400">{new Date(tx.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className={`text-sm font-bold ${styles.amountColor} shrink-0 ml-2`}>{styles.amountPrefix}${tx.amount.toFixed(2)}</p>
                  </div>
                );
              }) : (
                <p className="py-6 text-center text-sm text-slate-500">No recent transactions found.</p>
              )}
            </div>

            {/* Desktop table layout */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Vendor</th>
                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentTxs.length > 0 ? recentTxs.map((tx) => {
                    const styles = getTxStyles(tx);
                    return (
                      <tr key={tx._id} className="group hover:bg-slate-50 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                              <span className={`material-symbols-outlined ${styles.iconColor}`}>{styles.icon}</span>
                            </div>
                            <span className="text-sm font-bold text-primary">{tx.description || tx.counterparty || 'Transaction'}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-3 py-1 ${styles.categoryBg} ${styles.categoryColor} rounded-full text-[10px] font-bold uppercase`}>{tx.category || 'Other'}</span>
                        </td>
                        <td className="py-4 text-sm text-slate-500">{new Date(tx.createdAt).toLocaleDateString()}</td>
                        <td className={`py-4 text-right text-sm font-bold ${styles.amountColor}`}>
                          {styles.amountPrefix}${tx.amount.toFixed(2)}
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-sm text-slate-500">No recent transactions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 xl:col-span-5 space-y-4 md:space-y-6">

          {/* My Cards */}
          <div className="bg-white rounded-3xl p-4 md:p-6 lg:p-8 shadow-sm">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-base md:text-lg font-bold font-headline text-primary">My Cards</h2>
              <Link to="/cards" className="p-2 bg-slate-100 rounded-lg">
                <span className="material-symbols-outlined text-sm">add</span>
              </Link>
            </div>
            <div className="aspect-[1.6/1] w-full rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-4 md:p-6 relative overflow-hidden text-white flex flex-col justify-between shadow-lg">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 100 100">
                  <circle cx="35" cy="50" r="30" />
                  <circle cx="65" cy="50" r="30" />
                </svg>
              </div>
              <div className="relative z-10 flex justify-between items-start">
                <span className="material-symbols-outlined text-2xl md:text-3xl opacity-80">contactless</span>
                <span className="font-bold tracking-widest text-[10px] md:text-xs">VAULT PLATINUM</span>
              </div>
              <div className="relative z-10 space-y-2 md:space-y-4">
                <p className="text-base md:text-xl font-headline tracking-[0.15em] md:tracking-[0.2em] font-medium">•••• •••• •••• 8842</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] opacity-60 mb-0.5">CARD HOLDER</p>
                    <p className="text-xs md:text-sm font-bold">{user?.name?.toUpperCase() || 'VAULT MEMBER'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] opacity-60 mb-0.5">EXPIRES</p>
                    <p className="text-xs md:text-sm font-bold">09/27</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-6 grid grid-cols-2 gap-3 md:gap-4">
              <div className="p-3 md:p-4 bg-surface-container-low rounded-xl">
                <p className="text-[10px] text-slate-500 font-bold mb-1">LIMIT</p>
                <p className="text-sm font-bold text-primary">$25,000</p>
              </div>
              <div className="p-3 md:p-4 bg-surface-container-low rounded-xl">
                <p className="text-[10px] text-slate-500 font-bold mb-1">USED</p>
                <p className="text-sm font-bold text-primary">$4,120</p>
              </div>
            </div>
          </div>

          {/* Upcoming Bills */}
          <div className="bg-white rounded-3xl p-4 md:p-6 lg:p-8 shadow-sm">
            <h2 className="text-base md:text-lg font-bold font-headline text-primary mb-4 md:mb-6">Upcoming Bills</h2>
            <div className="space-y-3 md:space-y-4">
              {bills.length > 0 ? bills.map((bill, i) => (
                <div key={i} className="flex items-center justify-between p-3 md:p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3 md:gap-4 min-w-0">
                    <div className={`w-10 h-10 md:w-12 md:h-12 ${bill.bg} ${bill.color} rounded-xl flex items-center justify-center shrink-0`}>
                      <span className="material-symbols-outlined text-[20px]">{bill.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-primary truncate">{bill.name}</p>
                      <p className="text-xs text-slate-500">{bill.due}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                    <p className="text-sm font-black text-primary">{bill.amount}</p>
                    <button
                      onClick={() => handlePayBill(bill)}
                      disabled={isPaying}
                      className="text-[10px] uppercase font-bold tracking-widest text-secondary hover:underline underline-offset-2 disabled:opacity-50"
                    >
                      {isPaying ? 'Paying...' : 'Pay Now'}
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-center text-sm text-slate-500 py-4">No upcoming bills!</div>
              )}
            </div>
            <button className="w-full mt-4 md:mt-6 py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm font-bold hover:border-primary hover:text-primary transition-all">
              Add New Scheduled Payment
            </button>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}

      {/* Receive Modal */}
      {isReceiveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 md:p-8 shadow-2xl relative">
            <button onClick={() => setIsReceiveModalOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
            <div className="text-center space-y-6 mt-4">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2 text-secondary">
                <span className="material-symbols-outlined text-4xl">qr_code_scanner</span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-2xl text-primary">{user?.name}</h3>
                <p className="text-sm text-on-surface-variant">Share your account details below to receive funds instantly.</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-2xl">
                <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-widest">Account Number</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="font-headline font-black text-xl text-primary tracking-widest">{user?.accountNumber}</p>
                  <button onClick={() => navigator.clipboard.writeText(user?.accountNumber)} className="text-secondary hover:text-secondary-fixed transition-colors">
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pay Bill Modal */}
      {isPayBillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl relative">
            <button onClick={() => setIsPayBillModalOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
            <div className="mb-6">
              <h3 className="font-headline font-bold text-2xl text-primary">Pay a Bill</h3>
              <p className="text-sm text-on-surface-variant">Select a bill from your upcoming schedule to pay securely.</p>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {bills.length > 0 ? bills.map((bill, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-outline-variant/30 hover:border-secondary/50 transition-colors gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 ${bill.bg} ${bill.color} rounded-xl flex items-center justify-center shrink-0`}>
                      <span className="material-symbols-outlined text-[20px]">{bill.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-primary truncate">{bill.name}</p>
                      <p className="text-xs text-slate-500">{bill.due}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <p className="text-sm font-black text-primary">{bill.amount}</p>
                    <button
                      onClick={() => handlePayBill(bill)}
                      disabled={isPaying}
                      className="px-3 md:px-4 py-2 bg-primary text-white rounded-xl text-[10px] uppercase font-bold tracking-widest hover:opacity-90 disabled:opacity-50 transition-opacity"
                    >
                      {isPaying ? '...' : 'Pay'}
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-center text-sm text-slate-500 py-8 bg-surface-container-lowest rounded-2xl">
                  You have no pending bills.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
