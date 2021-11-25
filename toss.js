// 비동기작업이 중첩되어 요청되었을 때, 첫 작업을 완료하고 기록되어있던 두번째 작업 실행시키기

// async function async(token, no) {
//   return new Promise(res => {
//     setTimeout(() => {
//       const result = new Date().getTime();
//       res({
//         result: `결과 : ${result}, 작업번호 : ${no}`,
//         token: `token : ${result}`,
//       });
//     }, 300);
//   });
// }

// const intervals = [];
// let throttle = false;
// let prevToken = null;

// async function solution(work, no) {
//   if (!throttle) {
//     throttle = true;
//     const { result, token } = await work(prevToken, no);
//     prevToken = token;
//     throttle = false;

//     return result;
//   } else {
//     intervals.push(
//       setInterval(() => {
//         if (!throttle) {
//           solution(work, no);
//           clearInterval(intervals.shift());
//         }
//       }, 0)
//     );
//   }
// }

// console.log(solution(async, 1));
// console.log(solution(async, 2));
// solution(async, 3);
// solution(async, 4);
// solution(async, 5);
// solution(async, 6);
// solution(async, 7);
// solution(async, 8);
// solution(async, 9);
// solution(async, 10);
// solution(async, 11);
// solution(async, 12);

async function async(token, no) {
  return new Promise(res => {
    setTimeout(() => {
      const result = new Date().getTime();
      res({
        result: `받은 토큰 : ${token}, 작업번호 : ${no}`,
        token: `token : ${result}`,
      });
    }, 300);
  });
}

const intervals = [];
let prevToken = null;
let throttle = false;

function solution(work, no) {
  if (!throttle) {
    throttle = true;
    console.log(throttle);
    return new Promise(res => {
      res(fetch(work, no));
      throttle = false;
    });
  } else {
    setTimeout(() => solution(work, no));
  }
}

async function fetch(work, no) {
  console.log(prevToken);

  const { result, token } = await work(prevToken, no);
  prevToken = token;

  return { result, token };
}

solution(async, 1).then(data => {
  console.log(data);
});
solution(async, 2).then(data => {
  console.log(data);
});
solution(async, 3).then(data => {
  console.log(data);
});
solution(async, 4).then(data => {
  console.log(data);
});
solution(async, 5).then(data => {
  console.log(data);
});
solution(async, 6).then(data => {
  console.log(data);
});
