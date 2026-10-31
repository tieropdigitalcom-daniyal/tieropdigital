import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

// Minimatch 11 fixes CVE-2026-118764, but older ESLint plugins still expect
// require("minimatch") itself to be callable. Adapt only the CommonJS export;
// leave the upstream matching algorithm, named helpers and ESM entry untouched.
const require = createRequire(import.meta.url);
let manifest;
try {
  manifest = require.resolve("minimatch/package.json");
} catch (error) {
  if (error.code !== "MODULE_NOT_FOUND") throw error;
  // Production-only installs omit the development lint tools entirely.
  console.log("minimatch compatibility: development dependency is not installed");
  process.exit(0);
}

const { version } = JSON.parse(readFileSync(manifest, "utf8"));
if (version !== "11.0.3") {
  throw new Error(`Review minimatch compatibility before changing the pinned version (found ${version}).`);
}

const entry = require.resolve("minimatch");
const source = readFileSync(entry, "utf8");
const marker = "// tieropdigital: patched minimatch CommonJS compatibility";
const adapter = `${marker}\nmodule.exports = Object.assign(exports.minimatch, exports);\n`;
if (!source.includes(marker)) {
  if (!source.includes("exports.minimatch") || !source.includes("exports.Minimatch")) {
    throw new Error("Unexpected minimatch CommonJS entry; refusing to patch it.");
  }
  writeFileSync(entry, `${source}\n${adapter}`);
}

const patched = require("minimatch");
if (typeof patched !== "function" || patched.minimatch !== patched || typeof patched.Minimatch !== "function") {
  throw new Error("Minimatch's legacy call format and named exports must both be available.");
}
console.log(`minimatch ${version}: patched matcher and legacy lint calls are ready`);
