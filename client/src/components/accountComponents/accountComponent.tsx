import { useEffect, useState } from "react";
import Envelope from "../../assets/images/social/envelope.png";
import { useData } from "../../contexts/DataContext";
import api from "../../helpers/api";
import type { User } from "../../types/users";
import styles from "./accountComponent.module.css";

function accountComponent() {
  const { currentUser, setCurrentUser } = useData();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // appel API
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/users/me");
        setCurrentUser(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [setCurrentUser]);

  // Fonction pour uploader une image
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentUser) {
      const formData = new FormData();
      formData.append("profile_picture", file);

      api
        .put(`/api/users/${currentUser.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setCurrentUser((prevUser) => {
              if (!prevUser) return null;
              return {
                ...prevUser,
                profile_picture: response.data.profile_picture, // Utilisez la réponse du serveur ici
              } as User;
            });
          }
        })
        .catch((error) => {
          console.error("Erreur lors de l'upload de l'image :", error);
        });

      // Pour l'aperçu
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return "";
    const d = new Date(date);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  };

  // Fonction pour sauvegarder les modifications
  const handleSaveChanges = async () => {
    if (currentUser) {
      const updatedFields = {
        profile_picture: currentUser.profile_picture,
        birthdate: formatDate(currentUser.birthdate),
        phone_number: currentUser.phone_number,
      };
      try {
        const response = await api.put(
          `/api/users/${currentUser.id}`,
          updatedFields,
        );
        if (response.status === 200) {
          console.info("Modifications enregistrées avec succès !");
        } else {
          throw new Error("Erreur lors de la sauvegarde");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la sauvegarde des modifications :",
          error,
        );
        alert("Une erreur est survenue lors de la sauvegarde.");
      }
    }
  };

  if (isLoading) {
    return <div className={styles.chargement}>Chargement...</div>;
  }

  if (!currentUser) {
    return (
      <div>Erreur: Impossible de charger les données de l'utilisateur</div>
    );
  }

  return (
    <>
      <div className={styles.accountContainer}>
        <section className={styles.generalContainer}>
          <div className={styles.imgContainer}>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileUpload}
              className={styles.input}
            />
            {(previewImage || currentUser.profile_picture) && (
              <div className={styles.imageContainer}>
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${currentUser.profile_picture}`}
                  alt="Avatar utilisateur"
                  className={styles.previewImage}
                />
              </div>
            )}
          </div>
          <span className={styles.idContainer}>
            <input type="text" value={currentUser.username || ""} readOnly />
            <button type="button">Changer le mot de passe</button>
          </span>
          <span className={styles.mailContainer || ""}>
            <img src={Envelope} alt="icon-mail" />
            <input type="text" value={currentUser.email || ""} readOnly />
          </span>
          <span className={styles.fieldContainer}>
            <p>Nom :</p>
            <input type="text" value={currentUser.lastname || ""} readOnly />
          </span>
          <span className={styles.fieldContainer}>
            <p>Prénom :</p>
            <input type="text" value={currentUser.firstname || ""} readOnly />
          </span>
          <span className={styles.fieldContainer}>
            <p>Date de naissance :</p>
            <input
              type="date"
              value={
                currentUser.birthdate ? formatDate(currentUser.birthdate) : ""
              }
              onChange={(e) => {
                setCurrentUser({ ...currentUser, birthdate: e.target.value });
              }}
            />
          </span>
          <span className={styles.fieldContainer}>
            <p>Téléphone :</p>
            <input
              type="text"
              value={currentUser?.phone_number || "+33"}
              onChange={(e) => {
                if (currentUser) {
                  setCurrentUser({
                    ...currentUser,
                    phone_number: e.target.value,
                  });
                }
              }}
            />
          </span>
          <button
            type="button"
            onClick={handleSaveChanges}
            className={styles.button}
          >
            Valider les changements
          </button>
        </section>
      </div>
    </>
  );
}

export default accountComponent;
