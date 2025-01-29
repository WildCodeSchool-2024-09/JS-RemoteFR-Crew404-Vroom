import type React from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./Advert.module.css";

interface Favorite {
  id: number;
  picture: string;
  marque: string;
  modele: string;
  annee: number;
  localisation: string;
  statut: string;
}

const Advert: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState<keyof Favorite>("marque");
  const [favorites, setFavorites] = useState<Favorite[]>([
    {
      id: 1,
      picture: "/default-car.png",
      marque: "Audi",
      modele: "R8",
      annee: 2023,
      localisation: "Paris",
      statut: "Vente",
    },
    {
      id: 2,
      picture: "/default-car2.png",
      marque: "Alpine",
      modele: "A110",
      annee: 2022,
      localisation: "Nice",
      statut: "Essai",
    },
    {
      id: 3,
      picture: "/default-bike.png",
      marque: "Honda",
      modele: "CBR500R",
      annee: 2021,
      localisation: "Lyon",
      statut: "Indisponible",
    },
  ]);
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value as keyof Favorite);
  };

  const toggleSelectFavorite = (id: number) => {
    setSelectedFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  const deleteSelectedFavorites = () => {
    setFavorites(
      favorites.filter((fav) => !selectedFavorites.includes(fav.id)),
    );
    setSelectedFavorites([]);
  };

  return (
    <div ref={advertRef} className={styles.container}>
      <div
        ref={headerRef}
        className={`${styles.stickyHeader} ${isSticky ? styles.fixed : ""} ${isVisible ? "" : styles.hidden}`}
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
            <option value="marque">Marque</option>
            <option value="modele">Modèle</option>
            <option value="annee">Année</option>
            <option value="localisation">Localisation</option>
            <option value="statut">Statut</option>
          </select>
          <button type="button" className={styles.searchButton}>
            Rechercher
          </button>
          <button
            type="button"
            className={`${styles.deleteButton} ${selectedFavorites.length > 0 ? styles.active : ""}`}
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
            fav[selectedFilter]
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
              <div className={styles.picture} />

              <div className={styles.advertDetails}>
                <p>
                  <strong>Marque:</strong> {fav.marque}
                </p>
                <p>
                  <strong>Modèle:</strong> {fav.modele}
                </p>
                <p>
                  <strong>Année:</strong> {fav.annee}
                </p>
                <p>
                  <strong>Localisation:</strong> {fav.localisation}
                </p>
                <p>
                  <strong>Statut:</strong> {fav.statut}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Advert;
