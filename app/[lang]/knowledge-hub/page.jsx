'use client';

import React from 'react';
import { motion } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Book, Calendar, FileText, GanttChartSquare, ArrowRight, Search } from 'lucide-react';

const articles = [
  {
    title: 'Sustainable Farming Practices',
    category: 'Best Practices',
    description: 'Learn about eco-friendly farming methods that improve soil health and crop yield.',
    readTime: '5 min read',
    date: 'May 15, 2025'
  },
  {
    title: 'Understanding Crop Rotation',
    category: 'Farming Techniques',
    description: 'A comprehensive guide to crop rotation and its benefits for soil fertility.',
    readTime: '7 min read',
    date: 'May 14, 2025'
  },
  {
    title: 'Government Schemes for Farmers',
    category: 'Policy Updates',
    description: 'Latest updates on agricultural schemes and subsidies for farmers.',
    readTime: '6 min read',
    date: 'May 13, 2025'
  }
];

const resources = [
  {
    id: 'crop-calendar',
    name: 'Crop Calendar',
    description: 'Seasonal planting guide for different crops',
    icon: Calendar,
    href: '/crop-calendar',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
    borderColor: 'border-green-100',
  },
  {
    id: 'best-practices',
    name: 'Best Practices',
    description: 'Expert farming techniques and guidelines',
    icon: FileText,
    href: '/knowledge-hub/best-practices',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-100',
  },
  {
    id: 'schemes',
    name: 'Government Schemes',
    description: 'Information about agricultural policies',
    icon: GanttChartSquare,
    href: '/knowledge-hub/schemes',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-100',
  }
];

export default function KnowledgeHub() {
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
              <Book className="h-4 w-4 mr-2" />
              <span>Knowledge Hub</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Farming Knowledge Center</h1>
            <p className="text-lg text-green-100 max-w-2xl">
              Access comprehensive farming guides, best practices, and latest agricultural updates
              to enhance your farming knowledge.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Access Resources */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {resources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href={resource.href}>
                <div className={`p-6 rounded-xl border ${resource.borderColor} ${resource.color} hover:shadow-lg transition-shadow`}>
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm">
                      {React.createElement(resource.icon, { className: `h-6 w-6 ${resource.iconColor}` })}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.name}</h3>
                      <p className="text-gray-600">{resource.description}</p>
                      <Button 
                        variant="ghost" 
                        className={`mt-4 ${resource.iconColor} hover:bg-white/50`}
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Latest Articles */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-9 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Search articles..."
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.title}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="text-sm font-medium text-green-600 mb-2">{article.category}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{article.readTime}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="text-green-700 border-green-200 hover:bg-green-50"
            >
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}