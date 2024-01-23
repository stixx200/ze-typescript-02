"use strict";

log(undefined);
log("hi there");
log("123");
log(+"123");
log(false);
log({ foo: "bar" });
log(["foo", "bar"]);
log({ baz: 123 });

let manni = 1;
log(manni);
manni = "spitze";
log(manni);

function log(data) {
  if (typeof data === "string") {
    console.log("Print a string:", data);
  } else if (typeof data === "number") {
    console.log("Print a number:", data);
  } else {
    console.log("Print something of type", typeof data, ":", data);
  }
}
