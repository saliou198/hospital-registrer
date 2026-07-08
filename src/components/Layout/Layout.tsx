import { useState, type ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

interface LayoutProps {
  theme: 'light' | 'dark'
  onThemeToggle: () => void
  total?: number
  children: ReactNode
}

export function Layout({ theme, onThemeToggle, total, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col">
        <Navbar
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
          theme={theme}
          onThemeToggle={onThemeToggle}
          total={total}
        />
        <main className="flex-1 p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  )
}
