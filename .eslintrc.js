module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier", "prettier/react"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  parser: "babel-eslint",
  plugins: ["react", "unused-imports", "prettier", "jest"],
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src"],
      },
    },
  },
  rules: {
    "react/jsx-filename-extension": [0],
    "unused-imports/no-unused-imports": 2,
    "unused-imports/no-unused-vars": 2,
    "no-console": [
      2,
      {
        allow: ["warn", "error", "info"],
      },
    ],
    "prettier/prettier": 2,
    "react/prop-types": 0,
    "jsx-a11y/alt-text": 0,
    "react/jsx-props-no-spreading": 0,
    "arrow-body-style": [2, "as-needed"],
    radix: "off",
    "object-shorthand": 2,
    "no-cond-assign": 2,
    "no-undef": 2,
    "no-useless-catch": 2,
    "prefer-rest-params": 2,
    "no-async-promise-executor": 2,
    curly: 2,
    "default-case": 2,
    "default-param-last": 2,
    eqeqeq: 2,
    "max-classes-per-file": 1,
    "no-caller": 2,
    "no-eval": 2,
    "no-extra-bind": 2,
    "no-lone-blocks": 2,
    "no-return-await": 2,
    "vars-on-top": 2,
    "no-var": 2,
    "prefer-const": 2,
    "no-use-before-define": 2,
    camelcase: 1,
    "no-case-declarations": 0,
    "react-native/no-inline-styles": 0,
    "react-hooks/exhaustive-deps": 0,
    "no-prototype-builtins": 0,
    "function-call-argument-newline": [2, "consistent"],
    "brace-style": 2,
    "prefer-destructuring": 2,
    "no-plusplus": 0,
    "no-continue": 0,
    "prefer-template": 2,
    "import/prefer-default-export": 1,
  },
};