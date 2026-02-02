import './hourly-card.css'

export function HourlyCard({
  className,
  iconSrc,
  time,
  temp,
}: Readonly<{
  className?: string
  iconSrc: string
  time: string
  temp: string
}>) {
  return (
    <div className={`hourly-card ${className || ''} skeleton-container`.trim()}>
      <div className="hourly-card__left">
        <img className="hourly-card__icon" src={iconSrc} alt="" />
        <span className="hourly-card__time">{time}</span>
      </div>
      <div className="hourly-card__right">
        <span className="hourly-card__temp">{temp}</span>
      </div>
    </div>
  )
}
