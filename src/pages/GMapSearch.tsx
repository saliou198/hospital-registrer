import { useState } from 'react'
import { Search, ExternalLink, MapPin } from 'lucide-react'

export function GMapSearch() {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (!query.trim()) return
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query.trim())}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  const suggestions = [
    'Hôpital Principal Dakar',
    'Clinique de la Madeleine',
    'Pharmacie du Plateau',
    'Cabinet médical Liberté',
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recherche Google Maps</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Recherchez un établissement de santé et ouvrez-le directement dans Google Maps.
      </p>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Hôpital, clinique, pharmacie..."
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={!query.trim()}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ExternalLink size={18} />
          Ouvrir dans Google Maps
        </button>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Suggestions</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => {
                setQuery(s)
                const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s)}`
                window.open(url, '_blank', 'noopener,noreferrer')
              }}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <MapPin size={16} className="text-blue-500" />
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
