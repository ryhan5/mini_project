'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Filter, Tractor, Water, Sun, Droplets, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EquipmentExchangeClient = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [expandedItem, setExpandedItem] = useState(null);
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    location: ''
  });

  // Mock data - in a real app, this would be fetched from an API
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockEquipment = [
          {
            id: 1,
            title: 'John Deere 5045D Tractor',
            description: '2WD, 45 HP, 3 Cylinder, 2900 Engine RPM, 8 Forward + 2 Reverse Gears',
            category: 'tractor',
            price: 650000,
            priceType: 'fixed',
            location: 'Karnal, Haryana',
            posted: '2 days ago',
            image: '/images/tractor-1.jpg',
            seller: 'FarmEquip Solutions',
            contact: '+91 98765 43210',
            condition: 'Used - Good',
            year: 2020,
            hoursUsed: 1200
          },
          {
            id: 2,
            title: 'Mahindra 275 DI XP Plus',
            description: '4WD, 45 HP, 3 Cylinder, 2000 Engine RPM, 8 Forward + 2 Reverse Gears',
            category: 'tractor',
            price: 550,
            priceType: 'daily',
            location: 'Ludhiana, Punjab',
            posted: '1 week ago',
            image: '/images/tractor-2.jpg',
            seller: 'Punjab Agro',
            contact: '+91 98765 12345',
            condition: 'Used - Excellent',
            year: 2021,
            hoursUsed: 800
          },
          {
            id: 3,
            title: 'Sprinkler Irrigation System',
            description: 'Complete set with 50 sprinklers, pipes and connectors. Covers 5 acres.',
            category: 'irrigation',
            price: 45000,
            priceType: 'fixed',
            location: 'Nashik, Maharashtra',
            posted: '3 days ago',
            image: '/images/irrigation-1.jpg',
            seller: 'Green Fields',
            contact: '+91 98765 67890',
            condition: 'New',
            brand: 'Jain Irrigation'
          },
          {
            id: 4,
            title: 'Solar Water Pump 5HP',
            description: '5HP solar water pump with 5kW solar panel kit. Perfect for irrigation.',
            category: 'solar',
            price: 225000,
            priceType: 'fixed',
            location: 'Jaipur, Rajasthan',
            posted: '1 day ago',
            image: '/images/solar-pump.jpg',
            seller: 'Solar Solutions',
            contact: '+91 98765 11223',
            condition: 'New',
            warranty: '5 years'
          },
          {
            id: 5,
            title: 'Rotavator 5 Feet',
            description: 'Heavy duty rotavator for tractors 35-50 HP. Excellent condition.',
            category: 'implements',
            price: 85000,
            priceType: 'fixed',
            location: 'Vijayawada, Andhra Pradesh',
            posted: '1 week ago',
            image: '/images/rotavator.jpg',
            seller: 'Agro Implements',
            contact: '+91 98765 44556',
            condition: 'Used - Good',
            year: 2019
          },
          {
            id: 6,
            title: 'Tractor Trailer',
            description: '10 ton capacity, 20 feet long, good condition, with hydraulic system',
            category: 'trailer',
            price: 125000,
            priceType: 'fixed',
            location: 'Coimbatore, Tamil Nadu',
            posted: '5 days ago',
            image: '/images/trailer.jpg',
            seller: 'South Agro',
            contact: '+91 98765 77889',
            condition: 'Used - Fair',
            year: 2018
          }
        ];
        
        setEquipment(mockEquipment);
      } catch (err) {
        setError('Failed to load equipment listings. Please try again later.');
        console.error('Error fetching equipment:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const toggleItem = (id) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'tractor':
        return <Tractor className="h-5 w-5" />;
      case 'irrigation':
        return <Droplets className="h-5 w-5" />;
      case 'solar':
        return <Sun className="h-5 w-5" />;
      default:
        return <Tractor className="h-5 w-5" />;
    }
  };

  const getCategoryName = (category) => {
    const names = {
      'tractor': 'Tractor',
      'irrigation': 'Irrigation',
      'solar': 'Solar',
      'implements': 'Implements',
      'trailer': 'Trailer'
    };
    return names[category] || 'Other';
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesFilters = 
      (filters.category === 'all' || item.category === filters.category) &&
      (filters.location === '' || item.location.toLowerCase().includes(filters.location.toLowerCase()));
    
    return matchesSearch && matchesTab && matchesFilters;
  });

  const formatPrice = (price, type) => {
    if (type === 'daily') {
      return `₹${price}/day`;
    } else if (type === 'hourly') {
      return `₹${price}/hour`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Equipment Exchange</h1>
            <p className="text-green-100">
              Buy, sell, or rent agricultural equipment. Connect with farmers and suppliers across India.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-8">
        {/* Search and Filter */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search equipment by name, description, or location..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                List Equipment
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="all">All Categories</option>
                  <option value="tractor">Tractors</option>
                  <option value="irrigation">Irrigation</option>
                  <option value="solar">Solar Pumps</option>
                  <option value="implements">Implements</option>
                  <option value="trailer">Trailers</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <select 
                  className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                >
                  <option value="all">Any Price</option>
                  <option value="0-50000">Under ₹50,000</option>
                  <option value="50000-200000">₹50,000 - ₹2,00,000</option>
                  <option value="200000-500000">₹2,00,000 - ₹5,00,000</option>
                  <option value="500000">Over ₹5,00,000</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="City, State"
                    className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 flex justify-center items-center min-h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          ) : filteredEquipment.length > 0 ? (
            filteredEquipment.map((item) => (
              <Card 
                key={item.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={item.image || '/images/placeholder-equipment.jpg'} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        {getCategoryIcon(item.category)}
                      </div>
                      <span className="text-xs font-medium text-green-800 bg-green-100 px-2 py-1 rounded-full">
                        {getCategoryName(item.category)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{item.posted}</span>
                  </div>
                  <CardTitle className="mt-2 text-lg font-semibold line-clamp-1">
                    {item.title}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{item.location}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(item.price, item.priceType)}
                      </span>
                      {item.priceType === 'fixed' && (
                        <span className="text-xs text-gray-500 ml-1">fixed price</span>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-green-600 border-green-200 hover:bg-green-50"
                      onClick={() => toggleItem(item.id)}
                    >
                      {expandedItem === item.id ? 'Show Less' : 'View Details'}
                    </Button>
                  </div>
                </CardContent>
                {expandedItem === item.id && (
                  <div className="px-6 pb-4 pt-0">
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="text-sm font-medium mb-3">Details</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs">Seller</p>
                          <p>{item.seller}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Contact</p>
                          <p>{item.contact}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Condition</p>
                          <p>{item.condition}</p>
                        </div>
                        {item.year && (
                          <div>
                            <p className="text-gray-500 text-xs">Year</p>
                            <p>{item.year}</p>
                          </div>
                        )}
                        {item.hoursUsed && (
                          <div>
                            <p className="text-gray-500 text-xs">Hours Used</p>
                            <p>{item.hoursUsed} hrs</p>
                          </div>
                        )}
                        {item.warranty && (
                          <div>
                            <p className="text-gray-500 text-xs">Warranty</p>
                            <p>{item.warranty}</p>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button className="flex-1 bg-green-600 hover:bg-green-700">
                          Contact Seller
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Save for Later
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500">No equipment found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    category: 'all',
                    priceRange: 'all',
                    location: ''
                  });
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentExchangeClient;
