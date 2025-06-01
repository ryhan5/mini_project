'use client';

import { AlertCircle, Bell, X, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const alertIcons = {
  high: <AlertCircle className="h-5 w-5 text-red-500" />,
  medium: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  low: <Info className="h-5 w-5 text-blue-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
};

export function Alerts({ 
  alerts = [], 
  title = 'Alerts & Notifications',
  className,
  ...props 
}) {
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  const handleDismiss = (id) => {
    setDismissedAlerts(prev => [...prev, id]);
  };

  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));

  if (visibleAlerts.length === 0) {
    return (
      <div className={cn('bg-white rounded-xl border border-gray-100 p-6', className)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="p-2 rounded-lg bg-green-50 text-green-600">
            <CheckCircle className="h-5 w-5" />
          </div>
        </div>
        <p className="text-sm text-gray-500 text-center py-4">No new alerts</p>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-xl border border-gray-100 overflow-hidden', className)} {...props}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="p-2 rounded-lg bg-red-50 text-red-600">
            <Bell className="h-5 w-5" />
          </div>
        </div>
        
        <div className="space-y-3">
          {visibleAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={cn(
                'p-4 rounded-lg border-l-4 flex items-start',
                alert.priority === 'high' 
                  ? 'bg-red-50 border-red-500' 
                  : alert.priority === 'medium'
                    ? 'bg-yellow-50 border-yellow-500'
                    : 'bg-blue-50 border-blue-500'
              )}
            >
              <div className="flex-shrink-0 mt-0.5">
                {alertIcons[alert.priority] || alertIcons.info}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
              <button 
                onClick={() => handleDismiss(alert.id)}
                className="ml-2 text-gray-400 hover:text-gray-500"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Dismiss</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
