import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTransactions } from '../api/transactionService';

const StatusBadge = ({ status }) => {
  if (status === 'completed') {
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full text-xs font-bold">
        <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
        Completed
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 px-3 py-1 bg-[#ffdbcb] text-[#773205] rounded-full text-xs font-bold">
      <span className="w-1.5 h-1.5 bg-[#4b1c00] rounded-full" />
      Pending
    </span>
  );
};

export default function Transactions() {
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [amountFilter, setAmountFilter] = useState('Any Amount');
  const [dateFilter, setDateFilter] = useState('All Time');
  
  const [activeFilters, setActiveFilters] = useState({
    type: 'All Types',
    amountRange: 'Any Amount',
    dateRange: 'All Time'
  });

  const [txs, setTxs] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalTransactions: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTxs = async () => {
      setIsLoading(true);
      try {
        const data = await getTransactions({ 
          page: pagination.currentPage, 
          limit: 10,
          type: activeFilters.type,
          amountRange: activeFilters.amountRange,
          dateRange: activeFilters.dateRange
        });
        if (data.success) {
          setTxs(data.data);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTxs();
  }, [pagination.currentPage, activeFilters]);

  const handleApplyFilters = () => {
    setPagination(p => ({ ...p, currentPage: 1 }));
    setActiveFilters({
      type: typeFilter,
      amountRange: amountFilter,
      dateRange: dateFilter
    });
  };

  const getTxStyles = (tx) => {
    if (tx.type === 'credit') {
      return { icon: 'account_balance_wallet', iconColor: 'text-secondary', amountColor: 'text-secondary', amountPrefix: '+' };
    }
    return { icon: 'payment', iconColor: 'text-primary', amountColor: 'text-on-surface', amountPrefix: '-' };
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Editorial Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-headline font-extrabold text-primary tracking-tight mb-2">Transaction History</h1>
        <p className="text-on-surface-variant font-body">Manage and monitor your architectural flow of capital.</p>
      </div>

      {/* Filters Module */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 p-6 bg-white rounded-2xl shadow-sm">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">Date Range</label>
          <select
            className="px-4 py-3 bg-surface-container-low border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 appearance-none outline-none"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
          >
            <option>All Time</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">Transaction Type</label>
          <select
            className="px-4 py-3 bg-surface-container-low border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 appearance-none outline-none"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option>All Types</option>
            <option>Credit</option>
            <option>Debit</option>
            <option>Internal Transfer</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">Amount Range</label>
          <select
            className="px-4 py-3 bg-surface-container-low border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
            value={amountFilter}
            onChange={e => setAmountFilter(e.target.value)}
          >
            <option>Any Amount</option>
            <option>$0 - $500</option>
            <option>$500 - $5,000</option>
            <option>$5,000+</option>
          </select>
        </div>
        <div className="flex items-end">
          <button onClick={handleApplyFilters} className="w-full py-3 bg-secondary text-white rounded-xl font-headline font-bold text-sm shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Apply Filters
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Merchant / Recipient</th>
                <th className="px-6 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Category</th>
                <th className="px-6 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Date</th>
                <th className="px-6 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-sm text-on-surface-variant">
                    Loading transactions...
                  </td>
                </tr>
              ) : txs.length > 0 ? (
                txs.map((tx) => {
                  const styles = getTxStyles(tx);
                  return (
                    <tr key={tx._id} className="group hover:bg-surface-container-lowest transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center">
                            <span className={`material-symbols-outlined ${styles.iconColor}`}>{styles.icon}</span>
                          </div>
                          <div>
                            <p className="font-headline font-bold text-on-surface">{tx.description || tx.counterparty}</p>
                            <p className="text-xs text-on-surface-variant">ID: #{tx._id.slice(-6).toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-bold text-on-surface-variant uppercase">{tx.category || 'Other'}</span>
                      </td>
                      <td className="px-6 py-5 text-sm text-on-surface">{new Date(tx.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center">
                          <StatusBadge status="completed" />
                        </div>
                      </td>
                      <td className={`px-6 py-5 text-right font-headline font-extrabold ${styles.amountColor}`}>
                        {styles.amountPrefix}${tx.amount.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-sm text-on-surface-variant">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 flex items-center justify-between border-t border-surface-container-low">
          <p className="text-sm text-on-surface-variant">
            Showing <span className="font-bold">{txs.length > 0 ? (pagination.currentPage - 1) * 10 + 1 : 0}-{Math.min(pagination.currentPage * 10, pagination.totalTransactions)}</span> of {pagination.totalTransactions} transactions
          </p>
          <div className="flex items-center gap-2">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setPagination(p => ({ ...p, currentPage: Math.max(1, p.currentPage - 1) }))}
              disabled={pagination.currentPage === 1}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
              {pagination.currentPage}
            </span>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setPagination(p => ({ ...p, currentPage: Math.min(p.totalPages, p.currentPage + 1) }))}
              disabled={pagination.currentPage >= pagination.totalPages}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
