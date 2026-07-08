import type { Establishment } from '@/types'
import { PROGRESSION_STATUSES } from '@/types'
import { ProgressRing } from '@/components/Dashboard/ProgressRing'
import { RegionChart } from '@/components/Dashboard/RegionChart'
import { ActivityChart } from '@/components/Dashboard/ActivityChart'
import { Timeline } from '@/components/Dashboard/Timeline'
import { Building2, CalendarClock, GraduationCap, XCircle } from 'lucide-react'

interface DashboardProps {
  establishments: Establishment[]
  onNavigate: () => void
}

export function Dashboard({ establishments, onNavigate }: DashboardProps) {
  const total = establishments.length
  const formed = establishments.filter((e) => e.status === 'plateforme_activée').length
  const progress = total ? Math.round((formed / total) * 100) : 0
  const planned = establishments.filter((e) => e.status === 'rendez_vous_planifie').length
  const refused = establishments.filter((e) => e.status === 'refus').length

  const statCards = [
    { icon: Building2, value: total, label: 'Total', change: '', color: 'text-[var(--color-text-secondary)]' },
    { icon: GraduationCap, value: formed, label: 'Activées', change: `${progress}%`, color: 'text-emerald-500' },
    { icon: CalendarClock, value: planned, label: 'Rendez-vous', change: '', color: 'text-amber-500' },
    { icon: XCircle, value: refused, label: 'Refus', change: '', color: 'text-red-400' },
  ]

  const statusBreakdown = PROGRESSION_STATUSES.map((s) => ({
    ...s,
    count: establishments.filter((e) => e.status === s.value).length,
  }))

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
          <Building2 size={24} className="text-[var(--color-text-tertiary)]" />
        </div>
        <h2 className="text-lg font-semibold text-[var(--color-text)]">Bienvenue sur HealthTrack</h2>
        <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">Commencez par ajouter votre premier établissement.</p>
        <button
          onClick={onNavigate}
          className="mt-6 flex items-center gap-2 rounded-lg bg-[var(--color-text)] px-4 py-2 text-sm font-medium text-[var(--color-bg)] hover:opacity-90 transition-opacity"
        >
          <Building2 size={16} />
          Ajouter un établissement
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Tableau de bord</h1>
        <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">
          {total} établissement{total !== 1 ? 's' : ''} · {formed} activé{formed !== 1 ? 's' : ''} · {progress}% de progression
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)]">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-[var(--color-surface)] p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-[var(--color-text-tertiary)]">{card.label}</p>
                <Icon size={14} className={card.color} />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-[var(--color-text)]">{card.value}</span>
                {card.change && (
                  <span className="text-xs font-medium text-emerald-500">{card.change}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)]">
        <div className="bg-[var(--color-surface)] p-5">
          <h3 className="text-sm font-semibold text-[var(--color-text)] mb-5">Progression</h3>
          <div className="flex justify-center">
            <ProgressRing progress={progress} value={`${formed}/${total}`} label="activés" color="#10b981" />
          </div>
        </div>

        <div className="bg-[var(--color-surface)] p-5">
          <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">Régions</h3>
          <RegionChart establishments={establishments} />
        </div>

        <div className="bg-[var(--color-surface)] p-5">
          <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">Activité</h3>
          <ActivityChart establishments={establishments} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)]">
        <div className="lg:col-span-2 bg-[var(--color-surface)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--color-text)]">Activité récente</h3>
            <button onClick={onNavigate} className="text-xs text-emerald-600 hover:text-emerald-500 transition-colors">
              Voir tout →
            </button>
          </div>
          <Timeline establishments={establishments} />
        </div>

        <div className="bg-[var(--color-surface)] p-5">
          <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">Statuts</h3>
          <div className="space-y-2">
            {statusBreakdown.map((s) => {
              const pct = total ? Math.round((s.count / total) * 100) : 0
              return (
                <div key={s.value} className="flex items-center gap-2.5">
                  <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                  <span className="flex-1 text-xs text-[var(--color-text-secondary)]">{s.label}</span>
                  <span className="text-xs font-medium text-[var(--color-text)]">{s.count}</span>
                  <span className="w-7 text-right text-[10px] text-[var(--color-text-tertiary)]">{pct}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
