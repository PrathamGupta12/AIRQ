# AirQ — AI-Based Air Quality Prediction

AirQ is a machine learning-powered web application that predicts air quality deterioration in major Indian cities using a **Random Forest Regressor** model trained on historical AQI lag data and weather variables.

## Features

- 🌬️ **1-Hour & 24-Hour AQI Forecasts** — Input environmental parameters and get AI-powered predictions
- 📊 **Real-Time Analytics Dashboard** — Feature importance, scatter plots, and AQI trends
- 🏥 **Health Advisory** — Expandable AQI scale with personalized health recommendations  
- 🔔 **Live Alerts Feed** — Model-generated alerts for air quality events across monitored cities
- 🎨 **Premium UI** — Glassmorphism design with animated cursor trail and smoke effects

## Tech Stack

- **Frontend:** React + Vite + TypeScript + CSS
- **Charts:** Recharts
- **ML Backend:** Python · Scikit-Learn · Pandas · NumPy
- **Model:** Random Forest Regressor

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   ├── airq/         # Page-level section components
│   └── Layout.tsx    # App shell (Navbar + Footer)
├── pages/            # Route page wrappers
├── index.css         # Global styles
└── App.tsx           # Router setup
```

## Developer

Developed by **Pratham** — BCA Student, Christ University Bangalore  
Full-Stack Developer & ML Engineer
