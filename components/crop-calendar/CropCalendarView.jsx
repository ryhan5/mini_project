'use client';

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import satelliteService from '@/lib/satelliteService';
import { Satellite, TrendingUp, TrendingDown, AlertTriangle, Droplets, Leaf, Eye } from 'lucide-react';

const CROP_TYPES = [
  'Rice', 'Wheat', 'Corn', 'Potato', 'Onion', 'Tomato',
  'Cotton', 'Sugarcane', 'Soybean', 'Mustard'
];

const REMINDER_TYPES = [
  'Planting', 'Irrigation', 'Fertilization', 'Pest Control', 'Harvest'
];

export default function CropCalendarView({ selectedCrop, selectedRegion }) {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [satelliteData, setSatelliteData] = useState(null);
  const [loadingSatellite, setLoadingSatellite] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'Planting',
    crop: selectedCrop,
    date: '',
    notes: '',
    reminder: true,
    irrigation: false
  });

  // Load saved events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('cropCalendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Load satellite data for the selected crop and region
  useEffect(() => {
    const loadSatelliteData = async () => {
      if (!selectedCrop || !selectedRegion) return;
      
      setLoadingSatellite(true);
      try {
        // Mock coordinates for the selected region - in production would use actual coordinates
        const coordinates = [77.2090, 28.6139];
        const data = await satelliteService.getCropHealthAnalysis(coordinates, selectedCrop);
        setSatelliteData(data);
      } catch (error) {
        console.error('Failed to load satellite data:', error);
      } finally {
        setLoadingSatellite(false);
      }
    };

    loadSatelliteData();
  }, [selectedCrop, selectedRegion]);

  // Save events to localStorage when they change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('cropCalendarEvents', JSON.stringify(events));
    }
  }, [events]);

  // Check for reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      events.forEach(event => {
        const eventDate = new Date(event.start);
        const timeDiff = eventDate - now;
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        // Show notification if event is within 1 hour
        if (hoursDiff > 0 && hoursDiff <= 1 && !event.notified) {
          toast.info(`Reminder: ${event.title} for ${event.crop} is coming up soon!`, {
            autoClose: 10000,
            position: 'top-right'
          });
          
          // Mark as notified
          const updatedEvents = events.map(e => 
            e.id === event.id ? { ...e, notified: true } : e
          );
          setEvents(updatedEvents);
        }
      });
    };

    // Check every 15 minutes
    const interval = setInterval(checkReminders, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [events]);

  const handleDateClick = (arg) => {
    setNewEvent(prev => ({
      ...prev,
      date: arg.dateStr
    }));
    setOpenDialog(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    const event = {
      id: Date.now().toString(),
      title: newEvent.title,
      start: newEvent.date,
      allDay: true,
      extendedProps: {
        type: newEvent.type,
        crop: newEvent.crop,
        notes: newEvent.notes,
        reminder: newEvent.reminder,
        irrigation: newEvent.irrigation
      },
      color: getEventColor(newEvent.type)
    };

    setEvents([...events, event]);
    setOpenDialog(false);
    
    // Reset form
    setNewEvent({
      title: '',
      type: 'Planting',
      crop: selectedCrop,
      date: '',
      notes: '',
      reminder: true,
      irrigation: false
    });
  };

  const getEventColor = (type) => {
    const colors = {
      'Planting': '#10B981',
      'Irrigation': '#3B82F6',
      'Fertilization': '#F59E0B',
      'Pest Control': '#EF4444',
      'Harvest': '#8B5CF6'
    };
    return colors[type] || '#6B7280';
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div className="p-1 text-xs">
        <div className="font-medium truncate">{eventInfo.event.title}</div>
        <div className="text-gray-600">{eventInfo.event.extendedProps.crop}</div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <ToastContainer />
      
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Crop Calendar: {selectedCrop} in {selectedRegion}</h2>
        <Button onClick={() => setOpenDialog(true)}>Add Reminder</Button>
      </div>

      {/* Satellite Insights Section */}
      {satelliteData && (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Satellite className="h-5 w-5 mr-2 text-blue-600" />
              Satellite Crop Insights
            </h3>
            <div className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Crop Health Score</p>
                  <p className="text-2xl font-bold text-green-600">{satelliteData.healthScore}%</p>
                </div>
                <Leaf className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">NDVI Index</p>
                  <p className="text-2xl font-bold text-blue-600">{satelliteData.vegetationIndices.ndvi}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Water Stress</p>
                  <p className="text-2xl font-bold text-orange-600">{satelliteData.vegetationIndices.ndwi}</p>
                </div>
                <Droplets className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>

          {satelliteData.alerts && satelliteData.alerts.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-orange-800 mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Satellite Alerts
              </h4>
              <div className="space-y-2">
                {satelliteData.alerts.slice(0, 2).map((alert, index) => (
                  <div key={index} className="text-sm text-orange-700">
                    • {alert.message}
                  </div>
                ))}
              </div>
            </div>
          )}

          {satelliteData.recommendations && satelliteData.recommendations.length > 0 && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-green-800 mb-2">
                AI Recommendations
              </h4>
              <div className="space-y-2">
                {satelliteData.recommendations.slice(0, 2).map((rec, index) => (
                  <div key={index} className="text-sm text-green-700">
                    • {rec.action}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {loadingSatellite && (
        <div className="mb-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-gray-600">Loading satellite insights...</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}
          height={650}
          events={events}
          dateClick={handleDateClick}
          eventClick={(info) => {
            // Show event details on click
            const event = info.event;
            toast.info(
              <div>
                <h4 className="font-semibold">{event.title}</h4>
                <p>Crop: {event.extendedProps.crop}</p>
                <p>Type: {event.extendedProps.type}</p>
                <p>Notes: {event.extendedProps.notes || 'No notes'}</p>
              </div>,
              { autoClose: 10000, position: 'top-right' }
            );
          }}
          eventContent={renderEventContent}
          dayMaxEventRows={3}
          nowIndicator={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
        />
      </div>

      {/* Add/Edit Event Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Reminder</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="E.g., First Irrigation, Apply Fertilizer"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <Select 
                  value={newEvent.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {REMINDER_TYPES.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Crop</Label>
                <Select
                  value={newEvent.crop}
                  onValueChange={(value) => handleSelectChange('crop', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {CROP_TYPES.map(crop => (
                      <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={newEvent.notes}
                onChange={handleInputChange}
                placeholder="Additional details about this reminder..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="reminder"
                  name="reminder"
                  checked={newEvent.reminder}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <Label htmlFor="reminder" className="text-sm font-medium text-gray-700">
                  Set reminder (1 hour before)
                </Label>
              </div>
              
              {newEvent.type === 'Irrigation' && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="irrigation"
                    name="irrigation"
                    checked={newEvent.irrigation}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="irrigation" className="text-sm font-medium text-gray-700">
                    Include irrigation alert
                  </Label>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleAddEvent}>Add Reminder</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
