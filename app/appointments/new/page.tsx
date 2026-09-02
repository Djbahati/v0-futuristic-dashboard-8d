'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'

// Mock patients list
const patients = [
  { id: '1', name: 'Jean Mukandawire' },
  { id: '2', name: 'Marie Habimana' },
  { id: '3', name: 'Peter Rwigema' },
  { id: '4', name: 'Alice Nkusi' },
  { id: '5', name: 'Robert Kabanda' },
]

// Mock doctors list
const doctors = [
  { id: 'doc1', name: 'Dr. Jean Munyarugerero', specialization: 'General Practitioner' },
  { id: 'doc2', name: 'Dr. Alice Nkusi', specialization: 'Internal Medicine' },
  { id: 'doc3', name: 'Dr. Paul Mukiza', specialization: 'Pediatrics' },
]

// Time slots
const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00',
]

export default function ScheduleAppointmentPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPatientList, setShowPatientList] = useState(false)
  const [showDoctorList, setShowDoctorList] = useState(false)

  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    doctorId: '',
    doctorName: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    notes: '',
  })

  if (!user) {
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectPatient = (patient: { id: string; name: string }) => {
    setFormData((prev) => ({
      ...prev,
      patientId: patient.id,
      patientName: patient.name,
    }))
    setShowPatientList(false)
  }

  const handleSelectDoctor = (doctor: { id: string; name: string }) => {
    setFormData((prev) => ({
      ...prev,
      doctorId: doctor.id,
      doctorName: doctor.name,
    }))
    setShowDoctorList(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const today = new Date().toISOString().split('T')[0]
    if (!formData.patientId || !formData.doctorId || !formData.appointmentDate || !formData.appointmentTime || !formData.reason.trim()) {
      setError('Select a patient, doctor, date, time, and enter a reason for the visit.')
      return
    }
    if (formData.appointmentDate < today) {
      setError('Appointment date cannot be in the past.')
      return
    }
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      window.setTimeout(() => router.push('/appointments'), 1200)
    }, 700)
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-56">
        <DashboardHeader />

        <main className="flex-1 overflow-auto">
          <div className="container py-6 px-4 md:px-6 max-w-2xl">
            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Schedule Appointment</h2>
                <p className="text-muted-foreground mt-1">Book a new appointment for a patient</p>
              </div>
            </div>

            {error && (
              <div role="alert" className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                <AlertCircle className="mt-0.5 size-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {success ? (
              <Card className="border-2 border-primary/40 bg-primary/5">
                <CardContent className="py-8 flex flex-col items-center text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Appointment Scheduled!</h3>
                  <p className="text-muted-foreground mb-4">
                    The appointment has been successfully scheduled. You will be redirected shortly.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Select Patient</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Input
                        placeholder="Search or select patient"
                        value={formData.patientName}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            patientName: e.target.value,
                          }))
                          setShowPatientList(true)
                        }}
                        onFocus={() => setShowPatientList(true)}
                        required
                      />
                      {showPatientList && (
                        <div className="absolute top-full left-0 right-0 mt-2 border border-border bg-background rounded-lg shadow-lg z-10">
                          {patients
                            .filter((p) =>
                              p.name.toLowerCase().includes(formData.patientName.toLowerCase())
                            )
                            .map((patient) => (
                              <button
                                key={patient.id}
                                type="button"
                                onClick={() => handleSelectPatient(patient)}
                                className="w-full text-left px-4 py-3 hover:bg-muted border-b border-border last:border-0 transition-colors"
                              >
                                <p className="font-medium text-foreground">{patient.name}</p>
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                    {formData.patientId && (
                      <div className="p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-lg">
                        <p className="text-sm text-green-700 dark:text-green-200">
                          ✓ Patient selected: {formData.patientName}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Doctor Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Select Doctor</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {doctors.map((doctor) => (
                        <button
                          key={doctor.id}
                          type="button"
                          onClick={() => handleSelectDoctor(doctor)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            formData.doctorId === doctor.id
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary'
                          }`}
                        >
                          <p className="font-medium text-foreground">{doctor.name}</p>
                          <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Date and Time Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Date & Time</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">Appointment Date</label>
                        <Input
                          name="appointmentDate"
                          type="date"
                          value={formData.appointmentDate}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">Time Slot</label>
                        <select
                          name="appointmentTime"
                          value={formData.appointmentTime}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                          required
                        >
                          <option value="">Select time</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Appointment Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Appointment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Reason for Visit</label>
                      <Input
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="e.g., General checkup, Follow-up consultation"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Additional Notes (Optional)</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Any special instructions or notes for the doctor"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Summary */}
                {formData.patientId && formData.doctorId && formData.appointmentDate && formData.appointmentTime && (
                  <Card className="bg-muted/30 border-primary/50">
                    <CardHeader>
                      <CardTitle className="text-base">Appointment Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Patient:</span>
                        <span className="font-medium text-foreground">{formData.patientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Doctor:</span>
                        <span className="font-medium text-foreground">{formData.doctorName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date & Time:</span>
                        <span className="font-medium text-foreground">
                          {formData.appointmentDate} at {formData.appointmentTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reason:</span>
                        <span className="font-medium text-foreground">{formData.reason || 'Not specified'}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Form Actions */}
                <div className="flex gap-3 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                    disabled={loading}
                  >
                    {loading ? 'Scheduling...' : 'Schedule Appointment'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
