'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Notification } from '@/lib/notifications'
import { Trash2, CheckCircle, AlertTriangle, AlertCircle, Info, CheckCheck } from 'lucide-react'

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'critical',
    title: '🚨 EMERGENCY ALERT',
    message: 'John Doe - Severe symptoms at Kigali Central Hospital',
    timestamp: new Date(Date.now() - 5 * 60000),
    read: false,
    category: 'emergency',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Low Stock Alert',
    message: 'Paracetamol: 12 units (threshold: 50)',
    timestamp: new Date(Date.now() - 30 * 60000),
    read: false,
    category: 'stock',
  },
  {
    id: '3',
    type: 'critical',
    title: 'Disease Outbreak Alert',
    message: 'Malaria: 45 cases reported in Kigali district',
    timestamp: new Date(Date.now() - 2 * 3600000),
    read: true,
    category: 'outbreak',
  },
  {
    id: '4',
    type: 'info',
    title: 'Appointment Reminder',
    message: 'Jane Smith\'s appointment with Dr. Jean Ndabaguye at 2:00 PM',
    timestamp: new Date(Date.now() - 4 * 3600000),
    read: true,
    category: 'appointment',
  },
  {
    id: '5',
    type: 'success',
    title: 'Patient Discharged',
    message: 'Patient Peter Mwangi (ID: P123456) successfully discharged',
    timestamp: new Date(Date.now() - 1 * 86400000),
    read: true,
    category: 'general',
  },
]

const typeIcons = {
  critical: AlertTriangle,
  alert: AlertCircle,
  warning: AlertCircle,
  info: Info,
  success: CheckCircle,
}

const categoryColors = {
  emergency: 'bg-red-100 text-red-800',
  appointment: 'bg-blue-100 text-blue-800',
  stock: 'bg-yellow-100 text-yellow-800',
  outbreak: 'bg-purple-100 text-purple-800',
  general: 'bg-green-100 text-green-800',
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread' | 'emergency'>('all')

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read
    if (filter === 'emergency') return n.type === 'critical'
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Notifications" />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-muted-foreground mt-1">{unreadCount} unread notifications</p>
                )}
              </div>
              {unreadCount > 0 && (
                <Button onClick={handleMarkAllAsRead} variant="outline" className="gap-2">
                  <CheckCheck className="h-4 w-4" />
                  Mark all as read
                </Button>
              )}
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              {(['all', 'unread', 'emergency'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === f
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No notifications</p>
                </Card>
              ) : (
                filteredNotifications.map(notification => {
                  const IconComponent = typeIcons[notification.type]
                  return (
                    <Card
                      key={notification.id}
                      className={`p-4 ${!notification.read ? 'border-primary bg-primary/5' : ''}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${
                          notification.type === 'critical' ? 'bg-red-100' :
                          notification.type === 'warning' ? 'bg-yellow-100' :
                          notification.type === 'success' ? 'bg-green-100' :
                          'bg-blue-100'
                        }`}>
                          <IconComponent className={`h-5 w-5 ${
                            notification.type === 'critical' ? 'text-red-600' :
                            notification.type === 'warning' ? 'text-yellow-600' :
                            notification.type === 'success' ? 'text-green-600' :
                            'text-blue-600'
                          }`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{notification.title}</h3>
                            <Badge className={categoryColors[notification.category]}>
                              {notification.category}
                            </Badge>
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <div className="text-xs text-muted-foreground">
                            {notification.timestamp.toLocaleString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-primary"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(notification.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
