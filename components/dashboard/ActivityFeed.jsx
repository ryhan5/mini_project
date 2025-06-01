'use client';

import { Clock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const activityIcons = {
  irrigation: '💧',
  fertilizer: '🌱',
  'pest_control': '🐛',
  weather: '🌤️',
  market: '📈',
  default: '📌'
};

const activityColors = {
  completed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  warning: 'bg-orange-100 text-orange-800',
  error: 'bg-red-100 text-red-800'
};

export function ActivityFeed({ 
  activities = [], 
  title = 'Recent Activities',
  className,
  ...props 
}) {
  if (!activities.length) {
    return (
      <div className={cn('bg-white rounded-xl border border-gray-100 p-6', className)}>
        <p className="text-gray-500 text-center py-4">No activities found</p>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-xl border border-gray-100 overflow-hidden', className)} {...props}>
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id || index} className="flex items-start gap-3 group">
              <div className="mt-1 flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-lg">
                  {activityIcons[activity.type] || activityIcons.default}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{activity.name}</p>
                <div className="flex items-center mt-0.5">
                  <Clock className="h-3.5 w-3.5 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span 
                  className={cn(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    activityColors[activity.status] || 'bg-gray-100 text-gray-800'
                  )}
                >
                  {activity.status === 'completed' ? (
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 mr-1" />
                  )}
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
