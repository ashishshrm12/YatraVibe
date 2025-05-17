import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
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
  const [position, setPosition] = useState(null);
  const [destination, setDestination] = useState("");
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      () => alert("Failed to get current location")
    );
  }, []);

  const fetchRoute = async () => {
    if (!destination || !position) return;

    try {
      // Step 1: Get coordinates of destination using Nominatim
      const geo = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
      );
      if (!geo.data[0]) return alert("Destination not found");

      const destCoords = [
        parseFloat(geo.data[0].lat),
        parseFloat(geo.data[0].lon),
      ];

      // Step 2: Call backend to get route from current location to destination
      const res = await axios.post("http://localhost:4000/api/v1/route", {
        coordinates: [
          [position[1], position[0]],       // current location: [lng, lat]
          [destCoords[1], destCoords[0]],   // destination: [lng, lat]
        ],
      });

      // Step 3: Extract coordinates from GeoJSON response
      const coords =
        res.data.features[0].geometry.coordinates.map((c) => [c[1], c[0]]); // to [lat, lng]
      setRouteCoords(coords);
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
      <h2>Map & Route</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Enter destination..."
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button onClick={fetchRoute}>Get Route</button>
      </div>

      {position && (
        <MapContainer center={position} zoom={13} className="map">
          <RecenterMap coords={position} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={position} />
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
