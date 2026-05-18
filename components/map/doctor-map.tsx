'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Doctor {
  id: string
  name: string
  role: string
  specialty: string
  facility: string
  status: 'available' | 'busy' | 'offline'
  latitude: number
  longitude: number
}

const getMarkerIcon = (status: string) => {
  const colors = {
    available: '#10b981',
    busy: '#f59e0b',
    offline: '#6b7280',
  }
  const color = colors[status as keyof typeof colors]

  return L.divIcon({
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}

export default function DoctorMap({ doctors, selectedDoctor }: { doctors: Doctor[]; selectedDoctor: Doctor | null }) {
  const defaultCenter: [number, number] = [-1.9536, 29.8739]
  const mapCenter = selectedDoctor ? [selectedDoctor.latitude, selectedDoctor.longitude] : defaultCenter

  return (
    <MapContainer
      center={mapCenter as [number, number]}
      zoom={9}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {doctors.map(doctor => (
        <Marker
          key={doctor.id}
          position={[doctor.latitude, doctor.longitude]}
          icon={getMarkerIcon(doctor.status)}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-bold">{doctor.name}</p>
              <p className="text-xs text-gray-600">{doctor.specialty}</p>
              <p className="text-xs text-gray-600">{doctor.facility}</p>
              <div className="mt-2 text-xs">
                <span className={`px-2 py-1 rounded ${
                  doctor.status === 'available' ? 'bg-green-100 text-green-800' :
                  doctor.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {doctor.status}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
