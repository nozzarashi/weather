import { SkeletonOverlay } from '@/06-shared/ui';
import './main-card.css';

interface MainCardProps {
  className: string;
  location: string;
  date: string;
  iconSrc: string;
  temperature: string;
  isLoading: boolean;
}

export function MainCard({ className, location, date, iconSrc, temperature, isLoading }: MainCardProps) {
  return (
    <div className={`${className} skeleton-container`}>
      <div className="main-card__wrapper">
        <SkeletonOverlay isLoading={isLoading} />
        <div className="main-card__block">
          <h2 className="main-card__title">{location}</h2>
          <span className="main-card__date">{date}</span>
        </div>
        <div className="main-card__block">
          <img className="main-card__icon" src={iconSrc} alt="Иконка погоды" />

          <span className="main-card__temperature">{temperature}</span>
        </div>
      </div>
    </div>
  );
}
