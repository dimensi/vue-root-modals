const pgk = require('./package')
module.exports = {
  format: ['umd', 'umd-min', 'es', 'cjs'],
  banner: true,
  moduleName: pgk.name,
  plugin: [
    require('rollup-plugin-vue')({
      css: 'dist/vue-root-modals.css',
      postcss: {
        plugins: [require('autoprefixer')]
      }
    }),
    require('rollup-plugin-clear')({
      targets: ['./dist/']
    })
  ],
  exports: 'named',
  postcss: {
    extract: false,
    plugin: [
      require('autoprefixer')
    ]
  }
}