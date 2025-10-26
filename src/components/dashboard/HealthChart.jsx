import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Heart } from "lucide-react";

const healthData = [
  { state: "Kerala", lifeExpectancy: 77, infantMortality: 6 },
  { state: "Maharashtra", lifeExpectancy: 72, infantMortality: 15 },
  { state: "Karnataka", lifeExpectancy: 71, infantMortality: 18 },
  { state: "Tamil Nadu", lifeExpectancy: 72, infantMortality: 14 },
  { state: "UP", lifeExpectancy: 66, infantMortality: 32 },
  { state: "Bihar", lifeExpectancy: 64, infantMortality: 35 },
];

export default function HealthChart() {
  return (
    <Card className="shadow-lg border-0 dark:bg-slate-800/50">
      <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Healthcare Metrics by State
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={healthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:stroke-slate-700" />
            <XAxis dataKey="state" stroke="#64748B" className="dark:stroke-slate-400" style={{ fontSize: '12px' }} />
            <YAxis stroke="#64748B" className="dark:stroke-slate-400" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E2E8F0",
                borderRadius: "8px"
              }}
            />
            <Legend />
            <Bar dataKey="lifeExpectancy" fill="#EF4444" name="Life Expectancy (years)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="infantMortality" fill="#F87171" name="Infant Mortality (per 1000)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-xs font-semibold text-red-900 dark:text-red-300">Kerala leads with 77 years life expectancy and lowest infant mortality</p>
        </div>
      </CardContent>
    </Card>
  );
}