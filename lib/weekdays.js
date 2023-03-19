import getPart from './parts.js'

const weekdays = {}
function getWeekdays(locale, style) {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: style, timeZone: 'UTC' })
  const days = []
  for (let i = 0; i < 7; ++i) {
    // 0 - 6 means Sunday - Saturday
    days.push(getPart(formatter, 'weekday', Date.UTC(1986, 3, 6 + i)))
  }
  return days
}

export default function getWeekday(day, locale, style) {
  let names = weekdays[locale]
  if (!names) {
    names = weekdays[locale] = [
      getWeekdays(locale, 'short'),
      getWeekdays(locale, 'long'),
      getWeekdays(locale, 'narrow')
    ]
  }
  return names[style][day]
}
