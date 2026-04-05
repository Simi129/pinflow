import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  className?: string;
}

const variantStyles = {
  success: {
    container: 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200',
    icon: 'text-emerald-600',
    title: 'text-emerald-900',
    message: 'text-emerald-700',
    closeButton: 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100',
  },
  error: {
    container: 'bg-gradient-to-r from-rose-50 to-red-50 border-rose-200',
    icon: 'text-rose-600',
    title: 'text-rose-900',
    message: 'text-rose-700',
    closeButton: 'text-rose-600 hover:text-rose-800 hover:bg-rose-100',
  },
  warning: {
    container: 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200',
    icon: 'text-amber-600',
    title: 'text-amber-900',
    message: 'text-amber-700',
    closeButton: 'text-amber-600 hover:text-amber-800 hover:bg-amber-100',
  },
  info: {
    container: 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200',
    icon: 'text-blue-600',
    title: 'text-blue-900',
    message: 'text-blue-700',
    closeButton: 'text-blue-600 hover:text-blue-800 hover:bg-blue-100',
  },
};

const iconComponents = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export default function Alert({
  variant = 'info',
  title,
  message,
  onClose,
  autoClose = false,
  autoCloseDelay = 5000,
  className = '',
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const styles = variantStyles[variant];
  const IconComponent = iconComponents[variant];

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => handleClose(), autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`relative flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm
        ${styles.container} ${isExiting ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className}`}
      role="alert"
    >
      <div className={`flex-shrink-0 ${styles.icon}`}>
        <IconComponent size={22} strokeWidth={2.5} />
      </div>
      <div className="flex-1 min-w-0">
        {title && <h3 className={`text-sm font-semibold mb-1 ${styles.title}`}>{title}</h3>}
        <p className={`text-sm ${styles.message} leading-relaxed`}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={handleClose}
          className={`flex-shrink-0 rounded-lg p-1 transition-all duration-200 ${styles.closeButton}`}
          aria-label="Close alert"
        >
          <X size={18} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}