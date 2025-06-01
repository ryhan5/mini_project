'use client';

import { motion } from 'framer-motion';
import { Camera, Image as ImageIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DiseasePredictionCard({ lang }) {
  return (
    <motion.div 
      className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-sm border border-green-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Crop Disease Detection</h3>
            <p className="text-sm text-gray-600 mb-4">
              Identify plant diseases instantly with our AI-powered detection system
            </p>
            <Link href={`/${lang}/crop-disease`}>
              <Button className="bg-green-600 hover:bg-green-700">
                Try Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <Camera className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="text-green-600 text-xs font-medium mb-1">SUPPORTS</div>
            <div className="font-medium">10+ Crops</div>
            <p className="text-xs text-gray-500">Including rice, wheat, corn, and more</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="text-green-600 text-xs font-medium mb-1">DETECTS</div>
            <div className="font-medium">50+ Diseases</div>
            <p className="text-xs text-gray-500">With detailed treatment plans</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
