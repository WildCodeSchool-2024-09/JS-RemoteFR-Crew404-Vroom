import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import eyeClosed from "../../assets/Icons/eye-slash.svg";
import eye from "../../assets/Icons/eye.svg";
import NavRoot from "../../components/NavRoot/NavRoot";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../helpers/api";
import { errorToast, successToast } from "../../services/toast";
import styles from "./connexion.module.css";

// Interfaces pour typer les réponses de l'API
interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    is_admin: boolean;
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
    confirmPassword: "",
    firstname: "",
    lastname: "",
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  // Gestion des changements dans les champs de formulaire
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

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (isLogin) {
        // Connexion
        const response = await api.post<LoginResponse>("/api/login", login);
        handleLogin(response.data.user);
        successToast(`Bienvenue, ${response.data.user.username} !`);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        if (register.password !== register.confirmPassword) {
          errorToast("Les mots de passe ne correspondent pas.");
          setErrorMessage("Les mots de passe ne correspondent pas.");
          return;
        }
        // Inscription
        await api.post<RegisterResponse>("/api/register", register);
        // Si l'inscription réussit, connecte automatiquement l'utilisateur
        const loginResponse = await api.post<LoginResponse>("/api/login", {
          email: register.email,
          password: register.password,
        });
        handleLogin(loginResponse.data.user);
        setWelcomeMessage(
          `Bienvenue, ${loginResponse.data.user.username} ! Votre compte a été créé.`,
        );
        successToast(
          `Bienvenue, ${loginResponse.data.user.username} ! Votre compte a été créé.`,
        );
        setTimeout(() => {
          navigate("/account");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage("Email ou pseudo invalide");
      errorToast("Email ou pseudo invalide");
      console.error("Erreur lors de l'opération:", error);
    }
  };

  // Basculer entre les formulaires de connexion et d'inscription
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const passwordsMatch =
    register.password === register.confirmPassword && register.password !== "";

  return (
    <>
      <NavRoot namePage="Connexion" />
      <div className={styles.Connexion}>
        {welcomeMessage && (
          <div className={styles.WelcomeMessage}>{welcomeMessage}</div>
        )}
        {errorMessage && (
          <div className={styles.ErrorMessage}>{errorMessage}</div>
        )}
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
                <div className={styles.pwdLook}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="login-password"
                    name="password"
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                    className={styles.inputClass}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className={styles.eyes}
                  >
                    <img
                      src={showPassword ? eyeClosed : eye}
                      alt={showPassword ? "Cacher" : "Montrer"}
                    />
                  </button>
                </div>
              </div>
              <button type="submit" className={styles.submit}>
                Se connecter
              </button>
            </form>
            <p>
              Pas encore de compte ?{" "}
              <button
                type="button"
                onClick={toggleForm}
                className={styles.toggleForm}
              >
                S'inscrire
              </button>
            </p>
            <section className={styles.forgotPassword}>
              <Link to="/reset-password">Mot de passe oublier ?</Link>
            </section>
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
                  type={showPassword ? "text" : "password"}
                  id="register-password"
                  name="password"
                  required
                  onChange={handleChange}
                  autoComplete="new-password"
                  className={`${styles.inputClass2} ${
                    passwordsMatch
                      ? styles.PasswordMatch
                      : styles.PasswordMismatch
                  }`}
                />
              </div>
              <div>
                <label htmlFor="register-confirm-password">
                  Confirmer le mot de passe :
                </label>
                <div className={styles.pwdLook}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="register-confirm-password"
                    name="confirmPassword"
                    required
                    onChange={handleChange}
                    autoComplete="new-password"
                    className={`${styles.inputClass} ${
                      passwordsMatch
                        ? styles.PasswordMatch
                        : styles.PasswordMismatch
                    }`}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className={styles.eyes}
                  >
                    <img
                      src={showPassword ? eyeClosed : eye}
                      alt={showPassword ? "Cacher" : "Montrer"}
                    />
                  </button>
                </div>
              </div>
              <button type="submit" className={styles.submit}>
                S'inscrire
              </button>
            </form>
            <p>
              Déjà un compte ?{" "}
              <button
                type="button"
                onClick={toggleForm}
                className={styles.toggleForm}
              >
                Se connecter
              </button>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Connexion;
