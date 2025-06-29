const Transaction = require('../models/Transaction');

// Add a new transaction
const addTransaction = async (req, res) => {
  try {
    const { amount, type, category, note } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!amount || !type || !category) {
      return res.status(400).json({ 
        message: 'Amount, type, and category are required' 
      });
    }

    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({ 
        message: 'Amount must be greater than 0' 
      });
    }

    // Validate type
    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ 
        message: 'Type must be either "income" or "expense"' 
      });
    }

    // Create new transaction
    const transaction = new Transaction({
      amount,
      type,
      category,
      note,
      userId
    });

    await transaction.save();

    res.status(201).json({
      message: 'Transaction added successfully',
      transaction
    });

  } catch (error) {
    console.error('Add transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all transactions for a user
const getTransactions = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10, type, category, sortBy = 'date', sortOrder = 'desc' } = req.query;

    // Build query
    const query = { userId };
    
    if (type) {
      query.type = type;
    }
    
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get transactions with pagination
    const transactions = await Transaction.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await Transaction.countDocuments(query);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      transactions,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        total,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get transaction statistics
const getTransactionStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get total income and expenses
    const stats = await Transaction.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Get top categories
    const topCategories = await Transaction.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 5 }
    ]);

    // Format stats
    const income = stats.find(s => s._id === 'income') || { total: 0, count: 0 };
    const expense = stats.find(s => s._id === 'expense') || { total: 0, count: 0 };
    const balance = income.total - expense.total;

    res.json({
      stats: {
        income: income.total,
        expense: expense.total,
        balance,
        totalTransactions: income.count + expense.count
      },
      topCategories
    });

  } catch (error) {
    console.error('Get transaction stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, category, note, date } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!amount || !type || !category) {
      return res.status(400).json({ 
        message: 'Amount, type, and category are required' 
      });
    }

    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({ 
        message: 'Amount must be greater than 0' 
      });
    }

    // Validate type
    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ 
        message: 'Type must be either "income" or "expense"' 
      });
    }

    // Find and update the transaction
    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, userId },
      {
        amount,
        type,
        category,
        note,
        date: date || new Date()
      },
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({ 
        message: 'Transaction not found' 
      });
    }

    res.json({
      message: 'Transaction updated successfully',
      transaction
    });

  } catch (error) {
    console.error('Update transaction error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid transaction ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Find and delete the transaction
    const transaction = await Transaction.findOneAndDelete({ _id: id, userId });

    if (!transaction) {
      return res.status(404).json({ 
        message: 'Transaction not found' 
      });
    }

    res.json({
      message: 'Transaction deleted successfully'
    });

  } catch (error) {
    console.error('Delete transaction error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid transaction ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  getTransactionStats,
  updateTransaction,
  deleteTransaction
}; 