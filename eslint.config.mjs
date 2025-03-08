import pluginJs from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import functional from "eslint-plugin-functional";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

const nextConfig = [
  ...compat.config({
    extends: ["eslint:recommended", "next"],
  }),
];

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...nextConfig,
  pluginJs.configs.recommended,
  // functional.configs.externalTypeScriptRecommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      functional,
      react: reactPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...functional.configs.externalTypeScriptRecommended.rules,
      ...functional.configs.recommended.rules,
      ...functional.configs.stylistic.rules,
      "functional/prefer-immutable-types": "off",
      "functional/no-return-void": "off",
      "functional/functional-parameters": "off",
      "functional/no-conditional-statement": "off",
      "functional/no-expression-statements": "off",
    },
  },
];

export default config;
