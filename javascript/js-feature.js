let a = 1;
let b = "1";

console.log("typeof a is", typeof a);
console.log("typeof b is", typeof b);

// 변수에 할당
const fun1 = function (num) {
  return num + 1;
};

// 다른 함수를 함수의 인자로 전달
const fun2 = function (num) {
  return num + 2;
};

const fun3 = function (fun, num) {
  return fun(num);
};

const result1 = fun3(fun2, 3); // 5

// 다른 함수의 결과로서 리턴
const fun4 = function (num1) {
  return function (num2) {
    return num1 + num2;
  };
};

const result2 = fun4(5)(6); // 11

function person(name) {
  this.name = name;
}
person.prototype.sayHello = function () {
  console.log(`Hello My name is ${this.name}`);
};

const me = new person("김민제");
console.log(me); // person { name: '김민제' }
