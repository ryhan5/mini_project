'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, MapPin, TrendingUp, Calendar, Droplet, CloudSun } from 'lucide-react';
import Link from 'next/link';
import WeatherTile from '@/components/widgets/WeatherTile';
import CropPriceTile from '@/components/widgets/CropPriceTile';

const tasks = [
  {
    id: 1,
    title: 'Apply fertilizer',
    due: 'Due in 2 days',
    icon: '🌱',
    bgColor: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    textColor: 'text-amber-600',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Irrigation check',
    due: 'Due in 5 days',
    icon: '💧',
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    textColor: 'text-blue-600',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Pest monitoring',
    due: 'Due in 7 days',
    icon: '🐛',
    bgColor: 'bg-green-50',
    iconBg: 'bg-green-100',
    textColor: 'text-green-600',
    priority: 'low'
  }
];

export default function DashboardOverview() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-500">Your personalized farming insights at a glance</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4 md:mt-0"
        >
          <Link href="/dashboard">
            <Button 
              variant="outline" 
              className="group flex items-center text-green-700 border-green-200 bg-white hover:bg-green-50 hover:border-green-300 transition-colors"
            >
              <span>View Full Dashboard</span>
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <DashboardTile 
            title={
              <div className="flex items-center space-x-2">
                <CloudSun className="h-5 w-5 text-blue-500" />
                <span>Weather for Delhi, India</span>
              </div>
            }
            actionText="Change Location"
            actionHref="/weather"
            className="h-full"
          >
            <WeatherTile />
          </DashboardTile>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <DashboardTile 
            title={
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-amber-500" />
                <span>Market Prices</span>
              </div>
            }
            actionText="View All"
            actionHref="/market-prices"
            className="h-full"
          >
            <CropPriceTile />
          </DashboardTile>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <DashboardTile 
            title={
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-500" />
                <span>Upcoming Tasks</span>
              </div>
            }
            actionText="View Calendar"
            actionHref="/crop-calendar"
            className="h-full"
          >
            <div className="space-y-3">
              {tasks.map((task) => (
                <Link 
                  href="/tasks" 
                  key={task.id}
                  className="block group"
                >
                  <div 
                    className={`flex items-center p-3 ${task.bgColor} rounded-lg border border-transparent group-hover:border-gray-200 transition-colors`}
                  >
                    <div className={`h-9 w-9 ${task.iconBg} rounded-full flex items-center justify-center mr-3 text-lg`}>
                      {task.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{task.title}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">{task.due}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${task.iconBg} ${task.textColor}`}>
                          {task.priority === 'high' ? 'High' : task.priority === 'medium' ? 'Medium' : 'Low'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="mt-4 text-center">
                <Link 
                  href="/tasks" 
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  View all tasks
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </DashboardTile>
        </motion.div>
      </div>
    </div>
  );
}

function DashboardTile({
  title,
  actionText,
  actionHref = "#",
  children,
  className = ''
}) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {actionText && (
          <Link 
            href={actionHref}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center group"
          >
            {actionText}
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}