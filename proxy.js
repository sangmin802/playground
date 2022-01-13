let obj = {
  name: "상민",
};

const proxy = new Proxy(obj, {
  get(target, property, receiver) {
    console.log(target, property, receiver);
    if (property in target) {
      return target[property];
    } else {
      return "나이가 없습니다.";
    }
  },
  set(target, property, value) {
    console.log(target, property, value);

    if (typeof value !== "number") {
      console.log("숫자가 아닙니다.");
      return false;
    } else {
      target[property] = value;
      return true;
    }
  },
});

// proxy.age = 28;

console.log(obj.age);
console.log(proxy.age);

proxy.age = 28;

console.log(obj.age);
