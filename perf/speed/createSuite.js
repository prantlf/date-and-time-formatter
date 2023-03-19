import benchmark from 'benchmark'

const { Suite } = benchmark

function createSuite (description) {
  console.log(description)
  return new Suite()
    .on('cycle', ({ target }) => {
      const { error, name } = target
      if (error) {
        console.error(`  ${name} failed`)
      } else {
        console.log(`  ${target}`)
      }
    })
    .on('complete', function() {
      console.log(`Fastest was ${this.filter('fastest').map('name')}.`)
    })
    .on('error', ({ target }) => console.warn(target.error))
}

export default createSuite
