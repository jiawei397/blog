module.exports = {
  extends:'jw397',
  parserOptions: {
    "ecmaVersion": 6, //指定ECMAScript支持的版本，6为ES6
    // "ecmaFeatures": {
    //   "jsx": true//启动JSX
    // },
    sourceType: 'module'
  },
  // add your custom rules here
  'rules': {
    "no-unused-vars": ["error", {"vars": "all", "args": "none", "ignoreRestSiblings": false,"varsIgnorePattern":"[BMAP_]"}]
  },
  "env": {
    "browser": true,
    "node": true,
    "jquery": true
  },
  "globals": {
    "window": true,
    "BMap":true,
    "BMapLib":true,
    "BMAP_TRANSIT_POLICY_LEAST_TIME":true,
    "BMAP_TRANSIT_POLICY_LEAST_TRANSFER":true,
    "BMAP_TRANSIT_POLICY_LEAST_WALKING":true,
    "BMAP_TRANSIT_POLICY_AVOID_SUBWAYS":true
  }
};
