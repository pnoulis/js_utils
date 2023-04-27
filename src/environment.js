function detectRuntime() {
  if (typeof process === "undefined") {
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
    mode = `${__IMPORT__.env.MODE || ""}`;
  } else {
    mode = `${__PROCESS__.env.MODE || ""}` || `${__IMPORT__.env.MODE || ""}`;
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
    value = `${__IMPORT__?.env?.[envar] || ""}` || defaultValue;
  } else {
    value =
      `${__PROCESS__?.env?.[envar] || ""}` ||
      `${__IMPORT__?.env?.[envar] || ""}` ||
      defaultValue;
  }

  if (required && !value) {
    throw new Error(`Missing environment variable:${envar}`);
  }
  return value;
}

export { detectRuntime, isRuntime, detectMode, isMode, getEnvar };
