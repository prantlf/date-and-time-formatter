import tehanu from 'tehanu'
import { deepStrictEqual, strictEqual } from 'assert'
import { formatDateTime, formatDateTimeToParts } from '../lib/index.js'

const test = tehanu(import.meta.url)

const date = new Date(Date.UTC(1986, 3, 4, 10, 32, 55, 123))

test('month', () => {
  const result = formatDateTime(date, 'M MM MMM MMMM MMMMM')
  strictEqual(result, '4 04 Apr April A')
})

test('part', () => {
  const result = formatDateTimeToParts(date, 'M MMM')
  deepStrictEqual(result, [
    { type: 'month', value: 4 },
    { type: 'literal', value: ' ' },
    { type: 'month', value: 'Apr' }
  ])
})
