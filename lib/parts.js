// Formats separate parts by Intl.DateTimeFormat and picks the specified part
export default function getPart(formatter, type, time) {
  const date = new Date(time)
  const parts = formatter.formatToParts(date)
  for (const part of parts) {
    if (part.type === type) return part.value
  }
  /* c8 ignore next */
  throw new Error(`${type} not found in ${formatter.format(date)}`)
}
