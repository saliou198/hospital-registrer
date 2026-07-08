import type { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: number
  icon: ReactNode
  color: string
}

export function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`rounded-lg p-3 ${color}`}>{icon}</div>
      </div>
    </div>
  )
}
