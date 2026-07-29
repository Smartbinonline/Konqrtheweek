/* Parses an inline CSS string into a React style object (memoized). */
const cache = new Map();

export function css(str) {
  let obj = cache.get(str);
  if (obj) return obj;
  obj = {};
  str.split(";").forEach(function (decl) {
    const i = decl.indexOf(":");
    if (i < 0) return;
    const prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop) return;
    let key;
    if (prop.startsWith("--")) key = prop;
    else
      key = prop.replace(/^-(webkit|moz|ms|o)-/, function (m, p) {
        return p === "ms" ? "ms-" : p.charAt(0).toUpperCase() + p.slice(1) + "-";
      }).replace(/-([a-z])/g, function (m, c) {
        return c.toUpperCase();
      });
    obj[key] = val;
  });
  cache.set(str, obj);
  return obj;
}
