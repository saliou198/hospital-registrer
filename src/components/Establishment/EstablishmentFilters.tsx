import type { EstablishmentType, ProgressionStatus } from '@/types'
import { PROGRESSION_STATUSES, ESTABLISHMENT_TYPES, REGIONS } from '@/types'

interface EstablishmentFiltersProps {
  statusFilter: ProgressionStatus | ''
  typeFilter: EstablishmentType | ''
  regionFilter: string
  onStatusChange: (v: ProgressionStatus | '') => void
  onTypeChange: (v: EstablishmentType | '') => void
  onRegionChange: (v: string) => void
  onClear: () => void
}

export function EstablishmentFilters({
  statusFilter,
  typeFilter,
  regionFilter,
  onStatusChange,
  onTypeChange,
  onRegionChange,
  onClear,
}: EstablishmentFiltersProps) {
  const hasFilters = statusFilter || typeFilter || regionFilter

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={typeFilter}
        onChange={(e) => onTypeChange(e.target.value as EstablishmentType | '')}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
      >
        <option value="">Tous les types</option>
        {ESTABLISHMENT_TYPES.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value as ProgressionStatus | '')}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
      >
        <option value="">Tous les statuts</option>
        {PROGRESSION_STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      <select
        value={regionFilter}
        onChange={(e) => onRegionChange(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
      >
        <option value="">Toutes les régions</option>
        {REGIONS.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      {hasFilters && (
        <button
          onClick={onClear}
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Effacer les filtres
        </button>
      )}
    </div>
  )
}
