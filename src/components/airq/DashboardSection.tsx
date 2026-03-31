"use client";

import { useEffect, useRef, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  Legend,
  Cell,
} from "recharts";
import { Activity, AlertTriangle, CheckCircle, Database } from "lucide-react";

// ── Simulated data ──────────────────────────────────────────────
const featureImportance = [
  { feature: "AQI_lag24", importance: 0.41 },
  { feature: "AQI_lag1", importance: 0.28 },
  { feature: "Temperature", importance: 0.12 },
  { feature: "Wind Speed", importance: 0.09 },
  { feature: "Hour", importance: 0.05 },
  { feature: "Precipitation", importance: 0.03 },
  { feature: "Month", importance: 0.02 },
].sort((a, b) => a.importance - b.importance);

function generateActualVsPredicted() {
  const data = [];
  let actual = 120;
  for (let i = 0; i < 100; i++) {
    actual += (Math.random() - 0.48) * 15;
    actual = Math.max(30, Math.min(350, actual));
    const predicted = actual + (Math.random() - 0.5) * 20;
    data.push({
      hour: i,
      actual: Math.round(actual),
      predicted: Math.round(Math.max(20, predicted)),
    });
  }
  return data;
}

function generateScatterData() {
  return Array.from({ length: 80 }, (_, i) => {
    const actual = Math.round(50 + Math.random() * 250);
    const predicted = Math.round(actual + (Math.random() - 0.5) * 40);
    return { actual, predicted, hour: i % 24 };
  });
}

const actualVsPredicted = generateActualVsPredicted();
const scatterData = generateScatterData();

// ── Custom tooltip ──────────────────────────────────────────────
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string | number;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2F3336] border border-white/10 rounded-xl p-3 shadow-2xl text-xs">
        <p className="text-gray-400 mb-1">Hour {label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }} className="font-semibold">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const BarTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number }[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2F3336] border border-white/10 rounded-xl p-3 shadow-2xl text-xs">
        <p className="text-emerald-400 font-semibold">
          Importance: {(payload[0].value * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

const ScatterTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number }[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2F3336] border border-white/10 rounded-xl p-3 shadow-2xl text-xs">
        <p className="text-gray-400">Actual: <span className="text-emerald-400 font-bold">{payload[0]?.value}</span></p>
        <p className="text-gray-400">Predicted: <span className="text-blue-400 font-bold">{payload[1]?.value}</span></p>
      </div>
    );
  }
  return null;
};

export default function DashboardSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add("visible"),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const kpis = useMemo(
    () => [
      {
        icon: Activity,
        label: "Average Current AQI",
        value: "124",
        sub: "Across 4 cities",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/20",
      },
      {
        icon: AlertTriangle,
        label: "Worst Performing City",
        value: "Delhi",
        sub: "AQI 178 · Poor",
        color: "text-red-400",
        bg: "bg-red-400/10",
        border: "border-red-400/20",
      },
      {
        icon: CheckCircle,
        label: "Best Performing City",
        value: "Mumbai",
        sub: "AQI 62 · Satisfactory",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
      },
      {
        icon: Database,
        label: "Data Points Analyzed",
        value: "84,320",
        sub: "Updated daily",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
      },
    ],
    []
  );

  return (
    <section id="dashboard" className="py-20">
      <div
        ref={sectionRef}
        className="section-fade max-w-7xl mx-auto px-4 sm:px-6"
      >
        {/* Header */}
        <div className="mb-10">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-2">
            Analytics Hub
          </p>
          <h2 className="text-3xl font-bold text-white">
            Real-Time <span className="text-emerald-400">Dashboard</span>
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Live metrics, model performance, and air quality trends across major Indian cities.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className={`depth-card bg-[#3F4448] rounded-2xl p-5 border ${kpi.border}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl ${kpi.bg} border ${kpi.border} flex items-center justify-center mb-3`}
                >
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
                <p className={`text-2xl font-extrabold ${kpi.color}`}>{kpi.value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{kpi.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Row 1: Feature Importance + placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Feature Importance */}
          <div className="depth-card bg-[#3F4448] rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-1">Feature Importance</h3>
            <p className="text-gray-500 text-xs mb-5">
              Random Forest model feature weights
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={featureImportance}
                layout="vertical"
                margin={{ left: 10, right: 20, top: 4, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  type="number"
                  tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="feature"
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                  {featureImportance.map((_, i) => (
                    <Cell
                      key={i}
                      fill={`rgba(16,185,129,${0.4 + (i / featureImportance.length) * 0.6})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Scatter: 24h Forecast Accuracy */}
          <div className="depth-card bg-[#3F4448] rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-1">24-Hour Forecast Accuracy</h3>
            <p className="text-gray-500 text-xs mb-5">Actual vs Predicted scatter · closer to diagonal = better</p>
            <ResponsiveContainer width="100%" height={260}>
              <ScatterChart margin={{ left: 0, right: 10, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  dataKey="actual"
                  name="Actual"
                  type="number"
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: "Actual AQI", position: "insideBottom", offset: -4, fill: "#6B7280", fontSize: 11 }}
                />
                <YAxis
                  dataKey="predicted"
                  name="Predicted"
                  type="number"
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: "Predicted AQI", angle: -90, position: "insideLeft", fill: "#6B7280", fontSize: 11 }}
                />
                <Tooltip content={<ScatterTooltip />} cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={scatterData} fill="#10B981" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart Row 2: Actual vs Predicted Line */}
        <div className="depth-card bg-[#3F4448] rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-1">Actual vs Predicted AQI — 100 Hour Window</h3>
          <p className="text-gray-500 text-xs mb-5">Model prediction overlay on real data</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={actualVsPredicted}
              margin={{ left: 0, right: 20, top: 4, bottom: 4 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="hour"
                tick={{ fill: "#9CA3AF", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                label={{ value: "Hours", position: "insideBottom", offset: -4, fill: "#6B7280", fontSize: 11 }}
              />
              <YAxis
                tick={{ fill: "#9CA3AF", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 12, color: "#9CA3AF" }}
                iconType="line"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
                name="Actual AQI"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#60A5FA"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 3"
                name="Predicted AQI"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
