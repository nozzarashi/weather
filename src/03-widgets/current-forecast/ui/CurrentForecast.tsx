import './current-forecast.css'

import { MainCard } from '@/05-entities/main-card'
import { DetailCard } from '@/05-entities/detail-card'
import { useGetWeatherForecast, useSelectedCityStore } from '@/04-features/search-city'
import { useMetricsStore } from '@/04-features/change-metrics'
import { TEMP_UNIT_MAPPING, ICON_CODES } from '@/06-shared/constants'
import { useShallow } from 'zustand/shallow'

export function CurrentForecast({ className }: Readonly<{ className?: string }>) {
  const cityName = useSelectedCityStore((state) => state.cityName)
  const { isPending, data: forecast } = useGetWeatherForecast()
  const { tempUnit, windUnit, precipitationUnit } = useMetricsStore(
    useShallow((state) => ({
      tempUnit: state.tempUnit,
      windUnit: state.windUnit,
      precipitationUnit: state.precipitationUnit,
    })),
  )

  return (
    <div className={className}>
      <MainCard
        isLoading={isPending}
        location={cityName}
        date={Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(forecast?.time)}
        className="current-forecast__main-card"
        iconSrc={ICON_CODES[forecast?.current.weather_code]}
        temperature={`${Math.round(forecast?.current.temperature_2m)}${TEMP_UNIT_MAPPING[tempUnit]}`}
      />
      <div className="current-forecast__details">
        <DetailCard
          isLoading={isPending}
          className="current-forecast__detail-card"
          title="Feels Like"
          value={`${Math.round(forecast?.current.apparent_temperature)}${TEMP_UNIT_MAPPING[tempUnit]}`}
        />

        <DetailCard
          isLoading={isPending}
          className="current-forecast__detail-card"
          title="Humidity"
          value={`${forecast?.current.relative_humidity_2m}%`}
        />

        <DetailCard
          isLoading={isPending}
          className="current-forecast__detail-card"
          title="Wind"
          value={`${Math.round(forecast?.current.wind_speed_10m)} ${windUnit}`}
        />

        <DetailCard
          isLoading={isPending}
          className="current-forecast__detail-card"
          title="Precipitation"
          value={`${forecast?.current.precipitation.toFixed(1)} ${precipitationUnit}`}
        />
      </div>
    </div>
  )
}
