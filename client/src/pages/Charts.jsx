import React from 'react';
import Charts from '../components/Charts';

const ChartsPage = () => {
  return (
    <div className="p-4 lg:p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 gradient-text">Charts & Analytics</h1>
        <p className="text-gray-600">Visualize your financial data with interactive charts and insights</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6 card-hover">
        <Charts />
      </div>
    </div>
  );
};

export default ChartsPage; 