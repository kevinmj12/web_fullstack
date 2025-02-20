const obj1 = {};
const obj2 = { message: "obj2" };

console.log(Object.keys(obj1).length);
console.log(Object.keys(obj2).length);

const str1 = "123";
const str2 = "";

console.log(isEmpty(str1));
console.log(isEmpty(str2));

function isEmpty(obj) {
  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
}
