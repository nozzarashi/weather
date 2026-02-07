import styles from './hourly-card.module.css';

interface HourlyCardProps {
  iconSrc: string;
  time: string;
  temp: string;
  className?: string;
}

export function HourlyCard({ className = '', iconSrc, time, temp }: HourlyCardProps) {
  return (
    <div className={`${styles.hourlyCard} ${className} skeleton-container`}>
      <div className={styles.left}>
        <img className={styles.icon} src={iconSrc} alt="Иконка погоды" />
        <span className={styles.time}>{time}</span>
      </div>
      <div className={styles.right}>
        <span className={styles.temperature}>{temp}</span>
      </div>
    </div>
  );
}
