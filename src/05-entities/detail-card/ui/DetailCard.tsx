import { SkeletonOverlay } from '@/06-shared/ui';
import styles from './detail-card.module.css';

interface DetailCardProps {
  title: string;
  value: string;
  isLoading: boolean;
  className?: string;
}

export function DetailCard({ title, value, className = '', isLoading }: DetailCardProps) {
  return (
    <div className={`${styles.detailCard} ${className} skeleton-container`}>
      <SkeletonOverlay isLoading={isLoading} />
      <span className={styles.title}>{title}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
