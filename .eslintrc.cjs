/*eslint-env node*/
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/eslint-config-typescript"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "vue/multi-word-component-names": 0,
  },
  globals: {
      defineOptions: "readonly",
  }
};
