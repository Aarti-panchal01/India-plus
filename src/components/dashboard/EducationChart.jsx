import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { GraduationCap } from "lucide-react";

export default function EducationChart({ locations, language = "en", isComparison = false }) {
  const translations = {
    en: { 
      title: "Education Metrics", 
      literacy: "Literacy Rate (%)", 
      dropout: "Child Dropout (under 14, %)",
      summary: "Educational performance comparison"
    },
    hi: { 
      title: "शिक्षा मापदंड", 
      literacy: "साक्षरता दर (%)", 
      dropout: "बाल ड्रॉपआउट (14 वर्ष से कम, %)",
      summary: "शैक्षिक प्रदर्शन तुलना"
    },
    ta: { 
      title: "கல்வி அளவீடுகள்", 
      literacy: "எழுத்தறிவு விகிதம் (%)", 
      dropout: "குழந்தை இடைநிற்றல் (14 வயதுக்கு உட்பட, %)",
      summary: "கல்வி செயல்திறன் ஒப்பீடு"
    },
    te: { 
      title: "విద్య మెట్రిక్స్", 
      literacy: "అక్షరాస్యత రేటు (%)", 
      dropout: "పిల్లల నిష్క్రమణ (14 ఏళ్ల లోపు, %)",
      summary: "విద్యా పనితీరు పోలిక"
    }
  };

  const t = translations[language] || translations.en;

  const allEducationData = [
    { state: "Kerala", literacy: 96.2, dropout: 4.2 },
    { state: "Delhi", literacy: 88.7, dropout: 10.3 },
    { state: "Maharashtra", literacy: 84.8, dropout: 11.5 },
    { state: "Tamil Nadu", literacy: 82.9, dropout: 9.8 },
    { state: "Gujarat", literacy: 82.4, dropout: 12.3 },
    { state: "Karnataka", literacy: 75.6, dropout: 13.2 },
    { state: "Telangana", literacy: 66.5, dropout: 15.8 },
    { state: "Hyderabad", literacy: 66.5, dropout: 12.6 },
    { state: "Mumbai", literacy: 89.2, dropout: 9.1 },
    { state: "Bangalore", literacy: 87.7, dropout: 8.4 },
    { state: "Kolkata", literacy: 87.1, dropout: 13.8 },
    { state: "Chennai", literacy: 90.2, dropout: 8.9 },
    { state: "UP", literacy: 67.7, dropout: 17.2 },
    { state: "Bihar", literacy: 61.8, dropout: 18.9 },
  ];

  // Filter data based on locations
  const educationData = locations && locations.length > 0
    ? allEducationData.filter(item => 
        locations.some(loc => 
          item.state.toLowerCase().includes(loc.toLowerCase()) || 
          loc.toLowerCase().includes(item.state.toLowerCase())
        )
      )
    : allEducationData;

  // Ensure we always have data
  const displayData = educationData.length > 0 ? educationData : allEducationData.slice(0, 8);

  return (
    <Card className="shadow-2xl border-0 dark:bg-slate-800/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center gap-2 text-xl">
          <GraduationCap className="w-6 h-6" />
          {t.title} {locations && locations.length > 0 && `- ${locations.join(' vs ')}`}
        </CardTitle>
        <p className="text-sm text-purple-100 mt-1">{t.summary}</p>
      </CardHeader>
      <CardContent className="pt-8">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={displayData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:stroke-slate-700" />
            <XAxis 
              dataKey="state" 
              stroke="#64748B"
              className="dark:stroke-slate-400"
              style={{ fontSize: '12px', fontWeight: '600' }}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis 
              stroke="#64748B" 
              className="dark:stroke-slate-400"
              style={{ fontSize: '14px', fontWeight: '600' }}
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
            />
            <Bar 
              dataKey="literacy" 
              fill="#8B5CF6" 
              name={t.literacy}
              radius={[8, 8, 0, 0]}
              barSize={isComparison ? 60 : 40}
            />
            <Bar 
              dataKey="dropout" 
              fill="#EF4444" 
              name={t.dropout}
              radius={[8, 8, 0, 0]}
              barSize={isComparison ? 60 : 40}
            />
          </BarChart>
        </ResponsiveContainer>

        {displayData.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-4">
            {displayData.slice(0, 3).map((item, i) => (
              <div key={i} className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
                <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-2">
                  {item.state}
                </p>
                <div className="space-y-2">
                  <div>
                    <p className="text-2xl font-black text-purple-900 dark:text-purple-300">{item.literacy}%</p>
                    <p className="text-xs text-purple-600 dark:text-purple-400">{language === 'hi' ? 'साक्षरता' : 'Literacy'}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-red-600 dark:text-red-400">{item.dropout}%</p>
                    <p className="text-xs text-red-600 dark:text-red-400">{language === 'hi' ? 'ड्रॉपआउट' : 'Dropout'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}