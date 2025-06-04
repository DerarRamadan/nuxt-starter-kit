import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Customize rules here
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'vue/no-multiple-template-root': 'off'
  }
})
