import { aiSystemPrompt, getHealthcareSummary, commonDiseases, vaccinationPrograms, medicineDatabase } from './healthcare-kb'

export interface AIContextData {
  userRole?: string
  district?: string
  facility?: string
  specialization?: string
  timestamp: Date
}

export function buildAISystemPrompt(contextData?: AIContextData): string {
  const basePrompt = aiSystemPrompt

  let contextualAddition = ''

  if (contextData?.userRole) {
    contextualAddition += `\nUser Role: ${contextData.userRole}`

    switch (contextData.userRole) {
      case 'Doctor':
        contextualAddition += '\n- Provide detailed clinical guidance for diagnosis and treatment\n- Consider specialist knowledge and procedures\n- Recommend evidence-based interventions'
        break
      case 'Nurse':
        contextualAddition += '\n- Focus on patient care protocols and nursing interventions\n- Provide health education guidance\n- Include infection control measures'
        break
      case 'Pharmacist':
        contextualAddition += '\n- Prioritize drug interactions and medication management\n- Include dosage and formulation information\n- Address supply chain and stock management'
        break
      case 'Ministry':
        contextualAddition += '\n- Focus on public health strategy and epidemiology\n- Include surveillance and reporting requirements\n- Address policy implications'
        break
    }
  }

  if (contextData?.district) {
    contextualAddition += `\nFocused District: ${contextData.district}`
  }

  if (contextData?.specialization) {
    contextualAddition += `\nSpecialization: ${contextData.specialization}`
  }

  return basePrompt + contextualAddition
}

export function getHealthcareContext(contextData?: AIContextData): string {
  return getHealthcareSummary(contextData?.district, contextData?.userRole)
}

export function formatDiseaseInfo(diseaseId: string): string {
  const disease = commonDiseases.find(d => d.id === diseaseId)
  if (!disease) return `Disease ${diseaseId} not found in knowledge base.`

  return `
Disease: ${disease.name}
Endemic Status: ${disease.endemic ? 'Yes - High priority for Rwanda' : 'No - Monitor for importation'}
Symptoms: ${disease.symptoms.join(', ')}
Transmission: ${disease.transmission}
Seasonal Pattern: ${disease.season}
Prevention: ${disease.prevention.join(', ')}
Treatment: ${disease.treatment.join(', ')}
Local Prevalence: ${disease.prevalence}
  `.trim()
}

export function getVaccinationInfo(): string {
  return `
Rwanda Immunization Program Coverage:
${vaccinationPrograms.map(prog => `${prog.name} (${prog.target}): ${prog.coverage} coverage`).join('\n')}
  `.trim()
}

export function getMedicineInfo(medicineId: string): string {
  const medicine = medicineDatabase.find(m => m.id === medicineId)
  if (!medicine) return `Medicine ${medicineId} not found in database.`

  return `
Medicine: ${medicine.name}
Category: ${medicine.category}
Administration: ${medicine.dosage}
Stock Status: ${medicine.stock_status}
  `.trim()
}

export function enrichPromptWithContext(userMessage: string, contextData?: AIContextData): string {
  let enrichedMessage = userMessage

  // Detect if asking about diseases
  const diseaseKeywords = commonDiseases.map(d => d.name.toLowerCase())
  const foundDisease = diseaseKeywords.find(disease => userMessage.toLowerCase().includes(disease))

  if (foundDisease) {
    const disease = commonDiseases.find(d => d.name.toLowerCase() === foundDisease)
    if (disease) {
      enrichedMessage += `\n\n[SYSTEM CONTEXT: User asking about ${disease.name}]\n${formatDiseaseInfo(disease.id)}`
    }
  }

  // Add healthcare summary
  enrichedMessage += `\n\n[HEALTHCARE CONTEXT]\n${getHealthcareContext(contextData)}`

  return enrichedMessage
}
