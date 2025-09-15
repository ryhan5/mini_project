// Activity Logger Component for Quick Activity Logging
'use client';

import { useState } from 'react';
import { 
  Plus, 
  Save, 
  X, 
  Droplets, 
  Sprout, 
  Zap, 
  Scissors,
  Bug,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';
import { activityTracker } from '@/lib/activityTracker';

const ActivityLogger = ({ crops = [], onActivityAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'irrigation',
    title: '',
    crop: '',
    area: '',
    notes: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5)
  });

  const activityTypes = [
    { id: 'irrigation', name: 'Irrigation', icon: Droplets, color: 'blue' },
    { id: 'sowing', name: 'Sowing', icon: Sprout, color: 'green' },
    { id: 'fertilizer', name: 'Fertilizer', icon: Zap, color: 'yellow' },
    { id: 'harvest', name: 'Harvest', icon: Scissors, color: 'orange' },
    { id: 'pest_control', name: 'Pest Control', icon: Bug, color: 'red' },
    { id: 'other', name: 'Other', icon: Calendar, color: 'gray' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const activity = {
      type: formData.type,
      title: formData.title || getDefaultTitle(formData.type),
      crop: formData.crop,
      area: parseFloat(formData.area) || 0,
      notes: formData.notes,
      date: `${formData.date}T${formData.time}:00.000Z`,
      status: 'completed',
      success: true
    };

    // Log activity using activity tracker
    const loggedActivity = activityTracker.logActivity(activity);
    
    // Reset form
    setFormData({
      type: 'irrigation',
      title: '',
      crop: '',
      area: '',
      notes: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5)
    });
    
    setIsOpen(false);
    
    // Notify parent component
    if (onActivityAdded) {
      onActivityAdded(loggedActivity);
    }
  };

  const getDefaultTitle = (type) => {
    const titles = {
      irrigation: 'Field Irrigation',
      sowing: 'Seed Sowing',
      fertilizer: 'Fertilizer Application',
      harvest: 'Crop Harvesting',
      pest_control: 'Pest Control Treatment',
      other: 'Farm Activity'
    };
    return titles[type] || 'Farm Activity';
  };

  const getTypeColor = (type) => {
    const typeData = activityTypes.find(t => t.id === type);
    return typeData?.color || 'gray';
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-colors z-50"
      >
        <Plus className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Log Activity</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Activity Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {activityTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.id })}
                    className={`flex items-center p-3 rounded-lg border-2 transition-colors ${
                      formData.type === type.id
                        ? `border-${type.color}-500 bg-${type.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`h-4 w-4 mr-2 ${
                      formData.type === type.id ? `text-${type.color}-600` : 'text-gray-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      formData.type === type.id ? `text-${type.color}-700` : 'text-gray-700'
                    }`}>
                      {type.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (Optional)
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={getDefaultTitle(formData.type)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            />
          </div>

          {/* Crop Selection */}
          {crops.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crop
              </label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              >
                <option value="">Select crop (optional)</option>
                {crops.map((crop, index) => (
                  <option key={index} value={crop.name}>
                    {crop.name} - {crop.area} acres
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area (acres)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              placeholder="0.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              placeholder="Add any additional details..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              Log Activity
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityLogger;
