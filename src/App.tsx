import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import type { Establishment } from '@/types'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useTheme } from '@/hooks/useTheme'
import { Layout } from '@/components/Layout/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { EstablishmentList } from '@/pages/EstablishmentList'
import { GMapSearch } from '@/pages/GMapSearch'

function AppRoutes({
  establishments,
  onSave,
  onDelete,
}: {
  establishments: Establishment[]
  onSave: (data: Establishment) => void
  onDelete: (id: string) => void
}) {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard establishments={establishments} onNavigate={() => navigate('/etablissements')} />}
      />
      <Route
        path="/etablissements"
        element={<EstablishmentList establishments={establishments} onSave={onSave} onDelete={onDelete} />}
      />
      <Route path="/recherche" element={<GMapSearch />} />
    </Routes>
  )
}

export default function App() {
  const [establishments, setEstablishments, isLoaded] = useLocalStorage<Establishment[]>('establishments', [])
  const { theme, toggleTheme } = useTheme()

  const handleSave = (data: Establishment) => {
    setEstablishments((prev) => {
      const idx = prev.findIndex((e) => e.id === data.id)
      if (idx >= 0) {
        const updated = [...prev]
        updated[idx] = data
        return updated
      }
      return [...prev, data]
    })
  }

  const handleDelete = (id: string) => {
    setEstablishments((prev) => prev.filter((e) => e.id !== id))
  }

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-text)] border-t-transparent" />
          <span className="text-xs text-[var(--color-text-tertiary)]">Chargement...</span>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Layout theme={theme} onThemeToggle={toggleTheme} total={establishments.length}>
        <AppRoutes establishments={establishments} onSave={handleSave} onDelete={handleDelete} />
      </Layout>
    </BrowserRouter>
  )
}
