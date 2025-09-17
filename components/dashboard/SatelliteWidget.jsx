'use client';

import { useState, useEffect } from 'react';
import { Satellite, TrendingUp, TrendingDown, Minus, AlertTriangle, Eye, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import satelliteService from '@/lib/satelliteService';

const SatelliteWidget = ({ farmLocation, onViewDetails }) => {
  const [loading, setLoading] = useState(true);
  const [satelliteData, setSatelliteData] = useState(null);
  const [cropHealth, setCropHealth] = useState(null);
  const [vegetationIndices, setVegetationIndices] = useState(null);

  useEffect(() => {
    if (farmLocation) {
      fetchSatelliteData();
    }
  }, [farmLocation]);

  const fetchSatelliteData = async () => {
    setLoading(true);
    try {
      // Use default coordinates if no farm location provided
      const coordinates = farmLocation?.coordinates || [77.2090, 28.6139];
      const cropType = farmLocation?.cropType || 'Mixed Crops';

      // Fetch crop health analysis
      const health = await satelliteService.getCropHealthAnalysis(coordinates, cropType);
      
      // Fetch vegetation indices
      const indices = await satelliteService.calculateVegetationIndices(
        coordinates,
        new Date().toISOString()
      );

      setCropHealth(health.success ? health.data : null);
      setVegetationIndices(indices.success ? indices.data : null);

    } catch (error) {
      console.error('Error fetching satellite data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'decreasing':
        return <TrendingDown className="h-3 w-3 text-red-600" />;
      default:
        return <Minus className="h-3 w-3 text-gray-600" />;
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

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header removed since it's now handled by parent container */}
      <div className="text-sm text-gray-600 mb-4">
        Real-time crop health analysis from satellite imagery
      </div>
      <div className="space-y-4">
        {/* Overall Health Score */}
        {cropHealth && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Health</span>
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
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold" style={{ color: cropHealth.overallHealth.color }}>
                {cropHealth.overallHealth.score}%
              </div>
              <div className="flex-1">
                <Progress
                  value={cropHealth.overallHealth.score}
                  className="h-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* Key Vegetation Indices */}
        {vegetationIndices && (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600">NDVI</span>
                {getTrendIcon(vegetationIndices.ndvi.trend)}
              </div>
              <div className="flex items-center space-x-2">
                <div 
                  className="text-sm font-semibold"
                  style={{ color: vegetationIndices.ndvi.color }}
                >
                  {vegetationIndices.ndvi.value.toFixed(3)}
                </div>
                <Progress
                  value={vegetationIndices.ndvi.value * 100}
                  className="h-1 flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600">NDWI</span>
                {getTrendIcon(vegetationIndices.ndwi.trend)}
              </div>
              <div className="flex items-center space-x-2">
                <div 
                  className="text-sm font-semibold"
                  style={{ color: vegetationIndices.ndwi.color }}
                >
                  {vegetationIndices.ndwi.value.toFixed(3)}
                </div>
                <Progress
                  value={vegetationIndices.ndwi.value * 100}
                  className="h-1 flex-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Active Alerts */}
        {cropHealth?.alerts && cropHealth.alerts.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-medium text-gray-600">Active Alerts</span>
            {cropHealth.alerts.slice(0, 2).map((alert, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg border text-xs ${getAlertColor(alert.severity)}`}
              >
                <div className="flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {alert.message}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Next Analysis */}
        {cropHealth?.nextAnalysis && (
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Next Analysis
              </div>
              <span className="font-medium">
                {new Date(cropHealth.nextAnalysis).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}

        {/* No Data State */}
        {!cropHealth && !loading && (
          <div className="text-center py-4">
            <Satellite className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No satellite data available</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={fetchSatelliteData}
            >
              Refresh Data
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SatelliteWidget;
