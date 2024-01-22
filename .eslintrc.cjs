module.exports = {
  extends: ['@etchteam'],
  rules: {
    // Disable NextJS rules from @etchteam/eslint
    '@next/next/no-img-element': 0,
    '@next/next/no-html-link-for-pages': 0,

    // The no namespace rule conflicts with the way custom elements are declared for JSX
    '@typescript-eslint/no-namespace': 0,
  },
};
