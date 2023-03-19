import createSuite from './createSuite.js'
import dateAndTime from 'date-and-time'
import { compileDateTimePattern, formatDateTime } from '../../lib/index.js'
import { format as dateFnsFormat } from 'date-fns'
import { DateTime } from 'luxon'

const { format: dateAndTimeFormat, compile: dateAndTimeCompile } = dateAndTime
const { DATETIME_SHORT, DATETIME_MED, DATETIME_FULL, DATETIME_HUGE } = DateTime

const date = new Date(1, 1, 3, 16, 5, 6) // 1901-02-03 16:05:06
const luxonDate = DateTime.fromJSDate(date)

// ---------- short

const shortPattern = 'M/d/yy, h:mm a'

function dateAndTimeShortFormatter() {
  formatDateTime(date, shortPattern)
}

function dateAndTimeShort() {
  dateAndTimeFormat(date, shortPattern)
}

const shortCompiledFormatter = compileDateTimePattern(shortPattern)
const shortCompiled = dateAndTimeCompile(shortPattern)

function dateAndTimeShortCompiledFormatter() {
  shortCompiledFormatter(date)
}

function dateAndTimeShortCompiled() {
  dateAndTimeFormat(date, shortCompiled)
}

function dateFnsShort() {
  dateFnsFormat(date, shortPattern)
}

function luxonShort() {
  DateTime.fromJSDate(date).toLocaleString(DATETIME_SHORT)
}

function luxonShortCreated() {
  luxonDate.toLocaleString(DATETIME_SHORT)
}

// ---------- medium

const mediumPattern = 'MMM d, y, h:mm:ss a'

function dateAndTimeMediumFormatter() {
  formatDateTime(date, mediumPattern)
}

function dateAndTimeMedium() {
  dateAndTimeFormat(date, mediumPattern)
}

const mediumCompiledFormatter = compileDateTimePattern(mediumPattern)
const mediumCompiled = dateAndTimeCompile(mediumPattern)

function dateAndTimeMediumCompiledFormatter() {
  mediumCompiledFormatter(date)
}

function dateAndTimeMediumCompiled() {
  dateAndTimeFormat(date, mediumCompiled)
}

function dateFnsMedium() {
  dateFnsFormat(date, mediumPattern)
}

function luxonMedium() {
  DateTime.fromJSDate(date).toLocaleString(DATETIME_MED)
}

function luxonMediumCreated() {
  luxonDate.toLocaleString(DATETIME_MED)
}

// ---------- long

const longPattern = 'MMMM d, y, h:mm:ss a z'

function dateAndTimeLongFormatter() {
  formatDateTime(date, longPattern)
}

function dateAndTimeLong() {
  dateAndTimeFormat(date, longPattern)
}

const longCompiledFormatter = compileDateTimePattern(longPattern)
const longCompiled = dateAndTimeCompile(longPattern)

function dateAndTimeLongCompiledFormatter() {
  longCompiledFormatter(date)
}

function dateAndTimeLongCompiled() {
  dateAndTimeFormat(date, longCompiled)
}

function dateFnsLong() {
  dateFnsFormat(date, longPattern)
}

function luxonLong() {
  DateTime.fromJSDate(date).toLocaleString(DATETIME_FULL)
}

function luxonLongCreated() {
  luxonDate.toLocaleString(DATETIME_FULL)
}

// ---------- full

const fullPattern = 'EEEE, MMMM d, y, h:mm:ss a zzzz'

function dateAndTimeFullFormatter() {
  formatDateTime(date, fullPattern)
}

function dateAndTimeFull() {
  dateAndTimeFormat(date, fullPattern)
}

const fullCompiledFormatter = compileDateTimePattern(fullPattern)
const fullCompiled = dateAndTimeCompile(fullPattern)

function dateAndTimeFullCompiledFormatter() {
  fullCompiledFormatter(date)
}

function dateAndTimeFullCompiled() {
  dateAndTimeFormat(date, fullCompiled)
}

function dateFnsFull() {
  dateFnsFormat(date, fullPattern)
}

function luxonFull() {
  DateTime.fromJSDate(date).toLocaleString(DATETIME_HUGE)
}

function luxonFullCreated() {
  luxonDate.toLocaleString(DATETIME_HUGE)
}

// ---------- suites

createSuite(`Formatting a short pattern "${shortPattern}" with...`)
  .add('date-and-time-formatter', dateAndTimeShortFormatter)
  .add('date-and-time-formatter compiled', dateAndTimeShortCompiledFormatter)
  .add('date-and-time', dateAndTimeShort)
  .add('date-and-time compiled', dateAndTimeShortCompiled)
  .add('date-fns', dateFnsShort)
  .add('luxon', luxonShort)
  .add('luxon created', luxonShortCreated)
  .run()

console.log()

createSuite(`Formatting a medium pattern "${mediumPattern}" with...`)
  .add('date-and-time-formatter', dateAndTimeMediumFormatter)
  .add('date-and-time-formatter compiled', dateAndTimeMediumCompiledFormatter)
  .add('date-and-time', dateAndTimeMedium)
  .add('date-and-time compiled', dateAndTimeMediumCompiled)
  .add('date-fns', dateFnsMedium)
  .add('luxon', luxonMedium)
  .add('luxon created', luxonMediumCreated)
  .run()

console.log()

createSuite(`Formatting a long pattern "${longPattern}" with...`)
  .add('date-and-time-formatter', dateAndTimeLongFormatter)
  .add('date-and-time-formatter compiled', dateAndTimeLongCompiledFormatter)
  .add('date-and-time', dateAndTimeLong)
  .add('date-and-time compiled', dateAndTimeLongCompiled)
  .add('date-fns', dateFnsLong)
  .add('luxon', luxonLong)
  .add('luxon created', luxonLongCreated)
  .run()

console.log()

createSuite(`Formatting a full pattern "${fullPattern}" with...`)
  .add('date-and-time-formatter', dateAndTimeFullFormatter)
  .add('date-and-time-formatter compiled', dateAndTimeFullCompiledFormatter)
  .add('date-and-time', dateAndTimeFull)
  .add('date-and-time compiled', dateAndTimeFullCompiled)
  .add('date-fns', dateFnsFull)
  .add('luxon', luxonFull)
  .add('luxon created', luxonFullCreated)
  .run()
