import tehanu from 'tehanu'
import { deepStrictEqual, strictEqual } from 'assert'
import { formatDateTime, formatDateTimeToParts } from '../lib/index.js'

const test = tehanu(import.meta.url)

const date = new Date(1986, 3, 4, 10, 32, 55, 123)

const offset = date.getTimezoneOffset()
const absoluteOffset = Math.abs(offset)
const hours = Math.floor(absoluteOffset / 60)
const hoursPadding = hours < 10 ? '0' : ''
const minutes = absoluteOffset % 60
const minutesPadding = minutes < 10 ? '0' : ''
const sign = offset > 0 ? '-' : '+'

const timezoneLong = sign + hoursPadding + hours + ':' + minutesPadding + minutes
const timezoneShort = timezoneLong.replace(':', '')
const timezoneWithOptionalMinutesShort =
  minutes === 0 ? sign + hoursPadding + hours : timezoneShort

const timezoneWithZ = offset === 0 ? 'Z' : timezoneLong
const timezoneWithZShort = offset === 0 ? 'Z' : timezoneShort
const timezoneWithOptionalMinutesAndZShort =
  offset === 0 ? 'Z' : timezoneWithOptionalMinutesShort

const timezoneGMTShort = minutes === 0 ? 'GMT' + sign + hours
  : 'GMT' + sign + hours + ':' + minutesPadding + minutes
const timezoneGMT = 'GMT' + timezoneLong

test('ISO-8601 with Z', () => {
  const result = formatDateTime(date, 'X XX XXX XXXX XXXXX')
  const expectedResult = [
    timezoneWithOptionalMinutesAndZShort,
    timezoneWithZShort,
    timezoneWithZ,
    timezoneWithZShort,
    timezoneWithZ
  ].join(' ')
  strictEqual(result, expectedResult)

  const { getTimezoneOffset } = Date.prototype

  Date.prototype.getTimezoneOffset = () => 0
  const resultZeroOffset = formatDateTime(date, 'X XX XXX XXXX XXXXX')
  strictEqual(resultZeroOffset, 'Z Z Z Z Z')

  Date.prototype.getTimezoneOffset = () => -480
  const resultPositiveOffset = formatDateTime(date, 'X XX XXX XXXX XXXXX')
  strictEqual(resultPositiveOffset, '+08 +0800 +08:00 +0800 +08:00')

  Date.prototype.getTimezoneOffset = () => 450
  const resultNegative30Offset = formatDateTime(date, 'X XX XXX XXXX XXXXX')
  strictEqual(resultNegative30Offset, '-0730 -0730 -07:30 -0730 -07:30')

  Date.prototype.getTimezoneOffset = getTimezoneOffset
})

test('ISO-8601 without Z', () => {
  const result = formatDateTime(date, 'x xx xxx xxxx xxxxx')
  const expectedResult = [
    timezoneWithOptionalMinutesShort,
    timezoneShort,
    timezoneLong,
    timezoneShort,
    timezoneLong
  ].join(' ')
  strictEqual(result, expectedResult)

  const { getTimezoneOffset } = Date.prototype

  Date.prototype.getTimezoneOffset = () => -480
  const resultPositiveOffset = formatDateTime(date, 'x xx xxx')
  strictEqual(resultPositiveOffset, '+08 +0800 +08:00')

  Date.prototype.getTimezoneOffset = () => 450
  const resultNegative30Offset = formatDateTime(date, 'x xx xxx')
  strictEqual(resultNegative30Offset, '-0730 -0730 -07:30')

  Date.prototype.getTimezoneOffset = getTimezoneOffset
})

test('GMT', () => {
  const result = formatDateTime(date, 'O OOOO')
  const expectedResult = [
    timezoneGMTShort,
    timezoneGMT
  ].join(' ')
  strictEqual(result, expectedResult)

  const { getTimezoneOffset } = Date.prototype

  Date.prototype.getTimezoneOffset = () => -480
  const resultPositiveOffset = formatDateTime(date, 'O OOOO')
  strictEqual(resultPositiveOffset, 'GMT+8 GMT+08:00')

  Date.prototype.getTimezoneOffset = () => 450
  const resultNegative30Offset = formatDateTime(date, 'O OOOO')
  strictEqual(resultNegative30Offset, 'GMT-7:30 GMT-07:30')

  Date.prototype.getTimezoneOffset = getTimezoneOffset
})

test('specific non-location', () => {
  const result = formatDateTime(date, 'z zz zzz zzzz')
  const expectedResult = [
    timezoneGMTShort,
    timezoneGMTShort,
    timezoneGMTShort,
    timezoneGMT,
  ].join(' ')
  strictEqual(result, expectedResult)
})

test('formats UTC dates', () => {
  const date = new Date(Date.UTC(2014, 3, 4, 5, 30))
  strictEqual(formatDateTime(date, 'H mm', undefined, true), '5 30')
  strictEqual(formatDateTime(date, 'x xx xxx', undefined, true), '+00 +0000 +00:00')
  strictEqual(formatDateTime(date, 'X XX XXX', undefined, true), 'Z Z Z')
  strictEqual(formatDateTime(date, 'zzz zzzz', undefined, true), 'GMT+0 GMT+00:00')
})

test('part', () => {
  const result = formatDateTimeToParts(date, 'Z z O X x')
  deepStrictEqual(result, [
    { type: 'timeZoneName', value: timezoneShort },
    { type: 'literal', value: ' ' },
    { type: 'timeZoneName', value: timezoneGMTShort },
    { type: 'literal', value: ' ' },
    { type: 'timeZoneName', value: timezoneGMTShort },
    { type: 'literal', value: ' ' },
    { type: 'timeZoneName', value: timezoneWithOptionalMinutesAndZShort },
    { type: 'literal', value: ' ' },
    { type: 'timeZoneName', value: timezoneWithOptionalMinutesShort }
  ])
})
