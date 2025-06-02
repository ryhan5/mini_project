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
    markets: ['Karnataka', 'Maharashtra', 'AP']
  },
  { 
    crop: 'Soybean',
    currentPrice: 4200,
    change: +3.2,
    weeklyAvg: 4150,
    monthlyAvg: 4100,
    markets: ['MP', 'Maharashtra', 'Rajasthan']
  },
  { 
    crop: 'Cotton',
    currentPrice: 6500,
    change: -0.8,
    weeklyAvg: 6550,
    monthlyAvg: 6600,
    markets: ['Gujarat', 'Maharashtra', 'Punjab']
  },
];

export default function MarketPriceClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);

  const filteredData = marketData.filter(crop =>
    crop.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCropSelect = (crop) => {
    setSelectedCrop(crop);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Price Analysis</h1>
        <p className="text-gray-600">Track current market prices and trends for agricultural commodities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Search and List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search crops..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredData.map((crop, index) => (
              <motion.div
                key={crop.crop}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedCrop?.crop === crop.crop
                    ? 'bg-green-50 border-l-4 border-green-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => handleCropSelect(crop)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{crop.crop}</h3>
                  <div className={`flex items-center ${
                    crop.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {crop.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(crop.change)}%
                  </div>
                </div>
                <p className="text-2xl font-bold mt-1">₹{crop.currentPrice.toLocaleString()}<span className="text-sm font-normal text-gray-500">/quintal</span></p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2">
          {selectedCrop ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCrop.crop}</h2>
                  <div className="flex items-center mt-1">
                    <span className="text-3xl font-bold">₹{selectedCrop.currentPrice.toLocaleString()}</span>
                    <span className="ml-2 text-sm text-gray-500">/quintal</span>
                    <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                      selectedCrop.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedCrop.change >= 0 ? '+' : ''}{selectedCrop.change}% this week
                    </span>
                  </div>
                </div>
                <Button variant="outline">
                  View Historical Data
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">7-Day Average</h3>
                  <p className="text-xl font-semibold">₹{selectedCrop.weeklyAvg.toLocaleString()}</p>
                  <div className="mt-2 flex items-center">
                    {selectedCrop.currentPrice > selectedCrop.weeklyAvg ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${
                      selectedCrop.currentPrice > selectedCrop.weeklyAvg ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {((selectedCrop.currentPrice - selectedCrop.weeklyAvg) / selectedCrop.weeklyAvg * 100).toFixed(1)}% from weekly average
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">30-Day Average</h3>
                  <p className="text-xl font-semibold">₹{selectedCrop.monthlyAvg.toLocaleString()}</p>
                  <div className="mt-2 flex items-center">
                    {selectedCrop.currentPrice > selectedCrop.monthlyAvg ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${
                      selectedCrop.currentPrice > selectedCrop.monthlyAvg ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {((selectedCrop.currentPrice - selectedCrop.monthlyAvg) / selectedCrop.monthlyAvg * 100).toFixed(1)}% from monthly average
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Active Markets</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCrop.markets.map((market, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {market}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Price Trend (Last 7 Days)</h3>
                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-12 w-12 text-gray-300" />
                  <p className="ml-2 text-gray-500">Price trend chart will be displayed here</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-white rounded-lg shadow p-12 text-center">
              <BarChart3 className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Select a crop</h3>
              <p className="text-gray-500">Choose a crop from the list to view detailed market analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
