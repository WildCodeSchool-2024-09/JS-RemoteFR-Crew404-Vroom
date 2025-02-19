import { useEffect, useRef, useState } from "react";
import defaultVehicleImg from "../../../assets/images/pictures/defaultVehicleImg.png";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../helpers/api";
import { errorToast, successToast } from "../../../services/toast";
import type { VehicleData } from "../../../types/vehicle";
import styles from "./Favoris.module.css";

interface FavoriteItem extends VehicleData {
  // Utilise VehicleData comme base
  favoris_id: number; // Ajoute l'ID du favori
}

const Favoris: React.FC = () => {
  const { user } = useAuth();
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("model");
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [selectedFavorites, setSelectedFavorites] = useState<number[]>([]);
  const lastScrollY = useRef(0);
  const advertRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!advertRef.current || !headerRef.current) return;

      const advertTop = advertRef.current.getBoundingClientRect().top;
      const headerHeight = headerRef.current.offsetHeight;
      const scrollY = window.scrollY;

      setIsSticky(advertTop < -headerHeight);
      setIsVisible(scrollY > lastScrollY.current || advertTop >= 0);
      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get("/api/users/me/favoris");
        // Adapter la réponse pour correspondre à FavoriteItem
        const formattedFavorites: FavoriteItem[] = response.data.map(
          (item: {
            favoris_id: number;
            id: number;
            vehicle_picture: string;
            type: string;
            status: string;
            energy: string;
            location: string;
            latitude: number;
            longitude: number;
            user_id: number;
            year: number;
            brand: string;
            model: string;
          }) => ({
            favoris_id: item.favoris_id, // L'ID du "like"
            id: item.id, // L'ID du véhicule
            vehicle_picture: item.vehicle_picture,
            type: item.type,
            status: item.status,
            energy: item.energy,
            location: item.location,
            latitude: item.latitude,
            longitude: item.longitude,
            user_id: item.user_id,
            year: item.year,
            brand: item.brand,
            model: item.model,
          }),
        );
        setFavorites(formattedFavorites);
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris:", error);
        errorToast("Erreur lors de la récupération des favoris.");
      }
    };

    fetchFavorites();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  const toggleSelectFavorite = (id: number) => {
    setSelectedFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  const deleteSelectedFavorites = async () => {
    try {
      for (const favId of selectedFavorites) {
        // find the item in the favorites list that has this id
        const favToDelete = favorites.find((fav) => fav.id === favId);

        if (favToDelete) {
          await api.delete(`/api/favoris/${favToDelete.favoris_id}`); // Use the like ID instead of the item ID
        }
      }
      // Filter the favorites list by removing each item with a favoris_id that's included in the selectedFavorites array
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => !selectedFavorites.includes(fav.id)),
      );
      successToast("Favoris supprimés avec succès !");
      setSelectedFavorites([]);
    } catch (error) {
      console.error("Erreur lors de la suppression des favoris:", error);
      errorToast("Erreur lors de la suppression des favoris.");
    }
  };

  const getOwnerName = (userId: number): string => {
    // Find the user with the matching id
    if (user && user.id === userId) {
      return `${user.username}`;
    }

    return "Inconnu";
  };

  return (
    <div ref={advertRef} className={styles.container}>
      <div
        ref={headerRef}
        className={`${styles.stickyHeader} ${
          isSticky ? styles.fixed : ""
        } ${isVisible ? "" : styles.hidden}`}
      >
        <h2 className={styles.title}>Annonces Favorites</h2>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.input}
          />
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className={styles.dropdown}
          >
            <option value="model">Model</option>
            <option value="brand">Marque</option>
            <option value="location">Localisation</option>
          </select>
          <button type="button" className={styles.searchButton}>
            Rechercher
          </button>
          <button
            type="button"
            className={`${styles.deleteButton} ${
              selectedFavorites.length > 0 ? styles.active : ""
            }`}
            onClick={deleteSelectedFavorites}
            disabled={selectedFavorites.length === 0}
          >
            Supprimer la sélection
          </button>
        </div>
      </div>

      <div className={styles.favoriteList}>
        {favorites
          .filter((fav) =>
            (fav[selectedFilter as keyof FavoriteItem] ?? "")
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
          )
          .map((fav) => (
            <div key={fav.id} className={styles.advertCard}>
              <input
                type="checkbox"
                checked={selectedFavorites.includes(fav.id)}
                onChange={() => toggleSelectFavorite(fav.id)}
                className={styles.checkbox}
              />

              {fav.vehicle_picture ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}${fav.vehicle_picture}`}
                  alt={`miniature de ${fav.model}`}
                  className={styles.picture}
                />
              ) : (
                <img
                  src={defaultVehicleImg} // Use the default image
                  alt="miniature par défaut"
                  className={styles.picture}
                />
              )}

              <div className={styles.vehicledetails}>
                <p>
                  <strong>Marque:&nbsp;</strong> {fav.brand}
                </p>
                <p>
                  <strong>Modèle:&nbsp;</strong> {fav.model}
                </p>
                <p>
                  <strong>Année:&nbsp;</strong> {fav.year}
                </p>
                <p className={styles.locationText}>
                  <strong>Ville:&nbsp;</strong> {fav.location.toUpperCase()}
                </p>
                <p>
                  <strong>Disponibilité:&nbsp;</strong>
                  {fav.status}
                </p>
                <p>
                  <strong>Propriétaire:&nbsp;</strong>
                  {getOwnerName(fav.user_id)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favoris;
