// Helpers to pad a number with leading zeros

export const pad2 = number => number > 9 ? number : `0${number}`

export const pad3 = number => number > 99 ? number :
  number > 9 ? `0${number}` : `00${number}`

export const pad4 = number => number > 999 ? number :
  number > 99 ? `0${number}` :
  number > 9 ? `00${number}` : `000${number}`

export const pad5 = number => number > 9999 ? number :
  number > 999 ? `0${number}` :
  number > 99 ? `00${number}` :
  number > 9 ? `000${number}` : `0000${number}`
