/**
 * Main Express Server
 * QR-based Indoor Navigation System Backend
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/api.js";

dotenv.config();

const app = express();
const BASE_PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const MAX_PORT_RETRIES = Number(process.env.MAX_PORT_RETRIES) || 10;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    name: "QR Navigation Backend API",
    version: "1.0.0",
    endpoints: {
      health: "GET /api/health",
      calculateRoute: "POST /api/route/calculate",
      getLocations: "GET /api/locations/:floor",
      getAllFloors: "GET /api/floors",
      validateLocation: "POST /api/location/validate"
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

function logServerStart(port) {
  const publicHost = HOST === "0.0.0.0" ? "localhost" : HOST;
  console.log("");
  console.log("============================================================");
  console.log("QR Navigation Backend API");
  console.log("============================================================");
  console.log(`Server running at: http://${publicHost}:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("");
  console.log("API Endpoints:");
  console.log("- GET  /api/health");
  console.log("- POST /api/route/calculate");
  console.log("- GET  /api/locations/:floor");
  console.log("- GET  /api/floors");
  console.log("- POST /api/location/validate");
  console.log("============================================================");
  console.log("");
}

function startServer(port = BASE_PORT, retriesLeft = MAX_PORT_RETRIES) {
  const server = app.listen(port, HOST, () => {
    logServerStart(port);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE" && retriesLeft > 0) {
      const nextPort = port + 1;
      console.warn(`Port ${port} is already in use. Retrying on ${nextPort}...`);
      startServer(nextPort, retriesLeft - 1);
      return;
    }

    console.error("Failed to start server:", error);
    process.exit(1);
  });
}

startServer();

export default app;
