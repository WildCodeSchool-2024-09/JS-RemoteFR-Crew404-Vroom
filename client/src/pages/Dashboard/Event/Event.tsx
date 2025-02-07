import { useEffect, useRef, useState } from "react";
import defaultEventImg from "../../../assets/images/pictures/default-event-img.png";
import { useAuth } from "../../../contexts/AuthContext";
import { useData } from "../../../contexts/DataContext";
import api from "../../../helpers/api";
import type { Eventdata } from "../../../types/events";
import styles from "./Event.module.css";

function Dashboard() {
  // État pour l'événement actuellement sélectionné ou en cours d'édition
  const [currentEvent, setCurrentEvent] = useState<Eventdata>({
    id: -1,
    title: "",
    event_picture: null,
    type: "type",
    date_start: "",
    date_end: "",
    location: { x: 0, y: 0 },
    address: "",
    description: "",
    link: null,
    user_id: 0,
  });

  // Utilisation des contextes pour accéder aux données globales
  const { events, setEvents } = useData();
  const { user } = useAuth();

  // États pour gérer la sélection multiple, la recherche, et l'affichage des erreurs
  const [selectedEvents, setSelectedEvents] = useState<Set<number>>(new Set());
  const [searchCriterion, setSearchCriterion] = useState<string>("title");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [eventType, setEventType] = useState<Eventdata["type"]>("autre");
  //Stockage de la photo avant envoi
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Référence pour gérer le clic en dehors de la modale
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Récupération des événements de l'utilisateur
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/api/users/me/events");
        setEvents(response.data || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements:", error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [setEvents]);

  // Fonction pour obtenir l'ID de l'utilisateur connecté
  const getCurrentUserId = () => {
    if (!user) {
      console.error("User not found in context");
      return null;
    }
    return user.id;
  };

  // Gestion de l'upload de fichier
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Crée un URL local pour la prévisualisation
      const localPreviewUrl = URL.createObjectURL(file);
      setPreviewImage(localPreviewUrl);
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = [];
    if (!currentEvent.title.trim())
      newErrors.push("Veuillez donner un nom à l'événement.");
    if (
      typeof currentEvent.date_start !== "string" ||
      !currentEvent.date_start.trim() ||
      typeof currentEvent.date_end !== "string" ||
      !currentEvent.date_end.trim()
    )
      newErrors.push("Veuillez choisir une plage de dates.");
    if (!currentEvent.address.trim())
      newErrors.push("Veuillez renseigner une localisation.");
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Formatage de la date pour l'affichage et le stockage
  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return ""; // Si aucune date n'est fournie, on retourne une chaîne vide
    const d = new Date(date); // On crée un nouvel objet Date à partir de la date fournie

    // On ajuste la date pour le fuseau horaire local et on la convertit en format ISO
    // Puis on ne garde que la partie date (YYYY-MM-DD) en supprimant l'heure
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  };

  const formatDateForDisplay = (date: string | Date | undefined): string => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Fonction pour ajouter ou mettre à jour un événement
  const addOrUpdateEvent = async () => {
    if (!validateForm()) return;

    let eventData = {
      ...currentEvent,
      type: eventType,
      date_start: formatDate(currentEvent.date_start),
      date_end: formatDate(currentEvent.date_end),
      user_id: getCurrentUserId(),
    };

    // 🌍 Vérifier si l'adresse est remplie et récupérer les coordonnées
    if (eventData.address.trim()) {
      const coordinates = await fetchCoordinates(eventData.address);
      eventData = { ...eventData, location: coordinates };
    }

    try {
      let response: { data: { event: Eventdata } };
      if (currentEvent.id !== -1) {
        response = await api.put(`/api/events/${currentEvent.id}`, eventData);
      } else {
        response = await api.post("/api/events", eventData);
      }

      const updatedEvent = response.data.event;

      // 🔄 Mise à jour de l'image si un fichier a été sélectionné
      if (selectedFile) {
        const formData = new FormData();
        formData.append("event_picture", selectedFile);
        const imageResponse = await api.put(
          `/api/events/${updatedEvent.id}/upload`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        updatedEvent.event_picture = imageResponse.data.event_picture;
      }

      // 📌 Rafraîchissement de la liste des événements
      const refreshResponse = await api.get("/api/users/me/events");
      setEvents(refreshResponse.data || []);

      // 🔄 Réinitialisation du formulaire
      setCurrentEvent({
        id: -1,
        title: "",
        event_picture: null,
        type: "type",
        date_start: "",
        date_end: "",
        location: { x: 0, y: 0 },
        address: "",
        description: "",
        link: null,
        user_id: 0,
      });
      setSelectedFile(null);
      setPreviewImage(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout/modification de l'événement:",
        error,
      );
    }
  };

  // Gestion du clic sur un événement pour l'éditer
  const handleEventClick = (event: Eventdata) => {
    setCurrentEvent(event);
    setPreviewImage(null);
    setIsModalOpen(true);
  };

  // Gestion du clic en dehors de la modale pour la fermer
  const handleOutsideClick = (
    event: React.MouseEvent | React.KeyboardEvent,
  ) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  //  Fonction pour obtenir les coordonnées GPS à partir d'une adresse
  const fetchCoordinates = async (address: string) => {
    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
          address,
        )}`,
      );
      const data = await response.json();

      if (data.features.length > 0) {
        const { coordinates } = data.features[0].geometry;
        return { x: coordinates[1], y: coordinates[0] }; // latitude (x), longitude (y)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des coordonnées :", error);
    }
    return { x: 0, y: 0 }; // Valeur par défaut si l'API échoue
  };

  // Suppression des événements sélectionnés
  const handleDeleteSelectedEvents = async () => {
    try {
      for (const eventId of selectedEvents) {
        await api.delete(`/api/events/${eventId}`);
      }
      setEvents((prevEvents) =>
        prevEvents.filter((event) => !selectedEvents.has(event.id)),
      );
      setSelectedEvents(new Set());
    } catch (error) {
      console.error("Erreur lors de la suppression des événements:", error);
    }
  };

  // Gestion de la sélection/désélection des événements
  const handleCheckboxChange = (eventId: number) => {
    setSelectedEvents((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(eventId)) {
        newSelected.delete(eventId);
      } else {
        newSelected.add(eventId);
      }
      return newSelected;
    });
  };

  // Filtrage des événements en fonction des critères de recherche
  const filteredEvents =
    events?.filter((event) => {
      switch (searchCriterion) {
        case "title":
          return event.title.toLowerCase().includes(searchQuery.toLowerCase());
        case "date_start":
          return formatDateForDisplay(event.date_start).includes(searchQuery);
        case "address":
          return event.address
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        default:
          return false;
      }
    }) ?? [];

  //suppression de l'image d'un événement
  const handleImageDelete = async () => {
    if (
      currentEvent &&
      window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")
    ) {
      try {
        await api.delete(`/api/event/${currentEvent.id}/event-picture`);
        setCurrentEvent({
          ...currentEvent,
          event_picture: null,
        });
      } catch (error) {
        console.error("Erreur lors de la suppression de l'image:", error);
      }
    }
  };

  return (
    <div className={styles.box}>
      <h2 className={styles.title}>Mes événements</h2>

      <div className={styles.searchBar}>
        <select
          className={styles.dropdown}
          value={searchCriterion}
          onChange={(e) => setSearchCriterion(e.target.value)}
        >
          <option value="title">Nom</option>
          <option value="date_start">Date</option>
          <option value="address">Localisation</option>
        </select>
        <input
          type="text"
          className={styles.search}
          placeholder="Rechercher"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        {Array.isArray(filteredEvents) &&
          filteredEvents.map((event) => (
            <div key={event.id} className={styles.eventWrapper}>
              <button
                type="button"
                className={styles.event}
                onClick={() => handleEventClick(event)}
              >
                <img
                  className={styles.image}
                  alt="pas d'image"
                  src={
                    event.event_picture
                      ? `${import.meta.env.VITE_API_URL}${event.event_picture}`
                      : defaultEventImg
                  }
                  style={{ backgroundSize: "cover" }}
                />
                <div className={styles.eventDetails}>
                  <p>
                    <strong>Nom :&nbsp;</strong>
                    {event.title}
                  </p>
                  <p>
                    <strong>Date :&nbsp;</strong>
                    {`Du ${formatDateForDisplay(
                      event.date_start,
                    )} au ${formatDateForDisplay(event.date_end)}`}
                  </p>
                  <p className={styles.locationText}>
                    <strong>Localisation :&nbsp;</strong>{" "}
                    {event.address.toUpperCase()}
                  </p>
                </div>
              </button>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selectedEvents.has(event.id)}
                onChange={() => handleCheckboxChange(event.id)}
              />
            </div>
          ))}
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDeleteSelectedEvents}
          disabled={selectedEvents.size === 0}
        >
          Supprimer la sélection
        </button>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => {
            // Reset form data to indicate a new event, coucou Anthony
            setCurrentEvent({
              id: -1,
              title: "",
              event_picture: null,
              type: "type",
              date_start: "",
              date_end: "",
              location: { x: 0, y: 0 },
              address: "",
              description: "",
              link: null,
              user_id: 0,
            });
            setIsModalOpen(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="32"
            height="32"
          >
            <title>Ajouter un événement</title>
            <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {isModalOpen && (
        <dialog
          className={styles.modalOverlay}
          onClick={handleOutsideClick}
          onKeyDown={(e) => {
            if (e.key === "Escape") handleOutsideClick(e);
          }}
          aria-labelledby="modal-title"
          open
        >
          <div className={styles.modalContent} ref={modalRef}>
            <h3 id="modal-title">
              {currentEvent.id !== -1
                ? "Modifier l'événement"
                : "Ajouter un événement"}
            </h3>
            {errors.map((error) => (
              <p key={error} className={styles.errorMessage}>
                {error}
              </p>
            ))}

            {(previewImage || currentEvent.event_picture) && (
              <div className={styles.imageContainer}>
                <img
                  src={
                    previewImage
                      ? previewImage
                      : currentEvent.event_picture
                        ? `${import.meta.env.VITE_API_URL}${
                            currentEvent.event_picture
                          }`
                        : defaultEventImg
                  }
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
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className={styles.input}
            />
            <input
              type="text"
              value={currentEvent.title}
              placeholder="Titre de l'événement"
              onChange={(e) =>
                setCurrentEvent({
                  ...currentEvent,
                  title: e.target.value,
                })
              }
              className={styles.input}
            />
            <select
              value={eventType}
              onChange={(e) =>
                setEventType(e.target.value as Eventdata["type"])
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
            <label htmlFor="startDate">Début:</label>
            <input
              id="startDate"
              type="date"
              value={
                currentEvent.date_start
                  ? formatDate(currentEvent.date_start)
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
            <label htmlFor="endDate">Fin:</label>
            <input
              id="endDate"
              type="date"
              value={
                currentEvent.date_end ? formatDate(currentEvent.date_end) : ""
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
              placeholder="Localisation"
              onChange={(e) =>
                setCurrentEvent({
                  ...currentEvent,
                  address: e.target.value,
                })
              }
              onBlur={async () => {
                if (currentEvent.address.trim()) {
                  const coordinates = await fetchCoordinates(
                    currentEvent.address,
                  );
                  setCurrentEvent((prev) => ({
                    ...prev,
                    location: coordinates,
                  }));
                }
              }}
              className={styles.input}
            />

            <textarea
              placeholder="Description de l'événement"
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
              placeholder="Lien de l'événement"
              value={currentEvent.link || ""}
              onChange={(e) =>
                setCurrentEvent({
                  ...currentEvent,
                  link: e.target.value,
                })
              }
              className={styles.input}
            />

            <div className={styles.modalButtons}>
              <button
                type="button"
                className={styles.submitButton}
                onClick={addOrUpdateEvent}
              >
                {currentEvent.id !== -1 ? "Modifier" : "Ajouter"}
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setIsModalOpen(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default Dashboard;
