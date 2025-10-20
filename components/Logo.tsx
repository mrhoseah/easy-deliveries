import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-orange-500 to-yellow-400 rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300 relative overflow-hidden`}>
        {/* Running figure with food cloche */}
        <svg 
          viewBox="0 0 48 48" 
          className="w-6 h-6 text-white"
          fill="currentColor"
        >
          {/* Abstract running figure */}
          <path d="M12 32c-2-4-2-8 0-12 1-2 3-3 5-3s4 1 5 3c2 4 2 8 0 12-1 2-3 3-5 3s-4-1-5-3z" />
          <path d="M20 20c-1-2-1-4 0-6 1-1 2-2 3-2s2 1 3 2c1 2 1 4 0 6-1 1-2 2-3 2s-2-1-3-2z" />
          <path d="M28 16c-1-2-1-4 0-6 1-1 2-2 3-2s2 1 3 2c1 2 1 4 0 6-1 1-2 2-3 2s-2-1-3-2z" />
          
          {/* Food cloche */}
          <circle cx="32" cy="12" r="3" fill="currentColor" />
          <path d="M30 9c0-1 1-2 2-2s2 1 2 2v2c0 1-1 2-2 2s-2-1-2-2V9z" />
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Easy Deliveries
        </span>
      </div>
    </div>
  );
}
