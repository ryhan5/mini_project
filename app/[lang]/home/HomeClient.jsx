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

const features = [
  {
    name: 'Weather Forecast',
    description: 'Get accurate weather predictions for your farm location.',
    icon: Sun,
  },
  {
    name: 'Crop Health',
    description: 'Monitor and predict crop health with AI-powered analysis.',
    icon: Leaf,
  },
  {
    name: 'Irrigation',
    description: 'Optimize water usage with smart irrigation recommendations.',
    icon: Droplet,
  },
  {
    name: 'Market Prices',
    description: 'Stay updated with real-time market prices for your produce.',
    icon: TrendingUp,
  },
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Farmer, Punjab',
    content: 'Agrosarthi has transformed how I manage my farm. The weather predictions are spot on!',
    avatar: '/avatars/rajesh.jpg',
  },
  {
    name: 'Priya Sharma',
    role: 'Organic Farmer, Kerala',
    content: 'The crop disease detection feature saved my entire harvest. Highly recommended!',
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
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">{t('home.everythingYouNeed', lang)}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            {t('home.comprehensiveTools', lang)}
          </p>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
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
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">{t('home.quickActions', lang)}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.getInstantInsights', lang)}
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
        <div className="bg-gray-50 rounded-2xl p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-12">{t('home.trustedByFarmers', lang)}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="bg-white p-6 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Stay Updated</h2>
            <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest farming tips, weather updates, and exclusive offers.
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
                  <span>Thank you for subscribing!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-green-200 text-white"
                  />
                  <Button
                    type="submit"
                    className="bg-white text-green-700 hover:bg-green-50 px-6 py-3 font-medium whitespace-nowrap"
                  >
                    Subscribe
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
