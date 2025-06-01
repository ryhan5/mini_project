'use client';

import React from 'react';
import { BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const cropPrices = [
  { name: 'Rice', price: '₹2,200', change: '+4.8%', trending: 'up' },
  { name: 'Wheat', price: '₹1,850', change: '+2.3%', trending: 'up' },
  { name: 'Potato', price: '₹1,200', change: '-1.5%', trending: 'down' },
  { name: 'Onion', price: '₹1,500', change: '+6.7%', trending: 'up' },
];

export default function CropPriceTile() {
  return (
    <div className="space-y-3">
      {cropPrices.map((crop, index) => (
        <div key={index} className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 transition-colors">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
              <BarChart3 className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{crop.name}</p>
              <p className="text-sm text-gray-500">{crop.price}</p>
            </div>
          </div>
          
          <div className={`flex items-center ${
            crop.trending === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {crop.trending === 'up' ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm font-medium">{crop.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}