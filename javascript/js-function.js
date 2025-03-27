// 다른 함수의 실제 매개변수가 될 수 있다.
function a(fun) {
  return fun() + 1;
}

function b() {
  return 5;
}

console.log(a(b)); // 6

// 다른 함수의 반환값이 될 수 있다.
function c(number) {
  return number + d();
}

function d() {
  return 3;
}

console.log(c(1)); // 4

// 다른 할당명령문의 대상이 될 수 있다.
const e = function () {
  return 1;
};

console.log(e()); // 1

// 동일비교의 대상이 될 수 있다.
function f() {}
const g = f;

console.log(g === f); // true

// 함수 생성 방법
function foo() {
  console.log("foo");
}

const fooo = () => {
  console.log("fooo");
};
