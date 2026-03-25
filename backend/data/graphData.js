/**
 * Floor-wise graph data for navigation
 * Ground floor layout with corridor structure
 * 
 * Layout: GATE NUMBER 1 → CR-101 (5m) → CR-102 (5m)
 *         From CR-102: Right side → LAB 1, Left side → LIFT
 */

export const graphData = {
  groundFloor: {
    name: "Ground Floor",
    nodes: {
      "GATE NUMBER 1": { 
        x: 50, 
        y: 250, 
        type: "gate", 
        name: "Gate Number 1",
        description: "Main entrance gate"
      },
      "CR-101": { 
        x: 150, 
        y: 250, 
        type: "classroom", 
        name: "Classroom 101",
        description: "Classroom 101"
      },
      "CR-102": { 
        x: 250, 
        y: 250, 
        type: "classroom", 
        name: "Classroom 102",
        description: "Classroom 102"
      },
      "LAB 1": { 
        x: 350, 
        y: 250, 
        type: "lab", 
        name: "Lab 1",
        description: "Laboratory 1 (right side)"
      },
      "LIFT": { 
        x: 250, 
        y: 350, 
        type: "lift", 
        name: "Lift",
        description: "Elevator (left side)"
      }
    },
    edges: {
      "GATE NUMBER 1": { "CR-101": 5 },
      "CR-101": { "GATE NUMBER 1": 5, "CR-102": 5 },
      "CR-102": { "CR-101": 5, "LAB 1": 10, "LIFT": 8 },
      "LAB 1": { "CR-102": 10 },
      "LIFT": { "CR-102": 8 }
    }
  }
};

/**
 * Get graph for a specific floor
 * @param {string} floor - Floor identifier (groundFloor, floor2, floor3)
 * @returns {Object} Graph edges
 */
export function getFloorGraph(floor = "groundFloor") {
  const floorData = graphData[floor];
  return floorData ? floorData.edges : graphData.groundFloor.edges;
}

/**
 * Get all locations for a specific floor
 * @param {string} floor - Floor identifier
 * @returns {Array} List of location names
 */
export function getFloorLocations(floor = "groundFloor") {
  const floorData = graphData[floor];
  if (!floorData) return [];
  return Object.keys(floorData.nodes).map(key => ({
    id: key,
    name: floorData.nodes[key].name,
    type: floorData.nodes[key].type,
    coordinates: { x: floorData.nodes[key].x, y: floorData.nodes[key].y }
  }));
}

/**
 * Get all available floors
 * @returns {Array} List of floors with metadata
 */
export function getAllFloors() {
  return Object.entries(graphData).map(([key, data]) => ({
    id: key,
    name: data.name,
    nodeCount: Object.keys(data.nodes).length
  }));
}

/**
 * Validate if a location exists on a floor
 * @param {string} floor - Floor identifier
 * @param {string} location - Location identifier
 * @returns {boolean}
 */
export function locationExists(floor, location) {
  const floorData = graphData[floor];
  if (!floorData) return false;
  return location in floorData.nodes;
}

/**
 * Get coordinates for a location
 * @param {string} floor - Floor identifier
 * @param {string} location - Location identifier
 * @returns {Object} Coordinates {x, y}
 */
export function getLocationCoordinates(floor, location) {
  const floorData = graphData[floor];
  if (!floorData || !floorData.nodes[location]) return null;
  return {
    x: floorData.nodes[location].x,
    y: floorData.nodes[location].y
  };
}

/**
 * Get all node coordinates for a floor
 * @param {string} floor - Floor identifier
 * @returns {Object} Map of location IDs to coordinates
 */
export function getFloorCoordinates(floor = "groundFloor") {
  const floorData = graphData[floor];
  if (!floorData) return {};
  const coordinates = {};
  Object.entries(floorData.nodes).forEach(([key, node]) => {
    coordinates[key] = { x: node.x, y: node.y };
  });
  return coordinates;
}

/**
 * Get node information
 * @param {string} floor - Floor identifier
 * @param {string} location - Location identifier
 * @returns {Object} Complete node information
 */
export function getNodeInfo(floor, location) {
  const floorData = graphData[floor];
  if (!floorData || !floorData.nodes[location]) return null;
  return floorData.nodes[location];
}