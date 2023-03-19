import getPart from './parts.js'

const meridians = {}

function getMeridians(locale, style) {
  const formatter = new Intl.DateTimeFormat(locale, {
    timeStyle: style, hour12: true, timeZone: 'UTC' })
  return [
    getPart(formatter, 'dayPeriod', Date.UTC(1, 0, 1, 1)), // AM
    getPart(formatter, 'dayPeriod', Date.UTC(1, 0, 1, 13)) // PM
  ]
}

export default function getMeridiem(hour, locale, style) {
  let names = meridians[locale]
  if (!names) {
    names = meridians[locale] = [
      getMeridians(locale, 'short'),
      getMeridians(locale, 'long')
    ]
  }
  return names[style][hour >= 12 ? 1 : 0]
}
