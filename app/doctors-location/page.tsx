'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

interface Doctor {
  id: string
  name: string
  role: string
  specialty: string
  facility: string
  phone: string
  email: string
  status: 'available' | 'busy' | 'offline'
  latitude: number
  longitude: number
  availableUntil?: string
}

const mockDoctors: Doctor[] = [
  {
    id: 'D001',
    name: 'Dr. Jean Ndabaguye',
    role: 'Cardiologist',
    specialty: 'Cardiology',
    facility: 'Kigali Central Hospital',
    phone: '+250 788 111 222',
    email: 'jean@kch.gov.rw',
    status: 'available',
    latitude: -1.9536,
    longitude: 29.8739,
    availableUntil: '5:00 PM',
  },
  {
    id: 'D002',
    name: 'Dr. Marie Habimana',
    role: 'Pediatrician',
    specialty: 'Pediatrics',
    facility: 'Muhima Health Center',
    phone: '+250 788 222 333',
    email: 'marie@muhima.rw',
    status: 'available',
    latitude: -1.9412,
    longitude: 29.8732,
    availableUntil: '4:30 PM',
  },
  {
    id: 'D003',
    name: 'Dr. Pierre Musinya',
    role: 'Surgeon',
    specialty: 'Surgery',
    facility: 'Huye District Hospital',
    phone: '+250 788 333 444',
    email: 'pierre@huye.gov.rw',
    status: 'busy',
    latitude: -2.6047,
    longitude: 29.7469,
  },
  {
    id: 'D004',
    name: 'Dr. Asha Kipchoge',
    role: 'General Practitioner',
    specialty: 'General Medicine',
    facility: 'Kigali Central Hospital',
    phone: '+250 788 444 555',
    email: 'asha@kch.gov.rw',
    status: 'offline',
    latitude: -1.9536,
    longitude: 29.8739,
  },
]

const statusColors = {
  available: 'bg-green-100 text-green-800',
  busy: 'bg-yellow-100 text-yellow-800',
  offline: 'bg-gray-100 text-gray-800',
}

const MapComponent = dynamic(() => import('@/components/map/doctor-map'), { ssr: false })

export default function DoctorsLocationPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'busy' | 'offline'>('all')

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.facility.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || doctor.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Doctor Locations" />
        <div className="flex-1 overflow-hidden">
          <div className="flex h-full gap-4 p-4">
            {/* Map */}
            <div className="flex-1 rounded-lg overflow-hidden border border-border">
              <MapComponent doctors={doctors} selectedDoctor={selectedDoctor} />
            </div>

            {/* Sidebar with doctors list */}
            <div className="w-80 flex flex-col gap-4">
              {/* Header */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Available Doctors</h2>
              </div>

              {/* Filters */}
              <Input
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-card"
              />

              <div className="flex gap-2">
                {(['all', 'available', 'busy', 'offline'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      filterStatus === status
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>

              {/* Doctors List */}
              <div className="flex-1 overflow-y-auto space-y-2">
                {filteredDoctors.map(doctor => (
                  <Card
                    key={doctor.id}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedDoctor?.id === doctor.id
                        ? 'border-primary bg-primary/5'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-sm">{doctor.name}</p>
                          <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                        </div>
                        <Badge className={statusColors[doctor.status]}>
                          {doctor.status}
                        </Badge>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {doctor.facility}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {doctor.availableUntil ? `Until ${doctor.availableUntil}` : 'Offline'}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-border space-y-1 text-xs">
                        <a href={`tel:${doctor.phone}`} className="flex items-center gap-2 text-primary hover:underline">
                          <Phone className="h-3 w-3" />
                          {doctor.phone}
                        </a>
                        <a href={`mailto:${doctor.email}`} className="flex items-center gap-2 text-primary hover:underline">
                          <Mail className="h-3 w-3" />
                          {doctor.email}
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
