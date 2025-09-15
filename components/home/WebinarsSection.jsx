'use client';

import { motion } from 'framer-motion';
import { 
  Play, 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp, 
  Leaf, 
  DollarSign, 
  BookOpen, 
  Award,
  ChevronRight,
  Video,
  Star,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { t } from '@/translations';

const webinars = (lang) => [
  {
    id: 1,
    title: 'Getting Started with Agrosarthi',
    description: 'Learn how to navigate our platform and set up your farm profile for maximum benefit',
    duration: '45 min',
    date: 'Dec 15, 2024',
    time: '2:00 PM IST',
    instructor: 'Dr. Rajesh Sharma',
    instructorTitle: 'Agricultural Technology Expert',
    attendees: 1250,
    rating: 4.9,
    level: 'Beginner',
    topics: [
      'Platform overview and navigation',
      'Setting up your farm profile',
      'Understanding dashboard metrics',
      'Basic tool usage'
    ],
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
    category: 'Platform Training'
  },
  {
    id: 2,
    title: 'Crop Optimization Strategies',
    description: 'Master AI-powered crop planning and disease prediction to maximize your harvest yield',
    duration: '60 min',
    date: 'Dec 18, 2024',
    time: '3:00 PM IST',
    instructor: 'Prof. Meera Patel',
    instructorTitle: 'Crop Science Specialist',
    attendees: 2100,
    rating: 4.8,
    level: 'Intermediate',
    topics: [
      'AI crop health monitoring',
      'Disease prediction and prevention',
      'Optimal planting schedules',
      'Yield optimization techniques'
    ],
    icon: Leaf,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50',
    category: 'Crop Management'
  },
  {
    id: 3,
    title: 'Income Maximization Techniques',
    description: 'Discover market intelligence tools and pricing strategies to boost your farm revenue',
    duration: '50 min',
    date: 'Dec 22, 2024',
    time: '4:00 PM IST',
    instructor: 'Mr. Arjun Singh',
    instructorTitle: 'Agricultural Economics Expert',
    attendees: 1800,
    rating: 4.9,
    level: 'Advanced',
    topics: [
      'Market price analysis',
      'Optimal selling timing',
      'Revenue calculators usage',
      'Cost optimization strategies'
    ],
    icon: DollarSign,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
    category: 'Financial Planning'
  }
];

const upcomingWebinars = (lang) => [
  {
    title: 'Smart Irrigation & Water Management',
    date: 'Jan 5, 2025',
    time: '2:30 PM IST',
    category: 'Water Management'
  },
  {
    title: 'Weather Forecasting for Better Planning',
    date: 'Jan 12, 2025',
    time: '3:00 PM IST',
    category: 'Weather Intelligence'
  },
  {
    title: 'Equipment Exchange & Cost Optimization',
    date: 'Jan 19, 2025',
    time: '4:00 PM IST',
    category: 'Equipment Management'
  }
];

const WebinarsSection = ({ lang = 'en' }) => {
  return (
    <motion.section
      className="relative py-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-3xl" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-green-200/20 to-cyan-200/20 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Video className="h-4 w-4 text-blue-600" />
            <span className="text-blue-700 font-medium text-sm">Educational Webinars</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Master Your Farm with Expert Training
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Join our comprehensive webinar series and learn how to leverage Agrosarthi's powerful tools to maximize your crop output and farm income
          </motion.p>
        </div>

        {/* Featured Webinars */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {webinars(lang).map((webinar, index) => (
            <motion.div
              key={webinar.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${webinar.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {webinar.category}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    {webinar.level}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${webinar.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <webinar.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors">
                  {webinar.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {webinar.description}
                </p>

                {/* Topics */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">What you'll learn:</h4>
                  <ul className="space-y-2">
                    {webinar.topics.slice(0, 3).map((topic, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Webinar Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {webinar.date}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      {webinar.duration}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {webinar.attendees.toLocaleString()} registered
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                      {webinar.rating}/5
                    </div>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center mb-6 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">
                      {webinar.instructor.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{webinar.instructor}</div>
                    <div className="text-xs text-gray-600">{webinar.instructorTitle}</div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full bg-gradient-to-r ${webinar.color} hover:opacity-90 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Register Now - Free
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              
              {/* Hover Effects */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Upcoming Webinars */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Upcoming Webinars</h3>
            <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
              View All
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            {upcomingWebinars(lang).map((webinar, index) => (
              <motion.div
                key={index}
                className="flex items-center p-4 bg-white/80 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{webinar.title}</h4>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>{webinar.date} • {webinar.time}</div>
                    <div className="text-emerald-600 font-medium">{webinar.category}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-600">25+</div>
            <div className="text-sm text-gray-600">Expert Instructors</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-emerald-600">15K+</div>
            <div className="text-sm text-gray-600">Farmers Trained</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-purple-600">50+</div>
            <div className="text-sm text-gray-600">Hours of Content</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-orange-600">4.9/5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WebinarsSection;
