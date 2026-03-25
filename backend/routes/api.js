/**
 * API Routes
 */

import express from "express";
import {
  calculateRoute,
  getLocations,
  getAllFloorsInfo,
  validateLocation
} from "../controllers/routeController.js";

const router = express.Router();

// Route calculation endpoints
router.post("/api/route/calculate", calculateRoute);
router.get("/api/locations/:floor", getLocations);
router.get("/api/floors", getAllFloorsInfo);
router.post("/api/location/validate", validateLocation);

// Health check
router.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "QR Navigation API is running",
    timestamp: new Date().toISOString()
  });
});

export default router;