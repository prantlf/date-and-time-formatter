import tehanu from 'tehanu'
import { deepStrictEqual, strictEqual } from 'assert'
import { formatDateTime, formatDateTimeToParts } from '../lib/index.js'

const test = tehanu(import.meta.url)

const date = new Date(Date.UTC(1986, 3, 4, 10, 32, 55, 123))

test('day of week', () => {
  const result = formatDateTime(date, 'E EE EEE EEEE EEEEE')
  strictEqual(result, 'Fri Fri Fri Friday F')
})

test('part', () => {
  const result = formatDateTimeToParts(date, 'E')
  deepStrictEqual(result, [
    { type: 'weekday', value: 'Fri' }
  ])
})
