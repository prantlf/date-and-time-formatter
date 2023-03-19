import getPart from './parts.js'

const months = {}

function getMonths(locale, style) {
  const formatter = new Intl.DateTimeFormat(locale, { month: style, timeZone: 'UTC' })
  const months = []
  for (let i = 0; i < 12; ++i) {
    // 0 - 11 means January - December
    months.push(getPart(formatter, 'month', Date.UTC(1, i)))
  }
  return months
}

export default function getMonth(month, locale, style) {
  let names = months[locale]
  if (!names) {
    names = months[locale] = [
      getMonths(locale, 'short'),
      getMonths(locale, 'long'),
      getMonths(locale, 'narrow')
    ]
  }
  return names[style][month]
}
