'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, Image as ImageIcon, Loader2, AlertCircle, CheckCircle, X, Send, MessageCircle, Bot, User, Mic, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { predictCropDisease, validateImageForML, imageToBase64 } from '@/lib/cropDiseaseML';
import { getAIResponse, analyzeImageQuery } from '@/lib/geminiAI';

export default function CropDiseaseClient() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  // AI Chat functionality
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your AI farming assistant. I can help you with crop diseases, farming advice, and answer any agricultural questions. You can also upload images for disease analysis.',
      timestamp: new Date().toISOString(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'scanner'
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setSelectedImage(file);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };


  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCameraOpen(true);
        setError(null);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access camera. Please check permissions and try again.');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  // Capture photo from camera
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        const file = new File([blob], 'captured-photo.jpg', { type: 'image/jpeg' });
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
        stopCamera();
      }, 'image/jpeg', 0.9);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.value = '';
    }
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle text message send
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    console.log('Sending message:', inputMessage);
    
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);
    
    try {
      console.log('Calling Gemini AI...');
      
      // Call Gemini AI for response
      const aiResponse = await getAIResponse(currentMessage);
      console.log('Gemini AI Response received:', aiResponse);
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: aiResponse.message || 'I received your message but had trouble generating a response.',
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle image analysis with chat integration
  const analyzeImageWithChat = async () => {
    if (!selectedImage) return;
    
    // Add user message with image
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: 'Please analyze this crop image for diseases',
      timestamp: new Date().toISOString(),
      type: 'image',
      imageUrl: imagePreview
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsAnalyzing(true);
    setIsTyping(true);
    
    try {
      // Use ML model for disease prediction
      const base64Image = await imageToBase64(selectedImage);
      const mlResult = await predictCropDisease(base64Image, 'general');
      
      // Format response for chat
      const analysisContent = `🔍 **Disease Analysis Complete**

**Detected:** ${mlResult.disease}
**Confidence:** ${Math.round(mlResult.confidence * 100)}%
**Description:** ${mlResult.description}

**🩺 Treatment Recommendations:**
${mlResult.treatment.map((t, i) => `${i + 1}. ${t}`).join('\n')}

**🛡️ Prevention Tips:**
${mlResult.prevention.map((p, i) => `${i + 1}. ${p}`).join('\n')}

**Severity Level:** ${mlResult.severity.replace('_', ' ').toUpperCase()}`;
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: analysisContent,
        timestamp: new Date().toISOString(),
        type: 'analysis',
        analysisData: mlResult
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setResult({
        disease: mlResult.disease,
        confidence: `${Math.round(mlResult.confidence * 100)}%`,
        description: mlResult.description,
        treatment: mlResult.treatment,
        prevention: mlResult.prevention,
        severity: mlResult.severity
      });
      
      // Clear the image after analysis
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      console.error('Error analyzing image:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I had trouble analyzing the image. Please ensure it\'s clear and try again.',
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAnalyzing(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Tab Navigation */}
      <div className="flex justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg border border-gray-200/50">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'chat'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <MessageCircle className="w-4 h-4 inline mr-2" />
            AI Chat
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'scanner'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Camera className="w-4 h-4 inline mr-2" />
            Disease Scanner
          </button>
        </div>
      </div>
      
      {activeTab === 'chat' ? (
        /* AI Chat Interface */
        <div className="max-w-6xl mx-auto px-4">
          <Card className="h-[600px] flex flex-col shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-200/50 bg-white/50">
              <CardTitle className="flex items-center">
                <Bot className="w-5 h-5 mr-2 text-green-600" />
                AI Farming Assistant
              </CardTitle>
              <CardDescription>Ask questions about farming, crops, diseases, or upload images for analysis</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-tr-lg'
                        : 'bg-white/90 backdrop-blur-sm border border-gray-200/50 text-gray-900 rounded-tl-lg shadow-lg'
                    }`}>
                      {message.type === 'image' && message.imageUrl && (
                        <div className="mb-3">
                          <img
                            src={message.imageUrl}
                            alt="Uploaded crop"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="text-sm leading-relaxed break-words overflow-wrap-anywhere">
                        {message.content}
                      </div>
                      <div className={`text-xs mt-2 opacity-70`}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl rounded-tl-lg px-4 py-3 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600 text-sm">AI is typing</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input Area */}
              <div className="border-t border-gray-200/50 p-6 bg-white/50">
                <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-gray-200/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setActiveTab('scanner');
                    }}
                    className="flex-shrink-0 rounded-xl border-gray-300 hover:bg-gray-50"
                    title="Switch to Disease Scanner"
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about farming, crops, diseases, or upload an image..."
                    className="flex-1 px-4 py-3 border-0 rounded-xl focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500 bg-transparent"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="flex-shrink-0 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl px-4 py-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Disease Scanner Interface */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">{/* Scanner content */}
        {/* Upload Section */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Upload Crop Image</CardTitle>
            <CardDescription>Take a photo or upload an image of the affected plant</CardDescription>
          </CardHeader>
          <CardContent>
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                {isCameraOpen ? (
                  <div className="space-y-4">
                    <div className="relative bg-black rounded-lg overflow-hidden">
                      <video 
                        ref={videoRef}
                        autoPlay 
                        playsInline 
                        className="w-full h-64 object-cover"
                      />
                      <canvas ref={canvasRef} className="hidden" />
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                        <Button 
                          onClick={capturePhoto}
                          className="bg-white text-red-600 hover:bg-gray-100 rounded-full p-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-red-500"></div>
                        </Button>
                      </div>
                    </div>
                    <Button 
                      onClick={stopCamera}
                      variant="outline" 
                      className="w-full"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <ImageIcon className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">
                        <label 
                          htmlFor="image-upload" 
                          className="relative cursor-pointer text-green-600 hover:text-green-700 font-medium"
                        >
                          Click to upload
                        </label>{' '}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        JPG, PNG up to 5MB
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="mt-2 w-full"
                      onClick={startCamera}
                      type="button"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                )}
                <input
                  id="image-upload"
                  name="image-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Uploaded preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            )}
            
            <div className="mt-6">
              <Button 
                className="w-full" 
                onClick={analyzeImageWithChat}
                disabled={!selectedImage || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : 'Analyze Disease'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>Detailed disease information and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600">{error}</p>
                </div>
              ) : result ? (
                  <div className="space-y-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <h3 className="text-lg font-medium text-green-800">Detected: {result.disease}</h3>
                        <span className="ml-auto bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {result.confidence} confidence
                        </span>
                      </div>
                      <p className="mt-2 text-green-700">{result.description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Recommended Treatment</h4>
                      <ul className="space-y-2">
                        {result.treatment.map((step, i) => (
                          <li key={i} className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                              <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="text-gray-600">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Prevention Tips</h4>
                      <ul className="space-y-2">
                        {result.prevention.map((tip, i) => (
                          <li key={i} className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                              <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="text-gray-600">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                <div className="text-center py-12">
                  <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Upload an image to analyze for crop diseases</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        </div>
      )}
    </div>
  );
}
