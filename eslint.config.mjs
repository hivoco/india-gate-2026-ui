import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Keep JSX components small: at most 200 lines of code (blanks and
  // comments excluded) per component/function in .jsx/.tsx files.
  {
    files: ["**/*.jsx", "**/*.tsx"],
    rules: {
      "max-lines-per-function": [
        "error",
        { max: 200, skipBlankLines: true, skipComments: true },
      ],
    },
  },
]);

export default eslintConfig;
