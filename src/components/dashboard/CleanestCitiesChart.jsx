import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Sparkles } from "lucide-react";

export default function CleanestCitiesChart({ language = "en" }) {
  const translations = {
    en: { 
      title: "Top 5 Cleanest Cities in India", 
      subtitle: "Swachh Survekshan 2023 Rankings",
      score: "Cleanliness Score"
    },
    hi: { 
      title: "भारत के शीर्ष 5 स्वच्छ शहर", 
      subtitle: "स्वच्छ सर्वेक्षण 2023 रैंकिंग",
      score: "स्वच्छता स्कोर"
    },
    ta: { 
      title: "இந்தியாவின் முதல் 5 சுத்தமான நகரங்கள்", 
      subtitle: "ஸ்வச்ச் சர்வேக்ஷன் 2023 தரவரிசை",
      score: "சுத்தம் மதிப்பெண்"
    },
    te: { 
      title: "భారతదేశంలోని టాప్ 5 పరిశుభ్రమైన నగరాలు", 
      subtitle: "స్వచ్ఛ సర్వేక్షణ్ 2023 ర్యాంకింగ్‌లు",
      score: "పరిశుభ్రత స్కోరు"
    }
  };

  const t = translations[language] || translations.en;

  // Swachh Survekshan 2023 Top 5 Cleanest Cities Data
  const cleanestCitiesData = [
    { city: "Indore", rank: 1, score: 97.5, state: "Madhya Pradesh", icon: "🏆" },
    { city: "Surat", rank: 2, score: 95.8, state: "Gujarat", icon: "🥈" },
    { city: "Bhopal", rank: 3, score: 94.2, state: "Madhya Pradesh", icon: "🥉" },
    { city: "Mysuru", rank: 4, score: 93.1, state: "Karnataka", icon: "⭐" },
    { city: "Navi Mumbai", rank: 5, score: 92.7, state: "Maharashtra", icon: "⭐" },
  ];

  return (
    <Card className="shadow-2xl border-0 dark:bg-slate-800/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="w-6 h-6" />
          {t.title}
        </CardTitle>
        <p className="text-sm text-green-100 mt-1">{t.subtitle}</p>
      </CardHeader>
      <CardContent className="pt-8">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={cleanestCitiesData} layout="vertical">
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
              fill="#10B981" 
              name={t.score}
              radius={[0, 8, 8, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-8 grid grid-cols-1 gap-4">
          {cleanestCitiesData.map((city, index) => (
            <div 
              key={index} 
              className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{city.icon}</span>
                <div>
                  <h4 className="text-lg font-bold text-green-900 dark:text-green-300">
                    #{city.rank} {city.city}
                  </h4>
                  <p className="text-sm text-green-600 dark:text-green-400">{city.state}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-green-700 dark:text-green-300">{city.score}</p>
                <p className="text-xs text-green-600 dark:text-green-400">Cleanliness Score</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
            📊 About Swachh Survekshan
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
            Annual cleanliness survey by Ministry of Housing & Urban Affairs evaluating cities on solid waste management, sanitation, and urban infrastructure. Indore has won the cleanest city award for 7 consecutive years!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}