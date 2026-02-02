import { create } from 'zustand'

type TempUnit = 'celsius' | 'fahrenheit'
type WindUnit = 'kmh' | 'mph'
type PrecipitationUnit = 'mm' | 'inch'

interface MetricsStore {
  tempUnit: TempUnit
  windUnit: WindUnit
  precipitationUnit: PrecipitationUnit

  setTempUnit: (unit: TempUnit) => void
  setWindUnit: (unit: WindUnit) => void
  setPrecipitationUnit: (unit: PrecipitationUnit) => void
}

export const useMetricsStore = create<MetricsStore>((set) => {
  return {
    tempUnit: 'celsius',
    windUnit: 'kmh',
    precipitationUnit: 'mm',

    setTempUnit: (unit: TempUnit) => set({ tempUnit: unit }),
    setWindUnit: (unit: WindUnit) => set({ windUnit: unit }),
    setPrecipitationUnit: (unit: PrecipitationUnit) => set({ precipitationUnit: unit }),
  }
})
