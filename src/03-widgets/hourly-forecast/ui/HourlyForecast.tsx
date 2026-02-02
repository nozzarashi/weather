import './hourly-forecast.css'
import { useEffect, useMemo, useRef } from 'react'

import { SkeletonOverlay } from '@/06-shared/ui'

import { HourlyCard } from '@/05-entities/hourly-card'
import { ChangeWeekday, useWeekdayStore, type Weekday } from '@/04-features/change-weekday'
import { useGetWeatherForecast } from '@/04-features/search-city'
import { useMetricsStore } from '@/04-features/change-metrics'
import { TEMP_UNIT_MAPPING, ICON_CODES } from '@/06-shared/constants'
import { timeFormatter, weekdayFormatter } from '@/06-shared/lib'

interface HourlyForecast {
  time: string
  temperature: number
  weatherCode: number
}

export function HourlyForecast({ className }: Readonly<{ className: string }>) {
  const tempUnit = useMetricsStore((state) => state.tempUnit)
  const { isPending, data: forecast } = useGetWeatherForecast()
  const { setWeekday, weekday: currentWeekday } = useWeekdayStore()
  const ref = useRef<HTMLDivElement>(null)

  // TODO: Зачем писать функцию для форматирования выдачи forecast тут, перенеси ее в useGetWeatherForecast и отдавай forecast сразу форматированным
  const hourlyForecast = useMemo(() => {
    const result: HourlyForecast[] = []

    forecast?.hourly.time?.forEach((time: string, index: number) => {
      const formattedByWeekday = weekdayFormatter('long').format(new Date(time))

      if (formattedByWeekday === currentWeekday && Date.now() < new Date(time).getTime()) {
        const formattedByHours = timeFormatter.format(new Date(time))

        result.push({
          time: formattedByHours,
          temperature: forecast?.hourly.temperature_2m[index],
          weatherCode: forecast?.hourly.weather_code[index],
        })
      }
    })

    return result
  }, [
    forecast?.hourly.temperature_2m,
    forecast?.hourly.time,
    forecast?.hourly.weather_code,
    currentWeekday,
  ])

  useEffect(() => {
    if (forecast?.hourly.time) {
      const currentWeekday = Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
        new Date(forecast?.hourly.time[0]),
      )
      setWeekday(currentWeekday as Weekday)
    }
  }, [forecast?.hourly, setWeekday])

  useEffect(() => {
    if (!ref.current) return
    ref.current.scrollTop = 0
  }, [currentWeekday])

  return (
    <div className={`hourly-forecast ${className || ''} skeleton-container`.trim()}>
      <SkeletonOverlay isLoading={isPending} />

      <div className="hourly-forecast__header">
        <h3 className="hourly-forecast-title">Hourly Forecast</h3>
        {forecast && <ChangeWeekday />}
      </div>
      <div ref={ref} className="hourly-forecast__body">
        {hourlyForecast?.map((el: HourlyForecast) => (
          <HourlyCard
            key={el.time}
            time={el.time}
            temp={`${Math.round(el.temperature)}${TEMP_UNIT_MAPPING[tempUnit]}`}
            iconSrc={ICON_CODES[el.weatherCode]}
          />
        ))}
      </div>
    </div>
  )
}
