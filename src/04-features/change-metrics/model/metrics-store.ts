import { create } from 'zustand';

type TempUnit = 'celsius' | 'fahrenheit';
type WindUnit = 'kmh' | 'mph';
type PrecipUnit = 'mm' | 'inch';

interface MetricsStore {
  tempUnit: TempUnit;
  windUnit: WindUnit;
  precipUnit: PrecipUnit;

  setTempUnit: (unit: TempUnit) => void;
  setWindUnit: (unit: WindUnit) => void;
  setPrecipUnit: (unit: PrecipUnit) => void;
}

export const useMetricsStore = create<MetricsStore>((set) => {
  return {
    tempUnit: 'celsius',
    windUnit: 'kmh',
    precipUnit: 'mm',

    setTempUnit: (unit: TempUnit) => set({ tempUnit: unit }),
    setWindUnit: (unit: WindUnit) => set({ windUnit: unit }),
    setPrecipUnit: (unit: PrecipUnit) => set({ precipUnit: unit }),
  };
});
