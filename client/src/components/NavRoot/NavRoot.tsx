import NavMobile from "./NavMobile/NavMobile";
import NavPC from "./NavPC/NavPC";

interface NavRootProps {
  namePage: string;
}

function NavRoot(Props: NavRootProps) {
  const { namePage } = Props;
  return (
    <header className="headerRoot">
      <NavMobile />
      <NavPC namePage={namePage} />
    </header>
  );
}

export default NavRoot;
