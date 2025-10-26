import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function IndiaMapChart({ metricData, language = "en", category = "education" }) {
  const translations = {
    en: { title: "India - State-wise Metrics", legend: "Legend" },
    hi: { title: "भारत - राज्यवार मापदंड", legend: "किंवदंती" },
    ta: { title: "இந்தியா - மாநிலவாரான அளவீடுகள்", legend: "வரைபடக் குறிப்பு" },
    te: { title: "భారతదేశం - రాష్ట్ర వారీ మెట్రిక్స్", legend: "పటం సూచన" }
  };

  const t = translations[language] || translations.en;

  // State positions for India map visualization (approximate coordinates)
  const statePositions = {
    "Kerala": { x: 40, y: 85, value: 96.2 },
    "Karnataka": { x: 42, y: 72, value: 75.6 },
    "Tamil Nadu": { x: 48, y: 82, value: 82.9 },
    "Maharashtra": { x: 38, y: 60, value: 84.8 },
    "Gujarat": { x: 28, y: 52, value: 82.4 },
    "Rajasthan": { x: 32, y: 45, value: 67.1 },
    "Delhi": { x: 42, y: 38, value: 88.7 },
    "UP": { x: 50, y: 42, value: 67.7 },
    "Bihar": { x: 62, y: 45, value: 61.8 },
    "West Bengal": { x: 68, y: 50, value: 77.1 },
    "Telangana": { x: 48, y: 68, value: 66.5 },
    "Andhra Pradesh": { x: 52, y: 72, value: 67.7 },
    "MP": { x: 45, y: 52, value: 70.6 },
    "Odisha": { x: 62, y: 58, value: 73.5 },
  };

  const getColor = (value) => {
    if (value >= 85) return "#10B981"; // Green - Excellent
    if (value >= 75) return "#3B82F6"; // Blue - Good
    if (value >= 65) return "#F59E0B"; // Orange - Fair
    return "#EF4444"; // Red - Needs Improvement
  };

  return (
    <Card className="shadow-2xl border-0 dark:bg-slate-800/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center gap-2 text-xl">
          <MapPin className="w-6 h-6" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        {/* India Map SVG Visualization */}
        <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border-2 border-blue-200 dark:border-slate-700 overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* India outline (simplified) */}
            <path
              d="M35,30 L40,28 L45,30 L50,28 L55,30 L60,32 L65,35 L70,40 L72,45 L70,50 L68,55 L65,60 L62,65 L60,70 L58,75 L55,80 L50,83 L45,85 L40,83 L35,80 L32,75 L30,70 L28,65 L27,60 L28,55 L30,50 L32,45 L33,40 L34,35 L35,30 Z"
              fill="#E0E7FF"
              stroke="#4F46E5"
              strokeWidth="0.5"
              opacity="0.3"
            />
            
            {/* State markers with color coding */}
            {Object.entries(statePositions).map(([state, data]) => (
              <g key={state}>
                <circle
                  cx={data.x}
                  cy={data.y}
                  r="4"
                  fill={getColor(data.value)}
                  stroke="white"
                  strokeWidth="0.8"
                  className="cursor-pointer hover:r-5 transition-all"
                  opacity="0.9"
                />
                <text
                  x={data.x}
                  y={data.y - 6}
                  fontSize="3"
                  fill="#1e293b"
                  textAnchor="middle"
                  className="font-bold"
                >
                  {data.value}%
                </text>
                <text
                  x={data.x}
                  y={data.y + 8}
                  fontSize="2.5"
                  fill="#64748b"
                  textAnchor="middle"
                  className="font-medium"
                >
                  {state}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">{t.legend}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">85%+ (Excellent)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">75-84% (Good)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">65-74% (Fair)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">&lt;65% (Needs Improvement)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}