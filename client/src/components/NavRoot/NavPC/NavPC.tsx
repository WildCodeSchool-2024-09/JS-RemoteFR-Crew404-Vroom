import { Link } from "react-router-dom";
import Logo from "../../../assets/Logos/Logo-model-3.svg";
import style from "../ComponentsNavRoot/MenuNavRoot.module.css";
import css from "./NavPC.module.css";

interface NavPCProps {
  namePage: string;
}

function NavPC(Props: NavPCProps) {
  const { namePage } = Props;
  return (
    <nav className={css.NavPC}>
      <div className={css.ContainerLogLogoNavPC}>
        <div className={css.LogoNavPC}>
          <img src={Logo} alt="Logo RoadAddict" />
        </div>

        <ul className={style.MenuUlPC}>
          <li className={style.MenuLiPC}>
            <Link to="/maps" className={style.MenuLinkPC}>
              Maps
            </Link>
          </li>

          <li className={style.MenuLiPC}>
            <Link to="/contact" className={style.MenuLinkPC}>
              Nous
            </Link>
          </li>
        </ul>
      </div>

      <div className={css.NamePageNavPC}>
        <Link to="/">
          <h1>{namePage}</h1>
        </Link>
      </div>

      <div className={css.ContainerLogLogoNavPC}>
        <li className={style.MenuLiPC}>
          <Link to="/dashbord" className={style.MenuLinkPC}>
            Tableau de bord
          </Link>
        </li>

        <li className={style.MenuLiPC}>
          <Link to="/account" className={style.MenuLinkPC}>
            Compte
          </Link>
        </li>
      </div>
    </nav>
  );
}

export default NavPC;
