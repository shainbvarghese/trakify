import React from 'react';

const GlassCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'p-4',
  rounded = 'rounded-2xl',
  shadow = 'shadow-md',
  ...props 
}) => {
  const baseClasses = 'backdrop-blur-md transition-all duration-300';
  
  const variants = {
    default: 'bg-white/30 dark:bg-[#1f1f1f]/30 border border-white/20 dark:border-gray-700/20',
    light: 'bg-white/40 dark:bg-gray-800/40 border border-white/30 dark:border-gray-600/30',
    heavy: 'bg-white/20 dark:bg-[#1f1f1f]/20 border border-white/10 dark:border-gray-800/10',
    colored: 'bg-blue-50/30 dark:bg-blue-900/30 border border-blue-200/30 dark:border-blue-700/30',
    success: 'bg-green-50/30 dark:bg-green-900/30 border border-green-200/30 dark:border-green-700/30',
    warning: 'bg-yellow-50/30 dark:bg-yellow-900/30 border border-yellow-200/30 dark:border-yellow-700/30',
    error: 'bg-red-50/30 dark:bg-red-900/30 border border-red-200/30 dark:border-red-700/30',
  };

  const combinedClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${padding}
    ${rounded}
    ${shadow}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
};

export default GlassCard; 