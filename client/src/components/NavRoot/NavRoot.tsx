import NavMobile from "./NavMobile/NavMobile";
import NavPC from "./NavPC/NavPC";

function NavRoot() {
  return (
    <header className="headerRoot">
      <NavMobile />
      <NavPC />
    </header>
  );
}

export default NavRoot;
