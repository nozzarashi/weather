import { DailyCard } from '@/05-entities/daily-card';
import './daily-forecast.css';
import { useGetWeatherForecast } from '@/04-features/search-city';
import { TEMP_UNIT_MAPPING, ICON_CODES } from '@/06-shared/constants';
import { useMetricsStore } from '@/04-features/change-metrics';

export function DailyForecast({ className }: { className?: string }) {
  const rootClassName = `daily-forecast ${className || ''}`.trim();
  const tempUnit = useMetricsStore((state) => state.tempUnit);

  const formatterByWeek = Intl.DateTimeFormat('en-US', { weekday: 'short' });

  const { isPending, data } = useGetWeatherForecast();
  const dailyData = data?.daily;

  return (
    <div className={rootClassName}>
      {isPending || <h3 className="daily-forecast__title">Daily Forecast</h3>}
      <div className="daily-forecast__body">
        {isPending
          ? Array.from({ length: 7 }, (_, index) => (
              <DailyCard key={index} isLoading={true} maxTemp="" minTemp="" weekday="" />
            ))
          : dailyData?.temperature_2m_max.map((el: number, index: number) => (
              <DailyCard
                key={dailyData.time[index]}
                isLoading={isPending}
                className="daily-forecast__card"
                weekday={formatterByWeek.format(new Date(dailyData?.time[index]))}
                iconSrc={ICON_CODES[dailyData.weather_code[index]]}
                maxTemp={`${Math.round(el)}${TEMP_UNIT_MAPPING[tempUnit]}`}
                minTemp={`${Math.round(dailyData?.temperature_2m_min[index])}${TEMP_UNIT_MAPPING[tempUnit]}`}
              />
            ))}
      </div>
    </div>
  );
}
