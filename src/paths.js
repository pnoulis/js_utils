import { cwd } from "node:process";
import { resolve } from "node:path";
import URL from "node:url";
import fs from "node:fs";

function getProcessDir() {
  return cwd();
}

/*
  An example, one must implement this
  function on the target file. Otherwise it
  does not work.
 */
function getModuleDir() {
  return URL.fileURLToPath(import.meta.url);
}

function getPackageDir(directory = cwd()) {
  const files = fs.readdirSync(directory, { encoding: "utf8" });
  for (const file of files) {
    if (file === "package.json") return directory;
  }
  return getPackageDir(resolve(directory, "../"));
}

export { getProcessDir, getPackageDir };
