import { Header } from '@/03-widgets/header';
import { CurrentForecast } from '@/03-widgets/current-forecast';
import { DailyForecast } from '@/03-widgets/daily-forecast';
import { SearchCity } from '@/04-features/search-city';
import { HourlyForecast } from '@/03-widgets/hourly-forecast';

import styles from './home.module.css';

export function Home() {
  return (
    <>
      <Header />
      <h1 className={styles.title}>How`s the sky looking today?</h1>

      <SearchCity />

      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <CurrentForecast className={styles.forecast} />
          <DailyForecast />
        </div>
        <div>
          <HourlyForecast />
        </div>
      </section>
    </>
  );
}
