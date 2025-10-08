import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Global ignores for generated/build files
  {
    ignores: [
      "**/.prisma/**",
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "./src/generated/prisma/**",
      "src/generated/prisma/**",
    ],
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Main configuration for your source code
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-require-imports": [
        "error",
        {
          // Allow specific Prisma-related requires
          allow: [
            "./runtime/index-browser.js",
            "./runtime/library.js",
            "@prisma/client",
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
