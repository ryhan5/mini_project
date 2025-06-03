import { languages } from '@/config/languages';
import dynamic from 'next/dynamic';

// Dynamically import the client component with SSR disabled
const WeatherClient = dynamic(
  () => import('./WeatherClient'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }
);

// This function tells Next.js which paths to pre-render at build time
export async function generateStaticParams() {
  return languages.map(lang => ({
    lang: lang.code,
  }));
}

// This ensures dynamic parameters are filled in at request time
export const dynamicParams = true;

export default function WeatherPage({ params: { lang } }) {
  // Validate language
  const isValidLanguage = languages.some(language => language.code === lang);
  
  if (!isValidLanguage) {
    // This will be handled by the middleware, but we include it here for safety
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium text-white mb-4">
              <Sun className="h-4 w-4 mr-2" />
              <span>Live Weather Updates</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">AgroWeather Dashboard</h1>
            <p className="text-lg text-green-100 max-w-2xl">Monitor weather conditions and optimize your irrigation schedule with real-time data and AI-powered insights</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 max-w-md mb-6 bg-green-50 p-1.5 rounded-xl border border-green-100 shadow-sm">
            <TabsTrigger
              value="overview"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-white text-green-700 shadow-sm' : 'text-green-600 hover:bg-white/50'}`}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="forecast"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'forecast' ? 'bg-white text-green-700 shadow-sm' : 'text-green-600 hover:bg-white/50'}`}
            >
              Forecast
            </TabsTrigger>
            <TabsTrigger
              value="irrigation"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'irrigation' ? 'bg-white text-green-700 shadow-sm' : 'text-green-600 hover:bg-white/50'}`}
            >
              Irrigation
            </TabsTrigger>
            <TabsTrigger
              value="soil"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'soil' ? 'bg-white text-green-700 shadow-sm' : 'text-green-600 hover:bg-white/50'}`}
            >
              Soil Health
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-0 shadow-lg bg-white">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl">{location}</CardTitle>
                      <CardDescription>Current Weather</CardDescription>
                    </div>
                    <div className="text-5xl">
                      <WeatherIcon condition={forecast.current.condition} className="h-16 w-16 text-yellow-500" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline mb-4">
                    <span className="text-5xl font-bold mr-3">{forecast.current.temp}°C</span>
                    <span className="text-gray-500">Feels like {forecast.current.feelsLike}°C</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Droplets className="h-4 w-4 mr-2 text-blue-400" />
                      <span>Humidity: {forecast.current.humidity}%</span>
                    </div>
                    <div className="flex items-center">
                      <WindIcon className="h-4 w-4 mr-2 text-blue-400" />
                      <span>Wind: {forecast.current.wind} km/h</span>
                    </div>
                    <div className="flex items-center">
                      <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                      <span>Precipitation: {forecast.current.precipitation}%</span>
                    </div>
                    <div className="flex items-center">
                      <Thermometer className="h-4 w-4 mr-2 text-red-400" />
                      <span>UV Index: {forecast.current.uvIndex}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Card */}
              <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white text-xl">Status</CardTitle>
                      <CardDescription className="text-green-100">Current recommendations</CardDescription>
                    </div>
                    <Droplet className="h-6 w-6 text-green-200" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Droplet className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-100">Status</p>
                      <p className="text-lg font-semibold text-white">
                        {irrigationRecommendation.includes('needed') ? 'Action Required' : 'Optimal'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-green-100">
                      <span>Soil Moisture</span>
                      <span className="font-medium">{soilMoisture}% - {soilMoistureData.level}</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <Progress value={soilMoisture} className="h-full bg-green-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-green-100">
                      <span>Evapotranspiration</span>
                      <span className="font-medium">{evapotranspiration} mm/day</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <Progress value={Math.min(100, evapotranspiration * 10)} className="h-full bg-blue-200" />
                    </div>
                  </div>

                  <p className="text-sm text-green-100 bg-white/10 p-3 rounded-lg">
                    {irrigationRecommendation}
                  </p>
                </CardContent>
                <CardFooter className="border-t border-white/10 pt-4">
                  <Button
                    variant="outline"
                    className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40"
                    onClick={() => setActiveTab('irrigation')}
                  >
                    View Irrigation Schedule
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Hourly Forecast */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle>Hourly Forecast</CardTitle>
                <CardDescription>Next 12 hours weather conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4">
                  {forecast.hourly.map((hour, index) => (
                    <div key={index} className="flex flex-col items-center min-w-[70px] text-center">
                      <div className="text-sm font-medium text-gray-700">{hour.time}</div>
                      <div className="my-2">
                        <WeatherIcon condition={hour.condition} className="h-8 w-8 text-yellow-500" />
                      </div>
                      <div className="text-lg font-semibold">{Math.round(hour.temp)}°</div>
                      <div className="text-xs text-blue-500 flex items-center">
                        <Droplet className="h-3 w-3 mr-1" />
                        {hour.precipitation}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 7-Day Forecast */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle>7-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {forecast.daily.map((day, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="w-28 font-medium text-gray-800">{day.day}</div>
                    <div className="flex-1 flex items-center justify-center">
                      <WeatherIcon condition={day.condition} className="h-8 w-8 text-yellow-500" />
                    </div>
                    <div className="w-20 text-right">
                      <span className="font-medium text-gray-900">{day.temp}°</span>
                      <span className="text-xs text-gray-500 ml-1">/ {day.temp - 5}°</span>
                    </div>
                    <div className="w-16 text-right text-sm text-blue-500 flex items-center justify-end">
                      <Droplet className="h-3 w-3 mr-1" />
                      {day.precipitation}%
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forecast Tab */}
          <TabsContent value="forecast" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle>Detailed Forecast</CardTitle>
                <CardDescription>7-day weather forecast for {location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {forecast.daily.map((day, index) => (
                    <WeatherCard
                      key={index}
                      day={day.day}
                      temp={day.temp}
                      condition={day.condition}
                      precipitation={day.precipitation}
                      wind={day.wind}
                      humidity={day.humidity}
                      sunrise={day.sunrise}
                      sunset={day.sunset}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Irrigation Tab */}
          <TabsContent value="irrigation" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle>Irrigation Schedule</CardTitle>
                <CardDescription>Recommended irrigation plan based on weather forecast</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rainfall</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best Time</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {irrigationSchedule.map((day, index) => (
                        <tr key={index} className={day.needsIrrigation ? 'bg-green-50' : ''}>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{day.day}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <WeatherIcon condition={day.condition} className="h-5 w-5 mr-2 text-yellow-500" />
                              <span className="capitalize">{day.condition.replace('-', ' ')}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{day.precipitation}%</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {day.needsIrrigation ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <Droplet className="h-3 w-3 mr-1" />
                                {day.recommendedAmount}
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                <DropletOff className="h-3 w-3 mr-1" />
                                Not needed
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {day.bestTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle>Irrigation Tips</CardTitle>
                  <CardDescription>Best practices for efficient water usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Optimal Irrigation Time</h4>
                    <p className="text-sm text-blue-700">
                      Water your crops early in the morning (5-9 AM) to minimize evaporation and ensure optimal water absorption.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Water Conservation</h4>
                      <ul className="text-sm text-green-700 space-y-1 list-disc pl-5">
                        <li>Use drip irrigation for row crops</li>
                        <li>Mulch around plants to retain moisture</li>
                        <li>Water deeply but less frequently</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-medium text-amber-800 mb-2">Signs of Overwatering</h4>
                      <ul className="text-sm text-amber-700 space-y-1 list-disc pl-5">
                        <li>Yellowing leaves</li>
                        <li>Wilting despite wet soil</li>
                        <li>Fungal growth on soil surface</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle>Water Usage</CardTitle>
                  <CardDescription>Monthly water consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Water usage chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Soil Health Tab */}
          <TabsContent value="soil" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle>Soil Health Monitoring</CardTitle>
                  <CardDescription>Track your soil conditions and moisture levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Soil Moisture</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Current Level</span>
                            <span className="font-medium">{soilMoisture}%</span>
                          </div>
                          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                            <Progress value={soilMoisture} className={`h-full ${soilMoisture < 30 ? 'bg-red-400' : soilMoisture < 60 ? 'bg-yellow-400' : 'bg-green-500'}`} />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Dry</span>
                            <span>Ideal</span>
                            <span>Wet</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Adjust Soil Moisture</h4>
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-10 h-10 p-0 flex items-center justify-center rounded-full"
                              onClick={() => setSoilMoisture(Math.max(0, soilMoisture - 5))}
                              disabled={soilMoisture <= 0}
                            >
                              -
                            </Button>
                            <div className="w-full">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={soilMoisture}
                                onChange={(e) => setSoilMoisture(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                              />
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-10 h-10 p-0 flex items-center justify-center rounded-full"
                              onClick={() => setSoilMoisture(Math.min(100, soilMoisture + 5))}
                              disabled={soilMoisture >= 100}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Soil Temperature</h3>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Current Temperature</span>
                          <span className="text-2xl font-bold text-gray-800">{forecast.current.temp}°C</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          {forecast.current.temp < 10
                            ? 'Soil is too cold for most crops'
                            : forecast.current.temp > 35
                            ? 'High soil temperature may stress plants'
                            : 'Ideal soil temperature for most crops'}
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Min: {Math.max(0, forecast.current.temp - 5)}°C</span>
                            <span className="text-gray-500">Max: {forecast.current.temp + 5}°C</span>
                          </div>
                          <div className="h-2 bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-full"></div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Cold</span>
                            <span>Optimal</span>
                            <span>Hot</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-sm font-medium mb-2">Crop Selection</h4>
                        <select
                          className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          value={cropType}
                          onChange={(e) => setCropType(e.target.value)}
                        >
                          <option value="wheat">Wheat</option>
                          <option value="rice">Rice</option>
                          <option value="corn">Corn</option>
                          <option value="cotton">Cotton</option>
                          <option value="sugarcane">Sugarcane</option>
                          <option value="vegetables">Vegetables</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-2">
                          Select your crop to get customized recommendations
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Tip:</p>
                    <p>Monitor soil moisture regularly and adjust irrigation based on weather conditions and crop requirements.</p>
                  </div>
                </div>
              </Card>

              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader>
                    <CardTitle>Soil Health Tips</CardTitle>
                    <CardDescription>Improve your soil quality for better crop yields</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Organic Matter</h4>
                      <p className="text-sm text-blue-700">
                        Add compost or well-rotted manure to improve soil structure and water retention.
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Cover Crops</h4>
                      <p className="text-sm text-green-700">
                        Plant cover crops like clover or vetch to prevent soil erosion and add nutrients.
                      </p>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-medium text-amber-800 mb-2">Crop Rotation</h4>
                      <p className="text-sm text-amber-700">
                        Rotate crops to prevent nutrient depletion and reduce pest and disease buildup.
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-800 mb-2">Soil Testing</h4>
                      <p className="text-sm text-purple-700">
                        Test your soil annually to monitor pH and nutrient levels for optimal plant growth.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest soil measurements and events</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Droplet className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Irrigation Completed</p>
                        <p className="text-xs text-gray-500">Watered for 15 minutes at 6:30 AM</p>
                        <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Thermometer className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Temperature Alert</p>
                        <p className="text-xs text-gray-500">Soil temperature reached 32°C at 1:45 PM</p>
                        <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <CloudRain className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Rainfall Detected</p>
                        <p className="text-xs text-gray-500">8mm of rain recorded in the last 24 hours</p>
                        <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function WeatherPageWrapper({ params: { lang } }) {
  // Validate language
  const isValidLanguage = languages.some((language) => language.code === lang);

  if (!isValidLanguage) {
    // This will be handled by the middleware, but we include it here for safety
    return null;
  }

  return <WeatherClient />;
}

export { WeatherPage as default };
