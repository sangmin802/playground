function wrapper() {
  // 안됨
  // clo 라는 함수 실행 컨텍스트가 스택에 쌓일 때에 var 는 아직 미할당, let은 미 초기화 상태
  // clo();
  function clo() {
    console.log("클로저", variable, letVariable);
  }

  var variable = "variable";
  let letVariable = "let variable";

  // 됨
  // clo 라는 함수 실행 컨텍스트가 스택에 쌓일 때에는 두가지 변수 모두 할당외 완료된 상태
  clo();
}

wrapper();
