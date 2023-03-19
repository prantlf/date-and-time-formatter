import tehanu from 'tehanu'
import { deepStrictEqual, strictEqual } from 'assert'
import { formatDateTime, formatDateTimeToParts } from '../lib/index.js'

const test = tehanu(import.meta.url)

const date = new Date(Date.UTC(1986, 3, 4, 10, 32, 55, 123))

test('second', () => {
  const result = formatDateTime(date, 's ss')
  strictEqual(result, '55 55')
})

test('part', () => {
  const result = formatDateTimeToParts(date, 's')
  deepStrictEqual(result, [
    { type: 'second', value: 55 }
  ])
})
