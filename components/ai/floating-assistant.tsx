'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { MessageCircle, X, Send, Loader, Mic, Volume2 } from 'lucide-react'
import { buildAISystemPrompt, enrichPromptWithContext } from '@/lib/ai-context'

export function FloatingAssistant() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [useVoice, setUseVoice] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const systemPrompt = buildAISystemPrompt({
    userRole: user?.role,
    district: user?.district,
    specialization: user?.specialization,
  })

  const { messages, input = '', handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai-assistant',
    system: systemPrompt,
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hello ${user?.firstName || 'there'}! I'm INEZA AI, your healthcare assistant. How can I help you today? I can assist with disease information, treatment recommendations, medication queries, or public health guidance specific to Rwanda.`,
      },
    ],
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice input not supported in your browser')
      return
    }

    const recognition = new (window as any).webkitSpeechRecognition()
    recognition.lang = 'en-US'
    recognition.start()

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      // Trigger form submission with voice input
      const form = new FormData()
      form.append('input', transcript)
    }
  }

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

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground p-4 shadow-lg transition-all hover:scale-110 flex items-center gap-2"
        aria-label="Open health assistant"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="hidden sm:inline text-sm font-medium">INEZA AI</span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] flex flex-col h-[600px] rounded-lg overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4">
      {/* Header - Glassmorphism */}
      <div className="bg-gradient-to-r from-primary/90 to-primary/70 backdrop-blur-md border border-primary/30 px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white">INEZA AI Assistant</h3>
          <p className="text-xs text-primary-foreground/80">Rwanda Healthcare</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-primary-foreground/20 rounded-full transition-colors"
          aria-label="Close assistant"
        >
          <X className="h-5 w-5 text-primary-foreground" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-background/50 backdrop-blur-sm space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
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
            <div className="bg-muted text-foreground px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-card border-t border-border p-4 space-y-2">
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about diseases, treatments..."
            className="text-sm"
            disabled={isLoading}
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleVoiceInput}
            disabled={isLoading}
            className="px-2"
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={isLoading || !input || !input.trim()}
            className="px-2"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground">Powered by INEZA AI • Rwanda Healthcare</p>
      </div>
    </div>
  )
}
