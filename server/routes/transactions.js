const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  addTransaction, 
  getTransactions, 
  getTransactionStats,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');

// All routes require authentication
router.use(auth);

// POST /api/transactions - Add a new transaction
router.post('/', addTransaction);

// GET /api/transactions - Get all transactions for the user
router.get('/', getTransactions);

// GET /api/transactions/stats - Get transaction statistics
router.get('/stats', getTransactionStats);

// PUT /api/transactions/:id - Update a transaction
router.put('/:id', updateTransaction);

// DELETE /api/transactions/:id - Delete a transaction
router.delete('/:id', deleteTransaction);

module.exports = router; 