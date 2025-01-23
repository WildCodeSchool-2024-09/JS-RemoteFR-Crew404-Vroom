import { Link } from "react-router-dom";

/* Le style de ce composant est directement géré par le 
CSS du composant qui l'importe et l'utilise*/

interface MenuNavRootProps {
  moduleMenuUl: string;
  moduleMenuLi: string;
  moduleMenuLink: string;
}

function MenuNavRoot(Props: MenuNavRootProps) {
  const { moduleMenuUl, moduleMenuLi, moduleMenuLink } = Props;
  return (
    <>
      <ul className={moduleMenuUl}>
        <li className={moduleMenuLi}>
          <Link to="/home" className={moduleMenuLink}>
            Accueil
          </Link>
        </li>

        <li className={moduleMenuLi}>
          <Link to="/dashbord" className={moduleMenuLink}>
            Tableau de bord
          </Link>
        </li>

        <li className={moduleMenuLi}>
          <Link to="/account" className={moduleMenuLink}>
            Compte
          </Link>
        </li>

        <li className={moduleMenuLi}>
          <Link to="/maps" className={moduleMenuLink}>
            Maps
          </Link>
        </li>

        <li className={moduleMenuLi}>
          <Link to="/contact" className={moduleMenuLink}>
            Contact
          </Link>
        </li>

        <li className={moduleMenuLi}>
          <Link to="/about" className={moduleMenuLink}>
            A propos
          </Link>
        </li>

        <li className={moduleMenuLi}>
          <Link to="/connexion" className={moduleMenuLink}>
            Connexion / Inscription
          </Link>
        </li>
      </ul>
    </>
  );
}

export default MenuNavRoot;
