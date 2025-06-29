import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiBell, FiSettings, FiChevronDown, FiEdit3, FiSun, FiMoon, FiDollarSign, FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { getStoredUser, clearStoredUser, setStoredUser } from '../utils/storage';
import { authAPI, notificationAPI } from '../utils/api';
import { DEFAULT_PROFILE_PIC } from '../utils/constants';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/images/logo.png';
import ReactDOM from 'react-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef();
  const notificationRef = useRef();
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);

  // Fetch current user data from server
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const storedUser = getStoredUser();
        if (storedUser && storedUser.token) {
          const response = await authAPI.getCurrentUser();
          const currentUser = response.data.user;
          setUser(currentUser);
          // Update stored user with fresh data from server
          setStoredUser({ ...storedUser, ...currentUser });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
        // If token is invalid, clear stored data
        clearStoredUser();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    setNotificationsLoading(true);
    try {
      const res = await notificationAPI.getNotifications();
      setNotifications(res.data.notifications || []);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setNotificationsLoading(false);
    }
  };

  // Fetch notifications when dropdown is opened
  useEffect(() => {
    if (showNotifications) {
      fetchNotifications();
    }
  }, [showNotifications]);

  const handleMarkAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    clearStoredUser();
    setUser(null);
    navigate('/login');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <FiAlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <FiAlertCircle className="h-4 w-4 text-red-500" />;
      case 'info':
        return <FiInfo className="h-4 w-4 text-blue-500" />;
      default:
        return <FiBell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getNotificationBg = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20';
    }
  };

  // NotificationPortal component
  const NotificationPortal = ({ children }) => {
    const portalRoot = document.getElementById('portal-root');
    return portalRoot ? ReactDOM.createPortal(children, portalRoot) : null;
  };

  // Show loading state while fetching user data
  if (loading) {
    return (
      <nav className="w-full h-16 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-glass dark:shadow-glass-dark border-b border-white/20 dark:border-gray-700/20 flex items-center justify-between px-4 lg:px-6 xl:px-8 transition-all duration-300">
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="hidden sm:flex items-center gap-3 lg:gap-4">
            <img 
              src={logo} 
              alt="Trackify Logo" 
              className="h-10 w-10 lg:h-12 lg:w-12 object-contain animate-scale-in"
            />
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trackify</span>
          </div>
          <div className="sm:hidden">
            <img 
              src={logo} 
              alt="Trackify Logo" 
              className="h-10 w-10 object-contain animate-scale-in"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full h-16 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-glass dark:shadow-glass-dark border-b border-white/20 dark:border-gray-700/20 flex items-center justify-between px-4 lg:px-6 xl:px-8 transition-all duration-300">
      {/* Left side - Logo and Brand */}
      <div className="flex items-center gap-3 lg:gap-4">
        <div className="hidden sm:flex items-center gap-3 lg:gap-4">
          <img 
            src={logo} 
            alt="Trackify Logo" 
            className="h-10 w-10 lg:h-12 lg:w-12 object-contain animate-scale-in"
          />
          <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trackify</span>
        </div>
        <div className="sm:hidden">
          <img 
            src={logo} 
            alt="Trackify Logo" 
            className="h-10 w-10 object-contain animate-scale-in"
          />
        </div>
      </div>

      {/* Right side - User menu */}
      <div className="flex items-center gap-3 lg:gap-6">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="px-3 py-2 rounded-xl bg-black/20 dark:bg-white/10 text-sm text-white dark:text-gray-200 backdrop-blur-sm hover:bg-black/30 dark:hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? (
            <div className="flex items-center gap-2">
              <FiSun className="h-4 w-4" />
              <span className="hidden sm:inline">Light</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FiMoon className="h-4 w-4" />
              <span className="hidden sm:inline">Dark</span>
            </div>
          )}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 lg:p-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 backdrop-blur-sm"
            title="Notifications"
          >
            <FiBell className="h-5 w-5 lg:h-6 lg:w-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown via Portal */}
          {showNotifications && (
            <NotificationPortal>
              <div className="fixed top-20 right-6 w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-lg shadow-glass dark:shadow-glass-dark border border-white/20 dark:border-gray-700/20 py-2 z-[99999] animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                  <button onClick={handleMarkAllAsRead} className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    Mark all as read
                  </button>
                </div>

                {/* Notifications List */}
                <div className="max-h-64 overflow-y-auto">
                  {notificationsLoading ? (
                    <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">Loading...</div>
                  ) : notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification._id}
                        className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer ${
                          !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {new Date(notification.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <FiBell className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">No notifications</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-600">
                    <Link
                      to="/notifications"
                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      View all notifications
                    </Link>
                  </div>
                )}
              </div>
            </NotificationPortal>
          )}
        </div>

        {user ? (
          <div className="flex items-center gap-3 lg:gap-4" ref={dropdownRef}>
            {/* Enhanced User Profile Section */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 lg:gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 backdrop-blur-sm"
              >
                {/* Profile Picture */}
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 shadow-soft dark:shadow-soft-dark hover:shadow-md transition-shadow duration-200"
                  />
                ) : (
                  <img
                    src={DEFAULT_PROFILE_PIC}
                    alt="Default Profile"
                    className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 shadow-soft dark:shadow-soft-dark hover:shadow-md transition-shadow duration-200"
                  />
                )}
                
                {/* User Info - Hidden on mobile */}
                <div className="hidden sm:block text-left">
                  <p className="text-sm lg:text-base font-medium text-gray-900 dark:text-gray-100">{user.username}</p>
                  <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
                
                {/* Dropdown Arrow */}
                <FiChevronDown className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-glass dark:shadow-glass-dark border border-white/20 dark:border-gray-700/20 py-2 z-[9999] animate-fade-in">
                  {/* Profile Link */}
                  <Link
                    to="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <FiEdit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </Link>
                  
                  {/* Divider */}
                  <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>
                  
                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 w-full text-left"
                  >
                    <FiLogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Logout Button - Only show on mobile when dropdown is closed */}
            <div className="sm:hidden">
              <button
                onClick={handleLogout}
                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 backdrop-blur-sm"
              >
                <FiLogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 