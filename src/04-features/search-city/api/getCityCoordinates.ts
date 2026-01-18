import { useQuery } from '@tanstack/react-query';

export interface City {
  name: string;
  country: string;
  admin1: string;
  admin2: string;
  id: number;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface CityGeocodingResponse {
  results?: City[];
}

async function getCityCoordinates(cityName: string, signal: AbortSignal): Promise<CityGeocodingResponse> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=5&language=en&format=json`;
  const response = await fetch(url, { signal });

  if (!response.ok) throw new Error('Ошибка поиска города');

  return response.json();
}

export function useGetCityCoordinates(cityName: string) {
  return useQuery({
    queryKey: ['city-coordinates', cityName],
    queryFn: (context) => getCityCoordinates(cityName, context.signal),
    staleTime: 5 * 60 * 1000,
    enabled: cityName.length >= 3,
  });
}
