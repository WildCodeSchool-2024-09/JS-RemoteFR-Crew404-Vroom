import { Link } from "react-router-dom";
import MenuNavRoot from "../ComponentsNavRoot/MenuNavRoot";
import style from "../ComponentsNavRoot/MenuNavRoot.module.css";
import css from "./NavPC.module.css";

function NavPC() {
  return (
    <nav className={css.NavPC}>
      <div className="NavTopPC">
        {/*Le style de ce composant est directement géré par le module CSS :
                 MenuNavRoot.module.css*/}
        <MenuNavRoot
          moduleMenuUl={style.MenuUlPC}
          moduleMenuLi={style.MenuLiPC}
          moduleMenuLink={style.MenuLinkPC}
        />
      </div>

      <section className={css.NavBottomPC}>
        <Link to="/home">
          <h1>Ryan DECIAN</h1>
        </Link>
        <h3>Développeur web full stack junior</h3>
      </section>
    </nav>
  );
}

export default NavPC;
