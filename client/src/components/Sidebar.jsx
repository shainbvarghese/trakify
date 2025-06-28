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
  FiChevronRight
} from 'react-icons/fi';
import { getStoredUser, clearStoredUser } from '../utils/storage';
import logo from '../assets/images/logo.png';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [expensesOpen, setExpensesOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg fab"
      >
        {isMobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 modal-overlay"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64 bg-white shadow-lg flex flex-col
      `}>
        {/* Header */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4 glass">
          <div className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="Trackify Logo" 
              className="h-8 w-8 object-contain animate-scale-in"
            />
            <span className="text-lg font-bold gradient-text">Trackify</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <ul className="space-y-1">
            {/* Dashboard */}
            <li>
              <Link 
                to="/dashboard" 
                className={`
                  sidebar-item flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                  ${isActive('/dashboard') 
                    ? 'bg-blue-100 text-blue-700 font-medium shadow-soft' 
                    : 'text-gray-700 hover:bg-gray-100'
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
                  sidebar-item flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors duration-200
                  ${(location.pathname === '/expenses' || location.pathname === '/charts' || expensesOpen) 
                    ? 'bg-blue-100 text-blue-700 font-medium shadow-soft' 
                    : 'text-gray-700 hover:bg-gray-100'
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
                        sidebar-item flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                        ${location.pathname === '/expenses'
                          ? 'bg-blue-50 text-blue-600 font-medium shadow-soft' 
                          : 'text-gray-600 hover:bg-gray-50'
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
                        sidebar-item flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                        ${location.pathname === '/charts'
                          ? 'bg-blue-50 text-blue-600 font-medium shadow-soft' 
                          : 'text-gray-600 hover:bg-gray-50'
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
                  sidebar-item flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                  ${isActive('/profile') 
                    ? 'bg-blue-100 text-blue-700 font-medium shadow-soft' 
                    : 'text-gray-700 hover:bg-gray-100'
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
                  sidebar-item flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                  ${isActive('/contact') 
                    ? 'bg-blue-100 text-blue-700 font-medium shadow-soft' 
                    : 'text-gray-700 hover:bg-gray-100'
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
        <div className="p-4 border-t border-gray-200 glass">
          {user ? (
            <div className="space-y-3">
              {/* User Info */}
              <div className="flex items-center px-3 py-2 card-hover">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover mr-3 profile-pic"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 profile-pic">
                    <FiUser className="h-4 w-4 text-blue-600" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              
              {/* Logout Button */}
              <button 
                onClick={handleLogout} 
                className="w-full flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 btn-primary"
              >
                <FiLogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="w-full flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 btn-primary"
            >
              <FiUser className="mr-2 h-4 w-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 