import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Building2, Search, X } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Tableau de bord' },
  { to: '/etablissements', icon: Building2, label: 'Établissements' },
  { to: '/recherche', icon: Search, label: 'Recherche' },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-gray-200 bg-white transition-transform dark:border-gray-700 dark:bg-gray-900 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Building2 className="text-blue-600" size={22} />
            <span className="text-lg font-bold text-gray-900 dark:text-white">HealthTrack</span>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                }`
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-500">HealthTrack v1.0</p>
        </div>
      </aside>
    </>
  )
}
