import { useEffect, useState } from 'react';

export function useDebounce(currentValue: string, ms: number) {
  const [value, setValue] = useState(currentValue);

  useEffect(() => {
    const id = setTimeout(() => {
      setValue(currentValue);
    }, ms);

    return () => {
      clearTimeout(id);
    };
  }, [currentValue, ms]);

  return value;
}
