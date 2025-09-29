import { RiskLevel } from '@/types';

interface RiskBadgeProps {
  risk: RiskLevel;
  className?: string;
}

const riskStyles: Record<RiskLevel, string> = {
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  medium: 'bg-accent/10 text-accent border-accent/20',
  low: 'bg-secondary/10 text-secondary border-secondary/20',
};

export function RiskBadge({ risk, className = '' }: RiskBadgeProps) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${riskStyles[risk]} ${className}`}
      role="status"
      aria-label={`${risk} risk level`}
    >
      {risk} risk
    </span>
  );
}