import tehanu from 'tehanu'
import { deepStrictEqual, strictEqual } from 'assert'
import { formatDateTime, formatDateTimeToParts } from '../lib/index.js'

const test = tehanu(import.meta.url)

const date = new Date(Date.UTC(1986, 3, 4, 10, 32, 55, 123))

test('fractional seconds', () => {
  const result = formatDateTime(date, 'S SS SSS SSSS')
  strictEqual(result, '1 12 123 1230')
})

test('part', () => {
  const result = formatDateTimeToParts(date, 'S')
  deepStrictEqual(result, [
    { type: 'fractionalSecond', value: 1 }
  ])
})
