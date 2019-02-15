import pgk from './package'

/** @type {import('bili').Config} */
const config = {
  banner: true,
  output: {
    moduleName: pgk.name,
    format: ['es', 'cjs'],
  },
  plugins: {
    vue: {
      css: false,
      style: {
        postcssPlugins: [require('autoprefixer')]
      }
    }
  }
}

export default config