import { Link } from "react-router-dom";
import MenuNavRoot from "../ComponentsNavRoot/MenuNavRoot";
import style from "../ComponentsNavRoot/MenuNavRoot.module.css";
import css from "./NavPC.module.css";

interface NavPCProps {
  namePage: string;
}

function NavPC(Props: NavPCProps) {
  const { namePage } = Props;
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
          <h1>{namePage}</h1>
        </Link>
      </section>
    </nav>
  );
}

export default NavPC;
