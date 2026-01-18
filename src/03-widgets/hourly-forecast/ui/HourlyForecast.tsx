import './hourly-forecast.css';
import { SkeletonOverlay } from '@/06-shared/ui';

import { HourlyCard } from '@/05-entities/hourly-card';
import { ChangeWeekday } from '@/04-features/change-weekday';
import { useGetWeatherForecast } from '@/04-features/search-city/api/getWeatherForecast';
import { TEMP_UNIT_MAPPING } from '@/06-shared/constants';
import { useMetricsStore } from '@/04-features/change-metrics/model/metrics-store';
import { useEffect, useMemo, useRef } from 'react';
import { useWeekdayStore, type Weekday } from '@/04-features/change-weekday/model/weekday-store';
import { ICON_CODES } from '@/06-shared/constants';

export function HourlyForecast({ className }: { className: string }) {
  interface HourlyForecast {
    time: string;
    temperature: number;
    weatherCode: number;
  }

  const rootClassName = `hourly-forecast ${className || ''} skeleton-container`.trim();
  const tempUnit = useMetricsStore((state) => state.tempUnit);

  const { isPending, data } = useGetWeatherForecast();
  const hourlyData = data?.hourly;

  const { setWeekday, weekday: currentWeekday } = useWeekdayStore();
  const ref = useRef<HTMLDivElement>(null);

  const weather = useMemo(() => {
    const formatterByWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
    const formatterByHours = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' });

    const result: HourlyForecast[] = [];

    hourlyData?.time?.forEach((time: string, index: number) => {
      const formattedWeekday = formatterByWeek.format(new Date(time));

      if (formattedWeekday === currentWeekday && Date.now() < new Date(time).getTime()) {
        const formattedTimeByHours = formatterByHours.format(new Date(time));

        result.push({
          time: formattedTimeByHours,
          temperature: hourlyData.temperature_2m[index],
          weatherCode: hourlyData.weather_code[index],
        });
      }
    });

    return result;
  }, [hourlyData?.temperature_2m, hourlyData?.time, hourlyData?.weather_code, currentWeekday]);

  useEffect(() => {
    if (hourlyData?.time) {
      const currentWeekday = Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(hourlyData.time[0]));
      setWeekday(currentWeekday as Weekday);
    }
  }, [hourlyData, setWeekday]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = 0;
  }, [currentWeekday]);

  return (
    <div className={rootClassName}>
      <SkeletonOverlay isLoading={isPending} />

      <div className="hourly-forecast__header">
        <h3 className="hourly-forecast-title">Hourly Forecast</h3>
        {data && <ChangeWeekday />}
      </div>
      <div ref={ref} className="hourly-forecast__body">
        {weather?.map((el: HourlyForecast) => (
          <HourlyCard
            key={el.time}
            time={el.time}
            temp={`${Math.round(el.temperature)}${TEMP_UNIT_MAPPING[tempUnit]}`}
            iconSrc={ICON_CODES[el.weatherCode]}
          />
        ))}
      </div>
    </div>
  );
}
