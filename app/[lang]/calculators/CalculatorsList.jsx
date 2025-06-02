'use client';

import { motion } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calculator, Droplets, Leaf, BarChart3, CloudSun, ArrowRight } from 'lucide-react';

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
    name: 'Weather Impact',
    description: 'Check how weather affects your crops and farming schedule',
    icon: CloudSun,
    href: '/calculators/weather',
    color: 'bg-sky-50',
    iconColor: 'text-sky-600',
    borderColor: 'border-sky-100',
  },
  {
    id: 'irrigation',
    name: 'Irrigation Calculator',
    description: 'Calculate water requirements for your crops',
    icon: Droplets,
    href: '/calculators/irrigation',
    color: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    borderColor: 'border-indigo-100',
  },
];

export default function CalculatorsList({ lang }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4"
        >
          <Calculator className="w-8 h-8 text-blue-600" />
        </motion.div>
        <motion.h1 
          className="text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Farming Calculators
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Essential tools to help you plan and optimize your farming operations
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calculator, index) => (
          <motion.div
            key={calculator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className={`p-6 rounded-xl border ${calculator.borderColor} ${calculator.color} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start mb-4">
              <div className={`p-3 rounded-lg ${calculator.color} ${calculator.iconColor} mr-4`}>
                <calculator.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{calculator.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{calculator.description}</p>
              </div>
            </div>
            <Link href={`/${lang}${calculator.href}`}>
              <Button variant="outline" className="w-full mt-4">
                Open Calculator <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
