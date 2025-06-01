'use client';

import { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Loader2, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CropDiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

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

  const analyzeDisease = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      // Simulate API call (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response (replace with actual API response)
      const mockResult = {
        disease: 'Tomato Blight',
        confidence: '85%',
        description: 'A common fungal disease affecting tomato plants, causing dark spots on leaves and fruits.',
        treatment: [
          'Remove and destroy infected plant parts',
          'Apply copper-based fungicides',
          'Improve air circulation around plants',
          'Water at the base to keep foliage dry'
        ],
        prevention: [
          'Use disease-resistant varieties',
          'Rotate crops annually',
          'Avoid overhead watering',
          'Space plants properly for good air flow'
        ]
      };
      
      setResult(mockResult);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setResult({
        error: 'Failed to analyze the image. Please try again.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Crop Disease Detection</h1>
        <p className="text-gray-600">Upload an image of your crop to detect diseases and get treatment recommendations</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Upload Crop Image</CardTitle>
            <CardDescription>Take a clear photo of the affected plant part</CardDescription>
          </CardHeader>
          <CardContent>
            {!imagePreview ? (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                  <Camera className="mx-auto h-full w-full" />
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-green-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG up to 5MB
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  capture="environment"
                />
              </div>
            ) : (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-64 object-contain rounded-lg"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tips for better results:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Take photos in good lighting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Focus on the affected area</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Include leaves, stems, and fruits if possible</span>
                </li>
              </ul>
              
              <Button 
                onClick={analyzeDisease}
                disabled={!selectedImage || isAnalyzing}
                className="w-full mt-6"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : 'Detect Disease'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Results Section */}
        <div className="space-y-6">
          {result ? (
            result.error ? (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-red-800">Error</h3>
                      <p className="text-sm text-red-700">{result.error}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{result.disease}</CardTitle>
                        <CardDescription>Confidence: {result.confidence}</CardDescription>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        Detected
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{result.description}</p>
                    
                    <div className="mt-6 space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Recommended Treatment</h4>
                        <ul className="space-y-2">
                          {result.treatment.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2"></span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Prevention Tips</h4>
                        <ul className="space-y-2">
                          {result.prevention.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50 border-blue-100">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Need more help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-4">Connect with an agricultural expert for personalized advice.</p>
                    <Button variant="outline" className="w-full">
                      Talk to an Expert
                    </Button>
                  </CardContent>
                </Card>
              </>
            )
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="py-12 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No image analyzed</h3>
                <p className="text-sm text-gray-500">Upload an image of your crop to detect diseases and get recommendations.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
