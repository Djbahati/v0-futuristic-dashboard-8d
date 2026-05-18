'use client'

import { useEffect, useState } from 'react'
import { Language, getLanguageName } from '@/lib/i18n'
import { Globe } from 'lucide-react'

export function LanguageSelector() {
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('language') as Language | null
    if (saved) setLanguage(saved)
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
    window.location.reload()
  }

  if (!mounted) return null

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value as Language)}
        className="px-2 py-1 bg-card border border-input rounded text-sm text-foreground"
      >
        {(['en', 'fr', 'rw'] as const).map(lang => (
          <option key={lang} value={lang}>
            {getLanguageName(lang)}
          </option>
        ))}
      </select>
    </div>
  )
}
