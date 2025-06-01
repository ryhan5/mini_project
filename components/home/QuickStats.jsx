'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { TrendingUp, CloudSun, CalendarDays, ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const stats = [
  {
    id: 'weather',
    title: 'CURRENT WEATHER',
    value: '32°C',
    description: 'Delhi, Clear Sky',
    icon: CloudSun,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    hoverBg: 'hover:bg-blue-50',
    href: '/weather'
  },
  {
    id: 'crop-price',
    title: 'TOP CROP PRICE',
    value: '₹2,200',
    description: 'Rice (per quintal)',
    icon: ArrowUpRight,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    hoverBg: 'hover:bg-amber-50',
    href: '/market-prices'
  },
  {
    id: 'season',
    title: 'PLANTING SEASON',
    value: 'Kharif',
    description: 'Jun-Sep (Ongoing)',
    icon: CalendarDays,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    hoverBg: 'hover:bg-green-50',
    href: '/crop-calendar'
  },
  {
    id: 'market',
    title: 'MARKET TREND',
    value: '4.8%',
    description: 'Weekly Average',
    icon: TrendingUp,
    trending: true,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    hoverBg: 'hover:bg-emerald-50',
    href: '/market-trends'
  },
];

export default function QuickStats() {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => (
            <Link href={stat.href} key={stat.id} className="group block">
              <motion.div
                className={cn(
                  "bg-white rounded-xl p-5 shadow-sm border border-gray-100",
                  "transition-all duration-300 group-hover:shadow-md group-hover:border-transparent",
                  stat.hoverBg
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 mb-1">{stat.title}</p>
                    <div className="flex items-baseline space-x-2">
                      <p className={cn(
                        "text-2xl font-bold",
                        stat.trending ? "text-emerald-600" : "text-gray-900"
                      )}>
                        {stat.trending && '↑ '}{stat.value}
                      </p>
                      {stat.trending && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                          Trending
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{stat.description}</p>
                    <div className="mt-3 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                      View details
                      <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                  <div className={cn(
                    "rounded-xl p-2.5 transition-transform group-hover:scale-110",
                    stat.iconBg
                  )}>
                    {React.createElement(stat.icon, { 
                      className: cn("h-5 w-5 transition-transform group-hover:scale-110", stat.iconColor) 
                    })}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}