import { DateTime } from 'luxon'

const date = new Date(1, 1, 3, 16, 5, 6) // 1901-02-03 16:05:06
const text = DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_SHORT)
console.log(text)
