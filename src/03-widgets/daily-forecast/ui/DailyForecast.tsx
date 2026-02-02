import { DailyCard } from '@/05-entities/daily-card'
import './daily-forecast.css'
import { useGetWeatherForecast } from '@/04-features/search-city'
import { TEMP_UNIT_MAPPING, ICON_CODES } from '@/06-shared/constants'
import { useMetricsStore } from '@/04-features/change-metrics'
import { weekdayFormatter } from '@/06-shared/lib'

export function DailyForecast({ className }: Readonly<{ className?: string }>) {
  const tempUnit = useMetricsStore((state) => state.tempUnit)

  const { isPending, data: forecast } = useGetWeatherForecast()

  return (
    <div className={`daily-forecast ${className || ''}`.trim()}>
      {isPending || <h3 className="daily-forecast__title">Daily Forecast</h3>}
      <div className="daily-forecast__body">
        {isPending
          ? Array.from({ length: 7 }, (_, index) => (
              <DailyCard key={index} isLoading={true} maxTemp="" minTemp="" weekday="" />
            ))
          : forecast?.daily?.temperature_2m_max.map((item: number, index: number) => (
              <DailyCard
                // TODO: Не использовать index в качестве ключа
                key={forecast?.daily.time[index]}
                isLoading={isPending}
                className="daily-forecast__card"
                weekday={weekdayFormatter('short').format(new Date(forecast?.daily?.time[index]))}
                iconSrc={ICON_CODES[forecast?.daily.weather_code[index]]}
                maxTemp={`${Math.round(item)}${TEMP_UNIT_MAPPING[tempUnit]}`}
                minTemp={`${Math.round(forecast?.daily?.temperature_2m_min[index])}${TEMP_UNIT_MAPPING[tempUnit]}`}
              />
            ))}
      </div>
    </div>
  )
}
