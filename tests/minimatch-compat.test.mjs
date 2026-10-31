import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { ESLint } from "eslint";
import react from "eslint-plugin-react";
import accessibility from "eslint-plugin-jsx-a11y";
import imports from "eslint-plugin-import";

const require = createRequire(import.meta.url);
const patched = require("minimatch");
const legacy = require("minimatch");

test("every legacy lint consumer uses the callable patched matcher", () => {
  for (const name of ["eslint", "@eslint/config-array", "@eslint/eslintrc", "eslint-plugin-react", "eslint-plugin-jsx-a11y", "eslint-plugin-import"]) {
    const consumer = createRequire(require.resolve(name));
    const matcher = consumer("minimatch");
    assert.equal(typeof matcher, "function", name);
    assert.equal(matcher.Minimatch, patched.Minimatch, name);
    assert.equal(matcher("app/contact/page.tsx", "**/*.tsx"), true, name);
  }
  const estree = createRequire(require.resolve("@typescript-eslint/typescript-estree"));
  assert.equal(estree("minimatch/package.json").version, "11.0.3");
  assert.equal(require("minimatch/package.json").version, "11.0.3");
  assert.equal(legacy.minimatch, legacy);
});

test("repeated install and check hooks leave the patched dependency unchanged", () => {
  const entry = require.resolve("minimatch");
  const before = readFileSync(entry, "utf8");
  const script = fileURLToPath(new URL("../scripts/patch-minimatch.mjs", import.meta.url));
  for (let i = 0; i < 2; i++) {
    const result = spawnSync(process.execPath, [script], { encoding: "utf8", timeout: 5000 });
    assert.equal(result.status, 0, result.stderr);
  }
  assert.equal(readFileSync(entry, "utf8"), before);
});

test("lint globs preserve braces, extglobs, negation, dotfiles and Windows paths", () => {
  assert.equal(legacy("app/page.tsx", "**/*.{ts,tsx}"), true);
  assert.equal(legacy("app/page.css", "**/*.{ts,tsx}"), false);
  assert.equal(legacy("app/page.tsx", "**/+(*.ts|*.tsx)"), true);
  assert.equal(legacy("app/page.css", "!**/*.tsx"), true);
  assert.equal(legacy("app/page.tsx", "!**/*.tsx"), false);
  assert.equal(legacy(".config/test.js", "**/*.js"), false);
  assert.equal(legacy(".config/test.js", "**/*.js", { dot: true }), true);
  assert.equal(new legacy.Minimatch("**/*.tsx").match("app/page.tsx"), true);
  assert.equal(legacy("app\\contact\\page.tsx", "**/*.tsx", { platform: "win32", windowsPathsNoEscape: true }), true);
  assert.deepEqual(legacy.match(["a.tsx", "b.css"], "*.tsx"), ["a.tsx"]);
  assert.equal(legacy.defaults({ dot: true })(".hidden.js", "*.js"), true);
});

function lintWith(plugins, rules) {
  return new ESLint({
    overrideConfigFile: true,
    overrideConfig: [{
      files: ["**/*.jsx"],
      languageOptions: { ecmaVersion: "latest", sourceType: "module", parserOptions: { ecmaFeatures: { jsx: true } } },
      plugins,
      rules,
    }],
  });
}

test("React wildcard prop rules still run and report forbidden props", async () => {
  const eslint = lintWith({ react }, { "react/forbid-component-props": ["error", { forbid: [{ propNamePattern: "data-*" }] }] });
  const [bad] = await eslint.lintText('const Example = () => <Widget data-secret="value" />;', { filePath: "compat-rule.jsx" });
  assert.equal(bad.fatalErrorCount, 0);
  assert.equal(bad.messages.filter(item => item.ruleId === "react/forbid-component-props").length, 1);
  const [good] = await eslint.lintText('const Example = () => <Widget title="value" />;', { filePath: "compat-rule.jsx" });
  assert.equal(good.errorCount, 0);
});

test("accessibility wildcard controls retain label association checks", async () => {
  const rule = "jsx-a11y/label-has-associated-control";
  const eslint = lintWith({ "jsx-a11y": accessibility }, { [rule]: ["error", { controlComponents: ["Control*"] }] });
  const [good] = await eslint.lintText('const Example = () => <label>Account <ControlInput /></label>;', { filePath: "compat-rule.jsx" });
  assert.equal(good.errorCount, 0);
  const [bad] = await eslint.lintText('const Example = () => <label>Account <span /></label>;', { filePath: "compat-rule.jsx" });
  assert.equal(bad.messages.filter(item => item.ruleId === rule).length, 1);
});

test("import wildcard groups still enforce dependency ordering", async () => {
  const eslint = lintWith({ import: imports }, { "import/order": ["error", {
    groups: ["external", "internal"],
    pathGroups: [{ pattern: "@app/**", group: "internal", position: "after" }],
    pathGroupsExcludedImportTypes: ["builtin"],
  }] });
  const [bad] = await eslint.lintText('import Widget from "@app/widget";\nimport React from "react";', { filePath: "compat-rule.jsx" });
  assert.equal(bad.fatalErrorCount, 0);
  assert.equal(bad.messages.some(item => item.ruleId === "import/order"), true);
  const [good] = await eslint.lintText('import React from "react";\nimport Widget from "@app/widget";', { filePath: "compat-rule.jsx" });
  assert.equal(good.errorCount, 0);
});

test("amplifying glob preprocessing stays bounded with the patched matcher", () => {
  const entry = require.resolve("minimatch");
  const code = `
    const match = require(${JSON.stringify(entry)});
    try {
      match('src/test.tsx', '**/../'.repeat(30) + '*.tsx', {
        optimizationLevel: 2, braceExpandMax: 64,
      });
    } catch (error) {
      if (!/limit|expan|pattern/i.test(String(error.message))) throw error;
    }
  `;
  const result = spawnSync(process.execPath, ["--max-old-space-size=96", "--input-type=commonjs", "-e", code], { timeout: 5000, encoding: "utf8" });
  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.status, 0, result.stderr);
});
