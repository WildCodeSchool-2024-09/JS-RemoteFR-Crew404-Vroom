import { Link } from "react-router-dom";
import Logo from "../../../assets/Logos/Logo-model-3.svg";
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
      {/*Le style de ce composant est directement géré par le module CSS :
        MenuNavRoot.module.css*/}
      <MenuNavRoot
        moduleMenuUl={style.MenuUlPC}
        moduleMenuLi={style.MenuLiPC}
        moduleMenuLink={style.MenuLinkPC}
        moduleMenuLiNone={style.MenuLiNonePC}
        moduleMenuNavRoot={style.MenuNavRootPC}
      />

      <div className={css.NamePageNavPC}>
        <Link to="/">
          <h1>{namePage}</h1>
        </Link>
      </div>

      <div className={css.ContainerLogLogoNavPC}>
        <li className={style.MenuLiPC}>
          <Link to="/conne" className={style.MenuLinkPC}>
            Connexion / Inscription
          </Link>
        </li>

        <div className={css.LogoNavPC}>
          <img src={Logo} alt="Logo RoadAddict" />
        </div>
      </div>
    </nav>
  );
}

export default NavPC;
