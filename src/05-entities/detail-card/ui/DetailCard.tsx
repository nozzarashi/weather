import { SkeletonOverlay } from '@/06-shared/ui'
import './detail-card.css'

export function DetailCard({
  title,
  value,
  className,
  isLoading,
}: Readonly<{
  title: string
  value: string
  className: string
  isLoading: boolean
}>) {
  return (
    <div className={`detail-card skeleton-container ${className || ''}`.trim()}>
      <SkeletonOverlay isLoading={isLoading} />
      <span className="detail-card__title">{title}</span>
      <span className="detail-card__value">{value}</span>
    </div>
  )
}
