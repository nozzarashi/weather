import { useQuery } from '@tanstack/react-query'
import type { City } from '../model/city'

interface CityGeocodingResponse {
  results?: City[]
}

async function getCityCoordinates(
  cityName: string,
  signal: AbortSignal,
): Promise<CityGeocodingResponse> {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search')
  const CITIES_NUMBER_SHOWN = 5

  Object.entries({
    name: cityName,
    count: String(CITIES_NUMBER_SHOWN),
    language: 'en',
    format: 'json',
  }).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const response = await fetch(url, { signal })

  if (!response.ok) throw new Error('ERROR_WHEN_GETTING_CITY_COORDINATES')

  return response.json()
}

export function useGetCityCoordinates(cityName: string) {
  return useQuery({
    queryKey: ['city-coordinates', cityName],
    queryFn: (context) => getCityCoordinates(cityName, context.signal),
    staleTime: 5 * 60 * 1000,
    enabled: cityName.length >= 3,
  })
}
