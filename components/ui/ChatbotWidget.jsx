'use client';

import { useState } from 'react';
import { MessageCircle, X, Bot } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const ChatbotWidget = ({ lang = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleCropAIRedirect = () => {
    router.push(`/${lang}/crop-assistant`);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chatbot Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <button
          onClick={toggleChat}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-20"></div>
        </button>
      </motion.div>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-lg shadow-2xl border border-gray-200"
          >
            {/* Header */}
            <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span className="font-semibold">Crop AI</span>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-4">
                <div className="bg-gray-100 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-700">
                    👋 Hello! I'm your AI farming assistant. I can help you with:
                  </p>
                </div>
                
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">🌱</span>
                    Crop disease identification
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">💡</span>
                    Farming advice & tips
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">📊</span>
                    Market price insights
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">🌾</span>
                    Crop planning guidance
                  </li>
                </ul>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleCropAIRedirect}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Bot className="h-4 w-4" />
                <span>Start Chatting with AI</span>
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-2">
                Get instant answers to your farming questions
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
