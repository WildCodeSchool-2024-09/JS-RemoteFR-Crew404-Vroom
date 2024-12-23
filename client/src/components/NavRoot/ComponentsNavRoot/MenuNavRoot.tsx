import { Link } from "react-router-dom";

/*Le style de ce composant est directement géré par le 
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
          <Link to="#" className={moduleMenuLink}>
            Tableau de bord
          </Link>
        </li>

        <li className={moduleMenuLi}>
          <Link to="#" className={moduleMenuLink}>
            Compte
          </Link>
        </li>

        <li className={moduleMenuLi}>
          <Link to="#" className={moduleMenuLink}>
            Maps
          </Link>
        </li>

        <li className={moduleMenuLi}>
          <Link to="#" className={moduleMenuLink}>
            Contact
          </Link>
        </li>

        <li className={moduleMenuLi}>
          <Link to="#" className={moduleMenuLink}>
            About
          </Link>
        </li>
      </ul>
    </>
  );
}

export default MenuNavRoot;
