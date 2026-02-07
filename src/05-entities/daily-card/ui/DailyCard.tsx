import { SkeletonOverlay } from '@/06-shared/ui';
import styles from './daily-card.module.css';

interface DailyCardProps {
  weekday: string;
  maxTemp: number | string;
  minTemp: number | string;
  isLoading: boolean;
  className?: string;
  iconSrc?: string;
}

export function DailyCard({ className = '', weekday, iconSrc, maxTemp, minTemp, isLoading }: DailyCardProps) {
  return (
    <div className={`${styles.dailyCard} ${className} skeleton-container`}>
      <SkeletonOverlay isLoading={isLoading} />
      <span className={styles.title}>{weekday}</span>
      <img className={styles.icon} src={iconSrc} alt="иконка погоды" />
      <div className={styles.temps}>
        <span>{maxTemp}</span>
        <span>{minTemp}</span>
      </div>
    </div>
  );
}
