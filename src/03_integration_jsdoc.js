// @ts-check

import fs from "node:fs";

/**
 * @param {string} path The path to the file
 */
function readFile(path) {
  return "";
}
readFile(123); // < Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)
readFile("<path-to-file>");
