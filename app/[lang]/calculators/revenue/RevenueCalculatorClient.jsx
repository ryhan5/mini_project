'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion'; // Changed from '@/lib/motion'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Calculator, 
  ArrowRight, 
  ArrowLeft,
  Info, 
  Save, 
  Loader2, 
  BarChart3, 
  TrendingUp,
  DollarSign,
  Package,
  AlertCircle, 
  HelpCircle
} from 'lucide-react';

// Extended crop data with more details
const crops = [
  { 
    name: 'Rice', 
    category: 'Cereal',
    avgYield: 4.0, 
    avgPrice: 2200,
    waterRequirement: 2500, // mm/season
    growthPeriod: 120, // days
    season: ['Kharif', 'Rabi']
  },
  { 
    name: 'Wheat', 
    category: 'Cereal',
    avgYield: 3.5, 
    avgPrice: 1850,
    waterRequirement: 450, // mm/season
    growthPeriod: 140,
    season: ['Rabi']
  },
  { 
    name: 'Corn', 
    category: 'Cereal',
    avgYield: 5.0, 
    avgPrice: 1600,
    waterRequirement: 600,
    growthPeriod: 100,
    season: ['Kharif', 'Rabi']
  },
  { 
    name: 'Potato', 
    category: 'Vegetable',
    avgYield: 20.0, 
    avgPrice: 1200,
    waterRequirement: 500,
    growthPeriod: 110,
    season: ['Rabi', 'Summer']
  },
  { 
    name: 'Onion', 
    category: 'Vegetable',
    avgYield: 25.0, 
    avgPrice: 1500,
    waterRequirement: 350,
    growthPeriod: 150,
    season: ['Kharif', 'Rabi']
  },
  { 
    name: 'Soybean', 
    category: 'Pulse',
    avgYield: 2.5, 
    avgPrice: 3800,
    waterRequirement: 450,
    growthPeriod: 100,
    season: ['Kharif']
  },
  { 
    name: 'Cotton', 
    category: 'Cash Crop',
    avgYield: 2.0, 
    avgPrice: 6500, // per quintal
    waterRequirement: 900,
    growthPeriod: 180,
    season: ['Kharif']
  },
  { 
    name: 'Sugarcane', 
    category: 'Cash Crop',
    avgYield: 75.0, 
    avgPrice: 340, // per quintal
    waterRequirement: 2000,
    growthPeriod: 365,
    season: ['Year Round']
  },
];

// Group crops by category
const cropCategories = [...new Set(crops.map(crop => crop.category))];

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

// Default form values
const defaultFormData = {
  area: '',
  crop: '',
  customPrice: '',
  yieldPerHectare: '',
  productionCost: '',
  additionalCosts: '0',
  expectedPrice: '',
  season: 'Kharif',
  notes: ''
};

function RevenueCalculatorClient({ lang = 'en' }) {
  const [formData, setFormData] = useState({
    ...defaultFormData,
    crop: crops[0].name,
    season: 'Kharif'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('calculator');
  const [savedCalculations, setSavedCalculations] = useState([]);

  // Load saved calculations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedRevenueCalculations');
    if (saved) {
      try {
        setSavedCalculations(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved calculations', e);
      }
    }
  }, []);

  // Save calculations to localStorage when they change
  useEffect(() => {
    if (savedCalculations.length > 0) {
      localStorage.setItem('savedRevenueCalculations', JSON.stringify(savedCalculations));
    }
  }, [savedCalculations]);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-calculate derived fields
    if (name === 'crop') {
      const selectedCrop = crops.find(c => c.name === value);
      if (selectedCrop) {
        setFormData(prev => ({
          ...prev,
          yieldPerHectare: selectedCrop.avgYield.toString(),
          expectedPrice: selectedCrop.avgPrice.toString(),
          season: selectedCrop.season.includes(prev.season) ? prev.season : selectedCrop.season[0]
        }));
      }
    }
  };

  const calculateRevenue = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!formData.area || isNaN(formData.area) || parseFloat(formData.area) <= 0) {
        throw new Error('Please enter a valid land area');
      }

      const selectedCrop = crops.find(c => c.name === formData.crop) || crops[0];
      const areaInHectares = parseFloat(formData.area);
      const yieldPerHectare = parseFloat(formData.yieldPerHectare || selectedCrop.avgYield);
      const pricePerUnit = parseFloat(formData.expectedPrice || selectedCrop.avgPrice);
      const productionCost = parseFloat(formData.productionCost || (yieldPerHectare * pricePerUnit * 0.6));
      const additionalCosts = parseFloat(formData.additionalCosts || 0);
      
      const totalProduction = areaInHectares * yieldPerHectare;
      const totalRevenue = totalProduction * pricePerUnit;
      const totalCost = (productionCost * areaInHectares) + additionalCosts;
      const profit = totalRevenue - totalCost;
      const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
      const waterRequired = areaInHectares * selectedCrop.waterRequirement;

      const calculationResult = {
        production: totalProduction,
        revenue: totalRevenue,
        cost: totalCost,
        profit: profit,
        profitMargin: profitMargin,
        pricePerUnit: pricePerUnit,
        yieldPerHectare: yieldPerHectare,
        waterRequired: waterRequired,
        area: areaInHectares,
        crop: selectedCrop.name,
        season: formData.season,
        date: new Date().toISOString(),
        costBreakdown: {
          production: productionCost * areaInHectares,
          additional: additionalCosts
        }
      };

      setResult(calculationResult);
      setActiveTab('results');
      
      // Auto-scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
    } catch (error) {
      console.error('Calculation error:', error);
      alert(error.message || 'An error occurred during calculation');
    } finally {
      setIsLoading(false);
    }
  };

  const saveCalculation = () => {
    if (!result) return;
    
    const newCalculation = {
      id: Date.now(),
      ...result,
      notes: formData.notes
    };
    
    setSavedCalculations(prev => [newCalculation, ...prev].slice(0, 10)); // Keep last 10
  };

  const loadCalculation = (calculation) => {
    setFormData({
      ...defaultFormData,
      area: calculation.area.toString(),
      crop: calculation.crop,
      season: calculation.season,
      notes: calculation.notes || '',
      yieldPerHectare: calculation.yieldPerHectare.toString(),
      expectedPrice: calculation.pricePerUnit.toString()
    });
    setResult(calculation);
    setActiveTab('results');
  };

  const resetForm = () => {
    setFormData({
      ...defaultFormData,
      crop: crops[0].name,
      season: 'Kharif'
    });
    setResult(null);
    setActiveTab('calculator');
  };

  const selectedCrop = crops.find(c => c.name === formData.crop) || crops[0];
  const isFormValid = formData.area && parseFloat(formData.area) > 0;

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-700 to-green-600 text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full filter blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-green-500/20 rounded-full filter blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-white/90 mb-6 border border-white/20">
              <Calculator className="h-4 w-4 mr-2" />
              <span>Revenue Calculator</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Plan Your Farming Revenue
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto md:mx-0 mb-8">
              Estimate your potential farming revenue based on crop type, land area, and current market prices. 
              Make informed decisions to maximize your profits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                size="lg" 
                className="bg-white text-green-700 hover:bg-green-50 font-medium shadow-lg hover:shadow-xl transition-all"
                onClick={() => {
                  document.getElementById('calculator-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start Calculating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                onClick={() => setActiveTab('history')}
              >
                View History
                <BarChart3 className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Stats Bar */}
        <div className="bg-white/5 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3">
                <div className="text-2xl font-bold text-white">8+</div>
                <div className="text-sm text-green-100">Crop Types</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-bold text-white">Real-time</div>
                <div className="text-sm text-green-100">Market Prices</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-bold text-white">Save</div>
                <div className="text-sm text-green-100">Your Calculations</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-bold text-white">Detailed</div>
                <div className="text-sm text-green-100">Revenue Analysis</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/[lang]/calculators" as={`/${lang}/calculators`} className="inline-flex items-center text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Calculators
          </Link>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-2">Revenue Calculator</h1>
          <p className="text-gray-600 dark:text-gray-300">Estimate your farm's potential revenue based on crop selection and market conditions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-12 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto bg-white/80 backdrop-blur-sm border border-gray-200 p-1 rounded-xl shadow-sm">
            <TabsTrigger 
              value="calculator" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-green-700 rounded-lg"
            >
              <Calculator className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Calculator</span>
            </TabsTrigger>
            <TabsTrigger 
              value="results" 
              disabled={!result}
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-green-700 rounded-lg"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Results</span>
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              disabled={savedCalculations.length === 0}
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-green-700 rounded-lg relative"
            >
              <Save className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">History</span>
              {savedCalculations.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-[10px] font-medium bg-green-600 text-white rounded-full">
                  {savedCalculations.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="mt-0">
            <div className="grid lg:grid-cols-3 gap-6">
              <motion.div
                id="calculator-form"
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Package className="h-5 w-5 text-green-600" />
                    Farm & Crop Details
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your farm details to calculate potential revenue
                  </p>
                </div>
                
                <form onSubmit={calculateRevenue} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Land Area */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="area" className="text-sm font-medium text-gray-700">
                          Land Area (Hectares)
                        </Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">Total area of land under cultivation in hectares. 1 hectare = 2.47 acres.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="relative">
                        <Input
                          id="area"
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={formData.area}
                          onChange={(e) => handleInputChange('area', e.target.value)}
                          placeholder="e.g. 2.5"
                          className="pl-10"
                          required
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ruler">
                            <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
                            <path d="m14.5 12.5 2-2"/>
                            <path d="m11.5 9.5 2-2"/>
                            <path d="m8.5 6.5 2-2"/>
                            <path d="m17.5 15.5 2-2"/>
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* Crop Selection */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="crop" className="text-sm font-medium text-gray-700">
                          Select Crop
                        </Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">Choose the crop you want to cultivate. We'll pre-fill average yield and price data.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Select
                        value={formData.crop}
                        onValueChange={(value) => handleInputChange('crop', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a crop" />
                        </SelectTrigger>
                        <SelectContent>
                          {cropCategories.map(category => (
                            <div key={category} className="mb-2">
                              <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {category}
                              </div>
                              {crops
                                .filter(crop => crop.category === category)
                                .map(crop => (
                                  <SelectItem key={crop.name} value={crop.name}>
                                    <div className="flex items-center gap-2">
                                      <span className="text-base">{crop.icon || '🌱'}</span>
                                      <div>
                                        <div className="font-medium">{crop.name}</div>
                                        <div className="text-xs text-gray-500">
                                          {crop.avgYield} t/ha • {formatCurrency(crop.avgPrice)}/t
                                        </div>
                                      </div>
                                    </div>
                                  </SelectItem>
                                ))}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                    
                  {/* Season Selection */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="season" className="text-sm font-medium text-gray-700">
                        Growing Season
                      </Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">Select the growing season for your crop.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select
                      value={formData.season}
                      onValueChange={(value) => handleInputChange('season', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCrop.season.map(season => (
                          <SelectItem key={season} value={season}>
                            {season}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
                      disabled={!isFormValid || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        <>
                          Calculate Revenue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
              
              {/* Results Preview */}
              <div className="lg:sticky lg:top-6 h-fit">
                <Card className="border-0 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Revenue Preview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {result ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-green-600 font-medium">Total Revenue</p>
                            <p className="text-2xl font-bold text-green-700">{formatCurrency(result.revenue)}</p>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-blue-600 font-medium">Total Cost</p>
                            <p className="text-2xl font-bold text-blue-700">{formatCurrency(result.cost)}</p>
                          </div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <p className="text-sm text-yellow-700 font-medium">Estimated Profit</p>
                          <p className="text-2xl font-bold text-yellow-800">
                            {formatCurrency(result.profit)}
                            <span className={`ml-2 text-sm font-normal ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              ({result.profitMargin.toFixed(1)}% margin)
                            </span>
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full border-green-200 text-green-700 hover:bg-green-50"
                          onClick={saveCalculation}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Calculation
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Calculator className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                        <p>Enter your farm details to see the revenue estimate</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="mt-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {result ? (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Revenue Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Production Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Crop:</span>
                            <span className="font-medium">{result.crop}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Season:</span>
                            <span className="font-medium">{result.season}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Land Area:</span>
                            <span className="font-medium">{result.area} hectares</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Yield:</span>
                            <span className="font-medium">{result.yieldPerHectare} t/ha</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Production:</span>
                            <span className="font-medium">{formatNumber(result.production)} t</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Water Requirement:</span>
                            <span className="font-medium">{formatNumber(result.waterRequired)} m³</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Financial Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price per ton:</span>
                            <span className="font-medium">{formatCurrency(result.pricePerUnit)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Production Cost:</span>
                            <span className="font-medium">{formatCurrency(result.costBreakdown.production)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Additional Costs:</span>
                            <span className="font-medium">{formatCurrency(result.costBreakdown.additional)}</span>
                          </div>
                          <div className="h-px bg-gray-200 my-2" />
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Total Revenue:</span>
                            <span className="text-green-600">{formatCurrency(result.revenue)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Total Cost:</span>
                            <span className="text-blue-600">{formatCurrency(result.cost)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Net Profit:</span>
                            <span className={result.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {formatCurrency(result.profit)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6 flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('calculator')}
                    >
                      Back to Calculator
                    </Button>
                    <Button 
                      onClick={saveCalculation}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Calculation
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <BarChart3 className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                  <p>Calculate your revenue to see detailed results</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {savedCalculations.length > 0 ? (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Saved Calculations</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to clear all saved calculations?')) {
                          setSavedCalculations([]);
                          localStorage.removeItem('savedRevenueCalculations');
                        }
                      }}
                      disabled={savedCalculations.length === 0}
                    >
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {savedCalculations.map(calc => (
                      <Card key={calc.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Crop</p>
                              <p className="font-medium">{calc.crop}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Date</p>
                              <p className="font-medium">{new Date(calc.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Profit</p>
                              <p className={`font-medium ${calc.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(calc.profit)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => loadCalculation(calc)}
                            >
                              View Details
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this calculation?')) {
                                  setSavedCalculations(prev => prev.filter(c => c.id !== calc.id));
                                }
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Save className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                  <p>No saved calculations yet</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default RevenueCalculatorClient;