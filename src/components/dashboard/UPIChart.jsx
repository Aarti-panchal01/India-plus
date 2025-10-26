import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CreditCard } from "lucide-react";

const upiData = [
  { state: "Maharashtra", transactions: 2850, volume: 45200 },
  { state: "Karnataka", transactions: 2320, volume: 38500 },
  { state: "Tamil Nadu", transactions: 2180, volume: 35800 },
  { state: "Delhi", transactions: 1950, volume: 32100 },
  { state: "Gujarat", transactions: 1720, volume: 28400 },
  { state: "Telangana", transactions: 1580, volume: 26200 },
  { state: "West Bengal", transactions: 1420, volume: 23500 },
  { state: "Rajasthan", transactions: 1280, volume: 21100 },
];

export default function UPIChart() {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          UPI Transaction Volume - India Stack
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={upiData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="state"
              stroke="#64748B"
              style={{ fontSize: '11px' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
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
            <Bar dataKey="transactions" fill="#1E3A8A" name="Transactions (M)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="volume" fill="#2563EB" name="Volume (₹Cr)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-slate-600 mb-1">Total Transactions</p>
            <p className="text-xl font-bold text-blue-900">15.3B</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-slate-600 mb-1">Total Volume</p>
            <p className="text-xl font-bold text-blue-900">₹2.5L Cr</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-slate-600 mb-1">Growth Rate</p>
            <p className="text-xl font-bold text-green-600">↑ 67%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}