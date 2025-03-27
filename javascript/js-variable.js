// console.log(a);
// console.log(b);

// var a;
// var b = 2;

// // output
// // undefined
// // undefined

// c = 1;
// console.log(c);
// var c = 2;
// console.log(c);

// console.log(a);
// console.log(b);

// let a = 1;
// const b = 2;

// error
// ReferenceError: Cannot access 'a' before initialization

// const b = 1;
// b = 3; // TypeError: Assignment to constant variable

// let a;
// console.log(a); // undefined

const a = 1;
let b = 2;
var c = 3;

for (let i = 0; i < 1; i++) {
  const a = 4;
  let b = 5;
  var c = 6;
  console.log(a);
  console.log(b);
  console.log(c);
}

console.log(a);
console.log(b);
console.log(c);

// output
// 4
// 5
// 6
// 1
// 2
// 6
