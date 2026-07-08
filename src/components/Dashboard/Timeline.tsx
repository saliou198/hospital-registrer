import type { Establishment } from '@/types'
import { PROGRESSION_STATUSES } from '@/types'
import { MapPin } from 'lucide-react'
import { getGoogleMapsUrl } from '@/utils'

interface TimelineProps {
  establishments: Establishment[]
}

export function Timeline({ establishments }: TimelineProps) {
  const sorted = [...establishments]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6)

  if (sorted.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-xs text-[var(--color-text-tertiary)]">
        Aucune activité récente
      </div>
    )
  }

  return (
    <div className="space-y-0">
      {sorted.map((est, i) => {
        const sc = PROGRESSION_STATUSES.find((s) => s.value === est.status)
        const date = new Date(est.updatedAt)
        const formatted = date.toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'short',
        })

        return (
          <div key={est.id} className="group relative flex gap-4 pb-5 last:pb-0">
            {i < sorted.length - 1 && (
              <div className="absolute left-[7px] top-4 h-full w-px bg-[var(--color-border)]" />
            )}
            <div className={`relative mt-1.5 h-3 w-3 flex-shrink-0 rounded-full ${sc?.dot || 'bg-gray-300'}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--color-text)] truncate">{est.name}</span>
                {sc && (
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${sc.color}`}>
                    {sc.label}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-[var(--color-text-tertiary)]">
                {est.city} · {formatted}
              </p>
              <a
                href={getGoogleMapsUrl(est)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MapPin size={10} />
                Voir sur Maps
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}
