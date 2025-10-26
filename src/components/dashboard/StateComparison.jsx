import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { GitCompare } from "lucide-react";

const stateMetrics = {
  "Karnataka": { msme: 92, upi: 95, infra: 88 },
  "Maharashtra": { msme: 95, upi: 96, infra: 90 },
  "Tamil Nadu": { msme: 88, upi: 91, infra: 85 },
  "Gujarat": { msme: 86, upi: 89, infra: 82 },
  "Telangana": { msme: 85, upi: 90, infra: 87 },
  "Delhi": { msme: 90, upi: 94, infra: 92 },
  "West Bengal": { msme: 78, upi: 82, infra: 75 },
  "Rajasthan": { msme: 75, upi: 80, infra: 72 },
};

export default function StateComparison() {
  const [state1, setState1] = useState("Karnataka");
  const [state2, setState2] = useState("Maharashtra");

  const comparisonData = [
    {
      metric: "MSME Score",
      [state1]: stateMetrics[state1].msme,
      [state2]: stateMetrics[state2].msme,
    },
    {
      metric: "UPI Adoption",
      [state1]: stateMetrics[state1].upi,
      [state2]: stateMetrics[state2].upi,
    },
    {
      metric: "Infrastructure",
      [state1]: stateMetrics[state1].infra,
      [state2]: stateMetrics[state2].infra,
    },
  ];

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <GitCompare className="w-5 h-5" />
          State Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs font-medium text-slate-600 mb-2 block">State 1</label>
            <Select value={state1} onValueChange={setState1}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(stateMetrics).map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600 mb-2 block">State 2</label>
            <Select value={state2} onValueChange={setState2}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(stateMetrics).map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="metric" stroke="#64748B" style={{ fontSize: '12px' }} />
            <YAxis stroke="#64748B" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}
            />
            <Legend />
            <Bar dataKey={state1} fill="#4F46E5" radius={[8, 8, 0, 0]} />
            <Bar dataKey={state2} fill="#7C3AED" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
          <p className="text-sm text-slate-700">
            <span className="font-semibold">{state1}</span> vs <span className="font-semibold">{state2}</span>
          </p>
          <p className="text-xs text-slate-600 mt-2">
            {stateMetrics[state1].msme > stateMetrics[state2].msme 
              ? `${state1} leads in MSME growth` 
              : `${state2} leads in MSME growth`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}