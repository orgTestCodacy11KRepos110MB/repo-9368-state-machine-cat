// @ts-check
/* eslint-disable security/detect-object-injection */
import has from "lodash/has.js";
import smcat from "./smcat/index.js";
import dot from "./dot/index.mjs";
import vector from "./vector/vector-native-dot-with-fallback.mjs";
import oldVector from "./vector/vector-with-viz-js.mjs";
import scjson from "./scjson/index.mjs";
import scxml from "./scxml/index.mjs";

/**
 *
 * @param {import("../../types/state-machine-cat.js").OutputType} pOutputType
 * @returns {import("../../types/state-machine-cat.js").RenderFunctionType}
 */
export default function getRenderFunction(pOutputType) {
  const lOutputType2RenderFunction = {
    smcat,
    dot,
    svg: vector,
    eps: vector,
    ps: vector,
    ps2: vector,
    oldsvg: oldVector,
    oldps2: oldVector,
    oldeps: oldVector,
    pdf: vector,
    png: vector,
    scjson,
    scxml,
  };

  return has(lOutputType2RenderFunction, pOutputType)
    ? lOutputType2RenderFunction[pOutputType]
    : (pX) => pX;
}
