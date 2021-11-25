import { useCallback, useEffect, useState } from "react";
import "./styles.css";

let cachedResolve = null;

export default function App() {
  const [nav, setNav] = useState(0);

  const handleNavigation = useCallback(() => {
    setNav(prevNav => (prevNav === 0 ? 1 : 0));
  }, []);

  return (
    <div className="App">
      <button onClick={handleNavigation}>버튼</button>
      {nav === 0 && <NavOne />}
      {nav === 1 && <NavTwo />}
    </div>
  );
}

function NavOne() {
  const [state, setState] = useState(0);

  const handleClick = useCallback(async () => {
    const data = await new Promise(resolve => {
      cachedResolve = resolve;
      console.log("NavOne Promise pending");
    });
    console.log(data);
  }, []);

  return (
    <div>
      <button onClick={handleClick}>버튼</button>Navigation 1
    </div>
  );
}

function NavTwo() {
  useEffect(() => {
    cachedResolve("NavOne Promise resolved on NavTwo");
  }, []);

  return <div>Navigation 2</div>;
}
