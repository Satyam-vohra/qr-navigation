/**
 * API Routes
 */

import express from "express";
import fs from "fs";
import path from "path";
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

// Honeypot Simulation Logging Endpoint
const honeypotLogs = [];

router.post("/api/honeypot", (req, res) => {
  const { type, payload, timestamp, deviceInfo } = req.body;
  const logEntry = {
    id: Date.now().toString(),
    type: type || "UNKNOWN_ATTACK",
    payload: payload || {},
    timestamp: timestamp || new Date().toISOString(),
    ip: req.ip,
    device: deviceInfo || "Unknown"
  };
  
  honeypotLogs.push(logEntry);
  console.log(`\n🚨 [HONEYPOT ALERT] Type: ${logEntry.type} | IP: ${logEntry.ip} | Device: ${logEntry.device}`);
  console.log("Payload Dump:", JSON.stringify(payload, null, 2));

  // Cowrie Honeypot Log Format Integration
  const cowrieLog = {
    eventid: `cowrie.session.${type ? type.toLowerCase() : "input"}`,
    src_ip: req.ip || "127.0.0.1",
    timestamp: logEntry.timestamp,
    message: `Suspicious payload detected: ${JSON.stringify(payload)}`,
    input: payload?.scannedData || payload?.input || JSON.stringify(payload)
  };

  fs.appendFile(
    path.join(process.cwd(), "cowrie-honeypot.log"),
    JSON.stringify(cowrieLog) + "\n",
    (err) => {
      if (err) console.error("Failed to write to Cowrie honeypot log", err);
    }
  );
  
  // Return fake generic response to attacker
  res.status(200).json({ success: true, message: "Request processed" });
});

router.get("/api/honeypot/logs", (req, res) => {
  res.status(200).json({ success: true, count: honeypotLogs.length, logs: honeypotLogs });
});

export default router;