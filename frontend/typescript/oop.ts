// let empName: string = "김민제";
// let empAge: number = 26;
// let empJob: string = "개발자";

// function printEmp(empName: string, empAge: number, empJob: string): void {
//   console.log(`이름: ${empName}`);
//   console.log(`나이: ${empAge}`);
//   console.log(`직업: ${empJob}`);
// }
//
// printEmp(empName, empAge, empJob);

// class Employee {
//   constructor(
//     private _empName: string,
//     private _empAge: number,
//     private _empJob: string
//   ) {}

//   get empName() {
//     return this._empName;
//   }

//   set empName(newName: string) {
//     this._empName = newName;
//   }

//   printEmp = (): void => {
//     console.log(`이름: ${this._empName}`);
//     console.log(`나이: ${this._empAge}`);
//     console.log(`직업: ${this._empJob}`);
//   };
// }

class Employee {
  private _empName: string;
  private _empAge: number;
  private _empJob: string;

  constructor(empName: string, empAge: number, empJob: string) {
    this._empName = empName;
    this._empAge = empAge;
    this._empJob = empJob;
  }

  get empName() {
    return this._empName;
  }

  set empName(newName: string) {
    this._empName = newName;
  }

  printEmp = (): void => {
    console.log(`이름: ${this._empName}`);
    console.log(`나이: ${this._empAge}`);
    console.log(`직업: ${this._empJob}`);
  };
}

let minje: Employee = new Employee("김민제", 26, "개발자");

minje.printEmp();

console.log(minje.empName); // 김민제
minje.empName = "Kim";
console.log(minje.empName); // Kim
