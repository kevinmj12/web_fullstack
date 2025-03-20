function step1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 1 완료");
      resolve();
    }, 1000);
  });
}

function step2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 2 완료");
      resolve();
    }, 1000);
  });
}

function step3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 3 완료");
      resolve();
    }, 1000);
  });
}

async function runSteps() {
  await step1();
  await step2();
  await step3();

  console.log("끝");
}

runSteps();
