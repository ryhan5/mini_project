'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Tractor, Droplets, Shovel, Sprout, Plus, CheckCircle, X, Wheat } from "lucide-react"

// Wrapper component to handle search params with Suspense
function EquipmentExchangeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get('listed') === 'true') {
      setShowSuccess(true);
      // Scroll to top to show the success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Remove the query param without refreshing the page
      router.replace('/equipment-exchange', undefined, { shallow: true });
      
      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  // Rest of your component code will go here
  // Sample equipment data
  const equipmentList = [
    {
      id: 1,
      name: 'John Deere 5050D Tractor',
      type: 'tractor',
      owner: 'Rajesh Kumar',
      location: 'Karnal, Haryana',
      rate: '₹1500/day',
      image: '/tractor.jpg',
      available: true,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Sprinkler System',
      type: 'irrigation',
      owner: 'Vijay Singh',
      location: 'Ludhiana, Punjab',
      rate: '₹500/day',
      image: '/sprinkler.jpg',
      available: true,
      rating: 4.5,
    },
    {
      id: 3,
      name: 'Rotavator 6 Feet',
      type: 'tractor',
      owner: 'Amit Patel',
      location: 'Anand, Gujarat',
      rate: '₹1200/day',
      image: '/rotavator.jpg',
      available: true,
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Harvester Combine',
      type: 'harvester',
      owner: 'Harpreet Farms',
      location: 'Amritsar, Punjab',
      rate: '₹5000/day',
      image: '/harvester.jpg',
      available: false,
      rating: 4.9,
    },
    {
      id: 5,
      name: 'Drip Irrigation Kit',
      type: 'irrigation',
      owner: 'Green Fields',
      location: 'Nashik, Maharashtra',
      rate: '₹300/day',
      image: '/drip.jpg',
      available: true,
      rating: 4.6,
    },
    {
      id: 6,
      name: 'Power Tiller',
      type: 'tractor',
      owner: 'Ramesh Yadav',
      location: 'Varanasi, UP',
      rate: '₹1000/day',
      image: '/tiller.jpg',
      available: true,
      rating: 4.4,
    },
  ];

  const filteredEquipment = equipmentList.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        equipment.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        equipment.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === 'all' || equipment.type === activeTab;
    return matchesSearch && matchesCategory;
  });

  const getEquipmentIcon = (type) => {
    switch (type) {
      case 'tractor':
        return <Tractor className="h-5 w-5 text-green-600" />;
      case 'irrigation':
        return <Droplets className="h-5 w-5 text-blue-500" />;
      case 'harvester':
        return <Wheat className="h-5 w-5 text-amber-600" />;
      default:
        return <Tractor className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start"
          >
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-green-800">Equipment Listed Successfully!</h3>
              <p className="text-sm text-green-700">Your equipment has been listed and is now visible to other farmers.</p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="ml-auto text-green-500 hover:text-green-700"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Equipment Exchange</h1>
          <p className="text-gray-600">Rent or exchange farming equipment with fellow farmers in your area</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search equipment, owner, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Link href="/equipment-exchange/list-equipment" passHref>
              <Button className="bg-green-600 hover:bg-green-700">
                List Your Equipment
              </Button>
            </Link>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-5 gap-1 bg-gray-100 p-1 rounded-md">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex items-center justify-center py-2 px-1 rounded-md text-sm font-medium ${
                  activeTab === 'all' ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('tractor')}
                className={`flex items-center justify-center py-2 px-1 rounded-md text-sm font-medium ${
                  activeTab === 'tractor' ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Tractor className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Tractors</span>
              </button>
              <button
                onClick={() => setActiveTab('irrigation')}
                className={`flex items-center justify-center py-2 px-1 rounded-md text-sm font-medium ${
                  activeTab === 'irrigation' ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Droplets className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Irrigation</span>
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`flex items-center justify-center py-2 px-1 rounded-md text-sm font-medium ${
                  activeTab === 'tools' ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Shovel className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Tools</span>
              </button>
              <button
                onClick={() => setActiveTab('other')}
                className={`flex items-center justify-center py-2 px-1 rounded-md text-sm font-medium ${
                  activeTab === 'other' ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Sprout className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Other</span>
              </button>
            </div>
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((equipment) => (
            <motion.div
              key={equipment.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="h-48 bg-gray-100 relative">
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                  equipment.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {equipment.available ? 'Available' : 'Not Available'}
                </div>
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  {getEquipmentIcon(equipment.type)}
                  <span className="ml-2">{equipment.name}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{equipment.name}</h3>
                  <span className="text-green-600 font-semibold">{equipment.rate}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Owner:</span> {equipment.owner}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <svg
                    className="w-4 h-4 text-yellow-400 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{equipment.rating}</span>
                  <span className="mx-2">•</span>
                  <span>{equipment.location}</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  {equipment.available ? 'Rent Now' : 'Contact Owner'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <Tractor className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No equipment found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
