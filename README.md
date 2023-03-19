# DateTime Formatter

[![Latest version](https://img.shields.io/npm/v/date-and-time-formatter)
 ![Dependency status](https://img.shields.io/librariesio/release/npm/date-and-time-formatter)
](https://www.npmjs.com/package/date-and-time-formatter)
[![Coverage](https://codecov.io/gh/prantlf/date-and-time-formatter/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/date-and-time-formatter)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9f1034029c0747a980cd49f64f16338b)](https://www.codacy.com/app/prantlf/date-and-time-formatter?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=prantlf/date-and-time-formatter&amp;utm_campaign=Badge_Grade)

Formats a date/time value to a localised string using a pattern consisting of [Unicode LDML] tokens.

| Locale | Pattern             | Example                     |
|:-------|:--------------------|:----------------------------|
| en     | M/d/yy, h:mm a      | 2/3/01, 4:05 AM             |
| cs     | d. MMMM y H:mm:ss z | 3. února 1901 4:05:06 GMT+1 |

```js
const result = formatDateTime(new Date(), 'd.M.yy') // 3.2.01
```

* ES, CJS and UMD module exports.
* TypeScript type declarations (typings).
* No other dependencies.
* Output translated to the requested locale by [`Intl.DateTimeFormat`].
* Custom translations of the textual date/time parts possible.
* Tiny code base - 8.94 kB minified, 2.33 kB gzipped, 2.12 kB brotlied.
* [Extremely fast](perf/README.md).

Related projects:

* [datetime-placeholder] - simplifies a date/time-formatting pattern using [Unicode LDML] tokens to a pattern usable in date/time pickers.
* [datetime-locale-patterns] - provides localized date/time format patterns for styles `full`, `long`, `medium` and `short` using [Unicode CLDR], compliant with [Unicode LDML].
* [intl-datetimeformat-options] - provides localized date/time format patterns for styles `full`, `long`, `medium` and `short`, using [`Intl.DateTimeFormat`].
* [intl-datetimeformat-pattern] - creates a valid [`Intl.DateTimeFormat`] options object from a [Unicode CLDR] skeleton or token pattern.

## Installation

This module can be installed in your project using [NPM], [PNPM] or [Yarn]. Make sure, that you use [Node.js] version 16.14 or newer.

```sh
$ npm i date-and-time-formatter
$ pnpm i date-and-time-formatter
$ yarn add date-and-time-formatter
```

Functions are exposed as named exports from ES and CJS modules, for example:

```js
import { formatDateTime } from 'date-and-time-formatter'
```

```js
const { formatDateTime } = require('date-and-time-formatter')
```

A UMD module can be loaded to the browser either directly:

```html
<script src="https://unpkg.com/date-and-time-formatter@1.0.0/lib/index.min.js"></script>
<script>
  const { formatDateTime } = window.dateAndTimeFormatter
</script>
```

Or using an AMD module loader:

```html
<script>
  require([
    'https://unpkg.com/date-and-time-formatter@1.0.0/lib/index.min.js'
  ], ({ formatDateTime }) => {
    ...
  })
</script>
```

## API

### formatDateTime(date, pattern, locale?, utc?) : string

Formats a date/time value to a string using a pattern of Unicode LDML tokens. If no `locale` is specified, English ("en-US") will be used by default. If `true` is not passed for `utc`, the date/time value will be considered in the local time zone and formatted accordingly.

If you format many date/time values using the same pattern or if the performance of the formatting is important, consider compiling the pattern with `compileDateTimePattern`.

* **date** - a date/time value (an instance of `Date`)
* **pattern** - a date/time pattern consisting of [Unicode LDML] tokens
* **locale** - target locale identifier according to [BCP 47] or an object with translated texts to be used as date/time parts
* **utc** - format the date/time value converted to UTC

```js
import { formatDateTime } from 'date-and-time-formatter'

const result = formatDateTime(new Date(), 'M/d/yy')
console.log(result) // prints '3/19/23'
```

### formatDateTimeToParts(date, pattern, locale?, utc?) : []

Formats a date/time value to an array of parts, which values are supposed to be concatenated together, using a pattern of Unicode LDML tokens. If no `locale` is specified, English ("en-US") will be used by default. If `true` is not passed for `utc`, the date/time value will be considered in the local time zone and formatted accordingly.

If you format many date/time values using the same pattern or if the performance of the formatting is important, consider compiling the pattern with `compileDateTimePattern`.

* **date** - a date/time value (an instance of `Date`)
* **pattern** - a date/time pattern consisting of [Unicode LDML] tokens
* **locale** - target locale identifier according to [BCP 47] or an object with translated texts to be used as date/time parts
* **utc** - format the date/time value converted to UTC

```js
import { formatDateTime } from 'date-and-time-formatter'

const result = formatDateTime(new Date(), 'M/d/yy')
console.log(result) // prints the following:
// [{ type: 'month', value: 3,
//    type: 'literal', value: '/',
//    type; 'day', value: 19,
//    type: 'literal', value: '/',
//    type: 'year': value: 23 }]
```

### compileDateTimePattern(pattern) : Function

Compiles a date/time pattern to a formatting function. The function can be called to format multiple date/time values to a string.

The returned function carries another function as a property `formatToParts`. This function can be called to return an array of parts, which values are supposed to be concatenated together, instead of the final string.

* **pattern** - a date/time pattern consisting of [Unicode LDML] tokens

```js
import { compileDateTimePattern } from 'date-and-time-formatter'

const format = compileDateTimePattern('M/d/yy')
console.log(format(new Date())) // prints '3/19/23'
console.log(format.formatToParts(new Date())) // prints the following:
// [{ type: 'month', value: 3,
//    type: 'literal', value: '/',
//    type; 'day', value: 19,
//    type: 'literal', value: '/',
//    type: 'year': value: 23 }]
```

## Formatting Pattern

The characters wrapped between two single quotes characters (`'`) are escaped.
Two single quotes in a row, whether inside or outside a quoted sequence,
represent a "real" single quote. (see the last example)

Format of the string is based on [Unicode Technical Standard #35].
Only those tokens are supported, which can appear in patterns for formatting
instances of `Date` by [`Intl.DateTimeFormat`]. For example, only the "formatting"
variant of a token (M, E) is supported, not the "stand-alone" one (L, i).
("Formatting" means declined according to the rules of the language
 in the context of a date. "Stand-alone" means always nominative singular.)

Accepted patterns:

| Unit                         | Pattern | Result examples                   |
|------------------------------|---------|-----------------------------------|
| Era                          | G..GGG  | AD, BC                            |
|                              | GGGG    | Anno Domini, Before Christ        |
|                              | GGGGG   | A, B                              |
| Calendar year                | y       | 44, 1, 1900, 2017                 |
|                              | yy      | 44, 01, 00, 17                    |
|                              | yyy     | 044, 001, 1900, 2017              |
|                              | yyyy    | 0044, 0001, 1900, 2017            |
|                              | yyyyy   | ...                               |
| Month                        | M       | 1, 2, ..., 12                     |
|                              | MM      | 01, 02, ..., 12                   |
|                              | MMM     | Jan, Feb, ..., Dec                |
|                              | MMMM    | January, February, ..., December  |
|                              | MMMMM   | J, F, ..., D                      |
| Day of month                 | d       | 1, 2, ..., 31                     |
|                              | dd      | 01, 02, ..., 31                   |
| Day of week                  | E..EEE  | Mon, Tue, Wed, ..., Sun           |
|                              | EEEE    | Monday, Tuesday, ..., Sunday      |
|                              | EEEEE   | M, T, W, T, F, S, S               |
| AM, PM                       | a..aa   | AM, PM                            |
|                              | aaa     | am, pm                            |
|                              | aaaa    | a.m., p.m.                        |
|                              | aaaaa   | a, p                              |
| AM, PM, noon, midnight       | b..bb   | AM, PM, noon, midnight            |
|                              | bbb     | am, pm, noon, midnight            |
|                              | bbbb    | a.m., p.m., noon, midnight        |
|                              | bbbbb   | a, p, n, mi                       |
| Flexible day period          | B..BBB  | at night, in the morning, ...     |
|                              | BBBB    | at night, in the morning, ...     |
|                              | BBBBB   | at night, in the morning, ...     |
| Hour [1-12]                  | h       | 1, 2, ..., 11, 12                 |
|                              | hh      | 01, 02, ..., 11, 12               |
| Hour [0-23]                  | H       | 0, 1, 2, ..., 23                  |
|                              | HH      | 00, 01, 02, ..., 23               |
| Hour [0-11]                  | K       | 1, 2, ..., 11, 0                  |
|                              | KK      | 01, 02, ..., 11, 00               |
| Hour [1-24]                  | k       | 24, 1, 2, ..., 23                 |
|                              | kk      | 24, 01, 02, ..., 23               |
| Minute                       | m       | 0, 1, ..., 59                     |
|                              | mm      | 00, 01, ..., 59                   |
| Second                       | s       | 0, 1, ..., 59                     |
|                              | ss      | 00, 01, ..., 59                   |
| Fraction of second           | S       | 0, 1, ..., 9                      |
|                              | SS      | 00, 01, ..., 99                   |
|                              | SSS     | 000, 001, ..., 999                |
|                              | SSSS    | ...                               |
| Timezone (ISO-8601 w/ Z)     | X       | -08, +0530, Z                     |
|                              | XX      | -0800, +0530, Z                   |
|                              | XXX     | -08:00, +05:30, Z                 |
|                              | XXXX    | -0800, +0530, Z, +123456          |
|                              | XXXXX   | -08:00, +05:30, Z, +12:34:56      |
| Timezone (ISO-8601 w/o Z)    | x       | -08, +0530, +00                   |
|                              | xx      | -0800, +0530, +0000               |
|                              | xxx     | -08:00, +05:30, +00:00            |
|                              | xxxx    | -0800, +0530, +0000, +123456      |
|                              | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |
| Timezone (GMT)               | O       | GMT-8, GMT+5:30, GMT+0            |
|                              | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   |
| Timezone (specific non-loc.) | z...zzz | GMT-8, GMT+5:30, GMT+0            |
|                              | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   |

Any sequence of the identical letters is a pattern, unless it is escaped by
the single quote characters (see below). Tokens for textual formatted parts
are usually available in three styles:

```js
format(new Date(2017, 10, 6), 'MMM')   // short  => 'Nov'
format(new Date(2017, 10, 6), 'MMMM')  // long   => 'November'
format(new Date(2017, 10, 6), 'MMMMM') // narrow => 'N'
```

Specific non-location time zones are currently unavailable,
so right now these tokens fall back to GMT time zones.

### Examples

```js
// Represent 11 February 2014 in middle-endian format
formatDateAndTime(new Date(2014, 1, 11), 'MM/dd/yyyy')
//=> '02/11/2014'
```

```js
// Escape string by single quote characters
formatDateAndTimeToParts(new Date(2014, 6, 2, 15), "h 'o''clock'")
//=> [{ type: 'hour', value: 3 },
//    { type: 'literal', value: " o'clock" }]
```

## Custom Translations

Patterns may need to be customised, if you need them to differ from the CLDR standard, or if you need to support only a subset of locales, formats or styles to reduce the size of the data loaded by your application.

The default data including all locales, formats and pattern styles are exposed as the `date-and-time-formatter/data/all` module. Smaller data including all locales and formats for the short pattern style are exposed as the `date-and-time-formatter/data/short` module. Other data (list of localized date/time format patterns) can be generated using the `create-date-and-time-formatter` script and enabled using the `setLocalePatterns` function.

### Creating Custom Data

Format of the data is JSON:

    {
      formats: [...], // a subset of date, time, dateTime
      styles: [...],  // a subset of full, long, medium, short
      patterns: {
        // locale to array of formats; a format is an array of styles
        [locale]: [[date], [time], [date-time]],
        ...
      }
    }

For example, for supporting only `en` and `cs` locales and `short` and `long` styles, the following command line will create the following file content:

    create-date-and-time-formatter -l en,cs -s short,long

```json
{
  "formats": ["date", "time", "dateTime"],
  "styles": ["short", "long"],
  "patterns": {
    "en": [["M/d/yy", "MMMM d, y"], ["h:mm a", "h:mm:ss a z"], ["{1}, {0}", "{1}, {0}"]],
    "cs": [["dd.MM.yy", "d. MMMM y"], ["H:mm", "H:mm:ss z"], ["{1} {0}", "{1} {0}"]]
  }
}
```

The command-line script `create-date-and-time-formatter` is installed to the `bin` directory in `node_modules`:

    Usage: create-date-and-time-formatter [options]

    Options:
      -l|--locales <>  list of locales to include (default: all)
      -f|--formats <>  list of format patterns (default: date,time,dateTime)
      -s|--styles <>   list of format styles (default: short,medium,long,full)
      -o|--output <>   output file (default: console)
      -p|--pretty      prettify the JSON output (default: minified)
      -V|--version     print version number
      -h|--help        print usage instructions

    Examples:
      $ create-date-and-time-formatter -s short,long -o patterns.json
      $ create-date-and-time-formatter -l en,en-GB,cs,de,de-AT -f date -p

### Loading Custom Data

If you want to use the limited data from the `date-and-time-formatter/data/short` module or your custom data, do not import functions from the default `date-and-time-formatter` module, but from the `date-and-time-formatter/code` module, which will not load the default data automatically. Once you do it, you will have to supply the custom data to the `setLocalePatterns` function before you call any other function from this library:

```js
import { setLocalePatterns, formatDateTime } from 'date-and-time-formatter/code'
import patterns from './patterns.json' assert { type: 'json' }

setLocalePatterns(patterns)
const pattern = formatDateTime('cs', 'short', 'short')
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.  Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## License

Copyright (c) 2023 Ferdinand Prantl

Licensed under the MIT license.

[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[PNPM]: https://pnpm.io/
[Yarn]: https://yarnpkg.com/
[date-and-time]: https://github.com/knowledgecode/date-and-time
[date-fns]: https://github.com/date-fns/date-fns
[luxon]: https://moment.github.io/luxon/
[ICU]: https://icu.unicode.org/
[CLDR data]: https://www.npmjs.com/package/cldr-dates-full
[Unicode LDML]: https://unicode.org/reports/tr35/
[Unicode CLDR]: https://cldr.unicode.org/
[BCP 47]: https://www.ietf.org/rfc/bcp/bcp47.html
[`Intl.DateTimeFormat`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
[`Intl.DateTimeFomat` options]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options
[8. Date Format Patterns]: http://unicode.org/reports/tr35/tr35-dates.html#8-date-format-patterns
[Unicode Technical Standard #35]: https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
[datetime-placeholder]: https://github.com/prantlf/datetime-placeholder
[datetime-locale-patterns]: https://github.com/prantlf/datetime-locale-patterns
[intl-datetimeformat-pattern]: https://github.com/caridy/intl-datetimeformat-pattern
[intl-datetimeformat-options]: https://github.com/prantlf/intl-datetimeformat-options
