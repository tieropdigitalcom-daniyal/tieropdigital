import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 22 || (major === 22 && minor < 13)) {
  console.error("Please install Node.js LTS (22.13 or newer) from https://nodejs.org/en/download");
  process.exit(1);
}
const localDirectory = new URL("../.sites-runtime/", import.meta.url);
mkdirSync(fileURLToPath(localDirectory), { recursive: true });
writeFileSync(new URL("execution-profile.json", localDirectory), JSON.stringify({ executionProfile: "portable" }) + "\n");
console.log("Local website mode is ready.");
