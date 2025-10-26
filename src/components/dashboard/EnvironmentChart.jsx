import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Leaf } from "lucide-react";

export default function EnvironmentChart({ locations, language = "en", isComparison = false }) {
  const translations = {
    en: { title: "Air Quality Index (AQI)", highest: "Highest AQI", lowest: "Lowest AQI", trend: "5-Year Trend" },
    hi: { title: "वायु गुणवत्ता सूचकांक (AQI)", highest: "उच्चतम AQI", lowest: "निम्नतम AQI", trend: "5-वर्षीय रुझान" },
    ta: { title: "காற்று தர குறியீடு (AQI)", highest: "அதிக AQI", lowest: "குறைந்த AQI", trend: "5 ஆண்டு போக்கு" },
    te: { title: "గాలి నాణ్యత సూచిక (AQI)", highest: "అత్యధిక AQI", lowest: "అతి తక్కువ AQI", trend: "5-సంవత్సరాల ధోరణి" }
  };

  const t = translations[language] || translations.en;

  // Complete data for all cities
  const allPollutionData = [
    { year: "2019", delhi: 280, mumbai: 110, bangalore: 95, hyderabad: 165, kolkata: 150, chennai: 135, karnataka: 95 },
    { year: "2020", delhi: 240, mumbai: 95, bangalore: 85, hyderabad: 155, kolkata: 135, chennai: 125, karnataka: 85 },
    { year: "2021", delhi: 260, mumbai: 105, bangalore: 90, hyderabad: 170, kolkata: 145, chennai: 130, karnataka: 90 },
    { year: "2022", delhi: 290, mumbai: 120, bangalore: 100, hyderabad: 175, kolkata: 155, chennai: 135, karnataka: 100 },
    { year: "2023", delhi: 310, mumbai: 125, bangalore: 105, hyderabad: 180, kolkata: 165, chennai: 140, karnataka: 105 },
  ];

  // If locations specified and it's a comparison, show ONLY those locations
  const filterDataByLocations = (data) => {
    if (!locations || locations.length === 0) return data;
    
    // Normalize location names
    const normalizedLocations = locations.map(loc => loc.toLowerCase().trim());
    
    return data.map(yearData => {
      const filtered = { year: yearData.year };
      
      // Add only the requested locations
      Object.keys(yearData).forEach(key => {
        if (key === 'year') return;
        if (normalizedLocations.some(loc => key.includes(loc) || loc.includes(key))) {
          filtered[key] = yearData[key];
        }
      });
      
      return filtered;
    });
  };

  const pollutionData = locations && locations.length > 0 
    ? filterDataByLocations(allPollutionData)
    : allPollutionData;

  // Get the cities that are actually in the data
  const activeCities = Object.keys(pollutionData[0]).filter(key => key !== 'year');

  const cityColors = {
    delhi: "#EF4444",
    mumbai: "#F59E0B",
    bangalore: "#10B981",
    hyderabad: "#8B5CF6",
    kolkata: "#3B82F6",
    chennai: "#EC4899",
    karnataka: "#10B981"
  };

  const cityLabels = {
    delhi: "Delhi",
    mumbai: "Mumbai",
    bangalore: "Bangalore",
    hyderabad: "Hyderabad",
    kolkata: "Kolkata",
    chennai: "Chennai",
    karnataka: "Karnataka"
  };

  // Get latest AQI values for the active cities
  const latestData = pollutionData[pollutionData.length - 1];
  const sortedCities = activeCities.sort((a, b) => latestData[b] - latestData[a]);
  const highestCity = sortedCities[0];
  const lowestCity = sortedCities[sortedCities.length - 1];

  return (
    <Card className="shadow-2xl border-0 dark:bg-slate-800/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-500 text-white">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Leaf className="w-6 h-6" />
          {t.title} {locations && locations.length > 0 && `- ${locations.join(' vs ')}`}
        </CardTitle>
        <p className="text-sm text-emerald-100 mt-1">{t.trend}</p>
      </CardHeader>
      <CardContent className="pt-8">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={pollutionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:stroke-slate-700" />
            <XAxis 
              dataKey="year" 
              stroke="#64748B" 
              className="dark:stroke-slate-400"
              style={{ fontSize: '14px', fontWeight: '600' }}
            />
            <YAxis 
              stroke="#64748B" 
              className="dark:stroke-slate-400"
              style={{ fontSize: '14px', fontWeight: '600' }}
              label={{ value: 'AQI', angle: -90, position: 'insideLeft', style: { fontSize: '14px', fontWeight: '600' } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "2px solid #E2E8F0",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                padding: "12px"
              }}
              labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            {activeCities.map(city => (
              <Line 
                key={city}
                type="monotone" 
                dataKey={city} 
                stroke={cityColors[city]} 
                strokeWidth={isComparison || locations?.length > 0 ? 4 : 3}
                dot={{ fill: cityColors[city], r: 6, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8 }}
                name={cityLabels[city]}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="p-5 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl border-2 border-red-200 dark:border-red-800">
            <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-2">{t.highest}</p>
            <p className="text-3xl font-black text-red-700 dark:text-red-300">
              {cityLabels[highestCity]} - {latestData[highestCity]}
            </p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">Very Unhealthy</p>
          </div>
          <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl border-2 border-green-200 dark:border-green-800">
            <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-2">{t.lowest}</p>
            <p className="text-3xl font-black text-green-700 dark:text-green-300">
              {cityLabels[lowestCity]} - {latestData[lowestCity]}
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">Moderate</p>
          </div>
        </div>

        {locations && locations.length > 0 && (
          <div className="mt-6 p-5 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3 mb-3">
              {locations.map((loc, i) => (
                <span key={i} className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg font-semibold text-sm text-purple-900 dark:text-purple-300 shadow-sm">
                  📍 {loc}: {latestData[loc.toLowerCase()] || 'N/A'}
                </span>
              ))}
            </div>
            <p className="text-sm font-medium text-purple-900 dark:text-purple-300">
              {locations.length === 2 && latestData[locations[0].toLowerCase()] && latestData[locations[1].toLowerCase()] ? (
                `${locations[0]} is ${Math.round(latestData[locations[0].toLowerCase()] / latestData[locations[1].toLowerCase()] * 100) / 100}x more polluted than ${locations[1]}`
              ) : 'Comparison data shown above'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}