'use client';

import { cn } from '@/lib/utils';

export function StatsCard({ title, value, icon, change, description, className, ...props }) {
  return (
    <div 
      className={cn(
        'bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow',
        className
      )}
      {...props}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
              {change && (
                <span 
                  className={`inline-flex items-center text-xs font-medium px-1.5 py-0.5 rounded-full ${
                    change >= 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
                </span>
              )}
            </div>
            {description && (
              <p className="mt-1 text-xs text-gray-500">{description}</p>
            )}
          </div>
          {icon && (
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
