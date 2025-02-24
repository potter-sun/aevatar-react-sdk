import { defineConfig } from "vitest/config";
import { vitestConfigObj } from "./vitest-config";

export default defineConfig({
  test: vitestConfigObj as any,
});
