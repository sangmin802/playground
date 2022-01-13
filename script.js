(function () {
  try {
    (function () {
      (function () {
        (function () {
          (function () {
            throw Error("에러!");
          })();
        })();
      })();
    })();
  } catch {
    console.log("err");
  }
})();
