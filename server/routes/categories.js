const express = require('express');
const Category = require('../models/Category');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all categories for a user
router.get('/', auth, async (req, res) => {
  try {
    const { type } = req.query;
    const query = { user: req.user._id };
    
    if (type) query.type = type;

    const categories = await Category.find(query).sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get category by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new category
router.post('/', auth, async (req, res) => {
  try {
    const { name, type, color, icon } = req.body;

    const category = new Category({
      user: req.user._id,
      name,
      type,
      color,
      icon
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Update category
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, type, color, icon } = req.body;

    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, type, color, icon },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Update category error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete category
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create default categories for new user
router.post('/defaults', auth, async (req, res) => {
  try {
    const defaultCategories = [
      // Income categories
      { name: 'Salary', type: 'income', color: '#10B981', icon: '💰' },
      { name: 'Freelance', type: 'income', color: '#3B82F6', icon: '💼' },
      { name: 'Investment', type: 'income', color: '#8B5CF6', icon: '📈' },
      { name: 'Gift', type: 'income', color: '#F59E0B', icon: '🎁' },
      
      // Expense categories
      { name: 'Food & Dining', type: 'expense', color: '#EF4444', icon: '🍽️' },
      { name: 'Transportation', type: 'expense', color: '#06B6D4', icon: '🚗' },
      { name: 'Shopping', type: 'expense', color: '#EC4899', icon: '🛍️' },
      { name: 'Bills & Utilities', type: 'expense', color: '#F97316', icon: '⚡' },
      { name: 'Entertainment', type: 'expense', color: '#8B5CF6', icon: '🎬' },
      { name: 'Healthcare', type: 'expense', color: '#10B981', icon: '🏥' },
      { name: 'Education', type: 'expense', color: '#3B82F6', icon: '📚' },
      { name: 'Housing', type: 'expense', color: '#F59E0B', icon: '🏠' }
    ];

    const categories = defaultCategories.map(cat => ({
      ...cat,
      user: req.user._id,
      isDefault: true
    }));

    await Category.insertMany(categories);
    
    const createdCategories = await Category.find({ user: req.user._id });
    res.status(201).json(createdCategories);
  } catch (error) {
    console.error('Create default categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 