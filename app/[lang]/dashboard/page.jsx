import { languages } from '@/config/languages';
import dynamic from 'next/dynamic';

// Dynamically import the client component with SSR disabled
const DashboardClient = dynamic(
  () => import('./DashboardClient'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
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

export default function DashboardPage({ params: { lang } }) {
  // Validate language
  const isValidLanguage = languages.some(language => language.code === lang);
  
  if (!isValidLanguage) {
    // This will be handled by the middleware, but we include it here for safety
    return null;
  }

  DropletOff,
  DropletFilled2,
  DropletFilled,
  DropletHalf2,
  DropletHalfFilled,
  DropletHalf,
  Search,
  Wrench,
  XCircle,
  ChevronRight,
  Droplet as DropletIcon2,
  Droplets as DropletsIcon2,
  DropletFilled as DropletFilledIcon,
  DropletHalf as DropletHalfIcon,
  DropletHalf2 as DropletHalf2Icon,
  DropletHalfFilled as DropletHalfFilledIcon,
  DropletOff as DropletOffIcon2,
  DropletFilled2 as DropletFilled2Icon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress, ProgressIndicator } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Weather icon component with more conditions and animations
const WeatherIcon = ({ condition, className = 'h-6 w-6', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10'
  };

  const iconMap = {
    sunny: <SunIcon className={`${sizeClasses[size]} text-yellow-400`} />,
    'partly-cloudy': <CloudSun className={`${sizeClasses[size]} text-yellow-300`} />,
    cloudy: <CloudyIcon className={`${sizeClasses[size]} text-gray-400`} />,
    rain: <CloudRain className={`${sizeClasses[size]} text-blue-400`} />,
    drizzle: <CloudDrizzle className={`${sizeClasses[size]} text-blue-300`} />,
    thunderstorm: <CloudLightningIcon className={`${sizeClasses[size]} text-purple-400`} />,
    snow: <CloudSnowIcon className={`${sizeClasses[size]} text-blue-100`} />,
    mist: <CloudFog className={`${sizeClasses[size]} text-gray-300`} />,
    clear: <SunDim className={`${sizeClasses[size]} text-yellow-300`} />,
    sunrise: <SunriseIcon className={`${sizeClasses[size]} text-orange-300`} />,
    sunset: <SunsetIcon className={`${sizeClasses[size]} text-purple-300`} />,
    wind: <WindIcon className={`${sizeClasses[size]} text-blue-300`} />,
    humidity: <DropletsIcon className={`${sizeClasses[size]} text-blue-300`} />,
    pressure: <GaugeIcon className={`${sizeClasses[size]} text-indigo-300`} />,
    'clear-night': <MoonStar className={`${sizeClasses[size]} text-indigo-300`} />
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {iconMap[condition] || <Cloud className={`${sizeClasses[size]} text-gray-400`} />}
    </motion.div>
  );
};

// Stat card component with animations and improved layout
const StatCard = ({ title, value, icon, change, unit, description, loading = false, className = '' }) => {
  const isPositive = change >= 0;
  
  return (
    <motion.div 
      whileHover={{ y: -2 }} 
      className="h-full"
    >
      <Card className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden h-full transition-all duration-300 hover:border-white/20 ${className}`}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-white/70 flex items-center">
                {title}
                {description && (
                  <span className="ml-2 text-xs text-white/50" title={description}>
                    ⓘ
                  </span>
                )}
              </p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-white">{value}</p>
                {unit && <span className="ml-1 text-sm text-white/70">{unit}</span>}
              </div>
              
              {change !== undefined && (
                <div className={`inline-flex items-center text-sm font-medium ${
                  isPositive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'} from yesterday
                </div>
              )}
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              {loading ? (
                <div className="h-8 w-8 rounded-full bg-white/10 animate-pulse"></div>
              ) : (
                <div className="text-white/80">
                  {icon}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Activity item component with improved layout and animations
const ActivityItem = ({ type, name, time, status, description, priority = 'medium', lang }) => {
  const iconMap = {
    irrigation: <Droplet className="h-5 w-5 text-blue-400" />,
    fertilizer: <Activity className="h-5 w-5 text-green-400" />,
    pest_control: <Bug className="h-5 w-5 text-red-400" />,
    planting: <Leaf className="h-5 w-5 text-emerald-400" />,
    harvesting: <Activity className="h-5 w-5 text-amber-400" />,
    maintenance: <Wrench className="h-5 w-5 text-purple-400" />,
    inspection: <Search className="h-5 w-5 text-cyan-400" />,
  };

  const priorityColors = {
    high: 'bg-red-900/30 text-red-400 border-red-400/20',
    medium: 'bg-yellow-900/30 text-yellow-400 border-yellow-400/20',
    low: 'bg-blue-900/30 text-blue-400 border-blue-400/20',
  };

  const statusColors = {
    completed: 'bg-green-900/30 text-green-400',
    in_progress: 'bg-blue-900/30 text-blue-400',
    pending: 'bg-yellow-900/30 text-yellow-400',
    scheduled: 'bg-purple-900/30 text-purple-400',
    cancelled: 'bg-gray-900/30 text-gray-400',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/10"
    >
      <div className={`p-2.5 rounded-lg ${priorityColors[priority]} border mr-4`}>
        {iconMap[type] || <Activity className="h-5 w-5" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-white truncate">{name}</h4>
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {status.replace('_', ' ')}
          </span>
        </div>
        {description && (
          <p className="text-sm text-white/60 mt-1 line-clamp-1">{description}</p>
        )}
        <div className="flex items-center mt-2 text-xs text-white/50">
          <ClockIcon className="h-3.5 w-3.5 mr-1" />
          <span>{time}</span>
        </div>
      </div>
    </motion.div>
  );
};

const DashboardPage = ({ params }) => {
  const { lang } = params;
  const { currentLanguage } = useLanguage();
  const t = (key) => key; // Fallback translation function
  
  // Sample data - replace with real data from your API
  const [weatherData] = useState({
    temperature: 28,
    humidity: 65,
    rainfall: 15,
    windSpeed: 12,
    pressure: 1013,
    condition: 'sunny',
    forecast: [
      { day: t('monday', currentLanguage) || 'Mon', temp: 28, condition: 'sunny' },
      { day: t('tuesday', currentLanguage) || 'Tue', temp: 27, condition: 'partly-cloudy' },
      { day: t('wednesday', currentLanguage) || 'Wed', temp: 26, condition: 'rain' },
      { day: t('thursday', currentLanguage) || 'Thu', temp: 25, condition: 'rain' },
      { day: t('friday', currentLanguage) || 'Fri', temp: 27, condition: 'partly-cloudy' },
    ]
  });

  const [marketData] = useState({
    rice: { name: t('rice', currentLanguage) || 'Rice', price: 2200, change: 2.5 },
    wheat: { name: t('wheat', currentLanguage) || 'Wheat', price: 1850, change: -1.2 },
    corn: { name: t('corn', currentLanguage) || 'Corn', price: 1600, change: 0.8 },
  });

  const [activities] = useState([
    { 
      id: 1, 
      type: 'irrigation', 
      name: t('irrigation', currentLanguage) || 'Irrigation',
      time: t('hoursAgo', { count: 2 }, currentLanguage) || '2 hours ago', 
      status: 'completed' 
    },
    { 
      id: 2, 
      type: 'fertilizer', 
      name: t('fertilizer', currentLanguage) || 'Fertilizer',
      time: t('dayAgo', { count: 1 }, currentLanguage) || '1 day ago', 
      status: 'pending' 
    },
    { 
      id: 3, 
      type: 'pest_control', 
      name: t('pest_control', currentLanguage) || 'Pest Control',
      time: t('daysAgo', { count: 3 }, currentLanguage) || '3 days ago', 
      status: 'completed' 
    },
  ]);

  const [alerts] = useState([
    { 
      id: 1, 
      type: 'weather', 
      message: t('heavyRainAlert', currentLanguage) || 'Heavy rain expected tomorrow', 
      time: t('hoursAgo', { count: 2 }, currentLanguage) || '2 hours ago',
      priority: 'high'
    },
    { 
      id: 2, 
      type: 'pest', 
      message: t('pestAlert', currentLanguage) || 'Pest alert in your area', 
      time: t('dayAgo', { count: 1 }, currentLanguage) || '1 day ago',
      priority: 'high'
    },
    { 
      id: 3, 
      type: 'market', 
      message: t('priceIncreaseAlert', { percent: 5, crop: t('rice', currentLanguage) || 'rice' }, currentLanguage) || 'Rice prices increased by 5%', 
      time: t('daysAgo', { count: 3 }, currentLanguage) || '3 days ago',
      priority: 'medium'
    },
  ]);

  // Get current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString(currentLanguage, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-emerald-900 text-white">
      {/* Enhanced Header */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                {t('dashboard', currentLanguage) || 'Dashboard'}
              </h1>
              <p className="text-sm text-white/70 mt-1 flex items-center">
                <CalendarDays className="h-4 w-4 mr-2" />
                {formattedDate}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="bg-white/5 border-white/10 text-white/90 hover:bg-white/10 hover:text-white transition-all"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {t('refresh', currentLanguage) || 'Refresh'}
              </Button>
              <Button 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('addActivity', currentLanguage) || 'Add Activity'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-400" />
            {t('quickActions', currentLanguage) || 'Quick Actions'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-24 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-green-500/10">
              <Droplet className="h-6 w-6 text-blue-400" />
              <span>{t('irrigate', currentLanguage) || 'Start Irrigation'}</span>
            </Button>
            <Button className="h-24 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-green-500/10">
              <Activity className="h-6 w-6 text-green-400" />
              <span>{t('addFertilizer', currentLanguage) || 'Add Fertilizer'}</span>
            </Button>
            <Button className="h-24 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-green-500/10">
              <Calendar className="h-6 w-6 text-purple-400" />
              <span>{t('schedule', currentLanguage) || 'Schedule Task'}</span>
            </Button>
            <Button className="h-24 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-green-500/10">
              <BarChart2 className="h-6 w-6 text-amber-400" />
              <span>{t('viewReports', currentLanguage) || 'View Reports'}</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/20 p-6 backdrop-blur-sm"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <Thermometer className="h-6 w-6 text-blue-300" />
                <span className="text-xs font-medium text-blue-300 bg-blue-900/30 px-2 py-1 rounded-full">
                  {t('current', currentLanguage) || 'Current'}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-blue-100">{t('temperature', currentLanguage) || 'Temperature'}</p>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-bold text-white">{weatherData.temperature}°C</p>
                  <span className="ml-2 text-sm text-green-300 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    2.3°
                  </span>
                </div>
                <p className="mt-1 text-xs text-blue-200/70">
                  {t('feelsLike', currentLanguage) || 'Feels like'} {weatherData.temperature + 2}°C
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 border border-cyan-500/20 p-6 backdrop-blur-sm"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-500/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <Droplets className="h-6 w-6 text-cyan-300" />
                <span className="text-xs font-medium text-cyan-300 bg-cyan-900/30 px-2 py-1 rounded-full">
                  {t('current', currentLanguage) || 'Current'}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-cyan-100">{t('humidity', currentLanguage) || 'Humidity'}</p>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-bold text-white">{weatherData.humidity}%</p>
                  <span className="ml-2 text-sm text-red-300 flex items-center">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    5.2%
                  </span>
                </div>
                <div className="mt-3">
                  <Progress 
                    value={weatherData.humidity} 
                    className="h-2"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-900/30 to-indigo-800/20 border border-indigo-500/20 p-6 backdrop-blur-sm"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-500/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <CloudRain className="h-6 w-6 text-indigo-300" />
                <span className="text-xs font-medium text-indigo-300 bg-indigo-900/30 px-2 py-1 rounded-full">
                  {t('last24h', currentLanguage) || 'Last 24h'}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-indigo-100">{t('rainfall', currentLanguage) || 'Rainfall'}</p>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-bold text-white">{weatherData.rainfall}mm</p>
                  <span className="ml-2 text-sm text-green-300 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    8.7mm
                  </span>
                </div>
                <p className="mt-1 text-xs text-indigo-200/70">
                  {t('next24h', currentLanguage) || 'Next 24h'}: 12mm {t('expected', currentLanguage) || 'expected'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/20 p-6 backdrop-blur-sm"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-500/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <Wind className="h-6 w-6 text-purple-300" />
                <span className="text-xs font-medium text-purple-300 bg-purple-900/30 px-2 py-1 rounded-full">
                  {t('current', currentLanguage) || 'Current'}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-purple-100">{t('windSpeed', currentLanguage) || 'Wind Speed'}</p>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-bold text-white">{weatherData.windSpeed} km/h</p>
                  <span className="ml-2 text-sm text-green-300 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    1.5 km/h
                  </span>
                </div>
                <p className="mt-1 text-xs text-purple-200/70">
                  {t('direction', currentLanguage) || 'Direction'}: {weatherData.windDirection}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Weather Forecast */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{t('weatherForecast', currentLanguage)}</CardTitle>
            <CardDescription>{t('next5Days', currentLanguage)}</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="flex space-x-4 overflow-x-auto py-2">
              {weatherData.forecast.map((day) => (
                <div key={day.day} className="flex flex-col items-center p-2 min-w-[80px]">
                  <span className="text-sm font-medium">{day.day}</span>
                  <div className="h-10 w-10 my-2">
                    {day.icon === 'sunny' && <Sun className="h-10 w-10 text-yellow-400" />}
                    {day.icon === 'partly-cloudy' && <CloudSun className="h-10 w-10 text-gray-400" />}
                    {day.icon === 'rain' && <CloudRain className="h-10 w-10 text-blue-400" />}
                  </div>
                  <span className="text-lg font-semibold">{day.temp}°</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Prices */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>{t('marketPrices', currentLanguage)}</CardTitle>
            <CardDescription>{t('currentRates', currentLanguage)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(marketData).map(([crop, data]) => (
                <div key={crop} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{data.name}</p>
                    <p className="text-sm text-muted-foreground">₹{data.price.toLocaleString()}/quintal</p>
                  </div>
                  <div className={`flex items-center ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {data.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span>{Math.abs(data.change)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{t('recentActivities', currentLanguage)}</CardTitle>
              <Button variant="ghost" size="sm">
                {t('view', currentLanguage)}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <div className="mr-4">
                    {activity.type === 'irrigation' && <Droplet className="h-5 w-5 text-blue-500" />}
                    {activity.type === 'fertilizer' && <Activity className="h-5 w-5 text-green-500" />}
                    {activity.type === 'pest_control' && <Bug className="h-5 w-5 text-red-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activity.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status === 'completed' 
                        ? t('completed', currentLanguage) 
                        : t('pending', currentLanguage)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{t('alerts', currentLanguage)}</CardTitle>
              <Button variant="ghost" size="sm">
                {t('view', currentLanguage)}
              </Button>
            </div>
            <CardDescription>{t('importantUpdates', currentLanguage)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start">
                  <div className="mr-3 mt-1">
                    {alert.type === 'weather' && <CloudRain className="h-5 w-5 text-blue-500" />}
                    {alert.type === 'pest' && <Bug className="h-5 w-5 text-red-500" />}
                    {alert.type === 'market' && <TrendingUp className="h-5 w-5 text-green-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-muted-foreground">{alert.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    {t('view', currentLanguage)}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  );
};

export default DashboardPage;
