'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarDays, Leaf, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the CropCalendarView component with SSR disabled
const CropCalendarView = dynamic(
  () => import('@/components/crop-calendar/CropCalendarView'),
  { ssr: false }
);

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const crops = [
  'Rice', 'Wheat', 'Corn', 'Potato', 'Onion', 'Tomato',
  'Cotton', 'Sugarcane', 'Soybean', 'Mustard'
];

const regions = [
  'Northern India', 'Southern India', 'Eastern India', 
  'Western India', 'Central India', 'North East India'
];

const CROP_INFO = {
  Rice: {
    season: 'Kharif (June-November)',
    water: 'High',
    soil: 'Clay Loam',
    temperature: '20-35°C',
    description: 'Rice is a staple food crop that requires a lot of water and warm temperatures.'
  },
  Wheat: {
    season: 'Rabi (November-April)',
    water: 'Medium',
    soil: 'Sandy Loam',
    temperature: '15-25°C',
    description: 'Wheat is a Rabi crop that grows well in cool weather.'
  },
  // Add more crop information as needed
};


// This function tells Next.js which paths to pre-render at build time
export async function generateStaticParams() {
  return languages.map((lang) => ({
    lang: lang.code,
  }));
}

// This ensures dynamic parameters are filled in at request time
export const dynamicParams = true;
export default function CropCalendar({ params: { lang } }) {
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  const [selectedRegion, setSelectedRegion] = useState('Northern India');
  const cropInfo = CROP_INFO[selectedCrop] || CROP_INFO.Rice;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-100/20 backdrop-blur-sm text-sm font-medium text-white mb-4">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Crop Calendar</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Plan Your Farming Year</h1>
            <p className="text-lg text-green-100 max-w-2xl">
              Plan your farming activities throughout the year with our interactive crop calendar. 
              Select a crop and region to view optimal planting times and receive region-specific guidance.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Crop Selection Panel */}
          <div className="md:col-span-1 space-y-6">
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <Leaf className="h-4 w-4 text-green-600" />
                  <h3 className="font-medium text-gray-900">Crop Selection</h3>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Crop
                  </label>
                  <select
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2"
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                  >
                    {crops.map((crop) => (
                      <option key={crop} value={crop}>{crop}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Region
                  </label>
                  <select
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                  >
                    {regions.map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-amber-50 rounded-lg p-4 mt-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MapPin className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-amber-800">Region-specific guidance</h3>
                      <p className="mt-2 text-sm text-amber-700">
                        Select your crop and region to see customized planting recommendations based on local growing conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Crop Information */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <Leaf className="h-4 w-4 text-green-600" />
                  <h3 className="font-medium text-gray-900">{selectedCrop} Information</h3>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Growing Season</span>
                    <span className="font-medium">{cropInfo.season}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Water Requirement</span>
                    <span className="font-medium">{cropInfo.water}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Soil Type</span>
                    <span className="font-medium">{cropInfo.soil}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Temperature</span>
                    <span className="font-medium">{cropInfo.temperature}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-600">{cropInfo.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Calendar View */}
          <div className="md:col-span-2">
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="h-4 w-4 text-green-600" />
                    <h3 className="font-medium text-gray-900">Planting Calendar</h3>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium">Interactive Calendar</span>
                  </div>
                </div>
              </div>
              
              <div className="p-0">
                <CropCalendarView selectedCrop={selectedCrop} selectedRegion={selectedRegion} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}