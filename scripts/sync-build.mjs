import { cp, copyFile, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

await copyFile(resolve(root, "dist", "app.html"), resolve(root, "dist", "index.html"));
await copyFile(resolve(root, "dist", "index.html"), resolve(root, "index.html"));
await rm(resolve(root, "assets"), { recursive: true, force: true });
await mkdir(resolve(root, "assets"), { recursive: true });
await cp(resolve(root, "dist", "assets"), resolve(root, "assets"), {
  recursive: true,
  force: true,
});
