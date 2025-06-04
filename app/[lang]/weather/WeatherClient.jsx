'use client';

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudRain, 
  Sun, 
  Cloud,
  Cloudy,
  CloudFog,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  CloudHail,
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
    'sunny': <Sun className={`${sizeMap[size] || ''} text-amber-400 ${className}`} />,
    'partly-cloudy': <CloudSun className={`${sizeMap[size] || ''} text-amber-400 ${className}`} />,
    'cloudy': <Cloudy className={`${sizeMap[size] || ''} text-gray-400 ${className}`} />,
    'overcast': <Cloud className={`${sizeMap[size] || ''} text-gray-500 ${className}`} />,
    'fog': <CloudFog className={`${sizeMap[size] || ''} text-gray-400 ${className}`} />,
    'haze': <CloudFog className={`${sizeMap[size] || ''} text-gray-400 ${className}`} />,
    'rain': <CloudRain className={`${sizeMap[size] || ''} text-blue-400 ${className}`} />,
    'drizzle': <CloudDrizzle className={`${sizeMap[size] || ''} text-blue-300 ${className}`} />,
    'thunderstorm': <CloudLightning className={`${sizeMap[size] || ''} text-purple-500 ${className}`} />,
    'snow': <CloudSnow className={`${sizeMap[size] || ''} text-blue-100 ${className}`} />,
    'sleet': <CloudHail className={`${sizeMap[size] || ''} text-blue-200 ${className}`} />,
    'hail': <CloudHail className={`${sizeMap[size] || ''} text-blue-200 ${className}`} />
  };

  return iconMap[condition] || <Sun className={`${sizeMap[size] || ''} text-amber-400 ${className}`} />;
};

const getIrrigationRecommendation = (weather, soilMoisture) => {
  if (weather.precipitation > 70) return {
    status: 'Not Needed',
    message: 'Sufficient rainfall expected in your area',
    icon: <CloudRain className="h-5 w-5 text-blue-500" />,
    color: 'bg-blue-50 text-blue-800',
    border: 'border-blue-100',
    action: 'No irrigation needed for next 24 hours'
  };
  
  if (weather.temp > 30 && weather.humidity < 50) return {
    status: 'Recommended',
    message: 'High temperature and low humidity detected',
    icon: <ThermometerSun className="h-5 w-5 text-amber-500" />,
    color: 'bg-amber-50 text-amber-800',
    border: 'border-amber-100',
    action: 'Schedule irrigation in the early morning'
  };
  
  if (soilMoisture < 30) return {
    status: 'Required',
    message: 'Soil moisture critically low',
    icon: <DropletOff className="h-5 w-5 text-red-500" />,
    color: 'bg-red-50 text-red-800',
    border: 'border-red-100',
    action: 'Immediate irrigation recommended'
  };
  
  if (soilMoisture < 60) return {
    status: 'Suggested',
    message: 'Soil moisture below optimal level',
    icon: <Droplet className="h-5 w-5 text-blue-500" />,
    color: 'bg-blue-50 text-blue-800',
    border: 'border-blue-100',
    action: 'Light irrigation suggested'
  };
  
  return {
    status: 'Optimal',
    message: 'Soil moisture at optimal level',
    icon: <Droplet className="h-5 w-5 text-green-500" />,
    color: 'bg-green-50 text-green-800',
    border: 'border-green-100',
    action: 'No irrigation needed at this time'
  };
};

const getSoilMoistureLevel = (moisture) => {
  if (moisture < 20) return { level: 'Critical', color: 'bg-red-500', bg: 'bg-red-100', border: 'border-red-200', icon: <DropletOff className="h-4 w-4 text-red-500" /> };
  if (moisture < 40) return { level: 'Dry', color: 'bg-orange-400', bg: 'bg-orange-50', border: 'border-orange-100', icon: <Droplet className="h-4 w-4 text-orange-500" /> };
  if (moisture < 60) return { level: 'Moderate', color: 'bg-yellow-400', bg: 'bg-yellow-50', border: 'border-yellow-100', icon: <Droplet className="h-4 w-4 text-yellow-500" /> };
  if (moisture < 80) return { level: 'Ideal', color: 'bg-green-500', bg: 'bg-green-50', border: 'border-green-100', icon: <Droplet className="h-4 w-4 text-green-500" /> };
  return { level: 'Saturated', color: 'bg-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', icon: <Droplets className="h-4 w-4 text-blue-500" /> };
};

const getEvapotranspirationRate = (temp, humidity, wind, solarRadiation = 15) => {
  // Modified FAO Penman-Monteith equation (simplified)
  const delta = 0.408; // Slope of saturation vapor pressure curve (kPa/°C)
  const gamma = 0.067; // Psychrometric constant (kPa/°C)
  const u2 = Math.max(0.5, Math.min(wind, 10)); // Wind speed at 2m height (m/s), capped
  
  // Calculate saturation vapor pressure (es) and actual vapor pressure (ea)
  const es = 0.6108 * Math.exp((17.27 * temp) / (temp + 237.3));
  const ea = (humidity / 100) * es;
  
  // Calculate reference evapotranspiration (ET0) in mm/day
  const numerator = (0.408 * delta * (solarRadiation * 0.0864) + gamma * (900 / (temp + 273)) * u2 * (es - ea));
  const denominator = delta + gamma * (1 + 0.34 * u2);
  const et0 = numerator / denominator;
  
  return Math.max(0, et0).toFixed(1);
};

const WeatherCard = ({ day, temp, condition, precipitation, wind, humidity, sunrise, sunset, isToday = false }) => {
  const moistureLevel = getSoilMoistureLevel(humidity);
  const tempInt = Math.round(temp);
  const conditionText = condition.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return (
    <motion.div 
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md ${isToday ? 'ring-2 ring-green-500' : ''}`}
    >
      <div className="absolute top-0 right-0 p-2 bg-green-100 text-green-800 text-xs font-medium rounded-bl-lg">
        {day}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-gray-900">{tempInt}°</div>
            <div className="text-sm text-gray-500 capitalize">{conditionText}</div>
          </div>
          <div className="text-4xl">
            <WeatherIcon condition={condition} size="2xl" />
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-500">
              <Droplet className="h-4 w-4 mr-1.5 text-blue-400" />
              <span>Precip</span>
            </span>
            <span className="font-medium">{precipitation}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-500">
              <WindIcon className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>Wind</span>
            </span>
            <span className="font-medium">{wind} km/h</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-500">
              <Droplets className="h-4 w-4 mr-1.5 text-cyan-400" />
              <span>Humidity</span>
            </span>
            <span className="font-medium">{humidity}%</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center">
            <Sunrise className="h-3.5 w-3.5 mr-1 text-amber-400" />
            {sunrise}
          </span>
          <span className="flex items-center">
            <Sunset className="h-3.5 w-3.5 mr-1 text-orange-400" />
            {sunset}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const HourlyForecast = ({ hours }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Hourly Forecast</h3>
        <span className="text-sm text-green-600 font-medium">Next 24 hours</span>
      </div>
      <div className="relative">
        <div className="flex space-x-4 pb-4 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          {hours.map((hour, index) => (
            <div key={index} className="flex flex-col items-center min-w-[70px]">
              <span className="text-sm font-medium text-gray-500">{hour.time}</span>
              <div className="my-2">
                <WeatherIcon condition={hour.condition} size="lg" />
              </div>
              <div className="flex items-center text-sm font-medium">
                <span className="text-gray-900">{hour.temp}°</span>
              </div>
              <div className="mt-1 w-12 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full opacity-70"></div>
              <div className="mt-1 text-xs text-gray-500">{hour.precipitation}%</div>
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

const IrrigationStatus = ({ recommendation }) => {
  if (!recommendation) return null;
  
  return (
    <div className={`p-4 rounded-lg ${recommendation.border} ${recommendation.color} flex items-start`}>
      <div className="flex-shrink-0 mr-3 mt-0.5">
        {recommendation.icon}
      </div>
      <div>
        <h4 className="font-semibold mb-1">Irrigation: {recommendation.status}</h4>
        <p className="text-sm">{recommendation.message}</p>
        <p className="text-xs mt-2 opacity-80">{recommendation.action}</p>
      </div>
    </div>
  );
};

const SoilMoistureCard = ({ moisture, onAdjust }) => {
  const moistureLevel = getSoilMoistureLevel(moisture);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Soil Moisture</CardTitle>
          <div className="flex items-center">
            {moistureLevel.icon}
            <span className="ml-1.5 text-sm font-medium">{moistureLevel.level}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          {moistureLevel.level === 'Critical' && 'Immediate irrigation required'}
          {moistureLevel.level === 'Dry' && 'Consider irrigating soon'}
          {moistureLevel.level === 'Moderate' && 'Soil moisture is acceptable'}
          {moistureLevel.level === 'Ideal' && 'Optimal moisture level'}
          {moistureLevel.level === 'Saturated' && 'Soil is too wet'}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">0%</span>
            <span className="text-gray-500">50%</span>
            <span className="text-gray-500">100%</span>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div 
                style={{ width: `${moisture}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${moistureLevel.color}`}
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Dry</span>
            <span>Moist</span>
            <span>Wet</span>
          </div>
          
          <div className="pt-2">
            <label htmlFor="moisture-slider" className="block text-sm font-medium text-gray-700 mb-2">
              Adjust moisture level
            </label>
            <input
              id="moisture-slider"
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
};

// Main Weather Page Component
export default function WeatherPage() {
  const [location, setLocation] = useState('Karnal, Haryana');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [soilMoisture, setSoilMoisture] = useState(45);
  const [activeTab, setActiveTab] = useState('today');
  const [irrigationRecommendation, setIrrigationRecommendation] = useState(null);

  // Mock data for demonstration
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
      { day: 'Mon', temp: 28, condition: 'partly-cloudy', precipitation: 30, wind: 12, humidity: 65, sunrise: '06:15 AM', sunset: '06:45 PM' },
      { day: 'Tue', temp: 30, condition: 'sunny', precipitation: 10, wind: 8, humidity: 55, sunrise: '06:14 AM', sunset: '06:46 PM' },
      { day: 'Wed', temp: 26, condition: 'rain', precipitation: 80, wind: 15, humidity: 85, sunrise: '06:13 AM', sunset: '06:47 PM' },
      { day: 'Thu', temp: 25, condition: 'cloudy', precipitation: 60, wind: 12, humidity: 75, sunrise: '06:12 AM', sunset: '06:48 PM' },
      { day: 'Fri', temp: 29, condition: 'partly-cloudy', precipitation: 20, wind: 10, humidity: 60, sunrise: '06:11 AM', sunset: '06:49 PM' },
    ]
  };

  // Update irrigation recommendation when weather data or soil moisture changes
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
                          <div className="text-8xl">
                            <WeatherIcon condition={weatherData.current.condition} className="h-28 w-28" />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm">
                            <WeatherIcon condition={weatherData.current.condition} className="h-8 w-8 text-amber-500" />
                          </div>
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

                    <div className="mt-6">
                      <HourlyForecast hours={weatherData.current.hourly.slice(0, 12)} />
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

            {/* Weather Details Section */}
            <div className="space-y-6">
              {/* Weather Stats */}
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

              {/* Hourly Forecast */}
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <HourlyForecast hours={weatherData.current.hourly} />
                </CardContent>
              </Card>

              {/* Weather Map */}
              <Card>
                <CardHeader>
                  <CardTitle>Weather Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    Weather Radar Map
                  </div>
                </CardContent>
              </Card>
            </div>

          </>
        )}
      </div>
    </div>
  );
}
