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

export default function RevenueCalculatorClient() {
  const [area, setArea] = useState('');
  const [crop, setCrop] = useState(crops[0].name);
  const [customPrice, setCustomPrice] = useState('');
  const [result, setResult] = useState(null);

  const calculateRevenue = (e) => {
    e.preventDefault();
    
    if (!area || isNaN(area) || area <= 0) {
      return;
    }

    const selectedCrop = crops.find(c => c.name === crop) || crops[0];
    const price = customPrice ? parseFloat(customPrice) : selectedCrop.avgPrice;
    const areaInHectares = parseFloat(area);
    const totalProduction = areaInHectares * selectedCrop.avgYield;
    const totalRevenue = totalProduction * price;
    const totalCost = totalProduction * 0.6; // Assuming 40% profit margin
    const profit = totalRevenue - totalCost;

    setResult({
      production: totalProduction.toFixed(2),
      revenue: totalRevenue.toFixed(2),
      cost: totalCost.toFixed(2),
      profit: profit.toFixed(2),
      pricePerKg: price
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
            
            <form onSubmit={calculateRevenue} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Land Area (Hectares)
                </label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Enter land area"
                  required
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
                    <option key={c.name} value={c.name}>
                      {c.name} (Avg. ₹{c.avgPrice}/quintal)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Price per Quintal (Optional)
                </label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  placeholder={`Default: ₹${crops.find(c => c.name === crop)?.avgPrice || '0'}/quintal`}
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Calculate Revenue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {result ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="font-medium text-gray-900">Revenue Estimate</h3>
                </div>
                
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-sm text-green-600 font-medium">Total Yield</p>
                      <p className="text-2xl font-bold text-green-700">{result.production}</p>
                      <p className="text-sm text-green-600">Quintals</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-blue-600 font-medium">Price per Quintal</p>
                      <p className="text-2xl font-bold text-blue-700">₹{result.pricePerKg}</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <p className="text-sm text-purple-600 font-medium">Total Revenue</p>
                      <p className="text-2xl font-bold text-purple-700">₹{result.revenue}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-amber-800">Estimated Profit</h4>
                        <p className="text-2xl font-bold text-amber-700">₹{result.profit}</p>
                        <p className="text-xs text-amber-700 mt-1">
                          Based on 40% profit margin after costs
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Assumptions</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Average yield rates based on typical conditions</li>
                      <li>• Market prices are indicative and may vary</li>
                      <li>• Profit calculation includes estimated costs</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Ready to calculate</h3>
                <p className="text-sm text-gray-500">
                  Enter your farm details and click "Calculate Revenue" to see your projected earnings.
                </p>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Important Note</h4>
                  <p className="mt-1 text-sm text-blue-700">
                    These calculations are estimates based on average yields and market prices.
                    Actual results may vary based on weather conditions, farming practices, and market fluctuations.
                    Always consult with local agricultural experts for more accurate planning.
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
