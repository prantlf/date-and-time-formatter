import { compileDateTimePattern } from '../../lib/index.js'

const shortPattern = 'M/d/yy, h:mm a'
const date = new Date(1, 1, 3, 16, 5, 6) // 1901-02-03 16:05:06
const text = compileDateTimePattern(shortPattern)(date)
console.log(text)
