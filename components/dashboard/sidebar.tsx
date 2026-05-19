'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { UserRole } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
  Users,
  Calendar,
  Pill,
  BarChart3,
  MessageSquare,
  Settings,
  Stethoscope,
  Home,
  Activity,
  AlertCircle,
  Building2,
  MapPin,
  Brain,
  Bell,
  Zap,
} from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: typeof Home
  roles: UserRole[]
}

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: Home,
    roles: [UserRole.Doctor, UserRole.Nurse, UserRole.Pharmacist, UserRole.Admin, UserRole.Ministry],
  },
  {
    href: '/patients',
    label: 'Patients',
    icon: Users,
    roles: [UserRole.Doctor, UserRole.Nurse, UserRole.Admin],
  },
  {
    href: '/appointments',
    label: 'Appointments',
    icon: Calendar,
    roles: [UserRole.Doctor, UserRole.Nurse, UserRole.Admin],
  },
  {
    href: '/pharmacy',
    label: 'Pharmacy',
    icon: Pill,
    roles: [UserRole.Pharmacist, UserRole.Admin],
  },
  {
    href: '/diseases',
    label: 'Disease Tracking',
    icon: AlertCircle,
    roles: [UserRole.Doctor, UserRole.Nurse, UserRole.Admin, UserRole.Ministry],
  },
  {
    href: '/analytics',
    label: 'Analytics',
    icon: BarChart3,
    roles: [UserRole.Admin, UserRole.Ministry],
  },
  {
    href: '/consultations',
    label: 'Consultations',
    icon: MessageSquare,
    roles: [UserRole.Doctor, UserRole.Nurse, UserRole.Admin],
  },
  {
    href: '/facilities',
    label: 'Facilities',
    icon: Building2,
    roles: [UserRole.Admin, UserRole.Ministry],
  },
  {
    href: '/doctors-location',
    label: 'Doctor Map',
    icon: MapPin,
    roles: [UserRole.Doctor, UserRole.Admin, UserRole.Ministry],
  },
  {
    href: '/health-assistant',
    label: 'Health Assistant',
    icon: Brain,
    roles: [UserRole.Doctor, UserRole.Nurse, UserRole.Admin, UserRole.Ministry],
  },
  {
    href: '/ai-insights',
    label: 'AI Insights',
    icon: Zap,
    roles: [UserRole.Doctor, UserRole.Nurse, UserRole.Pharmacist, UserRole.Admin, UserRole.Ministry],
  },
  {
    href: '/notifications',
    label: 'Notifications',
    icon: Bell,
    roles: [UserRole.Doctor, UserRole.Nurse, UserRole.Pharmacist, UserRole.Admin, UserRole.Ministry],
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
    roles: [UserRole.Admin],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  if (!user) {
    return null
  }

  const visibleItems = navItems.filter((item) => item.roles.includes(user.role))

  return (
    <aside className="hidden md:fixed md:inset-y-0 md:z-30 md:flex md:w-56 md:flex-col border-r border-border bg-background">
      <nav className="flex-1 space-y-2 px-4 py-6">
        {visibleItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Facility info */}
      {user.facility && (
        <div className="border-t border-border px-4 py-4">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs font-medium text-muted-foreground">Current Facility</p>
            <p className="text-sm font-medium text-foreground mt-1">{user.facility}</p>
          </div>
        </div>
      )}
    </aside>
  )
}
