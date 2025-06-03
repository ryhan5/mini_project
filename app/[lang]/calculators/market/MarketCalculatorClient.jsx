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

const MarketCalculatorClient = ({ lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [result, setResult] = useState(null);

  const filteredCrops = marketData.filter(crop => 
    crop.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.markets.some(market => market.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const calculateRevenue = () => {
    if (!selectedCrop || !quantity) return;
    
    const crop = marketData.find(c => c.crop === selectedCrop);
    if (!crop) return;
    
    const total = crop.currentPrice * parseFloat(quantity);
    const weeklyTotal = crop.weeklyAvg * parseFloat(quantity);
    const monthlyTotal = crop.monthlyAvg * parseFloat(quantity);
    
    setResult({
      crop: crop.crop,
      price: crop.currentPrice,
      quantity: parseFloat(quantity),
      total,
      weeklyTotal,
      monthlyTotal,
      change: crop.change
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Price Calculator</h1>
          <p className="text-gray-600">Check current market prices and calculate potential revenue for your crops</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search Crops
              </label>
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by crop or market..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="crop" className="block text-sm font-medium text-gray-700">
                Select Crop
              </label>
              <select
                id="crop"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={selectedCrop || ''}
                onChange={(e) => setSelectedCrop(e.target.value)}
              >
                <option value="">Select a crop</option>
                {filteredCrops.map((crop) => (
                  <option key={crop.crop} value={crop.crop}>
                    {crop.crop}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity (quintals)
              </label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button 
              onClick={calculateRevenue}
              disabled={!selectedCrop || !quantity}
              className="px-8 py-2.5 text-base font-medium"
            >
              Calculate
            </Button>
          </div>
        </div>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Calculation Results</h2>
              <div className={`flex items-center ${result.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {result.change >= 0 ? (
                  <TrendingUp className="h-5 w-5 mr-1" />
                ) : (
                  <TrendingDown className="h-5 w-5 mr-1" />
                )}
                <span>{Math.abs(result.change)}% {result.change >= 0 ? 'increase' : 'decrease'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Current Price (per quintal)</p>
                <p className="text-2xl font-bold text-gray-900">₹{result.price}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Estimated Revenue</p>
                <p className="text-2xl font-bold text-green-600">₹{result.total.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Weekly Avg. Revenue</p>
                <p className="text-lg font-medium text-gray-900">₹{result.weeklyTotal.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Market Insights</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Market Trend</span>
                  <span className={`text-sm font-medium ${result.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {result.change >= 0 ? 'Upward' : 'Downward'} Trend
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Best Selling Markets</span>
                  <div className="flex space-x-2">
                    {marketData.find(c => c.crop === result.crop)?.markets.slice(0, 2).map((market, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {market}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button variant="outline" className="w-full">
                View Detailed Market Analysis <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Current Market Prices</h2>
            <span className="text-sm text-green-600">Live Updates</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Crop
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price (₹/quintal)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    24h Change
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Markets
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marketData.map((crop, index) => (
                  <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{crop.crop}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{crop.currentPrice}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center ${crop.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {crop.change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        <span>{Math.abs(crop.change)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {crop.markets.map((market, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                            {market}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              View All Market Data
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketCalculatorClient;
