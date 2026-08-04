import { copyFile, cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const clientDirectory = resolve(projectRoot, "dist", "client");
const serverDirectory = resolve(projectRoot, "dist", "server");
const pagesDirectory = resolve(projectRoot, "dist", "pages");
const workerDeployRedirect = resolve(projectRoot, ".wrangler", "deploy");

await rm(pagesDirectory, { recursive: true, force: true });
await mkdir(pagesDirectory, { recursive: true });

// Pages advanced mode expects static files and the module Worker in one output
// directory. Vinext already emits both; this step only assembles them.
await cp(clientDirectory, pagesDirectory, { recursive: true });
await cp(serverDirectory, pagesDirectory, { recursive: true });
await copyFile(
  resolve(pagesDirectory, "index.js"),
  resolve(pagesDirectory, "_worker.js"),
);
await rm(resolve(pagesDirectory, "wrangler.json"), { force: true });

// The Vite Worker build emits a redirect to its Worker-only Wrangler config.
// Pages must instead read the root Pages config after the shared build finishes.
await rm(workerDeployRedirect, { recursive: true, force: true });
