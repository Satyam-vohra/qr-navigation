## Quick Start Guide

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Expo CLI (for frontend development)

### Step 1: Start the Backend

```bash
cd backend
npm install
npm start
```

You should see:
```
╔════════════════════════════════════════════════════════════╗
║          QR Navigation Backend API                         ║
║════════════════════════════════════════════════════════════╝
║
║  Server running at http://localhost:3000
```

**Keep this terminal open!** The backend must run on port 3000.

### Step 2: Update Backend IP (Important!)
If running on different machines, find your backend machine's IP:

**Windows:**
```bash
ipconfig
# Look for "IPv4 Address" (usually 192.168.x.x)
```

**Mac/Linux:**
```bash
ifconfig
# Look for "inet" address
```

Update `qr-navigation1/utils/apiConfig.ts`:
```typescript
export const API_BASE_URL = 'http://YOUR_IP_HERE:3000';
```

### Step 3: Start the Frontend

**In a new terminal:**
```bash
cd qr-navigation1
npm install
npm start
```

Press:
- `i` for iOS Simulator
- `a` for Android Emulator  
- `w` for Web (first press 'w', then 'o' to open browser)

### Step 4: Test the App

1. **Home Screen**: You should see two buttons: "Scan QR" and "Manual Search"
2. **Manual Search**: Click to select start/destination locations
3. **Find Route**: Click to see the navigation map
4. **Success**: You should see the floor map with route highlighted

### Testing Without Backend

The app works completely **offline** with local data! The backend is optional.

### Ports
- **Backend**: 3000
- **Frontend**: 3000-3010 (Expo dev server)

### Common Issues

| Issue | Solution |
|-------|----------|
| Backend not starting | Check if port 3000 is in use: `netstat -ano` |
| Frontend can't connect to backend | Update API_BASE_URL to correct IP |
| QR scanner not working | Grant camera permissions |
| Module not found errors | Run `npm install` in both folders |

### File Structure After Cleanup

```
qr-navigation1/
├── app/                      # All screen components
│   ├── HomeScreen.js
│   ├── QrScannerScreen.js
│   ├── DestinationScreen.js
│   └── MapScreen.js
├── components/
│   └── MapCanvas.js          # Map visualization
├── utils/
│   ├── locations.js          # Location database
│   └── apiConfig.ts          # Backend API config
└── constants/
    └── theme.ts              # UI theme

backend/
├── server.js                 # Express server
├── routes/api.js            # API routes
├── controllers/             # Business logic
├── algorithms/dijkstra.js   # Pathfinding
└── data/graphData.js        # Graph data
```

All files are clean and production-ready!
