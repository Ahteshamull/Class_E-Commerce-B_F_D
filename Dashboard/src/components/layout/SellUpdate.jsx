import React from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const data = [
  { name: "Jan", sales: 450 },
  { name: "Feb", sales: 600 },
  { name: "Mar", sales: 300 },
  { name: "Apr", sales: 500 },
  { name: "May", sales: 400 },
  { name: "Jun", sales: 550 },
  { name: "Jul", sales: 600 },
  { name: "Aug", sales: 580 },
  { name: "Sep", sales: 620 },
  { name: "Oct", sales: 500 },
  { name: "Nov", sales: 570 },
  { name: "Dec", sales: 650 },
];

const SellUpdate = () => {
  return (
    <div className="rounded-2xl p-4 shadow-lg">
      <div>
        <h2 className="mb-4 text-xl font-bold">Monthly Sales Overview</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                fill="#93c5fd"
              />
            </AreaChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar
                name="Sales"
                dataKey="sales"
                stroke="#2563eb"
                fill="#93c5fd"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SellUpdate;
