// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  ignorePatterns: ["/dist/*"],
  rules: {
    "prettier/prettier": "error",
  },
  settings: {
    "import/resolver": {
      typescript: {}, // this will use your tsconfig.json paths
    },
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "import/newline-after-import": "warn",
        "import/order": [
          "warn",
          {
            "newlines-between": "always",
            alphabetize: {
              order: "asc",
              caseInsensitive: false,
            },
            groups: ["builtin", "external", "internal", "sibling"],
            pathGroupsExcludedImportTypes: [],
          },
        ],
      },
    },
  ],
};
