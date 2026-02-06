import { useDebounce } from '@/06-shared/lib';
import { useEffect, useRef, useState } from 'react';
import { useWeatherForecast } from '../api/use-weather-forecast';

const DEBOUNCE_DELAY = 300;

export function useSearchInput() {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { isPending } = useWeatherForecast();
  const debouncedValue = useDebounce(inputValue, DEBOUNCE_DELAY);

  const containerRef = useRef<HTMLDivElement>(null);
  const prevIsPending = useRef(false);
  const isUserSelectedCity = useRef(false);

  useEffect(() => {
    if (prevIsPending.current && isPending === false && isUserSelectedCity.current) {
      setIsFocused(false);
      setInputValue('');
      isUserSelectedCity.current = false;
    }

    prevIsPending.current = isPending;
  }, [isPending]);

  return {
    inputValue,
    setInputValue,
    isFocused,
    setIsFocused,
    debouncedValue,
    containerRef,
    isPending,
    isUserSelectedCity,
  };
}
