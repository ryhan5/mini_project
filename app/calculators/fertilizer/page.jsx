'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, ArrowRight, Info } from 'lucide-react';

const crops = [
  'Rice', 'Wheat', 'Corn', 'Potato', 'Onion', 'Tomato',
  'Cotton', 'Sugarcane', 'Soybean', 'Mustard'
];

const soilTypes = [
  'Clay', 'Sandy', 'Loamy', 'Silt', 'Peat', 'Chalk'
];

export default function FertilizerCalculator() {
  const [area, setArea] = useState('');
  const [crop, setCrop] = useState('Rice');
  const [soilType, setSoilType] = useState('Clay');
  const [result, setResult] = useState(null);

  const calculateFertilizer = () => {
    // Example calculation - in a real app, this would use more sophisticated formulas
    const baseRates = {
      nitrogen: 120,    // kg/hectare
      phosphorus: 60,   // kg/hectare
      potassium: 40,    // kg/hectare
    };

    const areaNum = parseFloat(area);
    if (!areaNum) return;

    setResult({
      nitrogen: Math.round(baseRates.nitrogen * areaNum * 100) / 100,
      phosphorus: Math.round(baseRates.phosphorus * areaNum * 100) / 100,
      potassium: Math.round(baseRates.potassium * areaNum * 100) / 100,
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
              <Leaf className="h-4 w-4 mr-2" />
              <span>Fertilizer Calculator</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Calculate Optimal Fertilizer Usage</h1>
            <p className="text-lg text-green-100 max-w-2xl">
              Get precise fertilizer recommendations based on your crop type, land area, and soil conditions.
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
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Soil Type
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2"
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                >
                  {soilTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={calculateFertilizer}
              >
                Calculate
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
                  <h3 className="font-medium text-gray-900">Recommended Fertilizer Amount</h3>
                </div>
                
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-blue-600 font-medium">Nitrogen (N)</p>
                      <p className="text-2xl font-bold text-blue-700">{result.nitrogen}</p>
                      <p className="text-sm text-blue-600">kg</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-sm text-green-600 font-medium">Phosphorus (P)</p>
                      <p className="text-2xl font-bold text-green-700">{result.phosphorus}</p>
                      <p className="text-sm text-green-600">kg</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <p className="text-sm text-purple-600 font-medium">Potassium (K)</p>
                      <p className="text-2xl font-bold text-purple-700">{result.potassium}</p>
                      <p className="text-sm text-purple-600">kg</p>
                    </div>
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
                    These recommendations are general guidelines. Actual requirements may vary based on
                    soil test results, climate conditions, and specific crop varieties.
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