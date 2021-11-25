// 클로저 사용이 핵심

const MyReact = (function () {
  // hook을 저장할 배열과 반복자(hook을 만들때마다 인덱스가 증가하고 랜더링 직후 초기화됩니다.)
  // 모든 hook 들이 저장되고 클로저로서 기억될 hooks
  let hooks = [],
    currentHook = 0;

  return {
    render(Component) {
      // Global 랜더링 함수가 필요시 개별 components들의 랜더링 함수를 수행합니다.
      const Comp = Component(); // run effects
      Comp.render(); // 실제로는 이거 호출 되고 useEffect 콜백들이 실행되는거 아닐까
      currentHook = 0; // 다음 렌더링을 위해 초기화합니다.
      return Comp;
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const deps = hooks[currentHook]; // 타입: 배열 또는 undefined
      const hasChangedDeps = deps
        ? !depArray.every((el, i) => el === deps[i])
        : true;
      if (hasNoDeps || hasChangedDeps) {
        //
        callback();
        hooks[currentHook] = depArray;
      }
      currentHook++; // 현재 hook을 처리했으면 요게 완료처리다.
    },
    useState(initialValue) {
      hooks[currentHook] = hooks[currentHook] || initialValue; // 타입: 모든 자료형

      // 내부함수 setState의 closure를 만들자, setState가 나중에 실행될 때 setStateHookIndex는 hook 배열에서 제대로된 요소를 기억하고 있다.
      const setStateHookIndex = currentHook; // useState가 호출될 당시의 currentHook 기억
      const setState = newState => (hooks[setStateHookIndex] = newState);

      return [hooks[currentHook++], setState];
    },
  };
})();

// 사례 4 계속 - hook 활용
function Counter() {
  const [count, setCount] = MyReact.useState(0);
  const [text, setText] = MyReact.useState("foo"); // 2번째 상태!

  console.log("fucking!!");

  MyReact.useEffect(() => {
    console.log("effect", count, text);
  }, [count, text]);

  console.log("idiot!!");

  return {
    click: () => setCount(count + 1),
    type: txt => setText(txt),
    noop: () => setCount(count),
    render: () => console.log("render", { count, text }),
  };
}

let App;
App = MyReact.render(Counter);
// effect 0 foo
// render {count: 0, text: 'foo'}
App.click();
App = MyReact.render(Counter);
// effect 1 foo
// render {count: 1, text: 'foo'}
App.type("bar");
App = MyReact.render(Counter);
// effect 1 bar
// render {count: 1, text: 'bar'}
App.noop();
App = MyReact.render(Counter);
// // no effect run
// render {count: 1, text: 'bar'}
App.click();
App = MyReact.render(Counter);
// effect 2 bar
// render {count: 2, text: 'bar'}

// 클로저는 선언될 당시인 정적범위를 기억하고 있어서 해당 변수의 값이 변하는걸 알고, 사용 가능
// 단 값을 할당되는것은 선언이 아닌 해당 코드가 실행될 때(호출될 때)
// 호이스팅의 영향 / 선언 - 초기화 - 할당
function outer() {
  let count = 0;
  // let count = { count: 0 };

  return {
    addCount: () => count++,
    // addCount: () => count.count++,
    showCount: () => {
      const savedCount = count; // return 0,3
      return () => {
        // const savedCount = count; // return 3,3
        console.log(savedCount, count, "inner");
      };
    },
  };
}

const func = outer();
const showCount1 = func.showCount();
// showCount1(); 여기에 있다면, 둘다 return 0,3이긴 함
func.addCount();
func.addCount();
func.addCount();
const showCount2 = func.showCount();
showCount1();
showCount2();

// 두가지의 결과가 다른 이유 - 모두 클로저로서 정적 스코프로 형성된 변수, 상수들을 기억하는것은 맞지만, 호출될 때 그 순간의 값이 할당·저장 됨
// 1. 선언되는 환경에서 정적 스코프에 해당되는 변수, 상수들을 기억 함(선언 및 초기화 단계). 단, 값을 할당하는것은 호출단계에서 결정
//    따라서, showCount 내부에 savedCount가 선언되어있을 때에는, showCount가 호출될 때, 참조하고있는 count의 현재 값을 savedCount에 할당함
//    그리고, showCount가 반환하는 함수가 호출될 때, 참조하고있는 savedCount의 값을 보여줌

// 2. savedCount가 showCount의 반환되는 함수 내부에서 선언된다면, 호출될 때, 현재의 참조하고있는 count의 값을 보여줌
