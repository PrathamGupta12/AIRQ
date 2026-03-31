"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Cpu, Wind, Activity } from "lucide-react";

interface FormData {
  city: string;
  currentAqi: string;
  aqi1h: string;
  aqi24h: string;
  temperature: string;
  precipitation: string;
  windSpeed: string;
  hour: string;
  month: string;
}

interface Prediction {
  oneHour: number;
  twentyFourHour: number;
}

function aqiCategory(aqi: number): { label: string; color: string; bg: string } {
  if (aqi <= 50) return { label: "Good", color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30" };
  if (aqi <= 100) return { label: "Satisfactory", color: "text-lime-400", bg: "bg-lime-500/15 border-lime-500/30" };
  if (aqi <= 200) return { label: "Moderate", color: "text-yellow-400", bg: "bg-yellow-500/15 border-yellow-500/30" };
  if (aqi <= 300) return { label: "Poor", color: "text-orange-400", bg: "bg-orange-500/15 border-orange-500/30" };
  if (aqi <= 400) return { label: "Very Poor", color: "text-red-400", bg: "bg-red-500/15 border-red-500/30" };
  return { label: "Severe", color: "text-purple-400", bg: "bg-purple-500/15 border-purple-500/30" };
}

function simulatePredict(form: FormData): Prediction {
  const base = parseFloat(form.currentAqi) || 120;
  const lag1 = parseFloat(form.aqi1h) || base;
  const lag24 = parseFloat(form.aqi24h) || base;
  const wind = parseFloat(form.windSpeed) || 5;
  const temp = parseFloat(form.temperature) || 28;
  const hour = parseInt(form.hour) || 12;

  // Simulated RF-like computation
  const windEffect = wind > 15 ? -0.15 : wind > 8 ? -0.05 : 0.08;
  const tempEffect = temp > 35 ? 0.06 : temp < 20 ? -0.04 : 0;
  const lagEffect = (lag1 - base) * 0.35 + (lag24 - base) * 0.25;
  const peakHour = hour >= 7 && hour <= 10 ? 0.1 : hour >= 17 && hour <= 21 ? 0.12 : -0.05;

  const oneHour = Math.round(
    base + lagEffect + base * (windEffect + tempEffect + peakHour) + (Math.random() - 0.5) * 8
  );
  const twentyFourHour = Math.round(
    base + lagEffect * 0.5 + lag24 * 0.2 + base * (windEffect + tempEffect) + (Math.random() - 0.5) * 18
  );

  return {
    oneHour: Math.max(10, Math.min(500, oneHour)),
    twentyFourHour: Math.max(10, Math.min(500, twentyFourHour)),
  };
}

const inputClass =
  "w-full bg-[#2F3336] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all";

const labelClass = "block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide";

export default function PredictionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Prediction | null>(null);
  const [form, setForm] = useState<FormData>({
    city: "Delhi",
    currentAqi: "",
    aqi1h: "",
    aqi24h: "",
    temperature: "",
    precipitation: "",
    windSpeed: "",
    hour: new Date().getHours().toString(),
    month: (new Date().getMonth() + 1).toString(),
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1200));
    setResult(simulatePredict(form));
    setLoading(false);
  };

  const oneHourCat = result ? aqiCategory(result.oneHour) : null;
  const tfhCat = result ? aqiCategory(result.twentyFourHour) : null;

  return (
    <section id="predict" className="py-20">
      <div
        ref={sectionRef}
        className="section-fade max-w-7xl mx-auto px-4 sm:px-6"
      >
        {/* Header */}
        <div className="mb-10">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-2">
            Core Tool
          </p>
          <h2 className="text-3xl font-bold text-white">
            Prediction &amp; <span className="text-emerald-400">Monitoring</span>
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Enter environmental parameters to receive AI-powered AQI forecasts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="depth-card bg-[#3F4448] rounded-2xl p-6 border border-white/7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-emerald-500/15 border border-emerald-500/25 rounded-xl flex items-center justify-center">
                <Cpu className="w-4.5 h-4.5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Model Input Parameters</h3>
                <p className="text-gray-500 text-xs">Random Forest Regressor</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* City */}
              <div className="col-span-2">
                <label className={labelClass}>City</label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {["Delhi", "Hyderabad", "Kolkata", "Mumbai"].map((c) => (
                    <option key={c} value={c} className="bg-[#2F3336]">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* AQI inputs */}
              <div>
                <label className={labelClass}>Current AQI</label>
                <input
                  name="currentAqi"
                  type="number"
                  placeholder="e.g. 145"
                  value={form.currentAqi}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>AQI 1h Ago</label>
                <input
                  name="aqi1h"
                  type="number"
                  placeholder="e.g. 132"
                  value={form.aqi1h}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="col-span-2">
                <label className={labelClass}>AQI 24h Ago</label>
                <input
                  name="aqi24h"
                  type="number"
                  placeholder="e.g. 160"
                  value={form.aqi24h}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Weather */}
              <div>
                <label className={labelClass}>Temperature (°C)</label>
                <input
                  name="temperature"
                  type="number"
                  placeholder="e.g. 32"
                  value={form.temperature}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Precipitation (mm)</label>
                <input
                  name="precipitation"
                  type="number"
                  placeholder="e.g. 0"
                  value={form.precipitation}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Wind Speed (km/h)</label>
                <input
                  name="windSpeed"
                  type="number"
                  placeholder="e.g. 12"
                  value={form.windSpeed}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Hour (0–23)</label>
                <input
                  name="hour"
                  type="number"
                  min="0"
                  max="23"
                  placeholder="e.g. 8"
                  value={form.hour}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Month (1–12)</label>
                <input
                  name="month"
                  type="number"
                  min="1"
                  max="12"
                  placeholder="e.g. 11"
                  value={form.month}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <button
              onClick={handlePredict}
              disabled={loading}
              className="glow-btn mt-6 w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-700 disabled:opacity-60 text-white font-bold rounded-xl transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running Model…
                </>
              ) : (
                <>
                  <Wind className="w-4 h-4" />
                  Predict Future AQI
                </>
              )}
            </button>
          </div>

          {/* Output */}
          <div className="depth-card bg-[#3F4448] rounded-2xl p-6 border border-white/7 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-blue-500/15 border border-blue-500/25 rounded-xl flex items-center justify-center">
                <Activity className="w-4.5 h-4.5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Prediction Output</h3>
                <p className="text-gray-500 text-xs">{form.city} · AI Forecast</p>
              </div>
            </div>

            {!result && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 bg-[#2F3336] rounded-2xl flex items-center justify-center mb-4">
                  <Wind className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-gray-500 font-medium">Awaiting Model Input…</p>
                <p className="text-gray-600 text-sm mt-1">
                  Fill in the parameters and click Predict.
                </p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/20">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                </div>
                <p className="text-emerald-400 font-medium">Processing…</p>
                <p className="text-gray-500 text-sm mt-1">Running Random Forest inference</p>
              </div>
            )}

            {result && oneHourCat && tfhCat && (
              <div className="flex-1 flex flex-col gap-5">
                {/* 1h prediction */}
                <div
                  className={`rounded-2xl p-5 border ${oneHourCat.bg}`}
                >
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-semibold">
                    1-Hour Prediction
                  </p>
                  <div className="flex items-end gap-3">
                    <span className={`text-5xl font-extrabold tabular-nums ${oneHourCat.color}`}>
                      {result.oneHour}
                    </span>
                    <div className="mb-1.5">
                      <span className={`text-lg font-bold ${oneHourCat.color}`}>AQI</span>
                      <p className="text-gray-400 text-xs">{oneHourCat.label}</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-black/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${oneHourCat.color.replace("text-", "bg-")}`}
                      style={{ width: `${Math.min(100, (result.oneHour / 500) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* 24h prediction */}
                <div
                  className={`rounded-2xl p-5 border ${tfhCat.bg}`}
                >
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-semibold">
                    24-Hour Prediction
                  </p>
                  <div className="flex items-end gap-3">
                    <span className={`text-5xl font-extrabold tabular-nums ${tfhCat.color}`}>
                      {result.twentyFourHour}
                    </span>
                    <div className="mb-1.5">
                      <span className={`text-lg font-bold ${tfhCat.color}`}>AQI</span>
                      <p className="text-gray-400 text-xs">{tfhCat.label}</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-black/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${tfhCat.color.replace("text-", "bg-")}`}
                      style={{ width: `${Math.min(100, (result.twentyFourHour / 500) * 100)}%` }}
                    />
                  </div>
                </div>

                <p className="text-gray-600 text-xs text-center mt-auto">
                  * Simulated output — connect to Python/Scikit-learn backend for live inference
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
