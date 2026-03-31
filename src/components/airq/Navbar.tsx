"use client";

import { useState, useEffect } from "react";
import { Wind, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Predict", href: "#predict" },
  { label: "Health", href: "#health" },
  { label: "Alerts", href: "#alerts" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#2F3336]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => scrollTo(e, "#home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
            <Wind className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            <span className="text-emerald-400">Air</span>
            <span className="text-white">Q</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all duration-200 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#predict"
          onClick={(e) => scrollTo(e, "#predict")}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold rounded-lg glow-btn transition-all duration-200"
        >
          Run a Prediction
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#3F4448]/95 backdrop-blur-md border-t border-white/5 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="px-3 py-2.5 text-sm text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#predict"
            onClick={(e) => scrollTo(e, "#predict")}
            className="mt-2 px-4 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-lg text-center"
          >
            Run a Prediction
          </a>
        </div>
      )}
    </header>
  );
}
