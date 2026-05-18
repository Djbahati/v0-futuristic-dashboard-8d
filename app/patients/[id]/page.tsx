'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import {
  ArrowLeft,
  Edit2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle,
  Download,
  Share2,
} from 'lucide-react'

// Mock patient data
const mockPatientDetails: Record<string, any> = {
  '1': {
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
    bloodType: 'O+',
    allergies: 'Penicillin, Shellfish',
    chronicDiseases: ['Hypertension', 'Diabetes Type 2'],
    consultations: [
      {
        id: '1',
        date: new Date('2024-05-10'),
        doctor: 'Dr. Alice Nkusi',
        reason: 'Blood pressure checkup',
        diagnosis: 'High blood pressure - managed',
        medications: ['Lisinopril 10mg daily'],
      },
      {
        id: '2',
        date: new Date('2024-04-15'),
        doctor: 'Dr. Jean Munyarugerero',
        reason: 'Diabetes management',
        diagnosis: 'Type 2 Diabetes - controlled',
        medications: ['Metformin 500mg twice daily'],
      },
    ],
    vaccinations: [
      { name: 'COVID-19 (3rd dose)', date: new Date('2024-03-20') },
      { name: 'Flu (2023-2024)', date: new Date('2023-10-15') },
    ],
  },
  '2': {
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
    bloodType: 'A+',
    allergies: 'None',
    chronicDiseases: [],
    consultations: [],
    vaccinations: [],
  },
}

export default function PatientDetailPage() {
  const router = useRouter()
  const { user } = useAuth()
  const params = useParams()
  const patientId = params.id as string

  const patient = mockPatientDetails[patientId]

  if (!user || !patient) {
    return null
  }

  const age = new Date().getFullYear() - patient.dateOfBirth.getFullYear()

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-56">
        <DashboardHeader />

        <main className="flex-1 overflow-auto">
          <div className="container py-6 px-4 md:px-6">
            {/* Header with back button */}
            <div className="mb-6 flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-foreground">
                  {patient.firstName} {patient.lastName}
                </h2>
                <p className="text-muted-foreground">Patient ID: {patient.uniqueId}</p>
              </div>
              <Button variant="outline">
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-6">
              {/* Patient overview card */}
              <Card className="md:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Demographics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase">Age</p>
                    <p className="text-2xl font-bold text-foreground">{age} years</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase">Gender</p>
                    <p className="text-foreground font-medium">
                      {patient.gender === 'M' ? 'Male' : 'Female'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase">Blood Type</p>
                    <p className="text-lg font-bold text-foreground">{patient.bloodType}</p>
                  </div>

                  <hr className="my-4" />

                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase mb-3">Contact</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs">{patient.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{patient.district}, {patient.sector}</span>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase mb-3">Emergency</p>
                    <p className="font-medium text-foreground text-sm">{patient.emergencyContact}</p>
                    <p className="text-xs text-muted-foreground">{patient.emergencyPhone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Medical information card */}
              <Card className="md:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Allergies */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-accent" />
                      Allergies
                    </h4>
                    {patient.allergies && patient.allergies !== 'None' ? (
                      <p className="text-sm bg-accent/10 text-accent-foreground rounded-lg p-3 border border-accent/20">
                        {patient.allergies}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">No known allergies</p>
                    )}
                  </div>

                  {/* Chronic diseases */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Chronic Diseases</h4>
                    {patient.chronicDiseases && patient.chronicDiseases.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {patient.chronicDiseases.map((disease: string) => (
                          <span
                            key={disease}
                            className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20"
                          >
                            {disease}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No chronic diseases recorded</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed tabs */}
            <Tabs defaultValue="consultations" className="space-y-4">
              <TabsList>
                <TabsTrigger value="consultations">Consultations</TabsTrigger>
                <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
                <TabsTrigger value="medications">Current Medications</TabsTrigger>
              </TabsList>

              {/* Consultations */}
              <TabsContent value="consultations">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Consultation History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {patient.consultations && patient.consultations.length > 0 ? (
                      <div className="space-y-4">
                        {patient.consultations.map((consultation: any) => (
                          <div key={consultation.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-medium text-foreground">{consultation.reason}</p>
                                <p className="text-xs text-muted-foreground">{consultation.doctor}</p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {new Date(consultation.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              <strong>Diagnosis:</strong> {consultation.diagnosis}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <strong>Prescribed:</strong> {consultation.medications?.join(', ') || 'None'}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground py-4">No consultations recorded</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Vaccinations */}
              <TabsContent value="vaccinations">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Vaccination Record</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {patient.vaccinations && patient.vaccinations.length > 0 ? (
                      <div className="space-y-3">
                        {patient.vaccinations.map((vaccination: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                            <div>
                              <p className="font-medium text-foreground text-sm">{vaccination.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(vaccination.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="h-2 w-2 rounded-full bg-secondary"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground py-4">No vaccinations recorded</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Current Medications */}
              <TabsContent value="medications">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Current Medications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {patient.consultations && patient.consultations.length > 0 ? (
                      <div className="space-y-2">
                        {patient.consultations.flatMap((c: any) => c.medications).map((med: string, index: number) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <span className="text-sm text-foreground">{med}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground py-4">No medications prescribed</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
