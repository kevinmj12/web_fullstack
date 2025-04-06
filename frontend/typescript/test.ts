const id: number = 1111;
const lastName: string = "kim";
const married: boolean = false;

function plus(a: number, b: number): number {
  return a + b;
}

interface User {
  id: number;
  lastName: string;
  married: boolean;
}

function getInfo(id: number): User {
  return {
    id: 1111,
    lastName: "kim",
    married: false,
  };
}
