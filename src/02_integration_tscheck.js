// @ts-check

import fs from "node:fs";

fs.readFile("00_hello-world.ts", (err, data) => {
  err?.splice();
});
