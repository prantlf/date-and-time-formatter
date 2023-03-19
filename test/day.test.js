import tehanu from 'tehanu'
import { deepStrictEqual, strictEqual } from 'assert'
import { formatDateTime, formatDateTimeToParts } from '../lib/index.js'

const test = tehanu(import.meta.url)

const date = new Date(Date.UTC(1986, 3, 4, 10, 32, 55, 123))

test('day', () => {
  const result = formatDateTime(date, 'd dd')
  strictEqual(result, '4 04')
})

test('part', () => {
  const result = formatDateTimeToParts(date, 'd')
  deepStrictEqual(result, [
    { type: 'day', value: 4 }
  ])
})
