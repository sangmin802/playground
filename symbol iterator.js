const obj = {
  a: 1,
  b: 2,
  c: 3,
};

const iterableObj = (function () {
  const gen = (function* () {
    for (let i in obj) yield obj[i];
  })();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return gen.next();
    },
  };
})();

for (let i of iterableObj) {
  console.log(i);
}
