import type { Toast as ToastType } from '@/hooks/useToast'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

interface ToastContainerProps {
  toasts: ToastType[]
  onRemove: (id: string) => void
}

const config = {
  success: { icon: CheckCircle, classes: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' },
  error: { icon: XCircle, classes: 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200' },
  info: { icon: Info, classes: 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]' },
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2">
      {toasts.map((toast, i) => {
        const { icon: Icon, classes } = config[toast.type]
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-sm animate-slide-in-right ${classes}`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <Icon size={16} />
            <span className="text-sm font-medium">{toast.message}</span>
            <button onClick={() => onRemove(toast.id)} className="ml-2 opacity-40 hover:opacity-100 transition-opacity">
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
