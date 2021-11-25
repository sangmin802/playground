123;
124;
125;
134;
135;
145;
234;
235;
245;
345;

// 조합, 순열과 같은 비슷한 로직의 반복문이 여러번 사용될 때 재귀가 적합함
// 반복되는 로직을 통해 계산되는 값들을 반환하여 사용함
// 선입후출의 스택 순서

const arr = [1, 2, 3, 4, 5];

function recursive(arr, size) {
  let result = [];
  if (size === 1) return arr.map(num => [num]);

  arr.forEach((num, i, origin) => {
    // 순열 - 같은 숫자들로 재조합 o
    // const newOrigin = [...origin];
    // newOrigin.splice(i, 1);
    // const combs = recursive(newOrigin, size - 1);

    // 조합 - 같은 숫자들로 재조합 x
    const combs = recursive(origin.slice(i + 1), size - 1);

    result = [...result, ...combs.map(comb => [num, ...comb])];
  });
  return result;
}
console.log(recursive(arr, 3));
