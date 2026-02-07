import { DailyCard } from '@/05-entities/daily-card';
import { useWeatherForecast } from '@/04-features/search-city';
import { TEMP_UNIT_MAPPING, ICON_CODES } from '@/06-shared/constants';
import { useMetricsStore } from '@/04-features/change-metrics';
import { format } from 'date-fns';
import styles from './daily-forecast.module.css';

export function DailyForecast({ className = '' }: { className?: string }) {
  const tempUnit = useMetricsStore((state) => state.tempUnit);

  const { isPending, data: forecast } = useWeatherForecast();
  const dailyData = forecast?.daily;

  return (
    <div className={`${styles.dailyForecast} ${className}`}>
      {isPending || <h3 className={styles.title}>Daily Forecast</h3>}
      <div className={styles.body}>
        {isPending
          ? Array.from({ length: 7 }, (_, index) => (
              <DailyCard key={index} isLoading={true} maxTemp="" minTemp="" weekday="" />
            ))
          : dailyData?.temperature_2m_max.map((el: number, index: number) => (
              <DailyCard
                key={dailyData.time[index]}
                isLoading={isPending}
                className={styles.card}
                weekday={format(new Date(dailyData?.time[index]), 'MMM')}
                iconSrc={ICON_CODES[dailyData.weather_code[index]]}
                maxTemp={`${Math.round(el)}${TEMP_UNIT_MAPPING[tempUnit]}`}
                minTemp={`${Math.round(dailyData?.temperature_2m_min[index])}${TEMP_UNIT_MAPPING[tempUnit]}`}
              />
            ))}
      </div>
    </div>
  );
}
