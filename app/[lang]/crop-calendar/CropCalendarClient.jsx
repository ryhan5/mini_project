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

export default function CropCalendarClient() {
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
              <div className="p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Crop</label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
                >
                  {crops.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Region</label>
                  <div className="relative">
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
                    >
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Crop Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Growing Season:</span> {cropInfo.season}</p>
                    <p><span className="font-medium">Water Requirements:</span> {cropInfo.water}</p>
                    <p><span className="font-medium">Ideal Soil:</span> {cropInfo.soil}</p>
                    <p><span className="font-medium">Temperature Range:</span> {cropInfo.temperature}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="h-4 w-4 text-green-600" />
                  <h3 className="font-medium text-gray-900">Calendar Legend</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-sm bg-green-100 border border-green-400 mr-2"></div>
                    <span className="text-sm text-gray-600">Planting Time</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-sm bg-yellow-100 border border-yellow-400 mr-2"></div>
                    <span className="text-sm text-gray-600">Growing Period</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-sm bg-red-100 border border-red-400 mr-2"></div>
                    <span className="text-sm text-gray-600">Harvest Time</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Calendar View */}
          <div className="md:col-span-2">
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <h3 className="font-medium text-gray-900">
                      {selectedCrop} Calendar for {selectedRegion}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <CropCalendarView crop={selectedCrop} region={selectedRegion} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
