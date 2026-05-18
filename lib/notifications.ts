export type NotificationType = 'alert' | 'info' | 'success' | 'warning' | 'critical'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  category: 'emergency' | 'appointment' | 'stock' | 'outbreak' | 'general'
}

const notificationSound = () => {
  const context = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = context.createOscillator()
  const gain = context.createGain()
  
  oscillator.connect(gain)
  gain.connect(context.destination)
  
  oscillator.frequency.value = 800
  oscillator.type = 'sine'
  gain.gain.setValueAtTime(0.3, context.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5)
  
  oscillator.start(context.currentTime)
  oscillator.stop(context.currentTime + 0.5)
}

export const NotificationService = {
  // Send SMS notification (mock)
  async sendSMS(phone: string, message: string) {
    console.log(`[SMS] To: ${phone}, Message: ${message}`)
    return { success: true, id: `sms_${Date.now()}` }
  },

  // Send email notification (mock)
  async sendEmail(email: string, subject: string, message: string) {
    console.log(`[EMAIL] To: ${email}, Subject: ${subject}`)
    return { success: true, id: `email_${Date.now()}` }
  },

  // Send in-app notification
  async sendInAppNotification(notification: Notification) {
    console.log(`[IN-APP] ${notification.title}: ${notification.message}`)
    if (notification.type === 'critical') {
      notificationSound()
    }
    return { success: true, id: notification.id }
  },

  // Create emergency alert
  createEmergencyAlert(patientName: string, issue: string, facility: string) {
    return {
      id: `alert_${Date.now()}`,
      type: 'critical' as NotificationType,
      title: '🚨 EMERGENCY ALERT',
      message: `${patientName} - ${issue} at ${facility}`,
      timestamp: new Date(),
      read: false,
      category: 'emergency' as const,
    }
  },

  // Create appointment reminder
  createAppointmentReminder(patientName: string, doctorName: string, time: string) {
    return {
      id: `apt_${Date.now()}`,
      type: 'info' as NotificationType,
      title: 'Appointment Reminder',
      message: `${patientName}'s appointment with ${doctorName} at ${time}`,
      timestamp: new Date(),
      read: false,
      category: 'appointment' as const,
    }
  },

  // Create stock alert
  createStockAlert(medication: string, quantity: number, threshold: number) {
    return {
      id: `stock_${Date.now()}`,
      type: 'warning' as NotificationType,
      title: 'Low Stock Alert',
      message: `${medication}: ${quantity} units (threshold: ${threshold})`,
      timestamp: new Date(),
      read: false,
      category: 'stock' as const,
    }
  },

  // Create outbreak alert
  createOutbreakAlert(disease: string, cases: number, location: string) {
    return {
      id: `outbreak_${Date.now()}`,
      type: 'critical' as NotificationType,
      title: 'Disease Outbreak Alert',
      message: `${disease}: ${cases} cases reported in ${location}`,
      timestamp: new Date(),
      read: false,
      category: 'outbreak' as const,
    }
  },
}
