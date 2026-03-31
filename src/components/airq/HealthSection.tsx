"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const aqiScale = [
  {
    range: "0–50",
    label: "Good",
    color: "#10B981",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    description: "Air quality is considered satisfactory, and air pollution poses little or no risk.",
    advice: [
      "Ideal for all outdoor activities.",
      "Open windows to enjoy fresh air.",
      "No special precautions needed.",
      "Good time for exercise and sports.",
    ],
  },
  {
    range: "51–100",
    label: "Satisfactory",
    color: "#84CC16",
    bg: "bg-lime-500/10",
    border: "border-lime-500/20",
    text: "text-lime-400",
    dot: "bg-lime-400",
    description: "Air quality is acceptable; however, some pollutants may pose a moderate concern for a small number of people.",
    advice: [
      "Unusually sensitive people should consider reducing prolonged outdoor exertion.",
      "Most people can remain outdoors safely.",
      "Watch for symptoms if you have respiratory issues.",
    ],
  },
  {
    range: "101–200",
    label: "Moderate",
    color: "#FBBF24",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    text: "text-yellow-400",
    dot: "bg-yellow-400",
    description: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
    advice: [
      "Sensitive groups (elderly, children, asthma patients) should limit outdoor activity.",
      "Consider wearing a surgical mask outdoors.",
      "Keep windows closed during peak hours (7–10 AM, 5–8 PM).",
      "Stay hydrated.",
    ],
  },
  {
    range: "201–300",
    label: "Poor",
    color: "#F97316",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    text: "text-orange-400",
    dot: "bg-orange-400",
    description: "Health warnings of emergency conditions. The entire population is more likely to be affected.",
    advice: [
      "Avoid prolonged outdoor physical exertion.",
      "Wear an N95 mask if going out.",
      "Keep indoor air purifiers running.",
      "Sensitive groups should stay indoors.",
      "Avoid morning and evening rush-hour exposure.",
    ],
  },
  {
    range: "301–400",
    label: "Very Poor",
    color: "#EF4444",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-400",
    dot: "bg-red-400",
    description: "Health alert: everyone may experience serious health effects.",
    advice: [
      "Everyone should avoid outdoor activities.",
      "N95 masks mandatory if you must go out.",
      "Seal windows and doors with weather stripping.",
      "Run air purifiers on highest setting.",
      "Consult a doctor if experiencing breathing difficulties.",
    ],
  },
  {
    range: "400+",
    label: "Severe",
    color: "#7C3AED",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    dot: "bg-purple-400",
    description: "Hazardous: emergency health conditions. Everyone is at risk.",
    advice: [
      "Avoid ALL outdoor physical activity.",
      "Wear an N95 mask. Do not use surgical masks.",
      "Keep indoor air purifiers running 24/7.",
      "Seek medical attention if experiencing any respiratory symptoms.",
      "Children, elderly, and patients must stay indoors.",
      "Consider temporary relocation if possible.",
    ],
  },
];

export default function HealthSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

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
    <section id="health" className="py-20">
      <div
        ref={sectionRef}
        className="section-fade max-w-7xl mx-auto px-4 sm:px-6"
      >
        {/* Header */}
        <div className="mb-10">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-2">
            Health Advisory
          </p>
          <h2 className="text-3xl font-bold text-white">
            AQI Scale &amp; <span className="text-emerald-400">Recommendations</span>
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Click any category to expand personalized health advice.
          </p>
        </div>

        {/* Scale table */}
        <div className="depth-card bg-[#3F4448] rounded-2xl overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-gray-500 text-xs uppercase tracking-wide px-6 py-4 font-semibold">AQI Range</th>
                  <th className="text-left text-gray-500 text-xs uppercase tracking-wide px-6 py-4 font-semibold">Category</th>
                  <th className="text-left text-gray-500 text-xs uppercase tracking-wide px-6 py-4 font-semibold hidden md:table-cell">Color</th>
                  <th className="text-left text-gray-500 text-xs uppercase tracking-wide px-6 py-4 font-semibold hidden lg:table-cell">Description</th>
                </tr>
              </thead>
              <tbody>
                {aqiScale.map((row, i) => (
                  <tr key={row.label} className={`border-b border-white/5 last:border-0 ${i % 2 === 1 ? "bg-black/10" : ""}`}>
                    <td className={`px-6 py-3 font-bold tabular-nums ${row.text}`}>{row.range}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center gap-2 font-semibold ${row.text}`}>
                        <span className={`w-2 h-2 rounded-full ${row.dot}`} />
                        {row.label}
                      </span>
                    </td>
                    <td className="px-6 py-3 hidden md:table-cell">
                      <span className="w-6 h-6 rounded-md inline-block" style={{ background: row.color }} />
                    </td>
                    <td className="px-6 py-3 text-gray-400 text-xs hidden lg:table-cell max-w-xs">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expandable cards */}
        <h3 className="text-white font-semibold text-lg mb-4">
          Dynamic Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aqiScale.map((item) => (
            <div
              key={item.label}
              className={`depth-card rounded-2xl overflow-hidden border transition-all duration-200 ${item.border} ${
                expanded === item.label ? "bg-[#3F4448]" : "bg-[#3A3E42] hover:bg-[#3F4448]"
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setExpanded(expanded === item.label ? null : item.label)}
              >
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  <span className={`font-bold text-sm ${item.text}`}>
                    {item.label}
                    <span className="text-gray-500 font-normal ml-2">({item.range})</span>
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    expanded === item.label ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expanded === item.label && (
                <div className="px-5 pb-5">
                  <p className="text-gray-400 text-xs mb-3 leading-relaxed">{item.description}</p>
                  <ul className="space-y-1.5">
                    {item.advice.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot}`} />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
