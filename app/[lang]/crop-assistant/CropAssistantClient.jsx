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

// Language-specific suggested questions
const suggestedQuestions = {
  en: [
    'How to prepare soil for rice cultivation?',
    'Best organic fertilizers for tomato plants',
    'How to control common wheat diseases?',
    'When to harvest potatoes?'
  ],
  hi: [
    'चावल की खेती के लिए मिट्टी कैसे तैयार करें?',
    'टमाटर के पौधों के लिए सबसे अच्छे जैविक उर्वरक',
    'गेहूं में आम बीमारियों को कैसे नियंत्रित करें?',
    'आलू की कटाई कब करें?'
  ],
  bn: [
    'ধান চাষের জন্য মাটি কীভাবে প্রস্তুত করবেন?',
    'টমেটো গাছের জন্য সেরা জৈব সারের নাম',
    'গমের সাধারণ রোগ কীভাবে নিয়ন্ত্রণ করবেন?',
    'আলু কখন তুলবেন?'
  ]
};

export default function CropAssistantClient() {
  const [activeTab, setActiveTab] = useState('assistant');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedQuestion, setSelectedQuestion] = useState('');

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
  
  const currentQuestions = suggestedQuestions[selectedLanguage] || suggestedQuestions.en;

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
            <div className="flex justify-between items-center mb-6">
              <TabsList className="grid w-full max-w-xs grid-cols-2">
                <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
                <TabsTrigger value="disease">Crop Disease Detection</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Language:</span>
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="text-sm border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="bn">বাংলা</option>
                </select>
              </div>
            </div>
            
            <TabsContent value="assistant">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {currentQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedQuestion(question)}
                      className="text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors text-sm hover:border-green-300 hover:text-green-700"
                    >
                      {question}
                    </button>
                  ))}
                </div>
                <ChatInterface initialMessage={selectedQuestion} />
              </div>
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
