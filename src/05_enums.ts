// ENUMS

function calc() {
  return 22;
}

enum Direction {
  Up = 10,
  Down = calc(),
  Left = "Left",
  Right = Direction.Up + Direction.Left,
}

Direction.Right;

// Alternative mit const objects

const Direction2 = {
  Up: 10,
  Down: { id: calc() },
  Left: "Left",
  Right: 15,
} as const;

Direction2.Down.foo = "manni";
