/**
 * Floor-wise graph data for navigation
 * Rectilinear representation
 */

export const graphData = {
  groundFloor: {
    name: "Campus Mapping",
    nodes: {
      "Entry_Top": { x: 200, y: -200, type: "gate", name: "Entry Top" },
      "Admin_Office": { x: 0, y: -200, type: "office", name: "Admin Office" },
      "Placement_Cell": { x: 400, y: -200, type: "office", name: "Placement Cell" },
      
      "Central_Library": { x: 200, y: -100, type: "library", name: "Central Library" },
      "Seminar_Hall": { x: 400, y: -100, type: "hall", name: "Seminar Hall" },
      
      "Open_Audi": { x: 200, y: 0, type: "hall", name: "Open Audi" },
      "Ubuntu_Lab": { x: 0, y: 0, type: "lab", name: "Ubuntu Lab" },
      "Conference_Hall": { x: 400, y: 0, type: "hall", name: "Conference Hall" },

      "Stairs_Left": { x: 0, y: 100, type: "stairs", name: "Stairs (Left)" },
      "CR101": { x: 100, y: 100, type: "classroom", name: "CR 101" },
      "CR102": { x: 200, y: 100, type: "classroom", name: "CR 102" },
      "Stairs_Right": { x: 400, y: 100, type: "stairs", name: "Stairs (Right)" },

      "CR103": { x: 0, y: 200, type: "classroom", name: "CR 103" },
      "CR104": { x: 100, y: 200, type: "classroom", name: "CR 104" },
      "CR105": { x: 200, y: 200, type: "classroom", name: "CR 105" },
      "Staff_Room": { x: 400, y: 200, type: "office", name: "Staff Rooms" },

      "Bosch_Lab": { x: 0, y: 300, type: "lab", name: "Bosch Lab" },
      "Lab_10": { x: 200, y: 300, type: "lab", name: "Lab 10" },

      "Lab_1": { x: 200, y: 400, type: "lab", name: "Lab 1" },
      "Lift": { x: 400, y: 400, type: "lift", name: "Lifts" }
    },
    edges: {
      "Admin_Office": { "Entry_Top": 200 },
      "Entry_Top": { "Admin_Office": 200, "Placement_Cell": 200, "Central_Library": 100 },
      "Placement_Cell": { "Entry_Top": 200, "Seminar_Hall": 100 },
      
      "Central_Library": { "Entry_Top": 100, "Open_Audi": 100 },
      "Seminar_Hall": { "Placement_Cell": 100, "Conference_Hall": 100 },

      "Ubuntu_Lab": { "Open_Audi": 200, "Stairs_Left": 100 },
      "Open_Audi": { "Ubuntu_Lab": 200, "Conference_Hall": 200, "Central_Library": 100, "CR102": 100 },
      "Conference_Hall": { "Open_Audi": 200, "Seminar_Hall": 100, "Stairs_Right": 100 },

      "Stairs_Left": { "Ubuntu_Lab": 100, "CR101": 100, "CR103": 100 },
      "CR101": { "Stairs_Left": 100, "CR102": 100, "CR104": 100 },
      "CR102": { "CR101": 100, "Stairs_Right": 200, "Open_Audi": 100, "CR105": 100 },
      "Stairs_Right": { "CR102": 200, "Conference_Hall": 100, "Staff_Room": 100 },

      "CR103": { "Stairs_Left": 100, "CR104": 100, "Bosch_Lab": 100 },
      "CR104": { "CR103": 100, "CR105": 100, "CR101": 100 },
      "CR105": { "CR104": 100, "Staff_Room": 200, "CR102": 100, "Lab_10": 100 },
      "Staff_Room": { "CR105": 200, "Stairs_Right": 100, "Lift": 200 },

      "Bosch_Lab": { "CR103": 100, "Lab_10": 200 },
      "Lab_10": { "Bosch_Lab": 200, "CR105": 100, "Lab_1": 100 },

      "Lab_1": { "Lab_10": 100, "Lift": 200 },
      "Lift": { "Lab_1": 200, "Staff_Room": 200 }
    }
  }
};

export function getFloorGraph(floor = "groundFloor") {
  const floorData = graphData[floor];
  return floorData ? floorData.edges : graphData.groundFloor.edges;
}

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

export function getAllFloors() {
  return Object.entries(graphData).map(([key, data]) => ({
    id: key,
    name: data.name,
    nodeCount: Object.keys(data.nodes).length
  }));
}

export function locationExists(floor, location) {
  const floorData = graphData[floor];
  if (!floorData) return false;
  return location in floorData.nodes;
}

export function getLocationCoordinates(floor, location) {
  const floorData = graphData[floor];
  if (!floorData || !floorData.nodes[location]) return null;
  return {
    x: floorData.nodes[location].x,
    y: floorData.nodes[location].y
  };
}

export function getFloorCoordinates(floor = "groundFloor") {
  const floorData = graphData[floor];
  if (!floorData) return {};
  const coordinates = {};
  Object.entries(floorData.nodes).forEach(([key, node]) => {
    coordinates[key] = { x: node.x, y: node.y };
  });
  return coordinates;
}

export function getNodeInfo(floor, location) {
  const floorData = graphData[floor];
  if (!floorData || !floorData.nodes[location]) return null;
  return floorData.nodes[location];
}