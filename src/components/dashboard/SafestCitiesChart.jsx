import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Shield } from "lucide-react";

export default function SafestCitiesChart({ language = "en" }) {
  const translations = {
    en: { 
      title: "Safest Cities in India", 
      subtitle: "Women Safety Index & Crime Rate Data",
      score: "Safety Score (out of 100)"
    },
    hi: { 
      title: "भारत के सबसे सुरक्षित शहर", 
      subtitle: "महिला सुरक्षा सूचकांक और अपराध दर डेटा",
      score: "सुरक्षा स्कोर (100 में से)"
    },
    ta: { 
      title: "இந்தியாவின் பாதுகாப்பான நகரங்கள்", 
      subtitle: "பெண்கள் பாதுகாப்பு குறியீடு & குற்ற விகித தரவு",
      score: "பாதுகாப்பு மதிப்பெண் (100 இல்)"
    },
    te: { 
      title: "భారతదేశంలో సురక్షితమైన నగరాలు", 
      subtitle: "మహిళా భద్రత సూచిక & నేర రేటు డేటా",
      score: "భద్రత స్కోరు (100 లో)"
    }
  };

  const t = translations[language] || translations.en;

  // NCRB Data + Women Safety Index (2023)
  const safestCitiesData = [
    { city: "Kolkata", score: 90, crimeRate: 125, state: "West Bengal", icon: "🏆" },
    { city: "Chennai", score: 88, crimeRate: 138, state: "Tamil Nadu", icon: "🥈" },
    { city: "Pune", score: 85, crimeRate: 152, state: "Maharashtra", icon: "🥉" },
    { city: "Bangalore", score: 82, crimeRate: 168, state: "Karnataka", icon: "⭐" },
    { city: "Hyderabad", score: 78, crimeRate: 185, state: "Telangana", icon: "⭐" },
    { city: "Mumbai", score: 68, crimeRate: 245, state: "Maharashtra", icon: "📊" },
    { city: "Delhi", score: 55, crimeRate: 385, state: "Delhi NCR", icon: "⚠️" },
  ];

  return (
    <Card className="shadow-2xl border-0 dark:bg-slate-800/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Shield className="w-6 h-6" />
          {t.title}
        </CardTitle>
        <p className="text-sm text-blue-100 mt-1">{t.subtitle}</p>
      </CardHeader>
      <CardContent className="pt-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={safestCitiesData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:stroke-slate-700" />
            <XAxis 
              type="number" 
              domain={[0, 100]}
              stroke="#64748B"
              className="dark:stroke-slate-400"
              style={{ fontSize: '14px', fontWeight: '600' }}
            />
            <YAxis 
              type="category"
              dataKey="city" 
              stroke="#64748B"
              className="dark:stroke-slate-400"
              style={{ fontSize: '14px', fontWeight: '600' }}
              width={120}
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
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar 
              dataKey="score" 
              fill="#3B82F6" 
              name={t.score}
              radius={[0, 8, 8, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {safestCitiesData.slice(0, 6).map((city, index) => (
            <div 
              key={index} 
              className={`p-5 bg-gradient-to-r rounded-xl border-2 flex items-center justify-between ${
                index < 3 
                  ? 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800' 
                  : 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{city.icon}</span>
                <div>
                  <h4 className={`text-base font-bold ${index < 3 ? 'text-green-900 dark:text-green-300' : 'text-orange-900 dark:text-orange-300'}`}>
                    {city.city}
                  </h4>
                  <p className={`text-xs ${index < 3 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                    {city.state}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-black ${index < 3 ? 'text-green-700 dark:text-green-300' : 'text-orange-700 dark:text-orange-300'}`}>
                  {city.score}
                </p>
                <p className={`text-xs ${index < 3 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                  Crime: {city.crimeRate}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
            📊 Data Source: NCRB + Women Safety Index
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
            Safety scores based on crime rate per lakh population, women safety measures, police response time, and public transport security. Kolkata consistently ranks as India's safest metro city.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}