'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react'

interface Doctor {
  id: string
  name: string
  role: string
  specialty: string
  facility: string
  location: string
  phone: string
  email: string
  status: 'available' | 'busy' | 'offline'
  availableUntil?: string
}

const mockDoctors: Doctor[] = [
  {
    id: 'D001',
    name: 'Dr. Jean Ndabaguye',
    role: 'Cardiologist',
    specialty: 'Cardiology',
    facility: 'Kigali Central Hospital',
    location: 'Kigali, Gasabo District',
    phone: '+250 788 111 222',
    email: 'jean@kch.gov.rw',
    status: 'available',
    availableUntil: '5:00 PM',
  },
  {
    id: 'D002',
    name: 'Dr. Marie Habimana',
    role: 'Pediatrician',
    specialty: 'Pediatrics',
    facility: 'Muhima Health Center',
    location: 'Kigali, Nyarugenge District',
    phone: '+250 788 222 333',
    email: 'marie@muhima.rw',
    status: 'available',
    availableUntil: '4:30 PM',
  },
  {
    id: 'D003',
    name: 'Dr. Pierre Musinya',
    role: 'Surgeon',
    specialty: 'Surgery',
    facility: 'Huye District Hospital',
    location: 'Huye, Huye District',
    phone: '+250 788 333 444',
    email: 'pierre@huye.gov.rw',
    status: 'busy',
  },
  {
    id: 'D004',
    name: 'Dr. Asha Kipchoge',
    role: 'General Practitioner',
    specialty: 'General Medicine',
    facility: 'Kigali Central Hospital',
    location: 'Kigali, Gasabo District',
    phone: '+250 788 444 555',
    email: 'asha@kch.gov.rw',
    status: 'offline',
  },
  {
    id: 'D005',
    name: 'Dr. Emmanuel Rutayisire',
    role: 'Neurologist',
    specialty: 'Neurology',
    facility: 'Rwanda Clinic',
    location: 'Kigali, Kicukiro District',
    phone: '+250 788 555 666',
    email: 'emmanuel@rwandaclinic.rw',
    status: 'available',
    availableUntil: '6:00 PM',
  },
  {
    id: 'D006',
    name: 'Dr. Grace Uwimana',
    role: 'Gynecologist',
    specialty: 'Obstetrics & Gynecology',
    facility: 'Maternal Health Center',
    location: 'Kigali, Gasabo District',
    phone: '+250 788 666 777',
    email: 'grace@mhc.rw',
    status: 'available',
    availableUntil: '5:30 PM',
  },
]

const statusColors = {
  available: 'bg-green-500/20 text-green-700',
  busy: 'bg-yellow-500/20 text-yellow-700',
  offline: 'bg-gray-500/20 text-gray-700',
}

export default function DoctorsLocationPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'busy' | 'offline'>('all')
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || doctor.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Doctor Locations" />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Doctor Directory</h1>
              <p className="text-muted-foreground mt-1">Find and contact healthcare professionals across Rwanda</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Search by name, specialty, facility, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <div className="flex gap-2 flex-wrap">
                {(['all', 'available', 'busy', 'offline'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                      filterStatus === status
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {status === 'all' ? 'All Doctors' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Total Doctors</p>
                <p className="text-2xl font-bold text-foreground mt-1">{mockDoctors.length}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Available Now</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{mockDoctors.filter(d => d.status === 'available').length}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Results Found</p>
                <p className="text-2xl font-bold text-primary mt-1">{filteredDoctors.length}</p>
              </Card>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredDoctors.map(doctor => (
                <Card
                  key={doctor.id}
                  className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                    selectedDoctor?.id === doctor.id ? 'border-primary shadow-md' : ''
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      </div>
                      <Badge className={statusColors[doctor.status]}>
                        {doctor.status === 'available' && '●'} {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Facility and Location */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-foreground">{doctor.facility}</p>
                          <p className="text-muted-foreground text-xs">{doctor.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Availability */}
                    {doctor.availableUntil && (
                      <div className="flex items-center gap-2 bg-green-500/10 p-2 rounded">
                        <Clock className="h-4 w-4 text-green-600" />
                        <p className="text-sm text-green-700 font-medium">Available until {doctor.availableUntil}</p>
                      </div>
                    )}

                    {/* Contact */}
                    <div className="space-y-2 pt-4 border-t border-border">
                      <a
                        href={`tel:${doctor.phone}`}
                        className="flex items-center gap-2 text-primary hover:underline text-sm"
                      >
                        <Phone className="h-4 w-4" />
                        {doctor.phone}
                      </a>
                      <a
                        href={`mailto:${doctor.email}`}
                        className="flex items-center gap-2 text-primary hover:underline text-sm"
                      >
                        <Mail className="h-4 w-4" />
                        {doctor.email}
                      </a>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                      <Button asChild variant="default" size="sm" className="flex-1">
                        <a href={`tel:${doctor.phone}`}>Call</a>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <a href={`mailto:${doctor.email}`}>Email</a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No doctors found matching your criteria.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
