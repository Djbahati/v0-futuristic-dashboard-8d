'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { UserRole, HealthMetrics } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { DashboardAIPanel } from '@/components/ai/dashboard-ai-panel'
import {
  Users,
  Calendar,
  Pill,
  AlertCircle,
  Activity,
  TrendingUp,
  Plus,
  ArrowRight,
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null)
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [loading, user, router])

  useEffect(() => {
    // Simulate loading metrics
    setTimeout(() => {
      setMetrics({
        totalPatients: 1248,
        activeAppointments: 24,
        medicationStock: 856,
        diseaseOutbreaks: 3,
        vaccinations: 342,
      })
      setPageLoading(false)
    }, 500)
  }, [])

  if (loading || pageLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <Activity className="h-8 w-8 text-primary animate-pulse" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const metricCards = [
    {
      title: 'Total Patients',
      value: metrics?.totalPatients || 0,
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      trend: '+12%',
      visible: [UserRole.Doctor, UserRole.Nurse, UserRole.Admin],
    },
    {
      title: 'Active Appointments',
      value: metrics?.activeAppointments || 0,
      icon: Calendar,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      trend: '+8%',
      visible: [UserRole.Doctor, UserRole.Nurse, UserRole.Admin],
    },
    {
      title: 'Medication Stock',
      value: metrics?.medicationStock || 0,
      icon: Pill,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      trend: '-5%',
      visible: [UserRole.Pharmacist, UserRole.Admin],
    },
    {
      title: 'Disease Cases',
      value: metrics?.diseaseOutbreaks || 0,
      icon: AlertCircle,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      trend: '+3%',
      visible: [UserRole.Doctor, UserRole.Nurse, UserRole.Admin, UserRole.Ministry],
    },
  ]

  const visibleMetrics = metricCards.filter((card) => card.visible.includes(user.role))

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-56">
        {/* Header */}
        <DashboardHeader />

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="container py-6 px-4 md:px-6">
            {/* Welcome section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground">Welcome back, {user.name.split(' ')[0]}!</h2>
              <p className="text-muted-foreground mt-1">
                Here&apos;s what&apos;s happening at your facility today.
              </p>
            </div>

            {/* Metrics grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {visibleMetrics.map((metric) => {
                const Icon = metric.icon
                return (
                  <Card key={metric.title} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-foreground">{metric.title}</CardTitle>
                      <div className={`${metric.bgColor} p-2 rounded-lg`}>
                        <Icon className={`${metric.color} h-4 w-4`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                      <div className="flex items-center gap-1 text-xs text-secondary mt-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{metric.trend} from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Main tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                {user.role === UserRole.Doctor && <TabsTrigger value="patients">My Patients</TabsTrigger>}
                {user.role === UserRole.Pharmacist && <TabsTrigger value="stock">Stock</TabsTrigger>}
                {[UserRole.Admin, UserRole.Ministry].includes(user.role) && (
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                )}
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>

              {/* Overview tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Quick actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {user.role === UserRole.Doctor && (
                        <>
                          <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/patients/new')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Patient
                          </Button>
                          <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/appointments/new')}>
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule Appointment
                          </Button>
                        </>
                      )}
                      {user.role === UserRole.Pharmacist && (
                        <>
                          <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/pharmacy/stock/new')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Medication
                          </Button>
                          <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/pharmacy/stock')}>
                            <Pill className="mr-2 h-4 w-4" />
                            View Inventory
                          </Button>
                        </>
                      )}
                      {user.role === UserRole.Admin && (
                        <>
                          <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/settings/users')}>
                            <Users className="mr-2 h-4 w-4" />
                            Manage Users
                          </Button>
                          <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/analytics')}>
                            <TrendingUp className="mr-2 h-4 w-4" />
                            View Reports
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  {/* System status */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">System Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Database</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-600"></div>
                          <span className="text-xs font-medium text-green-600">Operational</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">API Services</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-600"></div>
                          <span className="text-xs font-medium text-green-600">Operational</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Backup Status</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-600"></div>
                          <span className="text-xs font-medium text-green-600">Up to date</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Alerts tab */}
              <TabsContent value="alerts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent Alerts</CardTitle>
                    <CardDescription>Important notifications and alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30">
                        <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-orange-900 dark:text-orange-100">Medication Stock Low</p>
                          <p className="text-xs text-orange-700 dark:text-orange-200 mt-0.5">Paracetamol stock is below 100 units</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-red-900 dark:text-red-100">Disease Case Reported</p>
                          <p className="text-xs text-red-700 dark:text-red-200 mt-0.5">New malaria case reported in Kigali district</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* AI Insights Panel */}
          <div className="mt-12 border-t border-border pt-12">
            <DashboardAIPanel />
          </div>
        </main>
      </div>
    </div>
  )
}
