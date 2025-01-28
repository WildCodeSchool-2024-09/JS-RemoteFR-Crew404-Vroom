import { Link } from "react-router-dom";
import Logo from "../../../assets/Logos/Logo-model-3.svg";
import css from "./NavPC.module.css";

interface NavPCProps {
  namePage: string;
}

function NavPC(Props: NavPCProps) {
  const { namePage } = Props;
  return (
    <nav className={css.NavPC}>
      <div className={css.ContainerLogNavPC}>
        <div className={css.LogoNavPC}>
          <img src={Logo} alt="Logo RoadAddict" />
        </div>

        <ul className={css.MenuUlPC}>
          <li className={css.MenuLiPC}>
            <Link to="/maps" className={css.MenuLinkPC}>
              Maps
            </Link>
          </li>

          <li className={css.SousNavLiPC}>
            <span className={css.SousNavSpanPC}>Nous ↓</span>

            <ul className={css.SousMenuUlPC}>
              <li className={css.SousMenuLiPC}>
                <Link to="" className={css.SousMenuLinkPC}>
                  Contact
                </Link>
              </li>

              <li className={css.SousMenuLiPC}>
                <Link to="" className={css.SousMenuLinkPC}>
                  A Propos
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className={css.NamePageNavPC}>
        <Link to="/">
          <h1>{namePage}</h1>
        </Link>
      </div>

      <div className={css.ContainerLogNavPC}>
        <li className={css.MenuLiPC}>
          <Link to="/dashbord" className={css.MenuLinkPC}>
            Tableau de bord
          </Link>
        </li>

        <li className={css.MenuLiPC}>
          <Link to="/account" className={css.MenuLinkPC}>
            Compte
          </Link>
        </li>
      </div>
    </nav>
  );
}

export default NavPC;
