'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Activity } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-50 dark:from-slate-950 dark:to-background flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg"></div>
              <Activity className="h-12 w-12 text-primary relative" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">INEZA AI</h1>
          <p className="text-muted-foreground text-sm">Rwanda Healthcare Management System</p>
        </div>

        {/* Login card */}
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to access your healthcare dashboard</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error message */}
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Email input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="border-input"
                />
              </div>

              {/* Password input */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="border-input"
                />
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">Demo Credentials:</p>
              <div className="space-y-2 bg-muted/30 rounded-lg p-3">
                <div className="text-xs">
                  <p className="font-medium text-foreground">Doctor:</p>
                  <p className="text-muted-foreground">doctor@ineza.rw / password123</p>
                </div>
                <div className="text-xs">
                  <p className="font-medium text-foreground">Nurse:</p>
                  <p className="text-muted-foreground">nurse@ineza.rw / password123</p>
                </div>
                <div className="text-xs">
                  <p className="font-medium text-foreground">Pharmacist:</p>
                  <p className="text-muted-foreground">pharmacist@ineza.rw / password123</p>
                </div>
              </div>
            </div>

            {/* Register link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">New to INEZA AI? </span>
              <Link href="/register" className="text-primary font-medium hover:underline">
                Register here
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Secure Healthcare Management Platform for Rwanda</p>
          <p>© 2026 INEZA AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
