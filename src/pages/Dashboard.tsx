import type { Establishment } from '@/types'
import { PROGRESSION_STATUSES } from '@/types'
import { StatsCard } from '@/components/Dashboard/StatsCard'
import { Building2, GraduationCap, CalendarClock, XCircle, ArrowRight } from 'lucide-react'

interface DashboardProps {
  establishments: Establishment[]
  onNavigate: () => void
}

export function Dashboard({ establishments, onNavigate }: DashboardProps) {
  const total = establishments.length
  const formed = establishments.filter((e) => e.status === 'plateforme_activée').length
  const remaining = total - formed
  const planned = establishments.filter((e) => e.status === 'rendez_vous_planifie').length
  const refused = establishments.filter((e) => e.status === 'refus').length

  const statusBreakdown = PROGRESSION_STATUSES.map((s) => ({
    ...s,
    count: establishments.filter((e) => e.status === s.value).length,
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de bord</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatsCard
          title="Total établissements"
          value={total}
          icon={<Building2 size={22} className="text-blue-600" />}
          color="bg-blue-50 dark:bg-blue-900/30"
        />
        <StatsCard
          title="Plateforme activée"
          value={formed}
          icon={<GraduationCap size={22} className="text-green-600" />}
          color="bg-green-50 dark:bg-green-900/30"
        />
        <StatsCard
          title="Restant"
          value={remaining}
          icon={<ArrowRight size={22} className="text-amber-600" />}
          color="bg-amber-50 dark:bg-amber-900/30"
        />
        <StatsCard
          title="Rendez-vous planifiés"
          value={planned}
          icon={<CalendarClock size={22} className="text-orange-600" />}
          color="bg-orange-50 dark:bg-orange-900/30"
        />
        <StatsCard
          title="Refus"
          value={refused}
          icon={<XCircle size={22} className="text-red-600" />}
          color="bg-red-50 dark:bg-red-900/30"
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Répartition par statut</h2>
        {total === 0 ? (
          <p className="text-gray-400 dark:text-gray-500">
            Aucun établissement pour le moment.{' '}
            <button
              onClick={onNavigate}
              className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400"
            >
              Ajoutez-en un
            </button>
          </p>
        ) : (
          <div className="space-y-3">
            {statusBreakdown.map((s) => {
              const pct = total ? Math.round((s.count / total) * 100) : 0
              return (
                <div key={s.value} className="flex items-center gap-3">
                  <span className="w-36 text-sm font-medium text-gray-700 dark:text-gray-300">{s.label}</span>
                  <div className="flex-1">
                    <div className="h-2.5 rounded-full bg-gray-100 dark:bg-gray-700">
                      <div
                        className={`h-2.5 rounded-full transition-all ${s.color.replace('100', '500').replace('text', 'bg').replace('dark:', '')}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-10 text-right text-sm font-medium text-gray-600 dark:text-gray-400">{s.count}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
