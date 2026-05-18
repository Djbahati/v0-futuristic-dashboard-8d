'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2, Trash2, MapPin, Users, Phone, Mail, Clock } from 'lucide-react'

interface Facility {
  id: string
  name: string
  type: 'Hospital' | 'Clinic' | 'Health Center' | 'Lab'
  district: string
  address: string
  phone: string
  email: string
  staffCount: number
  beds: number
  services: string[]
  operatingHours: string
  latitude: number
  longitude: number
}

const mockFacilities: Facility[] = [
  {
    id: 'F001',
    name: 'Kigali Central Hospital',
    type: 'Hospital',
    district: 'Kigali',
    address: '123 Health Street, Kigali',
    phone: '+250 788 123 456',
    email: 'info@kch.gov.rw',
    staffCount: 350,
    beds: 500,
    services: ['Emergency', 'Surgery', 'ICU', 'Maternity', 'Pediatrics'],
    operatingHours: '24/7',
    latitude: -1.9536,
    longitude: 29.8739,
  },
  {
    id: 'F002',
    name: 'Muhima Health Center',
    type: 'Health Center',
    district: 'Kigali',
    address: '456 Care Avenue, Kigali',
    phone: '+250 788 234 567',
    email: 'muhima@health.rw',
    staffCount: 45,
    beds: 50,
    services: ['Consultation', 'Vaccination', 'Antenatal Care', 'TB Testing'],
    operatingHours: '6:00 AM - 6:00 PM',
    latitude: -1.9412,
    longitude: 29.8732,
  },
  {
    id: 'F003',
    name: 'Huye District Hospital',
    type: 'Hospital',
    district: 'Huye',
    address: '789 Medical Road, Huye',
    phone: '+250 788 345 678',
    email: 'info@huye.gov.rw',
    staffCount: 180,
    beds: 250,
    services: ['Surgery', 'Obstetrics', 'Cardiology', 'Orthopedics'],
    operatingHours: '24/7',
    latitude: -2.6047,
    longitude: 29.7469,
  },
]

const facilityTypeColors = {
  Hospital: 'bg-red-100 text-red-800',
  Clinic: 'bg-blue-100 text-blue-800',
  'Health Center': 'bg-green-100 text-green-800',
  Lab: 'bg-purple-100 text-purple-800',
}

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>(mockFacilities)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all')
  const [isAddingFacility, setIsAddingFacility] = useState(false)

  const districts = ['all', ...new Set(facilities.map(f => f.district))]

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDistrict = selectedDistrict === 'all' || facility.district === selectedDistrict
    return matchesSearch && matchesDistrict
  })

  const handleDeleteFacility = (id: string) => {
    setFacilities(facilities.filter(f => f.id !== id))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Healthcare Facilities" />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header with Add Button */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Healthcare Facilities</h1>
                <p className="text-muted-foreground mt-1">Manage all health centers and hospitals across Rwanda</p>
              </div>
              <Button onClick={() => setIsAddingFacility(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Facility
              </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Search by facility name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-card"
              />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-4 py-2 bg-card border border-input rounded-md text-foreground"
              >
                {districts.map(district => (
                  <option key={district} value={district}>
                    {district === 'all' ? 'All Districts' : district}
                  </option>
                ))}
              </select>
            </div>

            {/* Facilities Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFacilities.map(facility => (
                <Card key={facility.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6 space-y-4">
                    {/* Facility Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-foreground">{facility.name}</h3>
                          <Badge className={`${facilityTypeColors[facility.type]}`}>
                            {facility.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <MapPin className="h-4 w-4" />
                          {facility.district}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteFacility(facility.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Facility Details Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                          <Users className="h-4 w-4" />
                          <span>Staff</span>
                        </div>
                        <p className="font-semibold text-foreground">{facility.staffCount} personnel</p>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-sm mb-1">Beds</div>
                        <p className="font-semibold text-foreground">{facility.beds} beds</p>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                          <Clock className="h-4 w-4" />
                          <span>Hours</span>
                        </div>
                        <p className="font-semibold text-foreground">{facility.operatingHours}</p>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="pt-2 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-2">Services</p>
                      <div className="flex flex-wrap gap-2">
                        {facility.services.map(service => (
                          <Badge key={service} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="pt-2 border-t border-border space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${facility.phone}`} className="text-primary hover:underline">
                          {facility.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${facility.email}`} className="text-primary hover:underline">
                          {facility.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredFacilities.length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No facilities found matching your search criteria.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
