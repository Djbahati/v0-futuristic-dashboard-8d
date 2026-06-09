'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  detectOutbreakAnomaly,
  forecastPharmacyDemand,
  assessPatientRisk,
  calculateSurveillanceMetrics,
} from '@/lib/ai-features'
import { AlertTriangle, TrendingUp, TrendingDown, Activity, Target } from 'lucide-react'

interface AnalyticsCardProps {
  title: string
  metric: string | number
  unit?: string
  trend?: 'up' | 'down' | 'stable'
  trendPercent?: number
  icon: React.ReactNode
  color: 'primary' | 'green' | 'orange' | 'red'
}

function AnalyticsCard({
  title,
  metric,
  unit,
  trend,
  trendPercent,
  icon,
  color,
}: AnalyticsCardProps) {
  const colorClasses = {
    primary: 'text-primary',
    green: 'text-green-600',
    orange: 'text-orange-600',
    red: 'text-red-600',
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground text-sm">{title}</h3>
        <div className={colorClasses[color]}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-foreground">
        {metric}
        {unit && <span className="text-sm text-muted-foreground ml-1">{unit}</span>}
      </p>
      {trend && trendPercent !== undefined && (
        <div className="flex items-center gap-1 mt-3 text-sm">
          {trend === 'up' && (
            <>
              <TrendingUp className="h-4 w-4 text-red-600" />
              <span className="text-red-600">+{trendPercent}%</span>
            </>
          )}
          {trend === 'down' && (
            <>
              <TrendingDown className="h-4 w-4 text-green-600" />
              <span className="text-green-600">{trendPercent}%</span>
            </>
          )}
          {trend === 'stable' && <span className="text-muted-foreground">Stable</span>}
        </div>
      )}
    </Card>
  )
}

export function AdvancedAnalytics() {
  // Simulated data
  const outbreakDetection = detectOutbreakAnomaly(156, 120, 25)
  const pharmacyForecast = forecastPharmacyDemand([100, 120, 115, 130, 125, 140, 150], 1.15, 30)
  const patientRisk = assessPatientRisk(35, ['diabetes'], ['COVID-19', 'DPT', 'Measles'], 'Kigali')
  const surveillance = calculateSurveillanceMetrics([45, 52, 48, 61, 75, 89, 95, 102], 1250000)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Advanced AI Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Machine learning-powered insights for disease surveillance, pharmacy management, and patient risk assessment.
        </p>
      </div>

      {/* Outbreak Detection */}
      <div className="grid gap-4">
        <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          Outbreak Anomaly Detection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnalyticsCard
            title="Anomaly Score"
            metric={(outbreakDetection.anomalyScore * 100).toFixed(1)}
            unit="%"
            icon={<Activity className="h-5 w-5" />}
            color={outbreakDetection.anomalyScore > 0.7 ? 'red' : 'orange'}
          />
          <AnalyticsCard
            title="Detection Status"
            metric={outbreakDetection.isOutbreak ? 'Outbreak' : 'Normal'}
            icon={<AlertTriangle className="h-5 w-5" />}
            color={outbreakDetection.isOutbreak ? 'red' : 'green'}
          />
          <AnalyticsCard
            title="Incidence Rate"
            metric={(surveillance.incidenceRate).toFixed(1)}
            unit="per 100k"
            trend="up"
            trendPercent={Math.round(surveillance.weeklyChange)}
            icon={<TrendingUp className="h-5 w-5" />}
            color="orange"
          />
          <AnalyticsCard
            title="Trend Direction"
            metric={surveillance.trendDirection.charAt(0).toUpperCase() + surveillance.trendDirection.slice(1)}
            icon={
              surveillance.trendDirection === 'up' ? (
                <TrendingUp className="h-5 w-5" />
              ) : (
                <TrendingDown className="h-5 w-5" />
              )
            }
            color={surveillance.trendDirection === 'up' ? 'red' : 'green'}
          />
        </div>
      </div>

      {/* Pharmacy Forecasting */}
      <div className="grid gap-4">
        <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Pharmacy Stock Forecasting
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnalyticsCard
            title="30-Day Demand"
            metric={pharmacyForecast.predicted}
            unit="units"
            icon={<Activity className="h-5 w-5" />}
            color="primary"
          />
          <AnalyticsCard
            title="Confidence"
            metric={(pharmacyForecast.confidence * 100).toFixed(0)}
            unit="%"
            icon={<Target className="h-5 w-5" />}
            color="primary"
          />
          <Card className="p-6 md:col-span-1 lg:col-span-2">
            <h4 className="font-semibold text-foreground text-sm mb-3">Recommendations</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>
                  Increase order to {Math.round(pharmacyForecast.predicted * 1.2)} units for 30-day buffer
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Monitor demand trends weekly given {(pharmacyForecast.confidence * 100).toFixed(0)}% confidence</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Patient Risk Assessment */}
      <div className="grid gap-4">
        <h3 className="font-semibold text-lg text-foreground">Population Risk Assessment</h3>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Risk Score</p>
              <p className="text-3xl font-bold text-foreground">
                {(patientRisk.riskScore * 100).toFixed(0)}
                <span className="text-sm text-muted-foreground">/100</span>
              </p>
              <Badge className="mt-3" variant={
                patientRisk.category === 'high' ? 'destructive' :
                patientRisk.category === 'medium' ? 'secondary' : 'outline'
              }>
                {patientRisk.category.charAt(0).toUpperCase() + patientRisk.category.slice(1)} Risk
              </Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-3">Risk Factors</p>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Age-related vulnerability
                </li>
                <li className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Chronic disease presence
                </li>
                <li className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Good vaccination coverage
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-3">Recommended Interventions</p>
              <ul className="space-y-2">
                {patientRisk.interventions.map((intervention, i) => (
                  <li key={i} className="text-sm text-foreground flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">→</span>
                    {intervention}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
