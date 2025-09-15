// Advisory Controller for AI-Powered Recommendations
const Advisory = require('../models/Advisory');
const { createLogger, paginate, createError, groupBy } = require('../utils/helpers');

const logger = createLogger('AdvisoryController');

class AdvisoryController {
  constructor() {
    this.advisories = new Map(); // In-memory storage for demo
    this.loadAdvisories();
  }

  // Load advisories from storage
  loadAdvisories() {
    try {
      const stored = JSON.parse(localStorage?.getItem('allAdvisories') || '[]');
      stored.forEach(advisoryData => {
        const advisory = Advisory.fromJSON(advisoryData);
        this.advisories.set(advisory.id, advisory);
      });
      logger.info(`Loaded ${this.advisories.size} advisories`);
    } catch (error) {
      logger.error('Error loading advisories:', error);
    }
  }

  // Save advisories to storage
  saveAdvisories() {
    try {
      const advisoriesArray = Array.from(this.advisories.values()).map(advisory => advisory.toJSON());
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('allAdvisories', JSON.stringify(advisoriesArray));
      }
      logger.info(`Saved ${this.advisories.size} advisories`);
    } catch (error) {
      logger.error('Error saving advisories:', error);
    }
  }

  // Create new advisory
  async createAdvisory(advisoryData) {
    try {
      const advisory = new Advisory(advisoryData);
      const validation = advisory.validate();
      
      if (!validation.isValid) {
        throw createError(`Validation failed: ${validation.errors.join(', ')}`, 400, 'VALIDATION_ERROR');
      }

      this.advisories.set(advisory.id, advisory);
      this.saveAdvisories();

      logger.info(`Created advisory: ${advisory.id} for user: ${advisory.userId}`);
      return { success: true, data: advisory.toJSON() };

    } catch (error) {
      logger.error('Error creating advisory:', error);
      throw error;
    }
  }

  // Get advisory by ID
  async getAdvisoryById(advisoryId) {
    try {
      const advisory = this.advisories.get(advisoryId);
      if (!advisory) {
        throw createError('Advisory not found', 404, 'ADVISORY_NOT_FOUND');
      }

      return { success: true, data: advisory.toJSON() };
    } catch (error) {
      logger.error('Error getting advisory:', error);
      throw error;
    }
  }

  // Update advisory status
  async updateAdvisoryStatus(advisoryId, status, additionalData = {}) {
    try {
      const advisory = this.advisories.get(advisoryId);
      if (!advisory) {
        throw createError('Advisory not found', 404, 'ADVISORY_NOT_FOUND');
      }

      advisory.updateStatus(status, additionalData);
      this.saveAdvisories();

      logger.info(`Updated advisory status: ${advisoryId} to ${status}`);
      return { success: true, data: advisory.toJSON() };
    } catch (error) {
      logger.error('Error updating advisory status:', error);
      throw error;
    }
  }

  // Add feedback to advisory
  async addAdvisoryFeedback(advisoryId, feedback, notes = '') {
    try {
      const advisory = this.advisories.get(advisoryId);
      if (!advisory) {
        throw createError('Advisory not found', 404, 'ADVISORY_NOT_FOUND');
      }

      advisory.addFeedback(feedback, notes);
      this.saveAdvisories();

      logger.info(`Added feedback to advisory: ${advisoryId}`);
      return { success: true, data: advisory.toJSON() };
    } catch (error) {
      logger.error('Error adding advisory feedback:', error);
      throw error;
    }
  }

  // Get advisories for a user
  async getUserAdvisories(userId, page = 1, limit = 10, filters = {}) {
    try {
      let advisories = Array.from(this.advisories.values())
        .filter(advisory => advisory.userId === userId);

      // Apply filters
      if (filters.type) {
        advisories = advisories.filter(advisory => advisory.type === filters.type);
      }
      if (filters.priority) {
        advisories = advisories.filter(advisory => advisory.priority === filters.priority);
      }
      if (filters.status) {
        advisories = advisories.filter(advisory => advisory.engagement.status === filters.status);
      }
      if (filters.crop) {
        advisories = advisories.filter(advisory => 
          advisory.context.crop.toLowerCase().includes(filters.crop.toLowerCase())
        );
      }
      if (filters.validOnly) {
        advisories = advisories.filter(advisory => advisory.isValid());
      }

      // Sort by priority score and creation date
      advisories.sort((a, b) => {
        const priorityDiff = b.getPriorityScore() - a.getPriorityScore();
        if (priorityDiff !== 0) return priorityDiff;
        return new Date(b.timing.createdAt) - new Date(a.timing.createdAt);
      });

      // Paginate
      const result = paginate(advisories.map(a => a.toJSON()), page, limit);

      return { success: true, ...result };
    } catch (error) {
      logger.error('Error getting user advisories:', error);
      throw error;
    }
  }

  // Get active advisories for a user
  async getActiveAdvisories(userId) {
    try {
      const advisories = Array.from(this.advisories.values())
        .filter(advisory => 
          advisory.userId === userId &&
          advisory.engagement.status === 'active' &&
          advisory.isValid()
        )
        .sort((a, b) => b.getPriorityScore() - a.getPriorityScore());

      return { success: true, data: advisories.map(a => a.toJSON()) };
    } catch (error) {
      logger.error('Error getting active advisories:', error);
      throw error;
    }
  }

  // Get urgent advisories for a user
  async getUrgentAdvisories(userId) {
    try {
      const advisories = Array.from(this.advisories.values())
        .filter(advisory => 
          advisory.userId === userId &&
          advisory.engagement.status === 'active' &&
          advisory.isUrgent() &&
          advisory.isValid()
        )
        .sort((a, b) => b.getPriorityScore() - a.getPriorityScore());

      return { success: true, data: advisories.map(a => a.toJSON()) };
    } catch (error) {
      logger.error('Error getting urgent advisories:', error);
      throw error;
    }
  }

  // Generate personalized advisories based on user context
  async generatePersonalizedAdvisories(userId, userContext) {
    try {
      const advisories = [];

      // Weather-based advisories
      if (userContext.weather) {
        if (userContext.weather.rainExpected && userContext.weather.rainProbability > 70) {
          const advisory = Advisory.createTemplate('weather', {
            userId,
            content: {
              title: 'Rain Alert - Adjust Farm Operations',
              message: `Heavy rain expected in ${userContext.location}. Avoid pesticide/fertilizer applications and ensure proper drainage.`,
              actionItems: [
                'Check drainage systems in all fields',
                'Postpone pesticide/fertilizer applications',
                'Cover harvested produce',
                'Ensure livestock shelter is ready'
              ]
            },
            context: {
              location: userContext.location,
              weatherConditions: userContext.weather
            },
            timing: {
              urgencyLevel: 'urgent'
            }
          });
          advisories.push(advisory);
        }
      }

      // Crop-specific advisories
      if (userContext.crops && userContext.crops.length > 0) {
        userContext.crops.forEach(crop => {
          // Pest advisories based on season
          if (userContext.currentSeason === 'kharif' && crop.name === 'rice') {
            const advisory = Advisory.createTemplate('pest', {
              userId,
              content: {
                title: `Brown Plant Hopper Alert - ${crop.name}`,
                message: `Monitor your ${crop.name} fields for Brown Plant Hopper. Early detection prevents major damage.`,
                actionItems: [
                  `Inspect ${crop.name} for hopper burn symptoms`,
                  'Apply neem oil or recommended insecticide',
                  'Check neighboring fields',
                  'Maintain field hygiene'
                ]
              },
              context: {
                crop: crop.name,
                season: userContext.currentSeason,
                location: userContext.location
              }
            });
            advisories.push(advisory);
          }

          // Irrigation advisories
          const advisory = Advisory.createTemplate('irrigation', {
            userId,
            content: {
              title: `Irrigation Schedule - ${crop.name}`,
              message: `Optimal irrigation time for ${crop.name}. Check soil moisture before watering.`,
              actionItems: [
                'Check soil moisture levels',
                'Schedule early morning irrigation (5-7 AM)',
                'Monitor plant stress indicators',
                'Ensure proper drainage'
              ]
            },
            context: {
              crop: crop.name,
              soilType: userContext.soilType
            }
          });
          advisories.push(advisory);
        });
      }

      // Market advisories
      if (userContext.marketData) {
        userContext.marketData.forEach(market => {
          if (market.priceIncrease > 10) {
            const advisory = Advisory.createTemplate('market', {
              userId,
              content: {
                title: `Price Surge - ${market.crop}`,
                message: `${market.crop} prices increased by ${market.priceIncrease}% in ${userContext.location}. Consider selling now.`,
                actionItems: [
                  'Check current market rates',
                  'Plan harvest timing',
                  'Arrange transportation',
                  'Contact buyers'
                ]
              },
              context: {
                crop: market.crop,
                location: userContext.location
              }
            });
            advisories.push(advisory);
          }
        });
      }

      // Save generated advisories
      for (const advisory of advisories) {
        this.advisories.set(advisory.id, advisory);
      }
      this.saveAdvisories();

      logger.info(`Generated ${advisories.length} advisories for user: ${userId}`);
      return { success: true, data: advisories.map(a => a.toJSON()) };

    } catch (error) {
      logger.error('Error generating personalized advisories:', error);
      throw error;
    }
  }

  // Get advisory statistics for a user
  async getUserAdvisoryStats(userId, days = 30) {
    try {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);

      const advisories = Array.from(this.advisories.values())
        .filter(advisory => 
          advisory.userId === userId && 
          new Date(advisory.timing.createdAt) >= cutoff
        );

      const stats = {
        total: advisories.length,
        active: advisories.filter(a => a.engagement.status === 'active').length,
        read: advisories.filter(a => a.engagement.status === 'read').length,
        actedUpon: advisories.filter(a => a.engagement.status === 'acted_upon').length,
        dismissed: advisories.filter(a => a.engagement.status === 'dismissed').length,
        byType: groupBy(advisories, 'type'),
        byPriority: groupBy(advisories, 'priority'),
        byUrgency: groupBy(advisories, 'timing.urgencyLevel'),
        feedbackStats: {
          helpful: advisories.filter(a => a.engagement.feedback === 'helpful').length,
          notHelpful: advisories.filter(a => a.engagement.feedback === 'not_helpful').length,
          irrelevant: advisories.filter(a => a.engagement.feedback === 'irrelevant').length
        }
      };

      // Calculate engagement rate
      stats.engagementRate = advisories.length > 0 ? 
        ((stats.read + stats.actedUpon) / advisories.length) * 100 : 0;

      return { success: true, data: stats };
    } catch (error) {
      logger.error('Error getting advisory stats:', error);
      throw error;
    }
  }

  // Get advisory recommendations based on user behavior
  async getAdvisoryRecommendations(userId) {
    try {
      const advisories = Array.from(this.advisories.values())
        .filter(advisory => advisory.userId === userId);

      const recommendations = [];

      // Analyze user engagement patterns
      const totalAdvisories = advisories.length;
      const actedUpon = advisories.filter(a => a.engagement.status === 'acted_upon').length;
      const dismissed = advisories.filter(a => a.engagement.status === 'dismissed').length;

      if (totalAdvisories > 0) {
        const actionRate = (actedUpon / totalAdvisories) * 100;
        const dismissalRate = (dismissed / totalAdvisories) * 100;

        if (actionRate < 30) {
          recommendations.push({
            type: 'engagement',
            message: 'Consider reviewing and acting on more advisories to improve farm productivity',
            priority: 'medium'
          });
        }

        if (dismissalRate > 50) {
          recommendations.push({
            type: 'relevance',
            message: 'Update your profile and preferences for more relevant advisories',
            priority: 'high'
          });
        }
      }

      // Analyze feedback patterns
      const helpfulFeedback = advisories.filter(a => a.engagement.feedback === 'helpful').length;
      const notHelpfulFeedback = advisories.filter(a => a.engagement.feedback === 'not_helpful').length;

      if (notHelpfulFeedback > helpfulFeedback && totalAdvisories > 10) {
        recommendations.push({
          type: 'feedback',
          message: 'Your feedback helps us improve. Consider providing more specific feedback on advisories',
          priority: 'low'
        });
      }

      return { success: true, data: recommendations };
    } catch (error) {
      logger.error('Error getting advisory recommendations:', error);
      throw error;
    }
  }

  // Create advisory from template
  async createAdvisoryFromTemplate(templateType, customData) {
    try {
      const advisory = Advisory.createTemplate(templateType, customData);
      const validation = advisory.validate();
      
      if (!validation.isValid) {
        throw createError(`Validation failed: ${validation.errors.join(', ')}`, 400, 'VALIDATION_ERROR');
      }

      this.advisories.set(advisory.id, advisory);
      this.saveAdvisories();

      logger.info(`Created advisory from template: ${templateType}`);
      return { success: true, data: advisory.toJSON() };
    } catch (error) {
      logger.error('Error creating advisory from template:', error);
      throw error;
    }
  }

  // Get advisory action plan
  async getAdvisoryActionPlan(advisoryId) {
    try {
      const advisory = this.advisories.get(advisoryId);
      if (!advisory) {
        throw createError('Advisory not found', 404, 'ADVISORY_NOT_FOUND');
      }

      const actionPlan = advisory.generateActionPlan();
      return { success: true, data: actionPlan };
    } catch (error) {
      logger.error('Error getting advisory action plan:', error);
      throw error;
    }
  }

  // Export advisories for offline use
  async exportAdvisoriesForOffline(userId) {
    try {
      const advisories = Array.from(this.advisories.values())
        .filter(advisory => 
          advisory.userId === userId &&
          advisory.engagement.status === 'active' &&
          advisory.isValid()
        )
        .map(advisory => advisory.exportForOffline());

      return { success: true, data: advisories };
    } catch (error) {
      logger.error('Error exporting advisories for offline:', error);
      throw error;
    }
  }

  // Bulk update advisory status
  async bulkUpdateAdvisoryStatus(advisoryIds, status, additionalData = {}) {
    try {
      const results = [];
      
      for (const advisoryId of advisoryIds) {
        try {
          const result = await this.updateAdvisoryStatus(advisoryId, status, additionalData);
          results.push({ advisoryId, success: true, data: result.data });
        } catch (error) {
          results.push({ advisoryId, success: false, error: error.message });
        }
      }

      return { success: true, data: results };
    } catch (error) {
      logger.error('Error in bulk status update:', error);
      throw error;
    }
  }

  // Clean up expired advisories
  async cleanupExpiredAdvisories() {
    try {
      const now = new Date();
      let cleanedCount = 0;

      for (const [id, advisory] of this.advisories.entries()) {
        if (!advisory.isValid() && advisory.engagement.status !== 'acted_upon') {
          this.advisories.delete(id);
          cleanedCount++;
        }
      }

      if (cleanedCount > 0) {
        this.saveAdvisories();
        logger.info(`Cleaned up ${cleanedCount} expired advisories`);
      }

      return { success: true, data: { cleanedCount } };
    } catch (error) {
      logger.error('Error cleaning up expired advisories:', error);
      throw error;
    }
  }

  // Get advisory effectiveness metrics
  async getAdvisoryEffectiveness(days = 90) {
    try {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);

      const advisories = Array.from(this.advisories.values())
        .filter(advisory => new Date(advisory.timing.createdAt) >= cutoff);

      const metrics = {
        totalGenerated: advisories.length,
        byType: groupBy(advisories, 'type'),
        engagement: {
          viewed: advisories.filter(a => a.engagement.readAt).length,
          actedUpon: advisories.filter(a => a.engagement.status === 'acted_upon').length,
          dismissed: advisories.filter(a => a.engagement.status === 'dismissed').length
        },
        feedback: {
          helpful: advisories.filter(a => a.engagement.feedback === 'helpful').length,
          notHelpful: advisories.filter(a => a.engagement.feedback === 'not_helpful').length,
          irrelevant: advisories.filter(a => a.engagement.feedback === 'irrelevant').length
        },
        averageConfidence: 0,
        topPerformingTypes: []
      };

      // Calculate average confidence
      if (advisories.length > 0) {
        metrics.averageConfidence = advisories.reduce((sum, a) => sum + a.triggers.confidence, 0) / advisories.length;
      }

      // Find top performing advisory types
      const typePerformance = {};
      Object.keys(metrics.byType).forEach(type => {
        const typeAdvisories = advisories.filter(a => a.type === type);
        const actedUpon = typeAdvisories.filter(a => a.engagement.status === 'acted_upon').length;
        const helpful = typeAdvisories.filter(a => a.engagement.feedback === 'helpful').length;
        
        typePerformance[type] = {
          total: typeAdvisories.length,
          actionRate: typeAdvisories.length > 0 ? (actedUpon / typeAdvisories.length) * 100 : 0,
          helpfulRate: typeAdvisories.length > 0 ? (helpful / typeAdvisories.length) * 100 : 0
        };
      });

      metrics.topPerformingTypes = Object.entries(typePerformance)
        .sort((a, b) => (b[1].actionRate + b[1].helpfulRate) - (a[1].actionRate + a[1].helpfulRate))
        .slice(0, 5);

      return { success: true, data: metrics };
    } catch (error) {
      logger.error('Error getting advisory effectiveness:', error);
      throw error;
    }
  }
}

module.exports = AdvisoryController;
