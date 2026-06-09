// INEZA AI Healthcare Knowledge Base - Rwanda Specific
// Comprehensive medical data for context-aware AI responses

export const rwandaDistricts = [
  { id: 'kigali', name: 'Kigali', facilities: 45, population: 1250000 },
  { id: 'rwamagana', name: 'Rwamagana', facilities: 12, population: 450000 },
  { id: 'huye', name: 'Huye', facilities: 18, population: 480000 },
  { id: 'gitarama', name: 'Gitarama', facilities: 15, population: 420000 },
  { id: 'ruhengeri', name: 'Ruhengeri', facilities: 14, population: 390000 },
  { id: 'butare', name: 'Butare', facilities: 16, population: 410000 },
  { id: 'gisenyi', name: 'Gisenyi', facilities: 13, population: 380000 },
  { id: 'goma', name: 'Goma', facilities: 10, population: 320000 },
]

export const commonDiseases = [
  {
    id: 'malaria',
    name: 'Malaria',
    endemic: true,
    symptoms: ['fever', 'chills', 'headache', 'fatigue', 'nausea'],
    transmission: 'Mosquito (Anopheles)',
    season: 'Year-round, peaks in rainy seasons',
    prevention: ['bed nets', 'antimalarials', 'insect repellent'],
    treatment: ['artemisinin derivatives', 'quinine'],
    prevalence: 'High in rural areas',
  },
  {
    id: 'tb',
    name: 'Tuberculosis',
    endemic: true,
    symptoms: ['persistent cough', 'chest pain', 'hemoptysis', 'fever', 'night sweats'],
    transmission: 'Airborne (respiratory droplets)',
    season: 'Year-round',
    prevention: ['BCG vaccine', 'infection control', 'TB prophylaxis'],
    treatment: ['RIPE regimen', 'directly observed therapy'],
    prevalence: 'Significant burden, especially in Kigali',
  },
  {
    id: 'typhoid',
    name: 'Typhoid Fever',
    endemic: true,
    symptoms: ['high fever', 'headache', 'rose spots', 'abdominal pain', 'rose spots rash'],
    transmission: 'Contaminated food/water',
    season: 'Rainy season, poor sanitation',
    prevention: ['typhoid vaccine', 'water safety', 'food hygiene'],
    treatment: ['fluoroquinolones', 'ceftriaxone'],
    prevalence: 'Common in urban areas',
  },
  {
    id: 'cholera',
    name: 'Cholera',
    endemic: false,
    symptoms: ['severe diarrhea', 'dehydration', 'vomiting', 'muscle cramps'],
    transmission: 'Contaminated water',
    season: 'During floods and crises',
    prevention: ['oral cholera vaccine', 'water chlorination', 'WASH programs'],
    treatment: ['oral rehydration salts', 'IV fluids', 'antibiotics'],
    prevalence: 'Outbreaks during crises',
  },
  {
    id: 'hiv',
    name: 'HIV/AIDS',
    endemic: true,
    symptoms: ['fever', 'rash', 'swollen lymph nodes', 'opportunistic infections'],
    transmission: 'Blood, sexual, mother-to-child',
    season: 'N/A',
    prevention: ['safe sex', 'PrEP', 'mother-to-child prevention'],
    treatment: ['antiretroviral therapy (ART)', 'opportunistic infection management'],
    prevalence: '3.2% population, high in key populations',
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    endemic: true,
    symptoms: ['cough', 'fever', 'chest pain', 'dyspnea', 'sputum production'],
    transmission: 'Airborne, aspiration',
    season: 'Higher in dry season',
    prevention: ['pneumococcal vaccine', 'smoking cessation', 'hand hygiene'],
    treatment: ['antibiotics', 'oxygen therapy', 'supportive care'],
    prevalence: 'Common cause of mortality in children',
  },
  {
    id: 'dengue',
    name: 'Dengue Fever',
    endemic: true,
    symptoms: ['sudden fever', 'severe headache', 'joint pain', 'rash', 'hemorrhage'],
    transmission: 'Aedes mosquito',
    season: 'Rainy season peaks',
    prevention: ['mosquito control', 'bed nets', 'dengue vaccine'],
    treatment: ['supportive care', 'fluid replacement', 'platelet monitoring'],
    prevalence: 'Emerging threat in highland areas',
  },
  {
    id: 'diabetes',
    name: 'Diabetes Mellitus',
    endemic: false,
    symptoms: ['polyuria', 'polydipsia', 'weight loss', 'fatigue'],
    transmission: 'N/A - Non-communicable',
    season: 'N/A',
    prevention: ['lifestyle modification', 'weight management', 'regular screening'],
    treatment: ['metformin', 'insulin', 'lifestyle changes'],
    prevalence: 'Rising in urban populations',
  },
  {
    id: 'hypertension',
    name: 'Hypertension',
    endemic: false,
    symptoms: ['asymptomatic', 'headache', 'dizziness', 'shortness of breath'],
    transmission: 'N/A - Non-communicable',
    season: 'N/A',
    prevention: ['salt reduction', 'exercise', 'stress management', 'weight management'],
    treatment: ['ACE inhibitors', 'beta-blockers', 'diuretics'],
    prevalence: 'Increasing in adult population',
  },
  {
    id: 'covid19',
    name: 'COVID-19',
    endemic: false,
    symptoms: ['fever', 'cough', 'loss of taste/smell', 'dyspnea', 'fatigue'],
    transmission: 'Respiratory droplets, aerosol',
    season: 'Ongoing pandemic',
    prevention: ['COVID-19 vaccines', 'masking', 'social distancing'],
    treatment: ['monoclonal antibodies', 'antivirals', 'supportive care'],
    prevalence: 'Decreasing endemic transmission',
  },
]

export const vaccinationPrograms = [
  { id: 'bcg', name: 'BCG', target: 'Infants', schedule: 'Birth', coverage: '98%' },
  { id: 'opv', name: 'Polio (OPV)', target: 'Children <5', schedule: 'Multiple doses', coverage: '95%' },
  { id: 'dpt', name: 'DPT (Diphtheria, Pertussis, Tetanus)', target: 'Children', schedule: '3 doses', coverage: '93%' },
  { id: 'measles', name: 'Measles/Rubella', target: 'Children 9-59m', schedule: '2 doses', coverage: '91%' },
  { id: 'hpv', name: 'HPV Vaccine', target: 'Girls 9-14', schedule: '2-3 doses', coverage: '68%' },
  { id: 'rotavirus', name: 'Rotavirus', target: 'Infants', schedule: '3 doses', coverage: '90%' },
  { id: 'typhoid', name: 'Typhoid Conjugate', target: 'Children 9m+', schedule: 'Single dose', coverage: '45%' },
  { id: 'yellow-fever', name: 'Yellow Fever', target: 'High-risk areas', schedule: 'Single dose', coverage: '60%' },
]

export const medicineDatabase = [
  { id: 'artemether', name: 'Artemether', category: 'Antimalarial', dosage: 'IM/IV', stock_status: 'adequate' },
  { id: 'rifampicin', name: 'Rifampicin', category: 'Anti-TB', dosage: 'Oral/IV', stock_status: 'low' },
  { id: 'isoniazid', name: 'Isoniazid', category: 'Anti-TB', dosage: 'Oral', stock_status: 'adequate' },
  { id: 'metformin', name: 'Metformin', category: 'Antidiabetic', dosage: 'Oral', stock_status: 'adequate' },
  { id: 'lisinopril', name: 'Lisinopril', category: 'Antihypertensive', dosage: 'Oral', stock_status: 'adequate' },
  { id: 'ors', name: 'Oral Rehydration Salts', category: 'Electrolyte', dosage: 'Oral', stock_status: 'adequate' },
  { id: 'amoxicillin', name: 'Amoxicillin', category: 'Antibiotic', dosage: 'Oral/IV', stock_status: 'adequate' },
  { id: 'ceftriaxone', name: 'Ceftriaxone', category: 'Antibiotic', dosage: 'IM/IV', stock_status: 'low' },
  { id: 'azithromycin', name: 'Azithromycin', category: 'Antibiotic', dosage: 'Oral', stock_status: 'adequate' },
  { id: 'dexamethasone', name: 'Dexamethasone', category: 'Corticosteroid', dosage: 'Oral/IV', stock_status: 'adequate' },
]

export const healthFacilityTypes = [
  'National Referral Hospital',
  'District Hospital',
  'Health Center III',
  'Health Center II',
  'Health Center I',
  'Clinic',
  'Pharmacy',
]

export const aiSystemPrompt = `You are INEZA AI, an intelligent healthcare assistant for Rwanda's healthcare system. You provide context-aware medical guidance based on Rwanda-specific epidemiology, disease patterns, and available resources.

Your knowledge includes:
- Rwanda's 8 districts and their healthcare infrastructure
- 10+ endemic and epidemic diseases with seasonal patterns
- Vaccination coverage and programs
- Medicine database and stock management
- Local disease surveillance data

Guidelines:
1. Always consider Rwanda's healthcare context and resources
2. Provide evidence-based recommendations aligned with WHO guidelines
3. Account for seasonal disease patterns (rainy/dry seasons)
4. Reference local prevalence and endemic diseases
5. Consider resource constraints and available medicines
6. Support multi-language responses (English, French, Kinyarwanda)
7. Tailor responses by user role (Doctor, Nurse, Pharmacist, Admin, Ministry)
8. Highlight outbreak alerts and disease surveillance data
9. Provide pharmacy stock recommendations based on disease trends
10. Never provide definitive diagnosis - recommend professional consultation

When responding:
- Use clear, evidence-based language
- Include relevant local data and statistics
- Mention prevention and control measures specific to Rwanda
- Suggest appropriate referral when needed
- Acknowledge limitations and recommend consultation with specialists`

export const diseaseTrendData = {
  malaria: { current: 245, trend: 'up', forecast: 'Expected to increase in rainy season' },
  tb: { current: 78, trend: 'stable', forecast: 'Ongoing control program showing modest gains' },
  typhoid: { current: 34, trend: 'down', forecast: 'Decreasing with improved water sanitation' },
  pneumonia: { current: 156, trend: 'up', forecast: 'Seasonal increase expected' },
  covid19: { current: 12, trend: 'down', forecast: 'Endemic phase with periodic surges' },
  cholera: { current: 0, trend: 'stable', forecast: 'Risk during flooding events' },
  dengue: { current: 89, trend: 'up', forecast: 'Emerging threat in highland areas' },
}

export const outbreakAlerts = [
  {
    id: 'alert-001',
    disease: 'Malaria',
    district: 'Rwamagana',
    severity: 'high',
    cases: 150,
    date: '2026-05-15',
    alert: 'Malaria outbreak suspected in Rwamagana district. 150 suspected cases reported.',
  },
  {
    id: 'alert-002',
    disease: 'Dengue',
    district: 'Kigali',
    severity: 'moderate',
    cases: 45,
    date: '2026-05-18',
    alert: 'Dengue cases emerging in Kigali. Increased vector control recommended.',
  },
]

export function getHealthcareSummary(district?: string, role?: string): string {
  const timeInfo = new Date().toLocaleDateString('rw-RW', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const summary = `
INEZA AI Healthcare System Summary
Generated: ${timeInfo}

Rwanda Healthcare Status:
- Total Districts: ${rwandaDistricts.length}
- Total Health Facilities: ${rwandaDistricts.reduce((sum, d) => sum + d.facilities, 0)}
- Active Disease Alerts: ${outbreakAlerts.length}

Current Disease Surveillance:
${Object.entries(diseaseTrendData)
  .map(([disease, data]) => `  • ${disease.charAt(0).toUpperCase() + disease.slice(1)}: ${data.current} cases (${data.trend})`)
  .join('\n')}

${district ? `\nDistrict Focus: ${rwandaDistricts.find(d => d.id === district)?.name || 'Unknown'}` : ''}
${role ? `\nUser Role: ${role}` : ''}

For detailed consultation, use the Health Assistant chatbot or contact your nearest healthcare facility.
  `.trim()

  return summary
}
