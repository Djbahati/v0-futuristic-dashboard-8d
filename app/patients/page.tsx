'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Patient } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Users, Search, Plus, Phone, MapPin, Calendar, ArrowRight } from 'lucide-react'

// Mock patient data
const mockPatients: Patient[] = [
  {
    id: '1',
    uniqueId: '1199800001234',
    firstName: 'Jean',
    lastName: 'Mukandawire',
    dateOfBirth: new Date('1980-05-15'),
    gender: 'M',
    phone: '+250788123456',
    email: 'jean.mukandawire@email.com',
    address: '123 Rue de la Paix',
    district: 'Kigali',
    sector: 'Kacyiru',
    emergencyContact: 'Marie Mukandawire',
    emergencyPhone: '+250788654321',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-05-18'),
  },
  {
    id: '2',
    uniqueId: '1199850002345',
    firstName: 'Marie',
    lastName: 'Habimana',
    dateOfBirth: new Date('1985-08-22'),
    gender: 'F',
    phone: '+250789234567',
    email: 'marie.habimana@email.com',
    address: '456 Av. de l\'Indépendance',
    district: 'Kigali',
    sector: 'Kimironko',
    emergencyContact: 'Jean Habimana',
    emergencyPhone: '+250787345678',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-05-17'),
  },
  {
    id: '3',
    uniqueId: '1199870003456',
    firstName: 'Peter',
    lastName: 'Rwigema',
    dateOfBirth: new Date('1987-03-10'),
    gender: 'M',
    phone: '+250790345678',
    email: 'peter.rwigema@email.com',
    address: '789 Rue de la Révolution',
    district: 'Muhanga',
    sector: 'Nyarugenge',
    emergencyContact: 'Grace Rwigema',
    emergencyPhone: '+250788456789',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-05-16'),
  },
  {
    id: '4',
    uniqueId: '1199900004567',
    firstName: 'Alice',
    lastName: 'Nkusi',
    dateOfBirth: new Date('1990-12-05'),
    gender: 'F',
    phone: '+250791456789',
    email: 'alice.nkusi@email.com',
    address: '321 Av. de la Reine',
    district: 'Kigali',
    sector: 'Gasabo',
    emergencyContact: 'Paul Nkusi',
    emergencyPhone: '+250789567890',
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-05-15'),
  },
  {
    id: '5',
    uniqueId: '1199920005678',
    firstName: 'Robert',
    lastName: 'Kabanda',
    dateOfBirth: new Date('1992-07-18'),
    gender: 'M',
    phone: '+250792567890',
    email: 'robert.kabanda@email.com',
    address: '654 Rue Habyarimana',
    district: 'Kigali',
    sector: 'Nyarugenge',
    emergencyContact: 'Susan Kabanda',
    emergencyPhone: '+250790678901',
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-05-14'),
  },
]

export default function PatientsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [patients, setPatients] = useState<Patient[]>(mockPatients)

  if (!user) {
    return null
  }

  // Filter patients based on search query
  const filteredPatients = patients.filter(
    (patient) =>
      patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.uniqueId.includes(searchQuery) ||
      patient.phone?.includes(searchQuery)
  )

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-56">
        <DashboardHeader />

        <main className="flex-1 overflow-auto">
          <div className="container py-6 px-4 md:px-6">
            {/* Header section */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Patients</h2>
                <p className="text-muted-foreground mt-1">
                  Manage patient records and medical history
                </p>
              </div>
              <Button
                onClick={() => router.push('/patients/new')}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Patient
              </Button>
            </div>

            {/* Search bar */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, ID, or phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Patients grid */}
            {filteredPatients.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPatients.map((patient) => {
                  const age = new Date().getFullYear() - patient.dateOfBirth.getFullYear()
                  return (
                    <Card
                      key={patient.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => router.push(`/patients/${patient.id}`)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {patient.firstName} {patient.lastName}
                            </CardTitle>
                            <CardDescription className="text-xs mt-1">
                              ID: {patient.uniqueId}
                            </CardDescription>
                          </div>
                          <div className="bg-primary/10 rounded-full p-2">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        {/* Demographics */}
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground text-xs">Age</p>
                            <p className="font-medium text-foreground">{age} years</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">Gender</p>
                            <p className="font-medium text-foreground">
                              {patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'}
                            </p>
                          </div>
                        </div>

                        {/* Contact info */}
                        <div className="space-y-2 border-t border-border pt-3">
                          {patient.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span className="text-foreground">{patient.phone}</span>
                            </div>
                          )}
                          {patient.district && (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-foreground">{patient.district}</span>
                            </div>
                          )}
                          {patient.createdAt && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                Registered {new Date(patient.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* View button */}
                        <Button variant="outline" className="w-full mt-4">
                          <span>View Details</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium text-foreground mb-1">No patients found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchQuery ? 'Try adjusting your search query' : 'Get started by adding your first patient'}
                  </p>
                  <Button onClick={() => router.push('/patients/new')} className="bg-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Patient
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
