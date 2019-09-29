import pgk from './package.json'

/** @type {import('bili').Config} */
const config = {
  banner: true,
  output: {
    format: ['es', 'cjs-min'],
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