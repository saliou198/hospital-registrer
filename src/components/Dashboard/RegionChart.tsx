import type { Establishment } from '@/types'

interface RegionChartProps {
  establishments: Establishment[]
}

export function RegionChart({ establishments }: RegionChartProps) {
  const regions = establishments.reduce<Record<string, number>>((acc, e) => {
    acc[e.region] = (acc[e.region] || 0) + 1
    return acc
  }, {})

  const sorted = Object.entries(regions).sort((a, b) => b[1] - a[1])
  const max = sorted[0]?.[1] || 1

  if (sorted.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-xs text-[var(--color-text-tertiary)]">
        Aucune donnée
      </div>
    )
  }

  return (
    <div className="space-y-2.5">
      {sorted.map(([region, count]) => (
        <div key={region} className="group flex items-center gap-3">
          <span className="w-28 text-xs text-[var(--color-text-secondary)] truncate">{region}</span>
          <div className="flex-1 h-2 rounded-full bg-[var(--color-bg-secondary)] overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500/60 transition-all duration-700 ease-out group-hover:bg-emerald-500"
              style={{ width: `${(count / max) * 100}%` }}
            />
          </div>
          <span className="w-6 text-right text-xs font-medium text-[var(--color-text-tertiary)]">{count}</span>
        </div>
      ))}
    </div>
  )
}
