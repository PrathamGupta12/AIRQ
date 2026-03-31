import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import Navbar from "@/components/airq/Navbar";
import Footer from "@/components/airq/Footer";
import CursorTrail from "@/components/airq/CursorTrail";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AirQ — AI-Based Air Quality Prediction",
  description:
    "AirQ uses advanced Random Forest machine learning to predict air quality deterioration in major Indian cities before it happens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-[#2F3336] text-white`}>
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "AirQ", "version": "1.0.0"}'
        />
        <CursorTrail />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
