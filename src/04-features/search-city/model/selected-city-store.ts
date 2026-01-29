import { create } from 'zustand';

interface SelectedCityStore {
  cityName: string;
  latitude: number;
  longitude: number;
  setCityInfo: (cityName: string, latitude: number, longitude: number) => void;
}

export const useSelectedCityStore = create<SelectedCityStore>((set) => {
  return {
    cityName: 'Moscow, Russia',
    latitude: 55.75222,
    longitude: 37.61556,

    setCityInfo: (cityName: string, latitude: number, longitude: number) => {
      return set({ cityName, latitude, longitude });
    },
  };
});
