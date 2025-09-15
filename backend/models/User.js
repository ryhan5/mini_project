// User Model for Multi-User Backend Architecture
const { generateId } = require('../utils/helpers');

class User {
  constructor(userData) {
    this.id = userData.id || generateId();
    this.profile = {
      name: userData.name || '',
      phone: userData.phone || '',
      email: userData.email || '',
      experience: userData.experience || 0,
      farmingType: userData.farmingType || 'traditional',
      language: userData.language || 'en',
      avatar: userData.avatar || null,
      createdAt: userData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.farm = {
      location: userData.farm?.location || '',
      state: userData.farm?.state || '',
      district: userData.farm?.district || '',
      pinCode: userData.farm?.pinCode || '',
      totalLand: userData.farm?.totalLand || 0,
      cultivableLand: userData.farm?.cultivableLand || 0,
      soilType: userData.farm?.soilType || '',
      irrigationType: userData.farm?.irrigationType || '',
      waterSource: userData.farm?.waterSource || '',
      coordinates: userData.farm?.coordinates || null
    };
    
    this.preferences = {
      notifications: userData.preferences?.notifications || true,
      advisoryFrequency: userData.preferences?.advisoryFrequency || 'daily',
      reminderTime: userData.preferences?.reminderTime || '08:00',
      weatherAlerts: userData.preferences?.weatherAlerts || true,
      marketAlerts: userData.preferences?.marketAlerts || true,
      pestAlerts: userData.preferences?.pestAlerts || true
    };
    
    this.subscription = {
      plan: userData.subscription?.plan || 'free',
      features: userData.subscription?.features || ['basic_advisory', 'weather_alerts'],
      expiresAt: userData.subscription?.expiresAt || null,
      isActive: userData.subscription?.isActive || true
    };
    
    this.stats = {
      totalActivities: 0,
      totalAdvisories: 0,
      totalReminders: 0,
      lastLoginAt: null,
      loginCount: 0
    };
  }

  // Update user profile
  updateProfile(updates) {
    this.profile = {
      ...this.profile,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return this;
  }

  // Update farm details
  updateFarm(updates) {
    this.farm = {
      ...this.farm,
      ...updates
    };
    this.profile.updatedAt = new Date().toISOString();
    return this;
  }

  // Update preferences
  updatePreferences(updates) {
    this.preferences = {
      ...this.preferences,
      ...updates
    };
    this.profile.updatedAt = new Date().toISOString();
    return this;
  }

  // Update subscription
  updateSubscription(updates) {
    this.subscription = {
      ...this.subscription,
      ...updates
    };
    return this;
  }

  // Record login
  recordLogin() {
    this.stats.lastLoginAt = new Date().toISOString();
    this.stats.loginCount += 1;
    return this;
  }

  // Check if user has feature access
  hasFeature(feature) {
    return this.subscription.features.includes(feature);
  }

  // Get user summary
  getSummary() {
    return {
      id: this.id,
      name: this.profile.name,
      email: this.profile.email,
      farmingType: this.profile.farmingType,
      location: this.farm.location,
      totalLand: this.farm.totalLand,
      plan: this.subscription.plan,
      isActive: this.subscription.isActive,
      lastLogin: this.stats.lastLoginAt
    };
  }

  // Validate user data
  validate() {
    const errors = [];
    
    if (!this.profile.name) errors.push('Name is required');
    if (!this.profile.phone && !this.profile.email) {
      errors.push('Either phone or email is required');
    }
    if (this.farm.totalLand < 0) errors.push('Total land cannot be negative');
    if (this.farm.cultivableLand > this.farm.totalLand) {
      errors.push('Cultivable land cannot exceed total land');
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
      profile: this.profile,
      farm: this.farm,
      preferences: this.preferences,
      subscription: this.subscription,
      stats: this.stats
    };
  }

  // Create from JSON
  static fromJSON(data) {
    return new User(data);
  }
}

module.exports = User;
