// 클로저기능을 사용하고, 비동기의 경우 유용 할 듯
const test = val1 => val2 => val3 => {
  const result = val1+val2+val3;
  console.log(result);
}
test(1)(2)(3)


function test2(val1){
  return function(val2){
    return function(val3) {
      console.log(val1+val2+val3)
    }
  }
}