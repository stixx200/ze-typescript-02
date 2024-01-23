type Name = "Manfred";
type GreetManfred = `Hello, my name is ${Name}`;

const unittablebaseid = "Zwick.Unittable";
type UnitTableId = `${typeof unittablebaseid}.${string}`;
type UnitId = `${UnitTableId}.Unit.${string}`;
const unitId: UnitId = `${unittablebaseid}.134234.Unit.1`;

type Greet<T extends string> = `Hello, my name is ${T}`;
const greetManfred: GreetManfred = "Hello, my name is Manfred";
const greetManuela: Greet<"Manuela"> = "Hello, my name is Manuela";

// with unions
type Person = {
  name: string;
  age: number;
};
type DbFields<T extends string> = `${T}_id`;
type PersonDbKeys = DbFields<keyof Person>;
// "name_id" | "age_id"

type Suffixes = "id" | "name";
type DbFields2<T extends object> = `${string & keyof T}_${Suffixes}`;
type PersonDbKeys2 = DbFields2<Person>;
// "name_id" | "age_id" | "name_name" | "age_name"

// more complex example: Template literal types are used to create new method signatures
type WrappedAsEventEmitter<T extends { [key: string]: unknown }> = T & {
  [K in keyof T as `on${Capitalize<string & K>}Changed`]: (
    callback: (arg: T[K]) => void
  ) => void;
};
type PersonEventEmitter = WrappedAsEventEmitter<Person>;
// type PersonEventEmitter = Person & {
//     onNameChanged: (callback: (arg: string) => void) => void;
//     onAgeChanged: (callback: (arg: number) => void) => void;
// }
let personEventEmitter: PersonEventEmitter =
  {} as unknown as PersonEventEmitter;
personEventEmitter.name = "Manfred";
personEventEmitter.onNameChanged((name: string) => console.log(name));
personEventEmitter.onAgeChanged((age: number) => console.log(age));

// with inference of the key type
type WrappedAsEventEmitter2<T extends { [key: string]: unknown }> = T & {
  on<Key extends string & keyof T>(
    eventName: `${Key}Changed`,
    callback: (arg: T[Key]) => void
  ): void;
};
let personEventEmitter2 = {} as unknown as WrappedAsEventEmitter2<Person>;
personEventEmitter2.name = "Manfred";
personEventEmitter2.on("nameChanged", (name: string) => console.log(name));
personEventEmitter2.on("ageChanged", (age: number) => console.log(age));

// ############################################
// String manipulation types

// UpperCase
type UppercaseManni = Uppercase<"Manfred">; // type "MANFRED"
// LowerCase
type LowerCaseManni = Lowercase<"MANFRED">; // type "manfred"
// Capitalize
type CapitalizeManni = Capitalize<"manfred">; // type "Manfred"
// Uncapitalize
type UncapitalizeManni = Uncapitalize<"Manfred">; // type "manfred"
