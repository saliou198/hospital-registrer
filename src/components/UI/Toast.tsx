import type { Toast as ToastType } from '@/hooks/useToast'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

interface ToastContainerProps {
  toasts: ToastType[]
  onRemove: (id: string) => void
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
}

const styles = {
  success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/50 dark:border-green-800 dark:text-green-200',
  error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/50 dark:border-red-800 dark:text-red-200',
  info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/50 dark:border-blue-800 dark:text-blue-200',
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = icons[toast.type]
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${styles[toast.type]}`}
          >
            <Icon size={18} />
            <span className="text-sm font-medium">{toast.message}</span>
            <button onClick={() => onRemove(toast.id)} className="ml-2 opacity-60 hover:opacity-100">
              <X size={16} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
