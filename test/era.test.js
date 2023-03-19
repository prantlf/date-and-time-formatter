import tehanu from 'tehanu'
import { deepStrictEqual, strictEqual } from 'assert'
import { formatDateTime, formatDateTimeToParts } from '../lib/index.js'

const test = tehanu(import.meta.url)

const date = new Date(Date.UTC(1986, 3, 4, 10, 32, 55, 123))

test('AD', () => {
  const result = formatDateTime(date, 'G GG GGG GGGG GGGGG')
  strictEqual(result, 'AD AD AD Anno Domini A')
})

test('BC', () => {
  const date = new Date()
  date.setFullYear(-1, 0, 1)
  const result = formatDateTime(date, 'G GG GGG GGGG GGGGG')
  strictEqual(result, 'BC BC BC Before Christ B')
})

test('part', () => {
  const result = formatDateTimeToParts(date, 'G')
  deepStrictEqual(result, [
    { type: 'era', value: 'AD' }
  ])
})
