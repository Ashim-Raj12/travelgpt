# TravelGPT ✈️🌍

**Live Demo**: [https://travelgpt-frontend.onrender.com](https://travelgpt-frontend.onrender.com)

TravelGPT is an AI-powered travel planner that helps you generate personalized itineraries, search for hotels and flights, check real-time weather, and manage your travel budget—all in one place.

## Features

- **AI Itinerary Generation**: Create day-by-day travel plans using Google's Gemini AI based on your preferences.
- **Interactive Maps**: Visualize your trip with Leaflet integration.
- **Real-Time Weather**: Check the weather for your destination using the OpenWeather API.
- **Hotel & Flight Search**: Integrated search interface for finding accommodations and flights.
- **Travel Dashboard & Profile**: Save trips, track your budget, and manage your user profile with a clean, responsive UI.
- **Authentication**: Secure email/password login, JWT-based sessions, and OTP email verification.
- **Optimized Frontend**: Lazy loading, route-based code splitting, global caching via React Query, and PWA support.

### Recent Updates & Enhancements
- **Refined Search Experience**: Upgraded the `/search` page layout to use `DashboardLayout`, matching the app theme, and added smooth `framer-motion` animations.
- **Advanced Flight Search**: Flight search now supports specific "Where from?" (origin) and "Where to?" (destination) inputs.
- **Direct Booking Links**: Clicking "Book Ticket" on any flight result directly opens Google Flights pre-filled with your origin, destination, and airline.
- **Integrated Maps**: Hotel search results and Saved Trip (Itinerary) places now link directly to Google Maps, allowing you to instantly view the location of any recommended hotel or restaurant.
- **Robust Saved Trips**: Fixed a bug where missing traveler data caused saved trips to fall back to demo data. They now display accurately every time.
- **UI Polish**: Fixed overlapping CSS issues on the Daily Timeline where icons overlapped with the time indicator text.

---

## Tech Stack

### Frontend (Client)
- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Shadcn UI, Framer Motion
- **State/Data Fetching**: React Query, React Hook Form, Zod
- **Maps**: React Leaflet

### Backend (Server)
- **Framework**: Node.js + Express
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **AI Integration**: Google Gemini (`@google/genai`)
- **Authentication**: JWT, bcryptjs, nodemailer

---

## Local Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd travelgpt
```

### 2. Environment Variables
You will need to create `.env` files in both the `client` and `server` directories.

**server/.env**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=30d
CLIENT_URL=http://localhost:5173
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_password
GEMINI_API_KEY=your_google_gemini_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
```

**client/.env**
```env
VITE_API_URL=http://localhost:5000
```
*(Note: If omitted in local dev, the Vite proxy handles `/api` requests automatically)*

### 3. Install Dependencies & Run

You can run the client and server separately.

**Terminal 1 (Backend):**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` to view the application.

---

## Deployment (Render)

We have configured the project to be deployed on [Render.com](https://render.com) using separate Client and Server instances for optimal performance.

### Option A: One-Click Deploy using `render.yaml` (Recommended)

1. Connect your GitHub repository to Render.
2. In the Render Dashboard, go to **Blueprints**.
3. Create a New Blueprint Instance and select this repository.
4. Render will automatically detect the `render.yaml` file and create two services:
   - **travelgpt-server**: The Node.js API.
   - **travelgpt-client**: The React Static Site.
5. Provide the required Environment Variables in the Render UI when prompted (`MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, etc.).

### Option B: Manual Deployment

If you prefer to deploy them manually from the Render Dashboard:

#### 1. Deploy the Backend (Web Service)
- Create a new **Web Service**.
- Select the repository.
- Root Directory: `server`
- Environment: `Node`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Add Environment Variables from your local `.env`. Ensure `CLIENT_URL` is set to your frontend's final Render URL (e.g., `https://travelgpt-client.onrender.com`).

#### 2. Deploy the Frontend (Static Site)
- Create a new **Static Site**.
- Select the repository.
- Root Directory: `client`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- **Crucial Step (Rewrites)**: Go to the "Rewrites & Redirects" section of your Static Site on Render and add the following rules:
  1. **Proxy API Requests**: 
     - Source: `/api/*`
     - Destination: `https://travelgpt-server.onrender.com/api/*` *(replace with your actual server URL)*
     - Action: `Rewrite`
  2. **React Router Fallback**:
     - Source: `/*`
     - Destination: `/index.html`
     - Action: `Rewrite`

---

## License

This project is licensed under the MIT License.
