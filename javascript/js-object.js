// // const a = {
// //   fruit: "apple",
// //   color: "red",
// // };

// // console.log(a.fruit); // apple
// // console.log(a["color"]); // red

// // function Fruit(fruit, color) {
// //   this.fruit = fruit;
// //   this.color = color;
// // }

// // const b = new Fruit("banana", "yellow");

// // const c = Object.create(b);
// // c.fruit = "cherry";
// // c.color = "red";

// // console.log(c);

// const obj = Object.create(
//   {},
//   {
//     a: { value: 1, enumerable: true },
//     b: { value: 2, enumerable: false },
//   }
// );

// // 객체 자신의 열거 가능한 속성만 나열
// console.log(Object.keys(obj)); // a

// // 객체 자신의 모든 속성을 나열(열거 불가능한 속성 포함)
// console.log(Object.getOwnPropertyNames(obj)); // b

// // for (const key in child) {
// //   console.log(key);
// // }

// const parent = {
//   age: 55,
// };

// function Child(name) {
//   this.name = name;
// }

// Child.prototype = parent;
// const child = new Child("Kim");

// console.log(Object.keys(child)); // name

// // 객체의 프로토타입 체인의 속성까지 나열
// for (const key in child) {
//   console.log(key); // name \n age
// }

// const kim = {
//   name: "minje",
// };

// console.log(kim); // { name: 'minje' }

// kim.gender = "male";
// kim["age"] = 25;

// console.log(kim); // { name: 'minje', gender: 'male', age: 25 }

// delete kim.age;
// console.log(kim); // { name: 'minje', gender: 'male' }

// const a = {
//   fruit: "apple",
//   color: "red",
// };

// const b = a;

// console.log(a); // { fruit: 'apple', color: 'green' }
// console.log(b); // { fruit: 'apple', color: 'green' }

// const kim = { name: "Kim", age: 26, address: { city: "Seoul" } };

// const lee = Object.assign({}, kim);

// const park = { ...kim };

// lee.name = "lee";
// lee.address.city = "Busan";

// console.log(kim); // { name: 'Kim', age: 26, address: { city: 'Busan' } }

const _ = require("lodash");

const kim = { name: "Kim", age: 26, address: { city: "Seoul" } };

const lee = _.cloneDeep(kim);

const park = JSON.parse(JSON.stringify(kim));

lee.name = "lee";
lee.address.city = "Busan";

console.log(kim); // { name: 'Kim', age: 26, address: { city: 'Seoul' } }
