'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Loader2, Bot, Leaf, Sparkles, Upload, MessageSquare, Zap, 
  Sun, Droplets, Calendar, Clock, MapPin, Thermometer, 
  Wind, Eye, TrendingUp, Star, ChevronRight, Globe,
  RefreshCw, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Dynamically import components
const ChatInterface = dynamic(
  () => import('../ai-assistant/components/ChatInterface'),
  { 
    ssr: false,
    loading: () => <LoadingCard title="AI Assistant" />
  }
);

const CropDiseaseDetection = dynamic(
  () => import('../crop-disease/page'),
  { 
    ssr: false,
    loading: () => <LoadingCard title="Crop Disease Detection" />
  }
);

const LoadingCard = ({ title }) => (
  <div className="flex items-center justify-center h-96 bg-gradient-to-br from-green-50 via-green-100 to-green-50 rounded-2xl border border-green-200/50 backdrop-blur-sm">
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Loader2 className="h-10 w-10 animate-spin text-green-600" />
        <div className="absolute inset-0 h-10 w-10 animate-ping text-green-300 opacity-20">
          <Loader2 className="h-full w-full" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-gray-700 font-medium">Loading {title}...</p>
        <p className="text-gray-500 text-sm">Please wait a moment</p>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, gradient, iconColor }) => (
  <motion.div 
    whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
    whileTap={{ scale: 0.95 }}
    className={cn(
      "group relative overflow-hidden bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50",
      "hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300",
      "hover:border-green-200/60 cursor-pointer",
      gradient
    )}
  >
    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <div className={cn(
        "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-all duration-300",
        "group-hover:scale-110 group-hover:rotate-3",
        iconColor
      )}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-green-800 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
        {description}
      </p>
      <ChevronRight className="w-5 h-5 text-green-600 mt-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
    </div>
  </motion.div>
);

const StatCard = ({ icon: Icon, label, value, trend, color = "text-green-600" }) => (
  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/60 hover:shadow-md transition-all duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <div className="flex items-center mt-1">
            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
            <span className="text-xs text-green-600">{trend}</span>
          </div>
        )}
      </div>
      <div className={cn("p-2 rounded-lg bg-gray-50", color.replace('text-', 'text-'))}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  </div>
);

const WeatherCard = () => {
  const [weather, setWeather] = useState({
    temp: '24°C',
    condition: 'Sunny',
    humidity: '65%',
    rainfall: '0mm',
    windSpeed: '12 km/h',
    visibility: '10 km',
    uvIndex: 'High',
    icon: Sun,
    location: 'Farm Field #12'
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 via-sky-50 to-emerald-50 p-6 rounded-2xl shadow-lg border border-blue-200/50 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-3">
            <h3 className="text-xl font-bold text-gray-900">Weather Station</h3>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
                <Activity className="w-3 h-3 inline mr-1" />
                Live
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1 text-blue-500" /> {weather.location}
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm">
          <weather.icon className="h-8 w-8 text-yellow-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard 
          icon={Thermometer} 
          label="Temperature" 
          value={weather.temp}
          color="text-orange-600"
        />
        <StatCard 
          icon={Droplets} 
          label="Humidity" 
          value={weather.humidity}
          color="text-blue-600"
        />
        <StatCard 
          icon={Wind} 
          label="Wind Speed" 
          value={weather.windSpeed}
          color="text-gray-600"
        />
        <StatCard 
          icon={Eye} 
          label="Visibility" 
          value={weather.visibility}
          color="text-purple-600"
        />
      </div>

      <div className="pt-4 border-t border-blue-200/50 flex justify-between items-center">
        <span className="text-xs text-gray-600 flex items-center">
          <Clock className="w-3 h-3 mr-1" /> Updated 2 min ago
        </span>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          className="flex items-center space-x-1 text-xs text-blue-700 hover:text-blue-900 font-medium transition-colors"
        >
          <RefreshCw className={cn("w-3 h-3", isRefreshing && "animate-spin")} />
          <span>Refresh</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

const QuickActions = () => {
  const actions = [
    { 
      icon: Upload, 
      label: 'Upload Image', 
      desc: 'Analyze crop health',
      gradient: 'from-blue-500 to-blue-600',
      hoverGradient: 'hover:from-blue-600 hover:to-blue-700'
    },
    { 
      icon: MessageSquare, 
      label: 'Ask Question', 
      desc: 'Get expert advice',
      gradient: 'from-green-600 to-green-700',
      hoverGradient: 'hover:from-green-700 hover:to-green-800'
    },
    { 
      icon: Zap, 
      label: 'Quick Tips', 
      desc: 'Smart farming tips',
      gradient: 'from-green-600 to-green-700',
      hoverGradient: 'hover:from-green-700 hover:to-green-800'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200",
              "bg-gradient-to-r text-white shadow-lg hover:shadow-xl",
              action.gradient,
              action.hoverGradient
            )}
          >
            <div className="p-2 bg-white/20 rounded-lg">
              <action.icon className="h-5 w-5" />
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold">{action.label}</p>
              <p className="text-xs opacity-90">{action.desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 opacity-70" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Enhanced suggested questions with categories
const suggestedQuestions = {
  en: {
    'Soil & Fertilizers': [
      'How to prepare soil for rice cultivation?',
      'Best organic fertilizers for tomato plants',
    ],
    'Disease Management': [
      'How to control common wheat diseases?',
      'Identify pest problems in corn crops',
    ],
    'Harvesting': [
      'When to harvest potatoes?',
      'Signs of ready-to-harvest vegetables',
    ]
  },
  hi: {
    'मिट्टी और उर्वरक': [
      'चावल की खेती के लिए मिट्टी कैसे तैयार करें?',
      'टमाटर के पौधों के लिए सबसे अच्छे जैविक उर्वरक',
    ],
    'रोग प्रबंधन': [
      'गेहूं में आम बीमारियों को कैसे नियंत्रित करें?',
      'मक्का की फसल में कीट समस्याओं की पहचान',
    ],
    'कटाई': [
      'आलू की कटाई कब करें?',
      'तैयार सब्जियों की कटाई के संकेत',
    ]
  },
  bn: {
    'মাটি ও সার': [
      'ধান চাষের জন্য মাটি কীভাবে প্রস্তুত করবেন?',
      'টমেটো গাছের জন্য সেরা জৈব সারের নাম',
    ],
    'রোগ ব্যবস্থাপনা': [
      'গমের সাধারণ রোগ কীভাবে নিয়ন্ত্রণ করবেন?',
      'ভুট্টা ফসলে পোকামাকড়ের সমস্যা চিহ্নিতকরণ',
    ],
    'ফসল কাটা': [
      'আলু কখন তুলবেন?',
      'প্রস্তুত সবজি কাটার লক্ষণ',
    ]
  }
};

export default function CropAssistantClient() {
  const [activeTab, setActiveTab] = useState('assistant');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedQuestion, setSelectedQuestion] = useState('');



  const currentQuestions = suggestedQuestions[selectedLanguage] || suggestedQuestions.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Star className="w-4 h-4" />
            <span>Trusted by 10,000+ farmers</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-600">Crop Assistant</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Your intelligent farming companion powered by AI. Get expert advice on crop health, 
            weather insights, and agricultural best practices to maximize your harvest.
          </p>
        </motion.div>

        

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Panel */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 overflow-hidden"
            >
              <Tabs defaultValue="assistant" onValueChange={setActiveTab} className="w-full">
                {/* Enhanced Tab Header */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <TabsList className="bg-white/20 backdrop-blur-sm border-white/30">
                      <TabsTrigger 
                        value="assistant" 
                        className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-emerald-700 text-white"
                      >
                        <Bot className="h-4 w-4" /> 
                        AI Assistant
                      </TabsTrigger>
                      <TabsTrigger 
                        value="disease" 
                        className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-emerald-700 text-white"
                      >
                        <Leaf className="h-4 w-4" /> 
                        Disease Scanner
                      </TabsTrigger>
                    </TabsList>
                    
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-white/80" />
                      <select 
                        value={selectedLanguage}
                        onChange={(e) => {
                          setSelectedLanguage(e.target.value);
                          setSelectedQuestion('');
                        }}
                        className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all"
                      >
                        <option value="en" className="text-gray-900">English</option>
                        <option value="hi" className="text-gray-900">हिंदी</option>
                        <option value="bn" className="text-gray-900">বাংলা</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <TabsContent value="assistant" className="mt-0">
                    <div className="space-y-8">
                      {/* Enhanced Question Categories */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center">
                          <MessageSquare className="w-5 h-5 mr-2 text-emerald-600" />
                          Popular Questions
                        </h3>
                        
                        <div className="space-y-6">
                          {Object.entries(currentQuestions).map(([category, questions], categoryIndex) => (
                            <motion.div
                              key={category}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: categoryIndex * 0.1 }}
                              className="space-y-3"
                            >
                              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2">
                                {category}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {questions.map((question, index) => (
                                  <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedQuestion(question)}
                                    className={cn(
                                      "group text-left p-4 border-2 rounded-xl transition-all text-sm font-medium",
                                      "hover:shadow-lg hover:shadow-emerald-500/10",
                                      selectedQuestion === question 
                                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800 shadow-md' 
                                        : 'border-gray-200 hover:border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50/50'
                                    )}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="flex-1 pr-2">{question}</span>
                                      <ChevronRight className={cn(
                                        "w-4 h-4 transition-all",
                                        selectedQuestion === question 
                                          ? "text-emerald-600 transform rotate-90" 
                                          : "text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1"
                                      )} />
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Chat Interface */}
                      <div className="rounded-xl overflow-hidden border-2 border-emerald-100 shadow-lg">
                        <ChatInterface initialMessage={selectedQuestion} />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="disease" className="mt-0">
                    <div className="space-y-6">
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <Leaf className="w-12 h-12 mx-auto text-green-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Crop Disease Scanner</h3>
                        <p className="text-gray-600">Upload clear images of your crops to detect diseases and get treatment recommendations</p>
                      </div>
                      
                      <div className="rounded-xl overflow-hidden border-2 border-green-100 shadow-lg">
                        <CropDiseaseDetection />
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </motion.div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            <WeatherCard />
            <QuickActions />
            
            {/* Farm Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-gray-600" />
                Farm Analytics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-sm text-gray-600">Active Fields</span>
                  <span className="font-bold text-gray-900">12</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-sm text-gray-600">Health Score</span>
                  <span className="font-bold text-green-600">94%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-sm text-gray-600">Yield Forecast</span>
                  <span className="font-bold text-blue-600">+15%</span>
                </div>
              </div>
            </motion.div>

            {/* Tips Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl shadow-lg border border-amber-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-amber-600" />
                Today's Tip
              </h3>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-amber-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  "Early morning is the best time to water your crops. This allows plants to absorb water before the heat of the day and reduces evaporation loss by up to 30%."
                </p>
                <div className="mt-3 flex items-center text-xs text-amber-700">
                  <Star className="w-3 h-3 mr-1" />
                  <span>Expert Tip</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}