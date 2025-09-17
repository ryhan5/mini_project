'use client';

import { useState, useEffect } from 'react';
import { Satellite, Map, Activity, TrendingUp, TrendingDown, Minus, AlertTriangle, Eye, Download, Calendar, MapPin, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import satelliteService from '@/lib/satelliteService';

const SatelliteMonitoringClient = () => {
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [satelliteData, setSatelliteData] = useState(null);
  const [vegetationIndices, setVegetationIndices] = useState(null);
  const [cropHealth, setCropHealth] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageType, setSelectedImageType] = useState('RGB');

  // Mock farm locations - in production, this would come from user's farm data
  const farmLocations = [
    {
      id: 1,
      name: 'Main Farm - North Field',
      coordinates: [77.2090, 28.6139], // Delhi coordinates as example
      area: '5.2 hectares',
      cropType: 'Wheat',
      plantingDate: '2024-11-15'
    },
    {
      id: 2,
      name: 'Secondary Farm - South Field',
      coordinates: [77.2190, 28.6039],
      area: '3.8 hectares',
      cropType: 'Rice',
      plantingDate: '2024-06-20'
    },
    {
      id: 3,
      name: 'Organic Plot - East Field',
      coordinates: [77.2290, 28.6239],
      area: '2.1 hectares',
      cropType: 'Tomatoes',
      plantingDate: '2024-09-10'
    }
  ];

  useEffect(() => {
    // Auto-select first location on load
    if (farmLocations.length > 0) {
      handleLocationSelect(farmLocations[0]);
    }
  }, []);

  const handleLocationSelect = async (location) => {
    setLoading(true);
    setSelectedLocation(location);

    try {
      // Fetch satellite imagery
      const imagery = await satelliteService.getSatelliteImagery(location.coordinates, {
        startDate: '2024-01-01',
        endDate: new Date().toISOString().split('T')[0],
        cloudCover: 10,
        resolution: 10,
        bands: ['RGB', 'NDVI', 'NDWI']
      });

      // Fetch vegetation indices
      const indices = await satelliteService.calculateVegetationIndices(
        location.coordinates,
        new Date().toISOString()
      );

      // Fetch crop health analysis
      const health = await satelliteService.getCropHealthAnalysis(
        location.coordinates,
        location.cropType
      );

      // Fetch historical data
      const historical = await satelliteService.getHistoricalData(
        location.coordinates,
        12
      );

      setSatelliteData(imagery.success ? imagery.data : null);
      setVegetationIndices(indices.success ? indices.data : null);
      setCropHealth(health.success ? health.data : null);
      setHistoricalData(historical.success ? historical.data : null);

    } catch (error) {
      console.error('Error fetching satellite data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  if (loading && !selectedLocation) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading satellite data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <Satellite className="h-8 w-8 mr-3" />
              <h1 className="text-3xl font-bold">Satellite Crop Monitoring</h1>
            </div>
            <p className="text-blue-100">
              Monitor crop health and field conditions using advanced satellite imagery and vegetation analysis.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-8">
        {/* Farm Location Selector */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Select Farm Location
            </CardTitle>
            <CardDescription>
              Choose a farm location to view satellite monitoring data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {farmLocations.map((location) => (
                <Card
                  key={location.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedLocation?.id === location.id
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleLocationSelect(location)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2">{location.name}</h3>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>Area: {location.area}</p>
                      <p>Crop: {location.cropType}</p>
                      <p>Planted: {new Date(location.plantingDate).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedLocation && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="imagery">Satellite Images</TabsTrigger>
              <TabsTrigger value="analysis">Vegetation Analysis</TabsTrigger>
              <TabsTrigger value="trends">Historical Trends</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <>
                  {/* Crop Health Summary */}
                  {cropHealth && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Overall Health Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-4">
                            <div className="text-3xl font-bold" style={{ color: cropHealth.overallHealth.color }}>
                              {cropHealth.overallHealth.score}%
                            </div>
                            <div>
                              <Badge
                                variant="outline"
                                style={{
                                  borderColor: cropHealth.overallHealth.color,
                                  color: cropHealth.overallHealth.color
                                }}
                              >
                                {cropHealth.overallHealth.status}
                              </Badge>
                            </div>
                          </div>
                          <Progress
                            value={cropHealth.overallHealth.score}
                            className="mt-3"
                            style={{ '--progress-background': cropHealth.overallHealth.color }}
                          />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Active Alerts</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {cropHealth.alerts.length > 0 ? (
                              cropHealth.alerts.map((alert, index) => (
                                <div
                                  key={index}
                                  className={`p-2 rounded-lg border text-sm ${getAlertColor(alert.severity)}`}
                                >
                                  <div className="flex items-center">
                                    <AlertTriangle className="h-4 w-4 mr-2" />
                                    {alert.message}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500 text-sm">No active alerts</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Next Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">
                              {new Date(cropHealth.nextAnalysis).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            Automatic satellite analysis scheduled
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Recommendations */}
                  {cropHealth?.recommendations && cropHealth.recommendations.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>AI Recommendations</CardTitle>
                        <CardDescription>
                          Based on satellite data analysis
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {cropHealth.recommendations.map((rec, index) => (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border-l-4 ${
                                rec.priority === 'high'
                                  ? 'border-red-500 bg-red-50'
                                  : rec.priority === 'medium'
                                  ? 'border-yellow-500 bg-yellow-50'
                                  : 'border-blue-500 bg-blue-50'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="font-medium capitalize">{rec.type} Recommendation</h4>
                                  <p className="text-sm text-gray-700 mt-1">{rec.message}</p>
                                  <p className="text-sm font-medium mt-2">Action: {rec.action}</p>
                                </div>
                                <Badge
                                  variant={rec.priority === 'high' ? 'destructive' : 'secondary'}
                                >
                                  {rec.priority}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </TabsContent>

            {/* Satellite Images Tab */}
            <TabsContent value="imagery" className="space-y-6">
              {satelliteData && (
                <>
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Satellite Imagery</CardTitle>
                          <CardDescription>
                            Latest satellite images for {selectedLocation.name}
                          </CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex space-x-2">
                          {satelliteData.images.map((image) => (
                            <Button
                              key={image.type}
                              variant={selectedImageType === image.type ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setSelectedImageType(image.type)}
                            >
                              <Layers className="h-4 w-4 mr-2" />
                              {image.type}
                            </Button>
                          ))}
                        </div>
                        
                        <div className="bg-gray-100 rounded-lg p-8 text-center">
                          <div className="bg-white rounded-lg p-6 inline-block">
                            <Satellite className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">{selectedImageType} Satellite Image</h3>
                            <p className="text-sm text-gray-600 mb-4">
                              {selectedImageType === 'RGB' && 'True color composite showing actual field appearance'}
                              {selectedImageType === 'NDVI' && 'Vegetation health index highlighting crop vigor'}
                              {selectedImageType === 'NDWI' && 'Water content analysis showing irrigation status'}
                            </p>
                            <div className="text-xs text-gray-500 space-y-1">
                              <p>Resolution: 10m per pixel</p>
                              <p>Date: {new Date().toLocaleDateString()}</p>
                              <p>Cloud Cover: &lt;10%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            {/* Vegetation Analysis Tab */}
            <TabsContent value="analysis" className="space-y-6">
              {vegetationIndices && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(vegetationIndices).map(([key, data]) => (
                    <Card key={key}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg uppercase">{key}</CardTitle>
                        <CardDescription>{data.interpretation}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-2xl font-bold" style={{ color: data.color }}>
                            {data.value.toFixed(3)}
                          </div>
                          <div className="flex items-center space-x-1">
                            {getTrendIcon(data.trend)}
                            <span className="text-sm text-gray-600 capitalize">{data.trend}</span>
                          </div>
                        </div>
                        <Progress
                          value={data.value * 100}
                          className="mb-2"
                          style={{ '--progress-background': data.color }}
                        />
                        <p className="text-xs text-gray-600">
                          Range: {key === 'ndvi' ? '-1 to +1' : '0 to 1'} | 
                          Higher values indicate better {key === 'ndwi' ? 'water content' : 'vegetation health'}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Historical Trends Tab */}
            <TabsContent value="trends" className="space-y-6">
              {historicalData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Historical Vegetation Trends</CardTitle>
                    <CardDescription>
                      12-month vegetation health and water content trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 rounded-lg p-8 text-center">
                      <Activity className="h-16 w-16 text-green-600 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Trend Analysis Chart</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Interactive chart showing NDVI, NDWI, and weather correlation over time
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div>
                          <p className="font-medium">Avg NDVI</p>
                          <p className="text-green-600">0.652</p>
                        </div>
                        <div>
                          <p className="font-medium">Avg NDWI</p>
                          <p className="text-blue-600">0.284</p>
                        </div>
                        <div>
                          <p className="font-medium">Best Month</p>
                          <p className="text-gray-700">March 2024</p>
                        </div>
                        <div>
                          <p className="font-medium">Data Points</p>
                          <p className="text-gray-700">{historicalData.length}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default SatelliteMonitoringClient;
