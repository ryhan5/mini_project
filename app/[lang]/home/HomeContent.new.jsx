'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudSun, BarChart2, Droplets, Calendar as CalendarIcon, Bot, Thermometer, Calculator, AlertTriangle, Sun } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function HomeContent() {
  const router = useRouter();
  const { t } = useTranslation();

  // Today's overview data
  const overviewItems = [
    {
      icon: Thermometer,
      title: 'Weather',
      value: '28°C, Sunny',
      trend: 'Ideal for planting',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: BarChart2,
      title: 'Market Trend',
      value: 'Wheat +2.3%',
      trend: 'Prices rising',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: AlertTriangle,
      title: 'Weather Alert',
      value: 'No alerts',
      trend: 'All clear',
      color: 'text-green-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: CalendarIcon,
      title: 'Planting Season',
      value: 'Active',
      trend: 'Best time to plant',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  // Featured tools
  const tools = [
    {
      icon: CloudSun,
      title: 'Weather Forecast',
      description: 'Real-time weather updates and 7-day forecasts',
      link: '/weather',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Calculator,
      title: t('farmCalculators'),
      description: t('farmCalculatorsDescription'),
      link: '/calculators',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: Droplets,
      title: t('irrigationPlanner'),
      description: t('irrigationPlannerDescription'),
      link: '/irrigation',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-600'
    },
    {
      icon: BarChart2,
      title: t('marketPrices'),
      description: t('marketPricesDescription'),
      link: '/market-prices',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Overview */}
      <section className="bg-gradient-to-b from-white to-green-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {t('smartFarming')} <span className="text-green-700">{t('madeSimple')}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t('heroDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-lg font-semibold px-8 py-6"
                  onClick={() => router.push('/dashboard')}
                >
                  {t('getStartedForFree')}
                </Button>
              </div>
              
              {/* AI Assistant Box */}
              <div className="mt-12 bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <Bot className="w-6 h-6 text-green-700" />
                  </div>
                  <h3 className="text-lg font-semibold">{t('smartFarmingAssistant')}</h3>
                </div>
                <p className="text-gray-600 mb-4">{t('askMeAnything')}</p>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder={t('askMeAnythingPlaceholder')}
                    className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-green-600 hover:bg-green-50 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Today's Overview Panel */}
            <div className="bg-white rounded-xl shadow-md p-6 h-full border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Sun className="w-5 h-5 text-yellow-500 mr-2" />
                {t('todaysOverview')}
              </h2>
              <div className="space-y-4">
                {overviewItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`p-2 rounded-lg ${item.bgColor} mr-4`}>
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-500">{item.title}</h4>
                        <p className="font-semibold text-gray-900">{item.value}</p>
                      </div>
                      <span className={`text-sm ${item.color}`}>{item.trend}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('featuredTools')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('essentialToolsDescription')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-md transition-shadow h-full"
                  onClick={() => router.push(tool.link)}
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${tool.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${tool.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                    <p className="text-gray-600">{tool.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Crop Calendar CTA */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border border-green-100">
            <div className="md:flex items-center justify-between p-8 md:p-12">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {t('neverMissPlantingDate')}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {t('cropCalendarDescription')}
                </p>
                <Button 
                  size="lg" 
                  className="bg-green-700 hover:bg-green-800 text-lg font-semibold px-8 py-6"
                  onClick={() => router.push('/crop-calendar')}
                >
                  {t('viewCropCalendar')}
                </Button>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-green-100 p-6 rounded-2xl">
                  <CalendarIcon className="w-16 h-16 text-green-700 mx-auto" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
