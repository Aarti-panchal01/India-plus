import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Cell } from "recharts";
import { Zap, TrendingUp } from "lucide-react";

export default function DynamicDataChart({ title, subtitle, data, chartType = "bar", dataKey, unit = "", language = "en" }) {
  if (!data || data.length === 0) return null;

  const translations = {
    en: { poweredBy: "Real-time data from the web" },
    hi: { poweredBy: "वेब से रीयल-टाइम डेटा" },
    ta: { poweredBy: "வலையிலிருந்து நேரடி தரவு" },
    te: { poweredBy: "వెబ్ నుండి నేరుగా డేటా" }
  };

  const t = translations[language] || translations.en;

  // Find top and bottom values
  const sortedData = [...data].sort((a, b) => b[dataKey] - a[dataKey]);
  const topItem = sortedData[0];
  const bottomItem = sortedData[sortedData.length - 1];

  // Color gradient for bars
  const getColor = (index) => {
    const colors = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE'];
    return colors[index % colors.length];
  };

  return (
    <Card className="shadow-2xl border-0 dark:bg-slate-800/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Zap className="w-6 h-6" />
          {title}
        </CardTitle>
        {subtitle && <p className="text-sm text-purple-100 mt-1">{subtitle}</p>}
      </CardHeader>
      <CardContent className="pt-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:stroke-slate-700" />
            <XAxis 
              type="number"
              stroke="#64748B"
              className="dark:stroke-slate-400"
              style={{ fontSize: '14px', fontWeight: '600' }}
            />
            <YAxis 
              type="category"
              dataKey="name"
              stroke="#64748B"
              className="dark:stroke-slate-400"
              style={{ fontSize: '14px', fontWeight: '700' }}
              width={140}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "2px solid #E2E8F0",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                padding: "16px"
              }}
              labelStyle={{ fontWeight: 'bold', color: '#1e293b', fontSize: '16px' }}
              itemStyle={{ fontSize: '14px', fontWeight: '600' }}
            />
            <Bar 
              dataKey={dataKey} 
              name={unit}
              radius={[0, 12, 12, 0]}
              barSize={50}
              label={{ 
                position: 'right', 
                fill: '#1e293b',
                fontSize: 16,
                fontWeight: 'bold',
                formatter: (value) => `${value} ${unit}`
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* EMPHASIZED Top and Bottom Cards with BIG numbers */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl border-4 border-green-300 dark:border-green-700 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-6 h-6 text-green-700 dark:text-green-400" />
              <p className="text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-wide">
                🏆 #1 Highest
              </p>
            </div>
            <p className="text-2xl font-black text-green-900 dark:text-green-200 mb-2">{topItem?.name}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-6xl font-black text-green-700 dark:text-green-300">
                {topItem?.[dataKey]?.toLocaleString()}
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{unit}</p>
            </div>
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl border-4 border-blue-300 dark:border-blue-700 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-6 h-6 text-blue-700 dark:text-blue-400 rotate-180" />
              <p className="text-sm font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                📊 Lowest
              </p>
            </div>
            <p className="text-2xl font-black text-blue-900 dark:text-blue-200 mb-2">{bottomItem?.name}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-6xl font-black text-blue-700 dark:text-blue-300">
                {bottomItem?.[dataKey]?.toLocaleString()}
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{unit}</p>
            </div>
          </div>
        </div>

        {/* AI Attribution */}
        <div className="mt-6 p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <p className="text-sm font-semibold text-purple-900 dark:text-purple-300">{t.poweredBy}</p>
          </div>
          <p className="text-xs text-purple-700 dark:text-purple-400 leading-relaxed">
            Data sourced from multiple verified sources including government databases, research institutions, and official reports
          </p>
        </div>
      </CardContent>
    </Card>
  );
}