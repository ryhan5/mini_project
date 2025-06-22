'use client';

import { cn } from '@/lib/utils';

const LoadingSpinner = ({ 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-2',
    xl: 'h-10 w-10 border-2',
    '2xl': 'h-16 w-16 border-4',
    '3xl': 'h-20 w-20 border-4'
  };

  return (
    <div 
      className={cn(
        'animate-spin rounded-full border-t-2 border-b-2 border-green-600',
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
