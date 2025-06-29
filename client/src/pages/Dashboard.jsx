import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredUser, clearStoredUser } from '../utils/storage';
import { FaUser, FaEnvelope, FaIdCard, FaChartLine, FaMoneyBillWave, FaClipboardList, FaBullseye } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';
import LoadingSpinner from '../components/LoadingSpinner';
import { DEFAULT_PROFILE_PIC } from '../utils/constants';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const userData = getStoredUser();
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(userData);
  }, [navigate]);

  const handleLogout = () => {
    clearStoredUser();
    navigate('/login');
  };

  if (!user) {
    return <LoadingSpinner size="lg" className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="glass-card p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              {user.profilePic ? (
                <img 
                  src={user.profilePic} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900/50 shadow-soft dark:shadow-soft-dark"
                />
              ) : (
                <img 
                  src={DEFAULT_PROFILE_PIC}
                  alt="Default Profile" 
                  className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900/50 shadow-soft dark:shadow-soft-dark"
                />
              )}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Welcome back, {user.username}!
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your finances with ease</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggleButton variant="glass" />
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200 shadow-soft dark:shadow-soft-dark hover:shadow-lg transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="glass-card border-l-4 border-blue-500 dark:border-blue-400 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-500 dark:text-blue-400 text-xl" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{user.email}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card border-l-4 border-green-500 dark:border-green-400 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3">
              <FaIdCard className="text-green-500 dark:text-green-400 text-xl" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">User ID</p>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{user.id}</p>
              </div>
            </div>
          </div>

          {user.fullName && (
            <div className="glass-card border-l-4 border-purple-500 dark:border-purple-400 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <FaUser className="text-purple-500 dark:text-purple-400 text-xl" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">{user.fullName}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
            <FaChartLine className="text-blue-500 dark:text-blue-400" />
            Trackify Dashboard
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            This is your personal finance dashboard. Here you can:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50/80 dark:bg-blue-900/30 rounded-lg backdrop-blur-sm">
                <FaMoneyBillWave className="text-blue-500 dark:text-blue-400 text-xl" />
                <span className="text-gray-700 dark:text-gray-200">Track your income and expenses</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50/80 dark:bg-green-900/30 rounded-lg backdrop-blur-sm">
                <FaClipboardList className="text-green-500 dark:text-green-400 text-xl" />
                <span className="text-gray-700 dark:text-gray-200">Create and manage categories</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-purple-50/80 dark:bg-purple-900/30 rounded-lg backdrop-blur-sm">
                <FaChartLine className="text-purple-500 dark:text-purple-400 text-xl" />
                <span className="text-gray-700 dark:text-gray-200">View financial reports and analytics</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-orange-50/80 dark:bg-orange-900/30 rounded-lg backdrop-blur-sm">
                <FaBullseye className="text-orange-500 dark:text-orange-400 text-xl" />
                <span className="text-gray-700 dark:text-gray-200">Set budget goals</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white shadow-glass dark:shadow-glass-dark backdrop-blur-sm">
            <p className="text-center font-semibold">
              🚀 More features coming soon! Stay tuned for exciting updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 