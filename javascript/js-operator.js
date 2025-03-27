// const a = { name: "apple" };
// console.log(a); // { name: "apple" }

// console.log(void a); // undefined

// console.log(typeof a); // object

// delete a.name; // {}
// console.log(a);

// //  단항 산술 연산자
// let a = 1;

// a++; // a = a + 1
// console.log(a); // 2

// a--; // a = a - 1
// console.log(a); // 1

// console.log(-a); // -1 (양수를 음수로 반전)

// // 이항 산술 연산자
// let b = 5;
// let c = 2;

// console.log(b + c); // 7 (덧셈)
// console.log(b - c); // 3 (뺄셈)
// console.log(b * c); // 10 (곱셈)
// console.log(b / c); // 2.5 (나눗셈)
// console.log(b % c); // 1 (나머지)

// const a = { name: "apple" };

// console.log("name" in a); // true
// console.log("color" in a); // false

// console.log(a instanceof Object); // true
// console.log(a instanceof Number); // false

// let a = 1;
// let b = "1";

// console.log(a == b); // true
// console.log(a === b); // false
// console.log(a != b); // false
// console.log(a !== b); // true

// let a = true;
// let b = "b";

// console.log(a && b); // b
// console.log(a || b); // true

// let c = false;
// let d = "d";

// console.log(c && d); // false
// console.log(c || d); // d

// 쉼표 연산자
let a = (1, 2);
console.log(a); // 2

// 문자열 연산자
console.log("Hello" + " " + "World"); // Hello World

// 옵셔널 연산자
const b = {
  name: {
    firstName: "Minje",
    lastName: "Kim",
  },
};
console.log(b.name?.firstName); // Minje
console.log(b.address?.city); // undefined

// 할당 연산자
let c = 3;
c += 5;
console.log(c); // 8

// 삼항 연산자
const d = true;
const e = false;
console.log(d ? "t" : "f"); // t
console.log(e ? "t" : "f"); // f

//
