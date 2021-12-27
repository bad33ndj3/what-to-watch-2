module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 'warn',
    'no-unused-vars': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'warn',
  },
}
