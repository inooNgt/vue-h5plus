module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-empty": "off",
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-unused-vars": "off",
    "no-undef": "off",
    "prettier/prettier": "off",
    "vue/require-v-for-key": "off",
    indent: ["error", 2, { SwitchCase: 1 }]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
