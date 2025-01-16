import type React from "react";
import { useRef, useState } from "react";
import styles from "./Event.module.css";

type Event = {
  _id: number;
  id: number;
  name: string;
  picture: string | null;
  date: string;
  location: string;
};

function Dashboard() {
  const [formData, setFormData] = useState<{
    id: number;
    name: string;
    picture: string | null;
    startDate: string;
    endDate: string;
    location: string;
  }>({
    id: -1,
    name: "",
    picture: null,
    startDate: "",
    endDate: "",
    location: "",
  });

  const [events, setEvents] = useState<Event[]>([
    {
      _id: 1,
      id: 1,
      name: "Music Festival",
      picture: null,
      date: "2025-01-15 to 2025-01-16",
      location: "Paris",
    },
    {
      _id: 2,
      id: 2,
      name: "Art Exhibit",
      picture: null,
      date: "2025-02-20 to 2025-02-22",
      location: "London",
    },
    {
      _id: 3,
      id: 3,
      name: "Tech Conference",
      picture: null,
      date: "2025-03-10 to 2025-03-12",
      location: "Berlin",
    },
  ]);

  const [searchCriterion, setSearchCriterion] = useState<string>("name");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);

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
    if (!formData.name.trim())
      newErrors.push("Veuillez donner un nom à l'événement.");
    if (!formData.startDate.trim() || !formData.endDate.trim())
      newErrors.push("Veuillez choisir une plage de dates.");
    if (!formData.location.trim())
      newErrors.push("Veuillez renseigner une localisation.");
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const addOrUpdateEvent = () => {
    if (!validateForm()) return;

    const formattedDate = `${formData.startDate} to ${formData.endDate}`;

    if (formData.id !== -1) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === formData.id
            ? { ...event, ...formData, date: formattedDate }
            : event,
        ),
      );
    } else {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          ...formData,
          _id: Date.now(),
          id: Date.now(),
          date: formattedDate,
        },
      ]);
    }

    setFormData({
      id: -1,
      name: "",
      picture: null,
      startDate: "",
      endDate: "",
      location: "",
    });
    setIsModalOpen(false);
  };

  const handleEventClick = (event: Event) => {
    const [startDate, endDate] = event.date.split(" to ");
    setFormData({
      ...event,
      startDate: startDate || "",
      endDate: endDate || "",
    });
    setIsModalOpen(true);
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  const filteredEvents = events.filter((event) =>
    event[searchCriterion as keyof Event]
      ?.toString()
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className={styles.box}>
      <h2 className={styles.title}>Mes événements</h2>

      <div className={styles.searchBar}>
        <select
          className={styles.dropdown}
          value={searchCriterion}
          onChange={(e) => setSearchCriterion(e.target.value)}
        >
          <option value="name">Nom</option>
          <option value="date">Date</option>
          <option value="location">Localisation</option>
        </select>
        <input
          type="text"
          className={styles.search}
          placeholder={`Rechercher par ${searchCriterion}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        {filteredEvents.map((event) => (
          <button
            type="button"
            key={event.id}
            className={styles.event}
            onClick={() => handleEventClick(event)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleEventClick(event);
              }
            }}
          >
            <div
              className={styles.image}
              style={{
                backgroundImage: event.picture
                  ? `url(${event.picture})`
                  : "url(/default-placeholder.png)",
                backgroundSize: "cover",
              }}
            />
            <div>
              <p>Nom: {event.name}</p>
              <p>Date: {event.date}</p>
              <p className={styles.locationText}>
                Localisation: {event.location.toUpperCase()}
              </p>
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.addButton}
        onClick={() => setIsModalOpen(true)}
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
                ? "Modifier l'événement"
                : "Ajouter un événement"}
            </h3>
            {errors.map((error) => (
              <p key={error} className={styles.errorMessage || "error-message"}>
                {error}
              </p>
            ))}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className={styles.input}
            />
            <label htmlFor="startDate">Début:</label>
            <input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
              className={styles.input}
            />
            <label htmlFor="endDate">Fin:</label>
            <input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }))
              }
              className={styles.input}
            />

            <input
              type="text"
              value={formData.location}
              placeholder="Localisation"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              className={styles.input}
            />
            <input
              type="text"
              value={formData.name}
              placeholder="Nom de l'événement"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className={styles.input}
            />
            <div className={styles.modalButtons}>
              <button
                type="button"
                onClick={addOrUpdateEvent}
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

export default Dashboard;
