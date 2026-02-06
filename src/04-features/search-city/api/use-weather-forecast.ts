import { useQuery } from '@tanstack/react-query';
import { useSelectedCityStore } from '../model/selected-city-store';
import { useMetricsStore } from '@/04-features/change-metrics';

async function getWeatherForecast(
  latitude: number,
  longitude: number,
  tempUnit: string,
  windUnit: string,
  precipUnit: string,
) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');

  const params: Record<string, string> = {
    latitude: String(latitude),
    longitude: String(longitude),
    wind_speed_unit: windUnit,
    temperature_unit: tempUnit,
    precipitation_unit: precipUnit,
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    hourly: 'temperature_2m,weather_code',
    current: 'temperature_2m,weather_code,wind_speed_10m,apparent_temperature,relative_humidity_2m,precipitation',
    timezone: 'auto',
  };

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Ошибка запроса');
  }
  return response.json();
}

export function useWeatherForecast() {
  const latitude = useSelectedCityStore((state) => state.latitude);
  const longitude = useSelectedCityStore((state) => state.longitude);
  const { tempUnit, windUnit, precipUnit } = useMetricsStore();

  return useQuery({
    queryKey: ['city', 'forecast', latitude, longitude, tempUnit, windUnit, precipUnit],
    queryFn: () => getWeatherForecast(latitude, longitude, tempUnit, windUnit, precipUnit),
    enabled: Boolean(latitude) && Boolean(longitude),
  });
}
