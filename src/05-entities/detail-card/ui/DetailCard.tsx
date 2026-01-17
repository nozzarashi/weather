import { SkeletonOverlay } from '@/06-shared/ui';
import './detail-card.css';

interface DetailCardProps {
  title: string;
  value: string;
  className: string;
  isLoading: boolean;
}

export function DetailCard({ title, value, className, isLoading }: DetailCardProps) {
  const rootClassName = `detail-card skeleton-container ${className || ''}`.trim();

  return (
    <div className={rootClassName}>
      <SkeletonOverlay isLoading={isLoading} />
      <span className="detail-card__title">{title}</span>
      <span className="detail-card__value">{value}</span>
    </div>
  );
}
