'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Droplet, 
  Thermometer, 
  Sun,
  Wind,
  Droplets,
  Gauge,
  Cloud,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  SunDim,
  Sunrise,
  Sunset,
  Wind as WindIcon,
  Calendar as CalendarIcon,
  Clock,
  Plus,
  BarChart2,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

// Import components
import { StatsCard } from '@/components/dashboard/StatsCard';
import { WeatherCard } from '@/components/dashboard/WeatherCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { MarketPrices } from '@/components/dashboard/MarketPrices';
import { Alerts } from '@/components/dashboard/Alerts';

// Helper functions
const formatDate = (date, lang = 'en') => {
  return new Intl.DateTimeFormat(lang, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const getGreeting = (hour) => {
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

export default function DashboardPage({ params }) {
  const { lang = 'en' } = params;
  const { currentLanguage = 'en' } = useLanguage?.() || {};
  
  // Current date and time
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const greeting = getGreeting(currentHour);
  
  // Sample data - replace with real data from your API
  const [weatherData] = useState({
    temperature: 28,
    humidity: 65,
    rainfall: 15,
    windSpeed: 12,
    pressure: 1013,
    condition: 'sunny',
    location: 'Punjab, India',
    forecast: [
      { day: 'Mon', temp: 28, condition: 'sunny' },
      { day: 'Tue', temp: 27, condition: 'partly-cloudy' },
      { day: 'Wed', temp: 26, condition: 'rain' },
      { day: 'Thu', temp: 25, condition: 'rain' },
      { day: 'Fri', temp: 27, condition: 'partly-cloudy' },
    ]
  });

  const [marketData] = useState([
    { id: 1, name: 'Rice', price: 2200, change: 2.5 },
    { id: 2, name: 'Wheat', price: 1850, change: -1.2 },
    { id: 3, name: 'Corn', price: 1600, change: 0.8 },
  ]);

  const [activities] = useState([
    { 
      id: 1, 
      type: 'irrigation', 
      name: 'Field A Irrigation',
      time: '2 hours ago', 
      status: 'completed' 
    },
    { 
      id: 2, 
      type: 'fertilizer', 
      name: 'Organic Fertilizer Application',
      time: '1 day ago', 
      status: 'pending' 
    },
    { 
      id: 3, 
      type: 'pest_control', 
      name: 'Pest Control - Field B',
      time: '3 days ago', 
      status: 'completed' 
    },
  ]);

  const [alerts] = useState([
    { 
      id: 1, 
      type: 'weather', 
      message: 'Heavy rain expected tomorrow in your area. Prepare your fields accordingly.', 
      time: '2 hours ago',
      priority: 'high'
    },
    { 
      id: 2, 
      type: 'pest', 
      message: 'Pest alert: Increased locust activity reported in nearby regions.', 
      time: '1 day ago',
      priority: 'high'
    },
    { 
      id: 3, 
      type: 'market', 
      message: 'Rice prices have increased by 5% in the local market.', 
      time: '3 days ago',
      priority: 'medium'
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{greeting}, Farmer!</h1>
              <p className="text-sm text-gray-500">{formatDate(currentDate, currentLanguage)}</p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4
            ">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
              <button
                type="button"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Activity
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            title="Soil Moisture"
            value="65%"
            icon={<Droplet className="h-6 w-6 text-blue-500" />}
            change={-2.5}
            description="Optimal range: 60-70%"
          />
          <StatsCard
            title="Temperature"
            value="28°C"
            icon={<Thermometer className="h-6 w-6 text-red-500" />}
            change={1.2}
            description="Feels like 30°C"
          />
          <StatsCard
            title="Humidity"
            value="65%"
            icon={<Droplets className="h-6 w-6 text-cyan-500" />}
            change={-0.5}
            description="Ideal for crops"
          />
          <StatsCard
            title="Wind Speed"
            value="12 km/h"
            icon={<Wind className="h-6 w-6 text-purple-500" />}
            change={-1.8}
            description="Light breeze"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weather Card */}
            <WeatherCard 
              temperature={weatherData.temperature}
              condition={weatherData.condition}
              location={weatherData.location}
              forecast={weatherData.forecast}
            />

            {/* Activities */}
            <ActivityFeed 
              activities={activities}
              title="Recent Activities"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Market Prices */}
            <MarketPrices 
              data={marketData}
              title="Market Prices"
            />

            {/* Alerts */}
            <Alerts 
              alerts={alerts}
              title="Alerts & Notifications"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
