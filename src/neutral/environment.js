if (!Object.hasOwn(import.meta, "env")) {
  Object.defineProperty(import.meta, "env", {
    value: {},
    enumerable: true,
    configurable: true,
    writable: true,
  });
}

function detectRuntime() {
  if (typeof globalThis.process === "undefined") {
    return "browser";
  } else {
    return "node";
  }
}

function isRuntime(runtime) {
  return runtime === detectRuntime();
}

function detectMode() {
  let mode;
  if (isRuntime("browser")) {
    mode = import.meta.env.MODE;
  } else {
    mode = import.meta.env.MODE || globalThis.process.env.MODE;
  }
  if (!mode) {
    throw new Error("Could not detect mode");
  }
  return mode;
}

function isMode(mode) {
  return mode === detectMode();
}

function getEnvar(envar, required = true, defaultValue = "") {
  let value;
  if (isRuntime("browser")) {
    value = import.meta.env[envar] || defaultValue;
  } else {
    value =
      import.meta.env[envar] || globalThis.process.env[envar] || defaultValue;
  }
  if (!value && required) {
    throw new Error(`Missing environment variable:${envar}`);
  }
  return value;
}

export { detectRuntime, isRuntime, detectMode, isMode, getEnvar };
