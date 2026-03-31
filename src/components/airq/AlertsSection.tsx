"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, CheckCircle, Info, TrendingUp, TrendingDown, Wind } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "warning",
    icon: AlertTriangle,
    city: "Delhi",
    time: "2 min ago",
    title: "AQI predicted to spike by 45 points",
    detail:
      "Model detects sustained low wind speeds (<4 km/h) combined with rising traffic hours. AQI expected to cross 220 by 9:00 PM.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    dot: "bg-orange-400",
  },
  {
    id: 2,
    type: "success",
    icon: CheckCircle,
    city: "Mumbai",
    time: "11 min ago",
    title: "Coastal winds expected to clear pollution",
    detail:
      "Sea-breeze pattern developing offshore. AQI forecast to drop from 85 to 55 over the next 6 hours.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  {
    id: 3,
    type: "info",
    icon: TrendingUp,
    city: "Kolkata",
    time: "28 min ago",
    title: "Moderate deterioration trend detected",
    detail:
      "AQI has been climbing for 3 consecutive hours. Current: 148. Predicted: 172 in 4h. Cause: vehicle congestion + calm meteorology.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    dot: "bg-yellow-400",
  },
  {
    id: 4,
    type: "info",
    icon: Info,
    city: "Hyderabad",
    time: "45 min ago",
    title: "Stable AQI conditions forecast",
    detail:
      "No significant changes expected in the next 24 hours. Moderate wind activity keeping pollutant dispersion at healthy levels.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    dot: "bg-blue-400",
  },
  {
    id: 5,
    type: "warning",
    icon: Wind,
    city: "Delhi",
    time: "1 hr ago",
    title: "Stubble burning impact detected in north districts",
    detail:
      "Satellite data and lag-24 feature showing elevated PM2.5 precursor signals. Peak AQI likely between 11 PM–2 AM.",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    dot: "bg-red-400",
  },
  {
    id: 6,
    type: "success",
    icon: TrendingDown,
    city: "Bangalore",
    time: "2 hrs ago",
    title: "Rain event cleared overnight pollution",
    detail:
      "Rainfall of 8mm recorded early morning. AQI has improved from 95 to 48 — now in 'Good' category.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
];

export default function AlertsSection() {
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

  return (
    <section id="alerts" className="py-20">
      <div
        ref={sectionRef}
        className="section-fade max-w-7xl mx-auto px-4 sm:px-6"
      >
        {/* Header */}
        <div className="mb-10">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-2">
            Live Feed
          </p>
          <h2 className="text-3xl font-bold text-white">
            Alerts &amp; <span className="text-emerald-400">Notifications</span>
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Real-time model-generated alerts for air quality events across monitored cities.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Active Warnings", value: "2", color: "text-orange-400" },
            { label: "Clearance Events", value: "2", color: "text-emerald-400" },
            { label: "Info Updates", value: "2", color: "text-blue-400" },
          ].map((s) => (
            <div key={s.label} className="depth-card bg-[#3F4448] rounded-2xl p-4 text-center">
              <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/5 hidden sm:block" />

          <div className="flex flex-col gap-4">
            {alerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <div
                  key={alert.id}
                  className={`depth-card relative sm:pl-16 bg-[#3F4448] rounded-2xl p-5 border ${alert.border} hover:translate-y-[-2px] transition-all duration-200`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`hidden sm:flex absolute left-3.5 top-5 w-5 h-5 rounded-full ${alert.bg} border ${alert.border} items-center justify-center`}
                  >
                    <span className={`w-2 h-2 rounded-full ${alert.dot}`} />
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-xl ${alert.bg} border ${alert.border} flex items-center justify-center sm:hidden`}
                    >
                      <Icon className={`w-4 h-4 ${alert.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${alert.color} hidden sm:block`} />
                          <span className={`text-sm font-bold ${alert.color}`}>
                            {alert.city} Alert
                          </span>
                        </div>
                        <span className="text-gray-600 text-xs">{alert.time}</span>
                      </div>
                      <p className="text-white text-sm font-semibold mb-1">{alert.title}</p>
                      <p className="text-gray-400 text-xs leading-relaxed">{alert.detail}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
