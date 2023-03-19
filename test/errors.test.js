import tehanu from 'tehanu'
import { throws } from 'assert'
import { formatDateTime } from '../lib/index.js'

const test = tehanu(import.meta.url)

const date = new Date(Date.UTC(1986, 3, 4, 10, 32, 55, 123))

test('throws an error if the format string contains an unescaped latin alphabet character', () => {
  throws(formatDateTime.bind(null, date, 'yyyy-MM-dd-nnnn'), RangeError)
})

test('throws an error if the format string contains unbalanced apostrophes', () => {
  throws(formatDateTime.bind(null, date, "'yyyy"), SyntaxError)
})
