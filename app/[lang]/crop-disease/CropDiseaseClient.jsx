'use client';

import { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Loader2, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CropDiseaseClient() {
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
      const formData = new FormData();
      formData.append('image', selectedImage);
      
      // Replace this URL with your actual API endpoint
      const response = await fetch('https://api.agrosarthi.com/analyze-crop', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }
      
      const result = await response.json();
      
      // Format the API response to match our expected format
      const formattedResult = {
        disease: result.disease_name || 'Unknown Disease',
        confidence: result.confidence ? `${Math.round(result.confidence * 100)}%` : 'Unknown',
        description: result.description || 'No description available',
        treatment: result.treatment_plan || [
          'No specific treatment information available',
          'Consult with an agricultural expert for advice'
        ],
        prevention: result.prevention_tips || [
          'Practice crop rotation',
          'Maintain proper plant spacing',
          'Monitor plants regularly for early signs of disease'
        ]
      };
      
      setResult(formattedResult);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setResult({
        error: 'Failed to analyze the image. Please ensure the image is clear and try again.'
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
            <CardDescription>Take a photo or upload an image of the affected plant</CardDescription>
          </CardHeader>
          <CardContent>
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
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
                  <Button variant="outline" className="mt-2">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
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
                onClick={analyzeDisease}
                disabled={!selectedImage || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : 'Analyze Image'}
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
              {result ? (
                result.error ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-600">{result.error}</p>
                  </div>
                ) : (
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
                )
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
    </div>
  );
}
