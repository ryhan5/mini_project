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

export default function RevenueCalculatorForm({ lang }) {
  const [area, setArea] = useState('');
  const [crop, setCrop] = useState(crops[0].name);
  const [customPrice, setCustomPrice] = useState('');
  const [result, setResult] = useState(null);
  const [showCustomPrice, setShowCustomPrice] = useState(false);

  const selectedCrop = crops.find(c => c.name === crop) || crops[0];
  const price = showCustomPrice && customPrice ? parseFloat(customPrice) : selectedCrop.avgPrice;

  const calculateRevenue = (e) => {
    e.preventDefault();
    
    if (!area || isNaN(area) || area <= 0) {
      return;
    }

    const areaInHectares = parseFloat(area);
    const totalProduction = areaInHectares * selectedCrop.avgYield;
    const totalRevenue = totalProduction * price;
    const totalCost = totalProduction * 0.6; // Assuming 40% profit margin
    const profit = totalRevenue - totalCost;

    setResult({
      production: totalProduction.toFixed(2),
      revenue: totalRevenue.toFixed(2),
      cost: totalCost.toFixed(2),
      profit: profit.toFixed(2)
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Calculator className="mr-2 h-6 w-6 text-green-600" />
          Revenue Calculator
        </h2>
        
        <form onSubmit={calculateRevenue} className="space-y-6">
          <div>
            <label htmlFor="crop" className="block text-sm font-medium text-gray-700 mb-1">
              Select Crop
            </label>
            <select
              id="crop"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              {crops.map((crop) => (
                <option key={crop.name} value={crop.name}>
                  {crop.name} (Avg. ₹{crop.avgPrice}/quintal)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
              Land Area (Hectares)
            </label>
            <Input
              id="area"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter land area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="customPrice"
              checked={showCustomPrice}
              onChange={(e) => setShowCustomPrice(e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="customPrice" className="ml-2 block text-sm text-gray-700">
              Use custom price
            </label>
          </div>

          {showCustomPrice && (
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Custom Price (₹/quintal)
              </label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder={`Default: ₹${selectedCrop.avgPrice}/quintal`}
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
              />
            </div>
          )}

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Calculate Revenue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-green-50 border border-green-100 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-green-800 mb-3">Revenue Projection</h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-600">Estimated Production:</span>
                <span className="font-medium">{result.production} quintals</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Total Revenue:</span>
                <span className="font-medium">₹{result.revenue}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Estimated Costs:</span>
                <span className="font-medium">₹{result.cost}</span>
              </p>
              <p className="flex justify-between text-lg font-bold pt-2 border-t border-green-100 mt-2">
                <span className="text-gray-900">Estimated Profit:</span>
                <span className="text-green-700">₹{result.profit}</span>
              </p>
            </div>
          </motion.div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-800 mb-1">Note</h4>
              <p className="text-xs text-blue-700">
                This is an estimation based on average yields and market prices. Actual results may vary based on 
                weather conditions, soil quality, and other factors. Always consult with local agricultural experts 
                for more accurate planning.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
