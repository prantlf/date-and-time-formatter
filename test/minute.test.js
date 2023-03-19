import tehanu from 'tehanu'
import { deepStrictEqual, strictEqual } from 'assert'
import { formatDateTime, formatDateTimeToParts } from '../lib/index.js'

const test = tehanu(import.meta.url)

const date = new Date(Date.UTC(1986, 3, 4, 10, 32, 55, 123))

test('minute', () => {
  const result = formatDateTime(date, 'm mm')
  strictEqual(result, '32 32')
})

test('part', () => {
  const result = formatDateTimeToParts(date, 'm')
  deepStrictEqual(result, [
    { type: 'minute', value: 32 }
  ])
})
