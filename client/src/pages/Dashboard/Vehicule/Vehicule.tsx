import type React from "react";
import { useRef, useState } from "react";
import styles from "./Vehicule.module.css";

type Vehicule = {
  _id: number;
  id: number;
  marque: string;
  modele: string;
  picture: string | null;
  year: string;
  city: string;
};

function Vehicule() {
  const [formData, setFormData] = useState<{
    id: number;
    marque: string;
    modele: string;
    picture: string | null;
    year: string;
    city: string;
  }>({
    id: -1,
    marque: "",
    modele: "",
    picture: null,
    year: "",
    city: "",
  });

  const [vehicules, setVehicules] = useState<Vehicule[]>([
    {
      _id: 1,
      id: 1,
      marque: "Audi",
      modele: "R8",
      picture: null,
      year: "2007",
      city: "Paris",
    },
    {
      _id: 2,
      id: 2,
      marque: "Alpine",
      modele: "A110",
      picture: null,
      year: "1960",
      city: "Nice",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id],
    );
  };

  const handleDeleteSelected = () => {
    setVehicules((prevVehicules) =>
      prevVehicules.filter((vehicule) => !selectedIds.includes(vehicule.id)),
    );
    setSelectedIds([]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        picture: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = [];

    if (!formData.marque.trim())
      newErrors.push("Veuillez renseigner la marque.");
    if (!formData.modele.trim())
      newErrors.push("Veuillez renseigner le modèle.");
    if (!formData.year.trim() || Number.isNaN(Number(formData.year)))
      newErrors.push("Veuillez renseigner une année valide.");
    if (!formData.city.trim())
      newErrors.push("Veuillez renseigner une grande ville proche.");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const addOrUpdateVehicule = () => {
    if (!validateForm()) return;

    if (formData.id !== -1) {
      setVehicules((prevVehicules) =>
        prevVehicules.map((vehicule) =>
          vehicule.id === formData.id ? { ...vehicule, ...formData } : vehicule,
        ),
      );
    } else {
      setVehicules((prevVehicules) => [
        ...prevVehicules,
        { ...formData, _id: Date.now(), id: Date.now() },
      ]);
    }

    setFormData({
      id: -1,
      marque: "",
      modele: "",
      picture: null,
      year: "",
      city: "",
    });
    setIsModalOpen(false);
  };

  const handleVehiculeClick = (vehicule: Vehicule) => {
    setFormData({ ...vehicule });
    setIsModalOpen(true);
  };

  const handleAddButtonClick = () => {
    setFormData({
      id: -1,
      marque: "",
      modele: "",
      picture: null,
      year: "",
      city: "",
    });
    setIsModalOpen(true);
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className={styles.box}>
      <h2 className={styles.title}>Mes véhicules</h2>

      <div>
        {vehicules.map((vehicule) => (
          <div key={vehicule.id} className={styles.eventWrapper}>
            <input
              type="checkbox"
              checked={selectedIds.includes(vehicule.id)}
              onChange={() => handleCheckboxChange(vehicule.id)}
            />
            <button
              type="button"
              className={styles.event}
              onClick={() => handleVehiculeClick(vehicule)}
            >
              <div
                className={styles.image}
                style={{
                  backgroundImage: vehicule.picture
                    ? `url(${vehicule.picture})`
                    : "url(/default-placeholder.png)",
                  backgroundSize: "cover",
                }}
              />
              <div>
                <p>Marque: {vehicule.marque}</p>
                <p>Modèle: {vehicule.modele}</p>
                <p>Année: {vehicule.year}</p>
                <p className={styles.locationText}>
                  Ville: {vehicule.city.toUpperCase()}
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className={styles.deleteButton}
        onClick={handleDeleteSelected}
        disabled={selectedIds.length === 0}
      >
        Supprimer la sélection
      </button>

      <button
        type="button"
        className={styles.addButton}
        onClick={handleAddButtonClick} // Même bail que Event.tsx
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="32"
          height="32"
        >
          <title>Ajouter un véhicule</title>
          <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={handleOutsideClick}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsModalOpen(false);
            }
          }}
          tabIndex={-1}
        >
          <div className={styles.modalContent} ref={modalRef}>
            <h3>
              {formData.id !== -1
                ? "Modifier le véhicule"
                : "Ajouter un véhicule"}
            </h3>
            {errors.map((error) => (
              <p key={error} className={styles.errorMessage}>
                {error}
              </p>
            ))}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className={styles.input}
            />
            <input
              type="text"
              value={formData.marque}
              placeholder="Marque"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, marque: e.target.value }))
              }
              className={styles.input}
            />
            <input
              type="text"
              value={formData.modele}
              placeholder="Modèle"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, modele: e.target.value }))
              }
              className={styles.input}
            />
            <input
              type="text"
              value={formData.year}
              placeholder="Année de naissance (e.g., 2005)"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, year: e.target.value }))
              }
              className={styles.input}
            />
            <input
              type="text"
              value={formData.city}
              placeholder="Grande ville la plus proche"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, city: e.target.value }))
              }
              className={styles.input}
            />
            <div className={styles.modalButtons}>
              <button
                type="button"
                onClick={addOrUpdateVehicule}
                className={styles.largeButton}
              >
                {formData.id !== -1 ? "Modifier" : "Ajouter"}
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className={styles.smallButton}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vehicule;
