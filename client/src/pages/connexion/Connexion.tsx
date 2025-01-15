import { useState } from "react";
import styles from "./connexion.module.css";

function Connexion() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.Connexion}>
      {isLogin ? (
        <div>
          <h2>Connexion</h2>
          <form>
            <div>
              <label htmlFor="login-email">Email:</label>
              <input type="email" id="login-email" name="email" required />
            </div>
            <div>
              <label htmlFor="login-password">Mot de passe:</label>
              <input
                type="password"
                id="login-password"
                name="password"
                required
              />
            </div>
            <button type="submit">Se connecter</button>
          </form>
          <p>
            Pas encore de compte?{" "}
            <button type="button" onClick={toggleForm}>
              S'inscrire
            </button>
          </p>
        </div>
      ) : (
        <div>
          <h2>Inscription</h2>
          <form>
            <div>
              <label htmlFor="register-name">Nom:</label>
              <input type="text" id="register-name" name="name" required />
            </div>
            <div>
              <label htmlFor="register-firtsname">Prenom:</label>
              <input
                type="text"
                id="register-firstname"
                name="firstname"
                required
              />
            </div>
            <div>
              <label htmlFor="register-pseudo">Pseudo:</label>
              <input type="text" id="register-pseudo" name="pseudo" required />
            </div>
            <div>
              <label htmlFor="register-email">Email:</label>
              <input type="email" id="register-email" name="email" required />
            </div>
            <div>
              <label htmlFor="register-password">Mot de passe:</label>
              <input
                type="password"
                id="register-password"
                name="password"
                required
              />
            </div>
            <button type="submit">S'inscrire</button>
          </form>
          <p>
            Déjà un compte?{" "}
            <button type="button" onClick={toggleForm}>
              Se connecter
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default Connexion;
