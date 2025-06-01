'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Bot, Sparkles, Leaf, Zap, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const features = [
  {
    title: 'Crop Planning',
    description: 'Get personalized crop recommendations based on your soil type and climate',
    icon: <Leaf className="h-5 w-5 text-green-600" />,
    color: 'bg-green-50',
    href: '/crop-planner'
  },
  {
    title: 'Pest & Disease',
    description: 'Identify and treat common crop diseases and pests',
    icon: <Zap className="h-5 w-5 text-amber-600" />,
    color: 'bg-amber-50',
    href: '/crop-disease'
  },
  {
    title: 'Smart Tips',
    description: 'Daily farming tips and best practices',
    icon: <Sparkles className="h-5 w-5 text-blue-600" />,
    color: 'bg-blue-50',
    href: '/farming-tips'
  }
];

export default function SmartFarmingAssistant() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Smart Farming Assistant</h3>
              <p className="text-green-100 text-sm">AI-powered guidance for your farm</p>
            </div>
          </div>
          <Link 
            href="/crop-assistant" 
            className="text-xs font-medium text-white/90 hover:text-white flex items-center"
          >
            Open Full Assistant
            <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
      
      <div className="p-1 bg-gradient-to-r from-green-50 via-white to-green-50">
        <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
      </div>
      
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {features.map((feature, index) => (
            <Link 
              key={index} 
              href={feature.href}
              className="group block"
            >
              <motion.div 
                className={`${feature.color} p-4 rounded-lg border border-gray-100 group-hover:border-green-200 transition-colors h-full`}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg ${feature.color} border border-gray-100 mr-3`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="h-8 w-8 rounded-xl bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
              <Bot className="h-4 w-4 text-green-600" />
            </div>
            <div className="bg-gray-50 rounded-xl p-3 max-w-[85%]">
              <p className="text-sm text-gray-800">
                Ask me anything about farming practices, crop diseases, market conditions, or get personalized recommendations for your farm.
              </p>
            </div>
          </div>
          
          <div className="flex items-start justify-end">
            <div className="bg-green-100 rounded-xl p-3 max-w-[85%] mr-10">
              <p className="text-sm text-gray-800">
                When should I plant rice in Delhi region?
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="h-8 w-8 rounded-xl bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
              <Bot className="h-4 w-4 text-green-600" />
            </div>
            <div className="bg-gray-50 rounded-xl p-3 max-w-[85%]">
              <p className="text-sm text-gray-800">
                In the Delhi region, the ideal time to plant rice is during the Kharif season, typically from June to mid-July after the first monsoon rains. This timing ensures optimal growth conditions.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <form 
            className="flex space-x-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (message.trim()) {
                router.push(`/crop-assistant?q=${encodeURIComponent(message)}`);
              }
            }}
          >
            <Input
              className="flex-1 bg-gray-50 border-gray-200 focus:border-green-400 focus:ring-green-300"
              placeholder="Ask about farming practices, crop diseases, etc."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="bg-green-600 hover:bg-green-700 transition-colors"
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Try asking: "Best crops for black soil?" or "How to prevent rice blast?"
          </p>
        </div>
      </div>
    </div>
  );
}