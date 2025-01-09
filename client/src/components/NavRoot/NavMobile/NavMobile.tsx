import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import MenuNavRoot from "../ComponentsNavRoot/MenuNavRoot";
import style from "../ComponentsNavRoot/MenuNavRoot.module.css";
import css from "./NavMobile.module.css";

function NavMobile() {
  const [active, setActive] = useState(false); /*Open Close MenuBurger*/
  const [count, setCount] = useState(() => Math.floor(Math.random() * 4) + 1);

  useEffect(() => {
    setCount(() => Math.floor(Math.random() * 4) + 1);
  });

  const funcActive = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className={css.NavMobile}>
        <Link to="/home">
          <div className={css.LogoMobile}>
            <h1 className={css.front}>Vroom</h1>
            <h1 className={css.back}>Vroom</h1>
          </div>
        </Link>

        <h3>Bienvenue sur VROOM</h3>
        <div
          className={`${css.sideNav} ${active ? css.active : ""} ${css.mySideNav}`}
        >
          <div className={css.logCloseBtn}>
            {count === 1 && (
              <button
                className={css.closeBtn}
                type="button"
                onClick={funcActive}
              >
                x
              </button>
            )}
          </div>

          {/*Le style de ce composant est directement géré par le module CSS :
                     MenuNavRoot.module.css*/}
          <MenuNavRoot
            moduleMenuUl={style.MenuUlMobile}
            moduleMenuLi={style.MenuLiMobile}
            moduleMenuLink={style.MenuLinkMobile}
          />
        </div>

        <button type="button" className={css.openBtn} onClick={funcActive}>
          <span className={css.menuBurger}>
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
