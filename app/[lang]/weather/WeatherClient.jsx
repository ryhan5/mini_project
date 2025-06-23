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
  CloudSun,
  Navigation,
  Moon,
  ThermometerSun,
  DropletOff
} from 'lucide-react';
import { t } from '@/translations';
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

const WeatherCard = ({ day, temp, condition, precipitation, wind, humidity, sunrise, sunset, isToday = false, lang = 'en' }) => {
  // Get translation with fallback
  const getTranslation = (key, defaultValue = '') => {
    try {
      return t(`weather.${key}`, lang) || defaultValue;
    } catch (e) {
      console.warn(`Translation error for key: weather.${key}`, e);
      return defaultValue;
    }
  };

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
            <div className="text-sm text-gray-500 capitalize">
              {getTranslation(`conditions.${condition.toLowerCase().replace(' ', '')}`, conditionText)}
            </div>
          </div>
          <div className="text-4xl">
            <WeatherIcon condition={condition} size="2xl" />
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-500">
              <Droplet className="h-4 w-4 mr-1.5 text-blue-400" />
              <span>{getTranslation('precipitation', 'Precip')}</span>
            </span>
            <span className="font-medium">{precipitation}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-500">
              <WindIcon className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>{getTranslation('wind', 'Wind')}</span>
            </span>
            <span className="font-medium">{wind} {getTranslation('units.kmh', 'km/h')}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-500">
              <Droplets className="h-4 w-4 mr-1.5 text-cyan-400" />
              <span>{getTranslation('humidity', 'Humidity')}</span>
            </span>
            <span className="font-medium">{humidity}%</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center">
            <Sun className="h-3.5 w-3.5 mr-1 text-amber-400" />
            {sunrise || getTranslation('time.sunrise', 'Sunrise')}
          </span>
          <span className="flex items-center">
            <Moon className="h-3.5 w-3.5 mr-1 text-indigo-400" />
            {sunset || getTranslation('time.sunset', 'Sunset')}
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
        <h3 className="text-lg font-semibold text-gray-900">{t('weather.hourlyForecast', 'Hourly Forecast')}</h3>
        <span className="text-sm text-green-600 font-medium">{t('weather.next24Hours', 'Next 24 hours')}</span>
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
        <h4 className="font-semibold mb-1">{t('irrigation.status', 'Irrigation:')} {recommendation.status}</h4>
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
          <CardTitle className="text-lg font-medium">{t('soilMoisture.soilMoisture', 'Soil Moisture')}</CardTitle>
          <div className="flex items-center">
            {moistureLevel.icon}
            <span className="ml-1.5 text-sm font-medium">{moistureLevel.level}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          {moistureLevel.level === t('soilMoisture.critical', 'Critical') && t('soilMoisture.immediateIrrigationRequired', 'Immediate irrigation required')}
          {moistureLevel.level === t('soilMoisture.dry', 'Dry') && t('soilMoisture.considerIrrigatingSoon', 'Consider irrigating soon')}
          {moistureLevel.level === t('soilMoisture.moderate', 'Moderate') && t('soilMoisture.soilMoistureAcceptable', 'Soil moisture is acceptable')}
          {moistureLevel.level === t('soilMoisture.ideal', 'Ideal') && t('soilMoisture.optimalMoistureLevel', 'Optimal moisture level')}
          {moistureLevel.level === t('soilMoisture.saturated', 'Saturated') && t('soilMoisture.soilTooWet', 'Soil is too wet')}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{t('soilMoisture.zeroPercent', '0%')}</span>
            <span className="text-gray-500">{t('soilMoisture.fiftyPercent', '50%')}</span>
            <span className="text-gray-500">{t('soilMoisture.hundredPercent', '100%')}</span>
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
            <span>{t('soilMoisture.dry', 'Dry')}</span>
            <span>{t('soilMoisture.moist', 'Moist')}</span>
            <span>{t('soilMoisture.wet', 'Wet')}</span>
          </div>
          
          <div className="pt-2">
            <label htmlFor="moisture-slider" className="block text-sm font-medium text-gray-700 mb-2">
              {t('soilMoisture.adjustMoistureLevel', 'Adjust moisture level')}
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

// Main Weather Client Component
const WeatherClient = ({ lang = 'en' }) => {
  // Get translation with fallback
  const getTranslation = (key, defaultValue = '') => {
    try {
      return t(`weather.${key}`, lang) || defaultValue;
    } catch (e) {
      console.warn(`Translation error for key: weather.${key}`, e);
      return defaultValue;
    }
  };
  const [location, setLocation] = useState(getTranslation('defaultLocation', 'Kolkata, West Bengal, India'));
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [coords, setCoords] = useState({
    lat: '22.5726',  // Kolkata's latitude
    lon: '88.3639'   // Kolkata's longitude
  });
  
  // Weather conditions mapping with translations
  const weatherConditions = {
    'clear': getTranslation('conditions.clear', 'Clear'),
    'clouds': getTranslation('conditions.cloudy', 'Cloudy'),
    'rain': getTranslation('conditions.rain', 'Rain'),
    'drizzle': getTranslation('conditions.drizzle', 'Drizzle'),
    'thunderstorm': getTranslation('conditions.thunderstorm', 'Thunderstorm'),
    'snow': getTranslation('conditions.snow', 'Snow'),
    'mist': getTranslation('conditions.mist', 'Mist'),
    'fog': getTranslation('conditions.fog', 'Fog'),
    'haze': getTranslation('conditions.haze', 'Haze'),
    'smoke': getTranslation('conditions.smoke', 'Smoke'),
    'dust': getTranslation('conditions.dust', 'Dust')
  };
  const [soilMoisture, setSoilMoisture] = useState(45);
  const [activeTab, setActiveTab] = useState('today');
  const [irrigationRecommendation, setIrrigationRecommendation] = useState(null);

  // Mock data for demonstration
  const mockWeatherData = {
    location: location,
    current: {
      temp: 28,
      condition: getTranslation('conditions.partlyCloudy', 'Partly Cloudy'),
      humidity: 65,
      wind: 12,
      precipitation: 30,
      feelsLike: 30,
      uvIndex: 7,
      visibility: 10,
      pressure: 1012,
      sunrise: '05:45',
      sunset: '18:30',
      hourly: [
        { time: getTranslation('time.now', 'Now'), temp: 28, condition: getTranslation('conditions.partlyCloudy', 'Partly Cloudy'), precipitation: 20 },
        { time: '13:00', temp: 29, condition: getTranslation('conditions.sunny', 'Sunny'), precipitation: 10 },
        { time: '14:00', temp: 30, condition: getTranslation('conditions.sunny', 'Sunny'), precipitation: 0 },
        { time: '15:00', temp: 31, condition: getTranslation('conditions.sunny', 'Sunny'), precipitation: 0 },
        { time: '16:00', temp: 30, condition: getTranslation('conditions.partlyCloudy', 'Partly Cloudy'), precipitation: 0 },
        { time: '17:00', temp: 29, condition: getTranslation('conditions.partlyCloudy', 'Partly Cloudy'), precipitation: 10 },
        { time: '18:00', temp: 28, condition: getTranslation('conditions.cloudy', 'Cloudy'), precipitation: 20 },
      ],
      daily: [
        { day: getTranslation('days.today', 'Today'), high: 31, low: 22, condition: getTranslation('conditions.partlyCloudy', 'Partly Cloudy'), precipitation: 30 },
        { day: getTranslation('days.tue', 'Tue'), high: 30, low: 22, condition: getTranslation('conditions.rain', 'Rain'), precipitation: 70 },
        { day: getTranslation('days.wed', 'Wed'), high: 29, low: 21, condition: getTranslation('conditions.thunderstorm', 'Thunderstorm'), precipitation: 90 },
        { day: getTranslation('days.thu', 'Thu'), high: 28, low: 21, condition: getTranslation('conditions.rain', 'Rain'), precipitation: 60 },
        { day: getTranslation('days.fri', 'Fri'), high: 29, low: 21, condition: getTranslation('conditions.cloudy', 'Cloudy'), precipitation: 30 },
        { day: getTranslation('days.sat', 'Sat'), high: 30, low: 22, condition: getTranslation('conditions.partlyCloudy', 'Partly Cloudy'), precipitation: 20 },
        { day: getTranslation('days.sun', 'Sun'), high: 31, low: 23, condition: getTranslation('conditions.sunny', 'Sunny'), precipitation: 10 },
      ]
    },
    forecast: {
      today: getTranslation('forecast.today', 'Expect a mix of sun and clouds. High 31°C. Winds NE at 10 to 15 km/h.'),
      tonight: getTranslation('forecast.tonight', 'Partly cloudy skies. Low 22°C. Winds light and variable.'),
      tomorrow: getTranslation('forecast.tomorrow', 'Scattered thunderstorms in the morning, then mainly cloudy during the afternoon with thunderstorms likely. High 29°C. Winds light and variable. Chance of rain 80%.')
    }
  };

  // Update irrigation recommendation when weather data or soil moisture changes
  useEffect(() => {
    if (weatherData?.current) {
      const rec = getIrrigationRecommendation(weatherData.current, soilMoisture);
      setIrrigationRecommendation(rec);
    }
  }, [weatherData, soilMoisture]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    
    // Clear any previous errors and set loading state
    setError(null);
    setLoading(true);
    
    // This will trigger the useEffect with the new search query
    setSearchQuery(query);
  };

  // Fetch weather data from OpenMeteo API
  useEffect(() => {
    const fetchWeatherData = async () => {
      // Skip initial fetch if no search query and we already have data
      if (!searchQuery && weatherData) return;
      
      try {
        setLoading(true);
        setError(null);

        // Default coordinates (Karnal, Haryana)
        let lat = coords.lat;
        let lon = coords.lon;
        let locationName = location;

        if (searchQuery) {
          // Geocoding API call to get coordinates for the searched location
          const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=1&language=en&format=json`
          );
          
          if (!geoResponse.ok) throw new Error('Failed to fetch location');
          
          const geoData = await geoResponse.json();
          if (!geoData.results || geoData.results.length === 0) {
            throw new Error('Location not found');
          }
          
          lat = geoData.results[0].latitude;
          lon = geoData.results[0].longitude;
          locationName = `${geoData.results[0].name}, ${geoData.results[0].country}`;
          
          // Update coordinates and location
          setCoords({ 
            lat: lat.toString(), 
            lon: lon.toString() 
          });
          setLocation(locationName);
          
          // Clear search query to prevent duplicate fetches
          setSearchQuery('');
          return; // Return here to prevent double fetch
        }

        // Get weather data using OpenMeteo
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto&forecast_days=7`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();

        // Helper function to map OpenMeteo weather codes to our condition names
        const mapWeatherCondition = (code) => {
          if (code === 0) return 'clear';
          if (code <= 3) return 'partly-cloudy';
          if (code <= 48) return 'fog';
          if (code <= 67) return 'rain';
          if (code <= 77) return 'snow';
          if (code <= 99) return 'thunderstorm';
          return 'clear';
        };

        // Process current weather
        const currentTime = new Date();
        
        // Transform OpenMeteo data to match our component's expected format
        const transformedData = {
          current: {
            temp: Math.round(data.current.temperature_2m),
            condition: mapWeatherCondition(data.current.weather_code),
            humidity: data.current.relative_humidity_2m,
            wind: Math.round(data.current.wind_speed_10m * 3.6), // Convert m/s to km/h
            precipitation: data.current.precipitation || 0,
            weatherCode: data.current.weather_code,
            time: currentTime,
            sunrise: '06:00', // OpenMeteo doesn't provide this in the free tier
            sunset: '18:00',  // You can calculate this or use a separate API
            feelsLike: Math.round(data.current.apparent_temperature)
          },
          hourly: data.hourly.time.slice(0, 24).map((time, index) => ({
            time: new Date(time).toLocaleTimeString([], { hour: '2-digit', hour12: false }),
            temp: Math.round(data.hourly.temperature_2m[index]),
            condition: mapWeatherCondition(data.hourly.weather_code[index]),
            precipitation: data.hourly.precipitation_probability[index] || 0
          })),
          forecast: {
            daily: data.daily.time.slice(0, 5).map((time, index) => ({
              day: index === 0 ? 'Today' : new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
              high: Math.round(data.daily.temperature_2m_max[index]),
              low: Math.round(data.daily.temperature_2m_min[index]),
              condition: mapWeatherCondition(data.daily.weather_code[index]),
              precipitation: data.daily.precipitation_probability_max[index] || 0,
              wind: Math.round(data.current.wind_speed_10m * 3.6),
              humidity: data.current.relative_humidity_2m
            }))
          }
        };

        setWeatherData(transformedData);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(err.message || getTranslation('error.loading', 'Failed to load weather data'));
        // Fall back to mock data in case of error
        setWeatherData({
          ...mockWeatherData,
          location: location
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [coords.lat, coords.lon]); // Removed searchQuery from dependencies to prevent double fetch

  // Get translated weather condition
  const getTranslatedCondition = (condition) => {
    return weatherConditions[condition.toLowerCase()] || condition;
  };

  const handleSoilMoistureChange = (value) => {
    setSoilMoisture(value);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        <p className="text-gray-600">{getTranslation('loading', 'Loading weather data...')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">
          {getTranslation('error.loading', 'Error loading weather data. Please try again later.')}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getTranslation('weather.weatherForecast', 'Weather Forecast')}
          </h1>
          <p className="text-gray-600">
            {getTranslation('weather.forecastDescription', 'Get real-time weather updates and forecasts for your location')}
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-4 flex">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder={getTranslation('weather.searchPlaceholder', 'Search for a location...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {getTranslation('common.search', 'Search')}
            </button>
          </form>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
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
                          <CardTitle className="text-2xl">
                            {getTranslation('weather.currentWeather', 'Current Weather')}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {new Date().toLocaleDateString(lang, { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-sm">
                          {getTranslation(`conditions.${weatherData.current.condition.toLowerCase().replace(' ', '')}`, weatherData.current.condition)}
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
                          </div>
                          <div>
                            <div className="text-6xl font-bold">{weatherData.current.temp}°C</div>
                            <p className="text-gray-600 mt-2">
                              {getTranslation('weather.feelsLike', 'Feels like')} {weatherData.current.feelsLike}°C
                            </p>
                          </div>
                        </div>
                        <div className="mt-6 md:mt-0 space-y-2">
                          <div className="flex items-center">
                            <Droplet className="h-5 w-5 text-blue-400 mr-2" />
                            <span>{getTranslation('weather.humidity', 'Humidity')}: {weatherData.current.humidity}%</span>
                          </div>
                          <div className="flex items-center">
                            <WindIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <span>{getTranslation('weather.wind', 'Wind')}: {weatherData.current.wind} km/h</span>
                          </div>
                          <div className="flex items-center">
                            <CloudRain className="h-5 w-5 text-blue-400 mr-2" />
                            <span>{getTranslation('weather.precipitation', 'Precipitation')}: {weatherData.current.precipitation}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Irrigation Status */}
                <div>
                  <SoilMoistureCard 
                    moisture={soilMoisture} 
                    onAdjust={handleSoilMoistureChange} 
                  />
                  {irrigationRecommendation && (
                    <motion.div 
                      className="mt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <IrrigationStatus recommendation={irrigationRecommendation} />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Hourly Forecast */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  {getTranslation('weather.hourlyForecast', 'Hourly Forecast')}
                </h2>
                {weatherData?.hourly?.length > 0 ? (
                  <HourlyForecast hours={weatherData.hourly} />
                ) : (
                  <p className="text-gray-500">
                    {getTranslation('weather.noHourlyData', 'Hourly forecast data not available')}
                  </p>
                )}
              </motion.div>

              {/* Daily Forecast */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  {getTranslation('weather.forecast', 'Forecast')}
                </h2>
                {weatherData?.forecast?.daily ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {weatherData.forecast.daily.map((day, index) => (
                      <WeatherCard
                        key={index}
                        day={day.day}
                        temp={day.high}
                        condition={day.condition}
                        precipitation={day.precipitation}
                        wind={Math.floor(Math.random() * 15) + 5}
                        humidity={Math.floor(Math.random() * 30) + 50}
                        sunrise={weatherData.current.sunrise}
                        sunset={weatherData.current.sunset}
                        isToday={index === 0}
                        lang={lang}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    {getTranslation('weather.noForecastData', 'Forecast data not available')}
                  </p>
                )}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeatherClient;
