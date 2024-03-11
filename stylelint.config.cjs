module.exports = {
  extends: ['@etchteam/stylelint-config'],
  rules: {
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute'],
      },
    ],
    'selector-max-compound-selectors': [
      5,
      {
        severity: 'warning',
      },
    ],
  },
};
