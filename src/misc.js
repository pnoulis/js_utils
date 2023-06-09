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

export { flattenObj, capitalize };
