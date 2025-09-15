// Advisory Model for AI-Powered Recommendations
const { generateId } = require('../utils/helpers');

class Advisory {
  constructor(advisoryData) {
    this.id = advisoryData.id || generateId();
    this.userId = advisoryData.userId;
    this.type = advisoryData.type; // weather, pest, irrigation, fertilizer, harvest, market, scheme
    this.category = advisoryData.category || 'general';
    this.priority = advisoryData.priority || 'medium'; // low, medium, high, critical
    
    this.content = {
      title: advisoryData.content?.title || '',
      message: advisoryData.content?.message || '',
      summary: advisoryData.content?.summary || '',
      actionItems: advisoryData.content?.actionItems || [],
      recommendations: advisoryData.content?.recommendations || []
    };
    
    this.context = {
      crop: advisoryData.context?.crop || '',
      season: advisoryData.context?.season || '',
      location: advisoryData.context?.location || '',
      weatherConditions: advisoryData.context?.weatherConditions || {},
      farmingStage: advisoryData.context?.farmingStage || '',
      soilType: advisoryData.context?.soilType || ''
    };
    
    this.triggers = {
      source: advisoryData.triggers?.source || 'ai_analysis', // ai_analysis, weather_api, user_input, scheduled
      confidence: advisoryData.triggers?.confidence || 80,
      dataPoints: advisoryData.triggers?.dataPoints || [],
      thresholds: advisoryData.triggers?.thresholds || {}
    };
    
    this.timing = {
      createdAt: advisoryData.timing?.createdAt || new Date().toISOString(),
      validUntil: advisoryData.timing?.validUntil || this.calculateValidUntil(advisoryData.type),
      urgencyLevel: advisoryData.timing?.urgencyLevel || 'normal', // immediate, urgent, normal, scheduled
      bestActionTime: advisoryData.timing?.bestActionTime || null
    };
    
    this.engagement = {
      status: advisoryData.engagement?.status || 'active', // active, read, dismissed, acted_upon
      readAt: advisoryData.engagement?.readAt || null,
      dismissedAt: advisoryData.engagement?.dismissedAt || null,
      actedUponAt: advisoryData.engagement?.actedUponAt || null,
      feedback: advisoryData.engagement?.feedback || null, // helpful, not_helpful, irrelevant
      userNotes: advisoryData.engagement?.userNotes || ''
    };
    
    this.impact = {
      estimatedBenefit: advisoryData.impact?.estimatedBenefit || null,
      riskLevel: advisoryData.impact?.riskLevel || 'low',
      costImplication: advisoryData.impact?.costImplication || 0,
      timeRequired: advisoryData.impact?.timeRequired || null,
      difficultyLevel: advisoryData.impact?.difficultyLevel || 'easy'
    };
    
    this.metadata = {
      version: advisoryData.metadata?.version || '1.0',
      tags: advisoryData.metadata?.tags || [],
      relatedActivities: advisoryData.metadata?.relatedActivities || [],
      sources: advisoryData.metadata?.sources || [],
      updatedAt: new Date().toISOString()
    };
  }

  // Calculate validity period based on advisory type
  calculateValidUntil(type) {
    const now = new Date();
    const validityPeriods = {
      weather: 3, // 3 days
      pest: 7, // 1 week
      irrigation: 2, // 2 days
      fertilizer: 5, // 5 days
      harvest: 10, // 10 days
      market: 1, // 1 day
      scheme: 30, // 1 month
      general: 7 // 1 week
    };

    const days = validityPeriods[type] || 7;
    const validUntil = new Date(now);
    validUntil.setDate(validUntil.getDate() + days);
    return validUntil.toISOString();
  }

  // Update advisory status
  updateStatus(status, additionalData = {}) {
    this.engagement.status = status;
    this.metadata.updatedAt = new Date().toISOString();
    
    switch (status) {
      case 'read':
        this.engagement.readAt = new Date().toISOString();
        break;
      case 'dismissed':
        this.engagement.dismissedAt = new Date().toISOString();
        if (additionalData.reason) {
          this.engagement.dismissalReason = additionalData.reason;
        }
        break;
      case 'acted_upon':
        this.engagement.actedUponAt = new Date().toISOString();
        if (additionalData.activityId) {
          this.metadata.relatedActivities.push(additionalData.activityId);
        }
        break;
    }
    
    return this;
  }

  // Add user feedback
  addFeedback(feedback, notes = '') {
    this.engagement.feedback = feedback;
    this.engagement.userNotes = notes;
    this.metadata.updatedAt = new Date().toISOString();
    return this;
  }

  // Check if advisory is still valid
  isValid() {
    return new Date(this.timing.validUntil) > new Date();
  }

  // Check if advisory is urgent
  isUrgent() {
    return this.timing.urgencyLevel === 'urgent' || this.timing.urgencyLevel === 'immediate';
  }

  // Get priority score for sorting
  getPriorityScore() {
    const priorityScores = {
      critical: 4,
      high: 3,
      medium: 2,
      low: 1
    };
    
    const urgencyScores = {
      immediate: 4,
      urgent: 3,
      normal: 2,
      scheduled: 1
    };
    
    return (priorityScores[this.priority] || 2) + (urgencyScores[this.timing.urgencyLevel] || 2);
  }

  // Generate action plan from recommendations
  generateActionPlan() {
    return this.content.actionItems.map((item, index) => ({
      id: generateId(),
      step: index + 1,
      action: item,
      estimated_time: this.estimateActionTime(item),
      priority: this.priority,
      completed: false
    }));
  }

  // Estimate time required for an action
  estimateActionTime(action) {
    const timeEstimates = {
      'inspect': '30 minutes',
      'apply': '1-2 hours',
      'irrigate': '2-4 hours',
      'harvest': '4-8 hours',
      'sow': '2-6 hours',
      'spray': '1-3 hours',
      'check': '15-30 minutes'
    };

    for (const [keyword, time] of Object.entries(timeEstimates)) {
      if (action.toLowerCase().includes(keyword)) {
        return time;
      }
    }
    
    return '1 hour';
  }

  // Calculate relevance score based on user context
  calculateRelevance(userContext) {
    let score = 50; // Base score
    
    // Crop match
    if (userContext.crops && userContext.crops.includes(this.context.crop)) {
      score += 20;
    }
    
    // Location match
    if (userContext.location && this.context.location.includes(userContext.location)) {
      score += 15;
    }
    
    // Season match
    if (userContext.currentSeason === this.context.season) {
      score += 10;
    }
    
    // Soil type match
    if (userContext.soilType === this.context.soilType) {
      score += 10;
    }
    
    // Urgency boost
    if (this.isUrgent()) {
      score += 15;
    }
    
    // Confidence factor
    score = score * (this.triggers.confidence / 100);
    
    return Math.min(100, Math.max(0, score));
  }

  // Get advisory summary
  getSummary() {
    return {
      id: this.id,
      type: this.type,
      priority: this.priority,
      title: this.content.title,
      crop: this.context.crop,
      status: this.engagement.status,
      urgency: this.timing.urgencyLevel,
      validUntil: this.timing.validUntil,
      isValid: this.isValid(),
      relevanceScore: this.calculateRelevance({})
    };
  }

  // Export for mobile/offline use
  exportForOffline() {
    return {
      id: this.id,
      title: this.content.title,
      message: this.content.message,
      actionItems: this.content.actionItems,
      priority: this.priority,
      crop: this.context.crop,
      validUntil: this.timing.validUntil,
      type: this.type
    };
  }

  // Validate advisory data
  validate() {
    const errors = [];
    
    if (!this.userId) errors.push('User ID is required');
    if (!this.type) errors.push('Advisory type is required');
    if (!this.content.title) errors.push('Title is required');
    if (!this.content.message) errors.push('Message is required');
    if (this.triggers.confidence < 0 || this.triggers.confidence > 100) {
      errors.push('Confidence must be between 0 and 100');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      category: this.category,
      priority: this.priority,
      content: this.content,
      context: this.context,
      triggers: this.triggers,
      timing: this.timing,
      engagement: this.engagement,
      impact: this.impact,
      metadata: this.metadata
    };
  }

  // Create from JSON
  static fromJSON(data) {
    return new Advisory(data);
  }

  // Create advisory templates
  static createTemplate(type, context = {}) {
    const templates = {
      weather: {
        type: 'weather',
        category: 'weather_alert',
        content: {
          title: 'Weather Advisory',
          actionItems: [
            'Check weather forecast',
            'Adjust irrigation schedule',
            'Protect crops if needed'
          ]
        },
        timing: { urgencyLevel: 'urgent' }
      },
      pest: {
        type: 'pest',
        category: 'pest_management',
        content: {
          title: 'Pest Alert',
          actionItems: [
            'Inspect crops for pest symptoms',
            'Apply appropriate treatment',
            'Monitor neighboring fields'
          ]
        },
        timing: { urgencyLevel: 'urgent' }
      },
      irrigation: {
        type: 'irrigation',
        category: 'water_management',
        content: {
          title: 'Irrigation Reminder',
          actionItems: [
            'Check soil moisture',
            'Schedule irrigation',
            'Monitor plant stress'
          ]
        },
        timing: { urgencyLevel: 'normal' }
      },
      market: {
        type: 'market',
        category: 'market_intelligence',
        content: {
          title: 'Market Opportunity',
          actionItems: [
            'Check current market prices',
            'Plan harvest timing',
            'Arrange transportation'
          ]
        },
        timing: { urgencyLevel: 'normal' }
      }
    };

    const template = templates[type] || templates.weather;
    return new Advisory({ ...template, ...context });
  }
}

module.exports = Advisory;
