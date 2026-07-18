import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect } from "react"
import { MapPin, Bed, Utensils, Camera, Cross, Banknote, Plane } from "lucide-react"

// Create custom HTML icons using Lucide SVGs wrapped in div
const createCustomIcon = (svgString: string, colorClass: string) => {
  return L.divIcon({
    html: `<div class="flex items-center justify-center w-8 h-8 rounded-full shadow-lg ${colorClass} text-white border-2 border-white">${svgString}</div>`,
    className: "custom-leaflet-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}

// Basic SVG strings for markers
const svgs = {
  hotel: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>',
  food: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>',
  attraction: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',
  main: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>'
}

const icons = {
  hotel: createCustomIcon(svgs.hotel, "bg-blue-600"),
  food: createCustomIcon(svgs.food, "bg-orange-500"),
  attraction: createCustomIcon(svgs.attraction, "bg-purple-500"),
  main: createCustomIcon(svgs.main, "bg-primary"),
}

// Component to dynamically fit bounds of all markers
function MapBounds({ markers }: { markers: any[] }) {
  const map = useMap()
  
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]))
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [markers, map])
  
  return null
}

// Component to handle Leaflet invalidation when its container is resized (e.g., when a tab becomes visible)
function MapResizeObserver() {
  const map = useMap()
  
  useEffect(() => {
    // Explicitly invalidate size after a short delay to handle tab transitions
    const timer1 = setTimeout(() => map.invalidateSize(), 100)
    const timer2 = setTimeout(() => map.invalidateSize(), 500)
    
    const observer = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        map.invalidateSize()
      })
    })
    
    const container = map.getContainer()
    observer.observe(container)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      observer.disconnect()
    }
  }, [map])
  
  return null
}

interface MarkerData {
  id: string
  title: string
  subtitle?: string
  lat: number
  lng: number
  type: "hotel" | "food" | "attraction" | "main"
}

interface InteractiveMapProps {
  markers: MarkerData[]
}

export const InteractiveMap = ({ markers }: InteractiveMapProps) => {
  // Default center (will be overridden by MapBounds if markers exist)
  const defaultCenter: [number, number] = markers.length > 0 ? [markers[0].lat, markers[0].lng] : [51.505, -0.09]

  return (
    <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden border border-border/50 shadow-sm relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        scrollWheelZoom={true} 
        className="w-full h-full"
        style={{ background: "#0a0a0a", height: "100%", width: "100%" }}
      >
        {/* Standard OpenStreetMap Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapResizeObserver />
        <MapBounds markers={markers} />

        {markers.map((marker) => (
          <Marker 
            key={marker.id} 
            position={[marker.lat, marker.lng]}
            icon={icons[marker.type]}
          >
            <Popup>
              <div className="p-1">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(marker.title)}+${marker.lat},${marker.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sm mb-1 text-black hover:text-blue-600 transition-colors block hover:underline"
                >
                  {marker.title} ↗
                </a>
                {marker.subtitle && (
                  <p className="text-xs text-gray-600">{marker.subtitle}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
