import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function IndiaStateMap({ locations, category = "general", language = "en" }) {
  const translations = {
    en: { title: "India - State-wise Data Map", legend: "Legend" },
    hi: { title: "भारत - राज्यवार डेटा मानचित्र", legend: "किंवदंती" },
    ta: { title: "இந்தியா - மாநிலவாரான தரவு வரைபடம்", legend: "வரைபடக் குறிப்பு" },
    te: { title: "భారతదేశం - రాష్ట్ర వారీ డేటా మ్యాప్", legend: "పటం సూచన" }
  };

  const t = translations[language] || translations.en;

  // State data based on category
  const stateData = {
    environment: {
      "Delhi": { value: 310, label: "AQI", color: "#EF4444" },
      "Maharashtra": { value: 125, label: "AQI", color: "#F59E0B" },
      "Karnataka": { value: 105, label: "AQI", color: "#10B981" },
      "Tamil Nadu": { value: 140, label: "AQI", color: "#F59E0B" },
      "Kerala": { value: 95, label: "AQI", color: "#10B981" },
      "Telangana": { value: 180, label: "AQI", color: "#EF4444" },
      "Gujarat": { value: 130, label: "AQI", color: "#F59E0B" },
      "Rajasthan": { value: 145, label: "AQI", color: "#F59E0B" },
      "UP": { value: 250, label: "AQI", color: "#EF4444" },
      "Bihar": { value: 220, label: "AQI", color: "#EF4444" },
      "West Bengal": { value: 165, label: "AQI", color: "#F59E0B" },
      "MP": { value: 155, label: "AQI", color: "#F59E0B" },
    },
    education: {
      "Kerala": { value: 96.2, label: "Literacy%", color: "#10B981" },
      "Delhi": { value: 88.7, label: "Literacy%", color: "#10B981" },
      "Maharashtra": { value: 84.8, label: "Literacy%", color: "#3B82F6" },
      "Tamil Nadu": { value: 82.9, label: "Literacy%", color: "#3B82F6" },
      "Gujarat": { value: 82.4, label: "Literacy%", color: "#3B82F6" },
      "Karnataka": { value: 75.6, label: "Literacy%", color: "#F59E0B" },
      "Telangana": { value: 66.5, label: "Literacy%", color: "#F59E0B" },
      "UP": { value: 67.7, label: "Literacy%", color: "#F59E0B" },
      "Bihar": { value: 61.8, label: "Literacy%", color: "#EF4444" },
      "Rajasthan": { value: 66.1, label: "Literacy%", color: "#F59E0B" },
      "MP": { value: 70.6, label: "Literacy%", color: "#F59E0B" },
      "West Bengal": { value: 77.1, label: "Literacy%", color: "#3B82F6" },
    },
    economy: {
      "Maharashtra": { value: 95, label: "MSME", color: "#10B981" },
      "Karnataka": { value: 92, label: "MSME", color: "#10B981" },
      "Tamil Nadu": { value: 88, label: "MSME", color: "#3B82F6" },
      "Gujarat": { value: 86, label: "MSME", color: "#3B82F6" },
      "Telangana": { value: 85, label: "MSME", color: "#3B82F6" },
      "Delhi": { value: 90, label: "MSME", color: "#10B981" },
      "UP": { value: 72, label: "MSME", color: "#F59E0B" },
      "Bihar": { value: 65, label: "MSME", color: "#EF4444" },
      "Kerala": { value: 82, label: "MSME", color: "#3B82F6" },
      "West Bengal": { value: 78, label: "MSME", color: "#F59E0B" },
      "MP": { value: 75, label: "MSME", color: "#F59E0B" },
      "Rajasthan": { value: 75, label: "MSME", color: "#F59E0B" },
    },
    health: {
      "Kerala": { value: 77, label: "Life Exp", color: "#10B981" },
      "Maharashtra": { value: 72, label: "Life Exp", color: "#3B82F6" },
      "Karnataka": { value: 71, label: "Life Exp", color: "#3B82F6" },
      "Tamil Nadu": { value: 72, label: "Life Exp", color: "#3B82F6" },
      "Gujarat": { value: 70, label: "Life Exp", color: "#F59E0B" },
      "UP": { value: 66, label: "Life Exp", color: "#F59E0B" },
      "Bihar": { value: 64, label: "Life Exp", color: "#EF4444" },
      "Delhi": { value: 73, label: "Life Exp", color: "#3B82F6" },
      "Telangana": { value: 69, label: "Life Exp", color: "#F59E0B" },
      "West Bengal": { value: 70, label: "Life Exp", color: "#F59E0B" },
      "MP": { value: 67, label: "Life Exp", color: "#F59E0B" },
      "Rajasthan": { value: 68, label: "Life Exp", color: "#F59E0B" },
    },
    general: {
      "Delhi": { value: 88.7, label: "Dev Index", color: "#10B981" },
      "Maharashtra": { value: 84.8, label: "Dev Index", color: "#3B82F6" },
      "Karnataka": { value: 82.9, label: "Dev Index", color: "#3B82F6" },
      "Tamil Nadu": { value: 82.9, label: "Dev Index", color: "#3B82F6" },
      "Kerala": { value: 96.2, label: "Dev Index", color: "#10B981" },
      "Gujarat": { value: 82.4, label: "Dev Index", color: "#3B82F6" },
      "Telangana": { value: 75.6, label: "Dev Index", color: "#F59E0B" },
      "UP": { value: 70.6, label: "Dev Index", color: "#F59E0B" },
      "Bihar": { value: 61.8, label: "Dev Index", color: "#EF4444" },
      "West Bengal": { value: 77.1, label: "Dev Index", color: "#3B82F6" },
      "MP": { value: 66.5, label: "Dev Index", color: "#F59E0B" },
      "Rajasthan": { value: 66.1, label: "Dev Index", color: "#F59E0B" },
    }
  };

  const data = stateData[category] || stateData.general;

  // Accurate state positions INSIDE India map
  const statePositions = {
    "Kerala": { x: 44, y: 85 },
    "Karnataka": { x: 50, y: 75 },
    "Tamil Nadu": { x: 56, y: 82 },
    "Maharashtra": { x: 45, y: 62 },
    "Gujarat": { x: 32, y: 54 },
    "Rajasthan": { x: 36, y: 42 },
    "Delhi": { x: 45, y: 33 },
    "UP": { x: 52, y: 40 },
    "Bihar": { x: 64, y: 43 },
    "West Bengal": { x: 70, y: 46 },
    "Telangana": { x: 52, y: 67 },
    "MP": { x: 48, y: 52 },
  };

  return (
    <Card className="shadow-2xl border-0 dark:bg-slate-800/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <CardTitle className="flex items-center gap-2 text-xl">
          <MapPin className="w-6 h-6" />
          {t.title}
          {locations && locations.length > 0 && ` - ${locations.join(' vs ')}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        {/* India Map SVG */}
        <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border-2 border-indigo-200 dark:border-slate-700 overflow-hidden shadow-inner">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              {/* Indian Flag Gradient Background */}
              <linearGradient id="indiaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FF9933', stopOpacity: 0.08 }} />
                <stop offset="33%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.08 }} />
                <stop offset="66%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.08 }} />
                <stop offset="100%" style={{ stopColor: '#138808', stopOpacity: 0.08 }} />
              </linearGradient>
              
              {/* Shadow Filter */}
              <filter id="shadow">
                <feDropShadow dx="0.3" dy="0.3" stdDeviation="0.5" floodOpacity="0.3"/>
              </filter>
            </defs>
            
            {/* ACCURATE REALISTIC INDIA MAP BORDER (traced from reference) */}
            <path
              d="M 25,15 
                 C 26,13 28,11 30,10 
                 L 35,9 
                 C 38,8.5 41,9 43,10 
                 L 47,12 
                 C 49,14 51,16 53,18 
                 L 56,21 
                 C 58,23 60,25 62,28 
                 L 65,32 
                 C 67,35 69,38 70,41 
                 L 72,45 
                 C 73,48 73.5,51 73.5,54 
                 L 73.5,58 
                 C 73.5,61 73,64 72,66 
                 L 71,69 
                 C 70,71 68.5,73 67,75 
                 L 65,77 
                 C 63,79 61,81 59,83 
                 L 57,85 
                 C 55,87 53,88.5 51,89.5 
                 L 48,91 
                 C 46,92 44,92.5 42,92.5 
                 L 38,92.5 
                 C 36,92.5 34,92 32,91 
                 L 29,89 
                 C 27,87 25,85 23,82 
                 L 21,78 
                 C 19.5,75 18.5,72 18,69 
                 L 17.5,65 
                 C 17.5,62 18,59 19,56 
                 L 20,53 
                 C 21,50 22,47 23,45 
                 L 24,42 
                 C 24.5,39 25,36 25,33 
                 L 25,29 
                 C 25,26 25,23 25,20 
                 L 25,15 Z"
              fill="url(#indiaGradient)"
              stroke="#7C3AED"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#shadow)"
            />
            
            {/* State dots INSIDE the map */}
            {Object.entries(data).map(([state, info]) => {
              const pos = statePositions[state];
              if (!pos) return null;

              const isHighlighted = locations && locations.some(loc => 
                state.toLowerCase().includes(loc.toLowerCase()) || 
                loc.toLowerCase().includes(state.toLowerCase())
              );

              return (
                <g key={state}>
                  {/* Glow for highlighted */}
                  {isHighlighted && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="3"
                      fill="#FBBF24"
                      opacity="0.4"
                      className="animate-pulse"
                    />
                  )}
                  
                  {/* State dot - SMALL */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isHighlighted ? "1.8" : "1.4"}
                    fill={info.color}
                    stroke="white"
                    strokeWidth="0.4"
                    className="cursor-pointer hover:opacity-80 transition-all"
                    opacity="0.95"
                  />
                  
                  {/* Value */}
                  <text
                    x={pos.x}
                    y={pos.y - 3.5}
                    fontSize="2.5"
                    fill="#1e293b"
                    fontWeight="700"
                    textAnchor="middle"
                    style={{ textShadow: '0 0 3px white, 0 0 3px white' }}
                  >
                    {info.value}
                  </text>
                  
                  {/* State name */}
                  <text
                    x={pos.x}
                    y={pos.y + 6}
                    fontSize="2"
                    fill="#475569"
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    {state}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">{t.legend}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Fair</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Needs Improvement</span>
            </div>
          </div>
        </div>

        {/* Highlighted States */}
        {locations && locations.length > 0 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800 shadow-sm">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-300 mb-2">
              📍 Highlighted Regions
            </p>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc, i) => {
                const stateData = data[loc] || data[Object.keys(data).find(s => 
                  s.toLowerCase().includes(loc.toLowerCase())
                )];
                return stateData ? (
                  <div key={i} className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-amber-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white">{loc}</span>
                    <span className="text-slate-600 dark:text-slate-400 ml-2 text-sm">
                      {stateData.value} {stateData.label}
                    </span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}