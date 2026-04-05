import { TrendingUp } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  onClick?: () => void;
}

const sizeClasses = { sm: 'w-6 h-6', md: 'w-8 h-8', lg: 'w-10 h-10' };
const iconSizes = { sm: 14, md: 18, lg: 22 };
const textSizes = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' };

export default function Logo({ size = 'md', showText = true, onClick }: LogoProps) {
  return (
    <div
      className={`flex items-center gap-2 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-orange-500 to-orange-400 rounded-lg flex items-center justify-center text-white shadow-sm`}
      >
        <TrendingUp size={iconSizes[size]} strokeWidth={2.5} />
      </div>
      {showText && (
        <span className={`${textSizes[size]} font-semibold tracking-tight text-slate-900`}>
          Pinflow
        </span>
      )}
    </div>
  );
}