# QR-Based Indoor Navigation System - Backend API

A Node.js/Express backend service for the QR-code based indoor navigation system. This API provides route calculation, location management, and floor-wise navigation data.

## Features

- **Route Calculation**: Uses Dijkstra's algorithm for shortest path finding
- **Multi-Floor Support**: Manage navigation across multiple floors
- **Location Validation**: Validate QR codes against known locations
- **RESTful API**: Clean, RESTful endpoints for easy integration
- **CORS Enabled**: Compatible with mobile and web frontends

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Algorithm**: Dijkstra's shortest path
- **API**: RESTful JSON API

## Installation

### Prerequisites
- Node.js v14+ installed
- npm or yarn package manager

### Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (already provided):
```bash
# Default configuration is in .env
```

4. Start the server:

#### Development (with auto-reload):
```bash
npm install --save-dev nodemon
npm run dev
```

#### Production:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### 1. Health Check
```
GET /api/health
```

Response:
```json
{
  "success": true,
  "message": "QR Navigation API is running",
  "timestamp": "2024-02-16T10:30:00.000Z"
}
```

### 2. Calculate Route
```
POST /api/route/calculate
Content-Type: application/json

{
  "floor": "floor1",
  "start": "Entry",
  "end": "CR-102"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "floor": "floor1",
    "path": ["Entry", "CR-101", "CR-102"],
    "pathDetails": [
      {
        "id": "Entry",
        "name": "Main Entry",
        "type": "entry",
        "coordinates": { "x": 40, "y": 250 }
      }
    ],
    "totalDistance": 10,
    "estimatedTime": 8
  }
}
```

### 3. Get Floor Locations
```
GET /api/locations/floor1
```

Response:
```json
{
  "success": true,
  "data": {
    "floor": "floor1",
    "locations": [
      {
        "id": "Entry",
        "name": "Main Entry",
        "type": "entry",
        "coordinates": { "x": 40, "y": 250 }
      }
    ],
    "count": 5
  }
}
```

### 4. Get All Floors
```
GET /api/floors
```

Response:
```json
{
  "success": true,
  "data": {
    "floors": [
      {
        "id": "floor1",
        "name": "Floor 1 - Ground Level",
        "nodeCount": 5
      }
    ],
    "totalFloors": 3
  }
}
```

### 5. Validate QR Location
```
POST /api/location/validate
Content-Type: application/json

{
  "floor": "floor1",
  "location": "CR-101"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "floor": "floor1",
    "location": "CR-101",
    "name": "Classroom 101",
    "type": "classroom",
    "coordinates": { "x": 140, "y": 250 }
  }
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

Common error codes:
- `400`: Bad Request (missing or invalid parameters)
- `404`: Not Found (location or floor doesn't exist)
- `500`: Internal Server Error

## Directory Structure

```
backend/
├── algorithms/          # Pathfinding algorithms
│   └── dijkstra.js
├── controllers/         # Route controllers
│   └── routeController.js
├── data/               # Static data
│   └── graphData.js
├── routes/             # API routes
│   └── api.js
├── server.js           # Main server file
├── package.json        # Dependencies
├── .env               # Environment variables
└── README.md          # This file
```

## Data Structure

### Graph Format
Each floor contains nodes (locations) and edges (connections with distances):

```javascript
{
  Entry: { "CR-101": 5, "Corridor-1": 4 },
  "CR-101": { Entry: 5, "CR-102": 5 },
  // ... more connections
}
```

### Node Information
```javascript
{
  x: 40,                    // SVG X coordinate
  y: 250,                   // SVG Y coordinate
  type: "entry",            // location type
  name: "Main Entry"        // display name
}
```

## Configuration

### Available Floors
- `floor1`: Ground Level (5 locations)
- `floor2`: First Level (4 locations)
- `floor3`: Second Level (4 locations)

### Location Types
- `entry`: Main entry/exit point
- `classroom`: Regular classroom
- `lab`: Computer/Science lab
- `office`: Administrative office
- `corridor`: Walkway
- `stairs`: Staircase

## Future Enhancements

- [ ] Database integration (MongoDB)
- [ ] User authentication
- [ ] QR code generation endpoint
- [ ] Navigation history tracking
- [ ] Real-time location updates
- [ ] Accessibility features
- [ ] Mobile app analytics
- [ ] Multi-language support

## Development Notes

### Adding a New Floor

1. Add floor data to `data/graphData.js`:
```javascript
floor4: {
  name: "Floor 4 - Third Level",
  nodes: { /* ... */ },
  edges: { /* ... */ }
}
```

2. Add coordinates for the floor map

3. No code changes needed - API will automatically support it

### Testing Routes

Use Postman, curl, or any HTTP client:

```bash
# Test health check
curl http://localhost:3000/api/health

# Test route calculation
curl -X POST http://localhost:3000/api/route/calculate \
  -H "Content-Type: application/json" \
  -d '{"floor":"floor1","start":"Entry","end":"CR-102"}'

# Get floor locations
curl http://localhost:3000/api/locations/floor1

# Get all floors
curl http://localhost:3000/api/floors
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in .env
PORT=3001
```

### CORS Issues
Update `.env`:
```
CORS_ORIGIN=http://localhost:19000
```

### Module Errors
Ensure `package.json` has `"type": "module"` for ES6 imports

## License

MIT License - Free to use and modify

## Support

For issues or suggestions, please refer to the main project documentation.
