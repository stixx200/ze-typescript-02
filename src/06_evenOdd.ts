// Eine Funktion erstellen, die "even" oder "odd" ausgibt.
// String Literals nutzen.

type EvenOrOdd = "even" | "odd";

function evenOrOdd(input: number): EvenOrOdd {
  return input % 2 === 0 ? "even" : "odd";
}

console.log(evenOrOdd(2));
console.log(evenOrOdd(3));

// part2 - mit Object value
interface ObjWithValue {
  value: number;
}
function evenOrOdd2(input: ObjWithValue): EvenOrOdd {
  return input.value % 2 === 0 ? "even" : "odd";
}

console.log(evenOrOdd2({ value: 2 }));
console.log(evenOrOdd2({ value: 3 }));

// part3 - combined

function evenOrOdd3(input: ObjWithValue | number): EvenOrOdd {
  if (typeof input === "object") {
    return evenOrOdd2(input);
  }
  return evenOrOdd(input);
}

console.log(evenOrOdd3({ value: 2 }));
console.log(evenOrOdd3({ value: 3 }));
console.log(evenOrOdd3(2));
console.log(evenOrOdd3(3));
