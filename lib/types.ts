// User roles in INEZA AI system
export enum UserRole {
  Doctor = 'doctor',
  Nurse = 'nurse',
  Pharmacist = 'pharmacist',
  Admin = 'admin',
  Ministry = 'ministry',
}

// User authentication type
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  facility?: string;
  createdAt: Date;
  lastLogin?: Date;
}

// Session type
export interface Session {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  facility?: string;
  expiresAt: Date;
}

// Patient record type
export interface Patient {
  id: string;
  uniqueId: string; // National ID or unique health ID
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'M' | 'F' | 'O';
  phone?: string;
  email?: string;
  address?: string;
  district: string;
  sector?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Appointment type
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  facilityId: string;
  appointmentDate: Date;
  appointmentTime: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Medication type
export interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  form: string; // tablet, liquid, injection, etc.
  manufacturer: string;
  batchNumber: string;
  expiryDate: Date;
  quantity: number;
  unit: string; // tablets, ml, etc.
  price: number;
  createdAt: Date;
}

// Disease tracking type
export interface DiseaseCase {
  id: string;
  patientId: string;
  diseaseCode: string;
  diseaseName: string;
  diagnosisDate: Date;
  status: 'active' | 'recovered' | 'under-treatment';
  severity: 'mild' | 'moderate' | 'severe';
  district: string;
  facilityId: string;
  reportedBy: string;
  createdAt: Date;
}

// Analytics dashboard type
export interface HealthMetrics {
  totalPatients: number;
  activeAppointments: number;
  medicationStock: number;
  diseaseOutbreaks: number;
  vaccinations: number;
}
