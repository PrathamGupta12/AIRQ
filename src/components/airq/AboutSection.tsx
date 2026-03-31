"use client";

import { useEffect, useRef } from "react";
import { AlertCircle, Lightbulb, Github, Linkedin, Code2, Cpu, FileCode, Database, Layers } from "lucide-react";

const techStack = [
  { icon: Code2, name: "React", desc: "Frontend UI framework", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { icon: Layers, name: "Tailwind CSS", desc: "Utility-first styling", color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
  { icon: FileCode, name: "Python", desc: "Backend & model training", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  { icon: Database, name: "Pandas", desc: "Data manipulation & EDA", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  { icon: Cpu, name: "Scikit-Learn", desc: "ML model training", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { icon: Database, name: "NumPy", desc: "Numerical computing", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
];

export default function AboutSection() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const creditsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [aboutRef.current, projectRef.current, creditsRef.current];
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    elements.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* About */}
      <section id="about" className="py-20">
        <div ref={aboutRef} className="section-fade max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-2">About AirQ</p>
            <h2 className="text-3xl font-bold text-white">
              Understanding the <span className="text-emerald-400">Challenge</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Problem */}
            <div className="depth-card bg-[#3F4448] rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-white font-bold text-lg">The Problem</h3>
              </div>
              <div className="space-y-3 text-gray-400 text-sm leading-relaxed">
                <p>
                  Air pollution in Indian cities is one of the most severe public health crises of our time.
                  India is home to 9 of the world&apos;s 10 most polluted cities, with Delhi routinely recording
                  AQI levels above 400 — classified as &quot;Severe&quot; on the national index.
                </p>
                <p>
                  The danger lies not just in the pollution itself, but in its <span className="text-white font-medium">unpredictability</span>.
                  Sudden spikes driven by vehicle emissions, industrial output, crop burning, and adverse
                  meteorological conditions catch residents off-guard, leading to preventable hospitalizations
                  and long-term respiratory damage.
                </p>
                <p>
                  Without advance warning, individuals, hospitals, and city planners cannot take protective
                  measures before conditions deteriorate. The gap between data collection and actionable
                  forecasting has historically been too wide.
                </p>
              </div>
            </div>

            {/* The Solution */}
            <div className="depth-card bg-[#3F4448] rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-white font-bold text-lg">The Solution</h3>
              </div>
              <div className="space-y-3 text-gray-400 text-sm leading-relaxed">
                <p>
                  AirQ addresses this challenge with a machine learning-powered forecasting system trained on
                  <span className="text-white font-medium"> historical lag data and weather variables</span>.
                  By treating past AQI values (1-hour and 24-hour lags) as the most predictive features,
                  the model captures the momentum of pollution events before they peak.
                </p>
                <p>
                  The core algorithm — a <span className="text-emerald-400 font-medium">Random Forest Regressor</span> —
                  was chosen for its robustness to non-linear relationships, resistance to overfitting on tabular
                  data, and interpretability through feature importance scores.
                </p>
                <p>
                  The result is a system that can predict AQI up to 24 hours ahead with strong accuracy,
                  giving residents, city officials, and health workers the lead time needed to act — before
                  the smog arrives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section id="project" className="py-20 bg-[#2A2D30]/50">
        <div ref={projectRef} className="section-fade max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-2">Technical</p>
            <h2 className="text-3xl font-bold text-white">
              Project <span className="text-emerald-400">Details</span>
            </h2>
          </div>

          {/* Tech stack */}
          <div className="mb-10">
            <h3 className="text-white font-semibold text-lg mb-5">Tech Stack</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {techStack.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className={`depth-card ${tech.bg} border ${tech.border} rounded-xl p-4 text-center hover:scale-105 transition-transform`}
                  >
                    <Icon className={`w-6 h-6 ${tech.color} mx-auto mb-2`} />
                    <p className={`text-sm font-bold ${tech.color}`}>{tech.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{tech.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Model explanation */}
          <div className="depth-card bg-[#3F4448] rounded-2xl p-7">
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              Random Forest Regressor — How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-400 text-sm leading-relaxed">
              <div>
                <h4 className="text-white font-semibold mb-2">Architecture</h4>
                <p className="mb-3">
                  A Random Forest is an ensemble of decision trees, each trained on a random bootstrap sample
                  of the training data. For regression tasks like AQI prediction, the final output is the
                  mean prediction across all trees — typically 100–500 estimators.
                </p>
                <p>
                  Each tree independently learns non-linear splits on features like{" "}
                  <span className="text-emerald-400 font-mono text-xs">AQI_lag24</span>,{" "}
                  <span className="text-emerald-400 font-mono text-xs">temperature</span>, and{" "}
                  <span className="text-emerald-400 font-mono text-xs">wind_speed</span>.
                  By averaging, the ensemble cancels out individual tree variance.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Key Features Used</h4>
                <ul className="space-y-1.5">
                  {[
                    { name: "AQI_lag24", pct: "41%", desc: "AQI value 24 hours prior" },
                    { name: "AQI_lag1", pct: "28%", desc: "AQI value 1 hour prior" },
                    { name: "Temperature", pct: "12%", desc: "Affects pollutant dispersion" },
                    { name: "Wind Speed", pct: "9%", desc: "Ventilation coefficient" },
                    { name: "Hour", pct: "5%", desc: "Diurnal traffic patterns" },
                    { name: "Precipitation", pct: "3%", desc: "Wet deposition effect" },
                  ].map((f) => (
                    <li key={f.name} className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        <span className="text-emerald-300 font-mono text-xs">{f.name}</span>
                        <span className="text-gray-500 text-xs">{f.desc}</span>
                      </span>
                      <span className="text-emerald-400 text-xs font-bold">{f.pct}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Credits */}
      <section id="credits" className="py-20">
        <div ref={creditsRef} className="section-fade max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-2">Credits</p>
          <h2 className="text-3xl font-bold text-white mb-8">
            Developer <span className="text-emerald-400">Credits</span>
          </h2>

          <div className="depth-card bg-[#3F4448] rounded-2xl p-8">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl font-extrabold text-emerald-400">P</span>
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-1">Pratham</h3>
            <p className="text-emerald-400 font-semibold mb-1">Full-Stack Developer & ML Engineer</p>
            <p className="text-gray-400 text-sm mb-2">BCA Student · Christ University, Bangalore</p>
            <p className="text-gray-500 text-xs mb-6">
              Developed and trained the AirQ prediction system as part of academic research into
              environmental machine learning and real-time data applications.
            </p>

            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              This project combines data science, meteorological modeling, and modern web development
              to address one of India&apos;s most pressing public health challenges. AirQ was designed,
              built, and trained entirely by Pratham — from feature engineering and model evaluation
              in Python to the full React/Tailwind frontend.
            </p>

            {/* Links */}
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#2F3336] hover:bg-[#4A5055] border border-white/10 text-gray-300 hover:text-white text-sm font-semibold rounded-xl transition-all"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 text-blue-400 text-sm font-semibold rounded-xl transition-all"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>

          <p className="text-gray-600 text-xs mt-6">
            Built with React · Tailwind CSS · Recharts · Next.js · Python · Scikit-Learn
          </p>
        </div>
      </section>
    </>
  );
}
