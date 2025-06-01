import Hero from '@/components/home/Hero';
import QuickStats from '@/components/home/QuickStats';
import DashboardOverview from '@/components/home/DashboardOverview';
import SmartFarmingAssistant from '@/components/home/SmartFarmingAssistant';
import DiseasePredictionCard from '@/components/home/DiseasePredictionCard';
import FeaturedTools from '@/components/home/FeaturedTools';

export default function HomePage({ params }) {
  const { lang } = params;
  
  return (
    <div className="w-full">
      <Hero lang={lang} />
      <QuickStats lang={lang} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <DashboardOverview lang={lang} />
        
        {/* Disease Prediction Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <DiseasePredictionCard lang={lang} />
            <SmartFarmingAssistant lang={lang} />
          </div>
        </div>
        
        <FeaturedTools lang={lang} />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const { languages } = require('@/config/languages');
  return languages.map(lang => ({ lang: lang.code }));
}
