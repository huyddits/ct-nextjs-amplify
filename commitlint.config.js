export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test', 'merge'],
    ],
    'header-max-length': [2, 'always', 150],
    'subject-full-stop': [2, 'never', '.'],
    'scope-empty': [2, 'never'],
    'scope-enum': [
      2,
      'always',
      [
        'setup',
        'docs',
        'auth',
        'component',
        'page',
        'global',
        'business',
        // others
      ],
    ],
  },
};
