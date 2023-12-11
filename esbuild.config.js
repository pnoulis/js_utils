import * as esbuild from "esbuild";

const DISTDIR = process.env.DISTDIR;
const MODE = process.env.MODE;

let BUILD_OPTIONS;
if (MODE === "production") {
  BUILD_OPTIONS = {
    drop: ["console"],
    sourcemap: false,
    minify: true,
  };
} else {
  BUILD_OPTIONS = {
    sourcemap: true,
    minify: false,
  };
}

// nodejs only modules
const nodejs = {
  bundle: true,
  platform: "node",
  target: "esnext",
  format: "esm",
  packages: "external",
  entryPoints: [
    "./src/node/index.js",
    "./src/node/paths.js",
    "./src/node/loadenv.js",
  ],
  entryNames: "[dir]/[name]",
  outdir: `${DISTDIR}/node`,
  ...BUILD_OPTIONS,
};

// browser only modules
const browser = {
  bundle: true,
  platform: "browser",
  target: "esnext",
  format: "esm",
  entryPoints: ["./src/browser/index.js"],
  entryNames: "[dir]/[name]",
  outdir: `${DISTDIR}/browser`,
  ...BUILD_OPTIONS,
};

// modules able to be used across platforms
const neutral = {
  bundle: true,
  platform: "neutral",
  packages: "external",
  target: "esnext",
  format: "esm",
  entryPoints: [
    "./src/neutral/index.js",
    "./src/neutral/uuid.js",
    "./src/neutral/stateful.js",
    "./src/neutral/eventful.js",
    "./src/neutral/misc.js",
    "./src/neutral/generateRandomName.js",
    "./src/neutral/environment.js",
    "./src/neutral/ConsoleLogger.js",
    "./src/neutral/task_runners/index.js",
    "./src/neutral/task_runners/TaskRunner.js",
    "./src/neutral/pipeline/Pipeline.js",
  ],
  entryNames: "[dir]/[name]",
  outdir: `${DISTDIR}`,
  ...BUILD_OPTIONS,
};

esbuild.build(nodejs);
esbuild.build(browser);
esbuild.build(neutral);
