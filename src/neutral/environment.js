// runtime detection
const browser = globalThis.window;
const webWorker = !browser && globalThis.self;
const node = globalThis.process;
function detectRuntime() {
  return (
    (browser && "browser") || (webWorker && "webWorker") || (node && "node")
  );
}

function isRuntime(runtime) {
  return runtime === detectRuntime();
}

function detectMode() {
  return getEnvar("MODE", true);
}

function isMode(mode) {
  return mode === detectMode();
}

function getEnvar(envar = "", required = true, defaultValue = "") {
  let value;

  value = globalThis.__ENV__?.[envar];
  if (value) {
    return value;
  }
  value = import.meta.env?.[envar];
  if (value) {
    return value;
  }
  value = globalThis.process?.env[envar];
  if (value) {
    return value;
  }
  value = defaultValue;
  if (!value && required) {
    throw new Error(`Missing environment variable:${envar}`);
  }
  return value || defaultValue;
}

export { detectRuntime, isRuntime, detectMode, isMode, getEnvar };
