/**
 * Dijkstra's Algorithm Implementation
 * Finds the shortest path between two locations
 */

export function dijkstra(graph, start, end) {
  const dist = {};
  const prev = {};
  const nodes = new Set(Object.keys(graph));

  // Initialize distances
  Object.keys(graph).forEach(n => {
    dist[n] = Infinity;
    prev[n] = null;
  });
  dist[start] = 0;

  // Main algorithm loop
  while (nodes.size) {
    // Find unvisited node with smallest distance
    let u = null;
    for (let n of nodes) {
      if (u === null || dist[n] < dist[u]) u = n;
    }

    // If unreachable or destination reached, break
    if (dist[u] === Infinity || u === end) break;

    nodes.delete(u);

    // Update distances to neighbors
    for (let v in graph[u]) {
      const alt = dist[u] + graph[u][v];
      if (alt < dist[v]) {
        dist[v] = alt;
        prev[v] = u;
      }
    }
  }

  // Reconstruct path
  const path = [];
  let cur = end;
  while (cur) {
    path.unshift(cur);
    cur = prev[cur];
  }

  return {
    path,
    distance: dist[end],
    found: dist[end] !== Infinity
  };
}

/**
 * Calculate total distance for a route
 * @param {Array} path - Array of location nodes
 * @param {Object} graph - Graph object with distances
 * @returns {number} Total distance in meters
 */
export function calculatePathDistance(path, graph) {
  let totalDistance = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const current = path[i];
    const next = path[i + 1];
    if (graph[current] && graph[current][next]) {
      totalDistance += graph[current][next];
    }
  }
  return totalDistance;
}