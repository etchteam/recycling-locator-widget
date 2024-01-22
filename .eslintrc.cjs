module.exports = {
  extends: ['@etchteam'],
  rules: {
    // Disable NextJS rules from @etchteam/eslint
    '@next/next/no-img-element': 0,
    '@next/next/no-html-link-for-pages': 0,
  }
};
