import { Header } from '@/03-widgets/header/index';
import { CurrentForecast } from '@/03-widgets/current-forecast/ui/CurrentForecast';

import './home.css';
import { DailyForecast } from '@/03-widgets/daily-forecast';
import { SearchCity } from '@/04-features/search-city';
import { HourlyForecast } from '@/03-widgets/hourly-forecast/ui/HourlyForecast';

export function Home() {
  return (
    <>
      <Header />
      <h1 className="home__title">How`s the sky looking today?</h1>

      <SearchCity />

      <section className="home__hero">
        <div className="home__hero-left">
          <CurrentForecast className="home__forecast" />
          <DailyForecast />
        </div>
        <div className="home__hero-right">
          <HourlyForecast className="home__hourly-forecast" />
        </div>
      </section>
    </>
  );
}
