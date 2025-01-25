import { useEffect, useRef, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { useData } from "../../../contexts/DataContext";
import type { Eventdata } from "../../../contexts/DataContext";
import api from "../../../helpers/api";
import ExportCSV from "../ExportCSV/ExportCSV";
import styles from "./EventManagement.module.css";

type SortOrder = "none" | "asc" | "desc";

function EventManagement() {
  const { events, setEvents } = useData();
  const [filteredEvents, setFilteredEvents] = useState<Eventdata[]>(events);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const [filterType, setFilterType] = useState<Eventdata["type"] | "">("");
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    // Appel API ici
    const fetchEvents = async () => {
      try {
        const response = await api.get("/api/events");
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements:", error);
      }
    };

    fetchEvents();
  }, [setEvents]);

  // Fonction pour l'expension du tableau
  function toggleTableExpansion() {
    setIsTableExpanded(!isTableExpanded);
  }

  // Fonction pour la barre de recherche
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = events.filter(
      (event) =>
        (event.title.toLowerCase().includes(searchTerm) ||
          (typeof event.date_start === "string" &&
            event.date_start.includes(searchTerm)) ||
          (typeof event.date_end === "string" &&
            event.date_end.includes(searchTerm))) &&
        (filterType === "" || event.type === filterType),
    );
    setFilteredEvents(filtered);
  }

  // Fonction pour trier les événements par type
  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newFilterType = event.target.value as Eventdata["type"] | "";
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

  // Gestion des modales pour éditer un événement
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Eventdata | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  function handleEditEvent(id: number) {
    // Logique pour éditer un événement
    const eventToEdit = events.find((event) => event.id === id);
    if (eventToEdit) {
      setCurrentEvent(eventToEdit);
      setIsModalOpen(true);
    }
  }

  // Gestion du clic en dehors de la modale
  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  const updateEvent = async () => {
    if (currentEvent) {
      const formatDateForMySQL = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
      };

      const updatedEvent = {
        ...currentEvent,
        date_start: formatDateForMySQL(
          typeof currentEvent.date_start === "string"
            ? currentEvent.date_start
            : currentEvent.date_start.toISOString(),
        ),
        date_end: formatDateForMySQL(
          typeof currentEvent.date_end === "string"
            ? currentEvent.date_end
            : currentEvent.date_end.toISOString(),
        ),
      };

      try {
        await api.put(`/api/events/${currentEvent.id}`, updatedEvent);
        const updatedEvents = events.map((event) =>
          event.id === currentEvent.id ? currentEvent : event,
        );
        setEvents(updatedEvents);
        setFilteredEvents(updatedEvents);
        setIsModalOpen(false);
        setCurrentEvent(null);
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'événement:", error);
      }
    }
  };

  function handleDeleteEvent(id: number) {
    // Logique pour supprimer un événement
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      api
        .delete(`/api/events/${id}`)
        .then(() => {
          const updatedEvents = events.filter((event) => event.id !== id);
          setEvents(updatedEvents);
          setFilteredEvents(updatedEvents);
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de l'événement:", error);
        });
    }
  }

  // Fonction pour uploader une image
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result);
          if (currentEvent) {
            setCurrentEvent({
              ...currentEvent,
              event_picture: reader.result,
            });
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  //supression de l'image
  const handleImageDelete = () => {
    const confirmMessage = "Êtes-vous sûr de vouloir supprimer cette image ?";

    if (window.confirm(confirmMessage)) {
      if (currentEvent) {
        setCurrentEvent({
          ...currentEvent,
          event_picture: null,
        });
        setPreviewImage(null);
      }
    }
  };

  // Calcule le nombre total d'événements filtrés
  const totalEvents = filteredEvents.length;

  //formatage de la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className={styles.eventManagementContainer}>
      <h2>Gestion des Événements</h2>

      <div className={styles.tableHeader}>
        <p className={styles.eventCounter}>Total : {totalEvents}</p>
        <ExportCSV
          data={filteredEvents.map((event) => ({
            ...event,
            location: `${event.location.x}, ${event.location.y}`,
            date_start:
              typeof event.date_start === "string"
                ? event.date_start
                : event.date_start.toISOString(),
            date_end:
              typeof event.date_end === "string"
                ? event.date_end
                : event.date_end.toISOString(),
          }))}
          fileName="data_événements.csv"
        />
        <button
          type="button"
          onClick={toggleTableExpansion}
          className={styles.expandButton}
        >
          {isTableExpanded ? <SlArrowUp /> : <SlArrowDown />}
        </button>
      </div>

      {isTableExpanded && (
        <>
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
              Par date{" "}
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
                  <td>
                    {formatDate(
                      typeof event.date_start === "string"
                        ? event.date_start
                        : event.date_start.toISOString(),
                    )}
                  </td>
                  <td>
                    {formatDate(
                      typeof event.date_end === "string"
                        ? event.date_end
                        : event.date_end.toISOString(),
                    )}
                  </td>
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
        </>
      )}
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
            <h3>Modifier l'événement</h3>
            {currentEvent && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className={styles.input}
                />
                {(previewImage || currentEvent.event_picture) && (
                  <div className={styles.imageContainer}>
                    <img
                      src={previewImage || currentEvent.event_picture || ""}
                      alt="Aperçu de l'événement"
                      className={styles.previewImage}
                      onClick={handleImageDelete}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setIsModalOpen(false);
                        }
                      }}
                      tabIndex={-1}
                    />
                  </div>
                )}
                <input
                  type="text"
                  value={currentEvent.title}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, title: e.target.value })
                  }
                  className={styles.input}
                />
                <select
                  value={currentEvent.type}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      type: e.target.value as Eventdata["type"],
                    })
                  }
                  className={styles.input}
                >
                  <option value="salon">Salon</option>
                  <option value="course">Course</option>
                  <option value="musée">Musée</option>
                  <option value="vente aux enchères">Vente aux enchères</option>
                  <option value="roadtrip">Roadtrip</option>
                  <option value="rassemblement">Rassemblement</option>
                </select>
                <input
                  type="date"
                  value={
                    currentEvent.date_start
                      ? new Date(currentEvent.date_start)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      date_start: e.target.value,
                    })
                  }
                  className={styles.input}
                />
                <input
                  type="date"
                  value={
                    currentEvent.date_end
                      ? new Date(currentEvent.date_end)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      date_end: e.target.value,
                    })
                  }
                  className={styles.input}
                />
                <input
                  type="text"
                  value={currentEvent.address}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      address: e.target.value,
                    })
                  }
                  className={styles.input}
                />
                <textarea
                  value={currentEvent.description}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      description: e.target.value,
                    })
                  }
                  className={styles.input}
                />
                <input
                  type="text"
                  value={currentEvent.link || ""}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, link: e.target.value })
                  }
                  className={styles.input}
                />
                <div className={styles.modalButtons}>
                  <button
                    type="button"
                    onClick={updateEvent}
                    className={styles.largeButton}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className={styles.smallButton}
                  >
                    Annuler
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventManagement;
