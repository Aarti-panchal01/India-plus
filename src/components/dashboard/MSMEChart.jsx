import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const msmeData = [
  { month: "Jan", registrations: 12500, revenue: 450 },
  { month: "Feb", registrations: 15200, revenue: 520 },
  { month: "Mar", registrations: 18900, revenue: 610 },
  { month: "Apr", registrations: 21300, revenue: 680 },
  { month: "May", registrations: 24800, revenue: 750 },
  { month: "Jun", registrations: 28500, revenue: 820 },
  { month: "Jul", registrations: 31200, revenue: 890 },
  { month: "Aug", registrations: 35600, revenue: 960 },
  { month: "Sep", registrations: 39100, revenue: 1050 },
  { month: "Oct", registrations: 42800, revenue: 1130 },
  { month: "Nov", registrations: 46500, revenue: 1220 },
  { month: "Dec", registrations: 51200, revenue: 1310 },
];

export default function MSMEChart() {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          MSME Growth - eSamudaay Data
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={msmeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" stroke="#64748B" style={{ fontSize: '12px' }} />
            <YAxis yAxisId="left" stroke="#F97316" style={{ fontSize: '12px' }} />
            <YAxis yAxisId="right" orientation="right" stroke="#FB923C" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="registrations"
              stroke="#F97316"
              strokeWidth={3}
              dot={{ fill: "#F97316", r: 4 }}
              name="New Registrations"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#FB923C"
              strokeWidth={3}
              dot={{ fill: "#FB923C", r: 4 }}
              name="Revenue (₹Cr)"
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Total Registrations</p>
            <p className="text-2xl font-bold text-orange-600">51,200</p>
            <p className="text-xs text-green-600 mt-1">↑ 310% YoY</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Cumulative Revenue</p>
            <p className="text-2xl font-bold text-orange-600">₹1,310 Cr</p>
            <p className="text-xs text-green-600 mt-1">↑ 191% YoY</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}