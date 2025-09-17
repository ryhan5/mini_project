'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, CloudSun, Calendar, Droplet, TrendingUp } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation'; // Import your custom hook
import Image from 'next/image';
import Link from 'next/link';

export default function Hero({ lang = 'en' }) {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslation(); // Get the t function from the hook

  // Get all translations at the component level
  const translations = {
    hero: {
      welcomeMessage: t('home.hero.welcomeMessage'),
      heroDescription: t('home.hero.heroDescription'),
      getStarted: t('home.hero.getStarted'),
      exploreTools: t('home.hero.exploreTools'),
      todaysOverview: t('home.hero.todaysOverview')
    },
    card: {
      weather: {
        label: t('home.card.weather.label'),
        clearSky: t('home.card.weather.clearSky'),
        alert: t('home.card.weather.alert'),
        lightRain: t('home.card.weather.lightRain')
      },
      market: {
        trend: t('home.card.market.trend'),
        weeklyAvg: t('home.card.market.weeklyAvg')
      },
      planting: {
        season: t('home.card.planting.season'),
        kharif: t('home.card.planting.kharif')
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="flex justify-center lg:justify-start mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
            </motion.div>
           
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
{t('home.hero.welcomeMessage')}
              </h1>
              <div className="relative w-full max-w-[200px] h-auto">
                <Image
                  src="/images/logo.jpeg"
                  alt="Agrosarthi Logo"
                  width={200}
                  height={64}
                  className="rounded-lg shadow-lg object-contain"
                  priority
                />
              </div>
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto lg:mx-0 leading-relaxed mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
{t('home.hero.heroDescription')}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href={`/${lang}/dashboard`}>
                <Button 
                  size="lg" 
                  className="bg-white text-green-700 hover:bg-green-50 px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
{t('home.hero.getStarted')}
                  <motion.span
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.span>
                </Button>
              </Link>
              
              <Link href={`/${lang}/calculators`}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white/30 bg-transparent hover:bg-white/10 text-white hover:text-white px-8 py-6 text-base font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
{t('home.hero.exploreTools')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/10">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
{t('home.hero.todaysOverview')}
                  </span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <div className="p-2 rounded-lg bg-blue-500/10 mr-3">
                        <CloudSun className="h-5 w-5 text-blue-300" />
                      </div>
                      <span className="text-sm text-blue-100">{t('home.card.weather.label')}</span>
                    </div>
                    <p className="text-2xl font-bold">32°C</p>
                    <p className="text-sm text-blue-100/80">{t('home.card.weather.clearSky')}</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <div className="p-2 rounded-lg bg-emerald-500/10 mr-3">
                        <TrendingUp className="h-5 w-5 text-emerald-300" />
                      </div>
                      <span className="text-sm text-emerald-100">{t('home.card.market.trend')}</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-300">↑ 4.8%</p>
                    <p className="text-sm text-emerald-100/80">{t('home.card.market.weeklyAvg')}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300">
                    <div className="p-2 rounded-lg bg-amber-500/10 mr-3 mt-0.5">
                      <CloudSun className="h-5 w-5 text-amber-300" />
                    </div>
                    <div>
                      <p className="font-medium text-amber-100">{t('home.card.weather.alert')}</p>
                      <p className="text-sm text-amber-100/80">{t('home.card.weather.lightRain')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300">
                    <div className="p-2 rounded-lg bg-green-500/10 mr-3 mt-0.5">
                      <Calendar className="h-5 w-5 text-green-300" />
                    </div>
                    <div>
                      <p className="font-medium text-green-100">{t('home.card.planting.season')}</p>
                      <p className="text-sm text-green-100/80">{t('home.card.planting.kharif')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-yellow-300/10 rounded-full filter blur-3xl" />
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-300/10 rounded-full filter blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-500/5 to-transparent -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-yellow-300/5 rounded-full filter blur-3xl -z-10" />
      
      {/* Animated dots */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-yellow-300/30 animate-pulse" />
      <div className="absolute top-1/3 left-1/4 w-1 h-1 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-green-300/30 animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
}