// Weather API service using OpenMeteo
const { fetchWeatherApi } = require('@openmeteo/sdk');

// Get current weather for a location
export async function getCurrentWeather(location) {
  try {
    // OpenMeteo uses direct coordinates, so we'll use the geocoding API first
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
    
    const { latitude, longitude, name, country } = geoData.results[0];
    
    // Get weather data using OpenMeteo
    const params = {
      "latitude": latitude,
      "longitude": longitude,
      "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "rain", "showers", "snowfall", "weather_code", "cloud_cover", "wind_speed_10m", "wind_direction_10m"],
      "hourly": ["temperature_2m", "precipitation_probability", "weather_code"],
      "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_sum", "precipitation_probability_max"],
      "timezone": "auto",
      "forecast_days": 7
    };
    
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    
    // Process first location. Add a for-loop for multiple locations or multi-model
    const response = responses[0];
    
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
    
    // Process current weather
    const current = response.current();
    const currentVars = response.currentVariables();
    const currentData = {};
    
    for (let i = 0; i < currentVars.length; i++) {
      currentData[currentVars[i]] = current.variables(currentVars[i]).value();
    }
    
    // Process hourly forecast
    const hourly = response.hourly();
    const hourlyVars = hourly.variables();
    const hourlyData = [];
    
    for (let i = 0; i < 24; i++) { // Next 24 hours
      const hourData = { time: new Date(hourly.time() + i * 3600 * 1000) };
      for (let j = 0; j < hourlyVars.length; j++) {
        const values = hourly.variables(hourlyVars[j]);
        hourData[hourlyVars[j]] = values.value(i);
      }
      hourlyData.push(hourData);
    }
    
    // Process daily forecast
    const daily = response.daily();
    const dailyVars = daily.variables();
    const dailyData = [];
    
    for (let i = 0; i < 7; i++) { // Next 7 days
      const dayData = { date: new Date(daily.time() + i * 24 * 3600 * 1000) };
      for (let j = 0; j < dailyVars.length; j++) {
        const values = daily.variables(dailyVars[j]);
        dayData[dailyVars[j]] = values.value(i);
      }
      dailyData.push(dayData);
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
