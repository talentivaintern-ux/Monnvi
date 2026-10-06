import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-[#292522] text-[#F8F3EA] rounded-none border-l-4 border-[#B08D57] shadow-xl text-sm transition-all animate-fade-in"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-4 h-4 text-[#EFE5D4] shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-4 h-4 text-[#A65D45] shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-xs font-medium tracking-wide">
            {toast.message}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#EFE5D4]/60 hover:text-[#F8F3EA] transition-colors p-0.5"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
