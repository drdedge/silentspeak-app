'use client';

import { Toast } from '@/types';

interface ToastTrayProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

const typeStyles: Record<Toast['type'], string> = {
  success: 'border-secondary/30 bg-secondary/10 text-secondary',
  error: 'border-destructive/30 bg-destructive/10 text-destructive',
  info: 'border-primary/30 bg-primary/10 text-primary',
};

export function ToastTray({ toasts, onDismiss }: ToastTrayProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex w-full max-w-sm flex-col gap-3" role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          aria-live="polite"
          className={`flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg shadow-black/10 transition animate-in slide-in-from-right ${
            typeStyles[toast.type]
          }`}
        >
          <div className="flex-1 text-sm font-medium">{toast.message}</div>
          <button
            type="button"
            aria-label="Dismiss notification"
            className="text-lg font-bold opacity-60 hover:opacity-100 transition"
            onClick={() => onDismiss(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}