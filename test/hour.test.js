import tehanu from 'tehanu'
import { deepStrictEqual, strictEqual } from 'assert'
import { formatDateTime, formatDateTimeToParts } from '../lib/index.js'

const test = tehanu(import.meta.url)

test('hour [1-12]', () => {
  const result = formatDateTime(
    new Date(2018, 0, 1, 0, 0, 0, 0),
    'h hh'
  )
  strictEqual(result, '12 12')
})

test('hour [0-23]', () => {
  const result = formatDateTime(
    new Date(2018, 0, 1, 0, 0, 0, 0),
    'H HH'
  )
  strictEqual(result, '0 00')
})

test('hour [0-11]', () => {
  const result = formatDateTime(
    new Date(2018, 0, 1, 0, 0, 0, 0),
    'K KK'
  )
  strictEqual(result, '0 00')
})

test('hour [1-24]', () => {
  const result = formatDateTime(
    new Date(2018, 0, 1, 0, 0, 0, 0),
    'k kk'
  )
  strictEqual(result, '24 24')
})

test('part', () => {
  const result = formatDateTimeToParts(new Date(2018, 0, 1, 1), 'h H k K')
  deepStrictEqual(result, [
    { type: 'hour', value: 1 },
    { type: 'literal', value: ' ' },
    { type: 'hour', value: 1 },
    { type: 'literal', value: ' ' },
    { type: 'hour', value: 1 },
    { type: 'literal', value: ' ' },
    { type: 'hour', value: 1 }
  ])
})
