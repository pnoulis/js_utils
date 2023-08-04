import { extractOdds, extractEvens, capitalize, isObject } from "./misc.js";
/**
 * Stateful
 *
 * @typedef {Object} stateful
 * @property {Object<State>} states
 * @property {State} state
 * @property {function} getStateName
 * @property {function} getState
 * @property {function} setState
 * @property {function} inState
 * @property {function} compareStates
 */

function stateful(target, states = []) {
  // A Function object
  const self = target;
  // An Object
  const prototype = target.prototype;
  const stateNames = extractOdds(states);
  const stateInstances = extractEvens(states);
  stateInstances.forEach((state, i) => {
    // define a name property in each STATE INSTANCE
    Object.defineProperty(state.prototype, "name", {
      enumerable: true,
      configurable: true,
      get: function () {
        return stateNames[i];
      },
    });

    // define an index property in each STATE INSTANCE
    Object.defineProperty(state.prototype, "index", {
      enumerable: true,
      configurable: true,
      get: function () {
        return i;
      },
    });

    // define getters for each state in the CALLING CONTEXT PROTOTYPE
    Object.defineProperty(prototype, `get${capitalize(stateNames[i])}State`, {
      enumerable: true,
      configurable: true,
      get: function () {
        return this.states[i];
      },
    });
  });

  // define properties in the CALLING CONTEXT CONSTRUCTOR
  Object.defineProperty(self, "states", {
    value: stateNames,
    enumerable: true,
    writable: true,
    configurable: true,
  });

  // define properties in the CALLING CONTEXT PROTOTYPE
  Object.defineProperties(prototype, {
    states: {
      value: stateInstances,
      enumerable: true,
      writable: true,
      configurable: true,
    },
    state: {
      value: null,
      enumerable: true,
      configurable: true,
      writable: true,
    },
    getState: {
      value: getState,
      enumerable: true,
      writable: true,
      configurable: true,
    },
    setState: {
      value: setState,
      enumerable: true,
      writable: true,
      configurable: true,
    },
    inState: {
      value: inState,
      enumerable: true,
      writable: true,
      configurable: true,
    },
    compareStates: {
      value: compareStates,
      enumerable: true,
      writable: true,
      configurable: true,
    },
  });
}

function getState(state) {
  if (state) {
    const lnStates = this.states.length;
    if (typeof state === "string") {
      for (let i = 0; i < lnStates; i++) {
        if (this.states[i].name === state) return this.states[i];
      }
    } else if (isObject(state)) {
      for (let i = 0; i < lnStates; i++) {
        if (this.states[i].name === state.name) return state;
      }
    }
    throw new Error(`Unrecognized state: ${state}`);
  }

  return this.state;
}

function setState(state) {
  const previousState = this.state?.name;
  if (typeof state === "string") {
    state = this.getState(state);
  }
  this.state = state;

  // eventful integration
  if (typeof this.emit === "function" && isObject(this.events)) {
    this.emit("stateChange", this.state.name, previousState, this);
  }

  if ("init" in this.state) {
    this.state.init();
  }
  return this;
}
function inState(state) {
  return state === this.state.name || state === this.state.index;
}

/*
  cb({ unregistered: 0, registered: 1, inTeam: 2, inGame: 3 }, currentStateIndex)

  @example

  cb((states, currentStateIndex) => {
  return (currentStateIndex < states.inTeam);
  }) -> true | false
 */
function compareStates(cb) {
  const states = {};
  const lnStates = this.constructor.states.length;
  for (let i = 0; i < lnStates; i++) {
    states[this.constructor.states[i]] = i;
  }
  return cb(states, this.state.index);
}

stateful.construct = function () {
  this.states = this.states.map((state) => new state(this));
  this.state = this.states[0];
};

export { stateful };
