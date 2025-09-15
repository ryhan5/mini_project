// Knowledge Engine for Crop Calendars, Pest Data, and Best Practices
import { generateId } from './utils';

// Crop calendar data structure
export const CROP_CALENDARS = {
  rice: {
    seasons: {
      kharif: {
        sowing: { start: 'Jun-15', end: 'Jul-15' },
        transplanting: { start: 'Jul-01', end: 'Aug-15' },
        flowering: { start: 'Sep-15', end: 'Oct-15' },
        harvest: { start: 'Oct-15', end: 'Nov-30' }
      },
      rabi: {
        sowing: { start: 'Nov-15', end: 'Dec-15' },
        transplanting: { start: 'Dec-01', end: 'Jan-15' },
        flowering: { start: 'Feb-15', end: 'Mar-15' },
        harvest: { start: 'Apr-01', end: 'May-15' }
      }
    },
    varieties: ['Basmati', 'IR64', 'Swarna', 'MTU-1010', 'BPT-5204'],
    soilTypes: ['clay', 'loamy', 'silt'],
    waterRequirement: 'high',
    duration: 120 // days
  },
  wheat: {
    seasons: {
      rabi: {
        sowing: { start: 'Nov-01', end: 'Dec-15' },
        tillering: { start: 'Dec-15', end: 'Jan-31' },
        flowering: { start: 'Feb-15', end: 'Mar-15' },
        harvest: { start: 'Mar-15', end: 'Apr-30' }
      }
    },
    varieties: ['HD-2967', 'PBW-343', 'WH-147', 'DBW-88', 'HD-3086'],
    soilTypes: ['loamy', 'sandy', 'clay'],
    waterRequirement: 'medium',
    duration: 150
  },
  cotton: {
    seasons: {
      kharif: {
        sowing: { start: 'Apr-15', end: 'Jun-15' },
        flowering: { start: 'Jul-15', end: 'Aug-31' },
        boll_formation: { start: 'Aug-15', end: 'Oct-15' },
        harvest: { start: 'Oct-15', end: 'Jan-31' }
      }
    },
    varieties: ['Bt-Cotton', 'Suraj', 'Bunny', 'RCH-2', 'MRC-7017'],
    soilTypes: ['loamy', 'sandy', 'clay'],
    waterRequirement: 'medium',
    duration: 180
  },
  sugarcane: {
    seasons: {
      spring: {
        planting: { start: 'Feb-01', end: 'Mar-31' },
        tillering: { start: 'Apr-01', end: 'Jun-30' },
        grand_growth: { start: 'Jul-01', end: 'Oct-31' },
        harvest: { start: 'Dec-01', end: 'Mar-31' }
      },
      autumn: {
        planting: { start: 'Sep-15', end: 'Oct-31' },
        tillering: { start: 'Nov-01', end: 'Feb-28' },
        grand_growth: { start: 'Mar-01', end: 'Aug-31' },
        harvest: { start: 'Nov-01', end: 'Feb-28' }
      }
    },
    varieties: ['Co-86032', 'Co-238', 'CoM-265', 'Co-0238', 'Co-94012'],
    soilTypes: ['loamy', 'clay', 'sandy'],
    waterRequirement: 'high',
    duration: 365
  }
};

// Pest and disease database
export const PEST_DATABASE = {
  rice: [
    {
      name: 'Brown Plant Hopper',
      scientificName: 'Nilaparvata lugens',
      type: 'insect',
      severity: 'high',
      season: 'kharif',
      symptoms: ['yellowing of leaves', 'hopper burn', 'stunted growth'],
      treatment: ['resistant varieties', 'neem oil', 'imidacloprid'],
      prevention: ['avoid excessive nitrogen', 'maintain field hygiene']
    },
    {
      name: 'Stem Borer',
      scientificName: 'Scirpophaga incertulas',
      type: 'insect',
      severity: 'medium',
      season: 'all',
      symptoms: ['dead heart', 'white ear head', 'holes in stem'],
      treatment: ['pheromone traps', 'cartap hydrochloride', 'trichogramma'],
      prevention: ['remove stubbles', 'deep plowing', 'timely planting']
    },
    {
      name: 'Blast Disease',
      scientificName: 'Pyricularia oryzae',
      type: 'fungal',
      severity: 'high',
      season: 'kharif',
      symptoms: ['diamond shaped lesions', 'neck blast', 'panicle blast'],
      treatment: ['tricyclazole', 'propiconazole', 'resistant varieties'],
      prevention: ['balanced fertilization', 'avoid water stress', 'field sanitation']
    }
  ],
  wheat: [
    {
      name: 'Rust (Yellow)',
      scientificName: 'Puccinia striiformis',
      type: 'fungal',
      severity: 'high',
      season: 'rabi',
      symptoms: ['yellow stripes on leaves', 'reduced grain filling'],
      treatment: ['propiconazole', 'tebuconazole', 'resistant varieties'],
      prevention: ['timely sowing', 'avoid late irrigation', 'crop rotation']
    },
    {
      name: 'Aphids',
      scientificName: 'Rhopalosiphum padi',
      type: 'insect',
      severity: 'medium',
      season: 'rabi',
      symptoms: ['curling of leaves', 'honeydew secretion', 'stunted growth'],
      treatment: ['dimethoate', 'imidacloprid', 'neem oil'],
      prevention: ['avoid excessive nitrogen', 'encourage natural enemies']
    }
  ],
  cotton: [
    {
      name: 'Bollworm',
      scientificName: 'Helicoverpa armigera',
      type: 'insect',
      severity: 'critical',
      season: 'kharif',
      symptoms: ['holes in bolls', 'damaged squares', 'frass on plants'],
      treatment: ['Bt cotton', 'spinosad', 'emamectin benzoate'],
      prevention: ['pheromone traps', 'intercropping', 'timely picking']
    },
    {
      name: 'Whitefly',
      scientificName: 'Bemisia tabaci',
      type: 'insect',
      severity: 'high',
      season: 'kharif',
      symptoms: ['yellowing of leaves', 'sooty mold', 'leaf curl virus'],
      treatment: ['thiamethoxam', 'spiromesifen', 'reflective mulch'],
      prevention: ['resistant varieties', 'field sanitation', 'avoid water stress']
    }
  ]
};

// Best practices database
export const BEST_PRACTICES = {
  irrigation: {
    general: [
      'Irrigate during early morning (5-7 AM) or evening (6-8 PM)',
      'Check soil moisture before irrigation',
      'Use drip or sprinkler systems for water efficiency',
      'Maintain proper drainage to prevent waterlogging'
    ],
    rice: [
      'Maintain 2-5 cm water level in paddy fields',
      'Drain water 10 days before harvest',
      'Use alternate wetting and drying (AWD) method'
    ],
    wheat: [
      'Apply light irrigation at crown root initiation stage',
      'Critical stages: tillering, jointing, flowering, grain filling',
      'Avoid irrigation during grain maturity'
    ]
  },
  fertilization: {
    general: [
      'Conduct soil test before fertilizer application',
      'Apply organic manure 2-3 weeks before sowing',
      'Split nitrogen application in 2-3 doses',
      'Apply phosphorus and potassium as basal dose'
    ],
    rice: [
      'NPK ratio: 120:60:40 kg/ha for high yielding varieties',
      'Apply 50% N as basal, 25% at tillering, 25% at panicle initiation',
      'Use neem coated urea to reduce nitrogen loss'
    ],
    wheat: [
      'NPK ratio: 120:60:40 kg/ha',
      'Apply full P&K and 1/3 N as basal',
      'Remaining N in two splits at CRI and late tillering'
    ]
  },
  pest_management: {
    general: [
      'Follow Integrated Pest Management (IPM) practices',
      'Monitor fields regularly for pest incidence',
      'Use pheromone traps for early detection',
      'Encourage natural enemies and beneficial insects'
    ],
    organic: [
      'Use neem oil, garlic extract, and other botanical pesticides',
      'Apply trichoderma for soil-borne diseases',
      'Practice crop rotation to break pest cycles',
      'Maintain field hygiene and remove crop residues'
    ]
  }
};

// Regional variations
export const REGIONAL_DATA = {
  'North India': {
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan'],
    climate: 'semi-arid to sub-humid',
    majorCrops: ['wheat', 'rice', 'cotton', 'sugarcane'],
    soilTypes: ['alluvial', 'sandy', 'loamy'],
    challenges: ['water scarcity', 'soil salinity', 'extreme temperatures']
  },
  'South India': {
    states: ['Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Kerala'],
    climate: 'tropical',
    majorCrops: ['rice', 'cotton', 'sugarcane', 'millets'],
    soilTypes: ['red', 'black', 'laterite'],
    challenges: ['drought', 'pest outbreaks', 'market fluctuations']
  },
  'West India': {
    states: ['Maharashtra', 'Gujarat', 'Madhya Pradesh'],
    climate: 'semi-arid',
    majorCrops: ['cotton', 'sugarcane', 'soybean', 'wheat'],
    soilTypes: ['black', 'alluvial', 'red'],
    challenges: ['irregular rainfall', 'pest resistance', 'soil degradation']
  },
  'East India': {
    states: ['West Bengal', 'Bihar', 'Odisha', 'Jharkhand'],
    climate: 'humid subtropical',
    majorCrops: ['rice', 'jute', 'tea', 'vegetables'],
    soilTypes: ['alluvial', 'laterite', 'red'],
    challenges: ['flooding', 'cyclones', 'soil acidity']
  }
};

class KnowledgeEngine {
  constructor() {
    this.localData = this.loadLocalData();
    this.userPreferences = this.loadUserPreferences();
  }

  // Load local knowledge data
  loadLocalData() {
    try {
      const stored = localStorage.getItem('localKnowledgeData');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading local data:', error);
      return {};
    }
  }

  // Load user preferences for recommendations
  loadUserPreferences() {
    try {
      const profile = JSON.parse(localStorage.getItem('farmerProfile') || '{}');
      const farm = JSON.parse(localStorage.getItem('farmDetails') || '{}');
      const crops = JSON.parse(localStorage.getItem('crops') || '[]');

      return {
        location: farm.location || '',
        state: farm.state || '',
        soilType: farm.soilType || '',
        irrigationType: farm.irrigationType || '',
        farmingType: profile.farmingType || '',
        experience: profile.experience || 0,
        crops: crops.map(c => c.name.toLowerCase())
      };
    } catch (error) {
      console.error('Error loading user preferences:', error);
      return {};
    }
  }

  // Get crop calendar for specific crop and season
  getCropCalendar(cropName, season = null) {
    const crop = cropName.toLowerCase();
    const cropData = CROP_CALENDARS[crop];
    
    if (!cropData) return null;

    if (season) {
      return cropData.seasons[season] || null;
    }

    return cropData;
  }

  // Get current season based on date
  getCurrentSeason(date = new Date()) {
    const month = date.getMonth() + 1; // 1-12

    if (month >= 4 && month <= 9) return 'kharif';
    if (month >= 10 || month <= 3) return 'rabi';
    return 'zaid'; // summer season
  }

  // Get suitable crops for current season and location
  getSuitableCrops(season = null, soilType = null) {
    const currentSeason = season || this.getCurrentSeason();
    const userSoil = soilType || this.userPreferences.soilType;

    const suitableCrops = [];

    Object.entries(CROP_CALENDARS).forEach(([cropName, cropData]) => {
      // Check if crop has the current season
      if (cropData.seasons[currentSeason]) {
        // Check soil compatibility
        if (!userSoil || cropData.soilTypes.includes(userSoil)) {
          suitableCrops.push({
            name: cropName,
            season: currentSeason,
            calendar: cropData.seasons[currentSeason],
            varieties: cropData.varieties,
            duration: cropData.duration,
            waterRequirement: cropData.waterRequirement
          });
        }
      }
    });

    return suitableCrops;
  }

  // Get pest information for specific crop
  getCropPests(cropName, season = null) {
    const crop = cropName.toLowerCase();
    const pests = PEST_DATABASE[crop] || [];

    if (season) {
      return pests.filter(pest => 
        pest.season === 'all' || pest.season === season
      );
    }

    return pests;
  }

  // Get best practices for specific activity
  getBestPractices(activity, crop = null) {
    const practices = BEST_PRACTICES[activity] || {};
    
    if (crop && practices[crop.toLowerCase()]) {
      return {
        general: practices.general || [],
        specific: practices[crop.toLowerCase()] || []
      };
    }

    return {
      general: practices.general || [],
      specific: []
    };
  }

  // Generate personalized recommendations
  generateRecommendations(context = {}) {
    const recommendations = [];
    const currentSeason = this.getCurrentSeason();
    const userCrops = this.userPreferences.crops;

    // Seasonal recommendations
    userCrops.forEach(cropName => {
      const calendar = this.getCropCalendar(cropName, currentSeason);
      if (calendar) {
        const currentStage = this.getCurrentCropStage(cropName, currentSeason);
        if (currentStage) {
          recommendations.push({
            type: 'seasonal',
            crop: cropName,
            title: `${cropName.charAt(0).toUpperCase() + cropName.slice(1)} - ${currentStage.stage}`,
            message: `Current stage: ${currentStage.stage}. ${currentStage.recommendation}`,
            priority: 'medium',
            category: 'crop_management'
          });
        }
      }
    });

    // Pest alerts based on season and location
    userCrops.forEach(cropName => {
      const pests = this.getCropPests(cropName, currentSeason);
      const highRiskPests = pests.filter(pest => 
        pest.severity === 'high' || pest.severity === 'critical'
      );

      highRiskPests.forEach(pest => {
        recommendations.push({
          type: 'pest_alert',
          crop: cropName,
          title: `${pest.name} Alert`,
          message: `Monitor ${cropName} for ${pest.name}. Symptoms: ${pest.symptoms.join(', ')}`,
          priority: pest.severity === 'critical' ? 'high' : 'medium',
          category: 'pest_management',
          treatment: pest.treatment
        });
      });
    });

    // Best practice recommendations
    const practices = this.getBestPractices('irrigation');
    if (practices.general.length > 0) {
      recommendations.push({
        type: 'best_practice',
        title: 'Irrigation Best Practices',
        message: practices.general[Math.floor(Math.random() * practices.general.length)],
        priority: 'low',
        category: 'irrigation'
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // Determine current crop stage based on calendar
  getCurrentCropStage(cropName, season) {
    const calendar = this.getCropCalendar(cropName, season);
    if (!calendar) return null;

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();

    for (const [stage, timing] of Object.entries(calendar)) {
      const [startMonth, startDay] = timing.start.split('-').map(Number);
      const [endMonth, endDay] = timing.end.split('-').map(Number);

      if (this.isDateInRange(currentMonth, currentDay, startMonth, startDay, endMonth, endDay)) {
        return {
          stage: stage.replace('_', ' '),
          timing,
          recommendation: this.getStageRecommendation(cropName, stage)
        };
      }
    }

    return null;
  }

  // Check if current date is in range
  isDateInRange(currentMonth, currentDay, startMonth, startDay, endMonth, endDay) {
    const current = currentMonth * 100 + currentDay;
    const start = startMonth * 100 + startDay;
    const end = endMonth * 100 + endDay;

    if (start <= end) {
      return current >= start && current <= end;
    } else {
      // Range crosses year boundary
      return current >= start || current <= end;
    }
  }

  // Get stage-specific recommendations
  getStageRecommendation(cropName, stage) {
    const recommendations = {
      rice: {
        sowing: 'Prepare nursery beds and soak seeds for 24 hours before sowing.',
        transplanting: 'Transplant 20-25 day old seedlings with 2-3 seedlings per hill.',
        flowering: 'Ensure adequate water supply and monitor for pest attacks.',
        harvest: 'Harvest when 80% of grains turn golden yellow.'
      },
      wheat: {
        sowing: 'Sow seeds at 2-3 cm depth with proper seed rate.',
        tillering: 'Apply first dose of nitrogen and ensure adequate moisture.',
        flowering: 'Monitor for rust diseases and apply fungicide if needed.',
        harvest: 'Harvest when moisture content is 20-25%.'
      }
    };

    return recommendations[cropName]?.[stage] || 'Follow recommended practices for this stage.';
  }

  // Search knowledge base
  searchKnowledge(query) {
    const results = [];
    const searchTerms = query.toLowerCase().split(' ');

    // Search in crop calendars
    Object.entries(CROP_CALENDARS).forEach(([cropName, cropData]) => {
      if (searchTerms.some(term => cropName.includes(term))) {
        results.push({
          type: 'crop_calendar',
          title: `${cropName.charAt(0).toUpperCase() + cropName.slice(1)} Calendar`,
          content: cropData,
          relevance: this.calculateRelevance(query, cropName)
        });
      }
    });

    // Search in pest database
    Object.entries(PEST_DATABASE).forEach(([cropName, pests]) => {
      pests.forEach(pest => {
        if (searchTerms.some(term => 
          pest.name.toLowerCase().includes(term) ||
          pest.symptoms.some(symptom => symptom.includes(term))
        )) {
          results.push({
            type: 'pest_info',
            title: `${pest.name} in ${cropName}`,
            content: pest,
            relevance: this.calculateRelevance(query, pest.name + ' ' + pest.symptoms.join(' '))
          });
        }
      });
    });

    // Search in best practices
    Object.entries(BEST_PRACTICES).forEach(([category, practices]) => {
      if (searchTerms.some(term => category.includes(term))) {
        results.push({
          type: 'best_practice',
          title: `${category.replace('_', ' ').toUpperCase()} Best Practices`,
          content: practices,
          relevance: this.calculateRelevance(query, category)
        });
      }
    });

    return results.sort((a, b) => b.relevance - a.relevance);
  }

  // Calculate search relevance score
  calculateRelevance(query, content) {
    const queryTerms = query.toLowerCase().split(' ');
    const contentLower = content.toLowerCase();
    
    let score = 0;
    queryTerms.forEach(term => {
      if (contentLower.includes(term)) {
        score += term.length; // Longer matches get higher scores
      }
    });

    return score;
  }

  // Update local knowledge with user data
  updateLocalKnowledge(category, data) {
    if (!this.localData[category]) {
      this.localData[category] = [];
    }

    this.localData[category].push({
      id: generateId(),
      ...data,
      addedAt: new Date().toISOString(),
      userId: this.getCurrentUserId()
    });

    this.saveLocalData();
  }

  // Save local data
  saveLocalData() {
    try {
      localStorage.setItem('localKnowledgeData', JSON.stringify(this.localData));
    } catch (error) {
      console.error('Error saving local data:', error);
    }
  }

  // Get current user ID
  getCurrentUserId() {
    return localStorage.getItem('currentUserId') || 'default-user';
  }

  // Get regional information
  getRegionalInfo(state) {
    for (const [region, data] of Object.entries(REGIONAL_DATA)) {
      if (data.states.includes(state)) {
        return { region, ...data };
      }
    }
    return null;
  }

  // Export knowledge data
  exportKnowledge() {
    return {
      cropCalendars: CROP_CALENDARS,
      pestDatabase: PEST_DATABASE,
      bestPractices: BEST_PRACTICES,
      regionalData: REGIONAL_DATA,
      localData: this.localData,
      exportedAt: new Date().toISOString()
    };
  }
}

// Create singleton instance
export const knowledgeEngine = new KnowledgeEngine();

// Utility functions
export const formatCropName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const getSeverityColor = (severity) => {
  const colors = {
    low: 'green',
    medium: 'yellow',
    high: 'orange',
    critical: 'red'
  };
  return colors[severity] || 'gray';
};

export const formatDateRange = (start, end) => {
  return `${start} to ${end}`;
};
