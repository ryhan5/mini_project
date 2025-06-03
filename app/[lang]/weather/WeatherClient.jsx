'use client';

import { useState, useEffect } from 'react';
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  CloudLightning, 
  CloudSnow, 
  Droplets, 
  Wind, 
  Thermometer, 
  Sunrise, 
  Sunset, 
  Droplet, 
  Wind as WindIcon,
  CloudSun,
  DropletOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const WeatherIcon = ({ condition, className = '' }) => {
  const iconMap = {
    'clear': <Sun className={className} />,
    'sunny': <Sun className={className} />,
    'partly-cloudy': <CloudSun className={className} />,
    'cloudy': <Cloud className={className} />,
    'overcast': <Cloud className={className} />,
    'fog': <Cloud className={className} />,
    'haze': <Cloud className={className} />,
    'rain': <CloudRain className={className} />,
    'drizzle': <CloudRain className={className} />,
    'thunderstorm': <CloudLightning className={className} />,
    'snow': <CloudSnow className={className} />,
    'sleet': <CloudSnow className={className} />,
    'hail': <CloudSnow className={className} />
  };

  return iconMap[condition] || <Sun className={className} />;
};

const getIrrigationRecommendation = (weather, soilMoisture) => {
  if (weather.precipitation > 70) return 'No irrigation needed - Sufficient rainfall expected';
  if (weather.temp > 30 && weather.humidity < 50) return 'Irrigation recommended - High temperature and low humidity';
  if (soilMoisture < 30) return 'Irrigation needed - Low soil moisture';
  if (soilMoisture < 60) return 'Light irrigation recommended - Moderate soil moisture';
  return 'No irrigation needed - Adequate soil moisture';
};

const getSoilMoistureLevel = (moisture) => {
  if (moisture < 25) return 'Very Dry';
  if (moisture < 50) return 'Dry';
  if (moisture < 75) return 'Moist';
  return 'Wet';
};

const getEvapotranspirationRate = (temp, humidity, wind) => {
  // Simple ET0 calculation (simplified for demo)
  return ((temp * 0.6) + (wind * 0.15) + ((100 - humidity) * 0.2)).toFixed(1);
};

const WeatherCard = ({ day, temp, condition, precipitation, wind, humidity, sunrise, sunset }) => {
  return (
    <Card className="w-full md:w-64">
      <CardHeader>
        <CardTitle className="text-lg">{day}</CardTitle>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold">{temp}°C</div>
          <div className="text-4xl">
            <WeatherIcon condition={condition} className="h-10 w-10" />
          </div>
        </div>
        <CardDescription className="capitalize">{condition.replace('-', ' ')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 flex items-center">
            <Droplet className="h-4 w-4 mr-1" />
            {precipitation}%
          </span>
          <span className="text-sm text-gray-500 flex items-center">
            <WindIcon className="h-4 w-4 mr-1" />
            {wind} km/h
          </span>
          <span className="text-sm text-gray-500 flex items-center">
            <Droplets className="h-4 w-4 mr-1" />
            {humidity}%
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <Sunrise className="h-4 w-4 mr-1" />
            {sunrise}
          </span>
          <span className="flex items-center">
            <Sunset className="h-4 w-4 mr-1" />
            {sunset}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const HourlyForecast = ({ hours }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Hourly Forecast</h3>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {hours.map((hour, index) => (
          <div key={index} className="flex flex-col items-center min-w-[60px]">
            <span className="text-sm text-gray-500">{hour.time}</span>
            <div className="my-1">
              <WeatherIcon condition={hour.condition} className="h-6 w-6" />
            </div>
            <span className="font-medium">{hour.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function WeatherPage() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [soilMoisture, setSoilMoisture] = useState(45);
  const [irrigationStatus, setIrrigationStatus] = useState('');

  // Mock data for demonstration
  const mockWeatherData = {
    current: {
      temp: 28,
      condition: 'partly-cloudy',
      humidity: 65,
      wind: 12,
      precipitation: 30,
      sunrise: '06:15',
      sunset: '18:45',
      hourly: [
        { time: 'Now', temp: 28, condition: 'partly-cloudy' },
        { time: '1PM', temp: 29, condition: 'partly-cloudy' },
        { time: '2PM', temp: 30, condition: 'sunny' },
        { time: '3PM', temp: 31, condition: 'sunny' },
        { time: '4PM', temp: 30, condition: 'sunny' },
        { time: '5PM', temp: 28, condition: 'partly-cloudy' },
      ],
      forecast: [
        { day: 'Today', temp: 28, condition: 'partly-cloudy', precipitation: 30, wind: 12, humidity: 65, sunrise: '06:15', sunset: '18:45' },
        { day: 'Tue', temp: 27, condition: 'rain', precipitation: 80, wind: 15, humidity: 85, sunrise: '06:14', sunset: '18:46' },
        { day: 'Wed', temp: 26, condition: 'rain', precipitation: 90, wind: 10, humidity: 90, sunrise: '06:14', sunset: '18:46' },
        { day: 'Thu', temp: 28, condition: 'cloudy', precipitation: 40, wind: 8, humidity: 75, sunrise: '06:13', sunset: '18:47' },
        { day: 'Fri', temp: 30, condition: 'partly-cloudy', precipitation: 20, wind: 10, humidity: 65, sunrise: '06:13', sunset: '18:47' },
      ]
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // In a real app, you would call your weather API here
      // const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
      // const data = await response.json();
      // setWeatherData(data);
      
      // For demo, use mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWeatherData(mockWeatherData);
      
      // Update irrigation status based on weather
      const recommendation = getIrrigationRecommendation(mockWeatherData.current, soilMoisture);
      setIrrigationStatus(recommendation);
      
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // In a real app, you might get the user's location and fetch weather
        await new Promise(resolve => setTimeout(resolve, 500));
        setWeatherData(mockWeatherData);
        
        const recommendation = getIrrigationRecommendation(mockWeatherData.current, soilMoisture);
        setIrrigationStatus(recommendation);
      } catch (err) {
        console.error('Error loading initial data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  if (loading && !weatherData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Weather & Irrigation</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location (e.g., Karnal, Haryana)"
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </form>

        {weatherData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Current Weather</CardTitle>
                  <CardDescription>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-6xl">
                        <WeatherIcon condition={weatherData.current.condition} className="h-24 w-24" />
                      </div>
                      <div>
                        <div className="text-5xl font-bold">{weatherData.current.temp}°C</div>
                        <div className="text-lg capitalize">
                          {weatherData.current.condition.replace('-', ' ')}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4 md:mt-0">
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Humidity</div>
                        <div className="text-xl font-semibold">{weatherData.current.humidity}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Wind</div>
                        <div className="text-xl font-semibold">{weatherData.current.wind} km/h</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Precip</div>
                        <div className="text-xl font-semibold">{weatherData.current.precipitation}%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Irrigation Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Soil Moisture</span>
                        <span>{getSoilMoistureLevel(soilMoisture)}</span>
                      </div>
                      <Progress value={soilMoisture} className="h-2" />
                      <div className="text-xs text-gray-500 mt-1 text-right">{soilMoisture}%</div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Recommendation</h4>
                      <p className="text-sm">{irrigationStatus}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Evapotranspiration</h4>
                      <p className="text-sm">
                        {getEvapotranspirationRate(
                          weatherData.current.temp, 
                          weatherData.current.humidity, 
                          weatherData.current.wind
                        )} mm/day
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>5-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-2">
                  {weatherData.current.forecast.map((day, index) => (
                    <WeatherCard key={index} {...day} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weather Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="hourly" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 max-w-xs mb-6">
                    <TabsTrigger value="hourly">Hourly</TabsTrigger>
                    <TabsTrigger value="radar">Radar</TabsTrigger>
                  </TabsList>
                  <TabsContent value="hourly">
                    <HourlyForecast hours={weatherData.current.hourly} />
                  </TabsContent>
                  <TabsContent value="radar">
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                      Weather Radar Map
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
