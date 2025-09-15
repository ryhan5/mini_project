// Activity Model for Farm Activity Tracking
const { generateId } = require('../utils/helpers');

class Activity {
  constructor(activityData) {
    this.id = activityData.id || generateId();
    this.userId = activityData.userId;
    this.type = activityData.type; // sowing, irrigation, fertilizer, etc.
    this.category = activityData.category || 'general';
    this.title = activityData.title;
    this.description = activityData.description || '';
    
    this.cropDetails = {
      name: activityData.cropDetails?.name || '',
      variety: activityData.cropDetails?.variety || '',
      area: activityData.cropDetails?.area || 0,
      field: activityData.cropDetails?.field || ''
    };
    
    this.location = {
      field: activityData.location?.field || '',
      coordinates: activityData.location?.coordinates || null,
      area: activityData.location?.area || 0
    };
    
    this.timing = {
      scheduledDate: activityData.timing?.scheduledDate || null,
      actualDate: activityData.timing?.actualDate || new Date().toISOString(),
      duration: activityData.timing?.duration || null,
      timeOfDay: activityData.timing?.timeOfDay || 'morning'
    };
    
    this.resources = {
      materials: activityData.resources?.materials || [],
      equipment: activityData.resources?.equipment || [],
      labor: activityData.resources?.labor || 0,
      cost: activityData.resources?.cost || 0
    };
    
    this.weather = {
      temperature: activityData.weather?.temperature || null,
      humidity: activityData.weather?.humidity || null,
      rainfall: activityData.weather?.rainfall || null,
      windSpeed: activityData.weather?.windSpeed || null,
      conditions: activityData.weather?.conditions || ''
    };
    
    this.results = {
      success: activityData.results?.success || true,
      yield: activityData.results?.yield || null,
      quality: activityData.results?.quality || null,
      issues: activityData.results?.issues || [],
      notes: activityData.results?.notes || ''
    };
    
    this.metadata = {
      source: activityData.metadata?.source || 'manual', // manual, auto, imported
      confidence: activityData.metadata?.confidence || 100,
      tags: activityData.metadata?.tags || [],
      attachments: activityData.metadata?.attachments || [],
      createdAt: activityData.metadata?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.status = activityData.status || 'completed'; // planned, in_progress, completed, cancelled
    this.priority = activityData.priority || 'medium'; // low, medium, high, urgent
  }

  // Update activity details
  update(updates) {
    Object.keys(updates).forEach(key => {
      if (typeof updates[key] === 'object' && !Array.isArray(updates[key])) {
        this[key] = { ...this[key], ...updates[key] };
      } else {
        this[key] = updates[key];
      }
    });
    this.metadata.updatedAt = new Date().toISOString();
    return this;
  }

  // Add resource used
  addResource(type, item) {
    if (!this.resources[type]) {
      this.resources[type] = [];
    }
    this.resources[type].push(item);
    this.metadata.updatedAt = new Date().toISOString();
    return this;
  }

  // Add issue or problem encountered
  addIssue(issue) {
    this.results.issues.push({
      id: generateId(),
      description: issue.description,
      severity: issue.severity || 'medium',
      reportedAt: new Date().toISOString(),
      resolved: false
    });
    this.metadata.updatedAt = new Date().toISOString();
    return this;
  }

  // Mark issue as resolved
  resolveIssue(issueId, resolution) {
    const issue = this.results.issues.find(i => i.id === issueId);
    if (issue) {
      issue.resolved = true;
      issue.resolution = resolution;
      issue.resolvedAt = new Date().toISOString();
      this.metadata.updatedAt = new Date().toISOString();
    }
    return this;
  }

  // Add attachment
  addAttachment(attachment) {
    this.metadata.attachments.push({
      id: generateId(),
      type: attachment.type, // image, document, video
      url: attachment.url,
      name: attachment.name,
      size: attachment.size,
      uploadedAt: new Date().toISOString()
    });
    this.metadata.updatedAt = new Date().toISOString();
    return this;
  }

  // Calculate activity cost
  calculateCost() {
    let totalCost = this.resources.cost || 0;
    
    // Add material costs
    if (this.resources.materials) {
      totalCost += this.resources.materials.reduce((sum, material) => {
        return sum + (material.quantity * material.unitPrice || 0);
      }, 0);
    }
    
    // Add labor costs
    if (this.resources.labor && this.timing.duration) {
      totalCost += this.resources.labor * this.timing.duration;
    }
    
    return totalCost;
  }

  // Get activity summary
  getSummary() {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      crop: this.cropDetails.name,
      area: this.location.area,
      date: this.timing.actualDate,
      status: this.status,
      cost: this.calculateCost(),
      success: this.results.success
    };
  }

  // Check if activity is overdue
  isOverdue() {
    if (this.status === 'completed' || !this.timing.scheduledDate) {
      return false;
    }
    return new Date(this.timing.scheduledDate) < new Date();
  }

  // Get activity duration in hours
  getDurationHours() {
    if (!this.timing.duration) return 0;
    
    if (typeof this.timing.duration === 'number') {
      return this.timing.duration;
    }
    
    // Parse duration string like "2h 30m"
    const matches = this.timing.duration.match(/(\d+)h|(\d+)m/g);
    if (!matches) return 0;
    
    let hours = 0;
    matches.forEach(match => {
      if (match.includes('h')) {
        hours += parseInt(match.replace('h', ''));
      } else if (match.includes('m')) {
        hours += parseInt(match.replace('m', '')) / 60;
      }
    });
    
    return hours;
  }

  // Validate activity data
  validate() {
    const errors = [];
    
    if (!this.userId) errors.push('User ID is required');
    if (!this.type) errors.push('Activity type is required');
    if (!this.title) errors.push('Title is required');
    if (this.location.area < 0) errors.push('Area cannot be negative');
    if (this.resources.cost < 0) errors.push('Cost cannot be negative');
    
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
      title: this.title,
      description: this.description,
      cropDetails: this.cropDetails,
      location: this.location,
      timing: this.timing,
      resources: this.resources,
      weather: this.weather,
      results: this.results,
      metadata: this.metadata,
      status: this.status,
      priority: this.priority
    };
  }

  // Create from JSON
  static fromJSON(data) {
    return new Activity(data);
  }

  // Create activity templates
  static createTemplate(type, baseData = {}) {
    const templates = {
      sowing: {
        type: 'sowing',
        category: 'planting',
        title: 'Sowing Seeds',
        resources: {
          materials: [
            { name: 'Seeds', quantity: 0, unit: 'kg', unitPrice: 0 },
            { name: 'Fertilizer', quantity: 0, unit: 'kg', unitPrice: 0 }
          ],
          equipment: ['Seed drill', 'Tractor']
        }
      },
      irrigation: {
        type: 'irrigation',
        category: 'water_management',
        title: 'Field Irrigation',
        resources: {
          equipment: ['Irrigation pump', 'Pipes'],
          materials: []
        }
      },
      fertilizer: {
        type: 'fertilizer',
        category: 'nutrition',
        title: 'Fertilizer Application',
        resources: {
          materials: [
            { name: 'NPK Fertilizer', quantity: 0, unit: 'kg', unitPrice: 0 }
          ],
          equipment: ['Spreader']
        }
      },
      harvest: {
        type: 'harvest',
        category: 'harvesting',
        title: 'Crop Harvesting',
        resources: {
          equipment: ['Harvester', 'Storage bags'],
          labor: 0
        }
      }
    };

    const template = templates[type] || templates.sowing;
    return new Activity({ ...template, ...baseData });
  }
}

module.exports = Activity;
