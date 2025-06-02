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
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

// Weather card component
const WeatherCard = () => {
  const [weather, setWeather] = useState({
    temp: '24°C',
    condition: 'Sunny',
    humidity: '65%',
    location: 'Your Farm',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Weather Update</h3>
          <p className="text-sm text-gray-500 flex items-center">
            <MapPin className="w-4 h-4 mr-1" /> {weather.location}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{weather.temp}</div>
          <p className="text-sm text-gray-500">{weather.condition}</p>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <Droplets className="w-4 h-4 mr-1 text-blue-500" />
          <span>{weather.humidity} Humidity</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1 text-gray-500" />
          <span>Updated {weather.time}</span>
        </div>
      </div>
    </div>
  );
};

// Quick Actions component
const QuickActions = () => (
  <div className="grid grid-cols-2 gap-4">
    {[
      { icon: Calendar, title: 'Planting Calendar', desc: 'Best planting times' },
      { icon: Sun, title: 'Crop Rotation', desc: 'Plan your rotation' },
      { icon: Droplets, title: 'Irrigation', desc: 'Watering schedule' },
      { icon: Leaf, title: 'Pest Control', desc: 'Manage pests' },
    ].map((action, index) => (
      <button
        key={index}
        className="p-4 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 text-left transition-colors"
      >
        <action.icon className="w-6 h-6 text-green-600 mb-2" />
        <h4 className="font-medium text-gray-900">{action.title}</h4>
        <p className="text-sm text-gray-500">{action.desc}</p>
      </button>
    ))}
  </div>
);


// This function tells Next.js which paths to pre-render at build time
export async function generateStaticParams() {
  return languages.map((lang) => ({
    lang: lang.code,
  }));
}

// This ensures dynamic parameters are filled in at request time
export const dynamicParams = true;
export default function CropAssistantPage({ params: { lang } }) {
  const [activeTab, setActiveTab] = useState('ai-assistant');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Your Smart Farming Assistant</h1>
            <p className="text-lg text-green-100">AI-powered tools for healthier crops and better yields</p>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 -mt-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            icon={MessageSquare}
            title="AI Assistant"
            description="Get instant answers to all your farming questions"
          />
          <FeatureCard
            icon={Leaf}
            title="Disease Detection"
            description="Identify crop diseases with AI image analysis"
          />
          <WeatherCard />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-semibold text-lg mb-4 text-gray-900">Quick Actions</h3>
              <QuickActions />
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Daily Tips</h3>
              <div className="space-y-4">
                {[
                  "Water your plants early in the morning to reduce evaporation.",
                  "Check for pests under leaves regularly.",
                  "Rotate crops to maintain soil health.",
                  "Test soil pH every season for optimal growth."
                ].map((tip, i) => (
                  <div key={i} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs 
              defaultValue="ai-assistant" 
              className="w-full"
              onValueChange={setActiveTab}
              scroll={false}
            >
              <div className="mb-6">
                <TabsList className="w-full bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="ai-assistant" 
                    className="flex-1 py-2.5 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-green-600"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    AI Assistant
                  </TabsTrigger>
                  <TabsTrigger 
                    value="disease-detection" 
                    className="flex-1 py-2.5 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-green-600"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Disease Detection
                  </TabsTrigger>
                </TabsList>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4"
                >
                  <TabsContent value="ai-assistant" className="m-0">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Ask Our AI Farming Expert</h2>
                    <p className="text-gray-600 text-sm">Get instant, reliable answers to all your agricultural questions.</p>
                  </TabsContent>
                  <TabsContent value="disease-detection" className="m-0">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Detect Crop Diseases</h2>
                    <p className="text-gray-600 text-sm">Upload a photo to identify diseases and get recommendations.</p>
                  </TabsContent>
                </motion.div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 300px)', minHeight: '600px' }}>
                <TabsContent value="ai-assistant" className="m-0 flex-1 flex flex-col">
                  {activeTab === 'ai-assistant' && (
                    <div className="flex flex-col h-full">
                      <ChatInterface />
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="disease-detection" className="m-0 flex-1">
                  {activeTab === 'disease-detection' && (
                    <div className="h-full overflow-auto p-4">
                      <CropDiseaseDetection />
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to transform your farming experience?</h2>
            <p className="text-gray-600 mb-8">Join thousands of farmers who are already making smarter decisions with our AI-powered tools.</p>
            <button 
              onClick={() => setActiveTab(activeTab === 'ai-assistant' ? 'disease-detection' : 'ai-assistant')}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg transition-colors inline-flex items-center"
            >
              {activeTab === 'ai-assistant' ? (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Try Disease Detection
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with AI Assistant
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
