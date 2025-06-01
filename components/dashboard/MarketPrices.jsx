'use client';

import { ArrowUpRight, TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MarketPrices({ 
  data = [], 
  title = 'Market Prices',
  className,
  ...props 
}) {
  if (!data.length) {
    return (
      <div className={cn('bg-white rounded-xl border border-gray-100 p-6', className)}>
        <p className="text-gray-500 text-center py-4">No market data available</p>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-xl border border-gray-100 overflow-hidden', className)} {...props}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <BarChart2 className="h-5 w-5" />
          </div>
        </div>
        
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">Per quintal</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">₹{item.price.toLocaleString()}</p>
                <div className={cn(
                  'flex items-center justify-end text-sm',
                  item.change >= 0 ? 'text-green-600' : 'text-red-600'
                )}>
                  {item.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(item.change)}%
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button 
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View market insights
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
