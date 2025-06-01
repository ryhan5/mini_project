'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Droplet, Wind, Calculator, BookOpen, Bot, BarChart2, CalendarDays, Sprout, Bug, ShieldCheck, Leaf, Target, Shield, CloudRain } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function HomeContent() {
  const router = useRouter();
  const { t } = useTranslation();

  // Services data
  const services = [
    {
      title: 'Organic Solutions',
      description: 'Sustainable and eco-friendly farming practices',
      icon: <Leaf className="w-8 h-8 text-green-600" />
    },
    {
      title: 'Farm Management',
      description: 'Complete farm planning and management solutions',
      icon: <Target className="w-8 h-8 text-green-600" />
    },
    {
      title: 'Crop Protection',
      description: 'Protect your crops from pests and diseases',
      icon: <Shield className="w-8 h-8 text-green-600" />
    },
    {
      title: 'Weather Forecast',
      description: 'Accurate weather predictions for better planning',
      icon: <CloudRain className="w-8 h-8 text-green-600" />
    },
    {
      title: 'Irrigation',
      description: 'Efficient water management solutions',
      icon: <Droplet className="w-8 h-8 text-green-600" />
    },
    {
      title: 'Market Prices',
      description: 'Real-time crop prices and market trends',
      icon: <BarChart2 className="w-8 h-8 text-green-600" />
    }
  ];

  // Features data
  const features = [
    'Expert Guidance',
    'Quality Seeds',
    'Sustainable Practices',
    '24/7 Support',
    'Market Access',
    'Training Programs'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('welcome')}</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {t('heroDescription')}
            </p>
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  className="pl-10 pr-4 py-6 text-lg rounded-full border-0 shadow-lg"
                  placeholder={t('searchPlaceholder')}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      // Handle search
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('exploreFeatures')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(`/${lang}${feature.href}`)}
            >
              <CardHeader>
                <div className="flex items-center space-x-2">
                  {feature.icon}
                  <CardTitle className="text-lg">{t(feature.key)}</CardTitle>
                </div>
                <CardDescription>{t(feature.descriptionKey)}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('quickActions')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-green-100 rounded-full">
                      {action.icon}
                    </div>
                    <CardTitle className="text-lg">{t(action.titleKey)}</CardTitle>
                  </div>
                  <CardDescription>{t(action.descriptionKey)}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push(`/${lang}${action.href}`)}
                  >
                    {t('goTo')} {t(action.titleKey)}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Weather & Stats Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="weather" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-xs">
              <TabsTrigger value="weather">{t('weather')}</TabsTrigger>
              <TabsTrigger value="market">{t('marketPrices')}</TabsTrigger>
            </TabsList>
            <TabsContent value="weather">
              <Card>
                <CardHeader>
                  <CardTitle>{t('weatherForecast')}</CardTitle>
                  <CardDescription>{t('currentWeatherConditions')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-5xl">🌤️</div>
                      <div>
                        <div className="text-4xl font-bold">28°C</div>
                        <div className="text-gray-500">{t('partlyCloudy')}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Droplet className="h-5 w-5 text-blue-500" />
                        <span>{t('humidity')}: 65%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Wind className="h-5 w-5 text-gray-500" />
                        <span>{t('wind')}: 10 km/h</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push(`/${lang}/weather`)}
                  >
                    {t('viewFullForecast')}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="market">
              <Card>
                <CardHeader>
                  <CardTitle>{t('marketPrices')}</CardTitle>
                  <CardDescription>{t('latestCropPrices')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Rice', 'Wheat', 'Cotton', 'Soybean'].map((crop, i) => (
                      <div key={i} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                        <span>{crop}</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          ₹{(Math.random() * 1000).toFixed(2)}/quintal
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push(`/${lang}/market-prices`)}
                  >
                    {t('viewAllPrices')}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
