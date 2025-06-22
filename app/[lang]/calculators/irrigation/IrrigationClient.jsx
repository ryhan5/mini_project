'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Droplets, 
  ArrowLeft, 
  Info, 
  Loader2, 
  CloudRain,
  Sun,
  Thermometer,
  Wind,
  Droplet,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

// Crop data with water requirements (mm/day)
const CROP_DATA = [
  { id: 'rice', name: 'Rice', waterRequirement: 4.5, growthPeriod: 120 },
  { id: 'wheat', name: 'Wheat', waterRequirement: 3.5, growthPeriod: 140 },
  { id: 'maize', name: 'Maize', waterRequirement: 5.0, growthPeriod: 100 },
  { id: 'cotton', name: 'Cotton', waterRequirement: 6.0, growthPeriod: 180 },
  { id: 'sugarcane', name: 'Sugarcane', waterRequirement: 7.0, growthPeriod: 365 },
  { id: 'potato', name: 'Potato', waterRequirement: 4.0, growthPeriod: 110 },
  { id: 'tomato', name: 'Tomato', waterRequirement: 4.5, growthPeriod: 90 },
  { id: 'onion', name: 'Onion', waterRequirement: 3.5, growthPeriod: 150 },
];

// Soil types with water holding capacity (mm/m)
const SOIL_TYPES = [
  { id: 'sandy', name: 'Sandy', capacity: 50, infiltration: 20 },
  { id: 'loamy', name: 'Loamy', capacity: 150, infiltration: 10 },
  { id: 'clay', name: 'Clay', capacity: 250, infiltration: 5 },
  { id: 'silt', name: 'Silt', capacity: 200, infiltration: 8 },
];

// Irrigation methods with efficiency (%)
const IRRIGATION_METHODS = [
  { id: 'drip', name: 'Drip', efficiency: 90, description: 'Most efficient, delivers water directly to plant roots' },
  { id: 'sprinkler', name: 'Sprinkler', efficiency: 75, description: 'Good coverage but loses water to evaporation' },
  { id: 'furrow', name: 'Furrow', efficiency: 65, description: 'Traditional method with lower efficiency' },
  { id: 'flood', name: 'Flood', efficiency: 50, description: 'Least efficient, high water loss' },
];

export default function IrrigationClient({ lang = 'en' }) {
  // Form state
  const [area, setArea] = useState('');
  const [crop, setCrop] = useState('');
  const [soilType, setSoilType] = useState('');
  const [irrigationMethod, setIrrigationMethod] = useState('');
  const [effectiveRainfall, setEffectiveRainfall] = useState(0);
  const [et0, setEt0] = useState(5); // Reference evapotranspiration (mm/day)
  const [kc, setKc] = useState(1); // Crop coefficient
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate water requirements
  const calculateIrrigation = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate inputs
      if (!area || !crop || !soilType || !irrigationMethod) {
        throw new Error('Please fill in all required fields');
      }

      const areaValue = parseFloat(area);
      if (isNaN(areaValue) || areaValue <= 0) {
        throw new Error('Please enter a valid area');
      }

      // Get crop data
      const cropData = CROP_DATA.find(c => c.id === crop);
      if (!cropData) throw new Error('Invalid crop selected');

      // Get soil data
      const soilData = SOIL_TYPES.find(s => s.id === soilType);
      if (!soilData) throw new Error('Invalid soil type');

      // Get irrigation method data
      const methodData = IRRIGATION_METHODS.find(m => m.id === irrigationMethod);
      if (!methodData) throw new Error('Invalid irrigation method');

      // Calculate crop water requirement (mm/day)
      const cropEt = et0 * kc; // Crop evapotranspiration
      const irrigationNeed = Math.max(0, cropEt - effectiveRainfall); // Net irrigation requirement
      
      // Adjust for irrigation efficiency
      const grossIrrigation = irrigationNeed / (methodData.efficiency / 100);
      
      // Calculate total water volume (m³)
      const waterVolume = (grossIrrigation * areaValue) / 1000; // Convert to m³
      
      // Calculate irrigation interval based on soil water holding capacity
      const irrigationInterval = Math.floor((soilData.capacity * 0.7) / cropEt); // 70% of available water
      
      // Calculate irrigation duration (hours)
      const applicationRate = 10; // mm/hour (example value, would vary by system)
      const irrigationDuration = grossIrrigation / applicationRate;

      setResult({
        cropName: cropData.name,
        soilName: soilData.name,
        methodName: methodData.name,
        methodEfficiency: methodData.efficiency,
        cropWaterRequirement: cropEt.toFixed(1),
        netIrrigation: irrigationNeed.toFixed(1),
        grossIrrigation: grossIrrigation.toFixed(1),
        waterVolume: waterVolume.toFixed(2),
        irrigationInterval: Math.max(1, irrigationInterval),
        irrigationDuration: irrigationDuration.toFixed(1),
        nextIrrigation: new Date(Date.now() + irrigationInterval * 24 * 60 * 60 * 1000).toLocaleDateString()
      });

    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setArea('');
    setCrop('');
    setSoilType('');
    setIrrigationMethod('');
    setEffectiveRainfall(0);
    setEt0(5);
    setKc(1);
    setResult(null);
    setError('');
  };

  // Update Kc based on crop growth stage
  useEffect(() => {
    if (crop) {
      // In a real app, you'd have more sophisticated Kc values by growth stage
      const cropData = CROP_DATA.find(c => c.id === crop);
      if (cropData) {
        // Simple approximation - adjust based on crop type
        setKc(cropData.waterRequirement / 5); // Rough estimate
      }
    }
  }, [crop]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href={`/${lang}/calculators`} className="inline-flex items-center text-sm text-blue-600 hover:underline mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Calculators
        </Link>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Irrigation Calculator</h1>
            <p className="text-gray-600">Calculate optimal irrigation schedule and water requirements for your crops</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Irrigation Parameters</CardTitle>
              <CardDescription>
                Enter your farm details to calculate irrigation requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateIrrigation} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Field Area */}
                  <div>
                    <Label htmlFor="area" className="flex items-center">
                      Field Area (m²)
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Enter the total area of your field in square meters</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="e.g., 1000"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="mt-1"
                      required
                      min="1"
                      step="0.01"
                    />
                  </div>

                  {/* Crop Selection */}
                  <div>
                    <Label htmlFor="crop">Crop Type</Label>
                    <Select value={crop} onValueChange={setCrop} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {CROP_DATA.map((crop) => (
                          <SelectItem key={crop.id} value={crop.id}>
                            {crop.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Soil Type */}
                  <div>
                    <Label htmlFor="soil">Soil Type</Label>
                    <Select value={soilType} onValueChange={setSoilType} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        {SOIL_TYPES.map((soil) => (
                          <SelectItem key={soil.id} value={soil.id}>
                            {soil.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Irrigation Method */}
                  <div>
                    <Label htmlFor="method">Irrigation Method</Label>
                    <Select value={irrigationMethod} onValueChange={setIrrigationMethod} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select irrigation method" />
                      </SelectTrigger>
                      <SelectContent>
                        {IRRIGATION_METHODS.map((method) => (
                          <SelectItem key={method.id} value={method.id}>
                            <div>
                              <div>{method.name}</div>
                              <div className="text-xs text-gray-500">{method.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Effective Rainfall */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <Label htmlFor="rainfall">
                        <div className="flex items-center">
                          Effective Rainfall (mm/day)
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4 ml-1 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Average daily rainfall that is available to the crop (after runoff and percolation)</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </Label>
                      <span className="text-sm font-medium">{effectiveRainfall} mm/day</span>
                    </div>
                    <Slider
                      id="rainfall"
                      min={0}
                      max={20}
                      step={0.5}
                      value={[effectiveRainfall]}
                      onValueChange={([value]) => setEffectiveRainfall(value)}
                      className="mb-2"
                    />
                  </div>

                  {/* Reference Evapotranspiration (ET0) */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <Label htmlFor="et0">
                        <div className="flex items-center">
                          Reference Evapotranspiration (ET₀)
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4 ml-1 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Reference evapotranspiration rate for your region (mm/day)</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </Label>
                      <span className="text-sm font-medium">{et0} mm/day</span>
                    </div>
                    <Slider
                      id="et0"
                      min={1}
                      max={15}
                      step={0.5}
                      value={[et0]}
                      onValueChange={([value]) => setEt0(value)}
                      className="mb-2"
                    />
                  </div>

                  {/* Crop Coefficient (Kc) */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <Label htmlFor="kc">
                        <div className="flex items-center">
                          Crop Coefficient (Kc)
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4 ml-1 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Crop coefficient based on growth stage (0-1.3)</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </Label>
                      <span className="text-sm font-medium">{kc.toFixed(2)}</span>
                    </div>
                    <Slider
                      id="kc"
                      min={0.2}
                      max={1.3}
                      step={0.05}
                      value={[kc]}
                      onValueChange={([value]) => setKc(value)}
                      className="mb-2"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md flex items-start">
                    <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex space-x-3 pt-2">
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Calculating...
                      </>
                    ) : 'Calculate'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                    disabled={loading}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          {result ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-sm bg-blue-50">
                <CardHeader>
                  <CardTitle>Irrigation Plan</CardTitle>
                  <CardDescription>
                    Recommendations for {result.cropName} on {result.soilName} soil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Droplet className="w-4 h-4 mr-2 text-blue-500" />
                        Crop Water Requirement
                      </span>
                      <span className="font-medium">{result.cropWaterRequirement} mm/day</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <CloudRain className="w-4 h-4 mr-2 text-blue-400" />
                        Net Irrigation Required
                      </span>
                      <span className="font-medium">{result.netIrrigation} mm/day</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Droplets className="w-4 h-4 mr-2 text-blue-400" />
                        Gross Irrigation (with {result.methodEfficiency}% efficiency)
                      </span>
                      <span className="font-medium">{result.grossIrrigation} mm/day</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Droplets className="w-4 h-4 mr-2 text-blue-400" />
                        Total Water Volume
                      </span>
                      <span className="font-medium">{result.waterVolume} m³/day</span>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-blue-100">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-blue-600" />
                        Irrigation Schedule
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Interval</span>
                          <span className="font-medium">Every {result.irrigationInterval} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Duration per session</span>
                          <span className="font-medium">{result.irrigationDuration} hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Next irrigation</span>
                          <span className="font-medium">{result.nextIrrigation}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-blue-100">
                      <div className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-600">
                          Based on current conditions, apply {result.grossIrrigation} mm of water every {result.irrigationInterval} days to maintain optimal soil moisture for {result.cropName}.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="border-0 shadow-sm bg-gray-50">
              <CardHeader>
                <CardTitle>How to use</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">1</div>
                    <p>Enter your field area and select your crop type</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">2</div>
                    <p>Select your soil type and irrigation method</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">3</div>
                    <p>Adjust weather parameters if needed</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">4</div>
                    <p>Click Calculate to get your irrigation recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Water Saving Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-1.5 rounded-full mr-3 mt-0.5">
                  <Droplets className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Water early in the morning or late in the evening to reduce evaporation losses.
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-1.5 rounded-full mr-3 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Use mulch to retain soil moisture and reduce water needs by up to 25%.
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-amber-100 p-1.5 rounded-full mr-3 mt-0.5">
                  <Info className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Consider upgrading to drip irrigation for water savings of 30-50% compared to traditional methods.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
