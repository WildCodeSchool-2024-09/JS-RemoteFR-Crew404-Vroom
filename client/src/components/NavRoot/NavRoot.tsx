import NavMobile from "./NavMobile/NavMobile";
import NavPC from "./NavPC/NavPC";
import "./NavRoot.css";

interface NavRootProps {
  namePage: string;
}

function NavRoot(Props: NavRootProps) {
  const { namePage } = Props;
  return (
    <header className="headerRoot">
      <NavMobile namePage={namePage} />
      <NavPC namePage={namePage} />
    </header>
  );
}

export default NavRoot;
