// Activity Controller for Farm Activity Management
const Activity = require('../models/Activity');
const { createLogger, paginate, createError, groupBy, calculateStats } = require('../utils/helpers');

const logger = createLogger('ActivityController');

class ActivityController {
  constructor() {
    this.activities = new Map(); // In-memory storage for demo
    this.loadActivities();
  }

  // Load activities from storage
  loadActivities() {
    try {
      const stored = JSON.parse(localStorage?.getItem('allActivities') || '[]');
      stored.forEach(activityData => {
        const activity = Activity.fromJSON(activityData);
        this.activities.set(activity.id, activity);
      });
      logger.info(`Loaded ${this.activities.size} activities`);
    } catch (error) {
      logger.error('Error loading activities:', error);
    }
  }

  // Save activities to storage
  saveActivities() {
    try {
      const activitiesArray = Array.from(this.activities.values()).map(activity => activity.toJSON());
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('allActivities', JSON.stringify(activitiesArray));
      }
      logger.info(`Saved ${this.activities.size} activities`);
    } catch (error) {
      logger.error('Error saving activities:', error);
    }
  }

  // Create new activity
  async createActivity(activityData) {
    try {
      const activity = new Activity(activityData);
      const validation = activity.validate();
      
      if (!validation.isValid) {
        throw createError(`Validation failed: ${validation.errors.join(', ')}`, 400, 'VALIDATION_ERROR');
      }

      this.activities.set(activity.id, activity);
      this.saveActivities();

      logger.info(`Created activity: ${activity.id} for user: ${activity.userId}`);
      return { success: true, data: activity.toJSON() };

    } catch (error) {
      logger.error('Error creating activity:', error);
      throw error;
    }
  }

  // Get activity by ID
  async getActivityById(activityId) {
    try {
      const activity = this.activities.get(activityId);
      if (!activity) {
        throw createError('Activity not found', 404, 'ACTIVITY_NOT_FOUND');
      }

      return { success: true, data: activity.toJSON() };
    } catch (error) {
      logger.error('Error getting activity:', error);
      throw error;
    }
  }

  // Update activity
  async updateActivity(activityId, updates) {
    try {
      const activity = this.activities.get(activityId);
      if (!activity) {
        throw createError('Activity not found', 404, 'ACTIVITY_NOT_FOUND');
      }

      activity.update(updates);
      const validation = activity.validate();
      
      if (!validation.isValid) {
        throw createError(`Validation failed: ${validation.errors.join(', ')}`, 400, 'VALIDATION_ERROR');
      }

      this.saveActivities();
      logger.info(`Updated activity: ${activityId}`);

      return { success: true, data: activity.toJSON() };
    } catch (error) {
      logger.error('Error updating activity:', error);
      throw error;
    }
  }

  // Delete activity
  async deleteActivity(activityId) {
    try {
      const activity = this.activities.get(activityId);
      if (!activity) {
        throw createError('Activity not found', 404, 'ACTIVITY_NOT_FOUND');
      }

      this.activities.delete(activityId);
      this.saveActivities();

      logger.info(`Deleted activity: ${activityId}`);
      return { success: true, message: 'Activity deleted successfully' };
    } catch (error) {
      logger.error('Error deleting activity:', error);
      throw error;
    }
  }

  // Get activities for a user
  async getUserActivities(userId, page = 1, limit = 10, filters = {}) {
    try {
      let activities = Array.from(this.activities.values())
        .filter(activity => activity.userId === userId);

      // Apply filters
      if (filters.type) {
        activities = activities.filter(activity => activity.type === filters.type);
      }
      if (filters.crop) {
        activities = activities.filter(activity => 
          activity.cropDetails.name.toLowerCase().includes(filters.crop.toLowerCase())
        );
      }
      if (filters.status) {
        activities = activities.filter(activity => activity.status === filters.status);
      }
      if (filters.dateFrom) {
        activities = activities.filter(activity => 
          new Date(activity.timing.actualDate) >= new Date(filters.dateFrom)
        );
      }
      if (filters.dateTo) {
        activities = activities.filter(activity => 
          new Date(activity.timing.actualDate) <= new Date(filters.dateTo)
        );
      }

      // Sort by date (newest first)
      activities.sort((a, b) => 
        new Date(b.timing.actualDate) - new Date(a.timing.actualDate)
      );

      // Paginate
      const result = paginate(activities.map(a => a.toJSON()), page, limit);

      return { success: true, ...result };
    } catch (error) {
      logger.error('Error getting user activities:', error);
      throw error;
    }
  }

  // Get activity statistics for a user
  async getUserActivityStats(userId, days = 30) {
    try {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);

      const activities = Array.from(this.activities.values())
        .filter(activity => 
          activity.userId === userId && 
          new Date(activity.timing.actualDate) >= cutoff
        );

      const stats = {
        total: activities.length,
        byType: groupBy(activities, 'type'),
        byStatus: groupBy(activities, 'status'),
        byCrop: groupBy(activities, 'cropDetails.name'),
        totalCost: activities.reduce((sum, activity) => sum + activity.calculateCost(), 0),
        totalArea: activities.reduce((sum, activity) => sum + (activity.location.area || 0), 0),
        averageDuration: 0,
        successRate: 0
      };

      // Calculate average duration
      const durationsInHours = activities
        .map(activity => activity.getDurationHours())
        .filter(duration => duration > 0);
      
      if (durationsInHours.length > 0) {
        stats.averageDuration = durationsInHours.reduce((sum, duration) => sum + duration, 0) / durationsInHours.length;
      }

      // Calculate success rate
      const completedActivities = activities.filter(activity => activity.status === 'completed');
      const successfulActivities = completedActivities.filter(activity => activity.results.success);
      
      if (completedActivities.length > 0) {
        stats.successRate = (successfulActivities.length / completedActivities.length) * 100;
      }

      return { success: true, data: stats };
    } catch (error) {
      logger.error('Error getting activity stats:', error);
      throw error;
    }
  }

  // Get upcoming activities (planned or scheduled)
  async getUpcomingActivities(userId, days = 7) {
    try {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() + days);

      const activities = Array.from(this.activities.values())
        .filter(activity => 
          activity.userId === userId &&
          (activity.status === 'planned' || activity.status === 'in_progress') &&
          activity.timing.scheduledDate &&
          new Date(activity.timing.scheduledDate) >= now &&
          new Date(activity.timing.scheduledDate) <= cutoff
        )
        .sort((a, b) => 
          new Date(a.timing.scheduledDate) - new Date(b.timing.scheduledDate)
        );

      return { success: true, data: activities.map(a => a.toJSON()) };
    } catch (error) {
      logger.error('Error getting upcoming activities:', error);
      throw error;
    }
  }

  // Get overdue activities
  async getOverdueActivities(userId) {
    try {
      const activities = Array.from(this.activities.values())
        .filter(activity => 
          activity.userId === userId && activity.isOverdue()
        )
        .sort((a, b) => 
          new Date(a.timing.scheduledDate) - new Date(b.timing.scheduledDate)
        );

      return { success: true, data: activities.map(a => a.toJSON()) };
    } catch (error) {
      logger.error('Error getting overdue activities:', error);
      throw error;
    }
  }

  // Add issue to activity
  async addActivityIssue(activityId, issueData) {
    try {
      const activity = this.activities.get(activityId);
      if (!activity) {
        throw createError('Activity not found', 404, 'ACTIVITY_NOT_FOUND');
      }

      activity.addIssue(issueData);
      this.saveActivities();

      logger.info(`Added issue to activity: ${activityId}`);
      return { success: true, data: activity.toJSON() };
    } catch (error) {
      logger.error('Error adding activity issue:', error);
      throw error;
    }
  }

  // Resolve activity issue
  async resolveActivityIssue(activityId, issueId, resolution) {
    try {
      const activity = this.activities.get(activityId);
      if (!activity) {
        throw createError('Activity not found', 404, 'ACTIVITY_NOT_FOUND');
      }

      activity.resolveIssue(issueId, resolution);
      this.saveActivities();

      logger.info(`Resolved issue ${issueId} for activity: ${activityId}`);
      return { success: true, data: activity.toJSON() };
    } catch (error) {
      logger.error('Error resolving activity issue:', error);
      throw error;
    }
  }

  // Add attachment to activity
  async addActivityAttachment(activityId, attachmentData) {
    try {
      const activity = this.activities.get(activityId);
      if (!activity) {
        throw createError('Activity not found', 404, 'ACTIVITY_NOT_FOUND');
      }

      activity.addAttachment(attachmentData);
      this.saveActivities();

      logger.info(`Added attachment to activity: ${activityId}`);
      return { success: true, data: activity.toJSON() };
    } catch (error) {
      logger.error('Error adding activity attachment:', error);
      throw error;
    }
  }

  // Get activity templates
  async getActivityTemplates() {
    try {
      const templates = [
        Activity.createTemplate('sowing').toJSON(),
        Activity.createTemplate('irrigation').toJSON(),
        Activity.createTemplate('fertilizer').toJSON(),
        Activity.createTemplate('harvest').toJSON()
      ];

      return { success: true, data: templates };
    } catch (error) {
      logger.error('Error getting activity templates:', error);
      throw error;
    }
  }

  // Create activity from template
  async createActivityFromTemplate(templateType, customData) {
    try {
      const activity = Activity.createTemplate(templateType, customData);
      const validation = activity.validate();
      
      if (!validation.isValid) {
        throw createError(`Validation failed: ${validation.errors.join(', ')}`, 400, 'VALIDATION_ERROR');
      }

      this.activities.set(activity.id, activity);
      this.saveActivities();

      logger.info(`Created activity from template: ${templateType}`);
      return { success: true, data: activity.toJSON() };
    } catch (error) {
      logger.error('Error creating activity from template:', error);
      throw error;
    }
  }

  // Get crop-wise activity summary
  async getCropActivitySummary(userId, crop) {
    try {
      const activities = Array.from(this.activities.values())
        .filter(activity => 
          activity.userId === userId &&
          activity.cropDetails.name.toLowerCase() === crop.toLowerCase()
        );

      const summary = {
        crop,
        totalActivities: activities.length,
        byType: groupBy(activities, 'type'),
        totalCost: activities.reduce((sum, activity) => sum + activity.calculateCost(), 0),
        totalArea: activities.reduce((sum, activity) => sum + (activity.location.area || 0), 0),
        timeline: activities
          .sort((a, b) => new Date(a.timing.actualDate) - new Date(b.timing.actualDate))
          .map(activity => ({
            date: activity.timing.actualDate,
            type: activity.type,
            title: activity.title,
            status: activity.status
          }))
      };

      return { success: true, data: summary };
    } catch (error) {
      logger.error('Error getting crop activity summary:', error);
      throw error;
    }
  }

  // Export activities
  async exportActivities(userId, format = 'json', filters = {}) {
    try {
      let activities = Array.from(this.activities.values())
        .filter(activity => activity.userId === userId);

      // Apply filters
      if (filters.dateFrom) {
        activities = activities.filter(activity => 
          new Date(activity.timing.actualDate) >= new Date(filters.dateFrom)
        );
      }
      if (filters.dateTo) {
        activities = activities.filter(activity => 
          new Date(activity.timing.actualDate) <= new Date(filters.dateTo)
        );
      }
      if (filters.type) {
        activities = activities.filter(activity => activity.type === filters.type);
      }

      if (format === 'csv') {
        const headers = ['Date', 'Type', 'Title', 'Crop', 'Area', 'Status', 'Cost', 'Duration'];
        const rows = activities.map(activity => [
          activity.timing.actualDate,
          activity.type,
          activity.title,
          activity.cropDetails.name,
          activity.location.area,
          activity.status,
          activity.calculateCost(),
          activity.getDurationHours()
        ]);
        
        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        return { success: true, data: csv, format: 'csv' };
      }

      return { success: true, data: activities.map(a => a.toJSON()), format: 'json' };
    } catch (error) {
      logger.error('Error exporting activities:', error);
      throw error;
    }
  }

  // Bulk update activities
  async bulkUpdateActivities(activityIds, updates) {
    try {
      const results = [];
      
      for (const activityId of activityIds) {
        try {
          const result = await this.updateActivity(activityId, updates);
          results.push({ activityId, success: true, data: result.data });
        } catch (error) {
          results.push({ activityId, success: false, error: error.message });
        }
      }

      return { success: true, data: results };
    } catch (error) {
      logger.error('Error in bulk update:', error);
      throw error;
    }
  }

  // Get activity insights and recommendations
  async getActivityInsights(userId, days = 90) {
    try {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);

      const activities = Array.from(this.activities.values())
        .filter(activity => 
          activity.userId === userId && 
          new Date(activity.timing.actualDate) >= cutoff
        );

      const insights = {
        productivity: {
          activitiesPerWeek: activities.length / (days / 7),
          mostActiveDay: this.getMostActiveDay(activities),
          peakHours: this.getPeakHours(activities)
        },
        costs: {
          totalSpent: activities.reduce((sum, activity) => sum + activity.calculateCost(), 0),
          averagePerActivity: 0,
          costByCrop: {},
          costByType: {}
        },
        efficiency: {
          successRate: 0,
          averageDuration: 0,
          onTimeCompletion: 0
        },
        recommendations: []
      };

      // Calculate averages
      if (activities.length > 0) {
        insights.costs.averagePerActivity = insights.costs.totalSpent / activities.length;
        
        const completedActivities = activities.filter(a => a.status === 'completed');
        if (completedActivities.length > 0) {
          insights.efficiency.successRate = 
            (completedActivities.filter(a => a.results.success).length / completedActivities.length) * 100;
        }
      }

      // Generate recommendations
      if (insights.efficiency.successRate < 80) {
        insights.recommendations.push({
          type: 'efficiency',
          message: 'Consider reviewing failed activities to identify improvement areas'
        });
      }

      if (insights.costs.averagePerActivity > 1000) {
        insights.recommendations.push({
          type: 'cost',
          message: 'Look for opportunities to reduce activity costs through better planning'
        });
      }

      return { success: true, data: insights };
    } catch (error) {
      logger.error('Error getting activity insights:', error);
      throw error;
    }
  }

  // Helper methods
  getMostActiveDay(activities) {
    const dayCount = {};
    activities.forEach(activity => {
      const day = new Date(activity.timing.actualDate).getDay();
      const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];
      dayCount[dayName] = (dayCount[dayName] || 0) + 1;
    });

    return Object.keys(dayCount).reduce((a, b) => dayCount[a] > dayCount[b] ? a : b, 'Monday');
  }

  getPeakHours(activities) {
    const hourCount = {};
    activities.forEach(activity => {
      if (activity.timing.timeOfDay) {
        hourCount[activity.timing.timeOfDay] = (hourCount[activity.timing.timeOfDay] || 0) + 1;
      }
    });

    return Object.keys(hourCount).reduce((a, b) => hourCount[a] > hourCount[b] ? a : b, 'morning');
  }
}

module.exports = ActivityController;
