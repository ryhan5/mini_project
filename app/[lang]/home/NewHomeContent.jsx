'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowRight, CheckCircle, Leaf, Shield, CloudRain, Droplet, BarChart2, Target } from 'lucide-react';
import Image from 'next/image';

export default function HomeContent() {
  const router = useRouter();
  const { t } = useTranslation();

  // Services data
  const services = [
    {
      title: 'Organic Solutions',
      description: 'Sustainable and eco-friendly farming practices',
      icon: <Leaf className="w-8 h-8 text-green-600" />
    },
    {
      title: 'Farm Management',
      description: 'Complete farm planning and management solutions',
      icon: <Target className="w-8 h-8 text-green-600" />
    },
    {
      title: 'Crop Protection',
      description: 'Protect your crops from pests and diseases',
      icon: <Shield className="w-8 h-8 text-green-600" />
    },
    {
      title: 'Weather Forecast',
      description: 'Accurate weather predictions for better planning',
      icon: <CloudRain className="w-8 h-8 text-green-600" />
    },
    {
      title: 'Irrigation',
      description: 'Efficient water management solutions',
      icon: <Droplet className="w-8 h-8 text-green-600" />
    },
    {
      title: 'Market Prices',
      description: 'Real-time crop prices and market trends',
      icon: <BarChart2 className="w-8 h-8 text-green-600" />
    }
  ];

  // Features data
  const features = [
    'Expert Guidance',
    'Quality Seeds',
    'Sustainable Practices',
    '24/7 Support',
    'Market Access',
    'Training Programs'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen flex items-center" style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Grow More With <span className="text-green-400">AgroSarthi</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Empowering farmers with smart agricultural solutions and expert guidance for better yields and sustainable farming.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-lg font-semibold px-8 py-6"
                onClick={() => router.push('/register')}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900 text-lg font-semibold px-8 py-6"
                onClick={() => router.push('/services')}
              >
                Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive agricultural solutions tailored to your farming needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-center">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose AgroSarthi?</h2>
              <p className="text-lg text-gray-600 mb-8">
                We are committed to providing the best agricultural solutions to help farmers succeed in their farming journey.
              </p>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                size="lg" 
                className="mt-8 bg-green-600 hover:bg-green-700 text-lg font-semibold px-8 py-6"
                onClick={() => router.push('/about')}
              >
                Learn More
              </Button>
            </div>
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              {/* Placeholder for feature image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Feature Image
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of farmers who are already benefiting from our agricultural solutions.
          </p>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-green-700 text-lg font-semibold px-8 py-6"
            onClick={() => router.push('/contact')}
          >
            Contact Us Today
          </Button>
        </div>
      </section>
    </div>
  );
}
