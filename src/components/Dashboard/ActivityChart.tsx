import type { Establishment } from '@/types'

interface ActivityChartProps {
  establishments: Establishment[]
}

export function ActivityChart({ establishments }: ActivityChartProps) {
  const weeks: { label: string; count: number; formed: number }[] = []

  if (establishments.length > 0) {
    const now = new Date()
    for (let i = 6; i >= 0; i--) {
      const weekStart = new Date(now)
      weekStart.setDate(now.getDate() - now.getDay() - i * 7)
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 7)

      const count = establishments.filter((e) => {
        const d = new Date(e.createdAt)
        return d >= weekStart && d < weekEnd
      }).length
      const formed = establishments.filter((e) => {
        const d = new Date(e.updatedAt)
        return e.status === 'plateforme_activée' && d >= weekStart && d < weekEnd
      }).length

      weeks.push({
        label: weekStart.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }),
        count,
        formed,
      })
    }
  }

  const max = Math.max(1, ...weeks.map((w) => Math.max(w.count, w.formed)))

  if (weeks.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]">
        Aucune activité
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-3" style={{ height: 120 }}>
        {weeks.map((w, i) => {
          const h1 = (w.count / max) * 100
          const h2 = (w.formed / max) * 100
          return (
            <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
              <div
                className="w-full rounded-t-sm bg-emerald-500/60 transition-all duration-500"
                style={{ height: `${h2}%`, animationDelay: `${i * 50}ms` }}
              />
              <div
                className="w-full rounded-t-sm bg-[var(--color-text-tertiary)]/30 transition-all duration-500"
                style={{ height: `${h1}%`, animationDelay: `${i * 50 + 100}ms` }}
              />
            </div>
          )
        })}
      </div>
      <div className="flex justify-between">
        {weeks.map((w, i) => (
          <span key={i} className="text-[10px] text-[var(--color-text-tertiary)]">{w.label}</span>
        ))}
      </div>
      <div className="flex items-center gap-4 text-xs text-[var(--color-text-tertiary)]">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500/60" /> Activations
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--color-text-tertiary)]/30" /> Ajouts
        </span>
      </div>
    </div>
  )
}
