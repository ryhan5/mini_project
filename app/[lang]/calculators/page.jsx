'use client';

import { motion } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calculator, Droplets, Leaf, BarChart3, CloudSun, ArrowRight } from 'lucide-react';
import React from 'react';

const calculators = [
  {
    id: 'fertilizer',
    name: 'Fertilizer Calculator',
    description: 'Calculate optimal fertilizer usage based on crop type and land area',
    icon: Leaf,
    href: '/calculators/fertilizer',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
    borderColor: 'border-green-100',
  },
  {
    id: 'revenue',
    name: 'Revenue Calculator',
    description: 'Plan your crop revenue and estimate potential returns',
    icon: BarChart3,
    href: '/calculators/revenue',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-100',
  },
  {
    id: 'weather',
    name: 'Weather Tracking',
    description: 'Real-time weather updates and forecasts for better planning',
    icon: CloudSun,
    href: '/calculators/weather',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderColor: 'border-amber-100',
  },
  {
    id: 'market',
    name: 'Market Price Analysis',
    description: 'Live market prices and price comparison tools',
    icon: Calculator,
    href: '/calculators/market',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-100',
  },
];

export default function CalculatorsPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-100/20 backdrop-blur-sm text-sm font-medium text-white mb-4">
              <Calculator className="h-4 w-4 mr-2" />
              <span>Farming Calculators</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Smart Farming Tools</h1>
            <p className="text-lg text-green-100 max-w-2xl">
              Make data-driven decisions with our comprehensive suite of farming calculators.
              Get precise recommendations for fertilizer usage, revenue planning, and more.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Calculators Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {calculators.map((calculator, index) => (
            <motion.div
              key={calculator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={calculator.href}>
                <div className={`p-6 rounded-xl border ${calculator.borderColor} ${calculator.color} hover:shadow-lg transition-shadow`}>
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm">
                      {React.createElement(calculator.icon, { className: `h-6 w-6 ${calculator.iconColor}` })}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{calculator.name}</h3>
                      <p className="text-gray-600">{calculator.description}</p>
                      <Button 
                        variant="ghost" 
                        className={`mt-4 ${calculator.iconColor} hover:bg-white/50`}
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}