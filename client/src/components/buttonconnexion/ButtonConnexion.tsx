import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function ButtonConnexion() {
  const { user, handleLogout } = useAuth();

  return (
    <>
      {user ? (
        <>
          <p>Bonjour {user.email}</p>
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </>
      ) : (
        <>
          <Link to="/connexion">Connexion / Inscription</Link>
        </>
      )}
    </>
  );
}
export default ButtonConnexion;
