// Smart Insights Component for Dashboard Integration
'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Zap,
  BarChart3,
  Target,
  Award,
  Calendar,
  Lightbulb
} from 'lucide-react';

const SmartInsights = ({ 
  activities = [], 
  advisories = [], 
  reminders = [], 
  crops = [],
  weatherData = null 
}) => {
  const [insights, setInsights] = useState({
    productivity: null,
    efficiency: null,
    recommendations: [],
    alerts: []
  });

  useEffect(() => {
    generateInsights();
  }, [activities, advisories, reminders, crops]);

  const generateInsights = () => {
    const newInsights = {
      productivity: calculateProductivity(),
      efficiency: calculateEfficiency(),
      recommendations: generateRecommendations(),
      alerts: generateAlerts()
    };
    setInsights(newInsights);
  };

  const calculateProductivity = () => {
    if (activities.length === 0) return null;

    const thisWeek = activities.filter(activity => {
      const activityDate = new Date(activity.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return activityDate >= weekAgo;
    });

    const lastWeek = activities.filter(activity => {
      const activityDate = new Date(activity.date);
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return activityDate >= twoWeeksAgo && activityDate < weekAgo;
    });

    const change = thisWeek.length - lastWeek.length;
    const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';

    return {
      thisWeek: thisWeek.length,
      lastWeek: lastWeek.length,
      change: Math.abs(change),
      trend,
      score: Math.min(100, (thisWeek.length / 7) * 100)
    };
  };

  const calculateEfficiency = () => {
    const completedActivities = activities.filter(activity => 
      activity.status === 'completed'
    );

    if (completedActivities.length === 0) return null;

    const successfulActivities = completedActivities.filter(activity => 
      activity.success !== false
    );

    const onTimeActivities = completedActivities.filter(activity => {
      if (!activity.scheduledDate || !activity.actualDate) return true;
      return new Date(activity.actualDate) <= new Date(activity.scheduledDate);
    });

    return {
      successRate: (successfulActivities.length / completedActivities.length) * 100,
      onTimeRate: (onTimeActivities.length / completedActivities.length) * 100,
      totalCompleted: completedActivities.length,
      score: ((successfulActivities.length + onTimeActivities.length) / (completedActivities.length * 2)) * 100
    };
  };

  const generateRecommendations = () => {
    const recommendations = [];

    // Activity-based recommendations
    if (activities.length > 0) {
      const irrigationActivities = activities.filter(a => a.type === 'irrigation');
      const lastIrrigation = irrigationActivities[irrigationActivities.length - 1];
      
      if (!lastIrrigation || isOlderThan(lastIrrigation.date, 3)) {
        recommendations.push({
          type: 'irrigation',
          priority: 'medium',
          title: 'Schedule Irrigation',
          message: 'Consider irrigating your crops based on soil moisture levels',
          action: 'Check soil moisture and schedule irrigation'
        });
      }
    }

    // Weather-based recommendations
    if (weatherData) {
      if (weatherData.forecast && weatherData.forecast.some(day => day.rain > 70)) {
        recommendations.push({
          type: 'weather',
          priority: 'high',
          title: 'Rain Alert',
          message: 'Heavy rain expected. Avoid field operations and ensure drainage',
          action: 'Prepare for rain and check drainage systems'
        });
      }

      if (weatherData.temperature > 35) {
        recommendations.push({
          type: 'heat',
          priority: 'medium',
          title: 'Heat Stress Alert',
          message: 'High temperatures may stress crops. Increase irrigation frequency',
          action: 'Monitor crops for heat stress and adjust watering'
        });
      }
    }

    // Crop-based recommendations
    crops.forEach(crop => {
      const cropActivities = activities.filter(a => 
        a.crop && a.crop.toLowerCase() === crop.name.toLowerCase()
      );

      if (cropActivities.length === 0) {
        recommendations.push({
          type: 'crop_care',
          priority: 'low',
          title: `${crop.name} Care`,
          message: `No recent activities recorded for ${crop.name}`,
          action: `Plan activities for ${crop.name} cultivation`
        });
      }
    });

    return recommendations.slice(0, 5); // Limit to 5 recommendations
  };

  const generateAlerts = () => {
    const alerts = [];

    // Overdue reminders
    const overdueReminders = reminders.filter(reminder => {
      if (!reminder.nextTrigger) return false;
      return new Date(reminder.nextTrigger) < new Date();
    });

    if (overdueReminders.length > 0) {
      alerts.push({
        type: 'overdue',
        severity: 'high',
        title: 'Overdue Tasks',
        message: `${overdueReminders.length} task${overdueReminders.length > 1 ? 's' : ''} overdue`,
        count: overdueReminders.length
      });
    }

    // High priority advisories
    const urgentAdvisories = advisories.filter(advisory => 
      advisory.priority === 'high' || advisory.priority === 'critical'
    );

    if (urgentAdvisories.length > 0) {
      alerts.push({
        type: 'advisory',
        severity: 'medium',
        title: 'Urgent Advisories',
        message: `${urgentAdvisories.length} urgent advisory${urgentAdvisories.length > 1 ? 'ies' : ''} need attention`,
        count: urgentAdvisories.length
      });
    }

    return alerts;
  };

  const isOlderThan = (date, days) => {
    const activityDate = new Date(date);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return activityDate < cutoff;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Productivity Score */}
        {insights.productivity && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Productivity
              </h3>
              <div className={`flex items-center text-sm ${
                insights.productivity.trend === 'up' ? 'text-green-600' : 
                insights.productivity.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {insights.productivity.trend === 'up' && '↗'}
                {insights.productivity.trend === 'down' && '↘'}
                {insights.productivity.trend === 'stable' && '→'}
                <span className="ml-1">{insights.productivity.change}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round(insights.productivity.score)}%
                </p>
                <p className="text-sm text-gray-600">
                  {insights.productivity.thisWeek} activities this week
                </p>
              </div>
              <div className="w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-600"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${insights.productivity.score}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Efficiency Score */}
        {insights.efficiency && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-600" />
                Efficiency
              </h3>
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round(insights.efficiency.score)}%
                </p>
                <p className="text-sm text-gray-600">
                  {insights.efficiency.totalCompleted} tasks completed
                </p>
              </div>
              <div className="text-right text-sm">
                <div className="text-green-600 mb-1">
                  ✓ {Math.round(insights.efficiency.successRate)}% success
                </div>
                <div className="text-blue-600">
                  ⏰ {Math.round(insights.efficiency.onTimeRate)}% on-time
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Alerts */}
      {insights.alerts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
            Alerts
          </h3>
          <div className="space-y-3">
            {insights.alerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{alert.title}</p>
                    <p className="text-sm opacity-80">{alert.message}</p>
                  </div>
                  <span className="text-2xl font-bold">{alert.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Smart Recommendations */}
      {insights.recommendations.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
            Smart Recommendations
          </h3>
          <div className="space-y-3">
            {insights.recommendations.map((rec, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        rec.priority === 'high' ? 'bg-red-500' :
                        rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <p className="font-medium">{rec.title}</p>
                    </div>
                    <p className="text-sm opacity-80 mb-2">{rec.message}</p>
                    <p className="text-xs font-medium">Action: {rec.action}</p>
                  </div>
                  <button className="ml-4 px-3 py-1 text-xs font-medium bg-white border border-current rounded hover:bg-opacity-10">
                    Act
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 text-center">
          <BarChart3 className="h-6 w-6 mx-auto mb-2 text-blue-600" />
          <p className="text-2xl font-bold text-gray-900">{activities.length}</p>
          <p className="text-xs text-gray-600">Total Activities</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 text-center">
          <Zap className="h-6 w-6 mx-auto mb-2 text-purple-600" />
          <p className="text-2xl font-bold text-gray-900">{advisories.length}</p>
          <p className="text-xs text-gray-600">AI Advisories</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 text-center">
          <Calendar className="h-6 w-6 mx-auto mb-2 text-orange-600" />
          <p className="text-2xl font-bold text-gray-900">{reminders.length}</p>
          <p className="text-xs text-gray-600">Reminders</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 text-center">
          <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-green-600" />
          <p className="text-2xl font-bold text-gray-900">
            {activities.filter(a => a.status === 'completed').length}
          </p>
          <p className="text-xs text-gray-600">Completed</p>
        </div>
      </div>
    </div>
  );
};

export default SmartInsights;
