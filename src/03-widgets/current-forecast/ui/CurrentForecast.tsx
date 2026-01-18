import './current-forecast.css';

import { MainCard } from '@/05-entities/main-card';
import { DetailCard } from '@/05-entities/detail-card';
import { useGetWeatherForecast } from '@/04-features/search-city/api/getWeatherForecast';
import { useSelectedCityStore } from '@/04-features/search-city/model/selected-city-store';
import { useMetricsStore } from '@/04-features/change-metrics/model/metrics-store';
import { TEMP_UNIT_MAPPING } from '@/06-shared/constants';
import { useShallow } from 'zustand/shallow';
import { ICON_CODES } from '@/06-shared/constants';

export function CurrentForecast({ className }: { className?: string }) {
  const { isPending, data } = useGetWeatherForecast();
  const currentData = data?.current;

  const cityName = useSelectedCityStore((state) => state.cityName);

  const { tempUnit, windUnit, precipUnit } = useMetricsStore(
    useShallow((state) => ({
      tempUnit: state.tempUnit,
      windUnit: state.windUnit,
      precipUnit: state.precipUnit,
    }))
  );

  const currentTemp = ` ${Math.round(currentData?.temperature_2m)}${TEMP_UNIT_MAPPING[tempUnit]}`;
  const apparentTemp = `${Math.round(currentData?.apparent_temperature)}${TEMP_UNIT_MAPPING[tempUnit]}`;
  const humidity = `${currentData?.relative_humidity_2m}%`;
  const wind = `${Math.round(currentData?.wind_speed_10m)} ${windUnit}`;
  const precipitation = `${currentData?.precipitation.toFixed(1)} ${precipUnit}`;
  const icon = ICON_CODES[currentData?.weather_code];

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
        }).format(data?.time)}
        className="current-forecast__main-card"
        iconSrc={icon}
        temperature={currentTemp}
      />
      <div className="current-forecast__details">
        <DetailCard
          isLoading={isPending}
          className="current-forecast__detail-card"
          title="Feels Like"
          value={apparentTemp}
        />

        <DetailCard isLoading={isPending} className="current-forecast__detail-card" title="Humidity" value={humidity} />

        <DetailCard isLoading={isPending} className="current-forecast__detail-card" title="Wind" value={wind} />

        <DetailCard
          isLoading={isPending}
          className="current-forecast__detail-card"
          title="Precipitation"
          value={precipitation}
        />
      </div>
    </div>
  );
}
