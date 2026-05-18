'use client'

import { useChat } from 'ai/react'
import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Send, Loader2, Lightbulb, BarChart3 } from 'lucide-react'

export default function HealthAssistantPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai-assistant',
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m INEZA AI Health Assistant. I can help you with:\n\n• Disease prediction and diagnosis support\n• Treatment recommendations\n• Medication information\n• Patient symptom analysis\n• Health statistics and trends\n• Outbreak predictions\n\nHow can I assist you today?'
      }
    ]
  })

  const suggestions = [
    { icon: Lightbulb, text: 'What are common symptoms of malaria?' },
    { icon: Lightbulb, text: 'How can we prevent disease outbreaks?' },
    { icon: BarChart3, text: 'Show me recent health trends' },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Health Assistant AI" />
        <div className="flex-1 overflow-hidden p-4">
          <div className="max-w-4xl mx-auto h-full flex flex-col gap-4">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 pb-4">
              {messages.length === 1 ? (
                <div className="space-y-4">
                  <Card className="p-6">
                    <div className="prose prose-sm text-foreground max-w-none">
                      <p className="text-base font-semibold mb-4">Welcome to INEZA AI Health Assistant</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        This AI-powered assistant helps healthcare professionals make informed decisions using Rwanda&apos;s health data.
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Try asking about:</p>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                          <li>• Disease symptoms and diagnosis</li>
                          <li>• Treatment protocols</li>
                          <li>• Medication interactions</li>
                          <li>• Disease outbreak predictions</li>
                          <li>• Health statistics</li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {suggestions.map((suggestion, idx) => {
                      const Icon = suggestion.icon
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            const event = new Event('submit', { bubbles: true })
                            const form = document.querySelector('form')
                            const input = form?.querySelector('input')
                            if (input) {
                              input.value = suggestion.text
                              handleInputChange({ target: { value: suggestion.text } } as any)
                              setTimeout(() => form?.dispatchEvent(event), 0)
                            }
                          }}
                          className="text-left p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                        >
                          <div className="flex items-start gap-2">
                            <Icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-foreground font-medium">{suggestion.text}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <Card className={`max-w-xl p-4 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </Card>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <Card className="bg-muted p-4">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                  </Card>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me about diseases, treatments, or health statistics..."
                className="flex-1 bg-card"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading} className="gap-2">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {isLoading ? 'Thinking' : 'Send'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
