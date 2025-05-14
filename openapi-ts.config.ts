import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./openapi.json",
  output: {
    path: "src/client",
    format: "prettier", // Format output with Prettier
    lint: "eslint", // Lint output with ESLint
    clean: true, // Clear output directory before generation
  },
  plugins: ["@hey-api/client-fetch", "@hey-api/typescript", "@hey-api/sdk"],
});
