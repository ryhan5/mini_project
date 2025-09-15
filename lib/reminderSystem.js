// Reminders & Alerts System for Farming Operations
import { generateId } from './utils';

// Reminder types and their configurations
export const REMINDER_TYPES = {
  IRRIGATION: {
    id: 'irrigation',
    name: 'Irrigation Reminder',
    icon: '💧',
    color: 'blue',
    defaultFrequency: 'daily'
  },
  FERTILIZER: {
    id: 'fertilizer',
    name: 'Fertilizer Application',
    icon: '🧪',
    color: 'green',
    defaultFrequency: 'weekly'
  },
  PEST_CHECK: {
    id: 'pest_check',
    name: 'Pest Inspection',
    icon: '🔍',
    color: 'orange',
    defaultFrequency: 'weekly'
  },
  HARVEST: {
    id: 'harvest',
    name: 'Harvest Time',
    icon: '🌾',
    color: 'yellow',
    defaultFrequency: 'once'
  },
  SOWING: {
    id: 'sowing',
    name: 'Sowing/Planting',
    icon: '🌱',
    color: 'green',
    defaultFrequency: 'seasonal'
  },
  MARKET_CHECK: {
    id: 'market_check',
    name: 'Market Price Check',
    icon: '📈',
    color: 'purple',
    defaultFrequency: 'daily'
  },
  WEATHER_CHECK: {
    id: 'weather_check',
    name: 'Weather Monitoring',
    icon: '🌦️',
    color: 'blue',
    defaultFrequency: 'daily'
  },
  SCHEME_DEADLINE: {
    id: 'scheme_deadline',
    name: 'Scheme Deadline',
    icon: '⏰',
    color: 'red',
    defaultFrequency: 'once'
  },
  SOIL_TEST: {
    id: 'soil_test',
    name: 'Soil Testing',
    icon: '🔬',
    color: 'brown',
    defaultFrequency: 'yearly'
  }
};

export const FREQUENCY_OPTIONS = {
  ONCE: { id: 'once', name: 'One Time', interval: null },
  DAILY: { id: 'daily', name: 'Daily', interval: 1 },
  WEEKLY: { id: 'weekly', name: 'Weekly', interval: 7 },
  BIWEEKLY: { id: 'biweekly', name: 'Bi-weekly', interval: 14 },
  MONTHLY: { id: 'monthly', name: 'Monthly', interval: 30 },
  SEASONAL: { id: 'seasonal', name: 'Seasonal', interval: 90 },
  YEARLY: { id: 'yearly', name: 'Yearly', interval: 365 }
};

class ReminderSystem {
  constructor() {
    this.reminders = this.loadReminders();
    this.notifications = this.loadNotifications();
    this.listeners = [];
    this.startNotificationCheck();
  }

  // Load reminders from localStorage
  loadReminders() {
    try {
      const stored = localStorage.getItem('farmReminders');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading reminders:', error);
      return [];
    }
  }

  // Load notifications from localStorage
  loadNotifications() {
    try {
      const stored = localStorage.getItem('farmNotifications');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading notifications:', error);
      return [];
    }
  }

  // Save reminders to localStorage
  saveReminders() {
    try {
      localStorage.setItem('farmReminders', JSON.stringify(this.reminders));
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving reminders:', error);
    }
  }

  // Save notifications to localStorage
  saveNotifications() {
    try {
      localStorage.setItem('farmNotifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.error('Error saving notifications:', error);
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
    this.listeners.forEach(callback => callback(this.reminders));
  }

  // Create a new reminder
  createReminder(reminderData) {
    const reminder = {
      id: generateId(),
      type: reminderData.type,
      title: reminderData.title,
      description: reminderData.description || '',
      crop: reminderData.crop || '',
      area: reminderData.area || '',
      startDate: reminderData.startDate,
      endDate: reminderData.endDate || null,
      frequency: reminderData.frequency || 'once',
      time: reminderData.time || '08:00', // Default 8 AM
      isActive: true,
      lastTriggered: null,
      nextTrigger: this.calculateNextTrigger(reminderData.startDate, reminderData.frequency, reminderData.time),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: this.getCurrentUserId()
    };

    this.reminders.push(reminder);
    this.saveReminders();
    return reminder;
  }

  // Update an existing reminder
  updateReminder(reminderId, updates) {
    const index = this.reminders.findIndex(r => r.id === reminderId);
    if (index !== -1) {
      this.reminders[index] = {
        ...this.reminders[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      // Recalculate next trigger if timing changed
      if (updates.startDate || updates.frequency || updates.time) {
        this.reminders[index].nextTrigger = this.calculateNextTrigger(
          this.reminders[index].startDate,
          this.reminders[index].frequency,
          this.reminders[index].time
        );
      }

      this.saveReminders();
      return this.reminders[index];
    }
    return null;
  }

  // Delete a reminder
  deleteReminder(reminderId) {
    this.reminders = this.reminders.filter(r => r.id !== reminderId);
    this.saveReminders();
  }

  // Toggle reminder active status
  toggleReminder(reminderId) {
    const reminder = this.reminders.find(r => r.id === reminderId);
    if (reminder) {
      reminder.isActive = !reminder.isActive;
      reminder.updatedAt = new Date().toISOString();
      this.saveReminders();
      return reminder;
    }
    return null;
  }

  // Calculate next trigger time
  calculateNextTrigger(startDate, frequency, time) {
    const start = new Date(startDate);
    const [hours, minutes] = time.split(':').map(Number);
    
    start.setHours(hours, minutes, 0, 0);

    if (frequency === 'once') {
      return start.toISOString();
    }

    const now = new Date();
    const interval = FREQUENCY_OPTIONS[frequency.toUpperCase()]?.interval || 1;
    
    let nextTrigger = new Date(start);
    
    // Find the next occurrence
    while (nextTrigger <= now) {
      nextTrigger.setDate(nextTrigger.getDate() + interval);
    }

    return nextTrigger.toISOString();
  }

  // Check for due reminders and create notifications
  checkDueReminders() {
    const now = new Date();
    const dueReminders = this.reminders.filter(reminder => 
      reminder.isActive && 
      reminder.nextTrigger && 
      new Date(reminder.nextTrigger) <= now
    );

    dueReminders.forEach(reminder => {
      this.triggerReminder(reminder);
    });

    return dueReminders.length;
  }

  // Trigger a reminder and create notification
  triggerReminder(reminder) {
    // Create notification
    const notification = {
      id: generateId(),
      reminderId: reminder.id,
      type: reminder.type,
      title: reminder.title,
      message: this.generateReminderMessage(reminder),
      priority: this.calculateReminderPriority(reminder),
      createdAt: new Date().toISOString(),
      isRead: false,
      isActioned: false
    };

    this.notifications.unshift(notification);
    this.saveNotifications();

    // Update reminder
    reminder.lastTriggered = new Date().toISOString();
    
    if (reminder.frequency !== 'once') {
      reminder.nextTrigger = this.calculateNextTrigger(
        reminder.lastTriggered,
        reminder.frequency,
        reminder.time
      );
    } else {
      reminder.isActive = false; // Deactivate one-time reminders
    }

    this.saveReminders();

    // Show browser notification if supported
    this.showBrowserNotification(notification);

    return notification;
  }

  // Generate contextual reminder message
  generateReminderMessage(reminder) {
    const messages = {
      irrigation: `Time to irrigate ${reminder.crop || 'your crops'}${reminder.area ? ` in ${reminder.area}` : ''}. Check soil moisture before watering.`,
      fertilizer: `Apply ${reminder.description || 'fertilizer'} to ${reminder.crop || 'your crops'}. Best time is early morning or evening.`,
      pest_check: `Inspect ${reminder.crop || 'your crops'} for pest and disease symptoms. Early detection prevents major damage.`,
      harvest: `${reminder.crop || 'Your crop'} is ready for harvest. Check market prices before selling.`,
      sowing: `Time to sow ${reminder.crop || 'seeds'}. Ensure soil preparation is complete and weather is favorable.`,
      market_check: `Check current market prices for ${reminder.crop || 'your produce'}. Plan your selling strategy.`,
      weather_check: `Review today's weather forecast. Plan your farm activities accordingly.`,
      scheme_deadline: `${reminder.title} deadline approaching. Submit required documents to avoid missing benefits.`,
      soil_test: `Schedule soil testing for ${reminder.area || 'your fields'}. Results will help optimize fertilizer use.`
    };

    return messages[reminder.type] || reminder.description || 'Reminder for your farm activity';
  }

  // Calculate reminder priority based on type and timing
  calculateReminderPriority(reminder) {
    const priorityMap = {
      harvest: 'high',
      scheme_deadline: 'high',
      pest_check: 'medium',
      irrigation: 'medium',
      fertilizer: 'medium',
      sowing: 'medium',
      market_check: 'low',
      weather_check: 'low',
      soil_test: 'low'
    };

    return priorityMap[reminder.type] || 'medium';
  }

  // Show browser notification
  showBrowserNotification(notification) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: notification.id
      });
    }
  }

  // Request notification permission
  async requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  }

  // Start periodic notification check
  startNotificationCheck() {
    // Check every minute
    setInterval(() => {
      this.checkDueReminders();
    }, 60000);

    // Initial check
    setTimeout(() => {
      this.checkDueReminders();
    }, 1000);
  }

  // Get active reminders
  getActiveReminders() {
    return this.reminders
      .filter(r => r.isActive)
      .sort((a, b) => new Date(a.nextTrigger) - new Date(b.nextTrigger));
  }

  // Get upcoming reminders (next 7 days)
  getUpcomingReminders(days = 7) {
    const now = new Date();
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + days);

    return this.reminders
      .filter(r => 
        r.isActive && 
        r.nextTrigger &&
        new Date(r.nextTrigger) >= now &&
        new Date(r.nextTrigger) <= cutoff
      )
      .sort((a, b) => new Date(a.nextTrigger) - new Date(b.nextTrigger));
  }

  // Get unread notifications
  getUnreadNotifications() {
    return this.notifications
      .filter(n => !n.isRead)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  // Mark notification as read
  markNotificationAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      notification.readAt = new Date().toISOString();
      this.saveNotifications();
    }
  }

  // Mark notification as actioned
  markNotificationAsActioned(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isActioned = true;
      notification.actionedAt = new Date().toISOString();
      this.saveNotifications();
    }
  }

  // Create smart reminders based on crop calendar
  createCropReminders(crop) {
    const reminders = [];
    const now = new Date();

    // Sowing reminder
    if (crop.plantingDate) {
      const sowingDate = new Date(crop.plantingDate);
      if (sowingDate > now) {
        reminders.push(this.createReminder({
          type: 'sowing',
          title: `Sow ${crop.name}`,
          description: `Time to sow ${crop.variety || crop.name} seeds`,
          crop: crop.name,
          startDate: sowingDate.toISOString(),
          frequency: 'once',
          time: '07:00'
        }));
      }
    }

    // Irrigation reminders
    reminders.push(this.createReminder({
      type: 'irrigation',
      title: `Irrigate ${crop.name}`,
      description: `Regular irrigation for ${crop.name}`,
      crop: crop.name,
      area: `${crop.area} acres`,
      startDate: now.toISOString(),
      frequency: 'weekly',
      time: '06:00'
    }));

    // Pest check reminders
    reminders.push(this.createReminder({
      type: 'pest_check',
      title: `Inspect ${crop.name}`,
      description: `Check for pests and diseases in ${crop.name}`,
      crop: crop.name,
      startDate: now.toISOString(),
      frequency: 'weekly',
      time: '08:00'
    }));

    return reminders;
  }

  // Get reminder statistics
  getReminderStats() {
    const active = this.reminders.filter(r => r.isActive).length;
    const upcoming = this.getUpcomingReminders().length;
    const unread = this.getUnreadNotifications().length;

    return {
      total: this.reminders.length,
      active,
      upcoming,
      notifications: this.notifications.length,
      unread
    };
  }

  // Helper method to get current user ID
  getCurrentUserId() {
    return localStorage.getItem('currentUserId') || 'default-user';
  }

  // Export reminders to JSON
  exportReminders() {
    return JSON.stringify({
      reminders: this.reminders,
      notifications: this.notifications,
      exportedAt: new Date().toISOString()
    }, null, 2);
  }

  // Import reminders from JSON
  importReminders(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      if (data.reminders) {
        this.reminders = [...this.reminders, ...data.reminders];
        this.saveReminders();
      }
      if (data.notifications) {
        this.notifications = [...this.notifications, ...data.notifications];
        this.saveNotifications();
      }
      return true;
    } catch (error) {
      console.error('Error importing reminders:', error);
      return false;
    }
  }
}

// Create singleton instance
export const reminderSystem = new ReminderSystem();

// Utility functions
export const getReminderIcon = (type) => {
  return REMINDER_TYPES[type]?.icon || '⏰';
};

export const getReminderColor = (type) => {
  return REMINDER_TYPES[type]?.color || 'gray';
};

export const formatReminderTime = (time) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const getNextReminderText = (nextTrigger) => {
  if (!nextTrigger) return 'Not scheduled';
  
  const next = new Date(nextTrigger);
  const now = new Date();
  const diffTime = next - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Overdue';
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays < 7) return `In ${diffDays} days`;
  return next.toLocaleDateString();
};
