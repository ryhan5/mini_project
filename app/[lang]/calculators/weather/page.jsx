'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  CloudSun, 
  MapPin, 
  Wind, 
  Droplets, 
  ThermometerSun, 
  Sun, 
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Sunrise,
  Sunset
} from 'lucide-react';
import { getWeatherData } from '@/lib/weather';

const locations = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata',
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];

// Weather condition icons
const weatherIcons = {
  '01d': Sun,       // Clear sky (day)
  '01n': Sun,       // Clear sky (night)
  '02d': CloudSun,  // Few clouds (day)
  '02n': CloudSun,  // Few clouds (night)
  '03d': Cloud,     // Scattered clouds (day)
  '03n': Cloud,     // Scattered clouds (night)
  '04d': Cloud,     // Broken clouds (day)
  '04n': Cloud,     // Broken clouds (night)
  '09d': CloudRain, // Shower rain (day)
  '09n': CloudRain, // Shower rain (night)
  '10d': CloudRain, // Rain (day)
  '10n': CloudRain, // Rain (night)
  '11d': CloudLightning, // Thunderstorm (day)
  '11n': CloudLightning, // Thunderstorm (night)
  '13d': CloudSnow, // Snow (day)
  '13n': CloudSnow, // Snow (night)
  '50d': CloudFog,  // Mist (day)
  '50n': CloudFog,  // Mist (night)
};

export default function WeatherTracking() {
  const [location, setLocation] = useState('Delhi');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch weather data when component mounts or location changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getWeatherData(location);
        setWeatherData(data);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to fetch weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  // Handle location update
  const handleLocationUpdate = (e) => {
    e.preventDefault();
    // The effect will trigger when location state changes
  };

  // Get weather icon component
  const getWeatherIcon = (condition, icon) => {
    const IconComponent = weatherIcons[icon] || Sun;
    const color = condition === 'Clear' ? 'text-yellow-500' : 'text-blue-500';
    return <IconComponent className={`h-8 w-8 ${color}`} />;
  };

  if (loading && !weatherData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-md">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-100/20 backdrop-blur-sm text-sm font-medium text-white mb-4">
              <CloudSun className="h-4 w-4 mr-2" />
              <span>Weather Tracking</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Agricultural Weather Forecast</h1>
            <p className="text-lg text-green-100 max-w-2xl">
              Get detailed weather insights and agricultural forecasts to plan your farming activities effectively.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Location Selection */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <form onSubmit={handleLocationUpdate} className="w-full">
                <div className="flex items-center space-x-4">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <select
                    className="flex-1 rounded-md border border-gray-300 shadow-sm px-3 py-2"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={loading}
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <Button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Location'}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Current Weather */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-medium text-gray-900">Current Weather</h3>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-4xl font-bold text-gray-900">{weatherData.current.temp}°C</p>
                  <p className="text-gray-500 capitalize">{weatherData.current.description}</p>
                </div>
                {getWeatherIcon(weatherData.current.condition, weatherData.current.icon)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Wind className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Wind Speed</p>
                    <p className="font-medium">{weatherData.current.windSpeed} km/h</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="font-medium">{weatherData.current.humidity}%</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <ThermometerSun className="h-5 w-5 text-orange-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">UV Index</p>
                    <p className="font-medium">{weatherData.current.uv}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <CloudSun className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Rainfall</p>
                    <p className="font-medium">{weatherData.current.rainfall} mm</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 5-Day Forecast */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-medium text-gray-900">5-Day Forecast</h3>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                {weatherData.forecast.map((day, index) => {
                  const WeatherIcon = weatherIcons[day.icon] || Sun;
                  const iconColor = day.condition === 'Clear' ? 'text-yellow-500' : 'text-blue-500';
                  
                  return (
                    <div key={`${day.day}-${index}`} className="flex items-center justify-between py-2">
                      <p className="text-gray-500 font-medium">{day.day}</p>
                      <div className="flex items-center space-x-4">
                        <WeatherIcon className={`h-5 w-5 ${iconColor}`} />
                        <p className="font-medium w-12 text-right">{day.temp}°C</p>
                        <p className="text-sm text-gray-500 w-24 capitalize">{day.condition.toLowerCase()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Agricultural Insights */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-medium text-gray-900">Agricultural Insights</h3>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600">Soil Temperature</p>
                  <p className="text-xl font-bold text-green-700">{weatherData.agricultural.soilTemp}°C</p>
                  <p className="text-xs text-green-500 mt-1">Ideal range: 15-30°C</p>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600">Soil Moisture</p>
                  <p className="text-xl font-bold text-blue-700">{weatherData.agricultural.soilMoisture}</p>
                  <p className="text-xs text-blue-500 mt-1">
                    {weatherData.agricultural.soilMoisture === 'High' ? 'Ideal for most crops' : 
                     weatherData.agricultural.soilMoisture === 'Low' ? 'Consider irrigation' : 'Good condition'}
                  </p>
                </div>
                
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-600">Evaporation Rate</p>
                  <p className="text-xl font-bold text-orange-700">{weatherData.agricultural.evaporation}</p>
                  <p className="text-xs text-orange-500 mt-1">
                    {weatherData.agricultural.evaporation === 'High' ? 'Increased water loss' : 
                     weatherData.agricultural.evaporation === 'Low' ? 'Minimal water loss' : 'Moderate water loss'}
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600">Growing Degree Days</p>
                  <p className="text-xl font-bold text-purple-700">{weatherData.agricultural.growingDegreeDay}</p>
                  <p className="text-xs text-purple-500 mt-1">Base 10°C for most crops</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}