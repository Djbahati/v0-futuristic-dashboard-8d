'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

export default function RootPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }
  }, [loading, user, router])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <div className="animate-pulse">
          <div className="h-8 w-8 bg-primary rounded-full"></div>
        </div>
        <p className="text-sm text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  )
}
