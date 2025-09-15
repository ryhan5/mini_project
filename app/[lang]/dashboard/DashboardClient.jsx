'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { activityTracker } from '@/lib/activityTracker';
import { aiAdvisory } from '@/lib/aiAdvisory';
import { reminderSystem } from '@/lib/reminderSystem';
import { knowledgeEngine } from '@/lib/knowledgeEngine';
import SmartInsights from '@/components/dashboard/SmartInsights';
import ActivityLogger from '@/components/dashboard/ActivityLogger';
import { 
  User,
  MapPin,
  Ruler,
  Wheat,
  Mountain,
  Droplets,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Calendar,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Leaf,
  Thermometer,
  Wind,
  Sun,
  CloudRain,
  Settings,
  FileText,
  Camera,
  Upload,
  MapIcon,
  Layers,
  Sprout,
  TreePine,
  Tractor,
  Zap
} from 'lucide-react';

// Farmer Profile Form Component
const FarmerProfileForm = ({ profile, onSave, onCancel, isEditing }) => {
  const [formData, setFormData] = useState(profile || {
    name: '',
    phone: '',
    email: '',
    experience: '',
    farmingType: 'mixed'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <User className="h-5 w-5 mr-2 text-blue-600" />
          Farmer Profile
        </h3>
        {onCancel && (
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="+91 XXXXX XXXXX"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="5"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Farming Type</label>
            <select
              value={formData.farmingType}
              onChange={(e) => setFormData({...formData, farmingType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="organic">Organic Farming</option>
              <option value="conventional">Conventional Farming</option>
              <option value="mixed">Mixed Farming</option>
              <option value="sustainable">Sustainable Farming</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

// Farm Details Form Component
const FarmDetailsForm = ({ farm, onSave, onCancel }) => {
  const [formData, setFormData] = useState(farm || {
    location: '',
    state: '',
    district: '',
    pincode: '',
    totalArea: '',
    cultivableArea: '',
    soilType: 'loamy',
    irrigationType: 'drip',
    waterSource: 'borewell'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-green-600" />
          Farm Details
        </h3>
        {onCancel && (
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Farm Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
            placeholder="Village/Town name"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="State"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
            <input
              type="text"
              value={formData.district}
              onChange={(e) => setFormData({...formData, district: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="District"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => setFormData({...formData, pincode: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="123456"
              pattern="[0-9]{6}"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Land Area</label>
            <div className="flex">
              <input
                type="number"
                value={formData.totalArea}
                onChange={(e) => setFormData({...formData, totalArea: e.target.value})}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="5"
                min="0"
                step="0.1"
                required
              />
              <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-500">
                acres
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cultivable Area</label>
            <div className="flex">
              <input
                type="number"
                value={formData.cultivableArea}
                onChange={(e) => setFormData({...formData, cultivableArea: e.target.value})}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="4"
                min="0"
                step="0.1"
                required
              />
              <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-500">
                acres
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
            <select
              value={formData.soilType}
              onChange={(e) => setFormData({...formData, soilType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="clay">Clay Soil</option>
              <option value="loamy">Loamy Soil</option>
              <option value="sandy">Sandy Soil</option>
              <option value="silt">Silt Soil</option>
              <option value="peaty">Peaty Soil</option>
              <option value="chalky">Chalky Soil</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Irrigation Type</label>
            <select
              value={formData.irrigationType}
              onChange={(e) => setFormData({...formData, irrigationType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="drip">Drip Irrigation</option>
              <option value="sprinkler">Sprinkler Irrigation</option>
              <option value="flood">Flood Irrigation</option>
              <option value="furrow">Furrow Irrigation</option>
              <option value="rainfed">Rain-fed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Water Source</label>
            <select
              value={formData.waterSource}
              onChange={(e) => setFormData({...formData, waterSource: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="borewell">Borewell</option>
              <option value="river">River</option>
              <option value="canal">Canal</option>
              <option value="pond">Pond/Tank</option>
              <option value="rainwater">Rainwater Harvesting</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Farm Details
          </button>
        </div>
      </form>
    </div>
  );
};

// Crop Management Component
const CropManagement = ({ crops, onAddCrop, onEditCrop, onDeleteCrop }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [newCrop, setNewCrop] = useState({
    name: '',
    variety: '',
    area: '',
    plantingDate: '',
    expectedHarvest: '',
    season: 'kharif'
  });

  const handleAddCrop = (e) => {
    e.preventDefault();
    onAddCrop(newCrop);
    setNewCrop({
      name: '',
      variety: '',
      area: '',
      plantingDate: '',
      expectedHarvest: '',
      season: 'kharif'
    });
    setShowAddForm(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Wheat className="h-5 w-5 mr-2 text-yellow-600" />
          Crop Management
        </h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Crop
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border border-green-200 rounded-lg bg-green-50">
          <form onSubmit={handleAddCrop} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
                <input
                  type="text"
                  value={newCrop.name}
                  onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
                  placeholder="e.g., Rice, Wheat, Tomato"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Variety</label>
                <input
                  type="text"
                  value={newCrop.variety}
                  onChange={(e) => setNewCrop({...newCrop, variety: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
                  placeholder="e.g., Basmati, IR64"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area (acres)</label>
                <input
                  type="number"
                  value={newCrop.area}
                  onChange={(e) => setNewCrop({...newCrop, area: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
                  placeholder="2.5"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Planting Date</label>
                <input
                  type="date"
                  value={newCrop.plantingDate}
                  onChange={(e) => setNewCrop({...newCrop, plantingDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
                <select
                  value={newCrop.season}
                  onChange={(e) => setNewCrop({...newCrop, season: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
                >
                  <option value="kharif">Kharif (Monsoon)</option>
                  <option value="rabi">Rabi (Winter)</option>
                  <option value="zaid">Zaid (Summer)</option>
                  <option value="perennial">Perennial</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
              >
                Add Crop
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {crops.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Wheat className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No crops added yet. Click "Add Crop" to get started.</p>
          </div>
        ) : (
          crops.map((crop, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{crop.name}</h4>
                      <p className="text-sm text-gray-500">{crop.variety}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {crop.area} acres
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {crop.season}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Planted: {new Date(crop.plantingDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingCrop(index)}
                    className="p-2 text-gray-400 hover:text-blue-600"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteCrop(index)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Profile Summary Card Component
const ProfileSummaryCard = ({ profile, farm, onEdit }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Profile Summary</h3>
        <button
          onClick={onEdit}
          className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <Edit3 className="h-4 w-4 mr-2" />
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-full text-blue-600 mr-3">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Farmer Details</h4>
              <p className="text-sm text-gray-500">Personal information</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Name:</span>
              <span className="text-gray-900 font-medium">{profile?.name || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phone:</span>
              <span className="text-gray-900">{profile?.phone || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Experience:</span>
              <span className="text-gray-900">{profile?.experience ? `${profile.experience} years` : 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Farming Type:</span>
              <span className="text-gray-900 capitalize">{profile?.farmingType || 'Not set'}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-100 rounded-full text-green-600 mr-3">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Farm Details</h4>
              <p className="text-sm text-gray-500">Land and location</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Location:</span>
              <span className="text-gray-900">{farm?.location || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Area:</span>
              <span className="text-gray-900">{farm?.totalArea ? `${farm.totalArea} acres` : 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Soil Type:</span>
              <span className="text-gray-900 capitalize">{farm?.soilType || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Irrigation:</span>
              <span className="text-gray-900 capitalize">{farm?.irrigationType || 'Not set'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick Stats Component
const QuickStats = ({ profile, farm, crops }) => {
  const totalCropArea = crops.reduce((sum, crop) => sum + parseFloat(crop.area || 0), 0);
  const activeCrops = crops.filter(crop => {
    const plantingDate = new Date(crop.plantingDate);
    const now = new Date();
    const monthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    return plantingDate >= monthsAgo;
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600 mr-4">
            <Ruler className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Land</p>
            <p className="text-2xl font-bold text-gray-900">{farm?.totalArea || 0}</p>
            <p className="text-xs text-gray-500">acres</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 bg-green-50 rounded-lg text-green-600 mr-4">
            <Wheat className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Crops</p>
            <p className="text-2xl font-bold text-gray-900">{activeCrops}</p>
            <p className="text-xs text-gray-500">varieties</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600 mr-4">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Crop Area</p>
            <p className="text-2xl font-bold text-gray-900">{totalCropArea.toFixed(1)}</p>
            <p className="text-xs text-gray-500">acres cultivated</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 bg-purple-50 rounded-lg text-purple-600 mr-4">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Experience</p>
            <p className="text-2xl font-bold text-gray-900">{profile?.experience || 0}</p>
            <p className="text-xs text-gray-500">years farming</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardClient = ({ lang }) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  
  // Profile and Farm State
  const [farmerProfile, setFarmerProfile] = useState(null);
  const [farmDetails, setFarmDetails] = useState(null);
  const [crops, setCrops] = useState([]);
  
  // UI State
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showFarmForm, setShowFarmForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingFarm, setEditingFarm] = useState(false);
  
  // Smart System State
  const [activities, setActivities] = useState([]);
  const [advisories, setAdvisories] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [cropRecommendations, setCropRecommendations] = useState([]);

  // Check if profile setup is complete
  const isProfileComplete = farmerProfile && farmDetails;
  const needsSetup = !farmerProfile || !farmDetails;

  // Load saved data on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('farmerProfile');
    const savedFarm = localStorage.getItem('farmDetails');
    const savedCrops = localStorage.getItem('crops');

    if (savedProfile) {
      setFarmerProfile(JSON.parse(savedProfile));
    }
    if (savedFarm) {
      setFarmDetails(JSON.parse(savedFarm));
    }
    if (savedCrops) {
      setCrops(JSON.parse(savedCrops));
    }
  }, []);

  // Initialize smart systems when profile is loaded
  useEffect(() => {
    if (farmerProfile && farmDetails) {
      loadSmartSystemData();
      generateInitialRecommendations();
    }
  }, [farmerProfile, farmDetails, crops]);

  // Load data from smart systems
  const loadSmartSystemData = () => {
    // Load recent activities
    const recentActivities = activityTracker.getRecentActivities(7);
    setActivities(recentActivities);

    // Load active advisories
    const activeAdvisories = aiAdvisory.getActiveAdvisories();
    setAdvisories(activeAdvisories);

    // Load upcoming reminders
    const upcomingReminders = reminderSystem.getUpcomingReminders(7);
    setReminders(upcomingReminders);

    // Simulate weather data (in production, fetch from weather API)
    setWeatherData({
      temperature: 28,
      humidity: 65,
      rainfall: 0,
      windSpeed: 12,
      conditions: 'Partly Cloudy',
      forecast: [
        { day: 'Today', temp: 28, condition: 'Sunny', rain: 0 },
        { day: 'Tomorrow', temp: 30, condition: 'Cloudy', rain: 20 },
        { day: 'Day 3', temp: 26, condition: 'Rainy', rain: 80 }
      ]
    });
  };

  // Generate initial recommendations based on user context
  const generateInitialRecommendations = () => {
    const userContext = {
      location: farmDetails?.location || '',
      soilType: farmDetails?.soilType || '',
      crops: crops.map(c => c.name.toLowerCase()),
      currentSeason: knowledgeEngine.getCurrentSeason()
    };

    const recommendations = knowledgeEngine.generateRecommendations(userContext);
    setCropRecommendations(recommendations);

    // Generate AI advisories based on context
    if (recommendations.length > 0) {
      recommendations.forEach(rec => {
        if (rec.priority === 'high' || rec.priority === 'medium') {
          aiAdvisory.generateAdvisory(`${rec.type}_${rec.category}`, {
            crop: rec.crop,
            message: rec.message,
            priority: rec.priority
          });
        }
      });
    }
  };

  // Save profile data
  const handleSaveProfile = (profileData) => {
    setFarmerProfile(profileData);
    localStorage.setItem('farmerProfile', JSON.stringify(profileData));
    setShowProfileForm(false);
    setEditingProfile(false);
  };

  // Save farm data
  const handleSaveFarm = (farmData) => {
    setFarmDetails(farmData);
    localStorage.setItem('farmDetails', JSON.stringify(farmData));
    setShowFarmForm(false);
    setEditingFarm(false);
  };

  // Crop management functions
  const handleAddCrop = (cropData) => {
    const newCrops = [...crops, { ...cropData, id: Date.now() }];
    setCrops(newCrops);
    localStorage.setItem('crops', JSON.stringify(newCrops));
  };

  const handleEditCrop = (index, cropData) => {
    const newCrops = [...crops];
    newCrops[index] = { ...cropData, id: crops[index].id };
    setCrops(newCrops);
    localStorage.setItem('crops', JSON.stringify(newCrops));
  };

  const handleDeleteCrop = (index) => {
    const newCrops = crops.filter((_, i) => i !== index);
    setCrops(newCrops);
    localStorage.setItem('crops', JSON.stringify(newCrops));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your farm profile, crops, and agricultural data
              </p>
            </div>
            {needsSetup && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center px-3 py-1.5 text-sm font-medium text-amber-800 bg-amber-100 rounded-md">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Setup Required
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Setup Warning */}
        {needsSetup && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-2 bg-amber-100 rounded-full text-amber-600 mr-4">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-amber-900">Complete Your Profile Setup</h3>
                <p className="mt-1 text-sm text-amber-700">
                  Please complete your farmer profile and farm details to get personalized insights and recommendations.
                </p>
              </div>
              <div className="flex space-x-3">
                {!farmerProfile && (
                  <button
                    onClick={() => setShowProfileForm(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700"
                  >
                    Add Profile
                  </button>
                )}
                {!farmDetails && (
                  <button
                    onClick={() => setShowFarmForm(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Add Farm Details
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Profile Forms */}
        {showProfileForm && (
          <div className="mb-6">
            <FarmerProfileForm
              profile={farmerProfile}
              onSave={handleSaveProfile}
              onCancel={() => setShowProfileForm(false)}
            />
          </div>
        )}

        {showFarmForm && (
          <div className="mb-6">
            <FarmDetailsForm
              farm={farmDetails}
              onSave={handleSaveFarm}
              onCancel={() => setShowFarmForm(false)}
            />
          </div>
        )}

        {/* Quick Stats */}
        {isProfileComplete && (
          <div className="mb-8">
            <QuickStats profile={farmerProfile} farm={farmDetails} crops={crops} />
          </div>
        )}

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Summary */}
          {isProfileComplete && (
            <div className="lg:col-span-2">
              <ProfileSummaryCard
                profile={farmerProfile}
                farm={farmDetails}
                onEdit={() => {
                  setEditingProfile(true);
                  setShowProfileForm(true);
                }}
              />
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-gray-600" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowProfileForm(true)}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <User className="h-4 w-4 mr-3 text-blue-600" />
                  {farmerProfile ? 'Edit Profile' : 'Add Profile'}
                </button>
                <button
                  onClick={() => setShowFarmForm(true)}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <MapPin className="h-4 w-4 mr-3 text-green-600" />
                  {farmDetails ? 'Edit Farm Details' : 'Add Farm Details'}
                </button>
                <button
                  onClick={() => window.open(`/${lang}/weather`, '_blank')}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <Sun className="h-4 w-4 mr-3 text-yellow-600" />
                  Check Weather
                </button>
                <button
                  onClick={() => window.open(`/${lang}/crop-assistant`, '_blank')}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <Leaf className="h-4 w-4 mr-3 text-green-600" />
                  AI Assistant
                </button>
              </div>
            </div>

            {/* Smart Advisories */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-blue-600" />
                AI Advisories
              </h3>
              <div className="space-y-3">
                {advisories.length > 0 ? (
                  advisories.slice(0, 3).map((advisory, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        advisory.priority === 'high' ? 'bg-red-500' : 
                        advisory.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{advisory.title}</p>
                        <p className="text-xs text-gray-600 truncate">{advisory.message}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-4 text-sm">
                    No active advisories
                  </div>
                )}
              </div>
            </div>

            {/* Weather Widget */}
            {weatherData && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Sun className="h-5 w-5 mr-2 text-yellow-600" />
                  Weather Today
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{weatherData.temperature}°C</p>
                    <p className="text-sm text-gray-600">{weatherData.conditions}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Droplets className="h-4 w-4 mr-1" />
                      {weatherData.humidity}%
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Wind className="h-4 w-4 mr-1" />
                      {weatherData.windSpeed} km/h
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="text-center p-2 bg-gray-50 rounded">
                      <p className="font-medium">{day.day}</p>
                      <p className="text-gray-600">{day.temp}°C</p>
                      <p className="text-blue-600">{day.rain}%</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-gray-600" />
                Recent Activities
              </h3>
              <div className="space-y-3 text-sm">
                {activities.length > 0 ? (
                  activities.slice(0, 4).map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 ${
                          activity.type === 'sowing' ? 'bg-green-500' :
                          activity.type === 'irrigation' ? 'bg-blue-500' :
                          activity.type === 'fertilizer' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`} />
                        <div>
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-600">{activity.crop || 'General'}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{activity.timeAgo}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-4">
                    No recent activities
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Reminders */}
            {reminders.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                  Upcoming Reminders
                </h3>
                <div className="space-y-3">
                  {reminders.slice(0, 3).map((reminder, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-3 text-orange-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{reminder.title}</p>
                          <p className="text-xs text-gray-600">{reminder.crop || 'General'}</p>
                        </div>
                      </div>
                      <span className="text-xs text-orange-600 font-medium">{reminder.nextTriggerText}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Crop Management */}
        <div className="mt-8">
          <CropManagement
            crops={crops}
            onAddCrop={handleAddCrop}
            onEditCrop={handleEditCrop}
            onDeleteCrop={handleDeleteCrop}
          />
        </div>

        {/* Smart Insights */}
        {isProfileComplete && (
          <div className="mt-8">
            <SmartInsights 
              activities={activities}
              advisories={advisories}
              reminders={reminders}
              crops={crops}
              weatherData={weatherData}
            />
          </div>
        )}

        {/* Farm Analytics */}
        {isProfileComplete && crops.length > 0 && (
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                  Farm Analytics
                </h3>
                <button 
                  onClick={() => window.open(`/${lang}/analytics`, '_blank')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View detailed report
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-800">Land Utilization</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {farmDetails?.cultivableArea && farmDetails?.totalArea 
                          ? Math.round((parseFloat(farmDetails.cultivableArea) / parseFloat(farmDetails.totalArea)) * 100)
                          : 0}%
                      </p>
                    </div>
                    <Ruler className="h-8 w-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-800">Crop Diversity</p>
                      <p className="text-2xl font-bold text-green-900">{crops.length}</p>
                      <p className="text-xs text-green-700">different crops</p>
                    </div>
                    <Wheat className="h-8 w-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-800">Farming Experience</p>
                      <p className="text-2xl font-bold text-purple-900">{farmerProfile?.experience || 0}</p>
                      <p className="text-xs text-purple-700">years</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activity Logger */}
        <ActivityLogger 
          crops={crops}
          onActivityAdded={(activity) => {
            setActivities(prev => [activity, ...prev]);
            // Refresh smart system data after new activity
            loadSmartSystemData();
          }}
        />
      </main>
    </div>
  );
};

export default DashboardClient;
