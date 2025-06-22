'use client';

import { Suspense, useState } from 'react';
import { t } from '@/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Leaf, Sun, Droplet, Calendar, BarChart2, Users, Zap, Shield, TrendingUp } from 'lucide-react';
import Hero from '@/components/home/Hero';
import QuickStats from '@/components/home/QuickStats';
import DashboardOverview from '@/components/home/DashboardOverview';
import SmartFarmingAssistant from '@/components/home/SmartFarmingAssistant';
import DiseasePredictionCard from '@/components/home/DiseasePredictionCard';
import FeaturedTools from '@/components/home/FeaturedTools';
import { Button } from '@/components/ui/button';

const features = (lang) => [
  {
    name: t('home.features.weatherForecast.title', lang) || 'Precision Weather Insights',
    description: t('home.features.weatherForecast.description', lang) || 'Hyper-local weather forecasts and real-time alerts to optimize your farming schedule and protect your crops',
    icon: Sun,
  },
  {
    name: t('home.features.cropHealth.title', lang) || 'Crop Health Monitoring',
    description: t('home.features.cropHealth.description', lang) || 'AI-powered disease detection and health analysis for over 50+ crops with actionable recommendations',
    icon: Leaf,
  },
  {
    name: t('home.features.irrigation.title', lang) || 'Smart Irrigation Planning',
    description: t('home.features.irrigation.description', lang) || 'Data-driven water management solutions to maximize yield while conserving water resources',
    icon: Droplet,
  },
  {
    name: t('home.features.marketPrices.title', lang) || 'Market Intelligence',
    description: t('home.features.marketPrices.description', lang) || 'Real-time crop prices, demand forecasts, and market trends across major mandis in India',
    icon: TrendingUp,
  },
];

const testimonials = (lang) => [
  {
    name: t('home.testimonials.rajesh.name', lang),
    role: t('home.testimonials.rajesh.role', lang),
    content: t('home.testimonials.rajesh.content', lang),
    avatar: '/avatars/rajesh.jpg',
  },
  {
    name: t('home.testimonials.priya.name', lang),
    role: t('home.testimonials.priya.role', lang),
    content: t('home.testimonials.priya.content', lang),
    avatar: '/avatars/priya.jpg',
  },
];

const HomeClient = ({ lang = 'en' }) => {
  // Using the t function from translations
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add subscription logic here
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <div className="w-full">
      <Hero lang={lang} />
      
      {/* Quick Stats */}
      <QuickStats lang={lang} />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Features Grid */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            {t('home.everythingYouNeed', lang) || 'Your Complete Farming Companion'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            {t('home.comprehensiveTools', lang) || 'Access powerful tools and insights to optimize every aspect of your farming operations, from crop planning to market sales'}
          </p>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features(lang).map((feature, index) => (
              <motion.div
                key={feature.name}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dashboard Overview */}
        <Suspense fallback={<div className="h-96 bg-gray-50 rounded-2xl animate-pulse"></div>}>
          <DashboardOverview lang={lang} />
        </Suspense>
        
        {/* Quick Actions */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              {t('home.quickActions', lang) || 'Smart Farming Tools'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.getInstantInsights', lang) || 'Leverage our AI-powered tools to make informed decisions and boost your farm\'s productivity'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Suspense fallback={<div className="h-96 bg-gray-50 rounded-2xl animate-pulse"></div>}>
              <DiseasePredictionCard lang={lang} />
            </Suspense>
            <Suspense fallback={<div className="h-96 bg-gray-50 rounded-2xl animate-pulse"></div>}>
              <SmartFarmingAssistant lang={lang} />
            </Suspense>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {t('home.testimonials.title', lang) || 'Trusted by Farmers Across India'}
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                {t('home.testimonials.subtitle', lang) || 'Join thousands of successful farmers who have transformed their agricultural practices with our innovative solutions'}
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-8">
              {testimonials(lang).map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-base text-gray-600">"{testimonial.content}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              {t('home.newsletter.title', lang) || 'Stay Ahead with Agrosarthi'}
            </h2>
            <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
              {t('home.newsletter.description', lang) || 'Subscribe to our newsletter for the latest farming insights, weather updates, and exclusive tips to maximize your harvest'}
            </p>
            
            <AnimatePresence>
              {isSubscribed ? (
                <motion.div
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-lg inline-flex items-center space-x-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Check className="h-5 w-5 text-green-300" />
                  <span>{t('home.newsletter.thankYou', lang)}</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('home.newsletter.emailPlaceholder', lang) || 'Enter your email address'}
                    aria-label="Email address"
                    className="flex-1 px-5 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-green-200 text-white"
                  />
                  <Button
                    type="submit"
                    className="bg-white text-green-700 hover:bg-green-50 px-6 py-3 font-medium whitespace-nowrap"
                  >
                    {t('home.newsletter.subscribeButton', lang) || 'Subscribe Now'}
                    <span className="sr-only">Subscribe to our newsletter</span>
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Featured Tools */}
        <Suspense fallback={<div className="h-96 bg-gray-50 rounded-2xl animate-pulse"></div>}>
          <FeaturedTools lang={lang} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomeClient;
