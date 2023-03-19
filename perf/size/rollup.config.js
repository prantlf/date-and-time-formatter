import { nodeResolve } from '@rollup/plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'

export default [
  {
    input: 'size/date-and-time-formatter.js',
    output: {
      file: 'size/date-and-time-formatter.bundle.js',
      sourcemap: true
    },
    plugins: [
      cleanup()
    ]
  },
  {
    input: 'size/date-and-time.js',
    output: {
      file: 'size/date-and-time.bundle.js',
      sourcemap: true
    },
    plugins: [
      nodeResolve(),
      cleanup()
    ]
  },
  {
    input: 'size/date-fns.js',
    output: {
      file: 'size/date-fns.bundle.js',
      sourcemap: true
    },
    plugins: [
      nodeResolve(),
      cleanup()
    ]
  },
  {
    input: 'size/luxon.js',
    output: {
      file: 'size/luxon.bundle.js',
      sourcemap: true
    },
    plugins: [
      nodeResolve(),
      cleanup()
    ]
  },
]
