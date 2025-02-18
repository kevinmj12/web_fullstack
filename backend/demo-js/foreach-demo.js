const arr = [5, 6, 7, 8, 9];

arr.forEach(function (val) {
  console.log(`value: ${val}`);
});
// value: 5
// value: 6
// value: 7
// value: 8
// value: 9

arr.forEach((val) => console.log(`value: ${val}`));
// value: 5
// value: 6
// value: 7
// value: 8
// value: 9

arr.forEach((val, idx) => console.log(`index ${idx}: ${val}`));
// index 0: 5
// index 1: 6
// index 2: 7
// index 3: 8
// index 4: 9

arr.forEach((val, idx, arr) => console.log(`index ${idx}: ${val} / ${arr}`));
// index 0: 5 / 5,6,7,8,9
// index 1: 6 / 5,6,7,8,9
// index 2: 7 / 5,6,7,8,9
// index 3: 8 / 5,6,7,8,9
// index 4: 9 / 5,6,7,8,9

const forEachArr = arr.forEach(function (a, b, c) {
  return a * 2;
});

const mapArr = arr.map(function (a, b, c) {
  return a * 2;
});

console.log(forEachArr); // undefined
console.log(mapArr); // [ 10, 12, 14, 16, 18 ]
