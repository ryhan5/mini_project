'use client';

import { cn } from '@/lib/utils';

const WeatherIcon = ({ condition, className = 'h-6 w-6' }) => {
  const iconMap = {
    sunny: '☀️',
    'partly-cloudy': '⛅',
    cloudy: '☁️',
    rain: '🌧️',
    drizzle: '🌦️',
    thunderstorm: '⛈️',
    snow: '❄️',
    mist: '🌫️',
    clear: '☀️',
    sunrise: '🌅',
    sunset: '🌇',
    wind: '💨',
    humidity: '💧',
    pressure: '📊'
  };

  return (
    <span className={cn('text-3xl', className)}>
      {iconMap[condition] || '🌡️'}
    </span>
  );
};

export function WeatherCard({ 
  temperature, 
  condition, 
  location, 
  forecast = [],
  className,
  ...props 
}) {
  return (
    <div 
      className={cn(
        'bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white overflow-hidden shadow-lg',
        className
      )}
      {...props}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">Weather</h3>
            <p className="text-sm opacity-80">{location || 'Your Location'}</p>
          </div>
          <div className="text-4xl">
            <WeatherIcon condition={condition} />
          </div>
        </div>
        
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-5xl font-bold">{temperature}°</p>
            <p className="capitalize">{condition?.replace('-', ' ')}</p>
          </div>
          
          {forecast.length > 0 && (
            <div className="text-right">
              <p className="text-sm opacity-80">Next 3 days</p>
              <div className="flex gap-4 mt-2">
                {forecast.slice(0, 3).map((day, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-xs">{day.day}</span>
                    <span className="text-xl"><WeatherIcon condition={day.condition} className="h-5 w-5" /></span>
                    <span className="text-sm font-medium">{day.temp}°</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
