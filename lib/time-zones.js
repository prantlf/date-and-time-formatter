import { pad2 } from './pads.js'

// Shared time zone formatters of numeric time zone offset

export const shortNum = (date, _, utc) => {
  if (utc) return '+00'
  let offset = date.getTimezoneOffset()
  const sign = offset > 0 ? '-' : '+'
  offset = Math.abs(offset)
  const hours = `${sign}${pad2(Math.trunc(offset / 60))}`
  const minutes = offset % 60
  if (minutes === 0) return hours
  return `${hours}${pad2(minutes)}`
}

export const middleNum = (date, _, utc) => {
  if (utc) return '+0000'
  let offset = date.getTimezoneOffset()
  const sign = offset > 0 ? '-' : '+'
  offset = Math.abs(offset)
  return `${sign}${pad2(Math.trunc(offset / 60))}${pad2(offset % 60)}`
}

export const longNum = (date, _, utc) => {
  if (utc) return '+00:00'
  let offset = date.getTimezoneOffset()
  const sign = offset > 0 ? '-' : '+'
  offset = Math.abs(offset)
  return `${sign}${pad2(Math.trunc(offset / 60))}:${pad2(offset % 60)}`
}

// Shared time zone formatters of numeric time zone offset including Z

export const shortZ = (date, _, utc) => {
  if (utc) return 'Z'
  let offset = date.getTimezoneOffset()
  if (offset === 0) return 'Z'
  const sign = offset > 0 ? '-' : '+'
  offset = Math.abs(offset)
  const hours = `${sign}${pad2(Math.trunc(offset / 60))}`
  const minutes = offset % 60
  if (minutes === 0) return hours
  return `${hours}${pad2(minutes)}`
}

export const middleZ = (date, _, utc) => {
  if (utc) return 'Z'
  let offset = date.getTimezoneOffset()
  if (offset === 0) return 'Z'
  const sign = offset > 0 ? '-' : '+'
  offset = Math.abs(offset)
  return `${sign}${pad2(Math.trunc(offset / 60))}${pad2(offset % 60)}`
}

export const longZ = (date, _, utc) => {
  if (utc) return 'Z'
  let offset = date.getTimezoneOffset()
  if (offset === 0) return 'Z'
  const sign = offset > 0 ? '-' : '+'
  offset = Math.abs(offset)
  return `${sign}${pad2(Math.trunc(offset / 60))}:${pad2(offset % 60)}`
}

// Shared time zone formatters of GMT prefix and numeric time zone offset

export const shortGmt = (date, _, utc) => {
  if (utc) return 'GMT+0'
  let offset = date.getTimezoneOffset()
  const sign = offset > 0 ? '-' : '+'
  offset = Math.abs(offset)
  const hours = `GMT${sign}${Math.trunc(offset / 60)}`
  const minutes = offset % 60
  if (minutes === 0) return hours
  return `${hours}:${pad2(minutes)}`
}

export const longGmt = (date, _, utc) => {
  if (utc) return 'GMT+00:00'
  let offset = date.getTimezoneOffset()
  const sign = offset > 0 ? '-' : '+'
  offset = Math.abs(offset)
  return `GMT${sign}${pad2(Math.trunc(offset / 60))}:${pad2(offset % 60)}`
}
