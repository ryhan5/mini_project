'use client';

import dynamic from 'next/dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Loader2, Bot, Star
} from 'lucide-react';
import { motion } from 'framer-motion';

const CropDiseaseDetection = dynamic(
  () => import('../crop-disease/page'),
  { 
    ssr: false,
    loading: () => <LoadingCard title="AI Assistant & Disease Scanner" />
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

export default function CropAssistantClient() {
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
            disease detection, and agricultural best practices to maximize your harvest.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 overflow-hidden"
          >
            <Tabs defaultValue="assistant" className="w-full">
              {/* Tab Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                <div className="flex justify-center">
                  <TabsList className="bg-white/20 backdrop-blur-sm border-white/30">
                    <TabsTrigger 
                      value="assistant" 
                      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-emerald-700 text-white"
                    >
                      <Bot className="h-4 w-4" /> 
                      AI Assistant & Disease Scanner
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <div className="p-6">
                <TabsContent value="assistant" className="mt-0">
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <Bot className="w-12 h-12 mx-auto text-green-600 mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">AI Farming Assistant & Disease Scanner</h3>
                      <p className="text-gray-600">Chat with our AI assistant for farming advice or upload crop images for disease analysis</p>
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
      </div>
    </div>
  );
}