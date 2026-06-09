'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Check, User, Lock, Bell, Palette, LogOut, Save } from 'lucide-react'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Profile form state
  const [profile, setProfile] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    specialization: user?.role === 'doctor' ? 'Cardiology' : '',
    licenseNumber: '',
  })

  // Security state
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    emergencyAlerts: true,
    stockAlerts: true,
    diseaseOutbreaks: true,
  })

  // Preferences state
  const [preferences, setPreferences] = useState({
    theme: 'light' as const,
    language: 'en' as const,
    timeZone: 'Africa/Kigali',
    workingHours: '9:00 AM - 5:00 PM',
  })

  const handleSaveProfile = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaveSuccess(true)
      setIsSaving(false)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 500)
  }

  const handleChangePassword = async () => {
    if (password.new !== password.confirm) {
      alert('Passwords do not match')
      return
    }
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaveSuccess(true)
      setPassword({ current: '', new: '', confirm: '' })
      setIsSaving(false)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 500)
  }

  const handleSaveNotifications = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaveSuccess(true)
      setIsSaving(false)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 500)
  }

  const handleSavePreferences = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaveSuccess(true)
      setIsSaving(false)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 500)
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Settings" />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-1/2">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="gap-2">
                  <Lock className="h-4 w-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Alerts</span>
                </TabsTrigger>
                <TabsTrigger value="preferences" className="gap-2">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Prefs</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Profile Information</h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">First Name</label>
                        <Input
                          value={profile.firstName}
                          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                          className="mt-1"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Last Name</label>
                        <Input
                          value={profile.lastName}
                          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                          className="mt-1"
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Email Address</label>
                      <Input
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="mt-1"
                        type="email"
                        placeholder="Email address"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Phone Number</label>
                      <Input
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="mt-1"
                        placeholder="+250 788 123 456"
                      />
                    </div>

                    {user.role === 'doctor' && (
                      <>
                        <div>
                          <label className="text-sm font-medium text-foreground">Specialization</label>
                          <Input
                            value={profile.specialization}
                            onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                            className="mt-1"
                            placeholder="Medical specialization"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-foreground">License Number</label>
                          <Input
                            value={profile.licenseNumber}
                            onChange={(e) => setProfile({ ...profile, licenseNumber: e.target.value })}
                            className="mt-1"
                            placeholder="Medical license number"
                          />
                        </div>
                      </>
                    )}

                    <div className="pt-4 flex gap-2">
                      <Button onClick={handleSaveProfile} disabled={isSaving} className="gap-2">
                        {saveSuccess ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                        {saveSuccess ? 'Saved!' : isSaving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Account Info */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Account Information</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">User ID</span>
                      <Badge variant="outline">{user.id}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Role</span>
                      <Badge className="bg-primary text-primary-foreground capitalize">{user.role}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Account Status</span>
                      <Badge className="bg-green-500/20 text-green-700">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Member Since</span>
                      <span className="text-sm text-foreground">January 2024</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Change Password</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Current Password</label>
                      <Input
                        type="password"
                        value={password.current}
                        onChange={(e) => setPassword({ ...password, current: e.target.value })}
                        className="mt-1"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">New Password</label>
                      <Input
                        type="password"
                        value={password.new}
                        onChange={(e) => setPassword({ ...password, new: e.target.value })}
                        className="mt-1"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Confirm Password</label>
                      <Input
                        type="password"
                        value={password.confirm}
                        onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                        className="mt-1"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <div className="pt-4 flex gap-2">
                      <Button onClick={handleChangePassword} disabled={isSaving} className="gap-2">
                        {saveSuccess ? <Check className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                        {saveSuccess ? 'Updated!' : isSaving ? 'Updating...' : 'Update Password'}
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Two-Factor Authentication */}
                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground mt-1">Add an extra layer of security to your account</p>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-700">Disabled</Badge>
                  </div>
                  <Button variant="outline" className="mt-4">Enable 2FA</Button>
                </Card>

                {/* Active Sessions */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Active Sessions</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded">
                      <div>
                        <p className="font-medium text-foreground text-sm">Current Session</p>
                        <p className="text-xs text-muted-foreground">Chrome on Windows</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-700">Active</Badge>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Notification Preferences</h2>

                  <div className="space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
                      { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive alerts via SMS' },
                      { key: 'appointmentReminders', label: 'Appointment Reminders', description: 'Get reminders for scheduled appointments' },
                      { key: 'emergencyAlerts', label: 'Emergency Alerts', description: 'Receive critical system alerts' },
                      { key: 'stockAlerts', label: 'Stock Alerts', description: 'Get notified of low medication stock' },
                      { key: 'diseaseOutbreaks', label: 'Disease Outbreaks', description: 'Alerts about disease outbreaks in your area' },
                    ].map(({ key, label, description }) => (
                      <div key={key} className="flex items-start justify-between p-3 border border-border rounded hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">{label}</p>
                          <p className="text-xs text-muted-foreground">{description}</p>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[key as keyof typeof notifications]}
                            onChange={(e) =>
                              setNotifications({ ...notifications, [key]: e.target.checked })
                            }
                            className="h-4 w-4"
                          />
                        </label>
                      </div>
                    ))}

                    <div className="pt-4 flex gap-2">
                      <Button onClick={handleSaveNotifications} disabled={isSaving} className="gap-2">
                        {saveSuccess ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                        {saveSuccess ? 'Saved!' : isSaving ? 'Saving...' : 'Save Preferences'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Display & Language</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Theme</label>
                      <select
                        value={preferences.theme}
                        onChange={(e) => setPreferences({ ...preferences, theme: e.target.value as 'light' | 'dark' })}
                        className="mt-1 w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Language</label>
                      <select
                        value={preferences.language}
                        onChange={(e) => setPreferences({ ...preferences, language: e.target.value as 'en' | 'fr' | 'rw' })}
                        className="mt-1 w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      >
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                        <option value="rw">Kinyarwanda</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Time Zone</label>
                      <Input
                        value={preferences.timeZone}
                        onChange={(e) => setPreferences({ ...preferences, timeZone: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    {user.role === 'doctor' && (
                      <div>
                        <label className="text-sm font-medium text-foreground">Working Hours</label>
                        <Input
                          value={preferences.workingHours}
                          onChange={(e) => setPreferences({ ...preferences, workingHours: e.target.value })}
                          className="mt-1"
                          placeholder="9:00 AM - 5:00 PM"
                        />
                      </div>
                    )}

                    <div className="pt-4 flex gap-2">
                      <Button onClick={handleSavePreferences} disabled={isSaving} className="gap-2">
                        {saveSuccess ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                        {saveSuccess ? 'Saved!' : isSaving ? 'Saving...' : 'Save Preferences'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Logout Section */}
            <Card className="p-6 border-destructive/50 bg-destructive/5">
              <h2 className="text-lg font-semibold text-destructive mb-2">Danger Zone</h2>
              <p className="text-sm text-muted-foreground mb-4">Sign out or delete your account</p>
              <div className="flex gap-2">
                <Button
                  onClick={logout}
                  variant="destructive"
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
