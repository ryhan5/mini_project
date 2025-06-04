const siteConfig = {
  name: 'Agrosarthi',
  description: 'Smart farming platform for modern agriculture - Get weather forecasts, crop recommendations, and farming tools',
  defaultTitle: 'Agrosarthi - Smart Farming Platform',
  keywords: ['farming', 'agriculture', 'crop monitoring', 'weather forecast', 'smart farming', 'india'],
  author: 'Agrosarthi Team',
  siteUrl: 'https://agrosarthi.com',
  locale: 'en_US',
  twitter: '@agrosarthi',
};

const pages = {
  home: {
    title: 'Dashboard',
    description: 'Your farming dashboard with weather, crop health, and quick actions',
  },
  weather: {
    title: 'Weather Forecast',
    description: 'Accurate weather forecasts and alerts for your farm location',
  },
  'crop-calendar': {
    title: 'Crop Calendar',
    description: 'Plan your farming activities with our crop calendar and planting schedules',
  },
  'crop-assistant': {
    title: 'Crop Assistant',
    description: 'AI-powered crop recommendations and farming advice',
  },
  'irrigation': {
    title: 'Irrigation Management',
    description: 'Smart water management and irrigation scheduling tools',
  },
  'market-prices': {
    title: 'Market Prices',
    description: 'Real-time agricultural commodity prices and market trends',
  },
  'knowledge-hub': {
    title: 'Knowledge Hub',
    description: 'Farming guides, articles, and educational resources',
  },
  'equipment-exchange': {
    title: 'Equipment Exchange',
    description: 'Rent or buy farm equipment from trusted providers',
  },
  'dashboard': {
    title: 'My Dashboard',
    description: 'Your personalized farming dashboard',
  },
  'profile': {
    title: 'My Profile',
    description: 'Manage your account and preferences',
  },
  'login': {
    title: 'Sign In',
    description: 'Sign in to your Agrosarthi account',
  },
  'register': {
    title: 'Create Account',
    description: 'Create a new Agrosarthi account',
  },
  'not-found': {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist',
  },
};

export function getPageMetadata(path, lang = 'en') {
  // Remove language prefix and leading/trailing slashes
  const cleanPath = path.replace(/^\/[a-z]{2}\//, '').replace(/^\/+|\/+$/g, '');
  const pageKey = cleanPath.split('/')[0] || 'home';
  const page = pages[pageKey] || pages['not-found'];
  
  // Get localized title if available
  const localizedTitle = page.title; // In a real app, you'd fetch translations here
  
  return {
    title: `${localizedTitle} | ${siteConfig.name}`,
    description: page.description,
    openGraph: {
      title: `${localizedTitle} | ${siteConfig.name}`,
      description: page.description,
      type: 'website',
      locale: lang,
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${localizedTitle} | ${siteConfig.name}`,
      description: page.description,
      creator: siteConfig.twitter,
    },
  };
}

export default siteConfig;
