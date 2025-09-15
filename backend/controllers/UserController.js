// User Controller for Multi-User Backend Architecture
const User = require('../models/User');
const { createLogger, paginate, createError, isValidEmail, isValidPhone } = require('../utils/helpers');

const logger = createLogger('UserController');

class UserController {
  constructor() {
    this.users = new Map(); // In-memory storage for demo
    this.loadUsers();
  }

  // Load users from storage
  loadUsers() {
    try {
      // In production, this would load from database
      const stored = JSON.parse(localStorage?.getItem('allUsers') || '[]');
      stored.forEach(userData => {
        const user = User.fromJSON(userData);
        this.users.set(user.id, user);
      });
      logger.info(`Loaded ${this.users.size} users`);
    } catch (error) {
      logger.error('Error loading users:', error);
    }
  }

  // Save users to storage
  saveUsers() {
    try {
      const usersArray = Array.from(this.users.values()).map(user => user.toJSON());
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('allUsers', JSON.stringify(usersArray));
      }
      logger.info(`Saved ${this.users.size} users`);
    } catch (error) {
      logger.error('Error saving users:', error);
    }
  }

  // Create new user
  async createUser(userData) {
    try {
      // Validate input
      if (!userData.name) {
        throw createError('Name is required', 400, 'VALIDATION_ERROR');
      }

      if (!userData.phone && !userData.email) {
        throw createError('Either phone or email is required', 400, 'VALIDATION_ERROR');
      }

      if (userData.email && !isValidEmail(userData.email)) {
        throw createError('Invalid email format', 400, 'VALIDATION_ERROR');
      }

      if (userData.phone && !isValidPhone(userData.phone)) {
        throw createError('Invalid phone format', 400, 'VALIDATION_ERROR');
      }

      // Check for existing user
      const existingUser = this.findUserByEmailOrPhone(userData.email, userData.phone);
      if (existingUser) {
        throw createError('User already exists with this email or phone', 409, 'USER_EXISTS');
      }

      // Create user
      const user = new User(userData);
      const validation = user.validate();
      
      if (!validation.isValid) {
        throw createError(`Validation failed: ${validation.errors.join(', ')}`, 400, 'VALIDATION_ERROR');
      }

      this.users.set(user.id, user);
      this.saveUsers();

      logger.info(`Created user: ${user.id}`);
      return { success: true, data: user.getSummary() };

    } catch (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
  }

  // Get user by ID
  async getUserById(userId) {
    try {
      const user = this.users.get(userId);
      if (!user) {
        throw createError('User not found', 404, 'USER_NOT_FOUND');
      }

      user.recordLogin();
      this.saveUsers();

      return { success: true, data: user.toJSON() };
    } catch (error) {
      logger.error('Error getting user:', error);
      throw error;
    }
  }

  // Update user
  async updateUser(userId, updates) {
    try {
      const user = this.users.get(userId);
      if (!user) {
        throw createError('User not found', 404, 'USER_NOT_FOUND');
      }

      // Validate updates
      if (updates.email && !isValidEmail(updates.email)) {
        throw createError('Invalid email format', 400, 'VALIDATION_ERROR');
      }

      if (updates.phone && !isValidPhone(updates.phone)) {
        throw createError('Invalid phone format', 400, 'VALIDATION_ERROR');
      }

      // Update user
      if (updates.profile) {
        user.updateProfile(updates.profile);
      }
      if (updates.farm) {
        user.updateFarm(updates.farm);
      }
      if (updates.preferences) {
        user.updatePreferences(updates.preferences);
      }
      if (updates.subscription) {
        user.updateSubscription(updates.subscription);
      }

      const validation = user.validate();
      if (!validation.isValid) {
        throw createError(`Validation failed: ${validation.errors.join(', ')}`, 400, 'VALIDATION_ERROR');
      }

      this.saveUsers();
      logger.info(`Updated user: ${userId}`);

      return { success: true, data: user.toJSON() };
    } catch (error) {
      logger.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(userId) {
    try {
      const user = this.users.get(userId);
      if (!user) {
        throw createError('User not found', 404, 'USER_NOT_FOUND');
      }

      this.users.delete(userId);
      this.saveUsers();

      logger.info(`Deleted user: ${userId}`);
      return { success: true, message: 'User deleted successfully' };
    } catch (error) {
      logger.error('Error deleting user:', error);
      throw error;
    }
  }

  // Get all users with pagination
  async getUsers(page = 1, limit = 10, filters = {}) {
    try {
      let users = Array.from(this.users.values());

      // Apply filters
      if (filters.farmingType) {
        users = users.filter(user => user.profile.farmingType === filters.farmingType);
      }
      if (filters.state) {
        users = users.filter(user => user.farm.state === filters.state);
      }
      if (filters.plan) {
        users = users.filter(user => user.subscription.plan === filters.plan);
      }
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        users = users.filter(user => 
          user.profile.name.toLowerCase().includes(searchTerm) ||
          user.profile.email.toLowerCase().includes(searchTerm) ||
          user.farm.location.toLowerCase().includes(searchTerm)
        );
      }

      // Sort by creation date (newest first)
      users.sort((a, b) => new Date(b.profile.createdAt) - new Date(a.profile.createdAt));

      // Convert to summaries
      const userSummaries = users.map(user => user.getSummary());

      // Paginate
      const result = paginate(userSummaries, page, limit);

      return { success: true, ...result };
    } catch (error) {
      logger.error('Error getting users:', error);
      throw error;
    }
  }

  // Find user by email or phone
  findUserByEmailOrPhone(email, phone) {
    for (const user of this.users.values()) {
      if ((email && user.profile.email === email) || 
          (phone && user.profile.phone === phone)) {
        return user;
      }
    }
    return null;
  }

  // Authenticate user
  async authenticateUser(identifier, method = 'email') {
    try {
      let user = null;

      if (method === 'email') {
        user = this.findUserByEmailOrPhone(identifier, null);
      } else if (method === 'phone') {
        user = this.findUserByEmailOrPhone(null, identifier);
      }

      if (!user) {
        throw createError('User not found', 404, 'USER_NOT_FOUND');
      }

      user.recordLogin();
      this.saveUsers();

      logger.info(`User authenticated: ${user.id}`);
      return { success: true, data: user.toJSON() };
    } catch (error) {
      logger.error('Error authenticating user:', error);
      throw error;
    }
  }

  // Get user statistics
  async getUserStats() {
    try {
      const users = Array.from(this.users.values());
      
      const stats = {
        total: users.length,
        active: users.filter(u => u.subscription.isActive).length,
        byPlan: {},
        byFarmingType: {},
        byState: {},
        recentLogins: users.filter(u => {
          if (!u.stats.lastLoginAt) return false;
          const lastLogin = new Date(u.stats.lastLoginAt);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return lastLogin > weekAgo;
        }).length
      };

      // Group by plan
      users.forEach(user => {
        const plan = user.subscription.plan;
        stats.byPlan[plan] = (stats.byPlan[plan] || 0) + 1;
      });

      // Group by farming type
      users.forEach(user => {
        const type = user.profile.farmingType;
        stats.byFarmingType[type] = (stats.byFarmingType[type] || 0) + 1;
      });

      // Group by state
      users.forEach(user => {
        const state = user.farm.state;
        if (state) {
          stats.byState[state] = (stats.byState[state] || 0) + 1;
        }
      });

      return { success: true, data: stats };
    } catch (error) {
      logger.error('Error getting user stats:', error);
      throw error;
    }
  }

  // Update user subscription
  async updateSubscription(userId, subscriptionData) {
    try {
      const user = this.users.get(userId);
      if (!user) {
        throw createError('User not found', 404, 'USER_NOT_FOUND');
      }

      user.updateSubscription(subscriptionData);
      this.saveUsers();

      logger.info(`Updated subscription for user: ${userId}`);
      return { success: true, data: user.subscription };
    } catch (error) {
      logger.error('Error updating subscription:', error);
      throw error;
    }
  }

  // Get users by location (for regional analysis)
  async getUsersByLocation(state, district = null) {
    try {
      let users = Array.from(this.users.values());

      users = users.filter(user => {
        if (user.farm.state !== state) return false;
        if (district && user.farm.district !== district) return false;
        return true;
      });

      const userSummaries = users.map(user => user.getSummary());

      return { success: true, data: userSummaries };
    } catch (error) {
      logger.error('Error getting users by location:', error);
      throw error;
    }
  }

  // Export user data
  async exportUsers(format = 'json') {
    try {
      const users = Array.from(this.users.values()).map(user => user.toJSON());
      
      if (format === 'csv') {
        // Convert to CSV format
        const headers = ['ID', 'Name', 'Email', 'Phone', 'State', 'District', 'Total Land', 'Plan', 'Created At'];
        const rows = users.map(user => [
          user.id,
          user.profile.name,
          user.profile.email,
          user.profile.phone,
          user.farm.state,
          user.farm.district,
          user.farm.totalLand,
          user.subscription.plan,
          user.profile.createdAt
        ]);
        
        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        return { success: true, data: csv, format: 'csv' };
      }

      return { success: true, data: users, format: 'json' };
    } catch (error) {
      logger.error('Error exporting users:', error);
      throw error;
    }
  }

  // Bulk operations
  async bulkUpdateUsers(userIds, updates) {
    try {
      const results = [];
      
      for (const userId of userIds) {
        try {
          const result = await this.updateUser(userId, updates);
          results.push({ userId, success: true, data: result.data });
        } catch (error) {
          results.push({ userId, success: false, error: error.message });
        }
      }

      return { success: true, data: results };
    } catch (error) {
      logger.error('Error in bulk update:', error);
      throw error;
    }
  }
}

module.exports = UserController;
