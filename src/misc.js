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

function membersUnique(array) {
  for (let i = 0; i < array.length; i++) {
    for (let y = i + 1; y < array.length; y++) {
      if (array[i] === array[y]) return false;
    }
  }
  return true;
}

function membersDuplicate() {
  return !membersUnique();
}

function delay(time = 1000, shouldReject = false) {
  return new Promise((resolve, reject) =>
    setTimeout(shouldReject ? reject : resolve, time)
  );
}

export {
  flattenObj,
  capitalize,
  generateRandomName,
  randomInteger,
  randomReal,
  membersUnique,
  membersDuplicate,
  delay,
};
