import { Menu, Moon, Sun, Building2 } from 'lucide-react'

interface NavbarProps {
  onMenuToggle: () => void
  theme: 'light' | 'dark'
  onThemeToggle: () => void
}

export function Navbar({ onMenuToggle, theme, onThemeToggle }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-gray-200 bg-white/80 px-4 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
      <button
        onClick={onMenuToggle}
        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
      >
        <Menu size={20} />
      </button>
      <div className="flex items-center gap-2 lg:hidden">
        <Building2 className="text-blue-600" size={20} />
        <span className="text-base font-bold text-gray-900 dark:text-white">HealthTrack</span>
      </div>
      <div className="flex-1" />
      <button
        onClick={onThemeToggle}
        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  )
}
