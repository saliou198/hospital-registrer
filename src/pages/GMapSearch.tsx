import { useState } from 'react'
import { Search, ExternalLink, MapPin, Hospital, Stethoscope, Pill, FlaskConical } from 'lucide-react'

export function GMapSearch() {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (!query.trim()) return
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query.trim())}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  const suggestions = [
    { label: 'Hôpital Principal Dakar', icon: Hospital },
    { label: 'Clinique de la Madeleine', icon: Stethoscope },
    { label: 'Pharmacie du Plateau', icon: Pill },
    { label: 'Laboratoire Biopole', icon: FlaskConical },
    { label: 'Cabinet médical Liberté', icon: Stethoscope },
  ]

  return (
    <div className="max-w-3xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Recherche Google Maps</h1>
        <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">
          Trouvez des établissements de santé directement sur Google Maps.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Hôpital, clinique, pharmacie..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-transparent py-2.5 pl-10 pr-3 text-sm text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] outline-none transition-colors focus:border-emerald-500"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={!query.trim()}
            className="flex items-center gap-2 rounded-lg bg-[var(--color-text)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] hover:opacity-90 transition-opacity disabled:opacity-30"
          >
            <ExternalLink size={15} />
            Ouvrir dans Maps
          </button>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">Suggestions</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {suggestions.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.label}
                onClick={() => {
                  setQuery(s.label)
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.label)}`,
                    '_blank',
                    'noopener,noreferrer',
                  )
                }}
                className="group flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left transition-all hover:border-emerald-500/30 hover:shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)] group-hover:border-emerald-500/30 group-hover:text-emerald-500 transition-colors">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">{s.label}</p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">Ouvrir dans Google Maps →</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
