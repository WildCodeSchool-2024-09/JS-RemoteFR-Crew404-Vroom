import "./App.css";
import { Outlet } from "react-router-dom";
import NavRoot from "./components/NavRoot/NavRoot";

function App() {
  return (
    <>
      <NavRoot />
      <Outlet />
    </>
  );
}

export default App;
