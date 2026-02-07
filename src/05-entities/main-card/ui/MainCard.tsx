import { SkeletonOverlay } from '@/06-shared/ui';
import styles from './main-card.module.css';

interface MainCardProps {
  location: string;
  date: string;
  iconSrc: string;
  temperature: string;
  isLoading: boolean;
  className?: string;
}

export function MainCard({ className = '', location, date, iconSrc, temperature, isLoading }: MainCardProps) {
  return (
    <div className={`${className} skeleton-container`}>
      <div className={styles.wrapper}>
        <SkeletonOverlay isLoading={isLoading} />
        <div className={styles.block}>
          <h2 className={styles.title}>{location}</h2>
          <span className={styles.date}>{date}</span>
        </div>
        <div className={styles.block}>
          <img className={styles.icon} src={iconSrc} alt="Иконка погоды" />
          <span className={styles.temperature}>{temperature}</span>
        </div>
      </div>
    </div>
  );
}
