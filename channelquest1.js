function answer(x) {
  if (!isFinite(x)) return null;
  if (isNaN(x)) return null;

  const xArr = String(x).split("");
  let answer = "";
  let isIntenger = Number.isInteger(x);
  let count = 3;

  while (xArr.length) {
    let target = xArr.pop();
    if (!count) {
      const comma = target !== "-" ? "," : "";
      answer = comma + answer;
      count = 3;
    }

    if (target === ".") {
      isIntenger = true;
      answer = target + answer;
      continue;
    }

    if (target === "-" || !isIntenger) {
      answer = target + answer;
      continue;
    }

    count -= 1;
    answer = target + answer;
  }

  return answer;
}

console.log(answer(1000));
