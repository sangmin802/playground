// async function = Promise 함수를 반환하는 것
// await = 반환된 Promise함수의 .then인 마이크로태스크 결과를 기다리도록 함

async function test() {
  console.log("test");
  (function () {
    return new Promise(res => {
      console.log("async 1 start");
      setTimeout(() => {
        res("async1");
      }, 150);
    });
  })().then(res => {
    console.log(res);
  });

  // await 만나는 순간 test 함수 중단하고 종료
  //  - await 이후의 로직들이 모두 await으로 감싼 작업의 .then 내부에 위치하게 되는것 같음

  // 마이크로태스크에서의 작업들을 선입선출방식으로 해결하면서 해당 await의 .then 결과값을 수신하게 되면 이어서 진행
  // .then(1), 이 먼저 마이크로태스크에 들어왔기 때문에, 먼저진행

  const val = await (function () {
    return new Promise(res => {
      console.log("async 2 start");
      res("async2");
    });
  })();

  console.log(val);

  setTimeout(() => {
    console.log("setTimeout1");
  }, 200);
  setTimeout(() => {
    console.log("setTimeout2");
  }, 100);

  console.log("something work");

  const val2 = await (async function () {
    console.log("async 3 start");
    return "async3";
  })();
  // const val2 = await (function () {
  //   return new Promise(res => {
  //   console.log('async 4 start')
  //     res(4);
  //   });
  // })();

  console.log(val2);
  console.log("test end");
}

async function test2() {
  console.log("test2");
  // 앞의 test async의 await에 값이 전달되고, 나머지의 작업들이 콜스택에서 완료되었을 때 마이크로태스크에서의 test2의 결과물 수신후 나머지 진행
  const val = await (function () {
    return new Promise(res => {
      console.log("async 4 start");
      res("async4");
    });
  })();
  console.log(val);
  console.log("test2 end");
}

test();
test2();

console.log("end");

// await을 만나는 순간 main thread에서는 중단, 소멸시키고 다른곳에서 기억하고 있다가
// 마이크로태스크에서 해당 결과값을 await이 받아왔을 때, 나머지 진행하는듯

// function main() {
//   console.log("start");

//   // await이 붙으면 아래 로직들이 모두 .then() 콜백함수로 변경됨
//   (async function () {
//     console.log("async function");
//   })();
//   // 위 아래 동일
//   (function () {
//     return new Promise(res => {
//       console.log("promise");
//     });
//   })();

//   console.log("end");
// }

// main();
