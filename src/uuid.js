import * as UUID_LIB from "uuid";

function uuidv4() {
  return UUID_LIB.v4();
}

export { uuidv4, uuidv4 as uuid };
