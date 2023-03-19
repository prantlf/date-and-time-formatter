import tehanu from 'tehanu'
import { deepStrictEqual, strictEqual } from 'assert'
import { formatDateTime, formatDateTimeToParts } from '../lib/index.js'

const test = tehanu(import.meta.url)

const date = new Date(Date.UTC(1986, 3, 4, 10, 32, 55, 123))

test('year AD', () => {
  const result = formatDateTime(date, 'y yy yyy yyyy yyyyy')
  strictEqual(result, '1986 86 1986 1986 01986')
})

test('year 1 BC formats as 1', () => {
  const date = new Date(0)
  date.setFullYear(0, 0, 1)
  date.setHours(0, 0, 0, 0)
  const result = formatDateTime(date, 'y')
  strictEqual(result, '1')
})

test('year 2 BC formats as 2', () => {
  const date = new Date(0)
  date.setFullYear(-1, 0, 1)
  date.setHours(0, 0, 0, 0)
  const result = formatDateTime(date, 'y')
  strictEqual(result, '2')
})

test('part', () => {
  const result = formatDateTimeToParts(date, 'y')
  deepStrictEqual(result, [
    { type: 'year', value: 1986 }
  ])
})
