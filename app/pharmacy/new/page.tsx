'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, PackagePlus } from 'lucide-react'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/auth-context'

export default function NewMedicationPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [saved, setSaved] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaved(true)
    window.setTimeout(() => router.push('/pharmacy'), 700)
  }

  if (loading) return null
  if (!user) return null

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader title="Add Medication" />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            <Button variant="ghost" className="-ml-3 gap-2" onClick={() => router.push('/pharmacy')}>
              <ArrowLeft className="h-4 w-4" />
              Back to Pharmacy
            </Button>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <PackagePlus className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>New Medication Stock</CardTitle>
                    <CardDescription>Record a medication delivery or inventory addition.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Medication name</Label>
                      <Input id="name" name="name" placeholder="e.g. Paracetamol" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genericName">Generic name</Label>
                      <Input id="genericName" name="genericName" placeholder="e.g. Acetaminophen" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dosage">Dosage</Label>
                      <Input id="dosage" name="dosage" placeholder="e.g. 500mg" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="form">Form</Label>
                      <Input id="form" name="form" placeholder="Tablet, capsule, liquid" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manufacturer">Manufacturer</Label>
                      <Input id="manufacturer" name="manufacturer" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="batchNumber">Batch number</Label>
                      <Input id="batchNumber" name="batchNumber" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" name="quantity" type="number" min="1" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Input id="unit" name="unit" placeholder="Tablets, bottles, boxes" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry date</Label>
                      <Input id="expiryDate" name="expiryDate" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Unit price (RWF)</Label>
                      <Input id="price" name="price" type="number" min="0" step="0.01" required />
                    </div>
                  </div>

                  <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                    <Button type="button" variant="outline" onClick={() => router.push('/pharmacy')}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={saved}>
                      {saved ? 'Stock added' : 'Add to inventory'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
