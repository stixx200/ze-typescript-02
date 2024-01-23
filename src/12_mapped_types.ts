// are used to map object types attributes to a mapped type

type Person = {
  name: string;
  age: number;
  isFemale: boolean;
};

type Subscription<T extends object> = {
  [K in keyof T]: () => T[K]; // map to function which returns the type of the attribute
};
type PersonSubscription = Subscription<Person>;
// type PersonSubscription = {
//     name: () => string;
//     age: () => number;
//     isFemale: () => boolean;
// }

// ############################################
// mapped types modifiers
// There are two modifiers for mapped types: readonly and ? (optional)
// with + and - we can apply these modifiers to a mapped type
// default is +

type FrozenPerson = {
  readonly name: string;
  readonly age: number;
  readonly isFemale: boolean;
};
type MutablePerson = {
  -readonly [K in keyof FrozenPerson]: FrozenPerson[K];
};
type AgainFrozenPerson = {
  +readonly [K in keyof MutablePerson]: MutablePerson[K];
};

type PartialPerson = {
  [K in keyof Person]?: Person[K];
};
type AgainMandatoryPerson = {
  [K in keyof PartialPerson]-?: PartialPerson[K];
};

// ############################################
// key remapping (very useful with template literal types)
type AsGetters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};
type PersonGetters = AsGetters<Person>;
// type PersonGetters = {
//     getName: () => string;
//     getAge: () => number;
//     getIsFemale: () => boolean;
// }

// filter out some properties
type WithoutName<T> = {
  [K in keyof T as Exclude<K, "name">]: T[K];
};
type PersonWithoutName = WithoutName<Person>;
// type PersonWithoutName = {
//    age: number;
//    isFemale: boolean;
// }

// Also use with complex union types
type ChangedEvent = { type: "changed"; payload: [string, number] };
type AddedEvent = { type: "added"; payload: [string] };

type EventConfig<Events extends { type: string; payload: unknown[] }> = {
  [E in Events as E["type"]]: (
    event: E["type"],
    ...payload: E["payload"]
  ) => void;
};
type Config = EventConfig<ChangedEvent | AddedEvent>;
// type Config = {
//     changed: (event: "changed", payload_0: string, payload_1: number) => void;
//     added: (event: "added", payload_0: string) => void;
// }
