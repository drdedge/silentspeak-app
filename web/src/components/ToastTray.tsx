'use client';

import { Toast } from '@/types';

interface ToastTrayProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

const typeStyles: Record<Toast['type'], string> = {
  success: 'border-emerald-300 bg-emerald-50 text-emerald-800',
  error: 'border-rose-300 bg-rose-50 text-rose-800',
  info: 'border-violet-300 bg-violet-50 text-violet-800',
};

export function ToastTray({ toasts, onDismiss }: ToastTrayProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg shadow-black/10 transition ${
            typeStyles[toast.type]
          }`}
        >
          <div className="flex-1 text-sm font-medium">{toast.message}</div>
          <button
            type="button"
            aria-label="Dismiss notification"
            className="text-lg font-bold text-slate-400 transition hover:text-slate-600"
            onClick={() => onDismiss(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
