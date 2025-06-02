'use client';
import { languages } from '@/config/languages';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tractor, Droplets, Shovel, Upload, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


// This function tells Next.js which paths to pre-render at build time
export async function generateStaticParams() {
  return languages.map((lang) => ({
    lang: lang.code,
  }));
}

// This ensures dynamic parameters are filled in at request time
export const dynamicParams = true;
export default function ListEquipment({ params: { lang } }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [equipmentType, setEquipmentType] = useState('tractor');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dailyRate: '',
    location: '',
    contactNumber: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you would upload these to a storage service
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (id) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would submit this data to your backend
    console.log('Form submitted:', { ...formData, equipmentType });
    router.push('/equipment-exchange?listed=true');
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Equipment</h1>
          <p className="text-gray-600">Fill in the details to rent out your farming equipment</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === stepNumber
                      ? 'bg-green-600 text-white'
                      : step > stepNumber
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {stepNumber}
                </div>
                <span className="text-xs mt-2 text-gray-500">
                  {stepNumber === 1 ? 'Equipment' : stepNumber === 2 ? 'Details' : 'Contact'}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold mb-4">Select Equipment Type</h2>
                
                <Tabs 
                  defaultValue="tractor" 
                  value={equipmentType}
                  onValueChange={setEquipmentType}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tractor" className="flex flex-col h-auto py-3">
                      <Tractor className="h-5 w-5 mb-1" />
                      Tractor
                    </TabsTrigger>
                    <TabsTrigger value="irrigation" className="flex flex-col h-auto py-3">
                      <Droplets className="h-5 w-5 mb-1" />
                      Irrigation
                    </TabsTrigger>
                    <TabsTrigger value="tools" className="flex flex-col h-auto py-3">
                      <Shovel className="h-5 w-5 mb-1" />
                      Tools
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Equipment Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., John Deere 5050D Tractor"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={nextStep} className="bg-green-600 hover:bg-green-700">
                    Next
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold mb-4">Equipment Details</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your equipment, condition, and any special features..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Daily Rate (₹)
                    </label>
                    <Input
                      type="number"
                      name="dailyRate"
                      value={formData.dailyRate}
                      onChange={handleChange}
                      placeholder="e.g., 1500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Karnal, Haryana"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Photos
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                          <span>Upload files</span>
                          <input
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleImageUpload}
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-4">
                      {formData.images.map((image) => (
                        <div key={image.id} className="relative">
                          <img
                            src={image.preview}
                            alt="Preview"
                            className="h-24 w-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(image.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                  <Button type="button" onClick={nextStep} className="bg-green-600 hover:bg-green-700">
                    Next
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Enter your 10-digit mobile number"
                    pattern="[0-9]{10}"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This will be visible to potential renters
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        By submitting this form, you agree to our Terms of Service and Privacy Policy. 
                        Please ensure all information provided is accurate.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    List My Equipment
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}
