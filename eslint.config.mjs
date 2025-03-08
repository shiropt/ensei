import pluginJs from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

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
const config = [...nextConfig, pluginJs.configs.recommended];

export default config;
