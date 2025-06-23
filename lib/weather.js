// Weather API service using OpenMeteo REST API (browser-compatible)

// Helper function to convert weather code to condition
const getConditionFromCode = (code) => {
  // WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  if (code === 0) return 'clear';
  if (code <= 3) return 'partly-cloudy';
  if (code <= 48) return 'fog';
  if (code <= 67) return 'rain';
  if (code <= 77) return 'snow';
  if (code <= 99) return 'thunderstorm';
  return 'clear';
};

// Get current weather for a location
export async function getCurrentWeather(location) {
  try {
    // First, get coordinates using the geocoding API
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
    );
    
    if (!geoResponse.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const geoData = await geoResponse.json();
    
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error('Location not found');
    }
    
    const { latitude, longitude, name, country, timezone } = geoData.results[0];
    
    // Get weather data using OpenMeteo REST API
    const params = new URLSearchParams({
      latitude: latitude,
      longitude: longitude,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m',
      hourly: 'temperature_2m,precipitation_probability,weather_code',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max',
      timezone: timezone || 'auto',
      forecast_days: '7'
    });
    
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
    
    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const weatherData = await weatherResponse.json();
    
    // Process current weather
    const currentData = {};
    if (weatherData.current) {
      Object.keys(weatherData.current).forEach(key => {
        if (key !== 'time') {
          currentData[key] = weatherData.current[key];
        }
      });
    }
    
    // Process hourly forecast (next 24 hours)
    const hourlyData = [];
    if (weatherData.hourly && weatherData.hourly.time) {
      const now = new Date();
      const endTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
      
      for (let i = 0; i < weatherData.hourly.time.length; i++) {
        const hourTime = new Date(weatherData.hourly.time[i]);
        if (hourTime > endTime) break;
        
        const hourData = { time: hourTime };
        Object.keys(weatherData.hourly).forEach(key => {
          if (key !== 'time') {
            hourData[key] = weatherData.hourly[key][i];
          }
        });
        hourlyData.push(hourData);
      }
    }
    
    // Process daily forecast (next 7 days)
    const dailyData = [];
    if (weatherData.daily && weatherData.daily.time) {
      for (let i = 0; i < Math.min(7, weatherData.daily.time.length); i++) {
        const dayData = { date: new Date(weatherData.daily.time[i]) };
        Object.keys(weatherData.daily).forEach(key => {
          if (key !== 'time') {
            dayData[key] = weatherData.daily[key][i];
          }
        });
        dailyData.push(dayData);
      }
    }
    
    return {
      location: `${name}, ${country}`,
      current: {
        temp: currentData.temperature_2m,
        condition: getConditionFromCode(currentData.weather_code),
        humidity: currentData.relative_humidity_2m,
        wind: currentData.wind_speed_10m * 3.6, // Convert m/s to km/h
        precipitation: currentData.precipitation,
        weatherCode: currentData.weather_code,
        time: new Date(current.time())
      },
      hourly: hourlyData.map(hour => ({
        time: hour.time,
        temp: hour.temperature_2m,
        condition: getConditionFromCode(hour.weather_code),
        precipitation: hour.precipitation_probability
      })),
      daily: dailyData.map((day, index) => ({
        day: index === 0 ? 'Today' : day.date.toLocaleDateString('en-US', { weekday: 'short' }),
        high: day.temperature_2m_max,
        low: day.temperature_2m_min,
        condition: getConditionFromCode(day.weather_code),
        precipitation: day.precipitation_probability_max
      }))
    };
    
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Get forecast (using the same function as getCurrentWeather since OpenMeteo returns both)
export async function getForecast(location) {
  return getCurrentWeather(location);
}

// Calculate agricultural metrics
function calculateAgriculturalMetrics(weatherData) {
  const temp = weatherData.current.temp;
  const humidity = weatherData.current.humidity;
  
  // Simple calculations for demonstration
  const soilTemp = Math.round(temp * 0.85 * 10) / 10; // Soil temp is typically cooler than air temp
  
  let soilMoisture;
  if (weatherData.current.precipitation > 5) {
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
    const weather = await getCurrentWeather(location);
    const metrics = calculateAgriculturalMetrics(weather);
    
    return {
      ...weather,
      metrics
    };
  } catch (error) {
    console.error('Error getting weather data:', error);
    throw error;
  }
}

// Format current weather data
export function formatCurrentWeather(data) {
  if (!data) return null;
  
  return {
    temp: Math.round(data.current.temp),
    condition: data.current.condition,
    humidity: data.current.humidity,
    wind: Math.round(data.current.wind),
    precipitation: data.current.precipitation,
    weatherCode: data.current.weatherCode,
    time: data.current.time
  };
}

// Process forecast data to get daily forecast
export function processForecastData(forecastData) {
  if (!forecastData || !forecastData.daily) return [];
  
  return forecastData.daily.map(day => ({
    day: day.day,
    high: Math.round(day.high),
    low: Math.round(day.low),
    condition: day.condition,
    precipitation: day.precipitation
  }));
}
