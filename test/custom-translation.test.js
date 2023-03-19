import tehanu from 'tehanu'
import { strictEqual } from 'assert'
import { formatDateTime } from '../lib/index.js'

const test = tehanu(import.meta.url)

test('AD, morning', () => {
  const date = new Date(Date.UTC(1986, 3, 6, 5, 30))
  const translator = {
    eras: [['', 'G2']],
    months: [['', '', '', 'M4']],
    weekdays: [['D1']],
    meridians: [['A1']],
    dayPeriods: [['', '', 'P3']]
  }
  strictEqual(formatDateTime(date, 'G MMM E a B', translator, true), 'G2 M4 D1 A1 P3')
})

test('BC, afternoon', () => {
  const date = new Date(Date.UTC(-1, 3, 6, 15, 30))
  date.setUTCFullYear(-1)
  const translator = {
    eras: [['G1']],
    months: [['', '', '', 'M4']],
    weekdays: [['', '', 'D3']],
    meridians: [['', 'A2']],
    dayPeriods: [['', '', '', '', 'P5']]
  }
  strictEqual(formatDateTime(date, 'G MMM E a B', translator, true), 'G1 M4 D3 A2 P5')
})

test('evening', () => {
  const date = new Date(Date.UTC(1986, 3, 6, 18, 30))
  const translator = {
    dayPeriods: [['', '', '', '', '', 'P6']]
  }
  strictEqual(formatDateTime(date, 'B', translator, true), 'P6')
})

test('night', () => {
  const date = new Date(Date.UTC(1986, 3, 6, 21, 30))
  const translator = {
    dayPeriods: [['P1']]
  }
  strictEqual(formatDateTime(date, 'B', translator, true), 'P1')
})

test('noon', () => {
  const date = new Date(Date.UTC(1986, 3, 6, 12))
  const translator = {
    dayPeriods: [['', '', '', 'P4']]
  }
  strictEqual(formatDateTime(date, 'B', translator, true), 'P4')
})

test('midnight', () => {
  const date = new Date(Date.UTC(1986, 3, 6))
  const translator = {
    dayPeriods: [['', 'P2']]
  }
  strictEqual(formatDateTime(date, 'B', translator, true), 'P2')
})
