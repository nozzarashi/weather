import { useState } from 'react'
import type { City } from '../model/city'

export function useRecentlySearchedCities() {
  const [searchedCities, setSearchedCities] = useState<City[]>([])

  const addSearchedCities = (city: City) => {
    setSearchedCities((prevCities) =>
      [
        {
          name: city.name,
          country: city.country,
          latitude: city.latitude,
          longitude: city.longitude,
          id: city.id,
          admin1: city.admin1,
        },

        ...prevCities.filter((prevCity) => prevCity.id !== city.id),
      ].slice(0, 5),
    )
  }

  return { searchedCities, addSearchedCities }
}
