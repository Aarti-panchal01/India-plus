import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

const districtData = [
  { name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, value: 95, category: "UPI" },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, value: 88, category: "UPI" },
  { name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946, value: 92, category: "UPI" },
  { name: "Delhi", state: "Delhi", lat: 28.7041, lng: 77.1025, value: 90, category: "UPI" },
  { name: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867, value: 85, category: "UPI" },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, value: 83, category: "UPI" },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, value: 78, category: "UPI" },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, value: 86, category: "UPI" },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, value: 75, category: "UPI" },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, value: 72, category: "UPI" },
  { name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, value: 80, category: "UPI" },
  { name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577, value: 74, category: "UPI" },
];

export default function MapView() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const getColor = (value) => {
    if (value >= 90) return "#1E3A8A";
    if (value >= 80) return "#2563EB";
    if (value >= 70) return "#60A5FA";
    return "#93C5FD";
  };

  const getSize = (value) => {
    return value / 4;
  };

  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          India District Heatmap - UPI Adoption
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[500px] w-full">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            
            {districtData.map((district, index) => (
              <CircleMarker
                key={index}
                center={[district.lat, district.lng]}
                radius={getSize(district.value)}
                fillColor={getColor(district.value)}
                color="white"
                weight={2}
                fillOpacity={0.7}
                eventHandlers={{
                  click: () => setSelectedDistrict(district),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-blue-900">{district.name}</h3>
                    <p className="text-sm text-slate-600">{district.state}</p>
                    <p className="text-lg font-semibold text-blue-700 mt-2">
                      {district.value}% UPI Adoption
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {selectedDistrict && (
          <div className="p-4 bg-blue-50 border-t border-blue-100">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-blue-900">
                  {selectedDistrict.name}, {selectedDistrict.state}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  UPI Adoption: {selectedDistrict.value}%
                </p>
              </div>
              <div className="px-3 py-1 bg-blue-900 text-white text-sm font-medium rounded-lg">
                {selectedDistrict.value >= 85 ? "High" : "Medium"} Adoption
              </div>
            </div>
          </div>
        )}

        <div className="p-4 bg-slate-50 border-t">
          <p className="text-xs font-medium text-slate-600 mb-2">Adoption Rate Legend</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#1E3A8A]"></div>
              <span className="text-xs text-slate-600">90%+ (Excellent)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#2563EB]"></div>
              <span className="text-xs text-slate-600">80-89% (Good)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#60A5FA]"></div>
              <span className="text-xs text-slate-600">70-79% (Fair)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#93C5FD]"></div>
              <span className="text-xs text-slate-600">&lt;70% (Developing)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}