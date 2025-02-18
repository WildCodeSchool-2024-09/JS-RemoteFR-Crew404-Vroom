import { useEffect, useRef, useState } from "react";
import api from "../../../helpers/api";
import { successToast } from "../../../services/toast";
import styles from "./Advert.module.css";

interface FavoriteItem {
  id: number;
  picture?: string | null;
  title: string;
  type: string;
  year?: number;
  location: string;
}

const Advert: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState<keyof FavoriteItem>("title");
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
        const response = await api.get("/api/users/me/likes");
        // Adapter la réponse pour correspondre à FavoriteItem
        const formattedFavorites = response.data.map(
          (like: {
            id: number;
            content: {
              picture?: string | null;
              title: string;
              type: string;
              year?: number;
              location: string;
            };
          }) => ({
            id: like.id,
            picture: like.content.picture,
            title: like.content.title,
            type: like.content.type,
            year: like.content.year,
            location: like.content.location,
          }),
        );
        setFavorites(formattedFavorites);
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris:", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value as keyof FavoriteItem);
  };

  const toggleSelectFavorite = (id: number) => {
    setSelectedFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  const deleteSelectedFavorites = async () => {
    try {
      for (const favId of selectedFavorites) {
        await api.delete(`/api/likes/${favId}`);
      }
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => !selectedFavorites.includes(fav.id)),
      );
      successToast("Favoris supprimés avec succès !");
      setSelectedFavorites([]);
    } catch (error) {
      console.error("Erreur lors de la suppression des favoris:", error);
    }
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
            <option value="title">Nom</option>
            <option value="type">Type</option>
            <option value="year">Année</option>
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
            (fav[selectedFilter] ?? "")
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

              {/* Placeholder image with custom styles */}
              {fav.picture ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}${fav.picture}`}
                  alt={`miniature de ${fav.title}`}
                  className={styles.picture}
                />
              ) : (
                <div className={styles.picture} />
              )}

              <div className={styles.advertDetails}>
                <p>
                  <strong>Nom:</strong> {fav.title}
                </p>
                <p>
                  <strong>Type:</strong> {fav.type}
                </p>
                {fav.year && (
                  <p>
                    <strong>Année:</strong> {fav.year}
                  </p>
                )}
                <p>
                  <strong>Localisation:</strong> {fav.location}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Advert;
