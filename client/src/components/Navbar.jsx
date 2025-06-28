import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiBell, FiSettings, FiChevronDown, FiEdit3 } from 'react-icons/fi';
import { getStoredUser, clearStoredUser, setStoredUser } from '../utils/storage';
import { authAPI } from '../utils/api';
import { DEFAULT_PROFILE_PIC } from '../utils/constants';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

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

  const handleLogout = () => {
    clearStoredUser();
    setUser(null);
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show loading state while fetching user data
  if (loading) {
    return (
      <nav className="w-full h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 xl:px-8 glass">
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="hidden sm:flex items-center gap-3 lg:gap-4">
            <img 
              src={logo} 
              alt="Trackify Logo" 
              className="h-10 w-10 lg:h-12 lg:w-12 object-contain animate-scale-in"
            />
            <span className="text-xl lg:text-2xl font-bold gradient-text">Trackify</span>
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
    <nav className="w-full h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 xl:px-8 glass">
      {/* Left side - Logo and Brand */}
      <div className="flex items-center gap-3 lg:gap-4">
        <div className="hidden sm:flex items-center gap-3 lg:gap-4">
          <img 
            src={logo} 
            alt="Trackify Logo" 
            className="h-10 w-10 lg:h-12 lg:w-12 object-contain animate-scale-in"
          />
          <span className="text-xl lg:text-2xl font-bold gradient-text">Trackify</span>
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
        {/* Notifications */}
        <button className="p-2 lg:p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 card-hover">
          <FiBell className="h-5 w-5 lg:h-6 lg:w-6" />
        </button>

        {/* Settings */}
        <button className="p-2 lg:p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 card-hover">
          <FiSettings className="h-5 w-5 lg:h-6 lg:w-6" />
        </button>

        {user ? (
          <div className="flex items-center gap-3 lg:gap-4" ref={dropdownRef}>
            {/* Enhanced User Profile Section */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 lg:gap-4 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 card-hover"
              >
                {/* Profile Picture */}
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover border-2 border-gray-200 profile-pic shadow-sm hover:shadow-md transition-shadow duration-200"
                  />
                ) : (
                  <img
                    src={DEFAULT_PROFILE_PIC}
                    alt="Default Profile"
                    className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover border-2 border-gray-200 profile-pic shadow-sm hover:shadow-md transition-shadow duration-200"
                  />
                )}
                
                {/* User Info - Hidden on mobile */}
                <div className="hidden sm:block text-left">
                  <p className="text-sm lg:text-base font-medium text-gray-900">{user.username}</p>
                  <p className="text-xs lg:text-sm text-gray-500">{user.email}</p>
                </div>
                
                {/* Dropdown Arrow */}
                <FiChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
                  {/* Profile Link */}
                  <Link
                    to="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <FiEdit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </Link>
                  
                  {/* Settings Link */}
                  <Link
                    to="/settings"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <FiSettings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  
                  {/* Divider */}
                  <div className="border-t border-gray-200 my-2"></div>
                  
                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
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
                className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
              >
                <FiLogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm lg:text-base btn-primary"
          >
            <FiUser className="h-4 w-4 lg:h-5 lg:w-5" />
            <span className="hidden sm:inline">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 