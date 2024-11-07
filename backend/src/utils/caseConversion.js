function toCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  } else if (obj !== null && obj.constructor === Object) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
      acc[camelKey] = toCamelCase(value);
      return acc;
    }, {});
  }
  return obj;
}

function toUnderscoreCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(toUnderscoreCase);
  } else if (obj !== null && obj.constructor === Object) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const underscoreKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      acc[underscoreKey] = toUnderscoreCase(value);
      return acc;
    }, {});
  }
  return obj;
}

module.exports = { toCamelCase, toUnderscoreCase };