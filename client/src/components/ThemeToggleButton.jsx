import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggleButton = ({ 
  variant = 'default',
  showText = false,
  size = 'md',
  className = '',
  ...props 
}) => {
  const { isDark, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const variants = {
    default: 'bg-black/20 dark:bg-white/10 text-white dark:text-gray-200 hover:bg-black/30 dark:hover:bg-white/20',
    outlined: 'border border-white/30 dark:border-gray-600/30 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20',
    filled: 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600',
    glass: 'bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-600/30 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-800/30'
  };

  const baseClasses = `
    rounded-xl backdrop-blur-sm transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800
    ${sizeClasses[size]}
    ${variants[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      onClick={toggleTheme}
      className={baseClasses}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      {...props}
    >
      {isDark ? (
        <div className="flex items-center gap-2">
          <FiSun className={iconSizes[size]} />
          {showText && <span>Light</span>}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <FiMoon className={iconSizes[size]} />
          {showText && <span>Dark</span>}
        </div>
      )}
    </button>
  );
};

export default ThemeToggleButton; 