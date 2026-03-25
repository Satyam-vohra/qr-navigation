# QR-Based Indoor Navigation System

A complete, fully-working QR code-based indoor navigation system for college campuses.

## 🚀 Overview

- **Frontend**: React Native + Expo (iOS/Android)
- **Backend**: Node.js + Express API
- **Algorithm**: Dijkstra's shortest path
- **UI**: SVG-based interactive floor maps

## ✅ Features

- ✓ QR code scanning for location detection
- ✓ Interactive floor map visualization  
- ✓ Real-time route calculation
- ✓ Distance and direction display
- ✓ Offline-first with local data fallback
- ✓ Professional UI with smooth interactions
- ✓ Full error handling and validation

## 📂 Project Structure

```
├── backend/                  # Node.js API server
│   ├── server.js            # Express server
│   ├── routes/api.js        # API endpoints
│   ├── controllers/          # Request handlers
│   ├── algorithms/dijkstra.js  # Pathfinding
│   └── data/graphData.js    # Floor data
│
└── qr-navigation1/          # React Native app
    ├── app/                 # Screens
    ├── components/          # Reusable components
    ├── utils/               # Utilities & API config
    └── constants/           # Theme & constants
```

## 🔧 Setup & Installation

### Backend Setup

```bash
cd backend
npm install
npm start
```

The backend will run on `http://localhost:3000`

**API Endpoints:**
- `GET /api/health` - Health check
- `POST /api/route/calculate` - Calculate route between locations
- `GET /api/locations/:floor` - Get floor locations
- `GET /api/floors` - Get all available floors
- `POST /api/location/validate` - Validate QR location

### Frontend Setup

```bash
cd qr-navigation1
npm install
npm start
```

Then select your platform:
- `i` for iOS
- `a` for Android
- `w` for Web

## 🗺️ Current Floor Data

**Ground Floor** with 5 locations:
- GATE NUMBER 1 (Entry point)
- CR-101 (Classroom)
- CR-102 (Classroom)
- LAB 1 (Laboratory)
- LIFT (Elevator)

Routes are calculated using Dijkstra's algorithm based on weighted distances.

## 🎯 How to Use

1. **Home Screen**: Choose "Scan QR" or "Manual Search"
2. **QR Scanning**: Point camera at QR code to detect location
3. **Select Destination**: Pick your destination from the list
4. **View Route**: See the navigation map with calculated path
5. **Navigate**: Follow the route visualization

## ⚙️ Configuration

### Frontend API Configuration
Edit `qr-navigation1/utils/apiConfig.ts` to change backend URL:
```typescript
export const API_BASE_URL = 'http://192.168.1.100:3000';
```

### Backend Configuration
Edit `backend/.env` for server settings:
```
PORT=3000
HOST=0.0.0.0
NODE_ENV=development
```

## 📱 Technologies Used

**Frontend:**
- React Native
- Expo
- Expo Router (Navigation)
- expo-barcode-scanner (QR)
- react-native-svg (Maps)

**Backend:**
- Express.js
- Node.js
- CORS support
- RESTful API

## 🐛 Troubleshooting

**Backend not connecting?**
- Ensure backend is running on port 3000
- Update API_BASE_URL in `apiConfig.ts` to your machine's IP

**QR Scanner not working?**
- Grant camera permissions
- Ensure QR code is well-lit and in focus

**Routes not calculating?**
- Check that both locations exist on the selected floor
- Verify graph data includes both locations

## 📝 License

ISC
