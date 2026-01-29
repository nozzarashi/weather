import { useState } from 'react';
import type { City } from '../model/city';

export function useRecentlySearchedCities() {
  const [searchedCities, setSearchedCities] = useState<City[]>([]);

  const addSearchedCities = (city: City) => {
    setSearchedCities((prev) => {
      const filtered = prev.filter((c) => c.id !== city.id);

      return [
        {
          name: city.name,
          country: city.country,
          latitude: city.latitude,
          longitude: city.longitude,
          id: city.id,
          admin1: city.admin1,
        },

        ...filtered,
      ].slice(0, 5);
    });
  };

  return { searchedCities, addSearchedCities };
}
