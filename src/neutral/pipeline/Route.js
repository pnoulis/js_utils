function Route(pipeline, route, ...middleware) {
  this.route = route;
  this.middleware = middleware;
  this.queue = null;
  this.nextIndex = 0;

  this.findNextErrHandlerIndex = function (start) {
    const lnQueue = this.queue.length;
    for (; start < lnQueue; start++) {
      if (this.queue.at(start).length > 2) return start;
    }
    return -1;
  };

  this.runner = async function runner(context, index, err) {
    this.nextIndex = index;
    const middleware = this.queue.at(this.nextIndex);
    if (middleware) {
      await middleware(
        context,
        this.runner.bind(this, context, index + 1),
        err,
      );
    }
  };

  const exec = async function exec(pipeline, ...args) {
    this.queue = pipeline.flat(3);
    this.nextIndex = 0;
    const lnQueue = this.queue.length;
    const context = {
      route: this.route,
      args,
      req: {},
      res: {},
    };

    let error = null;
    while (this.nextIndex < lnQueue) {
      try {
        await this.runner(context, this.nextIndex, error);
      } catch (err) {
        error = err;
        // if err this.nextIndex points to the last run middleware.
        // The one that threw an exception.
        this.nextIndex = this.findNextErrHandlerIndex(this.nextIndex + 1);
        if (this.nextIndex === -1) {
          throw err;
        }
      }
    }
    this.queue = null;
    return context;
  };

  const skipNone = exec.bind(this, [
    pipeline.beforeAll,
    middleware.map((m) => [pipeline.beforeEach, m, pipeline.afterEach]),
    pipeline.afterAll,
    pipeline.globalLast,
  ]);
  skipNone.skipAll = exec.bind(this, [this.middleware]);
  return skipNone;
}

export { Route };
