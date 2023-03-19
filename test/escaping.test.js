import tehanu from 'tehanu'
import { deepStrictEqual, strictEqual } from 'assert'
import { formatDateTime, formatDateTimeToParts } from '../lib/index.js'

const test = tehanu(import.meta.url)

test('escapes characters between the single quote characters', () => {
  const date = new Date(Date.UTC(1986, 3, 4, 10, 32, 55, 123))
  const result = formatDateTime(date, "'yyyy-'MM-dd'THH:mm:ss.SSSX' yyyy-'MM-dd'")
  strictEqual(result, "yyyy-04-04THH:mm:ss.SSSX 1986-MM-dd")
})

test('two single quote characters are transformed into a "real" single quote', () => {
  const date = new Date(2014, 3, 4, 5)
  strictEqual(formatDateTime(date, "''h 'o''clock'''"), "'5 o'clock'")
})

test('accepts new line character', () => {
  const date = new Date(2014, 3, 4, 5)
  strictEqual(
    formatDateTime(date, "yyyy-MM-dd'\n'HH:mm:ss."),
    '2014-04-04\n05:00:00.'
  )
})

test('concatenates literals in parts', () => {
  const date = new Date(2014, 3, 4, 5)
  deepStrictEqual(formatDateTimeToParts(date, "''h 'o''clock'''"), [
    { type: 'literal', value: "'" },
    { type: 'hour', value: 5 },
    { type: 'literal', value: " o'clock'" }
  ])
})
