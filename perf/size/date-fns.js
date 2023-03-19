import { format } from 'date-fns'

const shortPattern = 'M/d/yy, h:mm a'
const date = new Date(1, 1, 3, 16, 5, 6) // 1901-02-03 16:05:06
const text = format(date, shortPattern)
console.log(text)
