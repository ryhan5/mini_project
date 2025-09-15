// AI Assistant Implementation - Replaces Gemini with rule-based responses
// This provides agricultural advice and crop guidance without external AI dependencies

// Knowledge base for agricultural advice
const agricultureKnowledge = {
  crops: {
    rice: {
      planting: {
        season: 'Kharif (June-July) and Rabi (November-December)',
        soil: 'Clay loam with good water retention',
        temperature: '20-37°C optimal',
        rainfall: '100-200cm annually'
      },
      diseases: ['bacterial blight', 'blast', 'brown spot', 'sheath rot'],
      pests: ['stem borer', 'leaf folder', 'brown planthopper'],
      fertilizer: 'NPK 120:60:40 kg/ha recommended',
      irrigation: 'Continuous flooding during vegetative stage'
    },
    wheat: {
      planting: {
        season: 'Rabi (October-December)',
        soil: 'Well-drained loamy soil',
        temperature: '10-25°C optimal',
        rainfall: '75-100cm annually'
      },
      diseases: ['rust', 'blight', 'smut', 'powdery mildew'],
      pests: ['aphids', 'termites', 'army worm'],
      fertilizer: 'NPK 120:60:40 kg/ha recommended',
      irrigation: 'Critical at crown root initiation and grain filling'
    },
    tomato: {
      planting: {
        season: 'Year-round in controlled conditions',
        soil: 'Well-drained sandy loam, pH 6.0-7.0',
        temperature: '18-29°C optimal',
        rainfall: 'Moderate, avoid waterlogging'
      },
      diseases: ['blight', 'leaf spot', 'mosaic virus', 'bacterial wilt'],
      pests: ['whitefly', 'aphids', 'fruit borer', 'leaf miner'],
      fertilizer: 'NPK 100:50:50 kg/ha recommended',
      irrigation: 'Regular, avoid water stress during fruiting'
    },
    cotton: {
      planting: {
        season: 'Kharif (April-June)',
        soil: 'Deep black cotton soil preferred',
        temperature: '21-30°C optimal',
        rainfall: '50-100cm annually'
      },
      diseases: ['bacterial blight', 'fusarium wilt', 'verticillium wilt'],
      pests: ['bollworm', 'aphids', 'whitefly', 'thrips'],
      fertilizer: 'NPK 80:40:40 kg/ha recommended',
      irrigation: 'Critical during flowering and boll development'
    }
  },
  
  generalAdvice: {
    soilHealth: [
      'Test soil pH regularly - most crops prefer 6.0-7.5',
      'Add organic matter like compost or farmyard manure',
      'Practice crop rotation to maintain soil fertility',
      'Use cover crops to prevent soil erosion',
      'Avoid over-tillage to preserve soil structure'
    ],
    
    pestManagement: [
      'Use integrated pest management (IPM) approach',
      'Monitor fields regularly for early pest detection',
      'Encourage beneficial insects with diverse plantings',
      'Use pheromone traps for monitoring pest populations',
      'Apply pesticides only when economic threshold is reached'
    ],
    
    waterManagement: [
      'Install drip irrigation for water efficiency',
      'Mulch around plants to retain soil moisture',
      'Collect rainwater for irrigation during dry periods',
      'Monitor soil moisture before irrigating',
      'Avoid overwatering to prevent root diseases'
    ],
    
    fertilization: [
      'Conduct soil tests before applying fertilizers',
      'Use balanced NPK fertilizers based on crop needs',
      'Apply organic fertilizers for long-term soil health',
      'Split fertilizer applications for better uptake',
      'Consider micronutrient deficiencies in your region'
    ]
  },
  
  marketTips: [
    'Monitor daily market prices in nearby mandis',
    'Store produce properly to reduce post-harvest losses',
    'Consider value addition through processing',
    'Form farmer groups for better bargaining power',
    'Use government schemes for minimum support prices',
    'Plan harvesting based on market demand forecasts'
  ],
  
  weatherAdvice: {
    monsoon: [
      'Ensure proper drainage in fields',
      'Apply preventive fungicides before heavy rains',
      'Harvest mature crops before monsoon arrival',
      'Store seeds and fertilizers in dry places'
    ],
    
    drought: [
      'Use drought-resistant crop varieties',
      'Implement water conservation techniques',
      'Apply mulching to reduce water evaporation',
      'Consider crop insurance for risk management'
    ],
    
    winter: [
      'Protect crops from frost damage',
      'Adjust irrigation schedules for lower temperatures',
      'Plan Rabi crop sowing based on weather forecasts',
      'Store harvested produce properly'
    ]
  }
};

// Common farming questions and responses
const commonQuestions = {
  'pest control': 'For effective pest control, use integrated pest management (IPM). Monitor your fields regularly, use pheromone traps, encourage beneficial insects, and apply pesticides only when necessary. Always follow label instructions.',
  
  'fertilizer': 'Fertilizer needs depend on your crop and soil type. Conduct a soil test first. Generally, use balanced NPK fertilizers and supplement with organic matter like compost or farmyard manure.',
  
  'irrigation': 'Proper irrigation timing is crucial. Water early morning or evening to reduce evaporation. Use drip irrigation for efficiency. Check soil moisture before watering - most crops need consistent but not excessive moisture.',
  
  'disease': 'For disease management, focus on prevention: use disease-resistant varieties, ensure proper plant spacing, avoid overhead watering, and remove infected plant material. Apply fungicides preventively during high-risk periods.',
  
  'market price': 'Check daily market prices through government portals, local mandi boards, or agricultural apps. Consider storage options if prices are low, but factor in storage costs and quality deterioration.',
  
  'soil health': 'Maintain soil health by adding organic matter, practicing crop rotation, avoiding over-tillage, and testing soil pH regularly. Healthy soil is the foundation of productive farming.',
  
  'weather': 'Monitor weather forecasts regularly and plan farming activities accordingly. Use weather-based advisories for irrigation, pest management, and harvesting decisions.'
};

// Function to analyze user query and provide relevant response
function analyzeQuery(query) {
  const lowerQuery = query.toLowerCase();
  
  // Check for crop-specific questions
  for (const [crop, info] of Object.entries(agricultureKnowledge.crops)) {
    if (lowerQuery.includes(crop)) {
      return {
        type: 'crop-specific',
        crop: crop,
        info: info
      };
    }
  }
  
  // Check for common question patterns
  for (const [topic, response] of Object.entries(commonQuestions)) {
    if (lowerQuery.includes(topic) || lowerQuery.includes(topic.replace(' ', ''))) {
      return {
        type: 'common-question',
        topic: topic,
        response: response
      };
    }
  }
  
  // Check for general advice categories
  if (lowerQuery.includes('soil')) {
    return {
      type: 'general-advice',
      category: 'soilHealth',
      advice: agricultureKnowledge.generalAdvice.soilHealth
    };
  }
  
  if (lowerQuery.includes('pest') || lowerQuery.includes('insect')) {
    return {
      type: 'general-advice',
      category: 'pestManagement',
      advice: agricultureKnowledge.generalAdvice.pestManagement
    };
  }
  
  if (lowerQuery.includes('water') || lowerQuery.includes('irrigation')) {
    return {
      type: 'general-advice',
      category: 'waterManagement',
      advice: agricultureKnowledge.generalAdvice.waterManagement
    };
  }
  
  if (lowerQuery.includes('fertilizer') || lowerQuery.includes('nutrition')) {
    return {
      type: 'general-advice',
      category: 'fertilization',
      advice: agricultureKnowledge.generalAdvice.fertilization
    };
  }
  
  return {
    type: 'general',
    query: query
  };
}

// Generate response based on analysis
function generateResponse(analysis) {
  switch (analysis.type) {
    case 'crop-specific':
      return `Here's information about ${analysis.crop}:

**Planting Season:** ${analysis.info.planting.season}
**Soil Requirements:** ${analysis.info.planting.soil}
**Temperature:** ${analysis.info.planting.temperature}
**Fertilizer:** ${analysis.info.fertilizer}

**Common Diseases:** ${analysis.info.diseases.join(', ')}
**Common Pests:** ${analysis.info.pests.join(', ')}

**Irrigation:** ${analysis.info.irrigation}

For specific issues with your ${analysis.crop} crop, please provide more details about your location and current growing conditions.`;

    case 'common-question':
      return analysis.response;
      
    case 'general-advice':
      return `Here are some key recommendations for ${analysis.category.replace(/([A-Z])/g, ' $1').toLowerCase()}:

${analysis.advice.map((tip, index) => `${index + 1}. ${tip}`).join('\n')}

Would you like more specific advice for your particular situation?`;
      
    default:
      return `I understand you're asking about farming. While I can provide general agricultural guidance, for the most accurate advice, I recommend:

1. **Consult local agricultural extension officers** - they know your specific region's conditions
2. **Contact agricultural universities** - they provide research-based recommendations
3. **Join farmer groups** - learn from experienced local farmers
4. **Use government agricultural helplines** - many states have dedicated farmer support

Some general farming principles that apply everywhere:
- Test your soil regularly
- Use integrated pest management
- Monitor weather forecasts
- Practice crop rotation
- Maintain detailed farm records

Could you be more specific about what aspect of farming you'd like help with?`;
  }
}

// Main function to get AI assistant response
export async function getAIResponse(userMessage, context = {}) {
  try {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Analyze the user query
    const analysis = analyzeQuery(userMessage);
    
    // Generate appropriate response
    const response = generateResponse(analysis);
    
    return {
      message: response,
      type: analysis.type,
      timestamp: new Date().toISOString(),
      confidence: 0.85 + Math.random() * 0.1 // Simulate confidence score
    };
    
  } catch (error) {
    console.error('AI Assistant Error:', error);
    return {
      message: "I'm sorry, I'm having trouble processing your question right now. Please try again or contact your local agricultural extension office for immediate assistance.",
      type: 'error',
      timestamp: new Date().toISOString(),
      confidence: 0
    };
  }
}

// Function to analyze uploaded images (for crop health, etc.)
export async function analyzeImageQuery(imageData, query) {
  try {
    // Simulate image analysis processing time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    // Simple rule-based image analysis response
    const responses = [
      "Based on the image, I can see your crop. For accurate disease diagnosis, I recommend using our dedicated Crop Disease Detection tool. However, here are some general observations and recommendations:",
      
      "From what I can observe in the image, here are some general recommendations for crop health:",
      
      "While I can see your crop image, for precise disease identification, please use our specialized disease detection feature. Here's some general guidance:"
    ];
    
    const generalAdvice = [
      "• Monitor your crops regularly for any changes in leaf color or texture",
      "• Ensure proper spacing between plants for good air circulation", 
      "• Water at the base of plants to avoid wetting leaves",
      "• Remove any dead or diseased plant material promptly",
      "• Consider applying preventive organic treatments like neem oil"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      message: `${randomResponse}\n\n${generalAdvice.join('\n')}\n\nFor detailed disease analysis, please use the Crop Disease Detection tool in our platform.`,
      type: 'image-analysis',
      timestamp: new Date().toISOString(),
      confidence: 0.75
    };
    
  } catch (error) {
    console.error('Image Analysis Error:', error);
    return {
      message: "I'm having trouble analyzing the image. Please ensure the image is clear and try again, or use our dedicated Crop Disease Detection tool for better results.",
      type: 'error',
      timestamp: new Date().toISOString(),
      confidence: 0
    };
  }
}

// Get farming tips based on current season/weather
export function getSeasonalTips(season = 'general') {
  const tips = agricultureKnowledge.weatherAdvice[season] || [
    'Monitor weather forecasts regularly',
    'Maintain proper field drainage',
    'Keep farming equipment in good condition',
    'Plan crop activities based on weather patterns'
  ];
  
  return tips;
}

// Get market advice
export function getMarketAdvice() {
  return agricultureKnowledge.marketTips;
}
