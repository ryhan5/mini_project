'use client';

import React from 'react';

export default function WeatherTile() {
  return (
    <div className="flex items-center">
      <div className="mr-4 flex-shrink-0">
        <WeatherIcon className="h-16 w-16 text-yellow-500" />
        <p className="text-4xl font-bold text-gray-900 mt-1">32°C</p>
      </div>
      
      <div className="flex-1">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Humidity</span>
            <span className="font-medium text-gray-900">65%</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Wind</span>
            <span className="font-medium text-gray-900">12 km/h</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">UV Index</span>
            <span className="font-medium text-gray-900">High</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Precipitation</span>
            <span className="font-medium text-gray-900">0%</span>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2 text-xs">
          <div className="flex flex-col items-center">
            <span className="text-gray-500">Mon</span>
            <CloudIcon className="h-6 w-6 my-1 text-gray-400" />
            <span className="font-medium">29°</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-gray-500">Tue</span>
            <SunIcon className="h-6 w-6 my-1 text-yellow-500" />
            <span className="font-medium">31°</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-gray-500">Wed</span>
            <SunIcon className="h-6 w-6 my-1 text-yellow-500" />
            <span className="font-medium">33°</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-gray-500">Thu</span>
            <CloudRainIcon className="h-6 w-6 my-1 text-blue-500" />
            <span className="font-medium">28°</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-gray-500">Fri</span>
            <CloudIcon className="h-6 w-6 my-1 text-gray-400" />
            <span className="font-medium">30°</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Weather Icons
function WeatherIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2" />
      <path d="M12 21v2" />
      <path d="M4.22 4.22l1.42 1.42" />
      <path d="M18.36 18.36l1.42 1.42" />
      <path d="M1 12h2" />
      <path d="M21 12h2" />
      <path d="M4.22 19.78l1.42-1.42" />
      <path d="M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function CloudIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function SunIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function CloudRainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M16 14v6" />
      <path d="M8 14v6" />
      <path d="M12 16v6" />
    </svg>
  );
}