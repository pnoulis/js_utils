import { generateRandomName } from "./generateRandomName.js";

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
function randomInteger(min, max) {
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

function isArray(val) {
  return Array.isArray(val);
}

export {
  flattenObj,
  capitalize,
  generateRandomName,
  randomInteger,
  randomReal,
  areMembersUnique,
  areMembersDuplicate,
  extractOdds,
  extractEvens,
  delay,
  isObject,
  isArray,
};
