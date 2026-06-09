// Advanced AI Features for INEZA AI System

export interface DiseaseOutbreakDetection {
  disease: string
  district: string
  reportedCases: number
  expectedCases: number
  anomalyScore: number
  confidence: number
  recommendation: string
}

export interface PharmacyStockPrediction {
  medicine: string
  currentStock: number
  predictedDemand: number
  daysUntilStockout: number
  recommendedOrder: number
  urgency: 'critical' | 'high' | 'medium' | 'low'
}

export interface PatientTrendAnalysis {
  demographic: string
  diseaseIncidence: number
  trend: 'increasing' | 'decreasing' | 'stable'
  riskFactors: string[]
  interventions: string[]
}

// Disease outbreak detection algorithm
export function detectOutbreakAnomaly(
  reportedCases: number,
  historicalAverage: number,
  standardDeviation: number
): { anomalyScore: number; isOutbreak: boolean } {
  const zScore = Math.abs((reportedCases - historicalAverage) / (standardDeviation || 1))
  const anomalyScore = Math.min(zScore / 3, 1) // Normalize to 0-1
  const isOutbreak = zScore > 2 // More than 2 standard deviations = outbreak

  return { anomalyScore, isOutbreak }
}

// Pharmacy demand forecasting
export function forecastPharmacyDemand(
  historicalData: number[],
  seasonalityFactor: number = 1.2,
  days: number = 30
): { predicted: number; confidence: number } {
  if (historicalData.length < 2) {
    return { predicted: historicalData[0] || 0, confidence: 0.5 }
  }

  const average = historicalData.reduce((a, b) => a + b, 0) / historicalData.length
  const trend = (historicalData[historicalData.length - 1] - historicalData[0]) / historicalData.length
  const predicted = (average + trend * (days / 30)) * seasonalityFactor
  const confidence = Math.min(historicalData.length / 12, 1) // More history = more confident

  return { predicted: Math.round(predicted), confidence }
}

// Risk assessment for patients
export function assessPatientRisk(
  age: number,
  chronicDiseases: string[],
  vaccinations: string[],
  region: string
): { riskScore: number; category: 'low' | 'medium' | 'high'; interventions: string[] } {
  let riskScore = 0

  // Age factor
  if (age < 5 || age > 65) riskScore += 0.2
  if (age < 2 || age > 75) riskScore += 0.2

  // Chronic disease factor
  riskScore += Math.min(chronicDiseases.length * 0.15, 0.4)

  // Vaccination factor
  const expectedVaccinations = 8
  const vaccinationGap = Math.max(0, expectedVaccinations - vaccinations.length)
  riskScore += (vaccinationGap / expectedVaccinations) * 0.2

  // Regional endemic disease factor
  const endemicRegions: Record<string, number> = {
    'Rwamagana': 0.3,
    'Huye': 0.2,
    'Kigali': 0.1,
  }
  riskScore += endemicRegions[region] || 0.15

  const category = riskScore > 0.6 ? 'high' : riskScore > 0.3 ? 'medium' : 'low'

  const interventions = []
  if (age < 5) interventions.push('Enhanced immunization monitoring')
  if (age > 65) interventions.push('Regular health screening')
  if (chronicDiseases.length > 0) interventions.push('Medication adherence support')
  if (vaccinationGap > 0) interventions.push('Catch-up vaccination schedule')

  return {
    riskScore: Math.min(riskScore, 1),
    category,
    interventions,
  }
}

// Generate clinical recommendations
export function generateClinicalRecommendations(
  symptoms: string[],
  travelHistory?: string,
  vaccineStatus?: string[]
): string[] {
  const recommendations: string[] = []

  // Malaria risk assessment
  if (symptoms.includes('fever') && symptoms.includes('chills')) {
    recommendations.push('Consider malaria testing (RDT or blood smear)')
    if (travelHistory?.includes('rural')) {
      recommendations.push('High-risk area - initiate antimalarial treatment pending results')
    }
  }

  // Respiratory infection
  if (symptoms.includes('cough') && symptoms.includes('fever')) {
    recommendations.push('Chest X-ray to rule out pneumonia')
    recommendations.push('COVID-19 test if recent exposure')
    if (!vaccineStatus?.includes('COVID-19')) {
      recommendations.push('Offer COVID-19 vaccination')
    }
  }

  // Gastrointestinal
  if (symptoms.includes('diarrhea') && symptoms.includes('vomiting')) {
    recommendations.push('Assess for dehydration - start IV/oral rehydration')
    recommendations.push('Stool culture if symptoms persist > 3 days')
    recommendations.push('Safe water education')
  }

  if (recommendations.length === 0) {
    recommendations.push('Detailed clinical assessment required')
  }

  return recommendations
}

// Multi-language translation keys
export const multiLanguageKeys = {
  en: {
    'dashboard.title': 'Dashboard',
    'health.assistant': 'Health Assistant',
    'ai.insights': 'AI Insights',
    'outbreak.alert': 'Outbreak Alert',
    'disease.tracking': 'Disease Tracking',
    'pharmacy.stock': 'Pharmacy Stock',
    'patients': 'Patients',
    'appointments': 'Appointments',
  },
  fr: {
    'dashboard.title': 'Tableau de Bord',
    'health.assistant': 'Assistant Santé',
    'ai.insights': 'Informations IA',
    'outbreak.alert': 'Alerte Épidémique',
    'disease.tracking': 'Suivi des Maladies',
    'pharmacy.stock': 'Stock Pharmacie',
    'patients': 'Patients',
    'appointments': 'Rendez-vous',
  },
  rw: {
    'dashboard.title': 'Ubwayo bwacu',
    'health.assistant': 'Inzira y\'Ubwisanzure',
    'ai.insights': 'Amakuru ya AI',
    'outbreak.alert': 'Isitizi ry\'urwaye',
    'disease.tracking': 'Gukurikirana Rwa Ndwara',
    'pharmacy.stock': 'Inyigisho z\'Imiti',
    'patients': 'Abarwayi',
    'appointments': 'Igihe Cyiteranywe',
  },
}

// Export healthcare metrics summary
export function generateHealthcareMetricsSummary(metrics: {
  totalPatients: number
  activeAppointments: number
  medicineInStock: number
  vaccinations: number
  diseaseOutbreaks: number
}): string {
  return `
Healthcare System Status:
- Total Patients: ${metrics.totalPatients.toLocaleString()}
- Active Appointments: ${metrics.activeAppointments}
- Medicine in Stock: ${metrics.medicineInStock} units
- Vaccinations Administered: ${metrics.vaccinations}
- Active Disease Outbreaks: ${metrics.diseaseOutbreaks}

System Status: ${metrics.diseaseOutbreaks === 0 ? 'Normal' : 'Alert Level ' + (metrics.diseaseOutbreaks > 2 ? 'High' : 'Medium')}
  `.trim()
}

// Real-time surveillance integration
export function calculateSurveillanceMetrics(
  reportedCases: number[],
  populationAtRisk: number
): {
  incidenceRate: number
  weeklyChange: number
  trendDirection: 'up' | 'down' | 'stable'
} {
  const recent = reportedCases.slice(-7)
  const previous = reportedCases.slice(-14, -7)

  const recentTotal = recent.reduce((a, b) => a + b, 0)
  const previousTotal = previous.reduce((a, b) => a + b, 0)

  const incidenceRate = (recentTotal / populationAtRisk) * 100000
  const weeklyChange = previousTotal > 0 ? ((recentTotal - previousTotal) / previousTotal) * 100 : 0

  let trendDirection: 'up' | 'down' | 'stable' = 'stable'
  if (weeklyChange > 10) trendDirection = 'up'
  if (weeklyChange < -10) trendDirection = 'down'

  return {
    incidenceRate,
    weeklyChange,
    trendDirection,
  }
}
