// function isOddEven(num) {
//   if (num % 2 === 0) {
//     console.log("Even");
//   } else {
//     console.log("Odd");
//   }
// }

// isOddEven(3); // Odd
// isOddEven(4); // Even

// let a = 3;
// switch (a) {
//   case 1:
//     console.log(1);
//   case 2:
//     console.log(2);
//   case 3:
//     console.log(3);
//   default:
//     console.log("default");
// }

// output
// 3
// default

let a = 1;
while (a < 3) {
  a++;
  console.log(a);
}

// output
// 2
// 3

for (let i = 0; i < 3; i++) {
  console.log(i);
}

// output
// 0
// 1
// 2

// const foo = ["a", "b", "c"];

// for (const i of foo) {
//   console.log(i);
// }

// output
// a
// b
// c

const foo = {
  apple: "red",
  banana: "yellow",
};

for (let key in foo) {
  console.log(key);
}

// output
// apple
// banana