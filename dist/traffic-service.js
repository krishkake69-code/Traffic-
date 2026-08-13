var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class TrafficService {
    constructor(config) {
        this.apiKey = null;
        this.fallbackToMock = true;
        this.timerId = null;
        this.mockRoads = [
            "NH-48 Golden Quadrilateral",
            "Mumbai-Pune Expressway Sector 2",
            "Chennai Bypass Highway",
            "Delhi-Gurugram Border Link",
            "Electronic City Flyover Phase 1",
            "Outer Ring Road Bengaluru",
            "Yamuna Expressway Zone A",
            "OMR Road Sector-4"
        ];
        this.mockStates = [
            "Maharashtra",
            "Karnataka",
            "Tamil Nadu",
            "Haryana",
            "Uttar Pradesh",
            "Delhi"
        ];
        if (config) {
            this.apiKey = config.apiKey || null;
            this.fallbackToMock = config.fallbackToMock !== undefined ? config.fallbackToMock : true;
        }
    }
    setApiKey(key) {
        this.apiKey = key;
    }
    /**
     * Fetches real-time traffic incidents.
     * Uses TomTom Incident API if an API key is present; otherwise falls back to simulating a live stream of incident data.
     */
    fetchIncidents() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.apiKey) {
                try {
                    // TomTom Traffic Incident API (bbox defaults to a bounding box in India)
                    // Format: minLon,minLat,maxLon,maxLat
                    const bbox = "72.5,18.5,80.5,28.5";
                    const url = `https://api.tomtom.com/traffic/services/4/incidentDetails/s3/${bbox}/10/-1/json?key=${this.apiKey}`;
                    const response = yield fetch(url);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = yield response.json();
                    return this.parseTomTomIncidents(data);
                }
                catch (error) {
                    console.warn("Failed to fetch real-time incidents from TomTom. Falling back to mock stream.", error);
                    if (this.fallbackToMock) {
                        return this.generateMockIncidents();
                    }
                    throw error;
                }
            }
            else {
                // Default to mock real-time simulator out-of-the-box
                return this.generateMockIncidents();
            }
        });
    }
    /**
     * Starts polling for real-time incidents.
     * @param callback Function that handles updated list of incidents
     * @param intervalMs Polling frequency (default 8 seconds)
     */
    startLiveSync(callback, intervalMs = 8000) {
        if (this.timerId) {
            this.stopLiveSync();
        }
        // Initial fetch
        this.fetchIncidents().then(callback).catch(err => console.error("Sync error:", err));
        this.timerId = window.setInterval(() => __awaiter(this, void 0, void 0, function* () {
            try {
                const incidents = yield this.fetchIncidents();
                callback(incidents);
            }
            catch (err) {
                console.error("Sync error in polling interval:", err);
            }
        }), intervalMs);
    }
    /**
     * Stops polling.
     */
    stopLiveSync() {
        if (this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
    /**
     * Parses the TomTom Incident Details JSON response into clean Incident objects.
     */
    parseTomTomIncidents(data) {
        var _a, _b;
        const incidents = [];
        if (!data || !data.tm || !data.tm.poi)
            return incidents;
        const pois = data.tm.poi;
        for (const p of pois) {
            // Map TomTom categories (1: Accident, 2: Fog, 3: Rain, etc.)
            let type = 'Hazard';
            if (p.ic === 1 || p.ic === 9)
                type = 'Accident';
            else if (p.ic === 6)
                type = 'Congestion';
            else if (p.ic === 5)
                type = 'Roadworks';
            // Severity mapping (0: Low, 1: Minor, 2: Moderate, 3: Major/Critical)
            let severity = 'LOW';
            if (p.ty === 3 || p.ty === 4)
                severity = 'CRITICAL';
            else if (p.ty === 2)
                severity = 'HIGH';
            else if (p.ty === 1)
                severity = 'MEDIUM';
            incidents.push({
                id: p.id || Math.random().toString(36).substr(2, 9),
                type: type,
                severity: severity,
                description: p.d || "Traffic disruption detected",
                delaySeconds: p.dl || 0,
                speedKmh: p.fsp || 45,
                roadName: p.r || "Unspecified Highway",
                coordinates: {
                    lat: ((_a = p.p) === null || _a === void 0 ? void 0 : _a.y) || 0,
                    lng: ((_b = p.p) === null || _b === void 0 ? void 0 : _b.x) || 0
                },
                timestamp: new Date().toISOString()
            });
        }
        return incidents;
    }
    /**
     * Generates dummy real-time accident and traffic incident data.
     */
    generateMockIncidents() {
        const count = Math.floor(Math.random() * 3) + 2; // 2 to 4 incidents
        const incidents = [];
        const types = ['Accident', 'Congestion', 'Speeding', 'Hazard'];
        const severities = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
        const descriptions = [
            "Collision between heavy truck and container carrier. Slow traffic flow.",
            "Vehicle breakdown blocking the middle lane. Police on scene.",
            "Speed limits violated by multi-car racer convoy. Speed enforcement active.",
            "Severe waterlogging / surface flooding after sudden showers.",
            "Debris detected on highway lane. Emergency cleanup crews dispatched."
        ];
        for (let i = 0; i < count; i++) {
            const state = this.mockStates[Math.floor(Math.random() * this.mockStates.length)];
            const subRoad = this.mockRoads[Math.floor(Math.random() * this.mockRoads.length)];
            const roadName = `${state} - ${subRoad}`;
            const type = types[Math.floor(Math.random() * types.length)];
            let severity = severities[Math.floor(Math.random() * severities.length)];
            if (type === 'Accident')
                severity = Math.random() > 0.4 ? 'CRITICAL' : 'HIGH';
            incidents.push({
                id: `mock-${Math.random().toString(36).substr(2, 5)}`,
                type: type,
                severity: severity,
                description: descriptions[Math.floor(Math.random() * descriptions.length)],
                delaySeconds: type === 'Accident' ? Math.floor(Math.random() * 900) + 300 : Math.floor(Math.random() * 200),
                speedKmh: type === 'Speeding' ? Math.floor(Math.random() * 40) + 110 : Math.floor(Math.random() * 40) + 15,
                roadName: roadName,
                coordinates: {
                    lat: 12.9716 + (Math.random() * 10 - 5),
                    lng: 77.5946 + (Math.random() * 10 - 5)
                },
                timestamp: new Date().toISOString()
            });
        }
        return incidents;
    }
}
