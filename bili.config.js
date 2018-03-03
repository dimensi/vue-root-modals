module.exports = {
  format: ['es'],
  banner: true,
  plugin: [
    'vue',
    require('rollup-plugin-clear')({
      targets: ['./dist/']
    })
  ],
  exports: 'named',
}