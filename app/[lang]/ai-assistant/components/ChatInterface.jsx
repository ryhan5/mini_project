'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Send, 
  Image as ImageIcon, 
  Camera, 
  X, 
  Globe, 
  Leaf, 
  Droplet, 
  Bug, 
  Sun,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Bot
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getAIResponse, analyzeImageQuery } from '@/lib/aiAssistant';

const analysisTypes = [
  { id: 'soil', name: 'Soil Analysis', icon: <Droplet className="h-5 w-5" />, color: 'bg-blue-500' },
  { id: 'plant', name: 'Plant Health', icon: <Leaf className="h-5 w-5" />, color: 'bg-green-500' },
  { id: 'pest', name: 'Pest Detection', icon: <Bug className="h-5 w-5" />, color: 'bg-red-500' },
  { id: 'weather', name: 'Weather Impact', icon: <Sun className="h-5 w-5" />, color: 'bg-yellow-500' },
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'mr', name: 'मराठी' },
];

const suggestedQuestions = {
  en: [
    { text: 'How can I improve soil fertility naturally?', type: 'soil' },
    { text: 'What are signs of nutrient deficiency in rice plants?', type: 'plant' },
    { text: 'Best practices for organic pest control?', type: 'pest' },
    { text: 'How to prepare land for wheat cultivation?', type: 'soil' },
  ],
  hi: [
    { text: 'मैं प्राकृतिक रूप से मिट्टी की उर्वरता कैसे बढ़ा सकता हूं?', type: 'soil' },
    { text: 'चावल के पौधों में पोषक तत्वों की कमी के लक्षण क्या हैं?', type: 'plant' },
    { text: 'जैविक कीट नियंत्रण के लिए सर्वोत्तम प्रथाएं?', type: 'pest' },
    { text: 'गेहूं की खेती के लिए जमीन कैसे तैयार करें?', type: 'soil' },
  ]
};

export default function ChatInterface({ initialMessage }) {
  const [message, setMessage] = useState(initialMessage || '');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedAnalysis, setSelectedAnalysis] = useState('soil');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your farming assistant. You can ask me anything about farming, upload images for analysis, or use the quick actions below.',
      timestamp: new Date().toISOString(),
      type: 'text'
    },
  ]);
  
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check if image
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setSelectedImage(file);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeImageWithAI = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Add user message with image
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: imagePreview,
      timestamp: new Date().toISOString(),
      type: 'image',
      analysisType: selectedAnalysis
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      // Convert image to base64
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(selectedImage);
      });
      
      // Create a prompt based on the selected analysis type
      let prompt = '';
      switch(selectedAnalysis) {
        case 'soil':
          prompt = 'Analyze this soil image and provide information about its condition, including potential nutrient levels, texture, and any visible issues. Provide a health score between 0-100% and key observations.';
          break;
        case 'plant':
          prompt = 'Examine this plant image and assess its health. Look for signs of disease, nutrient deficiencies, or other issues. Provide a health score between 0-100% and specific recommendations.';
          break;
        case 'pest':
          prompt = 'Inspect this image for any signs of pests or diseases. Identify any visible pests, damage patterns, or disease symptoms. Provide a severity assessment and recommended actions.';
          break;
        case 'weather':
          prompt = 'Based on the visible environmental conditions in this image, analyze the potential impact on crops. Consider factors like sunlight, moisture, and visible weather conditions.';
          break;
        default:
          prompt = 'Please analyze this image and provide detailed insights.';
      }
      
      // Call our AI assistant for image analysis
      const analysisResult = await analyzeImageQuery(base64Image, prompt);
      
      // Add AI response
      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: analysisResult.message,
        timestamp: new Date().toISOString(),
        type: 'text',
        analysis: {
          type: selectedAnalysis,
          results: [
            { label: 'Analysis Type', value: selectedAnalysis, level: 'info' },
            { label: 'Status', value: 'Analysis Complete', level: 'success' }
          ]
        }
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      
      const errorResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error while analyzing the image. Please try again later.',
        timestamp: new Date().toISOString(),
        type: 'text',
        isError: true
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Update message when initialMessage changes
  useEffect(() => {
    if (initialMessage !== undefined) {
      setMessage(initialMessage);
      // Auto-focus the input after setting the question
      setTimeout(() => {
        document.querySelector('textarea')?.focus();
      }, 0);
    }
  }, [initialMessage]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() && !selectedImage) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Add loading indicator
    const loadingMessage = {
      id: 'loading-' + Date.now(),
      role: 'assistant',
      content: 'Thinking...',
      timestamp: new Date().toISOString(),
      type: 'text',
      isLoading: true
    };
    
    setMessages(prev => [...prev, loadingMessage]);
    
    try {
      // Create a prompt for the AI
      const prompt = `You are an AI farming assistant. The user has asked: "${message}"
      
      Please provide a helpful, accurate, and practical response. Include relevant agricultural advice, best practices, and any other useful information.`;
      
      // Call our AI assistant
      const aiResponse = await getAIResponse(prompt);
      const response = aiResponse.message;
      
      // Remove loading message and add AI response
      setMessages(prev => {
        const updated = prev.filter(msg => msg.id !== loadingMessage.id);
        updated.push({
          id: Date.now() + 1,
          role: 'assistant',
          content: response,
          timestamp: new Date().toISOString(),
          type: 'text'
        });
        return updated;
      });
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Update loading message with error
      setMessages(prev => {
        const updated = prev.filter(msg => msg.id !== loadingMessage.id);
        updated.push({
          id: Date.now() + 1,
          role: 'assistant',
          content: 'Sorry, I encountered an error while processing your request. Please try again.',
          timestamp: new Date().toISOString(),
          type: 'text',
          isError: true
        });
        return updated;
      });
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion.text);
    setSelectedAnalysis(suggestion.type);
  };

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative">
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-20">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="appearance-none bg-white/95 backdrop-blur-sm border border-gray-300/50 rounded-2xl pl-4 pr-10 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-lg hover:bg-white transition-all duration-200 font-medium"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <Globe className="h-4 w-4" />
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col min-h-0 relative">
        {/* Welcome Section */}
        {messages.length === 1 && (
          <div className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-2xl mb-6">
                  <Bot className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to AI Farming Assistant</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Get expert farming advice, crop analysis, and personalized recommendations powered by advanced AI technology.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {suggestedQuestions[selectedLanguage]?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="group p-4 text-left bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl hover:bg-white hover:border-green-300 hover:shadow-xl transition-all duration-300 text-gray-700 hover:text-green-700"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <Sparkles className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{suggestion.text}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6 min-h-0">
          {messages.length > 1 && messages.slice(1).map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === 'assistant' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`max-w-4xl rounded-3xl px-6 py-5 ${
                  msg.role === 'assistant'
                    ? 'bg-white/95 backdrop-blur-md border border-gray-200/30 rounded-tl-lg shadow-xl hover:shadow-2xl transition-all duration-300'
                    : 'bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 text-white rounded-tr-lg shadow-xl'
                }`}
              >
                {msg.type === 'image' ? (
                  <div className="w-64 h-48 rounded-lg overflow-hidden border border-gray-200 relative">
                    <img 
                      src={msg.content} 
                      alt="Uploaded for analysis" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                      {msg.analysisType} Analysis
                    </div>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">
                    {msg.isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    ) : msg.isError ? (
                      <div className="text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        {msg.content}
                      </div>
                    ) : (
                      <p className={msg.role === 'assistant' ? 'text-gray-800' : 'text-white'}>{msg.content}</p>
                    )}
                  </div>
                )}
                
                {msg.analysis && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <h4 className="font-medium text-sm mb-2">Analysis Results:</h4>
                    <div className="space-y-2">
                      {msg.analysis.results.map((result, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{result.label}:</span>
                          <span className={`font-medium ${
                            result.level === 'good' ? 'text-green-600' : 
                            result.level === 'warning' ? 'text-yellow-600' : 'text-gray-700'
                          }`}>
                            {result.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className={`text-xs mt-1 ${
                  msg.role === 'assistant' ? 'text-gray-400' : 'text-white/80'
                }`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Modern Input Area */}
        <div className="border-t border-gray-200/30 p-6 bg-white/95 backdrop-blur-md flex-shrink-0 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5"></div>
          {(selectedImage || imagePreview) && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-sm text-gray-700">Analyze as:</h3>
                <button
                  onClick={removeImage}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex space-x-2 mb-4">
                {['Disease', 'Pest', 'Nutrient Deficiency', 'Weed'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedAnalysis(type.toLowerCase())}
                    className={`px-3 py-1.5 text-xs rounded-lg border ${
                      selectedAnalysis === type.toLowerCase()
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="relative h-40 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3">
                <Button
                  onClick={analyzeImageWithAI}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Image'
                  )}
                </Button>
              </div>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="relative z-10">
            <div className="flex items-end space-x-4 bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-xl border border-gray-200/50">
              <div className="relative flex-1">
                <Input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about farming..."
                  className="pr-16 h-14 rounded-2xl border-0 focus:border-0 focus:ring-2 focus:ring-green-500 bg-gray-50/80 backdrop-blur-sm shadow-inner text-base placeholder:text-gray-500"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200"
                  >
                    <ImageIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                  >
                    <Camera className="h-5 w-5" />
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  capture="environment"
                />
              </div>
              <Button
                type="submit"
                size="icon"
                className="h-14 w-14 rounded-2xl bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 flex-shrink-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95"
                disabled={!message?.trim() && !selectedImage}
              >
                <Send className="h-6 w-6" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
