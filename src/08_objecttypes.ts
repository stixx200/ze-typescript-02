// anonymous object type
function f(arg: { a: number; b: number }): number {
  return arg.a + arg.b;
}

// ########
type Object1 = {
  a: number;
  b: number;
  // required: number;
  // optional?: number;
  // readonly ro: string;
};

// ########

type StringArray = string[];
type StringArray2 = Array<string>;
type SomethinglikeAStringArray = { [ii: number]: string; length: number };
const a0: SomethinglikeAStringArray = ["a", "b"];
const a00: SomethinglikeAStringArray = { 0: "a", 1: "b", length: 2 };
a0[0] = "b";
a0.length = 2;

type StringOrNumberDict = {
  [index: string]: string | number;
  length: number;
  // notAllowed: boolean; // Property 'notAllowed' of type 'boolean' is not assignable to 'string' index type 'string | number'
};
type f = Record<string, string | number>;
const a1: StringOrNumberDict = { a: "a", b: 1, length: 2 };
a1["a"] = "b";
a1[2] = 3;

// ########

// depending on where and how an object is assigned a type,
// the object type is more or less strictly checked.

f({ a: 1, b: 2 }); // ok
// f({ a: 1, b: 2, c: 3 }); // not ok
const obj1 = { a: 1, b: 2, c: 3 };
f(obj1); // ok

// to get around this restriction, we can use type assertions:
f({ a: 1, b: 2, c: 3 } as Object1); // ok

// ########

interface Person {
  name: string;
  age: number;
}

interface PersonWithAddress extends Person {
  city: string;
  street: string;
}

interface Job {
  job: string;
  phone: string;
}
interface WorkingPersonWithAddress extends Person, Job {
  city: string;
  street: string;
  // job: { employer: string; period: number };
}

// difference between interface and type alias with intersection is how conflicts are handled
type WorkingPersonWithAddress2 = Person &
  Job & {
    city: string;
    street: string;
    job: { employer: string; period: number }; // ok
  };
