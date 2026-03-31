"use client";

import CursorTrail from "@/components/airq/CursorTrail";
import Navbar from "@/components/airq/Navbar";
import HomeSection from "@/components/airq/HomeSection";
import DashboardSection from "@/components/airq/DashboardSection";
import PredictionSection from "@/components/airq/PredictionSection";
import HealthSection from "@/components/airq/HealthSection";
import AlertsSection from "@/components/airq/AlertsSection";
import AboutSection from "@/components/airq/AboutSection";
import Footer from "@/components/airq/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#2F3336] text-white">
      <CursorTrail />
      <Navbar />

      <main>
        <HomeSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border-t border-white/5" />
        </div>

        <DashboardSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border-t border-white/5" />
        </div>

        <PredictionSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border-t border-white/5" />
        </div>

        <HealthSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border-t border-white/5" />
        </div>

        <AlertsSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border-t border-white/5" />
        </div>

        <AboutSection />
      </main>

      <Footer />
    </div>
  );
}
