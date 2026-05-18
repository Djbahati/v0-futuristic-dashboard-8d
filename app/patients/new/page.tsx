'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { ArrowLeft, Plus, X } from 'lucide-react'

const rwandanDistricts = [
  'Kigali', 'Bugesera', 'Gatsinze', 'Kamonyi', 'Kayonza', 'Kirehe', 'Makuza',
  'Muhanga', 'Ngoma', 'Rwamagana', 'Bugesera', 'Bujumbura', 'Busoro', 'Butaro',
]

const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']

export default function AddPatientPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [allergies, setAllergies] = useState<string[]>([])
  const [allergyInput, setAllergyInput] = useState('')
  const [chronicDiseases, setChronicDiseases] = useState<string[]>([])
  const [diseaseInput, setDiseaseInput] = useState('')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'M',
    uniqueId: '',
    phone: '',
    email: '',
    address: '',
    district: rwandanDistricts[0],
    sector: '',
    bloodType: 'O+',
    emergencyContact: '',
    emergencyPhone: '',
  })

  if (!user) {
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAllergy = () => {
    if (allergyInput.trim() && !allergies.includes(allergyInput)) {
      setAllergies([...allergies, allergyInput])
      setAllergyInput('')
    }
  }

  const handleAddDisease = () => {
    if (diseaseInput.trim() && !chronicDiseases.includes(diseaseInput)) {
      setChronicDiseases([...chronicDiseases, diseaseInput])
      setDiseaseInput('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      router.push('/patients')
    }, 1000)
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-56">
        <DashboardHeader />

        <main className="flex-1 overflow-auto">
          <div className="container py-6 px-4 md:px-6 max-w-4xl">
            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Register New Patient</h2>
                <p className="text-muted-foreground mt-1">Create a new patient record in the system</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Basic patient details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">First Name</label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Last Name</label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Date of Birth</label>
                      <Input
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Blood Type</label>
                      <select
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      >
                        {bloodTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">National ID / Unique ID</label>
                    <Input
                      name="uniqueId"
                      value={formData.uniqueId}
                      onChange={handleChange}
                      placeholder="1199800001234"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Phone, email, and address details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Phone</label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+250788123456"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="patient@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Address</label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">District</label>
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      >
                        {rwandanDistricts.map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Sector</label>
                      <Input
                        name="sector"
                        value={formData.sector}
                        onChange={handleChange}
                        placeholder="e.g., Kacyiru"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <CardDescription>Contact person in case of emergency</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Contact Name</label>
                      <Input
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Contact Phone</label>
                      <Input
                        name="emergencyPhone"
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={handleChange}
                        placeholder="+250788654321"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Medical History */}
              <Card>
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                  <CardDescription>Known allergies and chronic diseases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Allergies */}
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-3">Known Allergies</label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={allergyInput}
                          onChange={(e) => setAllergyInput(e.target.value)}
                          placeholder="e.g., Penicillin"
                        />
                        <Button
                          type="button"
                          onClick={handleAddAllergy}
                          variant="outline"
                          size="icon"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {allergies.map((allergy) => (
                          <span
                            key={allergy}
                            className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-3 py-1 rounded-full border border-accent/20"
                          >
                            {allergy}
                            <button
                              type="button"
                              onClick={() => setAllergies(allergies.filter((a) => a !== allergy))}
                              className="hover:opacity-70"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Chronic Diseases */}
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-3">Chronic Diseases</label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={diseaseInput}
                          onChange={(e) => setDiseaseInput(e.target.value)}
                          placeholder="e.g., Diabetes"
                        />
                        <Button
                          type="button"
                          onClick={handleAddDisease}
                          variant="outline"
                          size="icon"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {chronicDiseases.map((disease) => (
                          <span
                            key={disease}
                            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20"
                          >
                            {disease}
                            <button
                              type="button"
                              onClick={() => setChronicDiseases(chronicDiseases.filter((d) => d !== disease))}
                              className="hover:opacity-70"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Form Actions */}
              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Patient'}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
