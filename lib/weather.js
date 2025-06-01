// Weather API service using OpenWeatherMap
// You'll need to sign up at https://openweathermap.org/ to get an API key

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get current weather for a location
export async function getCurrentWeather(location) {
  try {
    // First, get coordinates for the location
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)},IN&limit=1&appid=${OPENWEATHER_API_KEY}`
    );
    
    if (!geoResponse.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const [locationData] = await geoResponse.json();
    
    if (!locationData) {
      throw new Error('Location not found');
    }
    
    // Get weather data using coordinates
    const weatherResponse = await fetch(
      `${BASE_URL}/weather?lat=${locationData.lat}&lon=${locationData.lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    
    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    return await weatherResponse.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Get 5-day forecast
export async function getForecast(location) {
  try {
    // First, get coordinates for the location
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)},IN&limit=1&appid=${OPENWEATHER_API_KEY}`
    );
    
    if (!geoResponse.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const [locationData] = await geoResponse.json();
    
    if (!locationData) {
      throw new Error('Location not found');
    }
    
    // Get forecast data using coordinates
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${locationData.lat}&lon=${locationData.lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    
    if (!forecastResponse.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    
    return await forecastResponse.json();
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
}

// Calculate agricultural metrics
function calculateAgriculturalMetrics(weatherData) {
  // These are simplified calculations - in a real app, you'd use more sophisticated models
  const temp = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  
  // Simple calculations for demonstration
  const soilTemp = Math.round(temp * 0.85 * 10) / 10; // Soil temp is typically cooler than air temp
  
  let soilMoisture;
  if (weatherData.rain) {
    soilMoisture = 'High';
  } else if (humidity > 70) {
    soilMoisture = 'High';
  } else if (humidity < 40) {
    soilMoisture = 'Low';
  } else {
    soilMoisture = 'Moderate';
  }
  
  const evaporation = temp > 30 ? 'High' : temp > 25 ? 'Moderate' : 'Low';
  const growingDegreeDay = Math.max(0, temp - 10).toFixed(1); // Base 10°C for most crops
  
  return {
    soilTemp,
    soilMoisture,
    evaporation,
    growingDegreeDay
  };
}

// Get all weather data for a location
export async function getWeatherData(location) {
  try {
    const [currentWeather, forecastData] = await Promise.all([
      getCurrentWeather(location),
      getForecast(location)
    ]);
    
    // Process forecast data to get daily forecast
    const dailyForecast = processForecastData(forecastData);
    
    // Calculate agricultural metrics
    const agriculturalData = calculateAgriculturalMetrics(currentWeather);
    
    return {
      current: formatCurrentWeather(currentWeather),
      forecast: dailyForecast,
      agricultural: agriculturalData
    };
  } catch (error) {
    console.error('Error getting weather data:', error);
    throw error;
  }
}

// Format current weather data
function formatCurrentWeather(data) {
  return {
    temp: Math.round(data.main.temp),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
    condition: data.weather[0].main,
    uv: 'High', // UV index not available in free tier
    rainfall: data.rain ? Math.round(data.rain['1h'] || 0) : 0,
    icon: data.weather[0].icon,
    description: data.weather[0].description
  };
}

// Process forecast data to get daily forecast
function processForecastData(forecastData) {
  // Group by day
  const dailyData = {};
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = days[date.getDay()];
    
    if (!dailyData[day]) {
      dailyData[day] = {
        day,
        temp: Math.round(item.main.temp),
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
        count: 1
      };
    } else {
      // Average the temperature for the day
      dailyData[day].temp = Math.round((dailyData[day].temp * dailyData[day].count + item.main.temp) / (dailyData[day].count + 1));
      dailyData[day].count++;
      
      // Update condition to the most common one (simplified)
      if (item.weather[0].main !== 'Clear') {
        dailyData[day].condition = item.weather[0].main;
        dailyData[day].icon = item.weather[0].icon;
      }
    }
  });
  
  // Convert to array and limit to 5 days
  return Object.values(dailyData).slice(0, 5);
}
