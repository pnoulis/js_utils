import { findNodePkgDir } from "./paths.js";
import path from "node:path";
import * as fs from "node:fs";
import process from "node:process";

function loadenv(envpath, cb) {
  if (envpath) {
    envpath = path.resolve(envpath);
  } else {
    envpath = findNodePkgDir(process.cwd());
    if (!envpath) {
      throw new Error("loadenv() could not locate environment file.");
    }
    envpath += "/.env";
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

function parsenv() {}

export { loadenv };
