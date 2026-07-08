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

export function EstablishmentFilters(props: EstablishmentFiltersProps) {
  const { statusFilter, typeFilter, regionFilter, onStatusChange, onTypeChange, onRegionChange, onClear } = props
  const hasFilters = !!statusFilter || !!typeFilter || !!regionFilter

  const selectClass = "rounded-lg border border-[var(--color-border)] bg-transparent px-3 py-1.5 text-xs text-[var(--color-text-secondary)] outline-none transition-colors focus:border-emerald-500 appearance-none cursor-pointer hover:bg-[var(--color-bg-secondary)]"

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select value={typeFilter} onChange={(e) => onTypeChange(e.target.value as EstablishmentType | '')} className={selectClass}>
        <option value="">Type</option>
        {ESTABLISHMENT_TYPES.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>
      <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value as ProgressionStatus | '')} className={selectClass}>
        <option value="">Statut</option>
        {PROGRESSION_STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      <select value={regionFilter} onChange={(e) => onRegionChange(e.target.value)} className={selectClass}>
        <option value="">Région</option>
        {REGIONS.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      {hasFilters && (
        <button onClick={onClear} className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] transition-colors">
          Effacer
        </button>
      )}
    </div>
  )
}
