'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Plus, AlertTriangle, Trending Up, MapPin, Calendar, TrendingDown } from 'lucide-react'

// Mock disease data
const diseaseCases = [
  { id: '1', disease: 'Malaria', district: 'Kigali', cases: 24, trend: 'up', severity: 'moderate' },
  { id: '2', disease: 'Typhoid', district: 'Muhanga', cases: 8, trend: 'stable', severity: 'mild' },
  { id: '3', disease: 'Cholera', district: 'Kayonza', cases: 3, trend: 'down', severity: 'severe' },
  { id: '4', disease: 'Dengue', district: 'Kigali', cases: 15, trend: 'up', severity: 'moderate' },
  { id: '5', disease: 'COVID-19', district: 'Kigali', cases: 5, trend: 'down', severity: 'mild' },
]

const vaccinations = [
  { name: 'COVID-19', administered: 4520, percentage: 92 },
  { name: 'Polio', administered: 3980, percentage: 81 },
  { name: 'Measles', administered: 4125, percentage: 84 },
  { name: 'Tetanus', administered: 3750, percentage: 76 },
]

export default function DiseasesPage() {
  const router = useRouter()
  const { user } = useAuth()

  if (!user) {
    return null
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-red-600 dark:text-red-400'
      case 'down':
        return 'text-green-600 dark:text-green-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe':
        return 'bg-red-100 dark:bg-red-900/20 text-red-900 dark:text-red-100 border-red-200 dark:border-red-900/30'
      case 'moderate':
        return 'bg-orange-100 dark:bg-orange-900/20 text-orange-900 dark:text-orange-100 border-orange-200 dark:border-orange-900/30'
      case 'mild':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-100 border-yellow-200 dark:border-yellow-900/30'
      default:
        return 'bg-gray-100 dark:bg-gray-900/20'
    }
  }

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
                <h2 className="text-3xl font-bold text-foreground">Disease Tracking</h2>
                <p className="text-muted-foreground mt-1">Monitor disease outbreaks and vaccination progress</p>
              </div>
              {['admin', 'ministry'].includes(user.role.toLowerCase()) && (
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Report Case
                </Button>
              )}
            </div>

            <Tabs defaultValue="outbreaks" className="space-y-4">
              <TabsList>
                <TabsTrigger value="outbreaks">Disease Outbreaks</TabsTrigger>
                <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
              </TabsList>

              {/* Outbreaks Tab */}
              <TabsContent value="outbreaks" className="space-y-4">
                {/* High risk alerts */}
                <Card className="border-orange-200 dark:border-orange-900/30 bg-orange-50 dark:bg-orange-900/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2 text-orange-900 dark:text-orange-100">
                      <AlertTriangle className="h-5 w-5" />
                      Health Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2">
                        <span className="text-sm text-orange-900 dark:text-orange-100">
                          Cholera outbreak in Kayonza district requires immediate attention
                        </span>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      <div className="flex items-center justify-between p-2">
                        <span className="text-sm text-orange-900 dark:text-orange-100">
                          Malaria cases trending upward in Kigali
                        </span>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Disease statistics grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {diseaseCases.map((disease) => (
                    <Card key={disease.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center justify-between">
                          <span>{disease.disease}</span>
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(disease.severity)}`}>
                            {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">Active Cases</span>
                          <span className="text-2xl font-bold text-foreground">{disease.cases}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{disease.district}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trending Up className={`h-4 w-4 ${getTrendColor(disease.trend)}`} />
                          <span className={`text-sm font-medium ${getTrendColor(disease.trend)}`}>
                            {disease.trend === 'up' ? 'Increasing' : disease.trend === 'down' ? 'Decreasing' : 'Stable'}
                          </span>
                        </div>
                        <Button variant="outline" className="w-full mt-2">View Details</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Vaccinations Tab */}
              <TabsContent value="vaccinations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Vaccination Progress</CardTitle>
                    <CardDescription>Current vaccination coverage across the region</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {vaccinations.map((vaccine) => (
                      <div key={vaccine.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">{vaccine.name}</span>
                          <span className="text-sm text-muted-foreground">{vaccine.percentage}% ({vaccine.administered} people)</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${vaccine.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
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
