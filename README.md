# Smart Traffic Analytics Pro 🚦🤖

An AI-powered accident prevention recommendation dashboard and real-time portal for Indian Highway Safety. Built with a premium glassmorphic cyberpunk theme, an interactive 3D traffic simulation engine (Three.js), custom data charts (Chart.js), and a real-time incident polling service written in TypeScript.

![Dashboard Preview](https://img.shields.io/badge/UI--UX-Premium%20Glassmorphic-38bdf8)
![Technologies](https://img.shields.io/badge/3D-Three.js-c084fc)
![Language](https://img.shields.io/badge/Lang-TypeScript%20%2B%20HTML-10b981)

---

## 🌟 Key Features

*   **Interactive 3D Traffic Simulation (Three.js)**
    *   Renders a live 3D highway scene with driving vehicles, streetlights, and traffic lanes.
    *   Dynamically binds scene parameters to active data (e.g., higher speeding records = faster car speeds; higher violations = denser traffic flow).
    *   Visualizes danger spots: spawns crashed hazard zones with parked police patrols and flashing strobe lights for high-risk zones, and speed camera arches for medium-risk zones.
    *   Multiple camera viewing modes: *Orbit View* (interactive navigation), *Chase Cam* (follows a vehicle), and *Overhead Traffic Cam*.
    *   Interactive *Day/Night cycle* that toggles ambient lighting, street lamps, and car headlight beams.
*   **TypeScript Real-Time Incident Sync Engine**
    *   Written in modular, strongly typed TypeScript (`src/traffic-service.ts`).
    *   Includes a polling scheduler syncing real-time accident, hazard, and speeding data.
    *   Integrates TomTom's Incident Details API, with automatic out-of-the-box fallback to localized mock streams if no API key is defined.
*   **Premium Glassmorphic Dashboard**
    *   Deep space gradients, translucent glass containers with `backdrop-filter` blur, glowing borders, custom layout structures, and animated hover transitions.
    *   Sidebar selector with quick zone selection and live estimation risk badges (Low, Medium, High) updating as you type.
*   **Analytics & Visual Reports**
    *   Responsive Chart.js configurations parsing risk spreads (Doughnut) and safety reduction impact margins (Bar).
    *   CSV export function to download localized safety action plans.

---

## 📂 Project Structure

```text
├── index.html          # Core single-page web app and styling
├── package.json        # Node scripts & TS devDependencies
├── tsconfig.json       # TypeScript compiler options
├── src/
│   └── traffic-service.ts  # Strongly typed real-time fetching logic
└── dist/
    └── traffic-service.js  # Transpiled javascript file loaded in index.html
```

---

## 🚀 Setup & Launch Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/krishkake69-code/Traffic-.git
   cd Traffic-
   ```
2. Install dependencies (TypeScript compiler):
   ```bash
   npm install
   ```

### Compile TypeScript Code
Compile the TypeScript fetching service into the distribution directory:
```bash
npm run build
```
This transpiles `src/traffic-service.ts` into `dist/traffic-service.js`.

### Launching the Dashboard
Simply open the `index.html` file in any modern web browser.
*   *Tip:* You can use vscode extension "Live Server" or simple python server `python -m http.server 8000` to run it locally.

---

## 🛠️ TomTom API Integration (Optional)

To hook up actual live feeds instead of mock data:
1. Register a developer account at [TomTom Developer Portal](https://developer.tomtom.com/).
2. Get your free API Key.
3. In `index.html` inside the script module setup:
   ```javascript
   this.trafficService = new TrafficService({
       apiKey: 'YOUR_TOMTOM_API_KEY_HERE',
       fallbackToMock: true
   });
   ```

---

## 🤝 Contributing
Feel free to fork this project, open pull requests, or file issues to enhance the 3D rendering or predictive AI algorithms!
