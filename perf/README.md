# DateTime Formatting Performance 

## Speed

Library [date-and-time-formatter] excels. Especially when the date/time-formatting pattern is pre-compiled, when it is 5-20x faster than other libraries. Even without the pre-compiling, it is 3-6x faster than other libraries.

    > node speed

    Formatting a short pattern "M/d/yy, h:mm a" with...
      date-and-time-formatter x 822,839 ops/sec ±0.46% (96 runs sampled)
      date-and-time-formatter compiled x 2,599,102 ops/sec ±0.81% (94 runs sampled)
      date-and-time x 324,779 ops/sec ±0.49% (97 runs sampled)
      date-and-time compiled x 478,503 ops/sec ±0.71% (92 runs sampled)
      date-fns x 230,396 ops/sec ±0.35% (95 runs sampled)
      luxon x 139,527 ops/sec ±0.65% (94 runs sampled)
      luxon created x 162,779 ops/sec ±0.68% (90 runs sampled)
    Fastest was date-and-time-formatter compiled.

    Formatting a medium pattern "MMM d, y, h:mm:ss a" with...
      date-and-time-formatter x 753,327 ops/sec ±0.43% (95 runs sampled)
      date-and-time-formatter compiled x 2,812,736 ops/sec ±0.72% (89 runs sampled)
      date-and-time x 271,041 ops/sec ±0.51% (95 runs sampled)
      date-and-time compiled x 399,827 ops/sec ±0.35% (94 runs sampled)
      date-fns x 195,448 ops/sec ±0.55% (92 runs sampled)
      luxon x 143,781 ops/sec ±0.68% (96 runs sampled)
      luxon created x 171,812 ops/sec ±0.55% (91 runs sampled)
    Fastest was date-and-time-formatter compiled.

    Formatting a long pattern "MMMM d, y, h:mm:ss a z" with...
      date-and-time-formatter x 589,093 ops/sec ±0.69% (93 runs sampled)
      date-and-time-formatter compiled x 1,725,409 ops/sec ±0.67% (94 runs sampled)
      date-and-time x 240,146 ops/sec ±0.56% (96 runs sampled)
      date-and-time compiled x 360,116 ops/sec ±0.32% (95 runs sampled)
      date-fns x 169,600 ops/sec ±0.41% (93 runs sampled)
      luxon x 114,074 ops/sec ±0.88% (94 runs sampled)
      luxon created x 135,270 ops/sec ±0.65% (93 runs sampled)
    Fastest was date-and-time-formatter compiled.

    Formatting a full pattern "EEEE, MMMM d, y, h:mm:ss a zzzz" with...
      date-and-time-formatter x 503,943 ops/sec ±0.42% (96 runs sampled)
      date-and-time-formatter compiled x 1,557,641 ops/sec ±0.49% (96 runs sampled)
      date-and-time x 198,088 ops/sec ±0.48% (98 runs sampled)
      date-and-time compiled x 312,863 ops/sec ±0.36% (95 runs sampled)
      date-fns x 143,069 ops/sec ±0.73% (96 runs sampled)
      luxon x 109,197 ops/sec ±0.55% (95 runs sampled)
      luxon created x 126,569 ops/sec ±0.61% (94 runs sampled)
    Fastest was date-and-time-formatter compiled.

## Size

Libraries [date-and-time-formatter] and [date-and-time] excel, being 3-15x smaller than other libraries. The [date-and-time] could do better if it provided named exports.

Libraries like [luxon] and [date-fns] offer a complete solution for dealing with date/time values - computing, parsing and formatting. That's why they have greater size than libraries focusing only on date/time formatting. However, it's a pity that they are not built with the support for tree-shaking. The resulting bundle size is bigger than necessary only if the named exports for formatting are imported to the testing application.

    ❯ npm run size

| Bundled library                | Minified | Gzipped | Brotlied |
|:-------------------------------|---------:|--------:|---------:|
| date-and-time-formatter bundle |  6.75 kB |  2.3 kB |  2.12 kB |
| date-and-time bundle           |  8.47 kB | 2.37 kB |  2.19 kB |
| date-fns bundle                |  27.6 kB | 6.69 kB |     6 kB |
| luxon bundle                   |  74.4 kB | 21.1 kB |  18.8 kB |

[date-and-time-formatter]: https://github.com/prantlf/date-and-time-formatter
[date-and-time]: https://github.com/knowledgecode/date-and-time
[date-fns]: https://github.com/date-fns/date-fns
[luxon]: https://moment.github.io/luxon/
