interface Document {
  id: string;
}
interface File {
  id: number;
}

function getInstanceForId1(id: string): Document;
function getInstanceForId1(id: number): File;
function getInstanceForId1(id: string | number): Document | File;
function getInstanceForId1(id: string | number): Document | File {
  if (typeof id === "string") {
    return { id };
  } else {
    return { id };
  }
}

// ############################################
// with conditional types:
type DocumentOrFile<T> = T extends string ? Document : File;
function getInstanceForId<T extends string | number>(id: T): DocumentOrFile<T> {
  return { id } as DocumentOrFile<T>;
}
let doc = getInstanceForId("manual"); // type Document
let file = getInstanceForId(2); // type File
let fileOrDoc = getInstanceForId(Math.random() > 0.5 ? "manual" : 2); // type Document | File

// ############################################
// conditional type constraints

// type IdOf<T> = T["id"]; // Type '"id"' cannot be used to index type 'T'
type IdOf2<T extends { id: unknown }> = T["id"]; // ok
type DocId = IdOf2<Document>; // type string
type FileId = IdOf2<File>; // type number
// type AnyId = IdOf2<{ name: string }>; // Type '{ name: string; }' does not satisfy the constraint '{ id: unknown; }'.

// if object has no "id" field, we want a never type:
type IdOf3<T> = T extends { id: unknown } ? T["id"] : never;
type AnyId = IdOf3<{ name: string }>; // type never

// another example: A Flatten type which flattens array types but leaves other types unchanged:
type Flatten<T> = T extends Array<never> ? T[number] : T;
type s1 = Flatten<string>; // type string
type s2 = Flatten<string[]>; // type string

// ############################################
// infer
// infer is used to get a type in the true branch of a conditional type

type Flatten2<T> = T extends Array<infer ItemType> ? ItemType : T;
type s3 = Flatten2<string>; // type string
type s4 = Flatten2<string[]>; // type string

type AnyFunction = (...args: never[]) => unknown;
type GetReturnType<Type extends AnyFunction> = Type extends (
  ...args: never[]
) => infer ReturnType
  ? ReturnType
  : never; // we can never reach this branch

// ############################################
// distributive conditional types
// if T is a union type, then
// (T extends U ? X : Y)
// becomes
// ((T extends U ? X : Y) | (T extends U ? X : Y) | ...)

// to avoid this distribution, wrap the conditional type in a tuple:
// ([T] extends [U] ? X : Y)

type ToArray<Type> = Type extends unknown ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>; // type string[] | number[]
// ToArray distributes on string | number, so we get
// ToArray<string> | ToArray<number>    ==>     string[] | number[]

type ToArray2<Type> = [Type] extends [unknown] ? Type[] : never;
type StrOrNumArr = ToArray2<string | number>; // type (string | number)[]
