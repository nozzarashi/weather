import { Input } from '@/06-shared/ui';
import { useEffect, useRef, useState } from 'react';
import { useGetCityCoordinates, type City } from '../api/getCityCoordinates';
import { useSelectedCityStore } from '../model/selected-city-store';

import './search-city.css';
import searchIcon from '@/../assets/icons/icon-search.svg';
import { useGetWeatherForecast } from '../api/getWeatherForecast';

import { ClipLoader } from 'react-spinners';
import { useQueryClient } from '@tanstack/react-query';
import { useMetricsStore } from '@/04-features/change-metrics/model/metrics-store';
import { useDebounced } from '../lib/useDebounced';

interface RecentlySearchedCity {
  name: string;
  country: string;
  lat: number;
  lng: number;
  id: number;
  admin1: string;
}

export function SearchCity({ className }: { className?: string }) {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [searchedCities, setSearchedCities] = useState<RecentlySearchedCity[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevIsPending = useRef(false);
  const isUserSelectedCity = useRef(false);

  const DEBOUNCE_DELAY = 300;
  const debouncedValue = useDebounced(inputValue, DEBOUNCE_DELAY);
  const setCityInfo = useSelectedCityStore((state) => state.setCityInfo);
  const cityName = useSelectedCityStore((state) => state.cityName);
  const { data } = useGetCityCoordinates(debouncedValue);
  const { isPending } = useGetWeatherForecast();

  const rootClassName = `search-city ${className || ''}`.trim();

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

    setSearchedCities((prev) => {
      const filtered = prev.filter((c) => c.id !== city.id);
      return [
        {
          name: city.name,
          country: city.country,
          lat: city.latitude,
          lng: city.longitude,
          id: city.id,
          admin1: city.admin1,
        },
        ...filtered,
      ].slice(0, 5);
    });
  }

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (prevIsPending.current && isPending === false && isUserSelectedCity.current) {
      setIsFocused(false);
      setInputValue('');
      isUserSelectedCity.current = false;
    }

    prevIsPending.current = isPending;
  }, [isPending]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className={rootClassName}
    >
      <div className="search-city__input-wrapper">
        <div ref={containerRef} className="search-city__input-container">
          <Input
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
            startIcon={searchIcon}
            wrapperClassName="search-city__wrapper"
            inputClassName="search-city__input"
            placeholder={isFocused ? '' : cityName}
          />

          {isFocused && (
            <div className="search-city__results">
              {isPending ? (
                <div className="search-city__search-progress">
                  <ClipLoader size={18} color="#aeaeb7" />
                  <span>Search in Progress</span>
                </div>
              ) : data?.results ? (
                <ul className="search-city__results-list">
                  {data?.results.map((city) => {
                    return (
                      <li
                        onClick={(event) => {
                          event.stopPropagation();
                          handleCitySelect(city);
                        }}
                        className="search-city__results-item"
                        key={city.id}
                      >
                        <p className="search-city__results-city">{city.name}</p>
                        <p className="search-city__results-region">
                          {city.admin1}
                          {city.admin2 ? ', ' + city.admin2 : ''}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <>
                  <div className="search-city__current-city">Текущее: {cityName}</div>

                  <ul className="search-city__searched-cities-list">
                    {searchedCities.map((city) => (
                      <li
                        className="search-city__searched-cities-item"
                        onClick={() => {
                          setCityInfo(`${city.name}, ${city.country}`, city.lat, city.lng);
                          setIsFocused(false);
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
