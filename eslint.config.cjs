// const js = require("@eslint/js");
// const globals = require("globals");
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  // ...js.configs.recommended,
  {
    //   globals: {
    //     // globals.amd defines require() (and define())
    //     ...globals.amd
    //   },
    // ignores: ['./node_modules/*'],
    rules: {
      // OVERRIDES FOR '@eslint/js' reccommended
      'no-debugger': 'warn',
      'no-empty': ['error', { allowEmptyCatch: true }], // Allow empty catch statements
      'no-constant-condition': ['error', { checkLoops: false }], // Allow while (true)
      // WARNINGS
      'no-console': 'warn',
      'no-alert': 'warn',
      // PROBLEMS
      // https://eslint.org/docs/latest/rules/#possible-problems
      'array-callback-return': ['error', { checkForEach: true }],
      'no-constructor-return': 'error',
      'no-duplicate-imports': 'error',
      'no-promise-executor-return': 'error',
      'no-self-compare': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unreachable-loop': 'error',
      'no-use-before-define': ['error', { functions: false }],
      'no-useless-assignment': 'error',
      'require-atomic-updates': 'error',
      // https://eslint.org/docs/latest/rules/#suggestions
      'accessor-pairs': 'error',
      'dot-notation': 'error',
      eqeqeq: ['error', 'smart'],
      'no-array-constructor': 'error',
      'no-caller': 'error',
      'no-else-return': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-loop-func': 'error',
      'no-multi-str': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-object-constructor': 'error',
      'no-octal-escape': 'error',
      'no-proto': 'error',
      'no-script-url': 'error',
      'no-sequences': 'error',
      'no-undef-init': 'error',
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: { array: false, object: true },
          AssignmentExpression: { array: false, object: false }
        }
      ],
      'prefer-exponentiation-operator': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-spread': 'error',
      'prefer-regex-literals': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      strict: 'error',
      yoda: ['error', 'never', { onlyEquality: true }]
    }
  },
  eslintConfigPrettier // Turns off all rules that are unnecessary or might conflict with Prettier.
];
