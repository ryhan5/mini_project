'use client';

import { motion } from '@/lib/motion';
import Link from 'next/link';
import { 
  CloudSun, 
  Calculator, 
  BarChart3, 
  Calendar, 
  ArrowRight,
  Leaf,
  Droplets,
  SunMedium
} from 'lucide-react';

const tools = [
  {
    id: 'weather',
    name: 'Weather Forecast',
    description: 'Get location-specific weather updates',
    icon: CloudSun,
    href: '/weather',
    color: 'bg-blue-50',
    iconColor: 'text-blue-500',
    borderColor: 'border-blue-100',
  },
  {
    id: 'prices',
    name: 'Market Prices',
    description: 'Track real-time crop prices',
    icon: BarChart3,
    href: '/market-prices',
    color: 'bg-amber-50',
    iconColor: 'text-amber-500',
    borderColor: 'border-amber-100',
  },
  {
    id: 'calculators',
    name: 'Farm Calculators',
    description: 'Calculate yields, inputs, and profits',
    icon: Calculator,
    href: '/calculators',
    color: 'bg-purple-50',
    iconColor: 'text-purple-500',
    borderColor: 'border-purple-100',
  },
  {
    id: 'calendar',
    name: 'Crop Calendar',
    description: 'Optimal planting and harvesting times',
    icon: Calendar,
    href: '/crop-calendar',
    color: 'bg-green-50',
    iconColor: 'text-green-500',
    borderColor: 'border-green-100',
  },
  {
    id: 'irrigation',
    name: 'Irrigation Planner',
    description: 'Schedule water management',
    icon: Droplets,
    href: '/calculators/irrigation',
    color: 'bg-cyan-50',
    iconColor: 'text-cyan-500',
    borderColor: 'border-cyan-100',
  },
  {
    id: 'soil',
    name: 'Soil Analysis',
    description: 'Understand your soil composition',
    icon: Leaf,
    href: '/calculators/soil',
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    borderColor: 'border-emerald-100',
  },
];

export default function FeaturedTools({ lang = 'en' }) {
  // Get translations with fallback
  const getTranslation = (key, defaultValue = '') => {
    try {
      return t(`home.featuredTools.${key}`, lang) || defaultValue;
    } catch (e) {
      console.warn(`Translation error for key: home.featuredTools.${key}`, e);
      return defaultValue;
    }
  };

  // Add translations to tools
  const localizedTools = tools.map(tool => ({
    ...tool,
    name: getTranslation(`${tool.id}.name`, tool.name),
    description: getTranslation(`${tool.id}.description`, tool.description)
  }));

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="font-medium text-gray-900">
          {getTranslation('title', 'Featured Tools')}
        </h3>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {localizedTools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} lang={lang} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ToolCard({ tool, index }) {
  const Icon = tool.icon;
  
  return (
    <motion.div
      className={`p-3 rounded-lg border ${tool.borderColor} ${tool.color} hover:shadow-sm transition-shadow`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={tool.href} className="block">
        <div className="flex items-start">
          <div className={`p-2 rounded-md ${tool.iconColor} mr-3`}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">{tool.name}</h4>
            <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}