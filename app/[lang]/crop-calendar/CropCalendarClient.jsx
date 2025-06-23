'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  CalendarDays, 
  Leaf, 
  MapPin, 
  ChevronDown, 
  Sprout, 
  Sun, 
  Package, 
  Download, 
  Share,
  Droplets,
  Thermometer,
  Mountain
} from 'lucide-react';
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
    description: 'Rice is a staple food crop that requires a lot of water and warm temperatures.',
    icon: '🌾'
  },
  Wheat: {
    season: 'Rabi (November-April)',
    water: 'Medium',
    soil: 'Sandy Loam',
    temperature: '15-25°C',
    description: 'Wheat is a Rabi crop that grows well in cool weather.',
    icon: '🌾'
  },
  Corn: {
    season: 'Kharif (June-September)',
    water: 'Medium',
    soil: 'Well-drained Loam',
    temperature: '18-27°C',
    description: 'Corn thrives in warm weather with adequate moisture.',
    icon: '🌽'
  },
  Potato: {
    season: 'Rabi (October-February)',
    water: 'Medium',
    soil: 'Sandy Loam',
    temperature: '15-20°C',
    description: 'Potatoes grow best in cool weather with well-drained soil.',
    icon: '🥔'
  },
  Onion: {
    season: 'Rabi (November-April)',
    water: 'Low-Medium',
    soil: 'Well-drained Loam',
    temperature: '13-24°C',
    description: 'Onions prefer cool weather and well-drained soil.',
    icon: '🧅'
  },
  Tomato: {
    season: 'Year-round (varies by region)',
    water: 'Medium',
    soil: 'Well-drained Loam',
    temperature: '20-25°C',
    description: 'Tomatoes can be grown year-round with proper care.',
    icon: '🍅'
  }
};

const legendItems = [
  { color: 'bg-green-100 border-green-400', icon: Sprout, label: 'Planting Time', textColor: 'text-green-700' },
  { color: 'bg-yellow-100 border-yellow-400', icon: Sun, label: 'Growing Period', textColor: 'text-yellow-700' },
  { color: 'bg-red-100 border-red-400', icon: Package, label: 'Harvest Time', textColor: 'text-red-700' }
];

export default function CropCalendarClient() {
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  const [selectedRegion, setSelectedRegion] = useState('Northern India');
  const [isLoading, setIsLoading] = useState(false);
  
  const cropInfo = CROP_INFO[selectedCrop] || CROP_INFO.Rice;

  const handleCropChange = (crop) => {
    setIsLoading(true);
    setSelectedCrop(crop);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleRegionChange = (region) => {
    setIsLoading(true);
    setSelectedRegion(region);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
       {/* Hero Section */}
       <div className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.05\\'%3E%3Ccircle cx=\\'30\\' cy=\\'30\\' r=\\'2\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium text-white mb-6">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Smart Crop Calendar</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Plan Your Farming Year
              <span className="block text-2xl lg:text-3xl font-normal text-green-100 mt-2">
                with Intelligence
              </span>
            </h1>
            <p className="text-lg text-green-100 max-w-2xl mb-8 leading-relaxed">
              Plan your farming activities throughout the year with our interactive crop calendar. 
              Select a crop and region to view optimal planting times and receive region-specific guidance.
            </p>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="secondary" 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Calendar
              </Button>
              <Button 
                variant="secondary" 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-200"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Crop Selection Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Crop Selection Card */}
            <motion.div
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Leaf className="h-4 w-4 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Crop Selection</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {/* Crop Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Crop</label>
                    <div className="relative">
                      <select
                        value={selectedCrop}
                        onChange={(e) => handleCropChange(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-200 py-3 px-4 pr-10 
                                 bg-white shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 
                                 focus:outline-none transition-colors duration-200 text-gray-900"
                      >
                        {crops.map((crop) => (
                          <option key={crop} value={crop}>
                            {crop}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Region Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Region</label>
                    <div className="relative">
                      <select
                        value={selectedRegion}
                        onChange={(e) => handleRegionChange(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-200 py-3 px-4 pr-10 
                                 bg-white shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 
                                 focus:outline-none transition-colors duration-200 text-gray-900"
                      >
                        {regions.map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Crop Information Card */}
            <motion.div
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-lg">{cropInfo.icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Crop Information</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 text-green-600 mr-2" />
                      <span className="font-medium text-gray-700">Growing Season</span>
                    </div>
                    <p className="text-gray-600 text-sm">{cropInfo.season}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center mb-2">
                      <Droplets className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="font-medium text-gray-700">Water Requirements</span>
                    </div>
                    <p className="text-gray-600 text-sm">{cropInfo.water}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-100">
                    <div className="flex items-center mb-2">
                      <Mountain className="h-4 w-4 text-amber-600 mr-2" />
                      <span className="font-medium text-gray-700">Ideal Soil</span>
                    </div>
                    <p className="text-gray-600 text-sm">{cropInfo.soil}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 border border-red-100">
                    <div className="flex items-center mb-2">
                      <Thermometer className="h-4 w-4 text-red-600 mr-2" />
                      <span className="font-medium text-gray-700">Temperature Range</span>
                    </div>
                    <p className="text-gray-600 text-sm">{cropInfo.temperature}</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 italic">{cropInfo.description}</p>
                </div>
              </div>
            </motion.div>

            {/* Calendar Legend Card */}
            <motion.div
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <CalendarDays className="h-4 w-4 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Calendar Legend</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {legendItems.map(({ color, icon: Icon, label, textColor }) => (
                    <div key={label} className="flex items-center group">
                      <div className={`w-5 h-5 rounded-sm ${color} mr-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="h-3 w-3" />
                      </div>
                      <span className={`text-sm font-medium ${textColor}`}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Calendar View */}
          <div className="lg:col-span-2">
            <motion.div
                            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-full hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <MapPin className="h-4 w-4 text-indigo-600" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-gray-900">
                                      {selectedCrop} Calendar for {selectedRegion}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                      Interactive farming schedule and recommendations
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {isLoading && (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-6 min-h-[600px]">
                              {isLoading ? (
                                <div className="flex flex-col items-center justify-center h-96 space-y-4">
                                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                                  <div className="text-center">
                                    <p className="text-gray-600 font-medium">Loading calendar data...</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                      Fetching information for {selectedCrop} in {selectedRegion}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-6">
                                  {/* Quick Stats */}
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-green-50 rounded-lg p-4 text-center border border-green-100">
                                      <div className="text-2xl font-bold text-green-600">3</div>
                                      <div className="text-sm text-green-700">Planting Months</div>
                                    </div>
                                    <div className="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-100">
                                      <div className="text-2xl font-bold text-yellow-600">5</div>
                                      <div className="text-sm text-yellow-700">Growing Months</div>
                                    </div>
                                    <div className="bg-red-50 rounded-lg p-4 text-center border border-red-100">
                                      <div className="text-2xl font-bold text-red-600">2</div>
                                      <div className="text-sm text-red-700">Harvest Months</div>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
                                      <div className="text-2xl font-bold text-blue-600">85%</div>
                                      <div className="text-sm text-blue-700">Success Rate</div>
                                    </div>
                                  </div>
              
                                  {/* Calendar Component */}
                                  <CropCalendarView 
                                    crop={selectedCrop} 
                                    region={selectedRegion} 
                                  />
              
                                  {/* Additional Information */}
                                  <div className="mt-8 grid md:grid-cols-2 gap-6">
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100">
                                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <Sprout className="h-5 w-5 text-green-600 mr-2" />
                                        Best Practices
                                      </h4>
                                      <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-start">
                                          <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                          Start soil preparation 2-3 weeks before planting
                                        </li>
                                        <li className="flex items-start">
                                          <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                          Monitor weather conditions for optimal planting
                                        </li>
                                        <li className="flex items-start">
                                          <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                          Ensure proper irrigation schedule
                                        </li>
                                      </ul>
                                    </div>
              
                                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-100">
                                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <Sun className="h-5 w-5 text-amber-600 mr-2" />
                                        Weather Considerations
                                      </h4>
                                      <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-start">
                                          <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                          Avoid planting during extreme weather
                                        </li>
                                        <li className="flex items-start">
                                          <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                          Consider monsoon patterns in your region
                                        </li>
                                        <li className="flex items-start">
                                          <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                          Plan harvest before rainy season
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
              
                                  {/* Action Buttons */}
                                  <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100">
                                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                                      <Calendar className="h-4 w-4 mr-2" />
                                      Add to My Calendar
                                    </Button>
                                    <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                                      <Download className="h-4 w-4 mr-2" />
                                      Export PDF
                                    </Button>
                                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                                      <Share className="h-4 w-4 mr-2" />
                                      Share Calendar
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      </div>
              
                      {/* Additional Features Section */}
                      <motion.div
                        className="mt-12 grid md:grid-cols-3 gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Smart Reminders</h3>
                          </div>
                          <p className="text-gray-600 text-sm mb-4">
                            Get timely notifications for planting, fertilizing, and harvesting activities.
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            Set Up Reminders
                          </Button>
                        </div>
              
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <Sun className="h-5 w-5 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Weather Integration</h3>
                          </div>
                          <p className="text-gray-600 text-sm mb-4">
                            Real-time weather data to optimize your farming decisions.
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            View Weather
                          </Button>
                        </div>
              
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <Package className="h-5 w-5 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Market Insights</h3>
                          </div>
                          <p className="text-gray-600 text-sm mb-4">
                            Get market prices and demand forecasts for better planning.
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            View Market Data
                          </Button>
                        </div>
                      </motion.div>
              
                      {/* Tips Section */}
                      <motion.div
                        className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <div className="max-w-4xl">
                          <h3 className="text-2xl font-bold mb-4">💡 Pro Tips for Better Farming</h3>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-2">Soil Preparation</h4>
                              <p className="text-green-100 text-sm">
                                Test your soil pH and nutrient levels before planting. Proper soil preparation 
                                can increase yield by up to 30%.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Crop Rotation</h4>
                              <p className="text-green-100 text-sm">
                                Rotate crops to maintain soil health and reduce pest problems. 
                                Plan your rotation 2-3 seasons ahead.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Water Management</h4>
                              <p className="text-green-100 text-sm">
                                Implement drip irrigation or other water-efficient methods to conserve 
                                water and improve crop quality.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Record Keeping</h4>
                              <p className="text-green-100 text-sm">
                                Maintain detailed records of planting dates, inputs used, and yields 
                                to improve future planning.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              }