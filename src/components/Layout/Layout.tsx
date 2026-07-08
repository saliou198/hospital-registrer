import { useState, type ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

interface LayoutProps {
  theme: 'light' | 'dark'
  onThemeToggle: () => void
  children: ReactNode
}

export function Layout({ theme, onThemeToggle, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
          theme={theme}
          onThemeToggle={onThemeToggle}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
