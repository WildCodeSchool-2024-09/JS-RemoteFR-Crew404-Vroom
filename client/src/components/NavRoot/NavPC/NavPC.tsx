import { Link } from "react-router-dom";
import MenuNavRoot from "../ComponentsNavRoot/MenuNavRoot";
import style from "../ComponentsNavRoot/MenuNavRoot.module.css";
import css from "./NavPC.module.css";

function NavPC() {
  return (
    <nav className={css.NavPC}>
      <div className={css.NavTopPC}>
        {/*Le style de ce composant est directement géré par le module CSS :
                 MenuNavRoot.module.css*/}
        <MenuNavRoot
          moduleMenuUl={style.MenuUlPC}
          moduleMenuLi={style.MenuLiPC}
          moduleMenuLink={style.MenuLinkPC}
          moduleMenuLiNone={style.MenuLiNonePC}
          moduleMenuNavRoot={style.MenuNavRootPC}
        />

        <li className={style.MenuLiPC}>
          <Link to="/conne" className={style.MenuLinkPC}>
            Connexion / Inscription
          </Link>
        </li>
      </div>

      <section className={css.NavBottomPC}>
        <Link to="/">
          <h1>BIENVENUE SUR RoadAddict</h1>
        </Link>
        <h3>test test tes</h3>
      </section>
    </nav>
  );
}

export default NavPC;
