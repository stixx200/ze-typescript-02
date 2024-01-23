// ############################################
// function generics
function identity1(arg: number): number {
  return arg;
}
function identity2(arg: any): any {
  return arg;
}
// ...
// as generic (Type is a type parameter)
function identityGeneric<Type>(arg: Type): Type {
  return arg;
}

const a = identity1(1); // a is type number
const b = identity2(1); // b is type any
const c = identityGeneric("hello"); // c is type string

// ############################################

// Use array type here to ensure Type is an array
function getFirst1<Type>(arg: Type[]): Type {
  return arg[0];
}

// Alternatively, use the Array generic type
function getFirst2<Type>(arg: Array<Type>): Type {
  return arg[0];
}

type getFirst = <Type>(arg: Array<Type>) => Type;
let myGetFirst: getFirst = getFirst1;
// written as object literal type
let myGetFirst2: { <Type>(arg: Array<Type>): Type } = getFirst1;
type myFunc = { (arg: Array<any>): any; hello: string };

// written as interface
interface getFirstInterface {
  <Type>(arg: Array<Type>): Type;
}
let myGetFirst3: getFirstInterface = getFirst1;
const d = myGetFirst3(["hello", "world"]); // d is type string

// written as interface with generic type
interface getFirstInterfaceWithType<Type> {
  (arg: Array<Type>): Type;
  foo?: Type;
}
let myGetFirst4: getFirstInterfaceWithType<string> = getFirst1;
const e = myGetFirst4(["hello", "world"]); // e is type string

// ############################################
// Generic classes

class Iterate<Type> {
  constructor(private readonly items: Array<Type>) {}
  next(): Type | null {
    return this.items.shift() || null;
  }
}

let iterate = new Iterate([12, 13, 14]);
const value1 = iterate.next(); // value1 is type number

// ############################################
// Generic constraints

interface ILength {
  length: number;
}
function getLength<Type extends ILength>(arg: Type): number {
  return arg.length;
}
const length1 = getLength("hello"); // length1 is type number
const length2 = getLength([1, 2, 3]); // length2 is type number
const length3 = getLength({ length: 4 }); // length3 is type number
// const length4 = getLength(123); // Argument of type '123' is not assignable to parameter of type 'ILength'.ts(2345)

// ############################################
// Use type parameters in generic constraints

// keyof is a type operator that returns a union of all property names of a type
function getProperty<Type extends {}, Key extends keyof Type>(
  obj: Type,
  key: Key
) {
  return obj[key];
}
const obj = { a: 1, b: "2", c: false };
const a1 = getProperty(obj, "a"); // a1 is type number
const b1 = getProperty(obj, "b"); // b1 is type string
const c1 = getProperty(obj, "c"); // c1 is type boolean
// const d1 = getProperty(obj, "d"); // Argument of type '"d"' is not assignable to parameter of type '"a" | "b" | "c"'.ts(2345)

// ############################################
// class types in generics

interface Named {
  name: string;
}

class Person implements Named {
  name = "Person";
}
class Animal implements Named {
  name = "Animal";
}
class Plane {
  id = "Plane";
}
function factory<Type extends Named>(type: new () => Type): Type {
  const instance = new type();
  console.log(`Created ${instance.name}`);
  return instance;
}
const person = factory(Person); // person is type Person
const animal = factory(Animal); // animal is type Animal
// const plane = factory(Plane); // Argument of type 'typeof Plane' is not assignable to parameter of type 'new () => Named'. Property 'name' is missing in type 'Plane' but required in type 'Named'.ts(2345)

// ############################################
// generic default parameters

interface ICalculateArea {
  getArea(): number;
}
interface IRectangle extends ICalculateArea {
  width: number;
  height: number;
}
interface ICircle extends ICalculateArea {
  radius: number;
}

class CalculateArea<Type extends ICalculateArea = IRectangle> {
  calculateArea(shape: Type): number {
    return shape.getArea();
  }
}
const rectangleCalculator = new CalculateArea();
rectangleCalculator.calculateArea({
  width: 10,
  height: 10,
  getArea() {
    return this.width * this.height;
  },
});
const circleCalculator = new CalculateArea<ICircle>();
circleCalculator.calculateArea({
  radius: 10,
  getArea() {
    return Math.PI * this.radius ** 2;
  },
});
