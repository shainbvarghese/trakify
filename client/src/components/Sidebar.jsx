import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiDollarSign, 
  FiBarChart2, 
  FiList, 
  FiUser, 
  FiMessageCircle, 
  FiLogOut, 
  FiMenu, 
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import { getStoredUser, clearStoredUser } from '../utils/storage';
import { useTheme } from '../contexts/ThemeContext';
import { DEFAULT_PROFILE_PIC } from '../utils/constants';
import logo from '../assets/images/logo.png';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [expensesOpen, setExpensesOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const user = getStoredUser();

  const handleLogout = () => {
    clearStoredUser();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/profile', label: 'Profile', icon: FiUser },
    { path: '/contact', label: 'Contact', icon: FiMessageCircle },
  ];

  const expensesItems = [
    { path: '/expenses', label: 'Transactions', icon: FiList },
    { path: '/charts', label: 'Charts', icon: FiBarChart2 },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-glass dark:shadow-glass-dark backdrop-blur-md"
      >
        {isMobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-glass dark:shadow-glass-dark border-r border-white/20 dark:border-gray-700/20 flex flex-col
      `}>
        {/* Header */}
        <div className="h-16 flex items-center justify-between border-b border-white/20 dark:border-gray-700/20 px-4">
          <div className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="Trackify Logo" 
              className="h-8 w-8 object-contain animate-scale-in"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trackify</span>
          </div>
          
          {/* Theme Toggle in Sidebar */}
          <button 
            onClick={toggleTheme}
            className="px-2 py-2 rounded-lg bg-black/20 dark:bg-white/10 text-white dark:text-gray-200 backdrop-blur-sm hover:bg-black/30 dark:hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-1"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <ul className="space-y-1">
            {/* Dashboard */}
            <li>
              <Link 
                to="/dashboard" 
                className={`
                  sidebar-item flex items-center px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm
                  ${isActive('/dashboard') 
                    ? 'bg-blue-100/80 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium shadow-soft dark:shadow-soft-dark' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/50'
                  }
                `}
                onClick={() => setIsMobileOpen(false)}
              >
                <FiHome className="mr-3 h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>

            {/* Expenses Dropdown */}
            <li>
              <button
                className={`
                  sidebar-item flex items-center justify-between w-full px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm
                  ${(location.pathname === '/expenses' || location.pathname === '/charts' || expensesOpen) 
                    ? 'bg-blue-100/80 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium shadow-soft dark:shadow-soft-dark' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/50'
                  }
                `}
                onClick={() => setExpensesOpen(!expensesOpen)}
              >
                <div className="flex items-center">
                  <FiDollarSign className="mr-3 h-5 w-5" />
                  <span>Expenses</span>
                </div>
                {expensesOpen ? <FiChevronDown className="h-4 w-4" /> : <FiChevronRight className="h-4 w-4" />}
              </button>
              
              {expensesOpen && (
                <ul className="ml-6 mt-1 space-y-1 animate-fade-in">
                  <li>
                    <Link 
                      to="/expenses" 
                      className={`
                        sidebar-item flex items-center px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm
                        ${location.pathname === '/expenses'
                          ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium shadow-soft dark:shadow-soft-dark' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50/80 dark:hover:bg-gray-700/30'
                        }
                      `}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <FiList className="mr-3 h-4 w-4" />
                      <span>Transactions</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/charts" 
                      className={`
                        sidebar-item flex items-center px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm
                        ${location.pathname === '/charts'
                          ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium shadow-soft dark:shadow-soft-dark' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50/80 dark:hover:bg-gray-700/30'
                        }
                      `}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <FiBarChart2 className="mr-3 h-4 w-4" />
                      <span>Charts</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Profile */}
            <li>
              <Link 
                to="/profile" 
                className={`
                  sidebar-item flex items-center px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm
                  ${isActive('/profile') 
                    ? 'bg-blue-100/80 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium shadow-soft dark:shadow-soft-dark' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/50'
                  }
                `}
                onClick={() => setIsMobileOpen(false)}
              >
                <FiUser className="mr-3 h-5 w-5" />
                <span>Profile</span>
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link 
                to="/contact" 
                className={`
                  sidebar-item flex items-center px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm
                  ${isActive('/contact') 
                    ? 'bg-blue-100/80 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium shadow-soft dark:shadow-soft-dark' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/50'
                  }
                `}
                onClick={() => setIsMobileOpen(false)}
              >
                <FiMessageCircle className="mr-3 h-5 w-5" />
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer with Logout */}
        <div className="p-4 border-t border-white/20 dark:border-gray-700/20">
          {user ? (
            <div className="space-y-3">
              {/* User Info */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/80 dark:bg-gray-700/50 backdrop-blur-sm">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 shadow-soft dark:shadow-soft-dark"
                  />
                ) : (
                  <img
                    src={DEFAULT_PROFILE_PIC}
                    alt="Default Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 shadow-soft dark:shadow-soft-dark"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50/80 dark:bg-red-900/20 rounded-lg hover:bg-red-100/80 dark:hover:bg-red-900/30 transition-all duration-200 backdrop-blur-sm"
              >
                <FiLogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100/80 dark:hover:bg-blue-900/30 transition-all duration-200 backdrop-blur-sm"
              >
                <FiUser className="h-4 w-4" />
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 