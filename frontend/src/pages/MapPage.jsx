
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  CircleMarker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import "../Styles/map.css";
import Newsletter from "../shared/Newsletter";

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapPage = () => {
  const [mode, setMode] = useState("live");
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [livePosition, setLivePosition] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);

  const [startCoords, setStartCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const current = [latitude, longitude];
        setLivePosition(current);
        setMapCenter(current);
      },
      () => alert("Failed to get current location")
    );
  }, []);

  const fetchRoute = async () => {
    if (!destination) return alert("Please enter a destination");

    try {
      let start;

      if (mode === "live") {
        if (!livePosition) return alert("Live location not available");
        start = livePosition;
      } else {
        if (!startLocation) return alert("Please enter a start location");
        const startRes = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${startLocation}`
        );
        if (!startRes.data[0]) return alert("Start location not found");
        start = [
          parseFloat(startRes.data[0].lat),
          parseFloat(startRes.data[0].lon),
        ];
      }

      const destRes = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
      );
      if (!destRes.data[0]) return alert("Destination not found");

      const end = [
        parseFloat(destRes.data[0].lat),
        parseFloat(destRes.data[0].lon),
      ];

      setStartCoords(start);
      setDestCoords(end);
      setMapCenter(start);

      const res = await axios.post("http://localhost:4000/api/v1/route", {
        coordinates: [
          [start[1], start[0]], // lng, lat
          [end[1], end[0]],
        ],
      });

      const route = res.data.features[0];
      const coords = route.geometry.coordinates.map((c) => [c[1], c[0]]);
      setRouteCoords(coords);

      const distInKm =
        (route.properties?.summary?.distance ||
          route.properties?.distance ||
          0) / 1000;
      setDistance(distInKm.toFixed(2));
    } catch (err) {
      console.error("Error fetching route:", err.response?.data || err.message);
      alert("Error fetching route");
    }
  };

  const RecenterMap = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
      if (coords) map.setView(coords, 13);
    }, [coords]);
    return null;
  };

  return (
    <>
      <div className="map-page">
        <h2>Reach Your Destination</h2>

        <div className="controls">
          <div>
            <label>
              <input
                type="radio"
                value="live"
                checked={mode === "live"}
                onChange={() => setMode("live")}
              />
              Use Live Location
            </label>
            <label>
              <input
                type="radio"
                value="custom"
                checked={mode === "custom"}
                onChange={() => setMode("custom")}
              />
              Use Custom Start Location
            </label>
          </div>

          {mode === "custom" && (
            <input
              type="text"
              placeholder="Enter start location..."
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
          )}
          <input
            type="text"
            placeholder="Enter destination..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button onClick={fetchRoute}>Search</button>
        </div>

        {distance && (
          <p className="distance-info">
            <strong>Distance:</strong> {distance} km
          </p>
        )}

        {mapCenter && (
          <MapContainer center={mapCenter} zoom={13} className="map">
            <RecenterMap coords={mapCenter} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {/* Show Live Location as Circle */}
            {livePosition && (
              <CircleMarker
                center={livePosition}
                radius={10}
                pathOptions={{
                  color: "green",
                  fillColor: "green",
                  fillOpacity: 0.7,
                }}
              />
            )}

            {/* Starting point marker (from route) */}
            {startCoords && <Marker position={startCoords} />}

            {/* Destination marker */}
            {destCoords && <Marker position={destCoords} />}

            {/* Route line */}
            {routeCoords.length > 0 && (
              <Polyline positions={routeCoords} color="blue" />
            )}
          </MapContainer>
        )}
      </div>
      <Newsletter />
    </>
  );
};

export default MapPage;
