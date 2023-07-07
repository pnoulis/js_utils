import process from "node:process";
import path from "node:path";
import URL from "node:url";
import fs from "node:fs";

function getProcessDir() {
  return process.cwd();
}

/* Provide import.meta.URL for this to work */
function getModuleDir(module) {
  if (!module) {
    return null;
  }
  const modulePath = URL.fileURLToPath(module);
  const moduleDir = path.dirname(modulePath);
  return [moduleDir, modulePath];
}

function findNodePkgDir(startDir) {
  if (!startDir) {
    startDir = getProcessDir();
  } else {
    startDir = path.resolve(startDir);
  }

  return (function nextDir(dir) {
    return dir === path.sep
      ? null
      : (isNodePkg(dir) && dir) || nextDir(path.dirname(dir));
  })(startDir);
}

function isNodePkg(dir) {
  return findFile(dir, "package.json");
}

function findFile(dir, file) {
  const fileRE = new RegExp(file);
  const files = fs.readdirSync(dir, { encoding: "utf8" });
  for (const file of files) {
    if (fileRE.test(file)) return `${dir}/${file}`;
  }
  return null;
}

export { getProcessDir, getModuleDir, findNodePkgDir, isNodePkg, findFile };
