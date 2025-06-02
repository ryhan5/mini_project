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

  return <WeatherClient />;
}
            
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