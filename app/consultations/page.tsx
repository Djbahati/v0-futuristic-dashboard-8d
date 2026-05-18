'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { MessageSquare, Plus, Search, Clock, CheckCircle, AlertCircle } from 'lucide-react'

// Mock consultation data
const mockConsultations = [
  {
    id: 'CONS001',
    patientId: 'PAT001',
    patientName: 'Jean Niyonkuru',
    doctorName: 'Dr. Emmanuel Rwiza',
    date: '2025-05-18',
    time: '10:30 AM',
    status: 'completed',
    notes: 'Patient presented with fever and cough for 3 days. Prescribed antibiotics and rest.',
    diagnosis: 'Upper Respiratory Infection',
    prescription: 'Amoxicillin 500mg - 3x daily for 7 days',
  },
  {
    id: 'CONS002',
    patientId: 'PAT002',
    patientName: 'Marie Uwizerwa',
    doctorName: 'Dr. Emmanuel Rwiza',
    date: '2025-05-18',
    time: '02:00 PM',
    status: 'in-progress',
    notes: 'Follow-up for diabetes management. Blood glucose levels stable.',
    diagnosis: 'Type 2 Diabetes Mellitus',
    prescription: 'Metformin 500mg - 2x daily, Gliclazide 80mg - 1x daily',
  },
  {
    id: 'CONS003',
    patientId: 'PAT003',
    patientName: 'Joseph Habimana',
    doctorName: 'Dr. Carole Kanyange',
    date: '2025-05-19',
    time: '09:00 AM',
    status: 'scheduled',
    notes: 'Initial consultation for chest pain evaluation.',
    diagnosis: 'Pending',
    prescription: 'Pending',
  },
  {
    id: 'CONS004',
    patientId: 'PAT004',
    patientName: 'Alice Nshuti',
    doctorName: 'Dr. Emmanuel Rwiza',
    date: '2025-05-17',
    time: '03:30 PM',
    status: 'completed',
    notes: 'Wound assessment and dressing change for surgical incision.',
    diagnosis: 'Post-operative Care',
    prescription: 'Antiseptic dressing - change daily',
  },
]

const statusConfig = {
  completed: {
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle,
    label: 'Completed',
  },
  'in-progress': {
    color: 'bg-blue-100 text-blue-800',
    icon: Clock,
    label: 'In Progress',
  },
  scheduled: {
    color: 'bg-yellow-100 text-yellow-800',
    icon: AlertCircle,
    label: 'Scheduled',
  },
}

export default function ConsultationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedConsultation, setSelectedConsultation] = useState<typeof mockConsultations[0] | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'in-progress' | 'scheduled'>('all')

  const filteredConsultations = mockConsultations.filter((cons) => {
    const matchesSearch =
      cons.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cons.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cons.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || cons.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-56">
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">Consultations</h1>
              </div>
              <p className="text-muted-foreground">Manage and view all patient consultations</p>
            </div>

            {/* Action and Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by patient name, doctor, or consultation ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Consultation
              </Button>
            </div>

            {/* Status Tabs */}
            <Tabs defaultValue="all" onValueChange={(value: any) => setFilterStatus(value)} className="mb-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Consultations</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Consultations Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Consultations List */}
              <div className="md:col-span-1 space-y-3">
                {filteredConsultations.length > 0 ? (
                  filteredConsultations.map((cons) => {
                    const statusInfo = statusConfig[cons.status as keyof typeof statusConfig]
                    return (
                      <Card
                        key={cons.id}
                        className={`cursor-pointer transition-all ${
                          selectedConsultation?.id === cons.id ? 'ring-2 ring-primary' : ''
                        } hover:shadow-md`}
                        onClick={() => setSelectedConsultation(cons)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{cons.patientName}</p>
                              <p className="text-sm text-muted-foreground">{cons.id}</p>
                              <p className="text-sm text-muted-foreground mt-1">{cons.doctorName}</p>
                            </div>
                            <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-3">{cons.date} {cons.time}</p>
                        </CardContent>
                      </Card>
                    )
                  })
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground">No consultations found</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Consultation Details */}
              <div className="md:col-span-2">
                {selectedConsultation ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{selectedConsultation.patientName}</CardTitle>
                          <CardDescription>
                            Consultation ID: {selectedConsultation.id}
                          </CardDescription>
                        </div>
                        <Badge className={statusConfig[selectedConsultation.status as keyof typeof statusConfig].color}>
                          {statusConfig[selectedConsultation.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Consultation Info */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                          <p className="text-foreground mt-1">
                            {selectedConsultation.date} at {selectedConsultation.time}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Doctor</p>
                          <p className="text-foreground mt-1">{selectedConsultation.doctorName}</p>
                        </div>
                      </div>

                      {/* Diagnosis */}
                      <div className="border-t border-border pt-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Diagnosis</p>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-foreground">{selectedConsultation.diagnosis}</p>
                        </div>
                      </div>

                      {/* Prescription */}
                      <div className="border-t border-border pt-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Prescription</p>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-foreground whitespace-pre-wrap">
                            {selectedConsultation.prescription}
                          </p>
                        </div>
                      </div>

                      {/* Clinical Notes */}
                      <div className="border-t border-border pt-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Clinical Notes</p>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-foreground whitespace-pre-wrap">
                            {selectedConsultation.notes}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="border-t border-border pt-4 flex gap-2">
                        <Button variant="outline" className="flex-1">
                          Edit Consultation
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Print Notes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">
                        Select a consultation to view details
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
