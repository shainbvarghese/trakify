import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';

const Home = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Theme Toggle */}
        <div className="flex justify-end mb-8">
          <ThemeToggleButton variant="glass" showText={true} />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trackify</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Your personal finance companion. Track expenses, manage budgets, and achieve your financial goals with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started
            </button>
            <button
              onClick={handleSignIn}
              className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition duration-300 backdrop-blur-sm"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="glass-card hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Track Expenses</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Easily log and categorize your daily expenses. Get insights into your spending patterns.
            </p>
          </div>
          <div className="glass-card hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Set Budgets</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create and manage budgets for different categories. Stay on track with your financial goals.
            </p>
          </div>
          <div className="glass-card hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Visual Reports</h3>
            <p className="text-gray-600 dark:text-gray-300">
              View beautiful charts and reports to understand your financial health at a glance.
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Sign Up</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Create your account in seconds</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Add Expenses</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Log your daily expenses</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Set Budgets</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Create spending limits</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <span className="text-blue-600 dark:text-blue-400 font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Track Progress</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Monitor your financial goals</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-glass dark:shadow-glass-dark backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of users who are already managing their finances better with Trackify.
          </p>
          <Link
            to="/register"
            className="bg-white/90 backdrop-blur-sm text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-white transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Your Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 