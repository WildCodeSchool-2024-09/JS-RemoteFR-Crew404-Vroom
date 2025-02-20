import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ConfirmResetPassword.css";
import NavRoot from "../../components/NavRoot/NavRoot";

const ConfirmResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Token invalide ou expiré.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3310/api/reset-password/confirm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Votre mot de passe a été réinitialisé avec succès.");
      } else {
        setError(data.error || "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (err) {
      setError("Impossible de se connecter au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavRoot namePage="Réinitialiser" />
      <div className="reset-password-container">
        <h2>Réinitialisation du mot de passe</h2>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        {!message && token && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="new-password">Nouveau mot de passe :</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Entrez votre nouveau mot de passe"
            />
            <button type="submit" disabled={loading}>
              {loading ? "Envoi..." : "Changer le mot de passe"}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ConfirmResetPassword;
