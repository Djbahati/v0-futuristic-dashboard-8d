'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Appointment } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import {
  Calendar,
  Clock,
  User,
  Plus,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

// Mock appointments data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: 'doc1',
    facilityId: 'fac1',
    appointmentDate: new Date(2024, 4, 20), // May 20, 2024
    appointmentTime: '09:00',
    reason: 'Blood pressure checkup',
    status: 'scheduled',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    patientId: '2',
    doctorId: 'doc2',
    facilityId: 'fac1',
    appointmentDate: new Date(2024, 4, 20),
    appointmentTime: '10:30',
    reason: 'General consultation',
    status: 'scheduled',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    patientId: '3',
    doctorId: 'doc1',
    facilityId: 'fac1',
    appointmentDate: new Date(2024, 4, 21),
    appointmentTime: '14:00',
    reason: 'Follow-up consultation',
    status: 'completed',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    patientId: '4',
    doctorId: 'doc3',
    facilityId: 'fac1',
    appointmentDate: new Date(2024, 4, 19),
    appointmentTime: '11:00',
    reason: 'Vaccination',
    status: 'cancelled',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const patientNames: Record<string, string> = {
  '1': 'Jean Mukandawire',
  '2': 'Marie Habimana',
  '3': 'Peter Rwigema',
  '4': 'Alice Nkusi',
  '5': 'Robert Kabanda',
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/40 text-blue-900 dark:text-blue-100'
    case 'completed':
      return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/40 text-green-900 dark:text-green-100'
    case 'cancelled':
      return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/40 text-red-900 dark:text-red-100'
    case 'no-show':
      return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-900/40 text-orange-900 dark:text-orange-100'
    default:
      return 'bg-gray-50 dark:bg-gray-900/20'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'scheduled':
      return <Clock className="h-4 w-4" />
    case 'completed':
      return <CheckCircle className="h-4 w-4" />
    case 'cancelled':
      return <XCircle className="h-4 w-4" />
    case 'no-show':
      return <AlertCircle className="h-4 w-4" />
    default:
      return null
  }
}

export default function AppointmentsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 4)) // May 2024
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)

  if (!user) {
    return null
  }

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })

  const getAppointmentsForDate = (day: number) => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.appointmentDate)
      return (
        aptDate.getFullYear() === currentMonth.getFullYear() &&
        aptDate.getMonth() === currentMonth.getMonth() &&
        aptDate.getDate() === day
      )
    })
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const upcomingAppointments = appointments
    .filter((apt) => apt.status === 'scheduled')
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
    .slice(0, 5)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-56">
        <DashboardHeader />

        <main className="flex-1 overflow-auto">
          <div className="container py-6 px-4 md:px-6">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Appointments</h2>
                <p className="text-muted-foreground mt-1">
                  Schedule and manage patient appointments
                </p>
              </div>
              <Button
                onClick={() => router.push('/appointments/new')}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
            </div>

            <Tabs defaultValue="calendar" className="space-y-4">
              <TabsList>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>

              {/* Calendar view */}
              <TabsContent value="calendar" className="space-y-4">
                <div className="grid gap-6 lg:grid-cols-3">
                  {/* Calendar */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{monthName}</CardTitle>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={prevMonth}>
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={nextMonth}>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Weekday headers */}
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                          <div key={day} className="text-center text-sm font-medium text-muted-foreground">
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar days */}
                      <div className="grid grid-cols-7 gap-2">
                        {emptyDays.map((_, i) => (
                          <div key={`empty-${i}`} className="aspect-square"></div>
                        ))}
                        {days.map((day) => {
                          const dayAppointments = getAppointmentsForDate(day)
                          const isToday =
                            new Date().toDateString() ===
                            new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString()

                          return (
                            <button
                              key={day}
                              onClick={() => {
                                // Handle day click
                              }}
                              className={`aspect-square rounded-lg border-2 p-2 text-sm font-medium transition-colors ${
                                isToday
                                  ? 'border-primary bg-primary/10'
                                  : 'border-border hover:border-primary hover:bg-muted'
                              }`}
                            >
                              <div className="font-bold text-foreground mb-1">{day}</div>
                              {dayAppointments.length > 0 && (
                                <div className="text-xs">
                                  <div className="bg-blue-500/20 text-blue-700 dark:text-blue-200 rounded px-1 py-0.5">
                                    {dayAppointments.length} apt{dayAppointments.length > 1 ? 's' : ''}
                                  </div>
                                </div>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upcoming appointments sidebar */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Upcoming</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {upcomingAppointments.length > 0 ? (
                        upcomingAppointments.map((apt) => (
                          <div
                            key={apt.id}
                            className="border border-border rounded-lg p-3 hover:bg-muted transition-colors cursor-pointer"
                            onClick={() => {
                              // Handle appointment click
                            }}
                          >
                            <div className="flex items-start gap-2 mb-2">
                              <Calendar className="h-4 w-4 text-primary mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-foreground">
                                  {patientNames[apt.patientId]}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(apt.appointmentDate).toLocaleDateString()} at {apt.appointmentTime}
                                </p>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{apt.reason}</p>
                            <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${getStatusColor(apt.status)}`}>
                              {getStatusIcon(apt.status)}
                              {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground py-4">No upcoming appointments</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* List view */}
              <TabsContent value="list" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {appointments.map((apt) => (
                        <div
                          key={apt.id}
                          className="border border-border rounded-lg p-4 hover:bg-muted transition-colors cursor-pointer"
                          onClick={() => {
                            // Handle appointment click
                          }}
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-medium text-foreground">
                                {patientNames[apt.patientId]}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">{apt.reason}</p>
                              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(apt.appointmentDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {apt.appointmentTime}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border ${getStatusColor(apt.status)}`}>
                                {getStatusIcon(apt.status)}
                                {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  // Handle action
                                }}
                              >
                                Actions
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
