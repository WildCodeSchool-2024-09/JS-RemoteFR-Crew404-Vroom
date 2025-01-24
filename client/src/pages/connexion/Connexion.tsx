import type { AxiosResponse } from "axios";
import { useState } from "react";
import api from "../../helpers/api";
import styles from "./connexion.module.css";
import { useAuth } from "../../contexts/AuthContext";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface RegisterResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  };
}

function Connexion() {
  const [isLogin, setIsLogin] = useState(true);
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const { handleLogin } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (isLogin) {
      setLogin((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setRegister((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let response: AxiosResponse<LoginResponse | RegisterResponse>;
      if (isLogin) {
        response = await api.post<LoginResponse>("/api/login", login);
        handleLogin(response.data.user);
      } else {
        response = await api.post<RegisterResponse>("/api/register", register);
      }
      console.info(response.data);
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.Connexion}>
      {isLogin ? (
        <div>
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="login-email">Email :</label>
              <input
                type="email"
                id="login-email"
                name="email"
                required
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="login-password">Mot de passe :</label>
              <input
                type="password"
                id="login-password"
                name="password"
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>
            <button type="submit">Se connecter</button>
          </form>
          <p>
            Pas encore de compte ?{" "}
            <button type="button" onClick={toggleForm}>
              S'inscrire
            </button>
          </p>
        </div>
      ) : (
        <div>
          <h2>Inscription</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="register-lastname">Nom :</label>
              <input
                type="text"
                id="register-lastname"
                name="lastname"
                required
                onChange={handleChange}
                autoComplete="lastname"
              />
            </div>
            <div>
              <label htmlFor="register-firtsname">Prenom :</label>
              <input
                type="text"
                id="register-firstname"
                name="firstname"
                required
                onChange={handleChange}
                autoComplete="firstname"
              />
            </div>
            <div>
              <label htmlFor="register-username">Pseudo :</label>
              <input
                type="text"
                id="register-username"
                name="username"
                required
                onChange={handleChange}
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="register-email">Email :</label>
              <input
                type="email"
                id="register-email"
                name="email"
                required
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="register-password">Mot de passe :</label>
              <input
                type="password"
                id="register-password"
                name="password"
                required
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>
            <button type="submit">S'inscrire</button>
          </form>
          <p>
            Déjà un compte ?{" "}
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
