// AI-Powered Personalized Advisory System
import { generateId } from './utils';

// Advisory types and priorities
export const ADVISORY_TYPES = {
  WEATHER: {
    id: 'weather',
    name: 'Weather Advisory',
    icon: '🌦️',
    color: 'blue'
  },
  PEST: {
    id: 'pest',
    name: 'Pest Alert',
    icon: '🐛',
    color: 'red'
  },
  IRRIGATION: {
    id: 'irrigation',
    name: 'Irrigation Guidance',
    icon: '💧',
    color: 'cyan'
  },
  FERTILIZER: {
    id: 'fertilizer',
    name: 'Fertilizer Recommendation',
    icon: '🧪',
    color: 'green'
  },
  HARVEST: {
    id: 'harvest',
    name: 'Harvest Advisory',
    icon: '🌾',
    color: 'yellow'
  },
  MARKET: {
    id: 'market',
    name: 'Market Intelligence',
    icon: '📈',
    color: 'purple'
  },
  SCHEME: {
    id: 'scheme',
    name: 'Government Scheme',
    icon: '🏛️',
    color: 'indigo'
  }
};

export const PRIORITY_LEVELS = {
  LOW: { id: 'low', name: 'Low', color: 'gray', urgency: 1 },
  MEDIUM: { id: 'medium', name: 'Medium', color: 'yellow', urgency: 2 },
  HIGH: { id: 'high', name: 'High', color: 'orange', urgency: 3 },
  CRITICAL: { id: 'critical', name: 'Critical', color: 'red', urgency: 4 }
};

class AIAdvisorySystem {
  constructor() {
    this.advisories = this.loadAdvisories();
    this.userContext = this.loadUserContext();
    this.knowledgeBase = this.initializeKnowledgeBase();
    this.listeners = [];
  }

  // Load advisories from localStorage
  loadAdvisories() {
    try {
      const stored = localStorage.getItem('farmAdvisories');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading advisories:', error);
      return [];
    }
  }

  // Load user context for personalization
  loadUserContext() {
    try {
      const profile = JSON.parse(localStorage.getItem('farmerProfile') || '{}');
      const farm = JSON.parse(localStorage.getItem('farmDetails') || '{}');
      const crops = JSON.parse(localStorage.getItem('crops') || '[]');
      const activities = JSON.parse(localStorage.getItem('farmActivities') || '[]');

      return {
        profile,
        farm,
        crops,
        activities,
        location: farm.location || '',
        soilType: farm.soilType || '',
        irrigationType: farm.irrigationType || '',
        experience: profile.experience || 0
      };
    } catch (error) {
      console.error('Error loading user context:', error);
      return {};
    }
  }

  // Initialize knowledge base with crop calendars and best practices
  initializeKnowledgeBase() {
    return {
      cropCalendars: {
        rice: {
          kharif: { sowing: 'Jun-Jul', harvest: 'Oct-Nov' },
          rabi: { sowing: 'Nov-Dec', harvest: 'Apr-May' }
        },
        wheat: {
          rabi: { sowing: 'Nov-Dec', harvest: 'Mar-Apr' }
        },
        cotton: {
          kharif: { sowing: 'Apr-Jun', harvest: 'Oct-Jan' }
        },
        sugarcane: {
          perennial: { sowing: 'Feb-Mar', harvest: 'Dec-Mar' }
        }
      },
      pestData: {
        rice: [
          { name: 'Brown Plant Hopper', season: 'kharif', severity: 'high' },
          { name: 'Stem Borer', season: 'all', severity: 'medium' }
        ],
        cotton: [
          { name: 'Bollworm', season: 'kharif', severity: 'critical' },
          { name: 'Aphids', season: 'all', severity: 'medium' }
        ]
      },
      weatherPatterns: {
        monsoon: { months: ['Jun', 'Jul', 'Aug', 'Sep'], activities: ['sowing', 'transplanting'] },
        winter: { months: ['Dec', 'Jan', 'Feb'], activities: ['harvesting', 'land_prep'] },
        summer: { months: ['Mar', 'Apr', 'May'], activities: ['irrigation', 'pest_control'] }
      }
    };
  }

  // Save advisories to localStorage
  saveAdvisories() {
    try {
      localStorage.setItem('farmAdvisories', JSON.stringify(this.advisories));
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving advisories:', error);
    }
  }

  // Add event listener
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove event listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  // Notify listeners
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.advisories));
  }

  // Generate personalized advisory based on context
  generateAdvisory(trigger, data = {}) {
    const advisory = {
      id: generateId(),
      type: this.determineAdvisoryType(trigger, data),
      priority: this.calculatePriority(trigger, data),
      title: this.generateTitle(trigger, data),
      message: this.generateMessage(trigger, data),
      actionItems: this.generateActionItems(trigger, data),
      validUntil: this.calculateValidUntil(trigger),
      createdAt: new Date().toISOString(),
      status: 'active',
      trigger,
      context: { ...this.userContext, ...data }
    };

    this.advisories.unshift(advisory);
    this.saveAdvisories();
    return advisory;
  }

  // Determine advisory type based on trigger
  determineAdvisoryType(trigger, data) {
    if (trigger.includes('weather')) return 'weather';
    if (trigger.includes('pest') || trigger.includes('disease')) return 'pest';
    if (trigger.includes('irrigation') || trigger.includes('water')) return 'irrigation';
    if (trigger.includes('fertilizer') || trigger.includes('nutrient')) return 'fertilizer';
    if (trigger.includes('harvest')) return 'harvest';
    if (trigger.includes('market') || trigger.includes('price')) return 'market';
    if (trigger.includes('scheme') || trigger.includes('subsidy')) return 'scheme';
    return 'general';
  }

  // Calculate priority based on urgency and impact
  calculatePriority(trigger, data) {
    let urgencyScore = 1;

    // Weather-based urgency
    if (trigger.includes('rain') && data.rainExpected) urgencyScore += 2;
    if (trigger.includes('storm') || trigger.includes('cyclone')) urgencyScore += 3;

    // Pest-based urgency
    if (trigger.includes('outbreak')) urgencyScore += 3;
    if (data.severity === 'high' || data.severity === 'critical') urgencyScore += 2;

    // Time-sensitive operations
    if (trigger.includes('sowing') || trigger.includes('harvest')) urgencyScore += 2;

    // Market opportunities
    if (trigger.includes('price_spike')) urgencyScore += 2;

    if (urgencyScore >= 4) return 'critical';
    if (urgencyScore >= 3) return 'high';
    if (urgencyScore >= 2) return 'medium';
    return 'low';
  }

  // Generate contextual title
  generateTitle(trigger, data) {
    const templates = {
      weather_rain: `Rain Expected - Adjust ${data.crop || 'Crop'} Operations`,
      weather_drought: `Drought Alert - Irrigation Planning Required`,
      pest_outbreak: `${data.pest || 'Pest'} Outbreak Alert in Your Area`,
      irrigation_schedule: `Optimal Irrigation Time for ${data.crop || 'Your Crops'}`,
      fertilizer_timing: `Fertilizer Application Recommended`,
      harvest_ready: `${data.crop || 'Crop'} Ready for Harvest`,
      market_opportunity: `Good Selling Opportunity for ${data.crop || 'Your Produce'}`,
      scheme_deadline: `${data.scheme || 'Government Scheme'} Deadline Approaching`
    };

    return templates[trigger] || 'Farm Advisory';
  }

  // Generate personalized message
  generateMessage(trigger, data) {
    const location = this.userContext.farm?.location || 'your area';
    const crops = this.userContext.crops?.map(c => c.name).join(', ') || 'your crops';

    const messages = {
      weather_rain: `Rain is expected in ${location} tomorrow. Avoid spraying pesticides and fertilizers. Ensure proper drainage in your fields to prevent waterlogging.`,
      
      weather_drought: `Extended dry period forecasted for ${location}. Plan irrigation schedule for ${crops}. Consider mulching to retain soil moisture.`,
      
      pest_outbreak: `${data.pest || 'Pest'} outbreak reported in nearby farms in ${location}. Inspect your ${data.crop || crops} immediately. Early detection can prevent major damage.`,
      
      irrigation_schedule: `Based on weather conditions and soil moisture, irrigate your ${data.crop || crops} in the early morning (5-7 AM) for best results.`,
      
      fertilizer_timing: `Your ${data.crop || crops} are at the optimal stage for ${data.fertilizerType || 'nutrient'} application. Apply during cooler hours to maximize absorption.`,
      
      harvest_ready: `Your ${data.crop || crops} have reached maturity. Harvest within the next ${data.days || 7} days for best quality and yield.`,
      
      market_opportunity: `${data.crop || 'Your produce'} prices have increased by ${data.priceIncrease || '15%'} in ${location} markets. Consider selling now for better profits.`,
      
      scheme_deadline: `${data.scheme || 'PM-KISAN scheme'} application deadline is ${data.deadline || 'approaching'}. Submit your documents to avoid missing benefits.`
    };

    return messages[trigger] || 'We have important information for your farm operations.';
  }

  // Generate actionable items
  generateActionItems(trigger, data) {
    const actionTemplates = {
      weather_rain: [
        'Check drainage systems in all fields',
        'Postpone pesticide/fertilizer applications',
        'Cover harvested produce',
        'Ensure livestock shelter is ready'
      ],
      
      pest_outbreak: [
        `Inspect ${data.crop || 'crops'} for ${data.pest || 'pest'} symptoms`,
        'Contact local agricultural officer if needed',
        'Prepare organic/chemical treatment',
        'Monitor neighboring fields'
      ],
      
      irrigation_schedule: [
        'Check soil moisture levels',
        'Clean irrigation channels/pipes',
        'Schedule early morning watering',
        'Monitor plant stress indicators'
      ],
      
      harvest_ready: [
        'Arrange harvesting equipment/labor',
        'Check market prices',
        'Prepare storage facilities',
        'Plan transportation'
      ]
    };

    return actionTemplates[trigger] || ['Review the advisory details', 'Take appropriate action'];
  }

  // Calculate advisory validity period
  calculateValidUntil(trigger) {
    const now = new Date();
    const validityPeriods = {
      weather_rain: 2, // 2 days
      weather_drought: 7, // 1 week
      pest_outbreak: 5, // 5 days
      irrigation_schedule: 1, // 1 day
      fertilizer_timing: 3, // 3 days
      harvest_ready: 7, // 1 week
      market_opportunity: 2, // 2 days
      scheme_deadline: 30 // 1 month
    };

    const days = validityPeriods[trigger] || 7;
    const validUntil = new Date(now);
    validUntil.setDate(validUntil.getDate() + days);
    return validUntil.toISOString();
  }

  // Process weather data for advisories
  processWeatherData(weatherData) {
    const advisories = [];

    // Rain advisory
    if (weatherData.rainExpected && weatherData.rainProbability > 70) {
      advisories.push(this.generateAdvisory('weather_rain', {
        rainExpected: true,
        rainProbability: weatherData.rainProbability,
        crop: this.userContext.crops?.[0]?.name
      }));
    }

    // Drought advisory
    if (weatherData.dryDays > 7 && !weatherData.rainExpected) {
      advisories.push(this.generateAdvisory('weather_drought', {
        dryDays: weatherData.dryDays
      }));
    }

    return advisories;
  }

  // Process pest reports for advisories
  processPestReports(pestReports) {
    const advisories = [];
    const userCrops = this.userContext.crops?.map(c => c.name.toLowerCase()) || [];

    pestReports.forEach(report => {
      if (userCrops.includes(report.crop.toLowerCase())) {
        advisories.push(this.generateAdvisory('pest_outbreak', {
          pest: report.pest,
          crop: report.crop,
          severity: report.severity,
          location: report.location
        }));
      }
    });

    return advisories;
  }

  // Get active advisories
  getActiveAdvisories() {
    const now = new Date();
    return this.advisories.filter(advisory => 
      advisory.status === 'active' && 
      new Date(advisory.validUntil) > now
    ).sort((a, b) => 
      PRIORITY_LEVELS[b.priority].urgency - PRIORITY_LEVELS[a.priority].urgency
    );
  }

  // Mark advisory as read
  markAsRead(advisoryId) {
    const advisory = this.advisories.find(a => a.id === advisoryId);
    if (advisory) {
      advisory.status = 'read';
      advisory.readAt = new Date().toISOString();
      this.saveAdvisories();
    }
  }

  // Mark advisory as dismissed
  dismissAdvisory(advisoryId) {
    const advisory = this.advisories.find(a => a.id === advisoryId);
    if (advisory) {
      advisory.status = 'dismissed';
      advisory.dismissedAt = new Date().toISOString();
      this.saveAdvisories();
    }
  }

  // Get advisory statistics
  getAdvisoryStats(days = 30) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    
    const recentAdvisories = this.advisories.filter(a => 
      new Date(a.createdAt) >= cutoff
    );

    return {
      total: recentAdvisories.length,
      byType: this.groupBy(recentAdvisories, 'type'),
      byPriority: this.groupBy(recentAdvisories, 'priority'),
      byStatus: this.groupBy(recentAdvisories, 'status')
    };
  }

  // Helper method to group by property
  groupBy(array, property) {
    return array.reduce((acc, item) => {
      const key = item[property];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }

  // Update user context when profile changes
  updateUserContext() {
    this.userContext = this.loadUserContext();
  }
}

// Create singleton instance
export const aiAdvisory = new AIAdvisorySystem();

// Utility functions
export const getAdvisoryIcon = (type) => {
  return ADVISORY_TYPES[type]?.icon || '📋';
};

export const getAdvisoryColor = (type) => {
  return ADVISORY_TYPES[type]?.color || 'gray';
};

export const getPriorityColor = (priority) => {
  return PRIORITY_LEVELS[priority]?.color || 'gray';
};

export const formatAdvisoryDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
