import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Heart } from "lucide-react";

export default function HealthcareChart({ language = "en" }) {
  const translations = {
    en: { 
      title: "Best Healthcare States in India", 
      subtitle: "Healthcare Infrastructure & Life Expectancy",
      beds: "Hospital Beds (per 1000)",
      life: "Life Expectancy (years)"
    },
    hi: { 
      title: "भारत में सर्वश्रेष्ठ स्वास्थ्य सेवा राज्य", 
      subtitle: "स्वास्थ्य सेवा बुनियादी ढांचा और जीवन प्रत्याशा",
      beds: "अस्पताल के बिस्तर (प्रति 1000)",
      life: "जीवन प्रत्याशा (वर्ष)"
    },
    ta: { 
      title: "இந்தியாவில் சிறந்த சுகாதார மாநிலங்கள்", 
      subtitle: "சுகாதார உள்கட்டமைப்பு & ஆயுட்காலம்",
      beds: "மருத்துவமனை படுக்கைகள் (ஒரு 1000க்கு)",
      life: "ஆயுட்காலம் (ஆண்டுகள்)"
    },
    te: { 
      title: "భారతదేశంలో ఉత్తమ ఆరోగ్య సంరక్షణ రాష్ట్రాలు", 
      subtitle: "ఆరోగ్య మౌలిక సదుపాయాలు & ఆయుర్దాయం",
      beds: "ఆసుపత్రి పడకలు (ప్రతి 1000కు)",
      life: "ఆయుర్దాయం (సంవత్సరాలు)"
    }
  };

  const t = translations[language] || translations.en;

  const healthcareData = [
    { state: "Kerala", beds: 3.1, lifeExpectancy: 77, doctors: 1.2 },
    { state: "Delhi", beds: 2.8, lifeExpectancy: 73, doctors: 1.1 },
    { state: "Maharashtra", beds: 2.3, lifeExpectancy: 72, doctors: 0.9 },
    { state: "Tamil Nadu", beds: 2.2, lifeExpectancy: 72, doctors: 0.9 },
    { state: "Karnataka", beds: 1.9, lifeExpectancy: 71, doctors: 0.8 },
    { state: "Gujarat", beds: 1.7, lifeExpectancy: 70, doctors: 0.7 },
    { state: "UP", beds: 0.8, lifeExpectancy: 66, doctors: 0.4 },
    { state: "Bihar", beds: 0.6, lifeExpectancy: 64, doctors: 0.3 },
  ];

  return (
    <Card className="shadow-2xl border-0 dark:bg-slate-800/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Heart className="w-6 h-6" />
          {t.title}
        </CardTitle>
        <p className="text-sm text-red-100 mt-1">{t.subtitle}</p>
      </CardHeader>
      <CardContent className="pt-8">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={healthcareData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:stroke-slate-700" />
            <XAxis 
              dataKey="state" 
              stroke="#64748B"
              className="dark:stroke-slate-400"
              style={{ fontSize: '12px', fontWeight: '600' }}
              angle={-45}
              textAnchor="end"
              height={80}
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
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="beds" fill="#EF4444" name={t.beds} radius={[8, 8, 0, 0]} />
            <Bar dataKey="lifeExpectancy" fill="#F87171" name={t.life} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border-2 border-red-200 dark:border-red-800">
            <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase mb-1">Best Healthcare</p>
            <p className="text-2xl font-black text-red-700 dark:text-red-300">Kerala</p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">77 yrs life exp</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl border-2 border-orange-200 dark:border-orange-800">
            <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase mb-1">National Avg</p>
            <p className="text-2xl font-black text-orange-700 dark:text-orange-300">1.3 beds</p>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">per 1000 people</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase mb-1">Gap to WHO</p>
            <p className="text-2xl font-black text-blue-700 dark:text-blue-300">3.7x</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Below WHO std</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}