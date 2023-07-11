import * as UUID_LIB from "uuid";

function uuidv4() {
  return UUID_LIB.v4();
}

function smallid() {
  return Math.random().toString(34).substring(2);
}

export { uuidv4, uuidv4 as uuid, smallid };
