interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const sizeClasses = { sm: 'h-8 w-8', md: 'h-12 w-12', lg: 'h-16 w-16' };

export default function LoadingSpinner({ size = 'md', message }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-rose-500`} />
      {message && <p className="text-slate-600">{message}</p>}
    </div>
  );
}