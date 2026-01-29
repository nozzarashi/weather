import './search-city.css';
import searchIcon from '@/../assets/icons/icon-search.svg';
import { Input } from '@/06-shared/ui';
import { useGetCityCoordinates } from '../api/getCityCoordinates';
import { useSelectedCityStore } from '../model/selected-city-store';
import { ClipLoader } from 'react-spinners';
import { useQueryClient } from '@tanstack/react-query';
import { useMetricsStore } from '@/04-features/change-metrics';
import { useSearchInput } from '../lib/useSearchInput';
import { useRecentlySearchedCities } from '../lib/useRecentlySearchedCities';
import type { City } from '../model/city';

export function SearchCity({ className }: { className?: string }) {
  const rootClassName = `search-city ${className || ''}`.trim();
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
  const { data } = useGetCityCoordinates(debouncedValue);

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
      className={rootClassName}
    >
      <div className="search-city__input-wrapper">
        <div
          tabIndex={0}
          onBlur={(event) => {
            if (!containerRef.current?.contains(event.relatedTarget)) setIsFocused(false);
          }}
          ref={containerRef}
          className="search-city__input-container"
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
                        onClick={(e) => {
                          e.stopPropagation();
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
