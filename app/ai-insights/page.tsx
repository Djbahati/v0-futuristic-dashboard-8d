'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { useAuth } from '@/contexts/auth-context'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { buildAISystemPrompt, enrichPromptWithContext, getHealthcareContext } from '@/lib/ai-context'
import { outbreakAlerts, diseaseTrendData, commonDiseases } from '@/lib/healthcare-kb'
import { Send, Loader, Lightbulb, AlertTriangle, TrendingUp, Pill } from 'lucide-react'

export default function AIInsightsPage() {
  const { user } = useAuth()
  const [selectedInsight, setSelectedInsight] = useState<'diseases' | 'outbreaks' | 'pharmacy' | 'trends'>('diseases')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const systemPrompt = buildAISystemPrompt({
    userRole: user?.role,
    district: user?.district,
    specialization: user?.specialization,
  })

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai-assistant',
    system: systemPrompt,
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Welcome to INEZA AI Insights! I'm here to provide comprehensive healthcare intelligence for Rwanda. I can help with:\n\n📊 Disease Surveillance - Real-time disease tracking and trends\n🚨 Outbreak Detection - Alert and response guidance\n💊 Pharmacy Management - Stock predictions and recommendations\n📈 Health Analytics - Population health insights\n\nWhat would you like to explore today?`,
      },
    ],
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      const enrichedInput = enrichPromptWithContext(input, {
        userRole: user?.role,
        district: user?.district,
      })
      handleSubmit(e, { data: { input: enrichedInput } })
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="AI Healthcare Insights" />
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto h-full flex gap-6 p-6">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-card rounded-lg border border-border overflow-hidden">
              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-md px-4 py-3 rounded-lg text-sm whitespace-pre-wrap ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-muted text-foreground rounded-bl-none'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                        <Loader className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Generating insights...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t border-border p-4 bg-background">
                <form onSubmit={onSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about diseases, outbreaks, pharmacy needs..."
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar - Insights */}
            <div className="w-96 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {/* Insight Tabs */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'diseases', label: 'Diseases', icon: AlertTriangle },
                  { id: 'outbreaks', label: 'Outbreaks', icon: TrendingUp },
                  { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
                  { id: 'trends', label: 'Trends', icon: Lightbulb },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedInsight(id as any)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedInsight === id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Disease Insights */}
              {selectedInsight === 'diseases' && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Common Diseases in Rwanda</h3>
                  {commonDiseases.slice(0, 5).map(disease => (
                    <Card key={disease.id} className="p-4 cursor-pointer hover:border-primary/50 transition-colors">
                      <p className="font-medium text-sm text-foreground">{disease.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {disease.endemic ? '🔴 Endemic' : '🟡 Monitored'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{disease.prevention[0]}</p>
                    </Card>
                  ))}
                </div>
              )}

              {/* Outbreak Alerts */}
              {selectedInsight === 'outbreaks' && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    Active Alerts
                  </h3>
                  {outbreakAlerts.map(alert => (
                    <Card key={alert.id} className="p-4 border-orange-500/30 bg-orange-500/5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-sm text-foreground">{alert.disease}</p>
                          <p className="text-xs text-muted-foreground">{alert.district}</p>
                        </div>
                        <Badge variant="destructive" className="text-xs">{alert.cases} cases</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{alert.alert}</p>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pharmacy Recommendations */}
              {selectedInsight === 'pharmacy' && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Pill className="h-4 w-4 text-primary" />
                    Stock Alerts
                  </h3>
                  <Card className="p-4 bg-red-500/5 border-red-500/30">
                    <p className="text-sm font-medium text-foreground">Low Stock Alert</p>
                    <p className="text-xs text-muted-foreground mt-1">Rifampicin, Ceftriaxone</p>
                    <Button size="sm" variant="outline" className="mt-3 w-full text-xs">
                      View Pharmacy
                    </Button>
                  </Card>
                </div>
              )}

              {/* Trends */}
              {selectedInsight === 'trends' && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Disease Trends</h3>
                  {Object.entries(diseaseTrendData).map(([disease, data]) => (
                    <Card key={disease} className="p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium capitalize text-foreground">{disease}</p>
                        <Badge variant={data.trend === 'up' ? 'destructive' : 'secondary'} className="text-xs">
                          {data.cases} {data.trend}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{data.forecast}</p>
                    </Card>
                  ))}
                </div>
              )}

              {/* Healthcare Context */}
              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="text-xs font-semibold text-foreground mb-2">System Status</p>
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono max-h-40 overflow-hidden">
                  {getHealthcareContext({
                    userRole: user?.role,
                    district: user?.district,
                  })}
                </pre>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
