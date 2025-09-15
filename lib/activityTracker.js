// Activity Tracking System for Farming Events
import { generateId } from './utils';

// Activity types and their configurations
export const ACTIVITY_TYPES = {
  SOWING: {
    id: 'sowing',
    name: 'Sowing/Planting',
    icon: '🌱',
    color: 'green',
    fields: ['crop', 'variety', 'area', 'seedRate', 'method']
  },
  IRRIGATION: {
    id: 'irrigation',
    name: 'Irrigation',
    icon: '💧',
    color: 'blue',
    fields: ['area', 'duration', 'method', 'waterSource']
  },
  FERTILIZER: {
    id: 'fertilizer',
    name: 'Fertilizer Application',
    icon: '🧪',
    color: 'yellow',
    fields: ['fertilizer', 'quantity', 'area', 'method']
  },
  PESTICIDE: {
    id: 'pesticide',
    name: 'Pesticide/Herbicide',
    icon: '🚿',
    color: 'red',
    fields: ['product', 'quantity', 'area', 'targetPest', 'method']
  },
  PEST_ISSUE: {
    id: 'pest_issue',
    name: 'Pest/Disease Issue',
    icon: '🐛',
    color: 'orange',
    fields: ['pest', 'severity', 'area', 'symptoms', 'action']
  },
  HARVEST: {
    id: 'harvest',
    name: 'Harvesting',
    icon: '🌾',
    color: 'amber',
    fields: ['crop', 'area', 'yield', 'quality', 'method']
  },
  WEATHER_EVENT: {
    id: 'weather_event',
    name: 'Weather Event',
    icon: '🌦️',
    color: 'gray',
    fields: ['event', 'severity', 'damage', 'area']
  },
  SOIL_TEST: {
    id: 'soil_test',
    name: 'Soil Testing',
    icon: '🔬',
    color: 'purple',
    fields: ['ph', 'nitrogen', 'phosphorus', 'potassium', 'organicMatter']
  }
};

// Activity severity levels
export const SEVERITY_LEVELS = {
  LOW: { id: 'low', name: 'Low', color: 'green' },
  MEDIUM: { id: 'medium', name: 'Medium', color: 'yellow' },
  HIGH: { id: 'high', name: 'High', color: 'orange' },
  CRITICAL: { id: 'critical', name: 'Critical', color: 'red' }
};

class ActivityTracker {
  constructor() {
    this.activities = this.loadActivities();
    this.listeners = [];
  }

  // Load activities from localStorage
  loadActivities() {
    try {
      const stored = localStorage.getItem('farmActivities');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading activities:', error);
      return [];
    }
  }

  // Save activities to localStorage
  saveActivities() {
    try {
      localStorage.setItem('farmActivities', JSON.stringify(this.activities));
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving activities:', error);
    }
  }

  // Add event listener for activity changes
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove event listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  // Notify all listeners of changes
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.activities));
  }

  // Log a new activity
  logActivity(activityData) {
    const activity = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      userId: this.getCurrentUserId(),
      ...activityData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.activities.unshift(activity); // Add to beginning
    this.saveActivities();
    
    // Trigger AI analysis for recommendations
    this.analyzeActivity(activity);
    
    return activity;
  }

  // Update an existing activity
  updateActivity(activityId, updates) {
    const index = this.activities.findIndex(a => a.id === activityId);
    if (index !== -1) {
      this.activities[index] = {
        ...this.activities[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.saveActivities();
      return this.activities[index];
    }
    return null;
  }

  // Delete an activity
  deleteActivity(activityId) {
    this.activities = this.activities.filter(a => a.id !== activityId);
    this.saveActivities();
  }

  // Get activities by filters
  getActivities(filters = {}) {
    let filtered = [...this.activities];

    if (filters.type) {
      filtered = filtered.filter(a => a.type === filters.type);
    }

    if (filters.crop) {
      filtered = filtered.filter(a => a.crop === filters.crop);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(a => new Date(a.timestamp) >= new Date(filters.dateFrom));
    }

    if (filters.dateTo) {
      filtered = filtered.filter(a => new Date(a.timestamp) <= new Date(filters.dateTo));
    }

    if (filters.severity) {
      filtered = filtered.filter(a => a.severity === filters.severity);
    }

    return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  // Get recent activities (last 7 days)
  getRecentActivities(days = 7) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    
    return this.activities.filter(a => 
      new Date(a.timestamp) >= cutoff
    ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  // Get activities by crop
  getActivitiesByCrop(cropName) {
    return this.activities.filter(a => 
      a.crop && a.crop.toLowerCase() === cropName.toLowerCase()
    );
  }

  // Get activity statistics
  getActivityStats(days = 30) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    
    const recentActivities = this.activities.filter(a => 
      new Date(a.timestamp) >= cutoff
    );

    const stats = {
      total: recentActivities.length,
      byType: {},
      bySeverity: {},
      byCrop: {}
    };

    recentActivities.forEach(activity => {
      // Count by type
      stats.byType[activity.type] = (stats.byType[activity.type] || 0) + 1;
      
      // Count by severity
      if (activity.severity) {
        stats.bySeverity[activity.severity] = (stats.bySeverity[activity.severity] || 0) + 1;
      }
      
      // Count by crop
      if (activity.crop) {
        stats.byCrop[activity.crop] = (stats.byCrop[activity.crop] || 0) + 1;
      }
    });

    return stats;
  }

  // Analyze activity for AI recommendations
  analyzeActivity(activity) {
    // This would integrate with the AI advisory system
    // For now, we'll trigger local analysis
    setTimeout(() => {
      this.generateRecommendations(activity);
    }, 1000);
  }

  // Generate recommendations based on activity
  generateRecommendations(activity) {
    const recommendations = [];

    switch (activity.type) {
      case 'sowing':
        recommendations.push({
          type: 'irrigation',
          message: `Consider setting up irrigation schedule for ${activity.crop}`,
          priority: 'medium',
          dueDate: this.addDays(new Date(), 3)
        });
        break;
        
      case 'pest_issue':
        if (activity.severity === 'high' || activity.severity === 'critical') {
          recommendations.push({
            type: 'pesticide',
            message: `Urgent: Apply treatment for ${activity.pest} in ${activity.crop}`,
            priority: 'high',
            dueDate: this.addDays(new Date(), 1)
          });
        }
        break;
        
      case 'irrigation':
        recommendations.push({
          type: 'monitoring',
          message: 'Monitor soil moisture levels in irrigated areas',
          priority: 'low',
          dueDate: this.addDays(new Date(), 2)
        });
        break;
    }

    // Store recommendations (would be sent to recommendation system)
    if (recommendations.length > 0) {
      this.storeRecommendations(recommendations);
    }
  }

  // Store recommendations
  storeRecommendations(recommendations) {
    const existing = JSON.parse(localStorage.getItem('farmRecommendations') || '[]');
    const newRecommendations = recommendations.map(rec => ({
      id: generateId(),
      ...rec,
      createdAt: new Date().toISOString(),
      status: 'pending'
    }));
    
    existing.push(...newRecommendations);
    localStorage.setItem('farmRecommendations', JSON.stringify(existing));
  }

  // Helper methods
  getCurrentUserId() {
    // Get current user ID from auth system or localStorage
    return localStorage.getItem('currentUserId') || 'default-user';
  }

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString();
  }

  // Export activities to CSV
  exportActivities(activities = null) {
    const data = activities || this.activities;
    const headers = ['Date', 'Type', 'Crop', 'Description', 'Area', 'Severity'];
    
    const csvContent = [
      headers.join(','),
      ...data.map(activity => [
        new Date(activity.timestamp).toLocaleDateString(),
        ACTIVITY_TYPES[activity.type]?.name || activity.type,
        activity.crop || '',
        activity.description || '',
        activity.area || '',
        activity.severity || ''
      ].join(','))
    ].join('\n');

    return csvContent;
  }

  // Import activities from CSV
  importActivities(csvContent) {
    try {
      const lines = csvContent.split('\n');
      const headers = lines[0].split(',');
      
      const imported = lines.slice(1).map(line => {
        const values = line.split(',');
        return {
          id: generateId(),
          timestamp: new Date(values[0]).toISOString(),
          type: this.findActivityTypeByName(values[1]),
          crop: values[2],
          description: values[3],
          area: values[4],
          severity: values[5],
          userId: this.getCurrentUserId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      }).filter(activity => activity.type); // Filter out invalid entries

      this.activities.push(...imported);
      this.saveActivities();
      
      return imported.length;
    } catch (error) {
      console.error('Error importing activities:', error);
      return 0;
    }
  }

  findActivityTypeByName(name) {
    return Object.keys(ACTIVITY_TYPES).find(key => 
      ACTIVITY_TYPES[key].name === name
    );
  }
}

// Create singleton instance
export const activityTracker = new ActivityTracker();

// Utility functions
export const formatActivityDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString();
};

export const getActivityIcon = (type) => {
  return ACTIVITY_TYPES[type]?.icon || '📝';
};

export const getActivityColor = (type) => {
  return ACTIVITY_TYPES[type]?.color || 'gray';
};

export const getSeverityColor = (severity) => {
  return SEVERITY_LEVELS[severity]?.color || 'gray';
};
