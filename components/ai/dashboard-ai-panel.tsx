'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { outbreakAlerts, diseaseTrendData } from '@/lib/healthcare-kb'
import { AlertTriangle, TrendingUp, Pill, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function DashboardAIPanel() {
  const topAlert = outbreakAlerts[0]
  const topTrend = Object.entries(diseaseTrendData)
    .filter(([_, data]) => data.trend === 'up')
    .sort((a, b) => b[1].current - a[1].current)[0]

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          AI Insights
        </h2>
        <Button asChild variant="outline" size="sm">
          <Link href="/ai-insights" className="flex items-center gap-2">
            Detailed Analytics <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Critical Alert */}
      {topAlert && (
        <Card className="p-6 border-orange-500/30 bg-gradient-to-r from-orange-500/5 to-transparent">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="font-semibold text-foreground">Active Outbreak Alert</p>
              <p className="text-sm text-muted-foreground mt-1">{topAlert.disease} outbreak in {topAlert.district}</p>
              <div className="flex items-center gap-3 mt-3">
                <Badge variant="destructive" className="text-xs font-semibold">
                  {topAlert.cases} Confirmed Cases
                </Badge>
                <span className="text-xs text-muted-foreground">{topAlert.date}</span>
              </div>
              <p className="text-sm text-foreground mt-3 p-3 bg-background rounded border border-border">{topAlert.alert}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {/* Disease Trends */}
        <Card className="p-4">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            Rising Cases
          </p>
          <div className="space-y-2">
            {Object.entries(diseaseTrendData)
              .filter(([_, data]) => data.trend === 'up')
              .slice(0, 2)
              .map(([disease, data]) => (
                <div key={disease} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground capitalize">{disease}</span>
                  <Badge variant="secondary" className="text-xs">{data.current}</Badge>
                </div>
              ))}
          </div>
        </Card>

        {/* Stock Alerts */}
        <Card className="p-4">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
            <Pill className="h-4 w-4 text-destructive" />
            Low Stock
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Rifampicin</span>
              <Badge variant="destructive" className="text-xs">Low</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Ceftriaxone</span>
              <Badge variant="destructive" className="text-xs">Low</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="p-4 border-primary/20 bg-primary/5">
        <p className="text-sm font-semibold text-foreground mb-3">AI Recommendations</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span>Increase antimalarial procurement for rainy season surge</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span>Deploy outbreak response team to {topAlert?.district}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span>Enhance water sanitation to control typhoid transmission</span>
          </li>
        </ul>
      </Card>

      {/* View More */}
      <Button asChild className="w-full">
        <Link href="/ai-insights" className="flex items-center justify-center gap-2">
          <Zap className="h-4 w-4" />
          Explore Full AI Dashboard
        </Link>
      </Button>
    </div>
  )
}
