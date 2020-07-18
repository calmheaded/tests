module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    indent: 0,
    'no-console': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // //
    semi: 'off',
    // "quotes": "warn",
    // "space-before-function-paren": 0,
    quotes: [1, 'single'], // 引号类型 `` "" ''
    'space-before-function-paren': [0, 'always'] // 函数定义时括号前面要不要有空格
  }
}
