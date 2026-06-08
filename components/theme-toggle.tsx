'use client'

import { useTheme } from '@/contexts/theme-context'
import { Button } from '@/components/ui/button'
import { Sun, Moon, Laptop2 } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-1">
      <Button
        variant={theme === 'light' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setTheme('light')}
        aria-label="Light theme"
        title="Light theme"
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setTheme('dark')}
        aria-label="Dark theme"
        title="Dark theme"
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === 'system' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setTheme('system')}
        aria-label="System theme"
        title="System theme"
      >
        <Laptop2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
