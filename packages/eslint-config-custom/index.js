module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ["**/lib/*", "**/dist/*"],
  extends: [
    "plugin:react/recommended",
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "eslint-plugin-import-helpers",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "no-use-before-define": "off",
    "prettier/prettier": "error",
    "no-restricted-syntax": ["error", "regenerator-runtime"],
    "no-underscore-dangle": "off",
    camelcase: "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: true,
        },
      },
    ],
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "no-shadow": "off",
    "no-console": "off",
    "react/react-in-jsx-scope": "off",
    "import/no-unresolved": "off",
    "no-useless-constructor": 0,
    "no-empty-function": "off",
    "lines-between-class-members": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: ["module", "/^@shared/", ["parent", "sibling", "index"]],
        alphabetize: {
          order: "asc",
          ignoreCase: true,
        },
      },
    ],
    "import/no-extraneous-dependencies": [
      "off",
      {
        devDependencies: ["./test/*", "**/*.spec.ts"],
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
    react: {
      version: "detect",
    },
  },
};

