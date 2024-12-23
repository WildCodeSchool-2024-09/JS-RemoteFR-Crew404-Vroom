import "./NavMobile.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuNavRoot from "../ComponentsNavRoot/MenuNavRoot";
import style from "../ComponentsNavRoot/MenuNavRoot.module.css";

function NavMobile() {
  const [active, setActive] = useState(false);
  const funcActive = () => {
    setActive(!active);
  };
  return (
    <>
      <nav className="NavMobile">
        <Link to="/home">
          <div id="LogoMobile">
            <h1 className="front">Vroom</h1>
            <h1 className="back">Vroom</h1>
          </div>
        </Link>

        <h3>Bienvenue sur VROOM</h3>
        <div className={`sideNav ${active ? "active" : ""}`} id="mySideNav">
          <div>
            <button
              id="closeBtn"
              className="ButtonClose"
              type="button"
              onClick={funcActive}
            >
              x
            </button>
          </div>

          {/*Le style de ce composant est directement géré par le module CSS :
                     MenuNavRoot.module.css*/}
          <MenuNavRoot
            moduleMenuUl={style.MenuUlMobile}
            moduleMenuLi={style.MenuLiMobile}
            moduleMenuLink={style.MenuLinkMobile}
          />
        </div>

        <button type="button" id="openBtn" onClick={funcActive}>
          <span className="menuBurger">
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>
    </>
  );
}
export default NavMobile;
