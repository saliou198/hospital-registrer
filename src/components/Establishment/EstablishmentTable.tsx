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
    if (sortField !== field) return <ArrowUpDown size={14} className="opacity-40" />
    return sortDir === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
  }

  const statusConfig = (status: Establishment['status']) =>
    PROGRESSION_STATUSES.find((s) => s.value === status)

  if (establishments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-500">
        <p className="text-lg font-medium">Aucun établissement trouvé</p>
        <p className="mt-1 text-sm">Ajoutez un établissement ou modifiez vos filtres.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
            {[
              { field: 'name' as SortField, label: 'Nom' },
              { field: 'type' as SortField, label: 'Type' },
              { field: 'region' as SortField, label: 'Région' },
              { field: 'city' as SortField, label: 'Ville' },
              { label: 'Adresse' },
              { label: 'Téléphone' },
              { label: 'Responsable' },
              { field: 'visitDate' as SortField, label: 'Visite' },
              { field: 'status' as SortField, label: 'Statut' },
              { label: 'Commentaires' },
              { label: 'Actions' },
            ].map((col) => (
              <th
                key={col.label}
                className={`whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${col.field ? 'cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200' : ''}`}
                onClick={() => col.field && handleSort(col.field)}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.field && <SortIcon field={col.field} />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {sorted.map((est) => {
            const sc = statusConfig(est.status)
            return (
              <tr key={est.id} className="bg-white transition-colors hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800/50">
                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {est.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">
                  {getTypeLabel(est.type)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">{est.region}</td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">{est.city}</td>
                <td className="max-w-[200px] truncate px-4 py-3 text-gray-600 dark:text-gray-400" title={est.address}>
                  {est.address}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">{est.phone}</td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">{est.contactPerson}</td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">{est.visitDate}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  {sc && (
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${sc.color}`}>
                      {sc.label}
                    </span>
                  )}
                </td>
                <td className="max-w-[200px] truncate px-4 py-3 text-gray-600 dark:text-gray-400" title={est.comments}>
                  {est.comments}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-1">
                    <a
                      href={getGoogleMapsUrl(est)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                      title="Voir sur Google Maps"
                    >
                      <MapPin size={16} />
                    </a>
                    <button
                      onClick={() => onEdit(est)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      title="Modifier"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(est.id)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
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
