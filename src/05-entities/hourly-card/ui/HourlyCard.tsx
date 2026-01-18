import './hourly-card.css';

interface HourlyCardProps {
  className?: string;
  iconSrc: string;
  time: string;
  temp: string;
}

export function HourlyCard({ className, iconSrc, time, temp }: HourlyCardProps) {
  const rootClassName = `hourly-card ${className || ''} skeleton-container`.trim();

  return (
    <div className={rootClassName}>
      <div className="hourly-card__left">
        <img className="hourly-card__icon" src={iconSrc} alt="" />
        <span className="hourly-card__time">{time}</span>
      </div>
      <div className="hourly-card__right">
        <span className="hourly-card__temp">{temp}</span>
      </div>
    </div>
  );
}
