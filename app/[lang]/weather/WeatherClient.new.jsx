'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  Droplets, 
  Wind as WindIcon,
  Thermometer,
  Search,
  Droplet,
  CloudSun
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Weather icon component
const WeatherIcon = ({ condition, className = '', size = 'default' }) => {
  const sizeMap = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10',
    '2xl': 'h-16 w-16',
    '3xl': 'h-20 w-20'
  };

  const iconMap = {
    'clear': <Sun className={`${sizeMap[size]} text-amber-400 ${className}`} />,
    'partly-cloudy': <CloudSun className={`${sizeMap[size]} text-gray-400 ${className}`} />,
    'cloudy': <Cloud className={`${sizeMap[size]} text-gray-400 ${className}`} />,
    'rain': <CloudRain className={`${sizeMap[size]} text-blue-400 ${className}`} />,
    'drizzle': <Droplets className={`${sizeMap[size]} text-blue-300 ${className}`} />
  };

  return iconMap[condition] || iconMap['clear'];
};

// Helper functions
const getIrrigationRecommendation = (weather, soilMoisture) => {
  const { precipitation } = weather;
  
  if (precipitation > 50) {
    return { status: 'not_needed', message: 'No irrigation needed - sufficient rain expected' };
  }
  
  if (soilMoisture < 30) {
    return { status: 'high', message: 'High irrigation needed - soil is dry' };
  } else if (soilMoisture < 60) {
    return { status: 'moderate', message: 'Moderate irrigation recommended' };
  } else {
    return { status: 'low', message: 'Low irrigation - soil has sufficient moisture' };
  }
};

// Soil Moisture Card Component
const SoilMoistureCard = ({ moisture, onAdjust }) => (
  <Card>
    <CardHeader>
      <CardTitle>Soil Moisture</CardTitle>
      <CardDescription>Current soil moisture level</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">{moisture}%</div>
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Dry</span>
            <span>Optimal</span>
            <span>Wet</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={moisture}
            onChange={(e) => onAdjust(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Irrigation Status Component
const IrrigationStatus = ({ recommendation }) => (
  <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <Droplet className="h-5 w-5 text-blue-400" />
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-blue-800">
          {recommendation.status === 'not_needed' ? 'No Irrigation Needed' : 
           recommendation.status === 'high' ? 'High Irrigation Recommended' :
           recommendation.status === 'moderate' ? 'Moderate Irrigation' : 'Low Irrigation'}
        </h3>
        <div className="mt-1 text-sm text-blue-700">
          <p>{recommendation.message}</p>
        </div>
      </div>
    </div>
  </div>
);

// Main Weather Page Component
export default function WeatherPage() {
  const [location, setLocation] = useState('Karnal, Haryana');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [soilMoisture, setSoilMoisture] = useState(45);
  const [irrigationRecommendation, setIrrigationRecommendation] = useState(null);

  // Mock data
  const mockWeatherData = {
    location: 'Karnal, Haryana',
    current: {
      temp: 28,
      condition: 'partly-cloudy',
      humidity: 65,
      wind: 12,
      precipitation: 30,
      sunrise: '06:15 AM',
      sunset: '06:45 PM',
      feels_like: 30,
      hourly: Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        temp: 22 + Math.round(Math.sin(i / 24 * Math.PI) * 10),
        condition: ['clear', 'partly-cloudy', 'cloudy', 'rain'][Math.floor(Math.random() * 4)],
        precipitation: Math.floor(Math.random() * 30)
      }))
    },
    forecast: [
      { day: 'Mon', temp: 28, condition: 'partly-cloudy', precipitation: 30, wind: 12, humidity: 65 },
      { day: 'Tue', temp: 30, condition: 'sunny', precipitation: 10, wind: 8, humidity: 55 },
      { day: 'Wed', temp: 26, condition: 'rain', precipitation: 80, wind: 15, humidity: 85 },
      { day: 'Thu', temp: 25, condition: 'cloudy', precipitation: 60, wind: 12, humidity: 75 },
      { day: 'Fri', temp: 29, condition: 'partly-cloudy', precipitation: 20, wind: 10, humidity: 60 },
    ]
  };

  // Update irrigation recommendation
  useEffect(() => {
    if (weatherData?.current) {
      const rec = getIrrigationRecommendation(weatherData.current, soilMoisture);
      setIrrigationRecommendation(rec);
    }
  }, [weatherData, soilMoisture]);

  // Load initial data
  useEffect(() => {
    const timer = setTimeout(() => {
      setWeatherData(mockWeatherData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    
    setLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      setWeatherData({
        ...mockWeatherData,
        location: location
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  };

  const handleSoilMoistureChange = (value) => {
    setSoilMoisture(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Weather & Irrigation</h1>
              <p className="text-green-100 text-lg">Real-time weather data and smart irrigation recommendations</p>
            </div>
            
            <form onSubmit={handleSearch} className="w-full md:w-auto">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location (e.g., Karnal, Haryana)"
                    className="pl-10 w-full md:w-80 bg-white/10 border-white/20 text-white placeholder-green-200 focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-white text-green-700 hover:bg-green-50 px-6"
                >
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {weatherData && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Weather Card */}
              <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">Current Weather</CardTitle>
                        <CardDescription className="text-base">
                          {new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {weatherData.current.condition.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="relative">
                          <WeatherIcon condition={weatherData.current.condition} className="h-28 w-28" />
                        </div>
                        <div>
                          <div className="text-6xl font-bold text-gray-900">{weatherData.current.temp}°C</div>
                          <div className="text-lg text-gray-600">
                            Feels like {weatherData.current.feels_like}°C • {weatherData.location}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 md:mt-0 bg-gray-50 p-4 rounded-lg">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Droplets className="h-4 w-4 mr-1 text-blue-500" />
                            Humidity
                          </div>
                          <div className="text-xl font-semibold">{weatherData.current.humidity}%</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <WindIcon className="h-4 w-4 mr-1 text-blue-500" />
                            Wind
                          </div>
                          <div className="text-xl font-semibold">{weatherData.current.wind} km/h</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <CloudRain className="h-4 w-4 mr-1 text-blue-500" />
                            Precip
                          </div>
                          <div className="text-xl font-semibold">{weatherData.current.precipitation}%</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Soil Moisture Card */}
                <SoilMoistureCard 
                  moisture={soilMoisture} 
                  onAdjust={handleSoilMoistureChange} 
                />

                {/* 5-Day Forecast */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">5-Day Forecast</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {weatherData.forecast.map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="w-20 font-medium">{day.day}</span>
                        <div className="flex-1 px-4">
                          <div className="flex justify-center">
                            <WeatherIcon condition={day.condition} size="lg" />
                          </div>
                        </div>
                        <div className="w-20 text-right">
                          <span className="font-medium">{day.temp}°</span>
                          <span className="text-sm text-gray-500 ml-2">{day.precipitation}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Irrigation Status */}
                {irrigationRecommendation && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Irrigation Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <IrrigationStatus recommendation={irrigationRecommendation} />
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Additional Weather Details */}
            <Card>
              <CardHeader>
                <CardTitle>Weather Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="p-3 rounded-full bg-blue-50 text-blue-500 mr-4">
                      <Thermometer className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Feels Like</p>
                      <p className="text-lg font-semibold">{weatherData.current.feels_like}°C</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="p-3 rounded-full bg-green-50 text-green-500 mr-4">
                      <Droplet className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Humidity</p>
                      <p className="text-lg font-semibold">{weatherData.current.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="p-3 rounded-full bg-purple-50 text-purple-500 mr-4">
                      <WindIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Wind Speed</p>
                      <p className="text-lg font-semibold">{weatherData.current.wind} km/h</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="p-3 rounded-full bg-amber-50 text-amber-500 mr-4">
                      <Sun className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">UV Index</p>
                      <p className="text-lg font-semibold">
                        {weatherData.current.condition === 'sunny' ? 'High' : 'Moderate'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
