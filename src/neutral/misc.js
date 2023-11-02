import { generateRandomName } from "./generateRandomName.js";
import isNumber from "is-number";

function flattenObj(obj) {
  const result = {};

  for (const i in obj) {
    if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
      const tmp = flattenObj(obj[i]);
      for (const j in tmp) {
        result[i + "." + j] = tmp[j];
      }
    } else {
      result[i] = obj[i];
    }
  }
  return result;
}

function capitalize(...strings) {
  return strings.length > 1
    ? strings.map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    : strings[0].charAt(0).toUpperCase() + strings[0].slice(1);
}

// min, max included
function randomInteger(min = 0, max = 25000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// min, max included
function randomReal(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function areMembersUnique(array) {
  for (let i = 0; i < array.length; i++) {
    for (let y = i + 1; y < array.length; y++) {
      if (array[i] === array[y]) return false;
    }
  }
  return true;
}

function areMembersUniqueCb(array, clause) {
  for (let i = 0; i < array.length; i++) {
    for (let y = i + 1; y < array.length; y++) {
      if (clause(array[i], array[y])) return false;
    }
  }
  return true;
}

function areMembersDuplicate(array) {
  return !areMembersUnique(array);
}

function delay(time = 1000, shouldReject = false) {
  return new Promise((resolve, reject) =>
    setTimeout(shouldReject ? reject : resolve, time),
  );
}

function extractOdds(array) {
  const odds = [];
  for (let i = 1; i < array.length; i += 2) {
    odds.push(array[i]);
  }
  return odds;
}

function extractEvens(array) {
  const evens = [];
  for (let i = 0; i < array.length; i += 2) {
    evens.push(array[i]);
  }
  return evens;
}

function isObject(val) {
  return (
    val !== null && typeof val === "object" && Array.isArray(val) === false
  );
}

function isObjectEmpty(val) {
  if (!isObject(val)) throw new Error(`isObjectEmpty: input not an object`);
  return Object.getOwnPropertyNames(val) > 0;
}

function isArray(val) {
  return Array.isArray(val);
}

function isFunction(val) {
  return typeof val === "function";
}

/*
 remove the 1st element
console.log("remove 1st element: ", removeIndex(arr, 0));

remove the last element
console.log("remove last element: ", removeIndex(arr, arr.length - 1));

remove a middle element
console.log("remove 3rd element ", removeIndex(arr, 2));
 */
function removeIndex(arr, index) {
  if (index === 0) {
    return arr.slice(1);
  } else if (index < arr.length - 1) {
    return arr.slice(0, index).concat(arr.slice(index + 1));
  } else if (index === arr.length - 1) {
    return arr.slice(0, -1);
  } else {
    throw new Error(`Invalid index: ${index}`);
  }
}

function filterObject(
  source,
  {
    include = [],
    exclude = [],
    asArray = false,
    deepClone = false /* TODO */,
    transform /* TODO */,
  } = {},
) {
  let filtered;
  if (include?.length >= 1) {
    filtered = {};
    for (let i = 0; i < include.length; i++) {
      if (!Object.hasOwn(source, include[i])) {
        throw new Error(`Unrecognized include key: ${include[i]}`);
      }
      filtered[include[i]] = source[include[i]];
    }
  } else if (exclude?.length >= 1) {
    filtered = { ...source };
    for (let i = 0; i < exclude.length; i++) {
      if (!Object.hasOwn(source, exclude[i])) {
        throw new Error(`Unrecognized exclude key: ${exclude[i]}`);
      }
      delete filtered[exclude[i]];
    }
  } else {
    filtered = { ...source };
  }
  return (() => {
    if (!asArray) return filtered;
    const keys = Object.keys(filtered);
    const ln = keys.length;
    const filteredArray = new Array(ln);
    for (let i = 0; i < ln; i++) {
      filteredArray[i] = {
        key: keys[i],
        value: filtered[keys[i]],
      };
    }
    return filteredArray;
  })();
}

export {
  flattenObj,
  filterObject,
  capitalize,
  generateRandomName,
  randomInteger,
  randomReal,
  areMembersUnique,
  areMembersUniqueCb,
  areMembersDuplicate,
  extractOdds,
  extractEvens,
  delay,
  isObject,
  isObjectEmpty,
  isArray,
  isFunction,
  isNumber,
  removeIndex,
};
