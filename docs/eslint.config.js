import eslintJs from "@eslint/js";
import tseslint from "typescript-eslint";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  eslintJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    ...reactRecommended,
    languageOptions: {
      ...reactRecommended.languageOptions,
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        browser: true,
        es2021: true
      }
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off", // Not needed with React 17+ and new JSX transform
      "react/prop-types": "off" // Often handled by TypeScript
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ignores: ["dist/", "node_modules/", "vite.config.ts.timestamp*"],
  }
);