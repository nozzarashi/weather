import { useQuery } from '@tanstack/react-query';
import { useSelectedCityStore } from '../model/selected-city-store';
import { useMetricsStore } from '@/04-features/change-metrics/model/metrics-store';

async function getWeatherForecast(lat: number, lng: number, tempUnit: string, windUnit: string, precipUnit: string) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code,wind_speed_10m,apparent_temperature,relative_humidity_2m,precipitation&timezone=auto&wind_speed_unit=${windUnit}&temperature_unit=${tempUnit}&precipitation_unit=${precipUnit}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Ошибка запроса');
  }
  return response.json();
}

export function useGetWeatherForecast() {
  const lat = useSelectedCityStore((state) => state.lat);
  const lng = useSelectedCityStore((state) => state.lng);
  const { tempUnit, windUnit, precipUnit } = useMetricsStore();

  return useQuery({
    queryKey: ['city', 'forecast', lat, lng, tempUnit, windUnit, precipUnit],
    queryFn: () => getWeatherForecast(lat, lng, tempUnit, windUnit, precipUnit),
    enabled: Boolean(lat) && Boolean(lng),
  });
}
