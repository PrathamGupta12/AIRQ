"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Zap, TrendingUp, BarChart2 } from "lucide-react";

const cities = [
  { name: "Delhi", aqi: 178, level: "Poor" },
  { name: "Hyderabad", aqi: 94, level: "Moderate" },
  { name: "Kolkata", aqi: 145, level: "Poor" },
  { name: "Mumbai", aqi: 62, level: "Satisfactory" },
  { name: "Chennai", aqi: 71, level: "Satisfactory" },
  { name: "Bangalore", aqi: 53, level: "Good" },
];

const aqiColorMap: Record<string, string> = {
  Good: "text-emerald-400",
  Satisfactory: "text-lime-400",
  Moderate: "text-yellow-400",
  Poor: "text-orange-400",
  "Very Poor": "text-red-400",
  Severe: "text-purple-400",
};

const features = [
  {
    icon: Zap,
    title: "1-Hour Micro-Forecasts",
    desc: "Get hyper-local AQI predictions for the next hour using real-time lag features and weather data.",
  },
  {
    icon: TrendingUp,
    title: "24-Hour Trend Analysis",
    desc: "Understand how air quality will evolve throughout the day with confidence intervals and trend lines.",
  },
  {
    icon: BarChart2,
    title: "Data-Driven Insights",
    desc: "Visualize feature importance, model accuracy, and historical patterns powering every prediction.",
  },
];

export default function HomeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add("visible"),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollToPredict = () => {
    document.getElementById("predict")?.scrollIntoView({ behavior: "smooth" });
  };

  const marqueeItems = [...cities, ...cities];

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-16">
      {/* Hero */}
      <div
        ref={sectionRef}
        className="section-fade relative max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Live Air Quality Monitoring · India
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-tight mb-6">
            Stay Ahead of{" "}
            <span className="text-emerald-400 relative">
              the Smog.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 8"
                fill="none"
              >
                <path
                  d="M0 6 Q75 2 150 6 Q225 10 300 6"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            AirQ uses advanced{" "}
            <span className="text-emerald-400 font-medium">Random Forest</span> machine
            learning to predict air quality deterioration in major Indian cities before it
            happens.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToPredict}
              className="glow-btn flex items-center gap-2 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-base rounded-xl transition-all"
            >
              Run a Prediction
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 px-7 py-3.5 bg-[#3F4448] hover:bg-[#4A5055] border border-white/10 text-gray-300 font-semibold text-base rounded-xl transition-all"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Live Status Ticker */}
      <div className="bg-[#3F4448]/60 border-y border-white/5 py-3 overflow-hidden">
        <div className="flex items-center">
          <div className="flex-shrink-0 flex items-center gap-2 bg-emerald-500 px-4 py-1.5 text-white text-xs font-bold uppercase tracking-wider z-10">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Live AQI
          </div>
          <div className="overflow-hidden flex-1">
            <div className="marquee-inner">
              {marqueeItems.map((city, i) => (
                <span key={i} className="flex items-center gap-3 mx-8">
                  <span className="text-gray-300 text-sm font-medium">{city.name}</span>
                  <span
                    className={`text-sm font-bold tabular-nums ${aqiColorMap[city.level]}`}
                  >
                    AQI {city.aqi}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full bg-white/5 ${aqiColorMap[city.level]}`}
                  >
                    {city.level}
                  </span>
                  <span className="text-gray-600">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <p className="text-center text-gray-500 text-sm font-semibold uppercase tracking-widest mb-3">
          Platform Capabilities
        </p>
        <h2 className="text-center text-3xl font-bold text-white mb-12">
          Why Choose <span className="text-emerald-400">AirQ?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="depth-card bg-[#3F4448] rounded-2xl p-6 hover:border-emerald-500/30 hover:translate-y-[-4px] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-500/25 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
