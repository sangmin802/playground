const obj = {
  1: 1,
  2: 2,
  3: 3,
  *[Symbol.iterator]() {
    for (let i in this) {
      yield this[i];
    }
  },
};

Array.from(obj).map(n => console.log(n));
