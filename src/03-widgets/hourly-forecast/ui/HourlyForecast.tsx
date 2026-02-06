import './hourly-forecast.css';
import { useEffect, useMemo, useRef } from 'react';

import { SkeletonOverlay } from '@/06-shared/ui';

import { HourlyCard } from '@/05-entities/hourly-card';
import { ChangeWeekday, useWeekdayStore, type Weekday } from '@/04-features/change-weekday';
import { useWeatherForecast } from '@/04-features/search-city';
import { useMetricsStore } from '@/04-features/change-metrics';
import { TEMP_UNIT_MAPPING, ICON_CODES } from '@/06-shared/constants';
import { format } from 'date-fns';

interface HourlyForecast {
  time: string;
  temperature: number;
  weatherCode: number;
}

export function HourlyForecast({ className }: { className: string }) {
  const rootClassName = `hourly-forecast ${className || ''} skeleton-container`.trim();
  const tempUnit = useMetricsStore((state) => state.tempUnit);

  const { isPending, data: forecast } = useWeatherForecast();
  const hourlyData = forecast?.hourly;
  const { setWeekday, weekday: currentWeekday } = useWeekdayStore();
  const ref = useRef<HTMLDivElement>(null);

  const weather = useMemo(() => {
    const result: HourlyForecast[] = [];

    hourlyData?.time?.forEach((time: string, index: number) => {
      console.log(hourlyData?.time);
      const formattedByWeekday = format(new Date(time), 'EEEE');

      if (formattedByWeekday === currentWeekday && Date.now() < new Date(time).getTime()) {
        const formattedByHours = format(new Date(time), 'h:mm a');

        result.push({
          time: formattedByHours,
          temperature: hourlyData.temperature_2m[index],
          weatherCode: hourlyData.weather_code[index],
        });
      }
    });

    return result;
  }, [hourlyData?.temperature_2m, hourlyData?.time, hourlyData?.weather_code, currentWeekday]);

  useEffect(() => {
    if (hourlyData?.time) {
      const currentWeekday = format(new Date(hourlyData.time[0]), 'EEEE');
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
        {forecast && <ChangeWeekday />}
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
