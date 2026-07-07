/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-vue'],
  rules: {
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    'at-rule-no-unknown': [true, { ignoreAtRules: ['tailwind', 'apply', 'layer'] }],
  },
}