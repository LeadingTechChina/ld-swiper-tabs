// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: false
    }],
    // [
    //   '@babel/plugin-transform-runtime',
    //   {
    //     corejs: false,
    //     helpers: true,
    //     regenerator: false,
    //     useESModules: true,
    //   },
    // ],
    '@babel/preset-react'
  ]
}
