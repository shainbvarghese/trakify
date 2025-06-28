import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredUser, clearStoredUser } from '../utils/storage';
import { FaUser, FaEnvelope, FaIdCard, FaChartLine, FaMoneyBillWave, FaClipboardList, FaBullseye } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              {user.profilePic ? (
                <img 
                  src={user.profilePic} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 shadow-md"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUser className="text-blue-600 text-2xl" />
                </div>
              )}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  Welcome back, {user.username}!
                </h1>
                <p className="text-gray-600 mt-1">Manage your finances with ease</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-500 text-xl" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-800">{user.email}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <FaIdCard className="text-green-500 text-xl" />
              <div>
                <p className="text-sm text-gray-600">User ID</p>
                <p className="font-semibold text-gray-800">{user.id}</p>
              </div>
            </div>
          </div>

          {user.fullName && (
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center gap-3">
                <FaUser className="text-purple-500 text-xl" />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold text-gray-800">{user.fullName}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FaChartLine className="text-blue-500" />
            Trackify Dashboard
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            This is your personal finance dashboard. Here you can:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <FaMoneyBillWave className="text-blue-500 text-xl" />
                <span className="text-gray-700">Track your income and expenses</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <FaClipboardList className="text-green-500 text-xl" />
                <span className="text-gray-700">Create and manage categories</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                <FaChartLine className="text-purple-500 text-xl" />
                <span className="text-gray-700">View financial reports and analytics</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                <FaBullseye className="text-orange-500 text-xl" />
                <span className="text-gray-700">Set budget goals</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
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