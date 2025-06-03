'use client';

import { Suspense } from 'react';
import Hero from '@/components/home/Hero';
import QuickStats from '@/components/home/QuickStats';
import DashboardOverview from '@/components/home/DashboardOverview';
import SmartFarmingAssistant from '@/components/home/SmartFarmingAssistant';
import DiseasePredictionCard from '@/components/home/DiseasePredictionCard';
import FeaturedTools from '@/components/home/FeaturedTools';

const HomeClient = ({ lang }) => {
  return (
    <div className="w-full">
      <Hero lang={lang} />
      <QuickStats lang={lang} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <Suspense fallback={<div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>}>
          <DashboardOverview lang={lang} />
        </Suspense>
        
        {/* Disease Prediction Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Suspense fallback={<div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>}>
              <DiseasePredictionCard lang={lang} />
            </Suspense>
            <Suspense fallback={<div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>}>
              <SmartFarmingAssistant lang={lang} />
            </Suspense>
          </div>
        </div>
        
        <Suspense fallback={<div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>}>
          <FeaturedTools lang={lang} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomeClient;
