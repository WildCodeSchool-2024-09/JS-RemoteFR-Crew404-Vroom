import type React from "react";
import { useState } from "react";
import styles from "./Advert.module.css";

type FavoriteAdvert = {
  id: number;
  picture: string;
  marque: string;
  modele: string;
  annee: number;
  localisation: string;
  statut: "Vente" | "Essai" | "Indisponible";
};

const Advert: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteAdvert[]>([
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

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>("marque");
  const [selectedFavorites, setSelectedFavorites] = useState<number[]>([]);

  const handleSelectFavorite = (id: number) => {
    setSelectedFavorites((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((favId) => favId !== id)
        : [...prevSelected, id],
    );
  };

  const handleRemoveSelected = () => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((advert) => !selectedFavorites.includes(advert.id)),
    );
    setSelectedFavorites([]);
  };

  const handleSearch = () => {
    return favorites.filter((advert) => {
      const term = searchTerm.toLowerCase();
      switch (filterOption) {
        case "marque":
          return advert.marque.toLowerCase().includes(term);
        case "modele":
          return advert.modele.toLowerCase().includes(term);
        case "annee":
          return advert.annee.toString().includes(term);
        case "localisation":
          return advert.localisation.toLowerCase().includes(term);
        case "statut":
          return advert.statut.toLowerCase().includes(term);
        default:
          return true;
      }
    });
  };

  const filteredFavorites = handleSearch();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Annonces Favorites</h2>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Rechercher..."
          className={styles.input}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className={styles.dropdown}
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
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
          className={styles.deleteButton}
          onClick={handleRemoveSelected}
          disabled={selectedFavorites.length === 0}
        >
          Supprimer sélection
        </button>
      </div>

      <div className={styles.favoriteList}>
        {filteredFavorites.map((advert) => (
          <div key={advert.id} className={styles.advertItem}>
            <div
              className={styles.picture}
              style={{
                backgroundImage: `url(${advert.picture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className={styles.info}>
              <p>Marque: {advert.marque}</p>
              <p>Modèle: {advert.modele}</p>
              <p>Année: {advert.annee}</p>
              <p>Localisation: {advert.localisation}</p>
              <p>Statut: {advert.statut}</p>
            </div>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={selectedFavorites.includes(advert.id)}
              onChange={() => handleSelectFavorite(advert.id)}
            />
          </div>
        ))}
      </div>

      <div className={styles.arrowContainer}>
        <button type="button" className={styles.arrowButton}>
          ⬇️
        </button>
      </div>
    </div>
  );
};

export default Advert;
