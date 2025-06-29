import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TransactionForm from '../components/TransactionForm';
import TransactionTable from '../components/TransactionTable';
import { transactionAPI } from '../utils/api';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';

const Expenses = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [stats, setStats] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    totalTransactions: 0
  });
  const { isDark } = useTheme();

  const fetchStats = async () => {
    try {
      const response = await transactionAPI.getTransactionStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Fetch stats error:', error);
      toast.error('Failed to load statistics');
    }
  };

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  const handleTransactionAdded = () => {
    setRefreshTrigger(prev => prev + 1);
    toast.success('Transaction added successfully!');
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/-';
  };

  return (
    <div className="p-4 lg:p-6 animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expenses & Income
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your financial transactions and track your spending</p>
          </div>
          <ThemeToggleButton variant="glass" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        <div className="glass-card stats-card hover:scale-105 transition-transform duration-300">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg card-hover backdrop-blur-sm">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-400">Total Income</p>
              <p className="text-lg lg:text-2xl font-semibold text-green-600 dark:text-green-400">{formatAmount(stats.income)}</p>
            </div>
          </div>
        </div>

        <div className="glass-card stats-card hover:scale-105 transition-transform duration-300">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg card-hover backdrop-blur-sm">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</p>
              <p className="text-lg lg:text-2xl font-semibold text-red-600 dark:text-red-400">{formatAmount(stats.expense)}</p>
            </div>
          </div>
        </div>

        <div className="glass-card stats-card hover:scale-105 transition-transform duration-300">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg card-hover backdrop-blur-sm">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-400">Balance</p>
              <p className={`text-lg lg:text-2xl font-semibold ${stats.balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {formatAmount(stats.balance)}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card stats-card hover:scale-105 transition-transform duration-300">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg card-hover backdrop-blur-sm">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-400">Transactions</p>
              <p className="text-lg lg:text-2xl font-semibold text-purple-600 dark:text-purple-400">{stats.totalTransactions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card mb-6 card-hover">
        <div className="border-b border-white/20 dark:border-gray-700/20">
          <nav className="-mb-px flex space-x-4 lg:space-x-8 px-4 lg:px-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-3 lg:py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap nav-link transition-colors duration-200 ${
                activeTab === 'transactions'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`py-3 lg:py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap nav-link transition-colors duration-200 ${
                activeTab === 'add'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Add Transaction
            </button>
          </nav>
        </div>

        <div className="p-4 lg:p-6 animate-scale-in">
          {activeTab === 'transactions' && (
            <TransactionTable refreshTrigger={refreshTrigger} />
          )}

          {activeTab === 'add' && (
            <TransactionForm onTransactionAdded={handleTransactionAdded} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Expenses;