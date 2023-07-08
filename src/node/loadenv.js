import { findNodePkgDir } from "./paths.js";
import os from "node:os";
import path from "node:path";
import * as fs from "node:fs";
import process from "node:process";

if (!Object.hasOwn(import.meta, "env")) {
  Object.defineProperty(import.meta, "env", {
    value: {},
    enumerable: true,
    configurable: true,
    writable: true,
  });
}

function loadenv(envpath) {
  if (envpath) {
    envpath = path.resolve(envpath);
  } else {
    envpath = findNodePkgDir(process.cwd());
    if (!envpath) {
      throw new Error("loadenv() could not locate environment file.");
    }
  }

  if (!/\/?env[^\/]*$/.test(envpath)) {
    envpath += '/.env';
  }

  let data = undefined;
  try {
    data = fs.readFileSync(envpath, {
      encoding: "utf8",
      flag: "r",
    });
  } catch (err) {
    throw new Error(`loadenv() failed to read: ${envpath}`, { cause: err });
  }

  return parsenv(data);
}

function parsenv(env) {
  return (
    env
      // EOL = platform specific control character
      .split(os.EOL)
      // [ [k, v], [k, v], ... ]
      .map((line) => line.split("="))
      // safeguard against empty lines or last newline
      .filter(([k, v]) => !!k)
  );
}

function envToImportMeta(envpath) {
  const env = loadenv(envpath);
  for (const [k, v] of env) {
    import.meta.env[k] = v;
  }
  return import.meta.env;
}

export { loadenv, envToImportMeta };
