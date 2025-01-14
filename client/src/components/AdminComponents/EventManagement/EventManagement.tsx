import { useEffect, useState } from "react";
import styles from "./EventManagement.module.css";

type Event = {
  id: number;
  title: string;
  type:
    | "type"
    | "salon"
    | "course"
    | "musée"
    | "vente aux enchères"
    | "roadtrip"
    | "rassemblement";
  date_start: string;
  date_end: string;
  address: string;
  description: string;
  link: string | null;
};

type SortOrder = "none" | "asc" | "desc";

function EventManagement() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const [filterType, setFilterType] = useState<Event["type"] | "">("");

  useEffect(() => {
    // Appel API ici
    const mockEvents: Event[] = [
      {
        id: 1,
        title: "Salon Auto Rétro",
        type: "salon",
        date_start: "2025-06-15",
        date_end: "2025-06-23",
        address: "123 Rue de l'Exposition, Paris",
        description: "Grand salon des véhicules de collection",
        link: "https://salonautoretro.fr",
      },
      {
        id: 2,
        title: "En route les BG",
        type: "roadtrip",
        date_start: "2025-03-10",
        date_end: "2025-03-10",
        address: "123 Rue de la plage, Deauville",
        description: "On débarque en Normandie",
        link: "https://www.facebook.com/ffveofficiel/?locale=fr_FR",
      },
    ];
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);

  // Fonction pour la barre de recherche
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = events.filter(
      (event) =>
        (event.title.toLowerCase().includes(searchTerm) ||
          event.date_start.includes(searchTerm) ||
          event.date_end.includes(searchTerm)) &&
        (filterType === "" || event.type === filterType),
    );
    setFilteredEvents(filtered);
  }

  // Fonction pour trier les événements par type
  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newFilterType = event.target.value as Event["type"] | "";
    setFilterType(newFilterType);

    if (newFilterType === "" || newFilterType === "type") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.type === newFilterType);
      setFilteredEvents(filtered);
    }
  }

  // Fonction pour trier la date de début par ordre croissant ou décroissant
  function handleSort() {
    let newSortOrder: SortOrder;
    switch (sortOrder) {
      case "none":
        newSortOrder = "asc";
        break;
      case "asc":
        newSortOrder = "desc";
        break;
      case "desc":
        newSortOrder = "none";
        break;
    }
    setSortOrder(newSortOrder);

    const sorted = [...filteredEvents];
    if (newSortOrder === "asc") {
      sorted.sort(
        (a, b) =>
          new Date(a.date_start).getTime() - new Date(b.date_start).getTime(),
      );
    } else if (newSortOrder === "desc") {
      sorted.sort(
        (a, b) =>
          new Date(b.date_start).getTime() - new Date(a.date_start).getTime(),
      );
    }
    setFilteredEvents(sorted);
  }

  // Fonction pour réinitialiser la recherche
  function handleResetSearch() {
    setSearchTerm("");
    setFilterType("");
    setFilteredEvents(events);
    setSortOrder("none");
  }

  function handleEditEvent(id: number) {
    // Logique pour éditer un événement
    alert(`Édition de l'événement ${id}`);
  }

  function handleDeleteEvent(id: number) {
    // Logique pour supprimer un événement
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      const updatedEvents = events.filter((event) => event.id !== id);
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);
    }
  }

  return (
    <div className={styles.eventManagementContainer}>
      <h2>Gestion des Événements</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchBar}
        />
        {searchTerm && ( // Le bouton n'apparaît que si un terme de recherche existe
          <button
            type="button"
            onClick={handleResetSearch}
            className={styles.resetButton}
          >
            ↩ Réinitialiser
          </button>
        )}
        <select
          name="typeEvent"
          className={styles.selectButton}
          value={filterType}
          onChange={handleFilterChange}
        >
          <option value="type">Type</option>
          <option value="salon">Salon</option>
          <option value="course">Course</option>
          <option value="musée">Musée</option>
          <option value="roadtrip">Roadtrip</option>
          <option value="vente aux enchères">Enchères</option>
          <option value="rassemblement">Rassemblement</option>
        </select>
        <button
          type="button"
          onClick={handleSort}
          className={styles.sortButton}
        >
          Trier par date{" "}
          {sortOrder === "none"
            ? "❌"
            : sortOrder === "asc"
              ? "(Croissante)"
              : "(Décroissante)"}
        </button>
      </div>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th className={styles.tableContainer}>Titre</th>
            <th className={styles.tableContainer}>Type</th>
            <th className={styles.tableContainer}>Début</th>
            <th className={styles.tableContainer}>Fin</th>
            <th className={styles.tableContainer}>Adresse</th>
            <th className={styles.tableContainer}> </th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.type}</td>
              <td>{event.date_start}</td>
              <td>{event.date_end}</td>
              <td>{event.address}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    handleEditEvent(event.id);
                  }}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteEvent(event.id);
                  }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventManagement;
