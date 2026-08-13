# Smart Traffic Analytics Pro

**AI-Powered Accident Prevention Dashboard with Real-Time Incident Monitoring**

A data-driven road safety platform built for Indian highway zones. The application provides AI-generated safety recommendations, a live TypeScript-powered incident fetching engine, an interactive 3D traffic simulation viewport, and an analytical dashboard for monitoring violations and accident prevention.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [TypeScript Build](#typescript-build)
- [TomTom API Integration](#tomtom-api-integration)
- [Contributing](#contributing)

---

## Overview

Smart Traffic Analytics Pro is a single-page application designed to assist traffic management authorities and road safety researchers in tracking, visualising, and responding to high-risk road zones across India. The platform correlates violations, accidents, and speeding incidents to generate a risk index, produce prioritised recommendations, and simulate real-world traffic conditions in a 3D environment.

---

## Key Features

### 3D Traffic Simulation

- Real-time 3D highway rendered using Three.js with animated vehicles, lane markings, and streetlights.
- Scene parameters adapt dynamically to the selected zone: higher violation counts increase vehicle density; higher speeding incidents raise vehicle velocity.
- Risk-level visualisations:
  - **High Risk:** Spawns a hazard zone with warning barriers and a stationary police patrol vehicle with alternating red-blue strobe lighting.
  - **Medium Risk:** Renders an automated radar speed-detection arch across the carriageway.
  - **Low Risk:** Displays standard steady traffic flow with no incident indicators.
- Camera modes: **Orbit View** (free navigation), **Chase Camera** (follows a selected vehicle), and **Overhead Traffic Camera** (top-down aerial perspective).
- Toggleable **Day/Night lighting cycle** affecting ambient scene illumination, street lamp activation, and vehicle headlights.

### Real-Time Incident Sync (TypeScript)

- Modular TypeScript service class (`TrafficService`) with strongly typed `Incident` and `FetchConfig` interfaces.
- Integrates with the **TomTom Traffic Incident Details API** using configurable bounding box parameters.
- Automatic fallback to a configurable mock incident stream when no API key is present, ensuring continuous demonstration capability.
- Active polling scheduler (`startLiveSync` / `stopLiveSync`) with configurable interval (default: 8 seconds).
- Live incidents are mapped to zone entries, automatically populating the sidebar and updating the 3D scene.

### Dashboard and Analytics

- Glassmorphic UI with translucent panel containers, glowing focus states, and dark gradient backgrounds.
- Sidebar zone selector with real-time risk estimation preview updating as form values are entered.
- Chart.js visualisations:
  - **Risk Breakdown:** Doughnut chart distributing tracked zones across High, Medium, and Low risk categories.
  - **Safety Impact Margin:** Bar chart showing the estimated percentage reduction in accident risk per zone.
- Sortable data grid listing all tracked zones with full metadata and top recommendations.
- CSV export generating a structured action plan for operational use.

---

## Project Structure

```
Traffic-/
├── index.html               # Application entry point, layout, styles, and main script
├── package.json             # Node.js project configuration and build scripts
├── tsconfig.json            # TypeScript compiler configuration
├── src/
│   └── traffic-service.ts   # TypeScript source — real-time incident fetching service
└── dist/
    └── traffic-service.js   # Transpiled JavaScript module loaded by index.html
```

---

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A modern web browser (Chrome, Edge, or Firefox recommended)

### Installation

Clone the repository:

```bash
git clone https://github.com/krishkake69-code/Traffic-.git
cd Traffic-
```

Install development dependencies:

```bash
npm install
```

---

## TypeScript Build

Compile the TypeScript source to the distribution directory:

```bash
npm run build
```

This transpiles `src/traffic-service.ts` into `dist/traffic-service.js` according to the options defined in `tsconfig.json` (target: ES6, module: ES6).

### Running Locally

Open `index.html` directly in a browser, or serve it via a local HTTP server to ensure ES module imports resolve correctly:

```bash
# Python 3
python -m http.server 8000
```

Then navigate to `http://localhost:8000`.

---

## TomTom API Integration

By default, the application operates using a simulated incident stream. To connect to live traffic data:

1. Create a developer account at [developer.tomtom.com](https://developer.tomtom.com/).
2. Retrieve your API key from the developer portal.
3. In `index.html`, locate the `TrafficAnalytics` constructor and pass the key to the service:

```javascript
this.trafficService = new TrafficService({
    apiKey: 'YOUR_TOMTOM_API_KEY',
    fallbackToMock: true
});
```

The `fallbackToMock: true` option ensures the application continues to function if the API request fails or the key is invalid.

**Coverage note:** The default bounding box is set to a region covering central and western India (`72.5°E–80.5°E, 18.5°N–28.5°N`). Adjust the `bbox` parameter inside `traffic-service.ts` to target a different geographic area.

---

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes with a descriptive message.
4. Open a pull request against the `main` branch.

Please ensure TypeScript source files are compiled before submitting (`npm run build`), and that the `dist/` output is included in your pull request.

---

*Developed for road safety research and traffic management applications across Indian National and State Highways.*
