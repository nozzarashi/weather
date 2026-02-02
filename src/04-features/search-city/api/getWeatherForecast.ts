import { useQuery } from '@tanstack/react-query'
import { useSelectedCityStore } from '../model/selected-city-store'
import { useMetricsStore } from '@/04-features/change-metrics'

async function getWeatherForecast(
  latitude: number,
  longitude: number,
  tempUnit: string,
  windUnit: string,
  precipitationUnit: string,
  // TODO: Раз уж в getCityCoordinates используешь аборт сигнал, то и тут используй.
  // TODO: Типизировать возврат, тогда useGetWeatherForecast тоже будет типизирован.
) {
  const url = new URL('https://api.open-meteo.com/v1/forecast')

  Object.entries({
    latitude: String(latitude),
    longitude: String(longitude),
    wind_speed_unit: windUnit,
    temperature_unit: tempUnit,
    precipitation_unit: precipitationUnit,
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    hourly: 'temperature_2m,weather_code',
    current:
      'temperature_2m,weather_code,wind_speed_10m,apparent_temperature,relative_humidity_2m,precipitation',
    timezone: 'auto',
  }).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('ERROR_WHEN_GETTING_WEATHER_FORECAST')
  }
  return response.json()
}

export function useGetWeatherForecast() {
  const latitude = useSelectedCityStore((state) => state.latitude)
  const longitude = useSelectedCityStore((state) => state.longitude)
  const { tempUnit, windUnit, precipitationUnit } = useMetricsStore()

  return useQuery({
    queryKey: ['city', 'forecast', latitude, longitude, tempUnit, windUnit, precipitationUnit],
    queryFn: () => getWeatherForecast(latitude, longitude, tempUnit, windUnit, precipitationUnit),
    enabled: !!latitude && !!longitude,
  })
}
