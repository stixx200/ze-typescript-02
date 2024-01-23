// typeof guard

function getLocation(zipCode: number | string): number {
  if (typeof zipCode === "string") {
    // zipCode = string
    return Number(zipCode);
  } else {
    // zipCode = number
    return zipCode;
  }
}

// these strings are used for typeof
// "string"
// "number"
// "bigint"
// "boolean"
// "symbol"
// "undefined"
// "object"
// "function"

// ############################################
// truthiness guard

function getLocation2(zipCode?: number | string): number {
  if (zipCode) {
    // zipCode = string | number
    return +zipCode;
  }
  return 0;
}
// falsy values are:
// 0
// NaN
// "" (the empty string)
// 0n (the bigint version of zero)
// null
// undefined

// ############################################
// equality guard

declare function getNumberOrString(): number | string;
declare function getStringOrBoolean(): string | boolean;

let value: number | string = getNumberOrString();
let value2: string | boolean = getStringOrBoolean();
if (value === value2) {
  // value = string
  console.log(value.toUpperCase());
}

// ############################################
// in guard

interface Person {
  name: string;
  age: number;
}
interface Cat {
  name: string;
  lives: 7;
}
let p: Person | Cat = 0 as unknown as Person | Cat;
if ("age" in p) {
  // p = Person
  console.log(p.age);
}
if ("name" in p) {
  // p = Person | Cat
  console.log(p.name);
}

// ############################################
// instanceof guard

class Person2 {
  name = "Person";
}
class Animal2 {
  name = "Animal";
}
function greet(v: Person2 | Animal2) {
  if (v instanceof Person2) {
    // v = Person
    console.log(`Hello Person ${v.name}!`);
  } else {
    // v = Animal
    console.log(`Hello Animal ${v.name}!`);
  }
}

// ############################################
// assignments

let x: number | string;
x = 0;
x.toFixed();
x = "0";
x.toUpperCase();

// ############################################
// type predicates

function isPerson(v: unknown): v is Person2 {
  return v instanceof Person2; // has to return a boolean
}
const v = {};
if (isPerson(v)) {
  // v = Person2
  console.log("isPerson", v);
}

// ############################################
// assertions

declare function assert(value: unknown): asserts value;

let y: number | string;
y = 0;
assert(typeof y === "number");
y.toFixed();

// non null assertion operator
let z: number | null | undefined;
z = 0;
z!.toFixed(); // check tsconfig setting "strictNullChecks"

// ############################################
// discriminated unions

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;
function getArea(shape: Shape) {
  // return Math.PI * shape.radius ** 2; // Property 'radius' does not exist on type 'Shape'. Property 'radius' does not exist on type 'Square'.ts(2339)
  if (shape.kind === "circle") {
    // shape = Circle
    return Math.PI * shape.radius ** 2;
  } else {
    // shape = Square
    return shape.sideLength ** 2;
  }
  // or using switch case
}
