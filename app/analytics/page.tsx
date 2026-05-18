'use client'

import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { BarChart3, TrendingUp, Users, Activity, AlertCircle } from 'lucide-react'

export default function AnalyticsPage() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-56">
        <DashboardHeader />

        <main className="flex-1 overflow-auto">
          <div className="container py-6 px-4 md:px-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground">Analytics & Reports</h2>
              <p className="text-muted-foreground mt-1">Healthcare metrics and system performance data</p>
            </div>

            {/* Key metrics */}
            <div className="grid gap-4 md:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">1,248</div>
                  <div className="flex items-center gap-1 mt-2 text-green-600 dark:text-green-400 text-xs">
                    <TrendingUp className="h-3 w-3" />
                    <span>+12% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">156</div>
                  <p className="text-xs text-muted-foreground mt-2">Under active treatment</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">2,847</div>
                  <p className="text-xs text-muted-foreground mt-2">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">System Uptime</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">99.8%</div>
                  <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Reports grid */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Patient Demographics</CardTitle>
                  <CardDescription>Age and gender distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: '0-18 years', value: 24, percentage: 19 },
                      { label: '19-40 years', value: 42, percentage: 34 },
                      { label: '41-65 years', value: 28, percentage: 23 },
                      { label: '65+ years', value: 6, percentage: 5 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-foreground">{item.label}</span>
                          <span className="text-sm font-medium text-muted-foreground">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Top Diagnoses</CardTitle>
                  <CardDescription>Most common conditions treated</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { condition: 'Hypertension', cases: 287, percentage: 23 },
                      { condition: 'Malaria', cases: 245, percentage: 20 },
                      { condition: 'Diabetes', cases: 198, percentage: 16 },
                      { condition: 'Respiratory Infection', cases: 176, percentage: 14 },
                      { condition: 'Gastroenteritis', cases: 142, percentage: 11 },
                    ].map((item) => (
                      <div key={item.condition} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-primary" />
                          <span className="text-sm text-foreground">{item.condition}</span>
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">{item.cases}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Monthly Trend</CardTitle>
                  <CardDescription>Patient visits over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { month: 'Jan', visits: 245 },
                      { month: 'Feb', visits: 268 },
                      { month: 'Mar', visits: 312 },
                      { month: 'Apr', visits: 298 },
                      { month: 'May', visits: 345 },
                    ].map((item) => (
                      <div key={item.month} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{item.month}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded-full">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${(item.visits / 345) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-foreground w-12">{item.visits}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Performance Metrics</CardTitle>
                  <CardDescription>System and operational KPIs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: 'Appointment Completion Rate', value: 94 },
                      { label: 'Patient Satisfaction', value: 88 },
                      { label: 'Prescription Accuracy', value: 99 },
                      { label: 'Average Response Time', value: 92 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">{item.label}</span>
                          <span className="text-xs font-medium text-foreground">{item.value}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.value >= 95 ? 'bg-green-600' : item.value >= 90 ? 'bg-blue-600' : 'bg-orange-600'}`}
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
