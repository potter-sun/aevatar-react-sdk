import type { InlineConfig } from "vite";

export const vitestConfigObj: InlineConfig["test"] = {
  globals: true,
  environment: "node",
  watch: false,
  coverage: {
    provider: "v8",
  },
  exclude: [
    "**/node_modules/**",
    "**/types/**",
    "**/constants/**",
    "**/assets/**",
  ],
};
