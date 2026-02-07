import searchIcon from '@/../assets/icons/icon-search.svg';
import { useSearchCities } from '../api/use-search-cities';
import { useSelectedCityStore } from '../model/selected-city-store';
import { ClipLoader } from 'react-spinners';
import { useQueryClient } from '@tanstack/react-query';
import { useMetricsStore } from '@/04-features/change-metrics';
import { Input } from '@/06-shared/ui';
import { useSearchInput } from '../lib/use-search-input';
import { useRecentlySearchedCities } from '../lib/use-recently-searched-cities';
import type { City } from '../model/city';

import styles from './search-city.module.css';

export function SearchCity() {
  const queryClient = useQueryClient();

  const {
    inputValue,
    setInputValue,
    debouncedValue,
    isFocused,
    setIsFocused,
    containerRef,
    isPending,
    isUserSelectedCity,
  } = useSearchInput();

  const { addSearchedCities, searchedCities } = useRecentlySearchedCities();

  const cityName = useSelectedCityStore((state) => state.cityName);
  const setCityInfo = useSelectedCityStore((state) => state.setCityInfo);
  const { data: cities } = useSearchCities(debouncedValue);

  function handleCitySelect(city: City) {
    const { tempUnit, windUnit, precipUnit } = useMetricsStore.getState();
    const queryKey = ['city', 'forecast', city.latitude, city.longitude, tempUnit, windUnit, precipUnit];
    const currentCityCache = queryClient.getQueryData(queryKey);

    isUserSelectedCity.current = true;
    setCityInfo(`${city.name}${city.country ? ', ' + city.country : ''}`, city.latitude, city.longitude);

    if (currentCityCache) {
      setIsFocused(false);
      setInputValue('');
      isUserSelectedCity.current = false;
    }

    addSearchedCities(city);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className={styles.wrapper}>
        <div
          tabIndex={0}
          onBlur={(event) => {
            if (!containerRef.current?.contains(event.relatedTarget)) setIsFocused(false);
          }}
          ref={containerRef}
          className={styles.container}
        >
          <Input
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
            startIcon={searchIcon}
            placeholder={isFocused ? '' : cityName}
          />

          {isFocused && (
            <div className={styles.results}>
              {isPending ? (
                <div className={styles.searchProgress}>
                  <ClipLoader size={18} color="#aeaeb7" />
                  <span>Search in Progress</span>
                </div>
              ) : cities?.results ? (
                <ul className={styles.resultsList}>
                  {cities?.results.map((city) => {
                    return (
                      <li
                        onClick={(event) => {
                          event.stopPropagation();
                          handleCitySelect(city);
                        }}
                        className={styles.resultsItem}
                        key={city.id}
                      >
                        <p className={styles.resultsCity}>{city.name}</p>
                        <p className={styles.resultsRegion}>
                          {city.admin1}
                          {city.admin2 ? ', ' + city.admin2 : ''}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <>
                  <div className={styles.currentCity}>Текущее: {cityName}</div>
                  <ul className={styles.searchedCitiesList}>
                    {searchedCities.map((city) => (
                      <li
                        className={styles.searchedCitiesItem}
                        onClick={() => {
                          handleCitySelect(city);
                        }}
                        key={city.id}
                      >
                        {city.name}, {city.admin1}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
