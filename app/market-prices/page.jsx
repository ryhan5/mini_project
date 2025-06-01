'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BarChart3, TrendingUp, TrendingDown, ArrowRight, Search, Bell } from 'lucide-react';

const markets = [
  { 
    name: 'Delhi Agricultural Market',
    location: 'Delhi',
    crops: [
      { name: 'Rice', price: 2200, change: +4.8, volume: '120 tons' },
      { name: 'Wheat', price: 1850, change: +2.3, volume: '90 tons' },
      { name: 'Corn', price: 1600, change: -1.5, volume: '75 tons' }
    ]
  },
  {
    name: 'Punjab Grain Market',
    location: 'Punjab',
    crops: [
      { name: 'Rice', price: 2180, change: +4.2, volume: '150 tons' },
      { name: 'Wheat', price: 1870, change: +3.1, volume: '110 tons' },
      { name: 'Cotton', price: 5600, change: -2.1, volume: '45 tons' }
    ]
  },
  {
    name: 'Maharashtra APMC',
    location: 'Maharashtra',
    crops: [
      { name: 'Onion', price: 1500, change: -2.1, volume: '80 tons' },
      { name: 'Soybean', price: 3800, change: +1.8, volume: '65 tons' },
      { name: 'Cotton', price: 5500, change: -1.9, volume: '40 tons' }
    ]
  }
];

export default function MarketPrices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState(markets[0]);
  const [showPriceAlert, setShowPriceAlert] = useState(false);

  const filteredMarkets = markets.filter(market =>
    market.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    market.crops.some(crop => crop.name.toLowerCase().includes(searchTerm.toLowerCase()))
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
              <span>Live Market Prices</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Agricultural Market Insights</h1>
            <p className="text-lg text-green-100 max-w-2xl">
              Track real-time crop prices across different markets and analyze price trends
              to make informed selling decisions.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Market List */}
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
                    placeholder="Search markets or crops..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {filteredMarkets.map((market) => (
                  <button
                    key={market.name}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none ${
                      selectedMarket.name === market.name ? 'bg-green-50' : ''
                    }`}
                    onClick={() => setSelectedMarket(market)}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{market.name}</p>
                      <p className="text-sm text-gray-500">{market.location}</p>
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
            {/* Market Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">Market Overview</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-700 border-green-200 hover:bg-green-50"
                    onClick={() => setShowPriceAlert(!showPriceAlert)}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Set Price Alert
                  </Button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {selectedMarket.crops.map((crop) => (
                    <div key={crop.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{crop.name}</p>
                        <p className="text-sm text-gray-500">Volume: {crop.volume}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">₹{crop.price}</p>
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
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Alert Dialog */}
            {showPriceAlert && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="font-medium text-gray-900">Set Price Alert</h3>
                </div>
                
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Crop
                      </label>
                      <select className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2">
                        {selectedMarket.crops.map((crop) => (
                          <option key={crop.name} value={crop.name}>{crop.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Target Price (₹)
                      </label>
                      <Input type="number" placeholder="Enter target price" />
                    </div>
                    
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Set Alert
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}