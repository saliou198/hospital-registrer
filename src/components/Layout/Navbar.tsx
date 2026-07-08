import { Menu, Moon, Sun } from 'lucide-react'

interface NavbarProps {
  onMenuToggle: () => void
  theme: 'light' | 'dark'
  onThemeToggle: () => void
  total?: number
}

export function Navbar({ onMenuToggle, theme, onThemeToggle, total }: NavbarProps) {
  return (
    <header className="flex h-14 items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6">
      <button
        onClick={onMenuToggle}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-secondary)] lg:hidden"
      >
        <Menu size={15} />
      </button>
      {total !== undefined && (
        <span className="text-xs text-[var(--color-text-tertiary)]">
          {total} établissement{total !== 1 ? 's' : ''}
        </span>
      )}
      <div className="flex-1" />
      <button
        onClick={onThemeToggle}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
        title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
      >
        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
      </button>
    </header>
  )
}
