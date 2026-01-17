type TempUnit = 'celsius' | 'fahrenheit';

export const TEMP_UNIT_MAPPING: Record<TempUnit, string> = Object.freeze({
  celsius: '°',
  fahrenheit: '°F',
} as const);
