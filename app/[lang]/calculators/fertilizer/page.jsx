'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { t } from '@/translations';

// Crop types with their fertilizer requirements (kg/ha)
const CROP_TYPES = [
  { id: 'rice', name: 'Rice', npk: { n: 120, p: 60, k: 60 } },
  { id: 'wheat', name: 'Wheat', npk: { n: 150, p: 75, p: 60 } },
  { id: 'maize', name: 'Maize', npk: { n: 180, p: 90, k: 90 } },
  { id: 'sugarcane', name: 'Sugarcane', npk: { n: 250, p: 115, k: 115 } },
  { id: 'cotton', name: 'Cotton', npk: { n: 100, p: 50, k: 50 } },
  { id: 'soybean', name: 'Soybean', npk: { n: 20, p: 80, k: 40 } },
  { id: 'potato', name: 'Potato', npk: { n: 120, p: 60, k: 150 } },
];

// Fertilizer types with their NPK content (%)
const FERTILIZER_TYPES = [
  { id: 'urea', name: 'Urea', npk: { n: 46, p: 0, k: 0 } },
  { id: 'dap', name: 'DAP', npk: { n: 18, p: 46, k: 0 } },
  { id: 'mop', name: 'MOP', npk: { n: 0, p: 0, k: 60 } },
  { id: 'ssp', name: 'SSP', npk: { n: 0, p: 16, k: 0 } },
  { id: 'complex', name: 'Complex (10:26:26)', npk: { n: 10, p: 26, k: 26 } },
];

export default function FertilizerCalculator({ params: { lang } }) {
  const [area, setArea] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [soilTest, setSoilTest] = useState('no');
  const [soilN, setSoilN] = useState('');
  const [soilP, setSoilP] = useState('');
  const [soilK, setSoilK] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateFertilizer = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        const areaValue = parseFloat(area);
        if (!areaValue || areaValue <= 0) {
          throw new Error('Please enter a valid area');
        }

        const crop = CROP_TYPES.find(c => c.id === selectedCrop);
        if (!crop) {
          throw new Error('Please select a crop');
        }

        // Calculate fertilizer requirements (simplified calculation)
        const nReq = crop.npk.n * areaValue / 10000; // Convert to kg for the area
        const pReq = crop.npk.p * areaValue / 10000;
        const kReq = crop.npk.k * areaValue / 10000;

        // Calculate fertilizer quantities (simplified)
        const ureaQty = (nReq / 0.46).toFixed(2); // Urea has 46% N
        const dapQty = (pReq / 0.46).toFixed(2); // DAP has 46% P2O5
        const mopQty = (kReq / 0.60).toFixed(2); // MOP has 60% K2O

        setResult({
          npkRequirements: { n: nReq.toFixed(2), p: pReq.toFixed(2), k: kReq.toFixed(2) },
          fertilizerRecommendations: [
            { name: 'Urea (46-0-0)', quantity: ureaQty, unit: 'kg' },
            { name: 'DAP (18-46-0)', quantity: dapQty, unit: 'kg' },
            { name: 'MOP (0-0-60)', quantity: mopQty, unit: 'kg' },
          ],
          area: areaValue,
          crop: crop.name
        });
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const resetForm = () => {
    setArea('');
    setSelectedCrop('');
    setSoilTest('no');
    setSoilN('');
    setSoilP('');
    setSoilK('');
    setResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href={`/${lang}/calculators`} className="inline-flex items-center text-sm text-blue-600 hover:underline mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Calculators
        </Link>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-lg bg-green-50 text-green-600 mr-3">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fertilizer Calculator</h1>
            <p className="text-gray-600">Calculate the optimal amount of fertilizers for your crops</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Enter Farm Details</CardTitle>
              <CardDescription>
                Fill in the details below to get fertilizer recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateFertilizer}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="area">Land Area (square meters)</Label>
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

                  <div>
                    <Label htmlFor="crop">Crop Type</Label>
                    <Select value={selectedCrop} onValueChange={setSelectedCrop} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {CROP_TYPES.map((crop) => (
                          <SelectItem key={crop.id} value={crop.id}>
                            {crop.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Do you have soil test results?</Label>
                    <div className="flex space-x-4 mt-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          className="h-4 w-4 text-blue-600"
                          checked={soilTest === 'yes'}
                          onChange={() => setSoilTest('yes')}
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          className="h-4 w-4 text-blue-600"
                          checked={soilTest === 'no'}
                          onChange={() => setSoilTest('no')}
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>

                  {soilTest === 'yes' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="soilN">Soil N (kg/ha)</Label>
                        <Input
                          id="soilN"
                          type="number"
                          value={soilN}
                          onChange={(e) => setSoilN(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="soilP">Soil P (kg/ha)</Label>
                        <Input
                          id="soilP"
                          type="number"
                          value={soilP}
                          onChange={(e) => setSoilP(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="soilK">Soil K (kg/ha)</Label>
                        <Input
                          id="soilK"
                          type="number"
                          value={soilK}
                          onChange={(e) => setSoilK(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-2">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                      {loading ? 'Calculating...' : 'Calculate'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Reset
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          {result ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-sm bg-green-50">
                <CardHeader>
                  <CardTitle>Fertilizer Recommendations</CardTitle>
                  <CardDescription>
                    For {result.area} m² of {result.crop}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">NPK Requirements (kg)</h4>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{result.npkRequirements.n}</div>
                          <div className="text-xs text-gray-500">Nitrogen (N)</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{result.npkRequirements.p}</div>
                          <div className="text-xs text-gray-500">Phosphorus (P)</div>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg">
                          <div className="text-2xl font-bold text-amber-600">{result.npkRequirements.k}</div>
                          <div className="text-xs text-gray-500">Potassium (K)</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended Fertilizers</h4>
                      <div className="space-y-2">
                        {result.fertilizerRecommendations.map((item, index) => (
                          <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg border">
                            <span className="text-sm">{item.name}</span>
                            <span className="font-medium">{item.quantity} {item.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mt-4">
                      <p>Note: These are general recommendations. For more accurate results, consider soil testing.</p>
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
                    <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">1</div>
                    <p>Enter your land area in square meters</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">2</div>
                    <p>Select your crop type from the dropdown</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">3</div>
                    <p>Add soil test results if available (optional)</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">4</div>
                    <p>Click Calculate to get fertilizer recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
