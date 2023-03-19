import {
  compileDateTimePattern, formatDateTime, Translator, Formatter,
  formatDateTimeToParts, FormatterToParts, FormattedPart
} from '../lib/index.js'

type testCallback = () => void
declare function test (label: string, callback: testCallback): void

test('Type declarations for TypeScript', () => {
  const translator: Translator = {
    eras: [
      ['', ''],
      ['', ''],
      ['', '']
    ],
    months: [
      ['', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '']
    ],
    weekdays: [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '']
    ],
    meridians: [
      ['', ''],
      ['', '']
    ],
    dayPeriods: [
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', '']
    ]
  }

  const format: Formatter = compileDateTimePattern('G')
  let _result: string
  _result = format(new Date())
  _result = format(new Date(), 'cs')
  _result = format(new Date(), 'cs', true)
  _result = format(new Date(), translator)
  _result = format(new Date(), translator, true)

  _result = formatDateTime(new Date(), 'G')
  _result = formatDateTime(new Date(), 'G', 'cs')
  _result = formatDateTime(new Date(), 'G', 'cs', true)
  _result = formatDateTime(new Date(), 'G', translator, true)

  const formatToParts: FormatterToParts = format.formatToParts
  let _parts: FormattedPart[]
  _parts = formatToParts(new Date())
  _parts = formatToParts(new Date(), 'cs')
  _parts = formatToParts(new Date(), 'cs', true)
  _parts = formatToParts(new Date(), translator)
  _parts = formatToParts(new Date(), translator, true)

  _parts = formatDateTimeToParts(new Date(), 'G')
  _parts = formatDateTimeToParts(new Date(), 'G', 'cs')
  _parts = formatDateTimeToParts(new Date(), 'G', 'cs', true)
  _parts = formatDateTimeToParts(new Date(), 'G', translator, true)
})
