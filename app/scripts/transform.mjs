/* Converts the DC template (sc-if / sc-for / {{ }} bindings) into a JSX render body. */
import { readFileSync, writeFileSync } from "node:fs";
import * as cheerio from "cheerio";

const raw = readFileSync(new URL("../template.html", import.meta.url), "utf8");
// strip helmet block and trailing </x-dc>
const afterHelmet = raw.slice(raw.indexOf("</helmet>") + "</helmet>".length).replace(/<\/x-dc>\s*$/, "");

const $ = cheerio.load(afterHelmet, { xml: false }, false);

const EVENT_MAP = {
  "sc-camel-on-click": "onClick",
  "sc-camel-on-change": "onChange",
  "sc-camel-on-blur": "onBlur",
  "sc-camel-on-key-down": "onKeyDown",
  "sc-camel-on-drag-start": "onDragStart",
  "sc-camel-on-drag-over": "onDragOver",
  "sc-camel-on-drop": "onDrop",
  "sc-camel-on-mouse-enter": "onMouseEnter",
  "sc-camel-on-mouse-leave": "onMouseLeave",
  "sc-camel-on-mouse-down": "onMouseDown",
  "sc-camel-auto-focus": "autoFocus",
  "sc-camel-view-box": "viewBox",
};
const SVG_ATTR = {
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
};
const VOID_TAGS = new Set(["input", "br", "img", "hr", "path", "rect", "circle", "line"]);

function qualify(expr, scope) {
  expr = expr.trim();
  const root = expr.match(/^[A-Za-z_$][A-Za-z0-9_$]*/);
  if (!root) return expr;
  if (scope.has(root[0]) || root[0] === "true" || root[0] === "false") return expr;
  return "v." + expr;
}
function bindingOf(val) {
  const m = val.trim().match(/^\{\{\s*(.*?)\s*\}\}$/s);
  return m ? m[1] : null;
}
/* mixed literal+binding value ("color:{{ x }};...") -> JS template literal */
function templateLiteral(val, scope) {
  const parts = val.split(/(\{\{\s*[^}]*?\s*\}\})/g).filter((p) => p !== "");
  let out = "`";
  for (const p of parts) {
    const b = bindingOf(p);
    if (b !== null) out += "${" + qualify(b, scope) + "}";
    else out += p.replace(/[`$\\]/g, (c) => "\\" + c);
  }
  return out + "`";
}
function jsstr(s) {
  return JSON.stringify(s);
}

let fragId = 0;
function emit(node, scope, indent) {
  const pad = "  ".repeat(indent);
  if (node.type === "text") {
    const t = node.data;
    if (!t.trim()) return "";
    // split into literal / binding parts
    const parts = t.split(/(\{\{\s*[^}]*?\s*\}\})/g).filter((p) => p !== "");
    let out = "";
    for (const p of parts) {
      const b = bindingOf(p);
      if (b !== null) out += `{${qualify(b, scope)}}`;
      else out += p.replace(/\s+/g, " ").replace(/[{}<>]/g, (c) => `{${jsstr(c)}}`);
    }
    return pad + out.trim() + "\n";
  }
  if (node.type !== "tag") return "";
  const el = $(node);
  const tag = node.name;

  if (tag === "sc-if") {
    const cond = qualify(bindingOf(el.attr("value") || "") || "false", scope);
    const inner = node.children.map((c) => emit(c, scope, indent + 1)).join("");
    return `${pad}{(${cond}) ? (\n${pad}  <React.Fragment>\n${inner}${pad}  </React.Fragment>\n${pad}) : null}\n`;
  }
  if (tag === "sc-for") {
    const list = qualify(bindingOf(el.attr("list") || "") || "[]", scope);
    const as = el.attr("as") || "item";
    const s2 = new Set(scope);
    s2.add(as);
    const inner = node.children.map((c) => emit(c, s2, indent + 1)).join("");
    return `${pad}{(${list}).map(function(${as}, i${fragId}) { return (\n${pad}  <React.Fragment key={i${fragId++}}>\n${inner}${pad}  </React.Fragment>\n${pad}); })}\n`;
  }

  const realTag = tag === "sc-raw-select" ? "select" : tag;
  const attrs = [];
  for (const [name, val] of Object.entries(node.attribs || {})) {
    if (name.startsWith("hint-placeholder") || name === "style-hover") continue;
    const b = bindingOf(val);
    if (name === "style") {
      if (b) attrs.push(`style={${qualify(b, scope)}}`);
      else if (val.includes("{{")) attrs.push(`style={css(${templateLiteral(val, scope)})}`);
      else attrs.push(`style={css(${jsstr(val)})}`);
    } else if (EVENT_MAP[name]) {
      if (b) attrs.push(`${EVENT_MAP[name]}={${qualify(b, scope)}}`);
      else attrs.push(`${EVENT_MAP[name]}={${val === "true" ? "true" : jsstr(val)}}`);
    } else if (SVG_ATTR[name]) {
      attrs.push(b ? `${SVG_ATTR[name]}={${qualify(b, scope)}}` : `${SVG_ATTR[name]}=${jsstr(val)}`);
    } else if (name === "value") {
      // controlled inputs: pair with readOnly if no onChange present
      attrs.push(b ? `value={${qualify(b, scope)} ?? ""}` : `value=${jsstr(val)}`);
    } else if (name === "aria-hidden" || name.startsWith("data-")) {
      attrs.push(`${name}=${jsstr(val)}`);
    } else if (name === "class") {
      attrs.push(`className=${jsstr(val)}`);
    } else if (name === "for") {
      attrs.push(`htmlFor=${jsstr(val)}`);
    } else if (name === "draggable") {
      attrs.push(`draggable={${val === "true"}}`);
    } else if (name === "rows" || name === "cols" || name === "width" || name === "height") {
      attrs.push(`${name}={${JSON.stringify(isNaN(Number(val)) ? val : Number(val))}}`);
    } else {
      if (b) attrs.push(`${name}={${qualify(b, scope)}}`);
      else attrs.push(`${name}=${jsstr(val)}`);
    }
  }
  const attrStr = attrs.length ? " " + attrs.join(" ") : "";

  // textarea: React wants value prop only, no children
  const children = tag === "textarea" ? [] : node.children || [];
  const inner = children.map((c) => emit(c, scope, indent + 1)).join("");

  if (!inner.trim() && (VOID_TAGS.has(realTag) || !children.length)) {
    return `${pad}<${realTag}${attrStr} />\n`;
  }
  return `${pad}<${realTag}${attrStr}>\n${inner}${pad}</${realTag}>\n`;
}

const rootNodes = $.root()[0].children;
const body = rootNodes.map((n) => emit(n, new Set(), 3)).join("");

const out = `/* AUTO-GENERATED from konqr_app_markup.html by scripts/transform.mjs — edit the template + rerun, or edit carefully. */
import React from "react";
import { PlannerLogic } from "./logic.js";
import { css } from "./css.js";

export default class App extends PlannerLogic {
  render() {
    const v = this.renderVals();
    return (
      <React.Fragment>
${body}      </React.Fragment>
    );
  }
}
`;
writeFileSync(new URL("../src/App.jsx", import.meta.url), out);
console.log("written src/App.jsx", out.length, "bytes");
