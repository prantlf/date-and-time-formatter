import getEraIntl from './eras.js'
import getMonthIntl from './months.js'
import getWeekdayIntl from './weekdays.js'
import getMeridiemIntl from './meridiem.js'
import getDayPeriodIntl from './day-periods.js'
import { pad2, pad3, pad4, pad5 } from './pads.js'
import {
  shortNum, middleNum, longNum, shortZ, middleZ, longZ, shortGmt, longGmt
} from './time-zones.js'

const getYear = (date) => {
  const year = date.getFullYear()
  return year > 0 ? year : -(year - 1)
}

// Shared short formatters

const shortG = (date, { getEra }) => getEra(date.getFullYear(), 0)
const shortE = (date, { getWeekday }) => getWeekday(date.getDay(), 0)
const shortA = (date, { getMeridiem }) => getMeridiem(date.getHours(), 0)
const longA = (date, { getMeridiem }) => getMeridiem(date.getHours(), 1)
const shortB = (date, { getDayPeriod }) => getDayPeriod(date.getHours(), 0)

// Token formatters

const tokens = {
  G: shortG,
  GG: shortG,
  GGG: shortG,
  GGGG: (date, { getEra }) => getEra(date.getFullYear(), 1),
  GGGGG: (date, { getEra }) => getEra(date.getFullYear(), 2),
  y: date => getYear(date),
  yy: date => pad2(getYear(date) % 100),
  yyy: date => pad3(getYear(date)),
  yyyy: date => pad4(getYear(date)),
  yyyyy: date => pad5(getYear(date)),
  M: date => date.getMonth() + 1,
  MM: date => pad2(date.getMonth() + 1),
  MMM: (date, { getMonthName }) => getMonthName(date.getMonth(), 0),
  MMMM: (date, { getMonthName }) => getMonthName(date.getMonth(), 1),
  MMMMM: (date, { getMonthName }) => getMonthName(date.getMonth(), 2),
  E: shortE,
  EE: shortE,
  EEE: shortE,
  EEEE: (date, { getWeekday }) => getWeekday(date.getDay(), 1),
  EEEEE: (date, { getWeekday }) => getWeekday(date.getDay(), 2),
  d: date => date.getDate(),
  dd: date => pad2(date.getDate()),
  h: date => date.getHours() % 12 || 12,
  hh: date => pad2(date.getHours() % 12 || 12),
  H: date => date.getHours(),
  HH: date => pad2(date.getHours()),
  K: date => date.getHours() % 12,
  KK: date => pad2(date.getHours() % 12),
  k: date => date.getHours() % 24 || 24,
  kk: date => pad2(date.getHours() % 24 || 24),
  m: date => date.getMinutes(),
  mm: date => pad2(date.getMinutes()),
  s: date => date.getSeconds(),
  ss: date => pad2(date.getSeconds()),
  S: date => Math.trunc(date.getMilliseconds() / 100),
  SS: date => pad2(Math.trunc(date.getMilliseconds() / 10)),
  SSS: date => pad3(date.getMilliseconds()),
  SSSS: date => `${pad3(date.getMilliseconds())}0`,
  a: shortA,
  aa: shortA,
  aaa: shortA,
  aaaa: longA,
  aaaaa: shortA,
  b: shortA,
  bb: shortA,
  bbb: shortA,
  bbbb: longA,
  bbbbb: shortA,
  B: shortB,
  BB: shortB,
  BBB: shortB,
  BBBB: (date, { getDayPeriod }) => getDayPeriod(date.getHours(), 1),
  BBBBB: (date, { getDayPeriod }) => getDayPeriod(date.getHours(), 2),
  Z: middleNum,
  ZZ: middleNum,
  ZZZ: middleNum,
  ZZZZ: longGmt,
  ZZZZZ: longZ,
  z: shortGmt,
  zz: shortGmt,
  zzz: shortGmt,
  zzzz: longGmt,
  O: shortGmt,
  OOOO: longGmt,
  X: shortZ,
  XX: middleZ,
  XXX: longZ,
  XXXX: middleZ,
  XXXXX: longZ,
  x: shortNum,
  xx: middleNum,
  xxx: longNum,
  xxxx: middleNum,
  xxxxx: longNum
}

tokens.G.type = tokens.GG.type = tokens.GGG.type = tokens.GGGG.type = tokens.GGGGG.type = 'era'
tokens.y.type = tokens.yy.type = tokens.yyy.type = tokens.yyyy.type = tokens.yyyyy.type = 'year'
tokens.M.type = tokens.MM.type = tokens.MMM.type = tokens.MMMM.type = tokens.MMMMM.type = 'month'
tokens.E.type = tokens.EE.type = tokens.EEE.type = tokens.EEEE.type = tokens.EEEEE.type = 'weekday'
tokens.d.type = tokens.dd.type = 'day'
tokens.h.type = tokens.hh.type = tokens.H.type = tokens.HH.type =
  tokens.K.type = tokens.KK.type = tokens.k.type = tokens.kk.type = 'hour'
tokens.m.type = tokens.mm.type = 'minute'
tokens.s.type = tokens.ss.type = 'second'
tokens.S.type = tokens.SS.type = tokens.SSS.type = tokens.SSSS.type = 'fractionalSecond'
tokens.a.type = tokens.aa.type = tokens.aaa.type = tokens.aaaa.type = tokens.aaaaa.type = 
  tokens.b.type = tokens.bb.type = tokens.bbb.type = tokens.bbbb.type = tokens.bbbbb.type = 
  tokens.B.type = tokens.BB.type = tokens.BBB.type = tokens.BBBB.type = tokens.BBBBB.type = 'dayPeriod'
tokens.Z.type = tokens.ZZ.type = tokens.ZZZ.type = tokens.ZZZZ.type = tokens.ZZZZZ.type = 
  tokens.z.type = tokens.zz.type = tokens.zzz.type = tokens.zzzz.type = 
  tokens.O.type = tokens.OOOO.type = 
  tokens.X.type = tokens.XX.type = tokens.XXX.type = tokens.XXXX.type = tokens.XXXXX.type = 
  tokens.x.type = tokens.xx.type = tokens.xxx.type = tokens.xxxx.type = tokens.xxxxx.type = 'timeZoneName'

const tokenMap = new Map(Object.entries(tokens))

// Translators of locale-specific texts

const translators = {}

function getTranslator(locale) {
  let translator = translators[locale]
  if (!translator) {
    translator = translators[locale] = {
      getEra: (year, style) => getEraIntl(year, locale, style),
      getMonthName: (month, style) => getMonthIntl(month, locale, style),
      getWeekday: (day, style) => getWeekdayIntl(day, locale, style),
      getMeridiem: (hour, style) => getMeridiemIntl(hour, locale, style),
      getDayPeriod: (hour, style) => getDayPeriodIntl(hour, locale, style)
    }
  }
  return translator
}

// Pattern compiler

function createLiteral(literal) {
  const formatter = () => literal
  formatter.type = 'literal'
  return formatter
}

function pushLiteral(parts, literal) {
  let { length } = parts
  if (length > 0) {
    const last = parts[--length]
    if (last.type === 'literal') {
      parts[length] = createLiteral(last() + literal)
      return
    }
  }
  parts.push(createLiteral(literal))
}

function prepareForFormat(date, locale, utc) {
  // Let the local Date getter be used in the UTC mode too
  if (utc) {
    const offset = date.getTimezoneOffset() * 60 * 1000
    date = new Date(date.getTime() + offset)
  }
  // Use translations done by Intl.DateTimeFormat or custom texts
  let translator
  if (typeof locale === 'string') {
    translator = getTranslator(locale)
  } else {
    const { eras, months, weekdays, meridians, dayPeriods } = locale
    translator = {
      getEra: (year, style) => eras[style][year > 0 ? 1 : 0],
      getMonthName: (month, style) => months[style][month],
      getWeekday: (day, style) => weekdays[style][day],
      getMeridiem: (hour, style) => meridians[style][hour >= 12 ? 1 : 0],
      getDayPeriod: (hour, style) => dayPeriods[style][
        hour > 20 ? 0 : hour > 17 ? 5 : hour > 12 ? 4 :
          hour === 12 ? 3 : hour > 0 ? 2 : 1
      ]
    }
  }
  return { date, translator }
}

export function compileDateTimePattern(pattern) {
  const formatters = []
  for (let i = 0, l = pattern.length; i < l;) {
    let char = pattern[i]
    // Letters are formatting tokens
    if (char >= 'A' && char <= 'Z' || char >= 'a' && char <= 'z') {
      // Multiple occurrences of the same letter are a single token
      const start = i
      do {
        char = pattern[++i]
      } while (char >= 'A' && char <= 'Z' || char >= 'a' && char <= 'z')
      const token = pattern.substring(start, i)
      const formatter = tokenMap.get(token)
      if (!formatter) throw new RangeError(`invalid token: "${token}"`)
      formatters.push(formatter)
    } else if (char === '\'') {
      // Apostrophes surround a literal to be formatted as-is
      const start = i + 1
      for(;;) {
        if (++i === l) throw new SyntaxError('missing trailing "\'"')
        char = pattern[i]
        if (char === '\'') {
          // An apostrophe can be escaped by doubling
          if (pattern[i + 1] === '\'') {
            ++i
            continue
          }
          break
        }
      }
      // An apostrophe can be escaped by doubling
      const literal = start === i ? '\'' : pattern.substring(start, i).replaceAll('\'\'', '\'')
      pushLiteral(formatters, literal)
      ++i
    } else {
      // Punctuation is formatted as-is
      const start = i
      do {
        if (++i === l) break
        char = pattern[i]
      } while (!(char >= 'A' && char <= 'Z' || char >= 'a' && char <= 'z' || char === '\''))
      const punctuation = pattern.substring(start, i)
      pushLiteral(formatters, punctuation)
    }
  }

  const format = (date, locale = 'en-US', utc) => {
    const { date: input, translator } = prepareForFormat(date, locale, utc)
    // Concatenate output of token formatters
    let result = ''
    for (const formatter of formatters) {
      result += formatter(input, translator, utc)
    }
    return result
  }

  format.formatToParts = (date, locale = 'en-US', utc) => {
    const { date: input, translator } = prepareForFormat(date, locale, utc)
    // Collect output of token formatters
    const result = []
    for (const formatter of formatters) {
      result.push({
        type: formatter.type,
        value: formatter(input, translator, utc)
      })
    }
    return result
  }

  return format
}

export function formatDateTime(date, pattern, locale = 'en-US', utc) {
  return compileDateTimePattern(pattern)(date, locale, utc)
}

export function formatDateTimeToParts(date, pattern, locale = 'en-US', utc) {
  return compileDateTimePattern(pattern).formatToParts(date, locale, utc)
}
