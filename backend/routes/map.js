import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { coordinates } = req.body;

  if (!coordinates || !Array.isArray(coordinates) || coordinates.length < 2) {
    return res.status(400).json({ error: "Invalid coordinates" });
  }

  try {
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      { coordinates },
      {
        headers: {
          Authorization: process.env.OPENROUTESERVICE_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data); // full route geojson
  } catch (error) {
    console.error("Route API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch route" });
  }
});

export default router;
