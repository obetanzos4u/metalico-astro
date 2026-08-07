import globals from "globals";
import js from "@eslint/js";
import astro from "eslint-plugin-astro";

export default [
  { ignores: ["dist/**", ".astro/**", "logo-contact/**"] },
  {
    files: ["src/**/*.{js,ts}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    ...js.configs.recommended,
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  ...astro.configs["flat/recommended"],
];