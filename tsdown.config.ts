import { defineConfig } from "tsdown";

// Same files and names tsup made: CJS as .js and .d.ts, ESM as .mjs and .d.mts.
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  target: "es2020",
  outExtensions: ({ format }) =>
    format === "cjs"
      ? { js: ".js", dts: ".d.ts" }
      : { js: ".mjs", dts: ".d.mts" },
});
