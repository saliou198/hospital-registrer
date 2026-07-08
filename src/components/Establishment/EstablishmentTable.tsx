import { useState } from 'react'
import type { Establishment, SortField, SortDirection } from '@/types'
import { PROGRESSION_STATUSES } from '@/types'
import { getTypeLabel, getGoogleMapsUrl } from '@/utils'
import { MapPin, Pencil, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

interface EstablishmentTableProps {
  establishments: Establishment[]
  onEdit: (est: Establishment) => void
  onDelete: (id: string) => void
}

const TYPE_ICONS: Record<string, string> = {
  hospital: 'H',
  clinic: 'C',
  cabinet: 'M',
  pharmacy: 'P',
  laboratory: 'L',
  other: '?',
}

export function EstablishmentTable({ establishments, onEdit, onDelete }: EstablishmentTableProps) {
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDir, setSortDir] = useState<SortDirection>('asc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const sorted = [...establishments].sort((a, b) => {
    const aVal = String(a[sortField] ?? '')
    const bVal = String(b[sortField] ?? '')
    return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
  })

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={12} className="opacity-30" />
    return sortDir === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50">
            {[
              { field: 'name' as SortField, label: 'Établissement' },
              { field: 'type' as SortField, label: 'Type' },
              { field: 'region' as SortField, label: 'Région' },
              { field: 'city' as SortField, label: 'Ville' },
              { label: 'Contact' },
              { field: 'status' as SortField, label: 'Statut' },
              { label: 'Commentaires' },
              { label: '' },
            ].map((col) => (
              <th
                key={col.label}
                className={`sticky top-0 z-10 whitespace-nowrap px-4 py-3 text-xs font-medium uppercase tracking-wider text-[var(--color-text-tertiary)] bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm ${col.field ? 'cursor-pointer select-none hover:text-[var(--color-text-secondary)]' : ''}`}
                onClick={() => col.field && handleSort(col.field)}
              >
                <div className="flex items-center gap-1">
                  {col.field && <SortIcon field={col.field} />}
                  {col.label}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">
          {sorted.map((est) => {
            const sc = PROGRESSION_STATUSES.find((s) => s.value === est.status)
            return (
              <tr
                key={est.id}
                className="group bg-[var(--color-surface)] transition-all duration-150 hover:bg-[var(--color-bg-secondary)]/30"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-xs font-bold text-[var(--color-text-tertiary)]">
                      {TYPE_ICONS[est.type] || '?'}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text)]">{est.name}</p>
                      <p className="text-xs text-[var(--color-text-tertiary)]">{est.address}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-xs text-[var(--color-text-secondary)]">{getTypeLabel(est.type)}</td>
                <td className="px-4 py-3.5 text-xs text-[var(--color-text-secondary)]">{est.region}</td>
                <td className="px-4 py-3.5 text-xs text-[var(--color-text-secondary)]">{est.city}</td>
                <td className="px-4 py-3.5">
                  <div className="text-xs text-[var(--color-text)]">{est.phone}</div>
                  <div className="text-xs text-[var(--color-text-tertiary)]">{est.contactPerson}</div>
                </td>
                <td className="px-4 py-3.5">
                  {sc && (
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${sc.color}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                      {sc.label}
                    </span>
                  )}
                </td>
                <td className="max-w-[160px] truncate px-4 py-3.5 text-xs text-[var(--color-text-tertiary)]" title={est.comments}>
                  {est.comments || '—'}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <a
                      href={getGoogleMapsUrl(est)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--color-text-tertiary)] hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      <MapPin size={13} />
                    </a>
                    <button
                      onClick={() => onEdit(est)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)] transition-colors"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => onDelete(est.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--color-text-tertiary)] hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
