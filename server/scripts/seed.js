const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trackify';

// Sample data
const sampleUsers = [
  {
    username: 'demo_user',
    email: 'demo@trackify.com',
    password: 'password123',
    fullName: 'Demo User',
    age: 25,
    gender: 'other',
    phone: '+1234567890'
  }
];

const sampleTransactions = [
  {
    amount: 1200,
    type: 'income',
    category: 'Salary',
    note: 'Monthly salary payment'
  },
  {
    amount: 50,
    type: 'expense',
    category: 'Food & Dining',
    note: 'Lunch at restaurant'
  },
  {
    amount: 30,
    type: 'expense',
    category: 'Transportation',
    note: 'Gas for car'
  },
  {
    amount: 200,
    type: 'expense',
    category: 'Shopping',
    note: 'New clothes'
  },
  {
    amount: 100,
    type: 'income',
    category: 'Freelance',
    note: 'Web development project'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Transaction.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`Created user: ${user.username}`);
    }

    // Create transactions for the first user
    if (createdUsers.length > 0) {
      const userId = createdUsers[0]._id;
      
      for (const transactionData of sampleTransactions) {
        const transaction = new Transaction({
          ...transactionData,
          userId: userId
        });
        await transaction.save();
        console.log(`Created transaction: ${transaction.category} - $${transaction.amount}`);
      }
    }

    console.log('Database seeded successfully!');
    console.log(`Created ${createdUsers.length} users and ${sampleTransactions.length} transactions`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeding function
seedDatabase(); 