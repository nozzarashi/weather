import { createDateFormatter } from './createDateFormatter'

export const timeFormatter = createDateFormatter({ hour: 'numeric', minute: 'numeric' })
