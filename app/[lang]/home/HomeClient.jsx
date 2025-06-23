'use client';

import { Suspense, useState, useEffect } from 'react';
import { t } from '@/translations';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  ArrowRight, 
  Check, 
  Leaf, 
  Sun, 
  Droplet, 
  Calendar, 
  BarChart2, 
  Users, 
  Zap, 
  Shield, 
  TrendingUp,
  Sparkles,
  Award,
  Globe,
  ChevronRight,
  Mail,
  Star,
  Quote
} from 'lucide-react';
import Hero from '@/components/home/Hero';
import QuickStats from '@/components/home/QuickStats';
import DashboardOverview from '@/components/home/DashboardOverview';
import SmartFarmingAssistant from '@/components/home/SmartFarmingAssistant';
import DiseasePredictionCard from '@/components/home/DiseasePredictionCard';
import FeaturedTools from '@/components/home/FeaturedTools';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

const features = (lang) => [
  {
    name: t('home.features.weatherForecast.title', lang) || 'Precision Weather Intelligence',
    description: t('home.features.weatherForecast.description', lang) || 'Hyper-local forecasts with satellite imagery and ML-powered predictions for optimal farming decisions',
    icon: Sun,
    color: 'from-amber-400 to-orange-500',
    bgColor: 'from-amber-50 to-orange-50',
    stats: '99.2% Accuracy',
    trend: '+15% yield improvement'
  },
  {
    name: t('home.features.cropHealth.title', lang) || 'AI Crop Health Monitoring',
    description: t('home.features.cropHealth.description', lang) || 'Computer vision and IoT sensors detect diseases, pests, and nutrient deficiencies before visible symptoms',
    icon: Leaf,
    color: 'from-emerald-400 to-green-500',
    bgColor: 'from-emerald-50 to-green-50',
    stats: '50+ Crop Types',
    trend: '85% early detection'
  },
  {
    name: t('home.features.irrigation.title', lang) || 'Smart Water Management',
    description: t('home.features.irrigation.description', lang) || 'Automated irrigation scheduling using soil moisture sensors and evapotranspiration models',
    icon: Droplet,
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
    stats: '40% Water Savings',
    trend: 'Automated scheduling'
  },
  {
    name: t('home.features.marketPrices.title', lang) || 'Market Intelligence Hub',
    description: t('home.features.marketPrices.description', lang) || 'Real-time pricing, demand forecasting, and supply chain optimization across 2000+ markets',
    icon: TrendingUp,
    color: 'from-purple-400 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
    stats: '2000+ Markets',
    trend: '12% better prices'
  },
];

const testimonials = (lang) => [
  {
    name: t('home.testimonials.rajesh.name', lang) || 'Rajesh Kumar',
    role: t('home.testimonials.rajesh.role', lang) || 'Wheat Farmer, Punjab',
    content: t('home.testimonials.rajesh.content', lang) || 'Agrosarthi transformed my farming. The weather predictions are incredibly accurate, and I increased my yield by 30% while using 25% less water.',
    avatar: '/avatars/rajesh.jpg',
    rating: 5,
    cropYield: '+30%',
    location: 'Punjab, India'
  },
  {
    name: t('home.testimonials.priya.name', lang) || 'Priya Sharma',
    role: t('home.testimonials.priya.role', lang) || 'Organic Vegetable Farmer, Maharashtra',
    content: t('home.testimonials.priya.content', lang) || 'The disease prediction feature saved my tomato crop twice this season. The AI recommendations are like having an agricultural expert on call 24/7.',
    avatar: '/avatars/priya.jpg',
    rating: 5,
    cropYield: '+25%',
    location: 'Maharashtra, India'
  },
  {
    name: t('home.testimonials.arun.name', lang) || 'Arun Patel',
    role: t('home.testimonials.arun.role', lang) || 'Cotton Farmer, Gujarat',
    content: t('home.testimonials.arun.content', lang) || 'Market intelligence helped me time my sales perfectly. I got 15% better prices than my neighbors and the planning tools are incredibly user-friendly.',
    avatar: '/avatars/arun.jpg',
    rating: 5,
    cropYield: '+15%',
    location: 'Gujarat, India'
  },
];

const HomeClient = ({ lang = 'en' }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const featuresRef = useRef(null);
  const isInViewFeatures = useInView(featuresRef, { once: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features(lang).length);
    }, 4000);
    return () => clearInterval(interval);
  }, [lang]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <div className="w-full bg-white">
      <Hero lang={lang} />
      
      <QuickStats lang={lang} />
      
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32 relative">
          
          {/* Enhanced Features Section */}
          <motion.section 
            ref={featuresRef}
            className="relative"
            initial={{ opacity: 0 }}
            animate={isInViewFeatures ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-full px-6 py-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-700 font-medium text-sm">AI-Powered Solutions</span>
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 bg-clip-text text-transparent mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Your Complete Farming Ecosystem
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Harness the power of artificial intelligence, satellite imagery, and IoT sensors to transform every aspect of your agricultural operations
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
              {features(lang).map((feature, index) => (
                <motion.div
                  key={feature.name}
                  className={`group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                    activeFeature === index ? 'ring-2 ring-emerald-200 shadow-xl' : ''
                  }`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                  onHoverStart={() => setActiveFeature(index)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-800 transition-colors">
                      {feature.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Performance</span>
                        <span className="text-sm font-bold text-emerald-600">{feature.stats}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Impact</span>
                        <span className="text-sm font-bold text-blue-600">{feature.trend}</span>
                      </div>
                      
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${feature.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: activeFeature === index ? '85%' : '0%' }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    
                    <motion.div
                      className="mt-6 flex items-center text-emerald-600 font-medium group-hover:text-emerald-700 cursor-pointer"
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-sm">Learn more</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </motion.div>
                  </div>
                  
                  {/* Hover Effects */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Dashboard Overview with Enhanced Design */}
          <motion.section
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-6 py-3 mb-6">
                <BarChart2 className="h-4 w-4 text-blue-600" />
                <span className="text-blue-700 font-medium text-sm">Live Dashboard</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Real-Time Farm Intelligence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Monitor, analyze, and optimize your farming operations with our comprehensive dashboard
              </p>
            </div>
            
            <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-2xl">
              <Suspense fallback={
                <div className="h-96 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl animate-pulse flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32 mx-auto" />
                      <div className="h-3 bg-gray-200 rounded w-24 mx-auto" />
                    </div>
                  </div>
                </div>
              }>
                <DashboardOverview lang={lang} />
              </Suspense>
            </div>
          </motion.section>
          
          {/* Smart Tools Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 bg-purple-50 rounded-full px-6 py-3 mb-6">
                <Zap className="h-4 w-4 text-purple-600" />
                <span className="text-purple-700 font-medium text-sm">AI-Powered Tools</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Smart Farming Assistant
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Leverage cutting-edge AI technology to make data-driven decisions and maximize your farm's potential
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                  <Suspense fallback={
                    <div className="h-96 bg-gradient-to-br from-emerald-50 to-green-50 animate-pulse flex items-center justify-center">
                      <Leaf className="h-12 w-12 text-emerald-300 animate-spin" />
                    </div>
                  }>
                    <DiseasePredictionCard lang={lang} />
                  </Suspense>
                </div>
              </motion.div>
              
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                  <Suspense fallback={
                    <div className="h-96 bg-gradient-to-br from-blue-50 to-cyan-50 animate-pulse flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-blue-300 animate-pulse" />
                    </div>
                  }>
                    <SmartFarmingAssistant lang={lang} />
                  </Suspense>
                </div>
              </motion.div>
            </div>
          </motion.section>
          
          {/* Enhanced Testimonials */}
          <motion.section
            className="relative py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-white to-cyan-50 rounded-3xl" />
            <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-emerald-200/30 to-cyan-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-emerald-100">
                  <Users className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-700 font-medium text-sm">Success Stories</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Trusted by <span className="text-emerald-600">50,000+</span> Farmers
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Join the growing community of successful farmers who have transformed their agricultural practices with our innovative solutions
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                {testimonials(lang).map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ y: -8 }}
                  >
                    {/* Quote Icon */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Quote className="h-4 w-4 text-white" />
                    </div>
                    
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    {/* Content */}
                    <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                      "{testimonial.content}"
                    </blockquote>
                    
                    {/* Performance Stats */}
                    <div className="flex items-center gap-4 mb-6 p-4 bg-emerald-50 rounded-xl">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">{testimonial.cropYield}</div>
                        <div className="text-xs text-emerald-700">Yield Increase</div>
                      </div>
                      <div className="w-px h-10 bg-emerald-200" />
                      <div className="text-center flex-1">
                        <div className="text-sm font-semibold text-gray-700">{testimonial.location}</div>
                        <div className="text-xs text-gray-500">Farm Location</div>
                      </div>
                    </div>
                    
                    {/* Author */}
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-md"
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=10b981&color=fff`;
                          }}
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                      </div>
                      <div className="ml-4">
                        <p className="text-base font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
              
              {/* Trust Indicators */}
              <motion.div
                className="mt-16 grid grid-cols-4 gap-8 items-center justify-items-center opacity-60"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-700">50K+</div>
                  <div className="text-sm text-gray-500">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-700">99.2%</div>
                  <div className="text-sm text-gray-500">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-700">25+</div>
                  <div className="text-sm text-gray-500">States Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-700">4.9/5</div>
                  <div className="text-sm text-gray-500">User Rating</div>
                </div>
              </motion.div>
            </div>
          </motion.section>
          
          {/* Enhanced Newsletter Section */}
          <motion.section
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-cyan-600 rounded-3xl p-12 md:p-16 text-white overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }} />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-10 left-10 w-24 h-24 bg-cyan-300/20 rounded-full blur-2xl" />
              
              <div className="relative max-w-4xl mx-auto text-center">
                <motion.div
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Mail className="h-4 w-4 text-emerald-200" />
                  <span className="text-emerald-100 font-medium text-sm">Weekly Newsletter</span>
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Stay Ahead with <span className="text-cyan-200">Smart Farming</span>
                </h2>
                
                <p className="text-xl text-emerald-50 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Get exclusive insights, weather alerts, market trends, and expert farming tips delivered directly to your inbox every week
                </p>
                
                <AnimatePresence mode="wait">
                  {isSubscribed ? (
                    <motion.div
                      className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl inline-flex items-center space-x-3 border border-white/20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-white">Welcome to Agrosarthi!</div>
                        <div className="text-sm text-emerald-200">Check your email for confirmation</div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form 
                      onSubmit={handleSubscribe} 
                      className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="relative flex-1">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/15 placeholder-emerald-200 text-white text-lg transition-all duration-300"
                        />
                        <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-200" />
                      </div>
                      
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        Subscribe Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
                
                <div className="mt-8 flex items-center justify-center gap-6 text-sm text-emerald-200">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>No spam, ever</span>
                  </div>
                  <div className="w-1 h-1 bg-emerald-300 rounded-full" />
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Join 15,000+ farmers</span>
                  </div>
                  <div className="w-1 h-1 bg-emerald-300 rounded-full" />
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                                    <span>Trusted content</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* Enhanced Featured Tools */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3 mb-6">
                <Globe className="h-4 w-4 text-purple-600" />
                <span className="text-purple-700 font-medium text-sm">Comprehensive Toolkit</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access our complete suite of agricultural tools and calculators designed to optimize every aspect of your farming operation
              </p>
            </div>
            
            <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-xl">
              <Suspense fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl animate-pulse" />
                  ))}
                </div>
              }>
                <FeaturedTools lang={lang} />
              </Suspense>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            className="relative text-center py-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative bg-gradient-to-r from-slate-900 via-green-900 to-emerald-900 rounded-3xl p-16 text-white overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0 opacity-10">
  <div className="absolute inset-0 bg-white/5" style={{
    backgroundImage: `
      linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%),
      linear-gradient(-45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)
    `,
    backgroundSize: '20px 20px'
  }} />
</div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-emerald-400/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-transparent rounded-full blur-3xl" />
              
              <div className="relative max-w-4xl mx-auto">
                <motion.div
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Zap className="h-4 w-4 text-yellow-300" />
                  <span className="text-emerald-200 font-medium text-sm">Start Your Journey</span>
                </motion.div>
                
                <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                  Ready to Transform Your <span className="text-emerald-300">Farm?</span>
                </h2>
                
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of successful farmers who have revolutionized their agricultural practices with our AI-powered platform
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-12 py-6 text-xl font-semibold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <span className="flex items-center">
                      Get Started Free
                      <motion.div
                        className="ml-3"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <ArrowRight className="h-6 w-6" />
                      </motion.div>
                    </span>
                  </Button>
                  
                  <div className="text-center sm:text-left">
                    <div className="text-emerald-200 font-medium">Free 30-day trial</div>
                    <div className="text-gray-400 text-sm">No credit card required</div>
                  </div>
                </div>
                
                {/* Social Proof */}
                <div className="mt-12 flex items-center justify-center gap-8 text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full border-2 border-white" />
                      ))}
                    </div>
                    <span className="text-sm">50K+ farmers trust us</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-500 rounded-full" />
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default HomeClient;