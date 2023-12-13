import { isObject, isArray } from "./misc.js";

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
  const _envar =
    (function parseSource(source) {
      if (isArray(source)) {
        for (let i = source.length - 1; i >= 0; i--) {
          const _envar = parseSource(source[i]);
          if (_envar) return _envar;
        }
      }
      return isObject(source) ? source?.[envar] : source;
    })(sources) ||
    staticValue ||
    defaultValue ||
    undefined;

  if (required && !_envar) {
    throw new Error(`Missing environment variable:${envar}`);
  } else if (ignoreTarget) {
    return _envar;
  }
  return Object.assign(target ?? {}, { [rename ?? envar]: _envar });
}

export { detectRuntime, isRuntime, detectMode, isMode, getEnvar };
