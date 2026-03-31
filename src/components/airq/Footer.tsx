"use client";

import { Wind } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Project Details", href: "#project" },
  { label: "Developer Credits", href: "#credits" },
];

export default function Footer() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#262A2D] border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <Wind className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="font-bold text-base">
              <span className="text-emerald-400">Air</span>
              <span className="text-white">Q</span>
            </span>
            <span className="text-gray-500 text-sm ml-2">AI Air Quality Prediction</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © 2024 AirQ. Developed by{" "}
            <span className="text-emerald-400 font-medium">Pratham</span> · BCA, Christ University
          </p>
        </div>
      </div>
    </footer>
  );
}
