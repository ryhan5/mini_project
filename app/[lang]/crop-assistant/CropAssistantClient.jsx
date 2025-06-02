'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Bot, Leaf, Sparkles, Upload, MessageSquare, Zap, Sun, Droplets, Calendar, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Dynamically import the ChatInterface component with SSR disabled
const ChatInterface = dynamic(
  () => import('../ai-assistant/components/ChatInterface'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-gray-600">Loading AI Assistant...</p>
        </div>
      </div>
    )
  }
);

// Dynamically import the CropDiseaseDetection component
const CropDiseaseDetection = dynamic(
  () => import('../crop-disease/page'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-gray-600">Loading Crop Disease Detection...</p>
        </div>
      </div>
    )
  }
);

const FeatureCard = ({ icon: Icon, title, description, className }) => (
  <motion.div 
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={cn(
      "bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow",
      className
    )}
  >
    <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mb-4 text-green-600">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

// Weather card component
const WeatherCard = () => {
  const [weather, setWeather] = useState({
    temp: '24°C',
    condition: 'Sunny',
    humidity: '65%',
    rainfall: '0mm',
    icon: Sun
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl shadow-sm border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Weather</h3>
          <p className="text-sm text-gray-500">Current conditions</p>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-sm">
          <weather.icon className="h-6 w-6 text-yellow-500" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Temperature</span>
          <span className="font-medium">{weather.temp}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Condition</span>
          <span className="font-medium">{weather.condition}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Humidity</span>
          <span className="font-medium">{weather.humidity}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Rainfall (24h)</span>
          <span className="font-medium">{weather.rainfall}</span>
        </div>
      </div>
    </div>
  );
};

// Quick Actions component
const QuickActions = () => {
  const actions = [
    { icon: Upload, label: 'Upload Image', color: 'text-blue-600 bg-blue-50' },
    { icon: MessageSquare, label: 'Ask Question', color: 'text-green-600 bg-green-50' },
    { icon: Zap, label: 'Quick Tips', color: 'text-purple-600 bg-purple-50' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`flex flex-col items-center justify-center p-4 rounded-xl hover:shadow-md transition-shadow ${action.color} bg-opacity-50 hover:bg-opacity-70`}
          >
            <action.icon className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function CropAssistantClient() {
  const [activeTab, setActiveTab] = useState('assistant');
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      icon: Bot,
      title: 'AI-Powered',
      description: 'Get instant answers to your farming questions with our advanced AI assistant.'
    },
    {
      icon: Leaf,
      title: 'Crop Health',
      description: 'Upload images to detect crop diseases and get treatment recommendations.'
    },
    {
      icon: Sparkles,
      title: 'Smart Tips',
      description: 'Receive personalized farming advice based on your location and crop type.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Crop Assistant</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your intelligent farming companion for crop health, weather updates, and agricultural advice.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="assistant" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
              <TabsTrigger value="disease">Crop Disease Detection</TabsTrigger>
            </TabsList>
            <TabsContent value="assistant">
              <ChatInterface />
            </TabsContent>
            <TabsContent value="disease">
              <CropDiseaseDetection />
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-6">
          <WeatherCard />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
