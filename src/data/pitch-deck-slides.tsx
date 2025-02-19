
import React from 'react';

export const slides = [
  {
    title: "Alerts.Company",
    subtitle: "Real-Time Insights, Delivered Instantly",
    date: "February 19, 2025",
    content: (
      <div className="space-y-4">
        <p className="text-xl">Presented by: [Your Name]</p>
        <p className="text-xl">Founder & CEO</p>
        <div className="mt-8">
          <p>Contact: info@alerts.company</p>
          <p>www.alerts.company</p>
        </div>
      </div>
    ),
    visual: (
      <div className="flex items-center justify-center h-full">
        {/* Placeholder for the logo */}
        <div className="w-64 h-64 bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] rounded-full flex items-center justify-center">
          <span className="text-6xl">A.</span>
        </div>
      </div>
    ),
    slideNumber: 1
  },
  {
    title: "In a Fast-Moving World, Information Delays Cost Opportunities",
    subtitle: "The Problem",
    content: (
      <ul className="list-disc list-inside space-y-4 text-lg">
        <li>Businesses and individuals miss critical updates due to slow, manual monitoring processes</li>
        <li>Existing solutions lack real-time accuracy, customization, and multi-channel delivery</li>
        <li>Examples: Missed competitor moves, delayed market signals, unnoticed regulatory changes</li>
      </ul>
    ),
    visual: (
      <div className="flex items-center justify-center h-full opacity-80">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 animate-ping bg-[#9b87f5] rounded-full opacity-20"></div>
          <div className="relative flex items-center justify-center w-full h-full">
            <svg className="w-32 h-32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path strokeWidth="2" d="M12 6v6l4 2"/>
            </svg>
          </div>
        </div>
      </div>
    ),
    slideNumber: 2
  },
  // ... We'll continue with more slides, but for now let's test with these two
];
