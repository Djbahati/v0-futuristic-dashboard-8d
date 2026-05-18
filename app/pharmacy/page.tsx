'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Medication } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import {
  Pill,
  Search,
  Plus,
  AlertTriangle,
  TrendingDown,
  Package,
  Clock,
} from 'lucide-react'

// Mock medication data
const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    dosage: '500mg',
    form: 'Tablet',
    manufacturer: 'Cipla',
    batchNumber: 'BATCH001',
    expiryDate: new Date('2025-12-31'),
    quantity: 45,
    unit: 'Tablets',
    price: 0.50,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin Trihydrate',
    dosage: '250mg',
    form: 'Capsule',
    manufacturer: 'Novartis',
    batchNumber: 'BATCH002',
    expiryDate: new Date('2025-06-30'),
    quantity: 120,
    unit: 'Capsules',
    price: 1.25,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    dosage: '10mg',
    form: 'Tablet',
    manufacturer: 'GSK',
    batchNumber: 'BATCH003',
    expiryDate: new Date('2026-03-31'),
    quantity: 280,
    unit: 'Tablets',
    price: 2.00,
    createdAt: new Date('2024-03-10'),
  },
  {
    id: '4',
    name: 'Metformin',
    genericName: 'Metformin HCl',
    dosage: '500mg',
    form: 'Tablet',
    manufacturer: 'Lupin',
    batchNumber: 'BATCH004',
    expiryDate: new Date('2025-09-30'),
    quantity: 78,
    unit: 'Tablets',
    price: 0.75,
    createdAt: new Date('2024-01-25'),
  },
  {
    id: '5',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    dosage: '400mg',
    form: 'Tablet',
    manufacturer: 'Reckitt',
    batchNumber: 'BATCH005',
    expiryDate: new Date('2025-08-15'),
    quantity: 25,
    unit: 'Tablets',
    price: 0.60,
    createdAt: new Date('2024-04-05'),
  },
  {
    id: '6',
    name: 'Vitamin D3',
    genericName: 'Cholecalciferol',
    dosage: '1000 IU',
    form: 'Liquid',
    manufacturer: 'Pharmalot',
    batchNumber: 'BATCH006',
    expiryDate: new Date('2026-01-31'),
    quantity: 45,
    unit: 'Bottles',
    price: 3.50,
    createdAt: new Date('2024-02-14'),
  },
]

export default function PharmacyPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [medications, setMedications] = useState<Medication[]>(mockMedications)

  if (!user) {
    return null
  }

  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const lowStockMeds = medications.filter((m) => m.quantity < 100)
  const expiringSoon = medications.filter(
    (m) => {
      const daysUntilExpiry = Math.floor(
        (m.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      )
      return daysUntilExpiry <= 90 && daysUntilExpiry > 0
    }
  )

  const totalValue = medications.reduce((sum, med) => sum + med.quantity * med.price, 0)

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
                <h2 className="text-3xl font-bold text-foreground">Pharmacy</h2>
                <p className="text-muted-foreground mt-1">Manage medication inventory and stock levels</p>
              </div>
              <Button
                onClick={() => router.push('/pharmacy/new')}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Medication
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid gap-4 md:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Medications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{medications.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Types available</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Units</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {medications.reduce((sum, m) => sum + m.quantity, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">All items combined</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Inventory Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">${totalValue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground mt-1">Estimated total</p>
                </CardContent>
              </Card>

              <Card className="border-orange-200 dark:border-orange-900/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-orange-600 dark:text-orange-400">Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {lowStockMeds.length}
                  </div>
                  <p className="text-xs text-orange-600/70 dark:text-orange-400/70 mt-1">Low stock items</p>
                </CardContent>
              </Card>
            </div>

            {/* Alerts section */}
            {(lowStockMeds.length > 0 || expiringSoon.length > 0) && (
              <div className="grid gap-4 md:grid-cols-2 mb-8">
                {lowStockMeds.length > 0 && (
                  <Card className="border-orange-200 dark:border-orange-900/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2 text-orange-600 dark:text-orange-400">
                        <AlertTriangle className="h-4 w-4" />
                        Low Stock Items
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {lowStockMeds.slice(0, 3).map((med) => (
                          <div key={med.id} className="flex justify-between text-sm">
                            <span className="text-foreground">{med.name}</span>
                            <span className="text-orange-600 dark:text-orange-400 font-medium">
                              {med.quantity} {med.unit}
                            </span>
                          </div>
                        ))}
                        {lowStockMeds.length > 3 && (
                          <p className="text-xs text-muted-foreground pt-2">
                            +{lowStockMeds.length - 3} more items
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {expiringSoon.length > 0 && (
                  <Card className="border-orange-200 dark:border-orange-900/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2 text-orange-600 dark:text-orange-400">
                        <Clock className="h-4 w-4" />
                        Expiring Soon (90 days)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {expiringSoon.slice(0, 3).map((med) => (
                          <div key={med.id} className="flex justify-between text-sm">
                            <span className="text-foreground">{med.name}</span>
                            <span className="text-orange-600 dark:text-orange-400 font-medium">
                              {med.expiryDate.toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Search bar */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search medications by name or generic name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medications table */}
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-sm font-medium text-muted-foreground py-3 px-4">Medication</th>
                        <th className="text-left text-sm font-medium text-muted-foreground py-3 px-4">Generic</th>
                        <th className="text-left text-sm font-medium text-muted-foreground py-3 px-4">Dosage</th>
                        <th className="text-left text-sm font-medium text-muted-foreground py-3 px-4">Stock</th>
                        <th className="text-left text-sm font-medium text-muted-foreground py-3 px-4">Expiry</th>
                        <th className="text-left text-sm font-medium text-muted-foreground py-3 px-4">Price</th>
                        <th className="text-left text-sm font-medium text-muted-foreground py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMedications.map((med) => (
                        <tr
                          key={med.id}
                          className="border-b border-border hover:bg-muted/30 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="bg-primary/10 p-2 rounded-lg">
                                <Pill className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium text-foreground">{med.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{med.genericName}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{med.dosage}</td>
                          <td className="py-3 px-4">
                            <span className={`text-sm font-medium ${med.quantity < 100 ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>
                              {med.quantity} {med.unit}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {med.expiryDate.toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-sm font-medium text-foreground">
                            ${med.price.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // Handle edit
                              }}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredMedications.length === 0 && (
                  <div className="text-center py-8">
                    <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">No medications found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
