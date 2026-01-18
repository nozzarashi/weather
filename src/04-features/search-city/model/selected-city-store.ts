import { create } from 'zustand';

interface SelectedCityStore {
  cityName: string;
  lat: number;
  lng: number;

  setCityInfo: (cityName: string, lat: number, lng: number) => void;
}

export const useSelectedCityStore = create<SelectedCityStore>((set) => {
  return {
    cityName: 'Moscow, Russia',
    lat: 55.75222,
    lng: 37.61556,

    setCityInfo: (cityName: string, lat: number, lng: number) => {
      return set({ cityName, lat, lng });
    },
  };
});
