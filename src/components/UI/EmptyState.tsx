import type { ReactNode } from 'react'
import { Building2 } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
  action?: ReactNode
}

export function EmptyState({
  title = 'Aucun établissement',
  description = 'Ajoutez un établissement ou modifiez vos filtres.',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <Building2 size={20} className="text-[var(--color-text-tertiary)]" />
      </div>
      <p className="text-sm font-medium text-[var(--color-text)]">{title}</p>
      <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
