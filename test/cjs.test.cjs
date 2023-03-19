const test = require('tehanu')(__filename)
const { strictEqual } = require('assert')
const {
  compileDateTimePattern, formatDateTime, formatDateTimeToParts
} = require('../lib/index.cjs')

test('exports named functions for formatting to strings', () => {
  strictEqual(typeof compileDateTimePattern, 'function')
  strictEqual(typeof formatDateTime, 'function')
  const format = compileDateTimePattern('G')
  format(new Date, 'cs')
  formatDateTime(new Date, 'G', 'cs', true)
})

test('exports named functions for formatting to parts', () => {
  strictEqual(typeof compileDateTimePattern, 'function')
  strictEqual(typeof formatDateTimeToParts, 'function')
  const format = compileDateTimePattern('G')
  format(new Date, 'cs')
  formatDateTimeToParts(new Date, 'G', 'cs', true)
})
