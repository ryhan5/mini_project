'use client';

import { motion } from 'framer-motion';
import { Camera, Image as ImageIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { t } from '@/translations';

export default function DiseasePredictionCard({ lang }) {
  // Get translations with fallback
  const getTranslation = (key, defaultValue = '') => {
    try {
      return t(`home.diseaseDetection.${key}`, lang) || defaultValue;
    } catch (e) {
      console.warn(`Translation error for key: home.diseaseDetection.${key}`, e);
      return defaultValue;
    }
  };

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
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {getTranslation('title')}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {getTranslation('description')}
            </p>
            <Link href={`/${lang}/crop-disease`}>
              <Button className="bg-green-600 hover:bg-green-700">
                {getTranslation('tryNow')}
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
            <div className="text-green-600 text-xs font-medium mb-1">
              {getTranslation('supports')}
            </div>
            <div className="font-medium">
              {getTranslation('cropsCount')}
            </div>
            <p className="text-xs text-gray-500">
              {getTranslation('cropsList')}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="text-green-600 text-xs font-medium mb-1">
              {getTranslation('detects')}
            </div>
            <div className="font-medium">
              {getTranslation('diseasesCount')}
            </div>
            <p className="text-xs text-gray-500">
              {getTranslation('treatmentPlans')}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
