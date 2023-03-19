import cleanup from 'rollup-plugin-cleanup'
import { minify } from 'rollup-plugin-swc-minify'

export default [
  {
    input: 'lib/index.js',
    output: [
      {
        file: 'lib/index.cjs',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'lib/index.min.js',
        format: 'umd',
        name: 'dateAndTimeFormatter',
        sourcemap: true,
        plugins: [
          minify()
        ]
      }
    ],
    plugins: [
      cleanup()
    ]
  }
]
