'use client'

import { useEffect } from 'react'
import { X, CheckCircle, AlertCircle } from 'lucide-react'

type ToastType = 'success' | 'error'

export default function Toast({
  message,
  type = 'success',
  onClose,
}: {
  message: string
  type?: ToastType
  onClose: () => void
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-start gap-3 bg-surface-container-lowest border-l-2 border-outline-variant rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] max-w-[340px] animate-in slide-in-from-right-4"
      style={{ borderLeftColor: type === 'success' ? '#16a34a' : '#ba1a1a' }}
    >
      {type === 'success' ? (
        <CheckCircle size={16} strokeWidth={1.5} className="text-[#16a34a] flex-shrink-0 mt-[1px]" />
      ) : (
        <AlertCircle size={16} strokeWidth={1.5} className="text-error flex-shrink-0 mt-[1px]" />
      )}
      <p className="text-body-sm text-on-surface flex-1">{message}</p>
      <button onClick={onClose} className="text-secondary hover:text-on-surface flex-shrink-0">
        <X size={14} strokeWidth={1.5} />
      </button>
    </div>
  )
}
