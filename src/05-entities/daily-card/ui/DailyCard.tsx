import { SkeletonOverlay } from '@/06-shared/ui'
import './daily-card.css'

export function DailyCard({
  className,
  weekday,
  iconSrc,
  maxTemp,
  minTemp,
  isLoading,
}: Readonly<{
  className?: string
  weekday: string
  iconSrc?: string
  maxTemp: number | string
  minTemp: number | string
  isLoading: boolean
}>) {
  return (
    <div className={`daily-card ${className || ''} skeleton-container`.trim()}>
      <SkeletonOverlay isLoading={isLoading} />
      <span className="daily-card__title">{weekday}</span>
      <img className="daily-card__icon" src={iconSrc} alt="иконка погоды" />
      <div className="daily-card__temps">
        <span className="daily-card__temps-max">{maxTemp}</span>
        <span className="daily-card__temps-min">{minTemp}</span>
      </div>
    </div>
  )
}
