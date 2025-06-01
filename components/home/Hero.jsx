'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, CloudSun, Calendar, Droplet, TrendingUp } from 'lucide-react';
import { t } from '@/translations';

export default function Hero({ lang = 'en' }) {
  const [isHovered, setIsHovered] = useState(false);

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
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-white shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Leaf className="h-4 w-4 mr-2" />
              <span>Smart Farming Assistant</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Welcome to <span className="text-yellow-300">Agrosarthi</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Make data-driven decisions for your farm with our comprehensive suite of tools providing weather updates, market prices, farming calculators, and AI-powered advice.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-green-700 hover:bg-green-50 px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Get Started
                <motion.span
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/30 bg-transparent hover:bg-white/10 text-white hover:text-white px-8 py-6 text-base font-medium transition-all duration-300 transform hover:-translate-y-1"
              >
                Explore Tools
              </Button>
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
                    Today's Overview
                  </span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <div className="p-2 rounded-lg bg-blue-500/10 mr-3">
                        <CloudSun className="h-5 w-5 text-blue-300" />
                      </div>
                      <span className="text-sm text-blue-100">Weather</span>
                    </div>
                    <p className="text-2xl font-bold">32°C</p>
                    <p className="text-sm text-blue-100/80">Clear Sky</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <div className="p-2 rounded-lg bg-emerald-500/10 mr-3">
                        <TrendingUp className="h-5 w-5 text-emerald-300" />
                      </div>
                      <span className="text-sm text-emerald-100">Market Trend</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-300">↑ 4.8%</p>
                    <p className="text-sm text-emerald-100/80">Weekly Average</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300">
                    <div className="p-2 rounded-lg bg-amber-500/10 mr-3 mt-0.5">
                      <CloudSun className="h-5 w-5 text-amber-300" />
                    </div>
                    <div>
                      <p className="font-medium text-amber-100">Weather Alert</p>
                      <p className="text-sm text-amber-100/80">Light rain expected tomorrow</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300">
                    <div className="p-2 rounded-lg bg-green-500/10 mr-3 mt-0.5">
                      <Calendar className="h-5 w-5 text-green-300" />
                    </div>
                    <div>
                      <p className="font-medium text-green-100">Planting Season</p>
                      <p className="text-sm text-green-100/80">Kharif crops - Optimal planting time</p>
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