import { NavLink } from 'react-router-dom'
import { Building2, LayoutDashboard, Search, X } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Tableau de bord' },
  { to: '/etablissements', icon: Building2, label: 'Établissements' },
  { to: '/recherche', icon: Search, label: 'Recherche Maps' },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-[var(--color-border)] px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-text)]">
              <Building2 size={14} className="text-[var(--color-bg)]" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-[var(--color-text)]">HealthTrack</span>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-secondary)] lg:hidden">
            <X size={15} />
          </button>
        </div>
        <nav className="flex-1 space-y-0.5 p-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-[var(--color-text)]'
                    : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-emerald-500" />
                  )}
                  <link.icon size={15} className={isActive ? 'text-emerald-500' : ''} />
                  {link.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-[var(--color-border)] p-4">
          <p className="text-xs text-[var(--color-text-tertiary)]">HealthTrack v1.0</p>
        </div>
      </aside>
    </>
  )
}
