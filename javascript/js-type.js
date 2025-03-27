// let a = Infinity;
// let b = NaN;

// console.log(typeof a); // number
// console.log(typeof b); // number

// let a = Number.MAX_SAFE_INTEGER;
// let b = BigInt(Number.MAX_SAFE_INTEGER);

// console.log(a);
// console.log(b);

// a = a + 10;
// b = b + BigInt(10);

// console.log(a);
// console.log(b);

// output
// 9007199254740991
// 9007199254740991n
// 9007199254741000
// 9007199254741001n

// let hello = "Hello";

// let a = "Hello World";

// let b = `Hello
// wold`;

// let c = `${hello} world`;

// console.log(a);
// console.log(b);
// console.log(c);

// output
// Hello World
// Hello
// wold
// Hello world

// const a = null;
// console.log(typeof a);

// const a = {
//   [Symbol.for("apple")]: "fruit",
//   [Symbol.for("dog")]: "animal",
// };

// console.log(a[Symbol.for("apple")]); // fruit
// console.log(a[Symbol.for("dog")]); // animal

// const a = { fruit: "apple" };
// console.log(a); // { fruit: 'apple' }

// a.fruit = "banana";
// console.log(a); // { fruit: 'banana' }

// a.animal = "dog";
// console.log(a); // { fruit: 'banana', animal: 'dog' }

// let a = 1;
// console.log(typeof a); // number

// a = a.toString();
// console.log(typeof a); // string

// a = parseInt(a);
// console.log(typeof a); // number

let a = 1;
console.log(typeof a); // number

a = a + "";
console.log(typeof a); // string

a = a * 1;
console.log(typeof a); // number

a = !!a;
console.log(typeof a); // boolean
