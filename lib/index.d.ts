/**
 * 2 texts - for BC and AD eras
 */
type Era = [string, string]

/**
 * 3 arrays for `short`, `long` and `narrow` styles for era names
 */
type Eras = [Era, Era, Era]

/**
 * 12 texts - for months from January to December
 */
type Month = [string, string, string, string, string, string, string, string, string, string, string, string]

/**
 * 3 arrays for `short`, `long` and `narrow` styles for month names
 */
type Months = [Month, Month, Month]

/**
 * 7 texts - for days from Sunday to Saturday
 */
type Weekday = [string, string, string, string, string, string, string]

/**
 * 3 arrays for `short`, `long` and `narrow` styles for days of week
 */
type Weekdays = [Weekday, Weekday, Weekday]

/**
 * 2 texts - for morning and afternoon (AM/PM)
 */
type Meridiem = [string, string]

/**
 * 2 arrays for `short` and `long` styles for the meridiem suffix (AM/PM)
 */
type Meridians = [Meridiem, Meridiem]

/**
 * 6 texts - for night, midnight, morning, noon, afternoon and evening
 */
type DayPeriod = [string, string, string, string, string, string]

/**
 * 3 arrays for `short`, `long` and `narrow` styles for the day period
 */
type DayPeriods = [DayPeriod, DayPeriod, DayPeriod]

/**
 * Object with texts to be used as a custom translation of date/time parts.
 */
interface Translator {
  /**
   * 3 arrays for `short`, `long` and `narrow` styles for era names.
   * Each array has to contain 2 texts - for BC and AD eras.
   */
  eras: Eras
  /**
   * 3 arrays for `short`, `long` and `narrow` styles for month names.
   * Each array has to contain 12 texts - for months from January to December.
   */
  months: Months
  /**
   * 3 arrays for `short`, `long` and `narrow` styles for days of week.
   * Each array has to contain 7 texts - for days from Sunday to Saturday.
   */
  weekdays: Weekdays
  /**
   * 2 arrays for `short` and `long` styles for the meridiem suffix (AM/PM).
   * Each array has to contain 2 texts - for morning and afternoon.
   */
  meridians: Meridians
  /**
   * 3 arrays for `short`, `long` and `narrow` styles for the day period.
   * Each array has to contain 6 texts - for night, midnight, morning, noon,
   * afternoon and evening.
   */
  dayPeriods: DayPeriods
}

/**
 * An object describing a part of a pattern.
 */
interface FormattedPart {
  /**
   * A type of the part compatible with [Intl.DateTiemFormat:formatToParts](
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts).
   */
  type: 'era' | 'year' | 'month' | 'day' | 'weekday' | 'hour' | 'minute' |
        'second' | 'fractionalSecond' | 'dayPeriod'| 'timeZoneName' | 'literal'
  /**
   * The textual part of the pattern.
   */
  value: string
}

/**
 * A function for formatting a date/time value to an array of parts,
 * which values are supposed to be concatenated together.
 * 
 * If no `locale` is specified, English ("en-US") will be used by default.
 * 
 * If `true` is not passed for `utc`, the date/time value will be considered
 * in the local time zone and formatted accordingly.
 * 
 * @param date a date/time value (an instance of `Date`)
 * @param locale target locale identifier according to BCP 47 or an object
 *               with translated texts to be used as date/time parts
 * @param utc format the date/time value converted to UTC
 * @returns an array with the parts of the formatted date/time value
 */
type FormatterToParts = (date: Date, locale?: string | Translator, utc?: boolean) => FormattedPart[]

/**
 * A function for formatting a date/time value to a string.
 * 
 * If no `locale` is specified, English ("en-US") will be used by default.
 * 
 * If `true` is not passed for `utc`, the date/time value will be considered
 * in the local time zone and formatted accordingly.
 * 
 * @param date a date/time value (an instance of `Date`)
 * @param locale target locale identifier according to BCP 47 or an object
 *               with translated texts to be used as date/time parts
 * @param utc format the date/time value converted to UTC
 * @returns a string with the formatted date/time value
 */
type Formatter = {
  (date: Date, locale?: string | Translator, utc?: boolean): string,
  formatToParts: FormatterToParts
}

/**
 * Compiles a date/time pattern to a formatting function.
 *
 * ### Formatting Pattern
 * 
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence,
 * represent a "real" single quote. (see the last example)
 *
 * Format of the string is based on [Unicode Technical Standard #35](
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
 * Only those tokens are supported, which can appear in patterns for formatting
 * instances of `Date` by `Intl.DateTimeFormat`. For example, only the "formatting"
 * variant of a token (M, E) is supported, not the "stand-alone" one (L, i).
 * ("Formatting" means declined according to the rules of the language
 *  in the context of a date. "Stand-alone" means always nominative singular.)
 * 
 * Accepted patterns:
 * 
 * | Unit                         | Pattern | Result examples                   |
 * |------------------------------|---------|-----------------------------------|
 * | Era                          | G..GGG  | AD, BC                            |
 * |                              | GGGG    | Anno Domini, Before Christ        |
 * |                              | GGGGG   | A, B                              |
 * | Calendar year                | y       | 44, 1, 1900, 2017                 |
 * |                              | yy      | 44, 01, 00, 17                    |
 * |                              | yyy     | 044, 001, 1900, 2017              |
 * |                              | yyyy    | 0044, 0001, 1900, 2017            |
 * |                              | yyyyy   | ...                               |
 * | Month                        | M       | 1, 2, ..., 12                     |
 * |                              | MM      | 01, 02, ..., 12                   |
 * |                              | MMM     | Jan, Feb, ..., Dec                |
 * |                              | MMMM    | January, February, ..., December  |
 * |                              | MMMMM   | J, F, ..., D                      |
 * | Day of month                 | d       | 1, 2, ..., 31                     |
 * |                              | dd      | 01, 02, ..., 31                   |
 * | Day of week                  | E..EEE  | Mon, Tue, Wed, ..., Sun           |
 * |                              | EEEE    | Monday, Tuesday, ..., Sunday      |
 * |                              | EEEEE   | M, T, W, T, F, S, S               |
 * | AM, PM                       | a..aa   | AM, PM                            |
 * |                              | aaa     | am, pm                            |
 * |                              | aaaa    | a.m., p.m.                        |
 * |                              | aaaaa   | a, p                              |
 * | AM, PM, noon, midnight       | b..bb   | AM, PM, noon, midnight            |
 * |                              | bbb     | am, pm, noon, midnight            |
 * |                              | bbbb    | a.m., p.m., noon, midnight        |
 * |                              | bbbbb   | a, p, n, mi                       |
 * | Flexible day period          | B..BBB  | at night, in the morning, ...     |
 * |                              | BBBB    | at night, in the morning, ...     |
 * |                              | BBBBB   | at night, in the morning, ...     |
 * | Hour [1-12]                  | h       | 1, 2, ..., 11, 12                 |
 * |                              | hh      | 01, 02, ..., 11, 12               |
 * | Hour [0-23]                  | H       | 0, 1, 2, ..., 23                  |
 * |                              | HH      | 00, 01, 02, ..., 23               |
 * | Hour [0-11]                  | K       | 1, 2, ..., 11, 0                  |
 * |                              | KK      | 01, 02, ..., 11, 00               |
 * | Hour [1-24]                  | k       | 24, 1, 2, ..., 23                 |
 * |                              | kk      | 24, 01, 02, ..., 23               |
 * | Minute                       | m       | 0, 1, ..., 59                     |
 * |                              | mm      | 00, 01, ..., 59                   |
 * | Second                       | s       | 0, 1, ..., 59                     |
 * |                              | ss      | 00, 01, ..., 59                   |
 * | Fraction of second           | S       | 0, 1, ..., 9                      |
 * |                              | SS      | 00, 01, ..., 99                   |
 * |                              | SSS     | 000, 001, ..., 999                |
 * |                              | SSSS    | ...                               |
 * | Timezone (ISO-8601 w/ Z)     | X       | -08, +0530, Z                     |
 * |                              | XX      | -0800, +0530, Z                   |
 * |                              | XXX     | -08:00, +05:30, Z                 |
 * |                              | XXXX    | -0800, +0530, Z, +123456          |
 * |                              | XXXXX   | -08:00, +05:30, Z, +12:34:56      |
 * | Timezone (ISO-8601 w/o Z)    | x       | -08, +0530, +00                   |
 * |                              | xx      | -0800, +0530, +0000               |
 * |                              | xxx     | -08:00, +05:30, +00:00            |
 * |                              | xxxx    | -0800, +0530, +0000, +123456      |
 * |                              | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |
 * | Timezone (GMT)               | O       | GMT-8, GMT+5:30, GMT+0            |
 * |                              | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   |
 * | Timezone (specific non-loc.) | z...zzz | GMT-8, GMT+5:30, GMT+0            |
 * |                              | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   |
 * 
 * Any sequence of the identical letters is a pattern, unless it is escaped by
 * the single quote characters (see below). Tokens for textual formatted parts
 * are usually available in three styles:
 *
 *     format(new Date(2017, 10, 6), 'MMM')   // short  => 'Nov'
 *     format(new Date(2017, 10, 6), 'MMMM')  // long   => 'November'
 *     format(new Date(2017, 10, 6), 'MMMMM') // narrow => 'N'
 * 
 * Specific non-location time zones are currently unavailable,
 * so right now these tokens fall back to GMT time zones.
 * 
 * @param pattern a date/time pattern consisting of Unicode LDML tokens
 * @returns a function for formatting a date/time value
 * @throws {RangeError} if format string contains unbalanced apostrophes (single quotes)
 * @throws {SyntaxError} if format string contains an invalid letter (Unicode LDML token)
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format
 * const format = compileDateTimePattern('MM/dd/yyyy')
 * format(new Date(2014, 1, 11))
 * //=> '02/11/2014'
 *
 * @example
 * // Escape string by single quote characters
 * const result = compileDateTimePattern("h 'o''clock'")
 * format(new Date(2014, 6, 2, 15))
 * //=> "3 o'clock"
 */
export function compileDateTimePattern(pattern: string): Formatter

/**
 * Formats a date/time value to a string using a pattern of Unicode LDML tokens.
 * 
 * If no `locale` is specified, English ("en-US") will be used by default.
 * 
 * If `true` is not passed for `utc`, the date/time value will be considered
 * in the local time zone and formatted accordingly.
 * 
 * If you format many date/time values using the same pattern or if the performance
 * of the formatting is important, consider compiling the pattern with
 * `compileDateTimePattern`.
 *
 * ### Formatting Pattern
 * 
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence,
 * represent a "real" single quote. (see the last example)
 *
 * Format of the string is based on [Unicode Technical Standard #35](
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
 * Only those tokens are supported, which can appear in patterns for formatting
 * instances of `Date` by `Intl.DateTimeFormat`. For example, only the "formatting"
 * variant of a token (M, E) is supported, not the "stand-alone" one (L, i).
 * ("Formatting" means declined according to the rules of the language
 *  in the context of a date. "Stand-alone" mean s always nominative singular.)
 * 
 * Accepted patterns:
 * 
 * | Unit                         | Pattern | Result examples                   |
 * |------------------------------|---------|-----------------------------------|
 * | Era                          | G..GGG  | AD, BC                            |
 * |                              | GGGG    | Anno Domini, Before Christ        |
 * |                              | GGGGG   | A, B                              |
 * | Calendar year                | y       | 44, 1, 1900, 2017                 |
 * |                              | yy      | 44, 01, 00, 17                    |
 * |                              | yyy     | 044, 001, 1900, 2017              |
 * |                              | yyyy    | 0044, 0001, 1900, 2017            |
 * |                              | yyyyy   | ...                               |
 * | Month                        | M       | 1, 2, ..., 12                     |
 * |                              | MM      | 01, 02, ..., 12                   |
 * |                              | MMM     | Jan, Feb, ..., Dec                |
 * |                              | MMMM    | January, February, ..., December  |
 * |                              | MMMMM   | J, F, ..., D                      |
 * | Day of month                 | d       | 1, 2, ..., 31                     |
 * |                              | dd      | 01, 02, ..., 31                   |
 * | Day of week                  | E..EEE  | Mon, Tue, Wed, ..., Sun           |
 * |                              | EEEE    | Monday, Tuesday, ..., Sunday      |
 * |                              | EEEEE   | M, T, W, T, F, S, S               |
 * | AM, PM                       | a..aa   | AM, PM                            |
 * |                              | aaa     | am, pm                            |
 * |                              | aaaa    | a.m., p.m.                        |
 * |                              | aaaaa   | a, p                              |
 * | AM, PM, noon, midnight       | b..bb   | AM, PM, noon, midnight            |
 * |                              | bbb     | am, pm, noon, midnight            |
 * |                              | bbbb    | a.m., p.m., noon, midnight        |
 * |                              | bbbbb   | a, p, n, mi                       |
 * | Flexible day period          | B..BBB  | at night, in the morning, ...     |
 * |                              | BBBB    | at night, in the morning, ...     |
 * |                              | BBBBB   | at night, in the morning, ...     |
 * | Hour [1-12]                  | h       | 1, 2, ..., 11, 12                 |
 * |                              | hh      | 01, 02, ..., 11, 12               |
 * | Hour [0-23]                  | H       | 0, 1, 2, ..., 23                  |
 * |                              | HH      | 00, 01, 02, ..., 23               |
 * | Hour [0-11]                  | K       | 1, 2, ..., 11, 0                  |
 * |                              | KK      | 01, 02, ..., 11, 00               |
 * | Hour [1-24]                  | k       | 24, 1, 2, ..., 23                 |
 * |                              | kk      | 24, 01, 02, ..., 23               |
 * | Minute                       | m       | 0, 1, ..., 59                     |
 * |                              | mm      | 00, 01, ..., 59                   |
 * | Second                       | s       | 0, 1, ..., 59                     |
 * |                              | ss      | 00, 01, ..., 59                   |
 * | Fraction of second           | S       | 0, 1, ..., 9                      |
 * |                              | SS      | 00, 01, ..., 99                   |
 * |                              | SSS     | 000, 001, ..., 999                |
 * |                              | SSSS    | ...                               |
 * | Timezone (ISO-8601 w/ Z)     | X       | -08, +0530, Z                     |
 * |                              | XX      | -0800, +0530, Z                   |
 * |                              | XXX     | -08:00, +05:30, Z                 |
 * |                              | XXXX    | -0800, +0530, Z, +123456          |
 * |                              | XXXXX   | -08:00, +05:30, Z, +12:34:56      |
 * | Timezone (ISO-8601 w/o Z)    | x       | -08, +0530, +00                   |
 * |                              | xx      | -0800, +0530, +0000               |
 * |                              | xxx     | -08:00, +05:30, +00:00            |
 * |                              | xxxx    | -0800, +0530, +0000, +123456      |
 * |                              | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |
 * | Timezone (GMT)               | O       | GMT-8, GMT+5:30, GMT+0            |
 * |                              | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   |
 * | Timezone (specific non-loc.) | z...zzz | GMT-8, GMT+5:30, GMT+0            |
 * |                              | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   |
 * 
 * Any sequence of the identical letters is a pattern, unless it is escaped by
 * the single quote characters (see below). Tokens for textual formatted parts
 * are usually available in three styles:
 *
 *     format(new Date(2017, 10, 6), 'MMM')   // short  => 'Nov'
 *     format(new Date(2017, 10, 6), 'MMMM')  // long   => 'November'
 *     format(new Date(2017, 10, 6), 'MMMMM') // narrow => 'N'
 * 
 * Specific non-location time zones are currently unavailable,
 * so right now these tokens fall back to GMT time zones.
 * 
 * @param date a date/time value (an instance of `Date`)
 * @param pattern a date/time pattern consisting of Unicode LDML tokens
 * @param locale target locale identifier according to BCP 47 or an object
 *               with translated texts to be used as date/time parts
 * @param utc format the date/time value converted to UTC
 * @returns a string with the formatted date/time value
 * @throws {RangeError} if format string contains unbalanced apostrophes (single quotes)
 * @throws {SyntaxError} if format string contains an invalid letter (Unicode LDML token)
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format
 * formatDateAndTime(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Escape string by single quote characters
 * formatDateAndTime(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */
export function formatDateTime(date: Date, pattern: string, locale?: string | Translator, utc?: boolean): string

/**
 * Formats a date/time value to an array of parts, which values are supposed
 * to be concatenated together, using a pattern of Unicode LDML tokens.
 * 
 * If no `locale` is specified, English ("en-US") will be used by default.
 * 
 * If `true` is not passed for `utc`, the date/time value will be considered
 * in the local time zone and formatted accordingly.
 * 
 * If you format many date/time values using the same pattern or if the performance
 * of the formatting is important, consider compiling the pattern with
 * `compileDateTimePattern`.
 *
 * ### Formatting Pattern
 * 
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence,
 * represent a "real" single quote. (see the last example)
 *
 * Format of the string is based on [Unicode Technical Standard #35](
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
 * Only those tokens are supported, which can appear in patterns for formatting
 * instances of `Date` by `Intl.DateTimeFormat`. For example, only the "formatting"
 * variant of a token (M, E) is supported, not the "stand-alone" one (L, i).
 * ("Formatting" means declined according to the rules of the language
 *  in the context of a date. "Stand-alone" mean s always nominative singular.)
 * 
 * Accepted patterns:
 * 
 * | Unit                         | Pattern | Result examples                   |
 * |------------------------------|---------|-----------------------------------|
 * | Era                          | G..GGG  | AD, BC                            |
 * |                              | GGGG    | Anno Domini, Before Christ        |
 * |                              | GGGGG   | A, B                              |
 * | Calendar year                | y       | 44, 1, 1900, 2017                 |
 * |                              | yy      | 44, 01, 00, 17                    |
 * |                              | yyy     | 044, 001, 1900, 2017              |
 * |                              | yyyy    | 0044, 0001, 1900, 2017            |
 * |                              | yyyyy   | ...                               |
 * | Month                        | M       | 1, 2, ..., 12                     |
 * |                              | MM      | 01, 02, ..., 12                   |
 * |                              | MMM     | Jan, Feb, ..., Dec                |
 * |                              | MMMM    | January, February, ..., December  |
 * |                              | MMMMM   | J, F, ..., D                      |
 * | Day of month                 | d       | 1, 2, ..., 31                     |
 * |                              | dd      | 01, 02, ..., 31                   |
 * | Day of week                  | E..EEE  | Mon, Tue, Wed, ..., Sun           |
 * |                              | EEEE    | Monday, Tuesday, ..., Sunday      |
 * |                              | EEEEE   | M, T, W, T, F, S, S               |
 * | AM, PM                       | a..aa   | AM, PM                            |
 * |                              | aaa     | am, pm                            |
 * |                              | aaaa    | a.m., p.m.                        |
 * |                              | aaaaa   | a, p                              |
 * | AM, PM, noon, midnight       | b..bb   | AM, PM, noon, midnight            |
 * |                              | bbb     | am, pm, noon, midnight            |
 * |                              | bbbb    | a.m., p.m., noon, midnight        |
 * |                              | bbbbb   | a, p, n, mi                       |
 * | Flexible day period          | B..BBB  | at night, in the morning, ...     |
 * |                              | BBBB    | at night, in the morning, ...     |
 * |                              | BBBBB   | at night, in the morning, ...     |
 * | Hour [1-12]                  | h       | 1, 2, ..., 11, 12                 |
 * |                              | hh      | 01, 02, ..., 11, 12               |
 * | Hour [0-23]                  | H       | 0, 1, 2, ..., 23                  |
 * |                              | HH      | 00, 01, 02, ..., 23               |
 * | Hour [0-11]                  | K       | 1, 2, ..., 11, 0                  |
 * |                              | KK      | 01, 02, ..., 11, 00               |
 * | Hour [1-24]                  | k       | 24, 1, 2, ..., 23                 |
 * |                              | kk      | 24, 01, 02, ..., 23               |
 * | Minute                       | m       | 0, 1, ..., 59                     |
 * |                              | mm      | 00, 01, ..., 59                   |
 * | Second                       | s       | 0, 1, ..., 59                     |
 * |                              | ss      | 00, 01, ..., 59                   |
 * | Fraction of second           | S       | 0, 1, ..., 9                      |
 * |                              | SS      | 00, 01, ..., 99                   |
 * |                              | SSS     | 000, 001, ..., 999                |
 * |                              | SSSS    | ...                               |
 * | Timezone (ISO-8601 w/ Z)     | X       | -08, +0530, Z                     |
 * |                              | XX      | -0800, +0530, Z                   |
 * |                              | XXX     | -08:00, +05:30, Z                 |
 * |                              | XXXX    | -0800, +0530, Z, +123456          |
 * |                              | XXXXX   | -08:00, +05:30, Z, +12:34:56      |
 * | Timezone (ISO-8601 w/o Z)    | x       | -08, +0530, +00                   |
 * |                              | xx      | -0800, +0530, +0000               |
 * |                              | xxx     | -08:00, +05:30, +00:00            |
 * |                              | xxxx    | -0800, +0530, +0000, +123456      |
 * |                              | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |
 * | Timezone (GMT)               | O       | GMT-8, GMT+5:30, GMT+0            |
 * |                              | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   |
 * | Timezone (specific non-loc.) | z...zzz | GMT-8, GMT+5:30, GMT+0            |
 * |                              | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   |
 * 
 * Any sequence of the identical letters is a pattern, unless it is escaped by
 * the single quote characters (see below). Tokens for textual formatted parts
 * are usually available in three styles:
 *
 *     format(new Date(2017, 10, 6), 'MMM')   // short  => 'Nov'
 *     format(new Date(2017, 10, 6), 'MMMM')  // long   => 'November'
 *     format(new Date(2017, 10, 6), 'MMMMM') // narrow => 'N'
 * 
 * Specific non-location time zones are currently unavailable,
 * so right now these tokens fall back to GMT time zones.
 * 
 * @param date a date/time value (an instance of `Date`)
 * @param pattern a date/time pattern consisting of Unicode LDML tokens
 * @param locale target locale identifier according to BCP 47 or an object
 *               with translated texts to be used as date/time parts
 * @param utc format the date/time value converted to UTC
 * @returns an array of the parts of the formatted date/time value
 * @throws {RangeError} if format string contains unbalanced apostrophes (single quotes)
 * @throws {SyntaxError} if format string contains an invalid letter (Unicode LDML token)
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format
 * formatDateAndTimeToParts(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> [{ type: 'month', value: '02' },
 * //    { type: 'literal', value: '/' },
 * //    { type; 'day', value: '11' },
 * //    { type: 'literal', value: '/' },
 * //    { type: 'year': value: 2014 }]
 *
 * @example
 * // Escape string by single quote characters
 * formatDateAndTimeToParts(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> [{ type: 'hour', value: 3 },
 * //    { type: 'literal', value: " o'clock" }]
 */
export function formatDateTimeToParts(date: Date, pattern: string, locale?: string | Translator, utc?: boolean): FormattedPart[]
