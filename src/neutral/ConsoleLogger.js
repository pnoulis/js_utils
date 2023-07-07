function ConsoleLogger({ logLevel = "trace" } = {}) {
  this.logLevel = this.levels[logLevel];
}

ConsoleLogger.prototype.levels = {
  trace: 5,
  debug: 4,
  info: 3,
  warn: 2,
  error: 1,
  fatal: 0,
  silent: -1,
};

ConsoleLogger.prototype.trace = function trace(...args) {
  if (this.logLevel < this.levels.trace) return;
  console.log(...args);
};

ConsoleLogger.prototype.debug = function debug(...args) {
  if (this.logLevel < this.levels.debug) return;
  console.log(...args);
};

ConsoleLogger.prototype.info = function info(...args) {
  if (this.logLevel < this.levels.info) return;
  console.log(...args);
};

ConsoleLogger.prototype.warn = function warn(...args) {
  if (this.logLevel < this.levels.warn) return;
  console.log(...args);
};

ConsoleLogger.prototype.error = function error(...args) {
  if (this.logLevel < this.levels.error) return;
  console.log(...args);
};

ConsoleLogger.prototype.fatal = function fatal(...args) {
  if (this.logLevel < this.levels.fatal) return;
  console.log(...args);
};

export { ConsoleLogger };
