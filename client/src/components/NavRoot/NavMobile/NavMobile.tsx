import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logos/Logo-model-3.svg";
import MenuNavRoot from "../ComponentsNavRoot/MenuNavRoot";
import style from "../ComponentsNavRoot/MenuNavRoot.module.css";
import css from "./NavMobile.module.css";

/*Import des Icons de fermeture du MenuBurger*/
import Closebtn1 from "../../../assets/Icons/CloseBtn1.svg";
import Closebtn2 from "../../../assets/Icons/CloseBtn2.svg";
import Closebtn3 from "../../../assets/Icons/CloseBtn3.svg";

function NavMobile() {
  const [active, setActive] = useState(false); /*Open Close MenuBurger*/
  const [count, setCount] = useState(() => Math.floor(Math.random() * 4) + 1);

  useEffect(() => {
    setCount(() => Math.floor(Math.random() * 4) + 1);
  }, []);

  const funcActive = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className={css.NavMobile}>
        <div className={css.ContainerNavMobile}>
          <div className={css.LogoNavMobile}>
            <Link to="/">
              <img src={Logo} alt="Logo RoadAddict" />
            </Link>
          </div>
        </div>

        {/*lvl 1*/}
        <div className={`${css.sideNav} ${active ? css.active : ""}`}>
          {/*lvl 2*/}
          <div className={css.logCloseBtn}>
            {/*lvl 3*/}
            {count === 1 && (
              <button
                className={css.closeBtnLog1}
                type="button"
                onClick={funcActive}
              >
                x
              </button>
            )}

            {/*lvl 3*/}
            {count === 2 && (
              <button
                className={css.closeBtnLog2}
                type="button"
                onClick={funcActive}
              >
                <img className={css.ImgCloseBtn} src={Closebtn1} alt="" />
              </button>
            )}

            {/*lvl 3*/}
            {count === 3 && (
              <button
                className={css.closeBtnLog2}
                type="button"
                onClick={funcActive}
              >
                <img className={css.ImgCloseBtn} src={Closebtn2} alt="" />
              </button>
            )}

            {/*lvl 3*/}
            {count === 4 && (
              <button
                className={css.closeBtnLog2}
                type="button"
                onClick={funcActive}
              >
                <img className={css.ImgCloseBtn} src={Closebtn3} alt="" />
              </button>
            )}
          </div>

          {/*Le style de ce composant est directement géré par le module CSS :
         MenuNavRoot.module.css*/}
          {/*lvl 2*/}
          <MenuNavRoot
            moduleMenuUl={style.MenuUlMobile}
            moduleMenuLi={style.MenuLiMobile}
            moduleMenuLink={style.MenuLinkMobile}
          />
        </div>

        {/*lvl 1*/}
        <button
          className={`${css.subSideNav} ${active ? css.active : ""}`}
          onClick={funcActive}
          type="button"
        />

        {/*lvl 1*/}
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
