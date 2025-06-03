'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Activity, 
  Droplet, 
  Thermometer, 
  Sun,
  CloudSun,
  CloudRain,
  Bug, 
  Wind, 
  Calendar, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Leaf,
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  Cloudy,
  SunDim,
  Sunrise,
  Sunset,
  Wind as WindIcon,
  Droplets,
  Gauge,
  BarChart2,
  RefreshCw,
  Plus,
  Clock,
  Calendar as CalendarIcon,
  ArrowRight,
  Droplets as WaterIcon,
  Zap,
  CheckCircle2,
  AlertCircle,
  Clock as ClockIcon,
  CalendarDays,
  ArrowRightCircle,
  Droplet as RainIcon,
  ThermometerSun,
  Wind as WindSpeedIcon,
  Droplet as HumidityIcon,
  Sun as SunIcon,
  Moon,
  Cloudy as CloudyIcon,
  CloudRainWind,
  CloudLightning as CloudLightningIcon
} from 'lucide-react';

// Weather icon component with more conditions and animations
const WeatherIcon = ({ condition, className = 'h-6 w-6', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10',
  };

  const iconClasses = `${sizeClasses[size] || sizeClasses.md} ${className}`;

  const icons = {
    'clear-day': <Sun className={iconClasses} />,
    'clear-night': <Moon className={iconClasses} />,
    'partly-cloudy-day': <CloudSun className={iconClasses} />,
    'partly-cloudy-night': <CloudyIcon className={iconClasses} />,
    cloudy: <Cloudy className={iconClasses} />,
    fog: <Cloud className={iconClasses} />,
    wind: <WindIcon className={iconClasses} />,
    rain: <CloudRain className={iconClasses} />,
    sleet: <CloudDrizzle className={iconClasses} />,
    snow: <CloudSnow className={iconClasses} />,
    hail: <CloudRainWind className={iconClasses} />,
    thunderstorm: <CloudLightningIcon className={iconClasses} />,
    tornado: <WindIcon className={iconClasses} />,
  };

  return icons[condition] || <CloudSun className={iconClasses} />;
};

// Stat card component with animations and improved layout
const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  unit, 
  description, 
  loading = false, 
  className = '' 
}) => {
  const ChangeIcon = change > 0 ? TrendingUp : change < 0 ? TrendingDown : null;
  const changeColor = change > 0 ? 'text-green-600' : 'text-red-600';
  
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {loading ? (
            <div className="h-8 w-24 bg-gray-200 rounded-md mt-2 animate-pulse"></div>
          ) : (
            <div className="flex items-baseline mt-1">
              <span className="text-2xl font-bold text-gray-900">{value}</span>
              {unit && <span className="ml-1 text-sm text-gray-500">{unit}</span>}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${loading ? 'bg-gray-100' : 'bg-blue-50'} text-blue-600`}>
          {loading ? (
            <div className="h-6 w-6 rounded-full bg-gray-200"></div>
          ) : (
            icon
          )}
        </div>
      </div>
      
      {!loading && (change || description) && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {change !== undefined && (
            <div className={`flex items-center text-sm ${changeColor}`}>
              <ChangeIcon className="h-4 w-4 mr-1" />
              <span>{Math.abs(change)}% from yesterday</span>
            </div>
          )}
          {description && (
            <p className="mt-1 text-xs text-gray-500">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Activity item component with improved layout and animations
const ActivityItem = ({ 
  type, 
  name, 
  time, 
  status, 
  description, 
  priority = 'medium',
  lang 
}) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  const statusIcons = {
    completed: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    warning: <AlertCircle className="h-4 w-4 text-yellow-500" />,
    error: <AlertTriangle className="h-4 w-4 text-red-500" />,
    info: <ClockIcon className="h-4 w-4 text-blue-500" />,
  };

  return (
    <div className="flex items-start py-3 hover:bg-gray-50 px-2 rounded-lg transition-colors">
      <div className="flex-shrink-0 mt-1">
        <div className={`h-2 w-2 rounded-full ${priorityColors[priority]}`}></div>
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <div className="ml-2 flex-shrink-0 flex">
            {statusIcons[status]}
          </div>
        </div>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="mt-1 flex items-center text-xs text-gray-400">
          <Clock className="h-3 w-3 mr-1" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

const DashboardClient = ({ lang }) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [cropHealth, setCropHealth] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mock data - in a real app, this would be an API call
      setWeatherData({
        temperature: 24,
        humidity: 65,
        windSpeed: 12,
        rainfall: 0,
        condition: 'partly-cloudy-day',
        forecast: [
          { day: 'Mon', high: 26, low: 18, condition: 'clear-day' },
          { day: 'Tue', high: 28, low: 19, condition: 'partly-cloudy-day' },
          { day: 'Wed', high: 25, low: 17, condition: 'rain' },
          { day: 'Thu', high: 23, low: 16, condition: 'cloudy' },
          { day: 'Fri', high: 27, low: 18, condition: 'clear-day' },
        ]
      });

      setCropHealth({
        overall: 92,
        issues: 2,
        needsAttention: 1,
        healthy: 45,
      });

      setActivities([
        {
          id: 1,
          type: 'irrigation',
          name: 'Irrigation System',
          time: '10 minutes ago',
          status: 'completed',
          description: 'Field A1 irrigation completed',
          priority: 'low'
        },
        {
          id: 2,
          type: 'pest',
          name: 'Pest Alert',
          time: '2 hours ago',
          status: 'warning',
          description: 'Potential pest activity detected in Field B2',
          priority: 'high'
        },
        {
          id: 3,
          type: 'weather',
          name: 'Weather Alert',
          time: '5 hours ago',
          status: 'info',
          description: 'Rain expected tomorrow',
          priority: 'medium'
        },
        {
          id: 4,
          type: 'soil',
          name: 'Soil Moisture',
          time: 'Yesterday',
          status: 'error',
          description: 'Low soil moisture in Field C3',
          priority: 'high'
        },
      ]);

      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                {selectedTimeRange === 'today' ? "Today's" : 'Weekly'} overview and insights
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedTimeRange('today')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  selectedTimeRange === 'today' 
                    ? 'bg-green-100 text-green-800' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setSelectedTimeRange('week')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  selectedTimeRange === 'week' 
                    ? 'bg-green-100 text-green-800' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                This Week
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Temperature"
            value={weatherData?.temperature || '--'}
            unit="°C"
            icon={<ThermometerSun className="h-6 w-6" />}
            change={2.5}
            description="Ideal for most crops"
            loading={isLoading}
          />
          <StatCard
            title="Humidity"
            value={weatherData?.humidity || '--'}
            unit="%"
            icon={<HumidityIcon className="h-6 w-6" />}
            change={-1.2}
            description="Slightly high"
            loading={isLoading}
          />
          <StatCard
            title="Wind Speed"
            value={weatherData?.windSpeed || '--'}
            unit="km/h"
            icon={<WindSpeedIcon className="h-6 w-6" />}
            change={5.3}
            description="Normal conditions"
            loading={isLoading}
          />
          <StatCard
            title="Crop Health"
            value={cropHealth?.overall || '--'}
            unit="%"
            icon={<Leaf className="h-6 w-6 text-green-600" />}
            change={1.8}
            description={`${cropHealth?.issues || 0} issues found`}
            loading={isLoading}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Weather Forecast */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Weather Forecast</h2>
                <div className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                  <span>View details</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
              
              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center">
                        <WeatherIcon 
                          condition={weatherData?.condition} 
                          size="xl" 
                          className="text-yellow-500" 
                        />
                        <span className="ml-3 text-4xl font-bold text-gray-900">
                          {weatherData?.temperature}°C
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Feels like {weatherData?.temperature + 2}°C
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Humidity</p>
                      <p className="text-lg font-medium text-gray-900">{weatherData?.humidity}%</p>
                      <p className="mt-1 text-sm text-gray-500">Wind</p>
                      <p className="text-lg font-medium text-gray-900">{weatherData?.windSpeed} km/h</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">5-DAY FORECAST</h3>
                    <div className="grid grid-cols-5 gap-4">
                      {weatherData?.forecast?.map((day, index) => (
                        <div key={index} className="text-center">
                          <p className="text-sm font-medium text-gray-500">{day.day}</p>
                          <div className="my-2">
                            <WeatherIcon 
                              condition={day.condition} 
                              className="mx-auto text-blue-500"
                            />
                          </div>
                          <div className="flex justify-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">{day.high}°</span>
                            <span className="text-sm text-gray-400">{day.low}°</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="bg-white shadow-sm rounded-xl p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View all
                </button>
              </div>
              
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {activities.map((activity) => (
                    <ActivityItem key={activity.id} {...activity} lang={lang} />
                  ))}
                </div>
              )}
              
              <button className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100">
                <Plus className="h-4 w-4 mr-2" />
                Add Note
              </button>
            </div>
          </div>
        </div>

        {/* Crop Health Overview */}
        <div className="mt-8">
          <div className="bg-white shadow-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Crop Health Overview</h2>
              <div className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                <span>View all fields</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
            
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="bg-green-50 rounded-lg p-4 h-full flex flex-col justify-center">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800">Overall Health</p>
                        <p className="mt-1 text-3xl font-bold text-green-900">
                          {cropHealth?.overall}%
                        </p>
                        <p className="mt-1 text-sm text-green-700">
                          {cropHealth?.healthy} out of {cropHealth?.healthy + cropHealth?.issues} fields in good condition
                        </p>
                      </div>
                      <div className="h-24 w-24 rounded-full border-8 border-green-200 flex items-center justify-center">
                        <span className="text-2xl font-bold text-green-800">{cropHealth?.overall}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white border border-red-100 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-red-100 rounded-full text-red-600 mr-3">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Needs Attention</p>
                        <p className="text-2xl font-bold text-red-600">{cropHealth?.needsAttention || 0}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-yellow-100 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-full text-yellow-600 mr-3">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Issues Detected</p>
                        <p className="text-2xl font-bold text-yellow-600">{cropHealth?.issues || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardClient;
