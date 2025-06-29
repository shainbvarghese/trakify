import React, { useState, useEffect } from 'react';
import { transactionAPI } from '../utils/api';

const TransactionTable = ({ refreshTrigger }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [editForm, setEditForm] = useState({
    type: '',
    category: '',
    amount: '',
    note: '',
    date: ''
  });
  const [editLoading, setEditLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await transactionAPI.getTransactions(filters);
      setTransactions(response.data.transactions);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Fetch transactions error:', error);
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters, refreshTrigger]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({
      ...prev,
      page
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getTypeBadge = (type) => {
    return type === 'income' 
      ? <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Income</span>
      : <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Expense</span>;
  };

  const handleEditClick = (transaction) => {
    setEditTransaction(transaction);
    setEditForm({
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount.toString(),
      note: transaction.note || '',
      date: new Date(transaction.date).toISOString().split('T')[0]
    });
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditTransaction(null);
    setEditForm({
      type: '',
      category: '',
      amount: '',
      note: '',
      date: ''
    });
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditSave = async () => {
    if (!editTransaction) return;

    setEditLoading(true);
    try {
      const updatedData = {
        type: editForm.type,
        category: editForm.category,
        amount: parseFloat(editForm.amount),
        note: editForm.note,
        date: new Date(editForm.date).toISOString()
      };

      await transactionAPI.updateTransaction(editTransaction._id, updatedData);
      handleEditModalClose();
      fetchTransactions(); // Refresh the table
    } catch (error) {
      console.error('Update transaction error:', error);
      alert('Failed to update transaction. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteClick = async (transaction) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionAPI.deleteTransaction(transaction._id);
        fetchTransactions(); // Refresh the table
      } catch (error) {
        console.error('Delete transaction error:', error);
        alert('Failed to delete transaction. Please try again.');
      }
    }
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-glass dark:shadow-glass-dark border border-white/20 dark:border-gray-700/20 p-6">
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500 dark:text-gray-400">Loading transactions...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-glass dark:shadow-glass-dark border border-white/20 dark:border-gray-700/20 p-6">
        <div className="text-center text-red-600 dark:text-red-400">
          {error}
          <button 
            onClick={fetchTransactions}
            className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-glass dark:shadow-glass-dark border border-white/20 dark:border-gray-700/20">
      <div className="p-6 border-b border-white/20 dark:border-gray-700/20">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Transactions</h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <input
              type="text"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              placeholder="Filter by category..."
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Note</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200/50 dark:divide-gray-700/50">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(transaction.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {transaction.category}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}/-
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate">
                    {transaction.note || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditClick(transaction)}
                        className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded-md hover:bg-blue-100/80 dark:hover:bg-blue-900/30 hover:border-blue-300/50 dark:hover:border-blue-600/50 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-1"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(transaction)}
                        className="px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50/80 dark:bg-red-900/20 border border-red-200/50 dark:border-red-700/50 rounded-md hover:bg-red-100/80 dark:hover:bg-red-900/30 hover:border-red-300/50 dark:hover:border-red-600/50 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:ring-offset-1"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-white/20 dark:border-gray-700/20 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to{' '}
              {Math.min(pagination.currentPage * pagination.limit, pagination.total)} of{' '}
              {pagination.total} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-600/80 border border-gray-300/50 dark:border-gray-500/50 rounded-md hover:bg-gray-50/80 dark:hover:bg-gray-500/80 hover:border-gray-400/50 dark:hover:border-gray-400/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-50/80 dark:bg-gray-600/80 border border-gray-200/50 dark:border-gray-500/50 rounded-md backdrop-blur-sm">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-600/80 border border-gray-300/50 dark:border-gray-500/50 rounded-md hover:bg-gray-50/80 dark:hover:bg-gray-500/80 hover:border-gray-400/50 dark:hover:border-gray-400/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-glass dark:shadow-glass-dark p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border border-white/20 dark:border-gray-700/20">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Edit Transaction</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <select
                  value={editForm.type}
                  onChange={(e) => handleEditFormChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <input
                  type="text"
                  value={editForm.category}
                  onChange={(e) => handleEditFormChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter category"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={editForm.amount}
                  onChange={(e) => handleEditFormChange('amount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => handleEditFormChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Note</label>
                <textarea
                  value={editForm.note}
                  onChange={(e) => handleEditFormChange('note', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  rows="3"
                  placeholder="Enter note (optional)"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button 
                onClick={handleEditModalClose} 
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/80 border border-gray-300/50 dark:border-gray-600/50 rounded-md hover:bg-gray-200/80 dark:hover:bg-gray-600/80 hover:border-gray-400/50 dark:hover:border-gray-500/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                disabled={editLoading}
              >
                Cancel
              </button>
              <button 
                onClick={handleEditSave}
                disabled={editLoading || !editForm.type || !editForm.category || !editForm.amount || !editForm.date}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 hover:border-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;