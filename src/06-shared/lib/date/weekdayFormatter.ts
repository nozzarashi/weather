import { createDateFormatter } from './createDateFormatter'

export const weekdayFormatter = (type: 'long' | 'short' | 'narrow') =>
  createDateFormatter({ weekday: type })
