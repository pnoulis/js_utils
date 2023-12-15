import { isObject, isArray, isString, isNumber } from "./misc.js";

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

function parseEnvSource(source, key) {
  if (isArray(source)) {
    for (let i = source.length - 1; i >= 0; i--) {
      const envar = parseEnvSource(source[i], key);
      if (envar) return envar;
    }
  }
  return isObject(source)
    ? source[key]
    : (isString(source) || isNumber(source)) && source;
}

/*
  Best way to use:
  const specializedGetEnvar = getEnvar.bind(null, ENV, [sources...])
  specializedGetEnvar('ENVAR_NAME');
 */
function getEnvar(
  sources,
  target,
  envar = "",
  { required = false, defaultValue, staticValue, ignoreTarget, rename } = {},
) {
  const _envar = parseEnvSource(sources, envar) || staticValue || defaultValue || "";
  if (required && !_envar) {
    throw new Error(`Missing environment variable:${envar}`);
  } else if (ignoreTarget) {
    return _envar;
  }
  return Object.assign(target ?? {}, { [rename ?? envar]: _envar });
}

export { detectRuntime, isRuntime, detectMode, isMode, getEnvar };
