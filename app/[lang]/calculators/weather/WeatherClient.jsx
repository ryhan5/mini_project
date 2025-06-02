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
  '03d': Cloud,     // Scattered clouds
  '03n': Cloud,
  '04d': Cloud,     // Broken clouds
  '04n': Cloud,
  '09d': CloudRain, // Shower rain
  '09n': CloudRain,
  '10d': CloudRain, // Rain
  '10n': CloudRain,
  '11d': CloudLightning, // Thunderstorm
  '11n': CloudLightning,
  '13d': CloudSnow, // Snow
  '13n': CloudSnow,
  '50d': CloudFog,  // Mist
  '50n': CloudFog,
};

export default function WeatherClient() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forecast, setForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    
    try {
      setLoading(true);
      setError('');
      
      // In a real app, you would call your API endpoint here
      // const data = await getWeatherData(location);
      
      // Mock data for demonstration
      const mockWeather = {
        temp: Math.round(Math.random() * 15 + 20), // 20-35°C
        feels_like: Math.round(Math.random() * 15 + 18),
        humidity: Math.round(Math.random() * 30 + 50), // 50-80%
        wind_speed: (Math.random() * 10 + 5).toFixed(1), // 5-15 km/h
        description: ['Clear sky', 'Partly cloudy', 'Scattered clouds', 'Light rain', 'Thunderstorm'][Math.floor(Math.random() * 5)],
        icon: ['01d', '02d', '03d', '10d', '11d'][Math.floor(Math.random() * 5)],
        sunrise: '06:30',
        sunset: '18:45',
        location: location
      };
      
      // Mock forecast data
      const mockForecast = Array.from({ length: 5 }, (_, i) => ({
        day: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
        temp_max: Math.round(Math.random() * 5 + 25), // 25-30°C
        temp_min: Math.round(Math.random() * 5 + 15), // 15-20°C
        icon: ['01d', '02d', '03d', '10d', '11d'][Math.floor(Math.random() * 5)],
        pop: Math.round(Math.random() * 30), // 0-30% chance of precipitation
      }));
      
      setWeather(mockWeather);
      setForecast(mockForecast);
      setSelectedDay(0);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get weather for first location on initial load
  useEffect(() => {
    if (locations.length > 0) {
      setLocation(locations[0]);
    }
  }, []);

  // Load weather for first location on mount
  useEffect(() => {
    if (location) {
      handleSearch({ preventDefault: () => {} });
    }
  }, [location]);

  const WeatherIcon = weather ? weatherIcons[weather.icon] || CloudSun : CloudSun;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Weather Impact Analysis</h1>
        <p className="text-gray-600">Check current weather conditions and forecast for your location</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Search and Current Weather */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  disabled={loading}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              <Button 
                type="submit" 
                className="w-full mt-3"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Get Weather'}
              </Button>
            </form>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm mb-6">
                {error}
              </div>
            )}

            {weather && (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <WeatherIcon className="h-16 w-16 text-yellow-500" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-1">
                  {weather.temp}°C
                </h2>
                <p className="text-gray-600 mb-4">{weather.description}</p>
                <p className="text-lg font-medium text-gray-900 mb-6">
                  {weather.location}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-center text-gray-500 mb-1">
                      <Wind className="h-5 w-5 mr-1" />
                      <span className="text-sm">Wind</span>
                    </div>
                    <p className="font-medium">{weather.wind_speed} km/h</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-center text-gray-500 mb-1">
                      <Droplets className="h-5 w-5 mr-1" />
                      <span className="text-sm">Humidity</span>
                    </div>
                    <p className="font-medium">{weather.humidity}%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-center text-gray-500 mb-1">
                      <Sunrise className="h-5 w-5 mr-1" />
                      <span className="text-sm">Sunrise</span>
                    </div>
                    <p className="font-medium">{weather.sunrise}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-center text-gray-500 mb-1">
                      <Sunset className="h-5 w-5 mr-1" />
                      <span className="text-sm">Sunset</span>
                    </div>
                    <p className="font-medium">{weather.sunset}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Forecast and Details */}
        <div className="lg:col-span-2">
          {weather ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">5-Day Forecast</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {forecast.map((day, index) => {
                  const Icon = weatherIcons[day.icon] || CloudSun;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDay(index)}
                      className={`p-3 rounded-lg transition-colors ${
                        selectedDay === index ? 'bg-green-50 border border-green-200' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <p className="font-medium text-gray-900">{day.day}</p>
                      <div className="flex justify-center my-2">
                        <Icon className="h-8 w-8 text-yellow-500" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{day.temp_max}°</span>
                        <span className="text-gray-500">{day.temp_min}°</span>
                      </div>
                      <div className="text-xs text-blue-600 mt-1">{day.pop}% precip</div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Weather Impact on Farming
                </h3>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Today's Conditions</h4>
                  <p className="text-blue-700 text-sm">
                    {weather.temp > 30
                      ? 'High temperatures may stress crops. Ensure adequate irrigation.'
                      : weather.temp < 15
                      ? 'Cool temperatures may slow crop growth. Consider using row covers for sensitive plants.'
                      : 'Ideal temperatures for most crops. Good growing conditions.'}
                  </p>
                  
                  {weather.description.toLowerCase().includes('rain') && (
                    <p className="text-blue-700 text-sm mt-2">
                      Rain expected today. Postpone any planned pesticide applications.
                    </p>
                  )}
                  
                  {weather.wind_speed > 15 && (
                    <p className="text-blue-700 text-sm mt-2">
                      High winds expected. Secure any loose equipment or structures.
                    </p>
                  )}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Recommended Actions</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>Check soil moisture levels before irrigating</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>Monitor for signs of heat stress in crops</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>Plan field work for early morning or late evening to avoid heat</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-white rounded-lg shadow p-12 text-center">
              <CloudSun className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No weather data</h3>
              <p className="text-gray-500">Select a location to view weather information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
