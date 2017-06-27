module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    // "ecmaVersion": 6, //指定ECMAScript支持的版本，6为ES6
    // "ecmaFeatures": {
    //   "jsx": true//启动JSX
    // },
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ['standard'],// "extends": "eslint:recommended",
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    "strict": "error",
    'arrow-parens': 0,
    "camelcase": ["warn", {properties: "never"}],
    "curly": "error", //error = 2
    "eqeqeq": "off", //off = 0
    'generator-star-spacing': 0,
    "indent": ["off"],
    "new-cap": ["error", {"newIsCap": false, "properties": false}],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-extend-native": ["error", {"exceptions": ["String", "Date"]}],
    "no-extra-parens": ["off"],
    "no-eval": ["warn"],
    "no-labels": "off",//warn
    "no-redeclare": ["warn"],
    "no-tabs": "off",
    "no-undef": ["error", {"typeof": true}],
    "no-unused-vars": ["error", {"vars": "all", "args": "none", "ignoreRestSiblings": false,"varsIgnorePattern":"[initCB_|itemClickCB_|sst]"}],
    "no-useless-call": "off",
    "no-useless-escape": ["warn"],
    "one-var": ["off"],
    "operator-linebreak": ["error", "before"],
    "quotes": ["off"],//["error","double"],//
    "space-before-blocks": ["off"],
    "spaced-comment": "off",
    "semi": ["error", "always"]
  },
  "env": {
    "browser": true,
    "node": true,
    "jquery": true
  },
  "globals": {
    "window": true
  }
};
