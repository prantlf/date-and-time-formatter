import tehanu from 'tehanu'
import { deepStrictEqual, strictEqual } from 'assert'
import { formatDateTime, formatDateTimeToParts } from '../lib/index.js'

const test = tehanu(import.meta.url)

const date = new Date(1986, 3, 4, 10, 32, 55, 123)

test('short AM', () => {
  const result = formatDateTime(
    new Date(2018, 0, 1, 0, 0, 0, 0),
    'a aa aaa aaaa aaaaa'
  )
  strictEqual(result, 'AM AM AM AM AM') // should be 'AM AM am a.m. a'
})

test('short PM', () => {
  const result = formatDateTime(
    new Date(1986, 3, 6, 13, 0, 0, 900),
    'a aa aaa aaaa aaaaa'
  )
  strictEqual(result, 'PM PM PM PM PM') // should be 'PM PM pm p.m. p'
})

test('short 12 PM', () => {
  const date = new Date(1986, 3, 4, 12, 0, 0, 900)
  strictEqual(formatDateTime(date, 'h H K k a'), '12 12 0 12 PM')
})

test('short 12 AM', () => {
  const date = new Date(1986, 3, 6, 0, 0, 0, 900)
  strictEqual(formatDateTime(date, 'h H K k a'), '12 0 0 24 AM')
})

test('long AM, noon', () => {
  const result = formatDateTime(
    new Date(1986, 3, 6, 2, 0, 0, 900),
    'b bb bbb bbbb bbbbb'
  )
  strictEqual(result, 'AM AM AM AM AM') // should be 'AM AM am a.m. a'
})

test('long PM, midnight', () => {
  const result = formatDateTime(
    new Date(1986, 3, 6, 13, 0, 0, 900),
    'b bb bbb bbbb bbbbb'
  )
  strictEqual(result, 'PM PM PM PM PM') // should be 'PM PM pm p.m. p'
})

test('long 12 PM', () => {
  const date = new Date(1986, 3, 4, 12, 0, 0, 900)
  strictEqual(
    formatDateTime(date, 'b bb bbb bbbb bbbbb'),
    'PM PM PM PM PM' // should be 'noon noon noon noon n'
  )
})

test('long 12 AM', () => {
  const date = new Date(1986, 3, 6, 0, 0, 0, 900)
  strictEqual(
    formatDateTime(date, 'b bb bbb bbbb bbbbb'),
    'AM AM AM AM AM' // should be 'midnight midnight midnight midnight mi'
  )
})

test('flexible day periods', () => {
  const result = formatDateTime(date, 'B, BB, BBB, BBBB, BBBBB', undefined, true)
  strictEqual(result, 'in the morning, in the morning, in the morning, in the morning, in the morning')
})

test('flexible 12 PM', () => {
  const date = new Date(1986, 3, 4, 12, 0, 0, 900)
  strictEqual(formatDateTime(date, 'h B'), '12 noon')
})

test('flexible 1 PM', () => {
  const date = new Date(1986, 3, 4, 13, 0, 0, 900)
  strictEqual(formatDateTime(date, 'h B'), '1 in the afternoon')
})

test('flexible 6 PM', () => {
  const date = new Date(1986, 3, 6, 18, 0, 0, 900)
  strictEqual(formatDateTime(date, 'h B'), '6 in the evening')
})

test('flexible 9 PM', () => {
  const date = new Date(1986, 3, 6, 21, 0, 0, 900)
  strictEqual(formatDateTime(date, 'h B'), '9 at night')
})

test('flexible 12 AM', () => {
  const date = new Date(1986, 3, 6, 0, 0, 0, 900)
  strictEqual(formatDateTime(date, 'h B'), '12 at night') // should be midnight
})

test('flexible 4 AM', () => {
  const date = new Date(1986, 3, 6, 4, 0, 0, 900)
  strictEqual(formatDateTime(date, 'h B'), '4 in the morning')
})

test('part', () => {
  const result = formatDateTimeToParts(date, 'a b B')
  deepStrictEqual(result, [
    { type: 'dayPeriod', value: 'AM' },
    { type: 'literal', value: ' ' },
    { type: 'dayPeriod', value: 'AM' },
    { type: 'literal', value: ' ' },
    { type: 'dayPeriod', value: 'in the morning' }
  ])
})
