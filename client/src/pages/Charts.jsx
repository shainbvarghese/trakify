import React from 'react';
import Charts from '../components/Charts';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';

const ChartsPage = () => {
  const { isDark } = useTheme();
  return (
    <div className="p-4 lg:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Charts & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-300">Visualize your financial data with interactive charts and insights</p>
        </div>
        <ThemeToggleButton variant="glass" />
      </div>
      <div className="glass-card p-4 lg:p-6 card-hover">
        <Charts />
      </div>
    </div>
  );
};

export default ChartsPage; 