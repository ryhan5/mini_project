'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BarChart3, TrendingUp, TrendingDown, ArrowRight, Search } from 'lucide-react';

const marketData = [
  { 
    crop: 'Rice',
    currentPrice: 2200,
    change: +4.8,
    weeklyAvg: 2150,
    monthlyAvg: 2100,
    markets: ['Delhi', 'Punjab', 'Haryana']
  },
  { 
    crop: 'Wheat',
    currentPrice: 1850,
    change: +2.3,
    weeklyAvg: 1820,
    monthlyAvg: 1800,
    markets: ['UP', 'MP', 'Punjab']
  },
  { 
    crop: 'Corn',
    currentPrice: 1600,
    change: -1.5,
    weeklyAvg: 1620,
    monthlyAvg: 1580,
    markets: ['Karnataka', 'Maharashtra', 'Bihar']
  },
  { 
    crop: 'Potato',
    currentPrice: 1200,
    change: +6.7,
    weeklyAvg: 1150,
    monthlyAvg: 1100,
    markets: ['UP', 'West Bengal', 'Punjab']
  },
  { 
    crop: 'Onion',
    currentPrice: 1500,
    change: -2.1,
    weeklyAvg: 1520,
    monthlyAvg: 1480,
    markets: ['Maharashtra', 'Karnataka', 'MP']
  },
];

export default function MarketPriceAnalysis() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(marketData[0]);

  const filteredCrops = marketData.filter(crop =>
    crop.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <BarChart3 className="h-4 w-4 mr-2" />
              <span>Market Price Analysis</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Live Market Prices</h1>
            <p className="text-lg text-green-100 max-w-2xl">
              Track real-time crop prices across different markets and analyze price trends
              to make informed selling decisions.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Search and Crop List */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    className="pl-9"
                    placeholder="Search crops..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {filteredCrops.map((crop) => (
                  <button
                    key={crop.crop}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none ${
                      selectedCrop.crop === crop.crop ? 'bg-green-50' : ''
                    }`}
                    onClick={() => setSelectedCrop(crop)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{crop.crop}</p>
                        <p className="text-sm text-gray-500">₹{crop.currentPrice}/quintal</p>
                      </div>
                      <div className={`flex items-center ${
                        crop.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {crop.change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        <span className="text-sm font-medium">{Math.abs(crop.change)}%</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Price Analysis */}
          <motion.div
            className="md:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Current Price Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="font-medium text-gray-900">Current Price Analysis</h3>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-sm text-green-600 font-medium">Current Price</p>
                    <p className="text-2xl font-bold text-green-700">₹{selectedCrop.currentPrice}</p>
                    <p className="text-sm text-green-600">per quintal</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-600 font-medium">Weekly Average</p>
                    <p className="text-2xl font-bold text-blue-700">₹{selectedCrop.weeklyAvg}</p>
                    <p className="text-sm text-blue-600">per quintal</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <p className="text-sm text-purple-600 font-medium">Monthly Average</p>
                    <p className="text-2xl font-bold text-purple-700">₹{selectedCrop.monthlyAvg}</p>
                    <p className="text-sm text-purple-600">per quintal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Comparison */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="font-medium text-gray-900">Market Comparison</h3>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {selectedCrop.markets.map((market, index) => (
                    <div key={market} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{market}</p>
                        <p className="text-sm text-gray-500">Major Trading Hub</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ₹{(selectedCrop.currentPrice * (1 + (index - 1) * 0.02)).toFixed(0)}
                        </p>
                        <p className={`text-sm ${index === 1 ? 'text-green-600' : 'text-gray-500'}`}>
                          {index === 1 ? 'Best Price' : 'per quintal'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Trend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="font-medium text-gray-900">Price Trend Analysis</h3>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Price Trend (Last 30 days)</p>
                      <p className={`text-lg font-medium ${
                        selectedCrop.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedCrop.change >= 0 ? 'Upward Trend' : 'Downward Trend'}
                      </p>
                    </div>
                    <Button variant="outline" className="text-green-700 border-green-200 hover:bg-green-50">
                      View Detailed Report
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-2">Market Insights</h4>
                    <ul className="space-y-2 text-sm text-amber-700">
                      <li>• Current price is {selectedCrop.change >= 0 ? 'above' : 'below'} the monthly average</li>
                      <li>• Best time to sell: {selectedCrop.change >= 0 ? 'Current' : 'Wait for price recovery'}</li>
                      <li>• Price volatility: {Math.abs(selectedCrop.change) > 3 ? 'High' : 'Moderate'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}