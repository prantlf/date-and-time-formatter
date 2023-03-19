import getPart from './parts.js'

const dayPeriods = {}

function getDayPeriods(locale, style) {
  const formatter = new Intl.DateTimeFormat(locale, { dayPeriod: style, timeZone: 'UTC' })
  return [
    getPart(formatter, 'dayPeriod', Date.UTC(1, 0, 1, 21)), // night
    getPart(formatter, 'dayPeriod', Date.UTC(1, 0, 1, 0)),  // midnight
    getPart(formatter, 'dayPeriod', Date.UTC(1, 0, 1, 6)),  // morning
    getPart(formatter, 'dayPeriod', Date.UTC(1, 0, 1, 12)), // noon
    getPart(formatter, 'dayPeriod', Date.UTC(1, 0, 1, 13)), // afternoon
    getPart(formatter, 'dayPeriod', Date.UTC(1, 0, 1, 18))  // evening
  ]
}

export default function getDayPeriod(hour, locale, style) {
  let names = dayPeriods[locale]
  if (!names) {
    names = dayPeriods[locale] = [
      getDayPeriods(locale, 'short'),
      getDayPeriods(locale, 'long'),
      getDayPeriods(locale, 'narrow')
    ]
  }
  return names[style][
    hour > 20 ? 0 : hour > 17 ? 5 : hour > 12 ? 4 :
      hour === 12 ? 3 : hour > 0 ? 2 : 1
  ]
}
