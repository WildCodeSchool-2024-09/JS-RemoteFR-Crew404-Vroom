import type React from "react";
import { useEffect, useRef, useState } from "react";
import api from "../../../helpers/api";
import { errorToast, successToast } from "../../../services/toast";
import styles from "./Vehicule.module.css";

type Vehicule = {
  _id: number;
  id: number;
  vehicle_picture?: string;
  type: string;
  status: string;
  location: string;
  energy: string;
  user_id: string;
  model_id: number;
  year: number;
  brand: string;
  model: string;
};

const resetFormData = {
  _id: -1,
  id: 0,
  vehicle_picture: "https://picsum.photos/200/300?random=1",
  type: "",
  status: "",
  location: "",
  energy: "",
  user_id: "",
  model_id: 0,
  year: 0,
  brand: "",
  model: "",
};

function Vehicule() {
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);
  const [formData, setFormData] = useState<Vehicule>(resetFormData);
  const [sendVehicule, setSendVehicule] = useState<boolean>(false);

  // biome-ignore lint: useExhaustiveDependencies
  useEffect(() => {
    async function fetchVehicules() {
      try {
        const response = await api.get<Vehicule[]>("/api/my-vehicules");
        setVehicules(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVehicules();
  }, [sendVehicule]);

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
        vehicle_picture: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = [];

    if (!formData.brand.trim())
      newErrors.push("Veuillez renseigner la marque.");
    if (!formData.model.trim())
      newErrors.push("Veuillez renseigner le modèle.");
    if (!formData.year || Number.isNaN(Number(formData.year)))
      newErrors.push("Veuillez renseigner une année valide.");
    if (!formData.location.trim())
      newErrors.push("Veuillez renseigner une grande ville proche.");

    setErrors(newErrors);
    console.error(newErrors);
    return newErrors.length === 0;
  };

  const handlePostVehicule = async () => {
    try {
      await api.post<Vehicule>("/api/vehicules", {
        ...formData,
      });

      setVehicules((prevVehicules) => [...prevVehicules, formData]);
      successToast("Véhicule ajouté avec succès !");
      setSendVehicule((prev) => !prev);
    } catch (error) {
      errorToast("Une erreur s'est produite lors de l'ajout du véhicule.");
    }
  };
  const addOrUpdateVehicule = () => {
    if (!validateForm()) return;

    /**
     * Si l'ID est différent de -1, on met à jour le véhicule existant
     */
    if (formData._id !== -1) {
      setVehicules((prevVehicules) =>
        prevVehicules.map((vehicule) =>
          vehicule.id === formData.id ? { ...vehicule, ...formData } : vehicule,
        ),
      );
    } else {
      // Sinon, on ajoute un nouveau véhicule
      handlePostVehicule();
    }

    setFormData(resetFormData);
    setIsModalOpen(false);
  };

  const handleVehiculeClick = (vehicule: Vehicule) => {
    setFormData({ ...vehicule });
    setIsModalOpen(true);
  };

  const handleAddButtonClick = () => {
    setFormData(resetFormData);
    setIsModalOpen(true);
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  const getCity = async (location: string) => {
    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${location}&limit=1`,
      );
      const data = await response.json();
      // get lat and lon
      const coordinates = data.features[0].geometry.coordinates;
      setFormData((prev) => ({ ...prev, coord: coordinates }));
    } catch (error) {
      console.error("Erreur lors de la récupération de l'adresse :", error);
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
                  backgroundImage: vehicule.vehicle_picture
                    ? `url(${vehicule.vehicle_picture})`
                    : "url(/default-placeholder.png)",
                  backgroundSize: "cover",
                }}
              />
              <div>
                <p>Marque: {vehicule.brand}</p>
                <p>Modèle: {vehicule.model}</p>
                <p>Année: {vehicule.year}</p>
                <p className={styles.locationText}>
                  Ville: {vehicule.location.toUpperCase()}
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
              value={formData.brand}
              placeholder="Marque"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  brand: e.target.value,
                }))
              }
              className={styles.input}
            />
            <input
              type="text"
              value={formData.model}
              placeholder="Modèle"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  model: e.target.value,
                }))
              }
              className={styles.input}
            />
            <input
              type="number"
              value={formData.year}
              placeholder="Année de naissance (e.g., 2005)"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  year: Number(e.target.value),
                }))
              }
              className={styles.input}
            />
            <input
              type="text"
              value={formData.location}
              placeholder="Grande ville la plus proche"
              onChange={(e) =>
                setFormData((prev) => {
                  getCity(e.target.value);
                  return {
                    ...prev,
                    location: e.target.value,
                  };
                })
              }
              className={styles.input}
            />
            <div className={styles.modalButtons}>
              <button
                type="button"
                onClick={addOrUpdateVehicule}
                className={styles.largeButton}
              >
                {formData._id !== -1 ? "Modifier" : "Ajouter"}
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
