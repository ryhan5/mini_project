'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator, ArrowRight, Info } from 'lucide-react';

const crops = [
  { name: 'Rice', avgYield: 4.0, avgPrice: 2200 },
  { name: 'Wheat', avgYield: 3.5, avgPrice: 1850 },
  { name: 'Corn', avgYield: 5.0, avgPrice: 1600 },
  { name: 'Potato', avgYield: 20.0, avgPrice: 1200 },
  { name: 'Onion', avgYield: 25.0, avgPrice: 1500 },
];

export default function RevenueCalculator() {
  const [area, setArea] = useState('');
  const [crop, setCrop] = useState(crops[0].name);
  const [customPrice, setCustomPrice] = useState('');
  const [result, setResult] = useState(null);

  const calculateRevenue = () => {
    const selectedCrop = crops.find(c => c.name === crop);
    if (!selectedCrop) return;

    const areaNum = parseFloat(area);
    if (!areaNum) return;

    const pricePerKg = customPrice ? parseFloat(customPrice) : selectedCrop.avgPrice;
    const totalYield = selectedCrop.avgYield * areaNum;
    const totalRevenue = totalYield * pricePerKg;

    setResult({
      totalYield: Math.round(totalYield * 100) / 100,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      pricePerKg,
    });
  };

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
              <Calculator className="h-4 w-4 mr-2" />
              <span>Revenue Calculator</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Plan Your Crop Revenue</h1>
            <p className="text-lg text-green-100 max-w-2xl">
              Estimate your potential farming revenue based on crop type, land area, and market prices.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-medium text-gray-900">Enter Farm Details</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Land Area (Hectares)
                </label>
                <Input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Enter land area"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Crop
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                >
                  {crops.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Price per Quintal (Optional)
                </label>
                <Input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  placeholder="Enter custom price"
                />
              </div>

              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={calculateRevenue}
              >
                Calculate Revenue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {result && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="font-medium text-gray-900">Revenue Estimate</h3>
                </div>
                
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-sm text-green-600 font-medium">Total Yield</p>
                      <p className="text-2xl font-bold text-green-700">{result.totalYield}</p>
                      <p className="text-sm text-green-600">Quintals</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-blue-600 font-medium">Price per Quintal</p>
                      <p className="text-2xl font-bold text-blue-700">₹{result.pricePerKg}</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <p className="text-sm text-purple-600 font-medium">Total Revenue</p>
                      <p className="text-2xl font-bold text-purple-700">₹{result.totalRevenue}</p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Assumptions</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Average yield rates based on typical conditions</li>
                      <li>• Market prices are indicative and may vary</li>
                      <li>• Calculations exclude input costs and other expenses</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-amber-50 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-amber-500 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-amber-800">Important Note</h4>
                  <p className="mt-1 text-sm text-amber-700">
                    These calculations are estimates based on average yields and market prices.
                    Actual results may vary based on weather conditions, farming practices, and market fluctuations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}