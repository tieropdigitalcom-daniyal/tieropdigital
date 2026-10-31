// Accept both Next.js and shared preview CLI spelling on Windows and Linux.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const incoming = process.argv.slice(2);
let hostname = "0.0.0.0", port = "5173";
const extra = [];
for (let i = 0; i < incoming.length; i++) {
  const value = incoming[i];
  if (value === "--host" || value === "--hostname") hostname = incoming[++i] ?? hostname;
  else if (value.startsWith("--host=") || value.startsWith("--hostname=")) hostname = value.slice(value.indexOf("=") + 1);
  else if (value === "--port" || value === "-p") port = incoming[++i] ?? port;
  else if (value.startsWith("--port=")) port = value.slice(7);
  // An explicit Next.js port already fails if occupied.
  else if (value !== "--strictPort") extra.push(value);
}
const child = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "dev", "--hostname", hostname, "--port", port, ...extra], { stdio: "inherit" });
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
child.on("error", error => { console.error(error.message); process.exitCode = 1; });
child.on("exit", code => { process.exitCode = code ?? 1; });
