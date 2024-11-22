import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "semi": "off",
      "eqeqeq": "error",
      "no-console": "warn",
      "no-unused-expressions": "warn",
      "no-unused-vars": "warn",
      "no-useless-concat": "warn",
      "no-useless-return": "warn",
      "no-useless-rename": "warn",
      "no-var": "error",
      "no-return-await":"error",
      "no-await-in-loop":"warn",
      "no-mixed-spaces-and-tabs": "error",
      "require-await": "error",
      "indent": ["error", 2],
      "space-before-function-paren": ["error", "always"],
      "space-in-parens": ["error", "never"],
      "space-infix-ops":"error"
    }
  },
];