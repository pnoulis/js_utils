function Route(pipeline, route, ...middleware) {
  this.route = route;
  this.middleware = middleware;
  this.queue = null;
  this.nextIndex = 0;

  const skipNone = function (args, options) {
    const routeInstance = new Route(pipeline, route, ...middleware);
    return routeInstance.exec(
      [
        pipeline.beforeAll,
        middleware.map((m) => [pipeline.beforeEach, m, pipeline.afterEach]),
        pipeline.afterAll,
        pipeline.globalLast,
      ],
      args,
      options,
    );
  };
  skipNone.skipAll = function (args, options) {
    const routeInstance = new Route(pipeline, route, ...middleware);
    return routeInstance.exec([this.middleware], args, options);
  };

  // exec, invoked by skiNone
  skipNone.exec = this.exec.bind(this);
  return skipNone;
}

Route.prototype.findNextErrHandlerIndex = function (start) {
  const lnQueue = this.queue.length;
  for (; start < lnQueue; start++) {
    if (this.queue.at(start).length > 2) return start;
  }
  return -1;
};

Route.prototype.runner = async function (context, index, err) {
  this.nextIndex = index;
  const middleware = this.queue.at(this.nextIndex);
  if (middleware) {
    await middleware(context, this.runner.bind(this, context, index + 1), err);
  }
};

Route.prototype.exec = async function (pipeline, args, options) {
  this.queue = pipeline.flat(3);
  this.nextIndex = 0;
  const lnQueue = this.queue.length;
  const context = {
    route: this.route,
    args: { ...args },
    options: {
      onlyData: true,
      ...options,
    },
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
  if (context?.options?.onlyData) {
    return context.res.data;
  } else {
    delete context.args;
    delete context.options;
    return context;
  }
};

export { Route };
