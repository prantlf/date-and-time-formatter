import getPart from './parts.js'

const eras = {}

function getEras(locale, style) {
  const formatter = new Intl.DateTimeFormat(locale, { era: style, timeZone: 'UTC' })
  return [
    getPart(formatter, 'era', Date.UTC(-1)), // BC
    getPart(formatter, 'era', Date.UTC(1))   // AD
  ]
}

export default function getEra(year, locale, style) {
  let names = eras[locale]
  if (!names) {
    names = eras[locale] = [
      getEras(locale, 'short'),
      getEras(locale, 'long'),
      getEras(locale, 'narrow')
    ]
  }
  return names[style][year > 0 ? 1 : 0]
}
