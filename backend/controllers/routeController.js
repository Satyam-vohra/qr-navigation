/**
 * Route Controller
 * Handles route calculation and location queries
 */

import { dijkstra } from "../algorithms/dijkstra.js";
import {
  getFloorGraph,
  getFloorLocations,
  getAllFloors,
  locationExists,
  graphData
} from "../data/graphData.js";

/**
 * Calculate shortest path between two locations
 * POST /api/route/calculate
 */
export async function calculateRoute(req, res) {
  try {
    const { floor = "floor1", start, end } = req.body;

    // Validate input
    if (!start || !end) {
      return res.status(400).json({
        success: false,
        error: "Start and end locations are required"
      });
    }

    if (start === end) {
      return res.status(400).json({
        success: false,
        error: "Start and destination cannot be the same"
      });
    }

    // Check if locations exist on the floor
    if (!locationExists(floor, start) || !locationExists(floor, end)) {
      return res.status(404).json({
        success: false,
        error: `Location not found on ${floor}`
      });
    }

    // Get graph for the floor
    const graph = getFloorGraph(floor);
    const result = dijkstra(graph, start, end);

    if (!result.found) {
      return res.status(404).json({
        success: false,
        error: "No route found between selected locations"
      });
    }

    // Get coordinates for the path
    const floorData = graphData[floor];
    const pathWithCoordinates = result.path.map(location => ({
      id: location,
      name: floorData.nodes[location].name,
      type: floorData.nodes[location].type,
      coordinates: {
        x: floorData.nodes[location].x,
        y: floorData.nodes[location].y
      }
    }));

    return res.status(200).json({
      success: true,
      data: {
        floor,
        path: result.path,
        pathDetails: pathWithCoordinates,
        totalDistance: result.distance,
        estimatedTime: Math.ceil(result.distance / 1.4) // Assuming 1.4 m/s walking speed
      }
    });
  } catch (error) {
    console.error("Route calculation error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}

/**
 * Get all locations on a floor
 * GET /api/locations/:floor
 */
export async function getLocations(req, res) {
  try {
    const { floor = "floor1" } = req.params;
    const locations = getFloorLocations(floor);

    if (locations.length === 0) {
      return res.status(404).json({
        success: false,
        error: `Floor ${floor} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: {
        floor,
        locations,
        count: locations.length
      }
    });
  } catch (error) {
    console.error("Get locations error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}

/**
 * Get all available floors
 * GET /api/floors
 */
export async function getAllFloorsInfo(req, res) {
  try {
    const floors = getAllFloors();

    res.status(200).json({
      success: true,
      data: {
        floors,
        totalFloors: floors.length
      }
    });
  } catch (error) {
    console.error("Get floors error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}

/**
 * Validate QR code location
 * POST /api/location/validate
 */
export async function validateLocation(req, res) {
  try {
    const { floor = "floor1", location } = req.body;

    if (!location) {
      return res.status(400).json({
        success: false,
        error: "Location is required"
      });
    }

    if (locationExists(floor, location)) {
      const floorData = graphData[floor];
      const locData = floorData.nodes[location];

      return res.status(200).json({
        success: true,
        data: {
          floor,
          location,
          name: locData.name,
          type: locData.type,
          coordinates: { x: locData.x, y: locData.y }
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        error: "Location not found"
      });
    }
  } catch (error) {
    console.error("Validate location error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}