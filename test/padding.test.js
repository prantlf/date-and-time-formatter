import tehanu from 'tehanu'
import { strictEqual } from 'assert'
import { formatDateTime } from '../lib/index.js'

const test = tehanu(import.meta.url)

test('pads single-digits with one zero', () => {
  const date = new Date(1, 2, 3, 4, 5, 6, 70)
  date.setFullYear(1)
  strictEqual(formatDateTime(date, 'yy MM dd HH mm ss SS'), '01 03 03 04 05 06 07')
})

test('pads double-digits with one zero', () => {
  const date = new Date(10, 11, 30, 14, 50, 36, 700)
  date.setFullYear(10)
  strictEqual(formatDateTime(date, 'yy MM dd HH mm ss SS'), '10 12 30 14 50 36 70')
})

test('pads single-digits with two zeros', () => {
  const date = new Date(1, 2, 3, 4, 5, 6, 7)
  date.setFullYear(1)
  strictEqual(formatDateTime(date, 'yyy SSS'), '001 007')
})

test('pads double-digits with two zeros', () => {
  const date = new Date(10, 2, 3, 4, 5, 6, 70)
  date.setFullYear(10)
  strictEqual(formatDateTime(date, 'yyy SSS'), '010 070')
})

test('pads triple-digits with two zeros', () => {
  const date = new Date(100, 2, 3, 4, 5, 6, 700)
  date.setFullYear(100)
  strictEqual(formatDateTime(date, 'yyy SSS'), '100 700')
})

test('pads single-digits with three zeros', () => {
  const date = new Date()
  date.setFullYear(1)
  strictEqual(formatDateTime(date, 'yyyy'), '0001')
})

test('pads double-digits with three zeros', () => {
  const date = new Date()
  date.setFullYear(10)
  strictEqual(formatDateTime(date, 'yyyy'), '0010')
})

test('pads triple-digits with three zeros', () => {
  const date = new Date()
  date.setFullYear(100)
  strictEqual(formatDateTime(date, 'yyyy'), '0100')
})

test('pads quadruple-digits with three zeros', () => {
  const date = new Date()
  date.setFullYear(1000)
  strictEqual(formatDateTime(date, 'yyyy'), '1000')
})

test('pads single-digits with four zeros', () => {
  const date = new Date()
  date.setFullYear(1)
  strictEqual(formatDateTime(date, 'yyyyy'), '00001')
})

test('pads double-digits with four zeros', () => {
  const date = new Date()
  date.setFullYear(10)
  strictEqual(formatDateTime(date, 'yyyyy'), '00010')
})

test('pads triple-digits with four zeros', () => {
  const date = new Date()
  date.setFullYear(100)
  strictEqual(formatDateTime(date, 'yyyyy'), '00100')
})

test('pads quadruple-digits with four zeros', () => {
  const date = new Date()
  date.setFullYear(1000)
  strictEqual(formatDateTime(date, 'yyyyy'), '01000')
})

test('pads quintuple-digits with four zeros', () => {
  const date = new Date()
  date.setFullYear(10000)
  strictEqual(formatDateTime(date, 'yyyyy'), '10000')
})
